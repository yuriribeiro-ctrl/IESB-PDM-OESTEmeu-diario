import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const ExpensesContext = createContext(null);
const initial = [
  { id: '1', description: 'Mercado', amount: 86.45, date: '2026-10-25', category: 'Alimentação' },
  { id: '2', description: 'Passagem de ônibus', amount: 12.4, date: '2026-10-24', category: 'Transporte' },
  { id: '3', description: 'Streaming', amount: 39.9, date: '2026-10-22', category: 'Lazer' },
];
export function ExpensesContextProvider({ children }) {
  const [expenses, setExpenses] = useState(initial);
  useEffect(() => { AsyncStorage.getItem('@campusgo-expenses').then(v => v && setExpenses(JSON.parse(v))); }, []);
  useEffect(() => { AsyncStorage.setItem('@campusgo-expenses', JSON.stringify(expenses)); }, [expenses]);
  return <ExpensesContext.Provider value={{ expenses, setExpenses }}>{children}</ExpensesContext.Provider>;
}
export const useExpenses = () => useContext(ExpensesContext);
