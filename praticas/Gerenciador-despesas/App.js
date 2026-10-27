import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import TodasDespesas from './src/screens/TodasDespesas';
import DespesasRecentes from './src/screens/DespesasRecentes';
import GerenciarDespesa from './src/screens/GerenciarDespesa';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const despesasIniciais = [
  { id: '1', descricao: 'Supermercado', valor: 86.45, data: new Date(2026, 9, 25), categoria: 'Alimentação' },
  { id: '2', descricao: 'Passagem de ônibus', valor: 12.4, data: new Date(2026, 9, 24), categoria: 'Transporte' },
  { id: '3', descricao: 'Streaming', valor: 39.9, data: new Date(2026, 9, 22), categoria: 'Lazer' },
  { id: '4', descricao: 'Conta de internet', valor: 99.9, data: new Date(2026, 9, 20), categoria: 'Contas' },
];

function Abas({ despesas }) {
  return (
    <Tabs.Navigator screenOptions={({ route }) => ({ headerShown: false, tabBarActiveTintColor: '#635bff', tabBarInactiveTintColor: '#9da3b5', tabBarStyle: { height: 68, paddingBottom: 9, paddingTop: 7, borderTopColor: '#eceef5' }, tabBarLabelStyle: { fontSize: 11, fontWeight: '800' }, tabBarIcon: ({ color, size }) => <Ionicons name={route.name === 'Recentes' ? 'time-outline' : 'wallet-outline'} size={size} color={color} /> })}>
      <Tabs.Screen name="Recentes">{(props) => <DespesasRecentes {...props} despesas={despesas} />}</Tabs.Screen>
      <Tabs.Screen name="Todas">{(props) => <TodasDespesas {...props} despesas={despesas} />}</Tabs.Screen>
    </Tabs.Navigator>
  );
}

export default function App() {
  const [despesas, setDespesas] = useState(despesasIniciais);

  function salvarDespesa(despesa) {
    setDespesas((atuais) => atuais.some((item) => item.id === despesa.id) ? atuais.map((item) => item.id === despesa.id ? despesa : item) : [despesa, ...atuais]);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#f7f8fc' }, headerShadowVisible: false, headerTintColor: '#20243a', headerTitleStyle: { fontWeight: '900' } }}>
        <Stack.Screen name="Inicio" options={{ headerShown: false }}>{() => <Abas despesas={despesas} />}</Stack.Screen>
        <Stack.Screen name="GerenciarDespesa" options={{ title: 'Gerenciar despesa' }}>{(props) => <GerenciarDespesa {...props} onSave={salvarDespesa} />}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
