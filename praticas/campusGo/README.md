# CampusGo

Aplicativo React Native/Expo criado para a Atividade Prática da Aula 10. Implementa Expo Router, abas em português, rotas dinâmicas, modal, contexto de despesas, compartilhamento, foto de perfil persistida, câmera, localização, notificação local, vibração, FadeIn e mural de avisos consumido do JSONPlaceholder.

## Execução

```bash
cp .env.example .env
npm install
npx expo start
```

O projeto não usa `NavigationContainer`, não inclui `node_modules` nem `.env` no repositório. A URL da API é lida de `EXPO_PUBLIC_API_URL`.

## Rotas

- `/` — Mural de avisos
- `/tasks` — tarefas, check-in, lembrete e conclusão
- `/wallet` — despesas e compartilhamento
- `/profile` — foto persistente e câmera
- `/task/42` — detalhe dinâmico
- `/new-task` — modal de nova tarefa
