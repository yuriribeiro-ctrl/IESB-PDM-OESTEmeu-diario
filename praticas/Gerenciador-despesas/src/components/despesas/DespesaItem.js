import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function getDataFormatada(data) {
  const valor = data instanceof Date ? data : new Date(data);
  return valor.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '');
}

export default function DespesaItem({ item, onPress }) {
  return (
    <Pressable onPress={() => onPress?.(item)} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={styles.icon}><Text style={styles.iconText}>{item.categoria.charAt(0)}</Text></View>
      <View style={styles.content}>
        <View style={styles.titleLine}>
          <Text style={styles.description} numberOfLines={1}>{item.descricao}</Text>
          <Text style={styles.value}>R$ {item.valor.toFixed(2).replace('.', ',')}</Text>
        </View>
        <View style={styles.metaLine}>
          <Text style={styles.date}>{getDataFormatada(item.data)}</Text>
          <Text style={styles.tag}>{item.categoria}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { backgroundColor: '#fff', borderRadius: 18, padding: 15, flexDirection: 'row', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: '#eceef5' },
  pressed: { opacity: 0.72 },
  icon: { width: 42, height: 42, borderRadius: 14, backgroundColor: '#e9e7ff', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  iconText: { color: '#635bff', fontSize: 17, fontWeight: '900' },
  content: { flex: 1 },
  titleLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  description: { color: '#1a1d2e', fontWeight: '800', fontSize: 15, flex: 1 },
  value: { color: '#1a1d2e', fontWeight: '900', fontSize: 14 },
  metaLine: { flexDirection: 'row', alignItems: 'center', marginTop: 7, gap: 8 },
  date: { color: '#8990a8', fontSize: 12 },
  tag: { color: '#60677d', backgroundColor: '#f0f1f6', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, fontSize: 11, fontWeight: '800' },
});
