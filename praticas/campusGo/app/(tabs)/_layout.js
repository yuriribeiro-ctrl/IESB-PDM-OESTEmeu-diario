import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
const icons = { index: 'home-outline', tasks: 'checkmark-circle-outline', wallet: 'wallet-outline', profile: 'person-outline' };
export default function TabsLayout() { return <Tabs screenOptions={({ route }) => ({ headerTitleAlign: 'center', tabBarActiveTintColor: '#6d5dfc', tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name]} color={color} size={size} /> })}><Tabs.Screen name="index" options={{ title: 'Início' }} /><Tabs.Screen name="tasks" options={{ title: 'Tarefas' }} /><Tabs.Screen name="wallet" options={{ title: 'Bolso' }} /><Tabs.Screen name="profile" options={{ title: 'Perfil' }} /></Tabs>; }
