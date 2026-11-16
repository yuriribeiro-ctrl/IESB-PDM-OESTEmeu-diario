# Roteiro de apresentação — CampusGo

**Aluno:** Yuri dos Santos Ribeiro — **Matrícula:** 24114290189
**Disciplina:** Dispositivos Móveis
**Duração sugerida:** 4 a 6 minutos

## Abertura

> “Sou Yuri dos Santos Ribeiro, matrícula 24114290189. O CampusGo é um aplicativo mobile de apoio à rotina universitária. Reúne organização de tarefas, recursos úteis para o dia a dia no campus e um resumo de despesas. Foi desenvolvido individualmente a partir do projeto que já estava no GitHub.”

## Demonstração, em ordem

1. **Navegação (30–40 s):** mostre as abas Início, Tarefas, Bolso e Perfil. Explique que Expo Router integra Bottom Tabs ao Stack, incluindo detalhe dinâmico e modal.
2. **Firebase/Firestore (1–2 min):** abra Tarefas, crie uma tarefa curta, volte à lista e mostre-a; marque como concluída, abra o detalhe, edite e, se houver tempo, exclua a tarefa de teste. Explique que a lista usa `onSnapshot` para atualização em tempo real. O documento fica em `users/{uid}/tasks/{taskId}`.
3. **Validação e estado (30–45 s):** tente salvar sem título para exibir a validação; mostre carregamento, mensagem de sincronização e estado vazio. Título aceita até 80 caracteres e observação até 240.
4. **Recurso nativo (30–45 s):** demonstre o check-in de localização ou o lembrete local; ao concluir tarefa, há feedback háptico. A disponibilidade depende de permissão e do dispositivo.
5. **Outras partes do app (30–45 s):** apresente Bolso (gerenciador de despesas), Perfil e as abas existentes. Explique que foto e despesas usam armazenamento local na versão atual; despesas ainda não foram migradas para Firestore.
6. **Arquitetura/segurança (30–45 s):** aponte `services/firebase.native.js`, `store/tasks-context.js`, as telas e `firestore.rules`. Explique autenticação anônima, UID e bloqueio de leitura/escrita entre usuários. Se abrir o Console, mostre Firestore → Regras e o provedor Anônimo.
7. **Git Flow (20–30 s):** mostre `main`, `develop` e `feature/campus-go`. A branch `develop` foi criada a partir de `main`; a PR #5 de `feature/campus-go` para `develop` está aberta para revisão e ainda não foi mesclada. Link: https://github.com/yuriribeiro-ctrl/IESB-PDM-OESTEmeu-diario/pull/5.

## Encerramento

> “O projeto combina navegação por abas e stack, componentes React Native, layout Flexbox, estado local e global, formulário validado, ícones vetoriais e recursos nativos. O Firebase Authentication anônimo identifica a sessão da demonstração, e o Cloud Firestore realiza CRUD completo de tarefas com regras de acesso por UID. Como próximos passos, posso migrar as despesas para a nuvem e, após a revisão, mesclar a PR conforme a orientação do professor.”

## Preparação para amanhã

- Na pasta `praticas/campusGo`, confirme que `.env` existe (copiado de `.env.example`) e execute `npm install` se as dependências ainda não estiverem instaladas.
- Execute `npx expo start`, abra Expo Go no celular e leia o QR code. Celular e computador devem estar na mesma rede; deixe uma alternativa pronta caso a rede do local bloqueie o Metro.
- Antes da aula, confirme que a aba Tarefas conecta sem erro e teste uma operação CRUD real com uma tarefa de demonstração. Exclua-a ao terminar, se não quiser deixá-la na conta anônima.
- Deixe o Console Firebase do projeto `campusgo-72389` aberto nas abas Authentication → Sign-in method e Firestore Database → Regras, caso o professor queira ver a configuração.
- Localização e notificações precisam de permissão e podem se comportar de forma diferente no emulador. Não dependa de uma notificação como único passo de demonstração.
- Sem internet, explique a limitação: esta versão não implementa uma fila offline própria para tarefas. Não afirme que as despesas já estão sincronizadas ao Firestore. A PR #5 está aberta, mas ainda não foi mesclada.

## Perguntas prováveis

**Por que usar autenticação anônima?** Para associar os dados a um UID sem exigir cadastro durante a apresentação. O app persiste essa sessão no dispositivo; não é uma conta transferível para outro celular.

**Onde ficam as tarefas?** Na subcoleção `users/{uid}/tasks`. As regras publicadas exigem que o UID autenticado corresponda ao UID do caminho e validam os campos e limites.

**O que acontece se outro usuário alterar o caminho?** A solicitação é rejeitada pelas regras do Firestore, porque o UID autenticado não corresponde ao usuário dono do caminho.

**O app funciona sem internet?** O fluxo atual depende da conexão com Firebase para sincronizar as tarefas; não há fila offline própria nem promessa de sincronização posterior.

**O Git Flow está completo?** As branches `main` e `develop` estão publicadas, a implementação está em `feature/campus-go` e a PR #5 para `develop` está aberta para revisão. Ela ainda não foi mesclada.
