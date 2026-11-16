import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTasks } from '../store/tasks-context';

export default function NewTask() {
  const { id } = useLocalSearchParams();
  const taskId = Array.isArray(id) ? id[0] : id;
  const { tasks, loading: tasksLoading, createTask, updateTask } = useTasks();
  const task = taskId ? tasks.find((item) => item.id === taskId) : null;
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [validation, setValidation] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setNotes(task.notes || '');
    }
  }, [task?.id]);

  const save = async () => {
    const cleanTitle = title.trim();
    const cleanNotes = notes.trim();
    if (!cleanTitle) {
      setValidation('Informe o título da tarefa.');
      return;
    }
    if (cleanTitle.length > 80) {
      setValidation('O título deve ter no máximo 80 caracteres.');
      return;
    }
    if (cleanNotes.length > 240) {
      setValidation('A observação deve ter no máximo 240 caracteres.');
      return;
    }

    setValidation('');
    setSaving(true);
    try {
      if (taskId) await updateTask(taskId, { title: cleanTitle, notes: cleanNotes });
      else await createTask({ title: cleanTitle, notes: cleanNotes });
      Alert.alert('Salvo com sucesso', taskId ? 'A tarefa foi atualizada no Firestore.' : 'A tarefa foi criada no Firestore.');
      router.back();
    } catch (error) {
      setValidation(error.message || 'Não foi possível salvar. Confira a conexão com o Firebase.');
    } finally {
      setSaving(false);
    }
  };

  if (taskId && tasksLoading && !task) {
    return <View style={styles.center}><ActivityIndicator color="#6d5dfc" /><Text style={styles.helper}>Carregando tarefa…</Text></View>;
  }
  if (taskId && !tasksLoading && !task) {
    return <View style={styles.center}><Text style={styles.title}>Tarefa não encontrada</Text><Pressable style={styles.secondary} onPress={() => router.back()}><Text style={styles.secondaryText}>Voltar</Text></Pressable></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>{taskId ? 'ATUALIZE SUA ROTINA' : 'PLANEJE SEU DIA'}</Text>
      <Text style={styles.title}>{taskId ? 'Editar tarefa' : 'Nova tarefa'}</Text>
      <Text style={styles.helper}>Os campos são validados antes de salvar no Firestore.</Text>
      <Text style={styles.label}>Título *</Text>
      <TextInput
        accessibilityLabel="Título da tarefa"
        placeholder="Ex.: Revisar aula de dispositivos móveis"
        value={title}
        onChangeText={(value) => { setTitle(value); setValidation(''); }}
        maxLength={80}
        returnKeyType="next"
        style={styles.input}
      />
      <Text style={styles.counter}>{title.trim().length}/80 caracteres</Text>
      <Text style={styles.label}>Observação</Text>
      <TextInput
        accessibilityLabel="Observação da tarefa"
        placeholder="Conteúdo ou detalhe para lembrar"
        value={notes}
        onChangeText={(value) => { setNotes(value); setValidation(''); }}
        maxLength={240}
        multiline
        textAlignVertical="top"
        style={[styles.input, styles.notes]}
      />
      <Text style={styles.counter}>{notes.trim().length}/240 caracteres</Text>
      {!!validation && <Text accessibilityRole="alert" style={styles.error}>{validation}</Text>}
      <Pressable style={[styles.primary, saving && styles.disabled]} onPress={save} disabled={saving}>
        {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryText}>{taskId ? 'Salvar alterações' : 'Salvar tarefa'}</Text>}
      </Pressable>
      <Pressable style={styles.secondary} onPress={() => router.back()} disabled={saving}><Text style={styles.secondaryText}>Cancelar</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  kicker: { color: '#6d5dfc', fontWeight: '800', letterSpacing: 1.5 },
  title: { fontSize: 28, fontWeight: '800', marginTop: 8, marginBottom: 8, color: '#17172b' },
  helper: { color: '#626276', lineHeight: 21, marginBottom: 22 },
  label: { fontWeight: '700', marginBottom: 7, marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 14, backgroundColor: '#fff', fontSize: 15 },
  notes: { minHeight: 112 },
  counter: { color: '#85859a', textAlign: 'right', marginTop: 5, fontSize: 12 },
  error: { backgroundColor: '#fff0f1', color: '#a3313b', padding: 12, borderRadius: 10, marginTop: 12 },
  primary: { backgroundColor: '#6d5dfc', padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 20, minHeight: 52, justifyContent: 'center' },
  disabled: { opacity: 0.6 },
  primaryText: { color: '#fff', fontWeight: '800' },
  secondary: { padding: 16, alignItems: 'center' },
  secondaryText: { color: '#6d5dfc', fontWeight: '700' },
});
