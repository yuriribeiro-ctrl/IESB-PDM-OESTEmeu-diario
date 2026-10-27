# Gerenciador de Despesas

Expansão do aplicativo de controle financeiro desenvolvida em React Native com Expo.

## Funcionalidades

- Cadastro e edição de despesas com descrição, valor, categoria e data.
- Categorias: Alimentação, Transporte, Lazer e Contas.
- Validação de campos obrigatórios e valor maior que zero.
- Regex `/^\d*\.?\d{0,2}$/` para limitar o valor a duas casas decimais.
- Seleção de data com `@react-native-community/datetimepicker`.
- Filtro dinâmico por categoria usando `.filter()`.
- Resumo calculado com `.reduce()` e formatação em reais.
- Bônus: total acima de R$ 200,00 aparece em vermelho.
- `FlatList` com `keyExtractor` e componentes reutilizáveis.

## Estrutura

```text
src/
├── components/despesas/
│   ├── DespesaItem.js
│   ├── DespesaSaida.js
│   ├── DespesasSaida.js
│   └── DespesaSumario.js
└── screens/
    ├── TodasDespesas.js
    ├── DespesasRecentes.js
    └── GerenciarDespesa.js
```

## Execução

```bash
npm install
npx expo start
```

Para validar no navegador:

```bash
npx expo start --web
```
