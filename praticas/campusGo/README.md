# CampusGo

Aplicativo individual de apoio à rotina universitária desenvolvido em React Native com Expo Router. Reúne tarefas acadêmicas sincronizadas com Firebase, organização de despesas, perfil e recursos do dispositivo.

**Aluno:** Yuri dos Santos Ribeiro — **Matrícula:** 24114290189
**Disciplina:** Dispositivos Móveis
**Projeto Firebase:** `campusgo-72389` (plano Spark; Firestore em `southamerica-east1`)

## Funcionalidades

- Navegação por abas: Início, Tarefas, Bolso e Perfil; stack/modal para detalhes e formulários.
- Tarefas com leitura em tempo real e operações de criar, listar, editar, concluir/reabrir e excluir no Cloud Firestore.
- Validação de título (1–80 caracteres) e observação (até 240 caracteres), com estados de carregamento e erro.
- Autenticação Firebase anônima: cada instalação/sessão recebe um UID, sem formulário de cadastro.
- Despesas, foto de perfil e outras informações locais aproveitadas do projeto existente.
- Recursos nativos já presentes no app, incluindo localização, notificações locais e feedback háptico; dependem de permissão e suporte do dispositivo.

## Requisitos

- Node.js compatível com a versão do Expo instalada; dependências instaladas por npm.
- Expo Go para demonstração no celular, com o celular e o computador na mesma rede.
- Internet para autenticação e sincronização com Firebase.

## Configuração e execução

Na pasta `praticas/campusGo`:

```bash
cp .env.example .env
npm install
npx expo start
```

Abra o QR code com Expo Go. As variáveis `EXPO_PUBLIC_*` são configuração cliente compilada no aplicativo; `EXPO_PUBLIC_FIREBASE_API_KEY` não é uma senha de servidor. Os dados devem ser protegidos pelas regras do Firestore, não por ocultar o client config. Não coloque arquivos Service Account, chaves privadas ou credenciais administrativas no app.

O `.env.example` corresponde ao aplicativo Web Firebase `CampusGo Expo` criado no projeto `campusgo-72389`. Se for usar outro projeto, substitua as variáveis pela configuração Web daquele projeto. Não versionar o `.env` local.

## Firebase: autenticação, dados e segurança

- Authentication: provedor **Anônimo** habilitado. O app inicia sessão anônima automaticamente e mantém a persistência local fornecida pelo Firebase/AsyncStorage no ambiente nativo.
- Firestore: banco `(default)`, edição Standard, região `southamerica-east1` (São Paulo), plano Spark.
- Caminho dos dados: `users/{uid}/tasks/{taskId}`.
- Campos de tarefa: `title`, `notes`, `completed`, `ownerUid`, `createdAt`, `updatedAt`.
- `firestore.rules` contém as regras que também foram publicadas no Console Firebase. Elas exigem usuário autenticado com UID igual ao `{uid}` do caminho, restringem operações a essa conta e validam o conteúdo/tamanho dos campos.
- Para rever a configuração, abra o Console Firebase do projeto `campusgo-72389` → Authentication → Sign-in method (Anônimo) e Firestore Database → Regras.

A autenticação anônima é adequada à demonstração acadêmica, mas não substitui conta permanente: outro dispositivo pode receber outro UID e, sem migração de credenciais, não verá os documentos da sessão original. O app não implementa uma fila própria de sincronização offline.

## Rotas principais

- `/` — Início/mural de avisos.
- `/tasks` — lista de tarefas e recursos de localização/lembrete.
- `/wallet` — Bolso/gerenciador de despesas.
- `/profile` — perfil e foto persistida.
- `/task/[id]` — detalhe dinâmico da tarefa.
- `/new-task` — criação ou edição em modal.

## Arquitetura relacionada ao Firebase

- `services/firebase-config.js`: configuração compartilhada via variáveis de ambiente.
- `services/firebase.js`: inicialização Web.
- `services/firebase.native.js`: inicialização nativa com persistência AsyncStorage.
- `store/tasks-context.js`: estado global, autenticação anônima, listener `onSnapshot` e funções CRUD.
- `app/(tabs)/tasks.js`, `app/new-task.js`, `app/task/[id].js`: lista, formulário e detalhe/ações.
- `firestore.rules` e `firebase.json`: regras versionadas localmente.

## Git Flow e status desta cópia

O enunciado pede `main`, `develop` e branches `feature/...`, com Pull Request de feature para `develop`. A branch em que esta continuação foi preparada é `feature/campus-go`, iniciada a partir de `61f6c03`. Na última conferência do remoto, existiam `main` e `feature/campus-go`, mas não `develop`. As PRs anteriores #4 (Gerenciador de despesas) e #5 (CampusGo) estavam abertas; esta cópia local **não foi commitada, enviada ao GitHub ou transformada em nova PR**.

Para concluir o fluxo antes da entrega, após revisar e testar a cópia:

1. Crie `develop` a partir de `main` no GitHub (ou localmente e publique-a).
2. Faça commit das alterações desta branch `feature/campus-go` e envie-a ao remoto.
3. Abra uma PR de `feature/campus-go` para `develop`, explique as alterações e faça a revisão.
4. Não declare o Git Flow completo até `develop` e a PR correspondente existirem. Não use force-push.

## Demonstração

Consulte [`APRESENTACAO.md`](./APRESENTACAO.md) para ordem sugerida, falas, preparação e perguntas. Antes da aula, abra o app no Expo Go, confira a autenticação e a sincronização e crie uma tarefa de demonstração. A conta anônima e Firestore dependem de internet; recursos nativos dependem das permissões do celular.
