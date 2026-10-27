import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DespesaSumario({ despesas }) {
  const somaDespesas = despesas.reduce((acumulador, item) => acumulador + item.valor, 0);
  const acimaDoLimite = somaDespesas > 200;

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.label}>TOTAL NO FILTRO</Text>
        <Text style={styles.caption}>{despesas.length} lançamento{despesas.length === 1 ? '' : 's'}</Text>
      </View>
      <Text style={[styles.total, acimaDoLimite && styles.totalAlert]}>
        R$ {somaDespesas.toFixed(2).replace('.', ',')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#14172a', borderRadius: 24, padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  label: { color: '#a8b0cc', fontSize: 11, fontWeight: '800', letterSpacing: 1.3 },
  caption: { color: '#737b9d', marginTop: 5, fontSize: 12 },
  total: { color: '#7de2b8', fontSize: 26, fontWeight: '900' },
  totalAlert: { color: '#ff7979' },
});
