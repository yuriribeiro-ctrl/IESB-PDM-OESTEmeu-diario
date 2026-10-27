import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TodasDespesas() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>VISÃO GERAL</Text>
      <Text style={styles.title}>Todas as Despesas</Text>
      <Text style={styles.subtitle}>Consulte o histórico completo dos seus gastos.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#f7f8fc' },
  eyebrow: { color: '#635bff', fontSize: 11, fontWeight: '800', letterSpacing: 1.5, marginBottom: 10 },
  title: { color: '#18212f', fontSize: 26, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: '#778196', fontSize: 14, marginTop: 8, textAlign: 'center' },
});
