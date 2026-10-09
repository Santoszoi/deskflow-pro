# DeskFlow Pro 🎫

Sistema demonstrativo de gerenciamento de chamados de TI, desenvolvido para portfólio de **Front-End React / TypeScript**.

> **Status:** código-fonte da versão 1.0. Aplicação demonstrativa; não indicada para produção sem autenticação, banco de dados, autorização e controles adicionais.

## Demonstração online

**Front-End:** https://deskflow-pro.vercel.app

> A interface publicada na Vercel usa um **modo demonstração com localStorage**: permite listar, criar, editar e excluir chamados no navegador, mantendo-os apenas naquele navegador. Não há sincronização entre usuários nem banco de dados remoto. A API Express existe no repositório e funciona localmente; hospedagem e banco remoto são melhorias futuras.

## Tecnologias

- **Front-End:** React 19, TypeScript, Vite, Tailwind CSS 4, Lucide React, Recharts.
- **Back-End:** Node.js, Express, API REST com persistência em JSON local.
- **Testes:** Vitest e Testing Library (configurada para extensão).
- **DevOps:** GitHub Actions para checagem de tipos, testes e build; Front-End publicado na Vercel.

## Funcionalidades

- Dashboard com indicadores e gráfico de chamados dos últimos sete dias.
- Listagem, busca textual, filtros por prioridade e status.
- Cadastro, edição e exclusão de chamados (CRUD via API REST).
- Exportação dos chamados filtrados em CSV.
- Interface responsiva, menu lateral e formulários acessíveis.
- Validação básica de dados no front-end e na API.
- Dados fictícios iniciais para demonstração.

## Pré-requisitos

Node.js **22+** e npm.

## Como executar

```bash
npm install
```

Em um terminal, execute a API:

```bash
npm run api
```

Em outro terminal, execute o Front-End:

```bash
npm run dev
```

Acesse **http://localhost:5173**. A API responde em **http://localhost:3001/api/health**.

> O Vite encaminha automaticamente `/api` para `localhost:3001` durante o desenvolvimento.

## Testes e qualidade

```bash
npm run check
npm test
npm run build
```

## Endpoints REST

| Método | Endpoint | Ação |
|---|---|---|
| GET | `/api/health` | Estado da API |
| GET | `/api/tickets` | Lista chamados |
| GET | `/api/tickets/:id` | Detalha um chamado |
| POST | `/api/tickets` | Cria chamado |
| PATCH | `/api/tickets/:id` | Atualiza chamado |
| DELETE | `/api/tickets/:id` | Exclui chamado |

### Exemplo com cURL

```bash
curl -X POST http://localhost:3001/api/tickets \
  -H 'Content-Type: application/json' \
  -d '{"title":"Acesso à VPN indisponível","description":"Erro ao conectar","category":"Redes","priority":"Alta","status":"Aberto","assignee":"Marcos","requester":"Ana"}'
```

### Testar no Postman

1. Inicie a API (`npm run api`).
2. Importe `postman/DeskFlow-Pro.postman_collection.json` no Postman.
3. Execute **Listar chamados** e depois **Criar chamado**.
4. A variável `baseUrl` já aponta para `http://localhost:3001`.

## Estrutura do projeto

```text
src/
  components/TicketForm.tsx  # Formulário de chamados
  lib/api.ts                # Cliente HTTP da API
  lib/types.ts              # Tipos TypeScript
  lib/utils.ts              # Filtros e indicadores
  lib/utils.test.ts         # Testes unitários
  App.tsx                   # Dashboard e interface
server/index.js             # API Express
postman/                    # Collection para testes de API
.github/workflows/ci.yml    # Pipeline CI
```

## Publicar no GitHub

Crie um repositório vazio chamado `deskflow-pro` no GitHub e, dentro da pasta do projeto, execute:

```bash
git init
git add .
git commit -m "feat: primeira versão do DeskFlow Pro"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/deskflow-pro.git
git push -u origin main
```

Substitua `SEU-USUARIO` pelo seu usuário. **Não envie** `.env` nem `server/data.json`: ambos estão no `.gitignore`. O workflow de CI executa checagem de tipos, testes e build quando houver dependências disponíveis no GitHub Actions.

## Publicação

O Front-End pode ser hospedado na **Vercel/Netlify**, mas precisa de uma API acessível publicamente. O backend incluído utiliza arquivo JSON local e é adequado apenas para demonstração/desenvolvimento. Para produção, substitua por PostgreSQL, implemente autenticação/autorização e hospede a API em serviço Node.js com armazenamento persistente. Configure `VITE_API_BASE_URL=https://sua-api.example.com` no ambiente de build do front-end. Sem essa variável, a aplicação usa `/api` (proxy local do Vite). Não publique a API de demonstração sem autenticação em ambiente aberto.

## Próximas melhorias

- Login real e perfis de acesso.
- PostgreSQL + ORM e migrações.
- Paginação, ordenação e auditoria.
- Testes de integração da API e E2E com Playwright.
- Deploy full-stack e monitoramento.

## Sobre

Projeto de estudo e portfólio, com dados fictícios. **Autor:** Marcos.

## Licença

MIT. Veja [LICENSE](LICENSE).
