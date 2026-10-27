# Atividade Screen — Navegação de Despesas

Projeto React Native com Expo criado para praticar navegação combinando **Native Stack** e **Bottom Tabs**.

## Estrutura

```text
Atividade-screen/
├── components/
│   └── IconButton.js
├── screens/
│   ├── DespesasRecentes.js
│   ├── TodasDespesas.js
│   └── GerenciarDespesa.js
├── App.js
└── package.json
```

## Requisitos atendidos

- `NavigationContainer` envolvendo o aplicativo.
- `createNativeStackNavigator` com as telas `Despesas` e `GerenciarDespesa`.
- `createBottomTabNavigator` aninhado na tela `Despesas`.
- Abas Recentes e Todas com ícones `hourglass` e `wallet-outline`.
- Componente reutilizável `IconButton` com `Pressable`, `Ionicons` e feedback de opacidade ao pressionar.
- Botão no cabeçalho que navega para `GerenciarDespesa`.

## Executar

```bash
npm install
npx expo start
```

Para testar no navegador:

```bash
npx expo start --web
```
