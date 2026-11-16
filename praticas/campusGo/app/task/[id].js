import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useTasks } from '../../store/tasks-context';

export default function TaskDetail() {
  const { id } = useLocalSearchParams();
  const taskId = Array.isArray(id) ? id[0] : id;
  const { tasks, loading, updateTask, removeTask } = useTasks();
  const task = tasks.find((item) => item.id === taskId);
  const [saving, setSaving] = useState(false);

  const toggleComplete = async () => {
    setSaving(true);
    try {
      await updateTask(task.id, { completed: !task.completed });
      if (!task.completed) await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      Alert.alert('Não foi possível atualizar', error.message || 'Confira a conexão e tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const deleteTask = () => Alert.alert(
    'Excluir tarefa?',
    'Esta ação remove a tarefa do Firestore.',
    [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: async () => {
        setSaving(true);
        try { await removeTask(task.id); router.back(); }
        catch (error) { Alert.alert('Não foi possível excluir', error.message || 'Tente novamente.'); }
        finally { setSaving(false); }
      } },
    ],
  );

  if (loading && !task) {
    return <View style={styles.center}><ActivityIndicator color="#6d5dfc" /><Text style={styles.copy}>Carregando do Firestore…</Text></View>;
  }
  if (!task) {
    return <View style={styles.center}><Text style={styles.title}>Tarefa não encontrada</Text><Text style={styles.copy}>Ela pode ter sido removida ou não pertencer a esta sessão.</Text><Pressable style={styles.button} onPress={() => router.back()}><Text style={styles.buttonText}>Voltar</Text></Pressable></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>DETALHE DA TAREFA</Text>
      <Text style={styles.title}>{task.title}</Text>
      <View style={styles.status}><Ionicons name={task.completed ? 'checkmark-circle' : 'time-outline'} size={20} color={task.completed ? '#2c9b68' : '#6d5dfc'} /><Text style={styles.statusText}>{task.completed ? 'Concluída' : 'Pendente'}</Text></View>
      <Text style={styles.copy}>{task.notes || 'Nenhuma observação adicionada.'}</Text>
      <Text style={styles.meta}>Persistida no Cloud Firestore</Text>
      <Pressable style={[styles.button, saving && styles.disabled]} onPress={toggleComplete} disabled={saving}>
        <Text style={styles.buttonText}>{task.completed ? 'Reabrir tarefa' : 'Marcar como concluída'}</Text>
      </Pressable>
      <Pressable style={styles.secondary} onPress={() => router.push({ pathname: '/new-task', params: { id: task.id } })}><Text style={styles.secondaryText}>Editar tarefa</Text></Pressable>
      <Pressable style={styles.delete} onPress={deleteTask} disabled={saving}><Text style={styles.deleteText}>Excluir tarefa</Text></Pressable>
      <Pressable style={styles.back} onPress={() => router.back()}><Text style={styles.secondaryText}>Voltar à lista</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 28, justifyContent: 'center', backgroundColor: '#f7f7fb' },
  center: { flex: 1, padding: 28, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7f7fb' },
  kicker: { color: '#6d5dfc', fontWeight: '800', letterSpacing: 2 },
  title: { fontSize: 28, fontWeight: '800', marginVertical: 12, color: '#17172b' },
  status: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 14 },
  statusText: { fontWeight: '700', color: '#357852' },
  copy: { fontSize: 16, color: '#555', lineHeight: 24, marginBottom: 14 },
  meta: { color: '#77778b', fontSize: 12, marginBottom: 22 },
  button: { backgroundColor: '#17172b', padding: 16, borderRadius: 14, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
  disabled: { opacity: 0.6 },
  secondary: { backgroundColor: '#fff', padding: 15, borderRadius: 14, alignItems: 'center', marginTop: 10 },
  secondaryText: { color: '#6d5dfc', fontWeight: '700' },
  delete: { alignItems: 'center', padding: 14, marginTop: 8 },
  deleteText: { color: '#c44755', fontWeight: '700' },
  back: { alignItems: 'center', padding: 10 },
});
