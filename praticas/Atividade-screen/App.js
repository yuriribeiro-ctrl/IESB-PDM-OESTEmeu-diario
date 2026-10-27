import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import DespesasRecentes from './screens/DespesasRecentes';
import TodasDespesas from './screens/TodasDespesas';
import GerenciarDespesa from './screens/GerenciarDespesa';
import IconButton from './components/IconButton';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: '#ffffff' },
        headerTitleStyle: { color: '#18212f', fontWeight: '800' },
        headerShadowVisible: false,
        headerRight: () => (
          <IconButton
            icon="add-circle-outline"
            size={25}
            color="#635bff"
            onPress={() => navigation.navigate('GerenciarDespesa')}
          />
        ),
        tabBarActiveTintColor: '#635bff',
        tabBarInactiveTintColor: '#8e97a8',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '700' },
        tabBarStyle: { height: 64, paddingBottom: 8, paddingTop: 5 },
      })}
    >
      <Tab.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{
          title: 'Despesas Recentes',
          tabBarLabel: 'Recentes',
          tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{
          title: 'Todas as Despesas',
          tabBarLabel: 'Todas',
          tabBarIcon: ({ color, size }) => <Ionicons name="wallet-outline" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Despesas" component={BottomTabScreen} options={{ headerShown: false }} />
        <Stack.Screen name="GerenciarDespesa" component={GerenciarDespesa} options={{ title: 'Gerenciar Despesa' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
