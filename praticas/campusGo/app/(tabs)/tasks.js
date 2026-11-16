import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';
import { useTasks } from '../../store/tasks-context';

export default function Tasks() {
  const { tasks, loading, error, user, updateTask, removeTask } = useTasks();
  const [busyId, setBusyId] = useState('');
  const [nativeMessage, setNativeMessage] = useState('');
  const syncLabel = loading
    ? 'Conectando ao Firestore…'
    : error
      ? 'Sincronização indisponível'
      : user
        ? 'Sincronizadas com o Firebase'
        : 'Aguardando autenticação';

  const toggleTask = async (task) => {
    setBusyId(task.id);
    try {
      await updateTask(task.id, { completed: !task.completed });
      if (!task.completed) await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e) {
      Alert.alert('Não foi possível atualizar', e.message || 'Confira a conexão e as regras do Firebase.');
    } finally {
      setBusyId('');
    }
  };

  const confirmDelete = (task) => Alert.alert(
    'Excluir tarefa?',
    `“${task.title}” será removida do Firestore.`,
    [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: async () => {
        setBusyId(task.id);
        try { await removeTask(task.id); }
        catch (e) { Alert.alert('Não foi possível excluir', e.message || 'Tente novamente.'); }
        finally { setBusyId(''); }
      } },
    ],
  );

  const checkIn = async () => {
    try {
      const place = await getCurrentPlace();
      if (place) {
        setNativeMessage(`Check-in: ${place.label}`);
        Alert.alert('Check-in realizado', place.label);
      } else {
        Alert.alert('Permissão necessária', 'Não foi possível acessar sua localização.');
      }
    } catch {
      Alert.alert('Check-in indisponível', 'Tente novamente.');
    }
  };

  const remind = async () => {
    try {
      await scheduleReminder('CampusGo: hora de estudar', 10);
      setNativeMessage('Lembrete local agendado para daqui a 10 segundos.');
      Alert.alert('Lembrete agendado', 'Você receberá um lembrete em 10 segundos.');
    } catch {
      Alert.alert('Lembrete indisponível', 'O recurso não está disponível neste dispositivo.');
    }
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskCard}>
      <Pressable style={styles.taskMain} onPress={() => router.push(`/task/${item.id}`)} accessibilityRole="button">
        <Ionicons name={item.completed ? 'checkmark-circle' : 'ellipse-outline'} size={23} color={item.completed ? '#2c9b68' : '#6d5dfc'} />
        <View style={styles.taskText}>
          <Text style={[styles.cardTitle, item.completed && styles.completedText]}>{item.title}</Text>
          {!!item.notes && <Text style={styles.muted} numberOfLines={2}>{item.notes}</Text>}
          <Text style={styles.taskHint}>{item.completed ? 'Concluída' : 'Toque para ver detalhes'}</Text>
        </View>
      </Pressable>
      <View style={styles.actions}>
        <Pressable style={styles.iconButton} onPress={() => toggleTask(item)} disabled={busyId === item.id} accessibilityLabel={item.completed ? 'Reabrir tarefa' : 'Concluir tarefa'}>
          <Ionicons name={item.completed ? 'refresh-outline' : 'checkmark-done-outline'} size={20} color="#2c9b68" />
        </Pressable>
        <Pressable style={styles.iconButton} onPress={() => router.push({ pathname: '/new-task', params: { id: item.id } })} accessibilityLabel="Editar tarefa">
          <Ionicons name="create-outline" size={20} color="#6d5dfc" />
        </Pressable>
        <Pressable style={styles.iconButton} onPress={() => confirmDelete(item)} disabled={busyId === item.id} accessibilityLabel="Excluir tarefa">
          <Ionicons name="trash-outline" size={20} color="#c44755" />
        </Pressable>
      </View>
    </View>
  );

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.container}
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={renderTask}
      ListHeaderComponent={(
        <View>
          <Text style={styles.eyebrow}>ORGANIZAÇÃO</Text>
          <Text style={styles.title}>Tarefas</Text>
          <Text style={styles.copy}>Planeje seus estudos e acompanhe o que precisa fazer no campus.</Text>
          <View style={styles.status}>
            <Ionicons name={error ? 'cloud-offline-outline' : loading ? 'cloud-outline' : 'cloud-done-outline'} size={18} color={error ? '#a3313b' : '#2c9b68'} />
            <Text style={[styles.statusText, error && styles.errorStatus]}>{syncLabel}</Text>
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Pressable style={styles.primary} onPress={() => router.push('/new-task')}>
            <Ionicons name="add" size={21} color="#fff" />
            <Text style={styles.primaryText}>Nova tarefa</Text>
          </Pressable>
          <Text style={styles.sectionTitle}>Minhas tarefas</Text>
        </View>
      )}
      ListEmptyComponent={(
        <View style={styles.empty}>
          <Ionicons name="checkmark-done-circle-outline" size={38} color="#aaa8c1" />
          <Text style={styles.emptyTitle}>{loading ? 'Conectando ao Firebase…' : error ? 'Tarefas indisponíveis' : 'Tudo pronto para começar'}</Text>
          <Text style={styles.muted}>{loading ? 'As tarefas serão carregadas em instantes.' : error ? 'Não foi possível sincronizar. Confira a internet e tente novamente.' : 'Crie uma tarefa e ela ficará salva na sua conta.'}</Text>
        </View>
      )}
      ListFooterComponent={(
        <View style={styles.nativeSection}>
          <Text style={styles.sectionTitle}>Recursos do dispositivo</Text>
          {!!nativeMessage && <Text style={styles.nativeMessage}>{nativeMessage}</Text>}
          <View style={styles.row}>
            <Pressable style={styles.small} onPress={checkIn}><Ionicons name="location-outline" size={17} color="#6d5dfc" /><Text style={styles.smallText}>Check-in</Text></Pressable>
            <Pressable style={styles.small} onPress={remind}><Ionicons name="notifications-outline" size={17} color="#6d5dfc" /><Text style={styles.smallText}>Lembrete em 10 s</Text></Pressable>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f7f7fb' },
  container: { padding: 22, paddingBottom: 34 },
  eyebrow: { fontSize: 12, fontWeight: '800', letterSpacing: 2, color: '#6d5dfc' },
  title: { fontSize: 32, fontWeight: '900', marginTop: 8 },
  copy: { color: '#626276', fontSize: 16, lineHeight: 23, marginTop: 4, marginBottom: 15 },
  status: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 16 },
  statusText: { fontSize: 13, fontWeight: '700', color: '#357852' },
  errorStatus: { color: '#a3313b' },
  error: { backgroundColor: '#fff0f1', color: '#a3313b', padding: 12, borderRadius: 12, marginBottom: 14 },
  primary: { flexDirection: 'row', gap: 7, backgroundColor: '#6d5dfc', padding: 15, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: '#fff', fontWeight: '800' },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginTop: 22, marginBottom: 10, color: '#17172b' },
  taskCard: { backgroundColor: '#fff', padding: 14, borderRadius: 16, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 1 },
  taskMain: { flexDirection: 'row', alignItems: 'flex-start', gap: 11 },
  taskText: { flex: 1 },
  cardTitle: { fontWeight: '800', fontSize: 16, color: '#17172b' },
  completedText: { textDecorationLine: 'line-through', color: '#87879a' },
  muted: { color: '#85859a', marginTop: 5, lineHeight: 20 },
  taskHint: { color: '#6d5dfc', fontSize: 12, fontWeight: '700', marginTop: 6 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 6, marginTop: 6 },
  iconButton: { width: 38, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#f7f7fb' },
  empty: { alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 24, marginTop: 4 },
  emptyTitle: { fontSize: 16, fontWeight: '800', marginTop: 10, color: '#17172b' },
  nativeSection: { marginTop: 2 },
  nativeMessage: { color: '#357852', marginBottom: 10, fontSize: 13 },
  row: { flexDirection: 'row', gap: 10 },
  small: { flexDirection: 'row', gap: 6, backgroundColor: '#fff', padding: 13, borderRadius: 12, flex: 1, alignItems: 'center', justifyContent: 'center' },
  smallText: { fontWeight: '700', fontSize: 12 },
});
