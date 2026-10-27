import React, { useEffect, useState } from 'react';
import { Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const categorias = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

export default function GerenciarDespesa({ route, navigation, onSave }) {
  const editando = route?.params?.despesa;
  const [descricao, setDescricao] = useState(editando?.descricao || '');
  const [valor, setValor] = useState(editando ? String(editando.valor).replace('.', ',') : '');
  const [categoria, setCategoria] = useState(editando?.categoria || '');
  const [data, setData] = useState(editando ? new Date(editando.data) : new Date());
  const [mostrarData, setMostrarData] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => navigation.setOptions({ title: editando ? 'Editar despesa' : 'Nova despesa' }), [navigation, editando]);

  function alterarValor(texto) {
    const normalizado = texto.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(normalizado)) setValor(texto);
  }

  function submeter() {
    if (!descricao.trim() || !valor.trim() || !categoria) { setErro('Preencha descrição, valor e categoria para continuar.'); return; }
    const valorNumerico = Number(valor.replace(',', '.'));
    if (!valorNumerico || valorNumerico <= 0) { setErro('Informe um valor maior que zero.'); return; }
    onSave({ id: editando?.id || `${Date.now()}`, descricao: descricao.trim(), valor: valorNumerico, categoria, data });
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.eyebrow}>{editando ? 'ATUALIZAÇÃO' : 'NOVO LANÇAMENTO'}</Text><Text style={styles.title}>{editando ? 'Edite sua despesa' : 'Onde você gastou?'}</Text><Text style={styles.subtitle}>Organize seus gastos para acompanhar melhor seu mês.</Text>
      <Text style={styles.label}>Descrição</Text><TextInput value={descricao} onChangeText={setDescricao} placeholder="Ex.: Mercado do mês" placeholderTextColor="#a3a9bb" style={styles.input} />
      <Text style={styles.label}>Valor</Text><View style={styles.moneyInput}><Text style={styles.currency}>R$</Text><TextInput value={valor} onChangeText={alterarValor} placeholder="0,00" placeholderTextColor="#a3a9bb" keyboardType="decimal-pad" style={styles.money} /></View><Text style={styles.hint}>Use até duas casas decimais.</Text>
      <Text style={styles.label}>Categoria</Text><View style={styles.categoryGrid}>{categorias.map((item) => <Pressable key={item} onPress={() => setCategoria(item)} style={[styles.category, categoria === item && styles.categoryActive]}><Text style={[styles.categoryText, categoria === item && styles.categoryTextActive]}>{item}</Text></Pressable>)}</View>
      <Text style={styles.label}>Data</Text><Pressable onPress={() => setMostrarData(true)} style={styles.dateButton}><Text style={styles.dateIcon}>◷</Text><Text style={styles.dateText}>{data.toLocaleDateString('pt-BR')}</Text><Text style={styles.change}>Alterar</Text></Pressable>
      {mostrarData && Platform.OS !== 'web' && <DateTimePicker value={data} mode="date" onChange={(_, selected) => { setMostrarData(false); if (selected) setData(selected); }} />}
      {mostrarData && Platform.OS === 'web' && <View style={styles.webDate}><TextInput value={data.toISOString().slice(0, 10)} onChangeText={(text) => { const next = new Date(`${text}T12:00:00`); if (!Number.isNaN(next.getTime())) setData(next); }} style={styles.input} /><Pressable onPress={() => setMostrarData(false)}><Text style={styles.change}>Confirmar data</Text></Pressable></View>}
      {!!erro && <Text style={styles.error}>{erro}</Text>}
      <Pressable onPress={submeter} style={styles.save}><Text style={styles.saveText}>{editando ? 'Salvar alterações' : 'Adicionar despesa'}</Text></Pressable>
    </ScrollView></SafeAreaView>
  );
}

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: '#f7f8fc' }, container: { padding: 22, paddingBottom: 40 }, eyebrow: { color: '#635bff', fontSize: 11, fontWeight: '900', letterSpacing: 1.6 }, title: { color: '#171a2d', fontSize: 29, fontWeight: '900', marginTop: 7 }, subtitle: { color: '#8189a3', fontSize: 14, lineHeight: 20, marginTop: 9, marginBottom: 26 }, label: { color: '#363b55', fontSize: 13, fontWeight: '900', marginBottom: 9, marginTop: 16 }, input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e6e8f0', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, color: '#20243a', fontSize: 15 }, moneyInput: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e6e8f0', borderRadius: 14, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }, currency: { color: '#635bff', fontWeight: '900', fontSize: 16, marginRight: 8 }, money: { flex: 1, paddingVertical: 14, color: '#20243a', fontSize: 15 }, hint: { color: '#9ba1b3', fontSize: 11, marginTop: 6 }, categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 }, category: { paddingHorizontal: 14, paddingVertical: 12, borderRadius: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e6e8f0' }, categoryActive: { backgroundColor: '#635bff', borderColor: '#635bff' }, categoryText: { color: '#707890', fontSize: 12, fontWeight: '800' }, categoryTextActive: { color: '#fff' }, dateButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e6e8f0', borderRadius: 14, padding: 15, flexDirection: 'row', alignItems: 'center' }, dateIcon: { color: '#635bff', fontSize: 22, marginRight: 10 }, dateText: { color: '#20243a', fontWeight: '700', flex: 1 }, change: { color: '#635bff', fontSize: 12, fontWeight: '900' }, webDate: { marginTop: 10 }, error: { color: '#d14e5d', backgroundColor: '#ffebed', borderRadius: 10, padding: 12, marginTop: 17, fontSize: 12, fontWeight: '700' }, save: { backgroundColor: '#635bff', borderRadius: 16, padding: 17, alignItems: 'center', marginTop: 24 }, saveText: { color: '#fff', fontSize: 15, fontWeight: '900' }, });
