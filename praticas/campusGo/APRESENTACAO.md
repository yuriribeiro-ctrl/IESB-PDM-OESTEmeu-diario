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
5. **Outras partes do app (30–45 s):** apresente Bolso (gerenciador de despesas), Perfil e as abas existentes. Explique que a foto/despesas usam armazenamento local na versão atual; despesas ainda não foram migradas para Firestore.
6. **Arquitetura/segurança (30–45 s):** aponte `services/firebase.native.js`, `store/tasks-context.js`, as telas e `firestore.rules`. Explique autenticação anônima, UID e bloqueio de leitura/escrita entre usuários. Se abrir o Console, mostre Firestore → Regras e o provedor Anônimo.
7. **Git Flow (20–30 s):** seja transparente: as alterações atuais estão apenas na cópia local `feature/campus-go`; não houve push nem PR final. O remoto ainda não tinha `develop`. Aponte PRs #4 e #5 como base anterior e diga que falta criar `develop` e abrir/revisar a PR de feature para `develop` para completar a exigência.

## Encerramento

> “O projeto combina navegação por abas e stack, componentes React Native, layout Flexbox, estado local e global, formulário validado, ícones vetoriais e recursos nativos. O Firebase Authentication anônimo identifica a sessão da demonstração, e o Cloud Firestore realiza CRUD completo de tarefas com regras de acesso por UID. Como próximos passos, posso migrar as despesas para a nuvem e concluir o fluxo Git Flow com `develop` e a PR final.”

## Preparação para amanhã

- Na pasta `praticas/campusGo`, confirme `.env` (copiado de `.env.example`) e execute `npm install` se as dependências ainda não estiverem instaladas.
- Execute `npx expo start`, abra Expo Go no celular e leia o QR code. Celular e computador devem estar na mesma rede; deixe uma alternativa de apresentação pronta caso a rede do local bloqueie o Metro.
- Antes da aula, confira que o status da aba Tarefas indica conexão sem erro e faça uma tarefa de demonstração. Exclua-a ao terminar, se não quiser deixá-la na conta anônima.
- Deixe o Console Firebase do projeto `campusgo-72389` aberto nas abas Authentication → Sign-in method e Firestore Database → Regras, caso o professor queira ver a configuração.
- Localização e notificações precisam de permissão e podem se comportar de forma diferente no emulador. Não dependa de uma notificação como único passo de demonstração.
- Sem internet, explique a limitação: esta versão não implementa uma fila offline própria para tarefas. Não afirme que as despesas já estão sincronizadas ao Firestore nem que uma PR final foi aberta.

## Perguntas prováveis

**Por que usar autenticação anônima?** Para associar os dados a um UID sem exigir cadastro durante a apresentação. O app persiste essa sessão no dispositivo; não é uma conta transferível para outro celular.

**Onde ficam as tarefas?** Na subcoleção `users/{uid}/tasks`. As regras publicadas exigem que o UID autenticado corresponda ao UID do caminho e validam os campos e limites.

**O que acontece se outro usuário alterar o caminho?** A solicitação é rejeitada pelas regras do Firestore, porque o UID autenticado não corresponde ao usuário dono do caminho.

**O app funciona sem internet?** O fluxo atual depende da conexão com Firebase para sincronizar as tarefas; não há fila offline própria nem promessa de sincronização posterior.

**O Git Flow está completo?** Ainda não: a cópia foi preparada localmente em `feature/campus-go`; o remoto não tinha `develop` e nenhuma PR desta continuação foi aberta. O próximo passo é criar `develop`, enviar a branch de feature e abrir a PR para revisão.
