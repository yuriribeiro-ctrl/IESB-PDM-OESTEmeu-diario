import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import DespesaItem from './DespesaItem';

export default function DespesaSaida({ despesas, onSelect }) {
  return (
    <FlatList
      data={despesas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DespesaItem item={item} onPress={onSelect} />}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyTitle}>Nenhuma despesa encontrada</Text><Text style={styles.emptyText}>Tente trocar o filtro ou cadastre um novo lançamento.</Text></View>}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingBottom: 28 },
  empty: { backgroundColor: '#fff', borderRadius: 18, padding: 28, alignItems: 'center', borderWidth: 1, borderColor: '#eceef5' },
  emptyTitle: { color: '#272b42', fontSize: 16, fontWeight: '800' },
  emptyText: { color: '#8d94aa', fontSize: 13, textAlign: 'center', marginTop: 8, lineHeight: 19 },
});
