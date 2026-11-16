import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
export async function scheduleReminder(title, seconds = 10) {
  if (Platform.OS === 'android') await Notifications.setNotificationChannelAsync('campusgo', { name: 'CampusGo', importance: Notifications.AndroidImportance.DEFAULT });
  const permission = await Notifications.requestPermissionsAsync();
  if (permission.status !== 'granted') return false;
  await Notifications.scheduleNotificationAsync({ content: { title, body: 'Seu lembrete do CampusGo chegou.' }, trigger: { seconds, channelId: 'campusgo' } });
  return true;
}
