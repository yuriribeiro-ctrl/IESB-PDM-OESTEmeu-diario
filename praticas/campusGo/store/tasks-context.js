import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../services/firebase';

const TasksContext = createContext(null);
const tasksCollection = (uid) => collection(db, 'users', uid, 'tasks');
const taskDocument = (uid, taskId) => doc(db, 'users', uid, 'tasks', taskId);

export function TasksContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let unsubscribeTasks = null;
    let active = true;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (!active) return;
      if (!currentUser) {
        try {
          await signInAnonymously(auth);
        } catch (authError) {
          if (active) {
            setError('Não foi possível conectar ao Firebase. Confira sua conexão e a configuração do projeto.');
            setLoading(false);
          }
        }
        return;
      }

      setUser(currentUser);
      setError('');
      unsubscribeTasks?.();
      const taskQuery = query(tasksCollection(currentUser.uid), orderBy('createdAt', 'desc'));
      unsubscribeTasks = onSnapshot(
        taskQuery,
        (snapshot) => {
          if (!active) return;
          setTasks(snapshot.docs.map((task) => ({ id: task.id, ...task.data() })));
          setLoading(false);
          setError('');
        },
        () => {
          if (!active) return;
          setLoading(false);
          setError('Não foi possível carregar as tarefas. Verifique as regras do Firestore e tente novamente.');
        },
      );
    });

    return () => {
      active = false;
      unsubscribeTasks?.();
      unsubscribeAuth();
    };
  }, []);

  const createTask = async ({ title, notes = '' }) => {
    if (!user) throw new Error('Aguarde a conexão segura com o Firebase.');
    const cleanTitle = title.trim();
    if (!cleanTitle) throw new Error('Informe o título da tarefa.');
    if (cleanTitle.length > 80) throw new Error('O título deve ter no máximo 80 caracteres.');
    if (notes.trim().length > 240) throw new Error('A observação deve ter no máximo 240 caracteres.');

    await addDoc(tasksCollection(user.uid), {
      title: cleanTitle,
      notes: notes.trim(),
      completed: false,
      ownerUid: user.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  };

  const updateTask = async (taskId, updates) => {
    if (!user) throw new Error('Aguarde a conexão segura com o Firebase.');
    const next = {};
    if (typeof updates.title === 'string') {
      const title = updates.title.trim();
      if (!title) throw new Error('O título não pode ficar vazio.');
      if (title.length > 80) throw new Error('O título deve ter no máximo 80 caracteres.');
      next.title = title;
    }
    if (typeof updates.notes === 'string') {
      const notes = updates.notes.trim();
      if (notes.length > 240) throw new Error('A observação deve ter no máximo 240 caracteres.');
      next.notes = notes;
    }
    if (typeof updates.completed === 'boolean') next.completed = updates.completed;
    if (!Object.keys(next).length) return;
    next.updatedAt = serverTimestamp();
    await updateDoc(taskDocument(user.uid, taskId), next);
  };

  const removeTask = async (taskId) => {
    if (!user) throw new Error('Aguarde a conexão segura com o Firebase.');
    await deleteDoc(taskDocument(user.uid, taskId));
  };

  const value = useMemo(() => ({ tasks, loading, error, user, createTask, updateTask, removeTask }), [tasks, loading, error, user]);
  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) throw new Error('useTasks deve ser usado dentro de TasksContextProvider.');
  return context;
}
