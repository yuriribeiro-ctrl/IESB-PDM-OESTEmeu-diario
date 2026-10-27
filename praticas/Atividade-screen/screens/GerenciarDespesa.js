import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function GerenciarDespesa() {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>+</Text>
      </View>
      <Text style={styles.title}>Gerenciar Despesa</Text>
      <Text style={styles.subtitle}>Tela preparada para cadastrar ou editar um lançamento.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#f7f8fc' },
  iconCircle: { width: 68, height: 68, borderRadius: 34, alignItems: 'center', justifyContent: 'center', backgroundColor: '#635bff', marginBottom: 18 },
  icon: { color: '#fff', fontSize: 38, fontWeight: '300', lineHeight: 42 },
  title: { color: '#18212f', fontSize: 26, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: '#778196', fontSize: 14, marginTop: 8, textAlign: 'center', maxWidth: 320 },
});
