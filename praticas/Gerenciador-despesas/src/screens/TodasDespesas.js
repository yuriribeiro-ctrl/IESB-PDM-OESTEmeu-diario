import React, { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import DespesaSaida from '../components/despesas/DespesaSaida';
import DespesaSumario from '../components/despesas/DespesaSumario';

const categorias = ['Todas', 'Alimentação', 'Transporte', 'Lazer', 'Contas'];

export default function TodasDespesas({ despesas, navigation }) {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');
  const despesasFiltradas = useMemo(() => categoriaAtiva === 'Todas' ? despesas : despesas.filter((item) => item.categoria === categoriaAtiva), [despesas, categoriaAtiva]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}><View><Text style={styles.eyebrow}>VISÃO GERAL</Text><Text style={styles.title}>Todas as despesas</Text></View><Pressable onPress={() => navigation.navigate('GerenciarDespesa')} style={styles.add}><Text style={styles.addText}>＋</Text></Pressable></View>
        <Text style={styles.subtitle}>Filtre seus lançamentos por categoria.</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          {categorias.map((categoria) => <Pressable key={categoria} onPress={() => setCategoriaAtiva(categoria)} style={[styles.filter, categoriaAtiva === categoria && styles.filterActive]}><Text style={[styles.filterText, categoriaAtiva === categoria && styles.filterTextActive]}>{categoria}</Text></Pressable>)}
        </ScrollView>
        <DespesaSumario despesas={despesasFiltradas} />
        <DespesaSaida despesas={despesasFiltradas} onSelect={(item) => navigation.navigate('GerenciarDespesa', { despesa: item })} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f8fc' },
  container: { padding: 22, paddingBottom: 32 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eyebrow: { color: '#635bff', fontSize: 11, fontWeight: '900', letterSpacing: 1.6 },
  title: { color: '#171a2d', fontSize: 28, fontWeight: '900', marginTop: 6 },
  subtitle: { color: '#8189a3', fontSize: 14, marginTop: 8 },
  add: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#635bff', alignItems: 'center', justifyContent: 'center' },
  addText: { color: '#fff', fontSize: 28, fontWeight: '300', lineHeight: 31 },
  filters: { gap: 8, paddingVertical: 22 },
  filter: { paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#e7e9f1' },
  filterActive: { backgroundColor: '#635bff', borderColor: '#635bff' },
  filterText: { color: '#727a94', fontSize: 12, fontWeight: '800' },
  filterTextActive: { color: '#fff' },
});
