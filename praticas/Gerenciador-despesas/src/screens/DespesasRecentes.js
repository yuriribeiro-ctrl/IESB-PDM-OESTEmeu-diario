import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import DespesaSaida from '../components/despesas/DespesaSaida';
import DespesaSumario from '../components/despesas/DespesaSumario';

export default function DespesasRecentes({ despesas, navigation }) {
  const recentes = [...despesas].sort((a, b) => new Date(b.data) - new Date(a.data)).slice(0, 3);
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}><View><Text style={styles.eyebrow}>BEM-VINDO DE VOLTA</Text><Text style={styles.title}>Despesas recentes</Text></View><Pressable onPress={() => navigation.navigate('GerenciarDespesa')} style={styles.add}><Text style={styles.addText}>＋</Text></Pressable></View>
        <Text style={styles.subtitle}>Seus três lançamentos mais recentes.</Text>
        <View style={styles.summary}><DespesaSumario despesas={recentes} /></View>
        <DespesaSaida despesas={recentes} onSelect={(item) => navigation.navigate('GerenciarDespesa', { despesa: item })} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: '#f7f8fc' }, container: { flex: 1, padding: 22 }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, eyebrow: { color: '#635bff', fontSize: 11, fontWeight: '900', letterSpacing: 1.5 }, title: { color: '#171a2d', fontSize: 27, fontWeight: '900', marginTop: 6 }, subtitle: { color: '#8189a3', fontSize: 14, marginTop: 8 }, add: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#635bff', alignItems: 'center', justifyContent: 'center' }, addText: { color: '#fff', fontSize: 28, lineHeight: 31 }, summary: { marginTop: 22 }, });
