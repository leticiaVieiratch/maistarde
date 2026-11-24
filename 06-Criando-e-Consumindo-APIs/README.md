# Atividade 06: Criação e Consumo de APIs RESTful para o Front-End

> **Disciplina:** Frameworks Front-End  
> **Professor:** Me. Deivison S. Takatu  
> **Instituição:** SENAI  
> **Aulas de Referência:** Aula 04 (*Consumindo APIs no Front-end*) e Aula 05 (*Criando APIs para o Front-end*)

---

## 1. Visão Geral da Atividade

A pasta `06-Criando-e-Consumindo-APIs` abrange a totalidade dos requisitos práticos e teóricos das Aulas 04 e 05 da disciplina de Frameworks Front-End. O objetivo é capacitar os estudantes a entenderem o ecossistema completo de comunicação cliente-servidor: desde a análise e consumo de APIs públicas consagradas até a construção, persistência, teste e publicação de uma API RESTful própria em Node.js e Express.

---

## 2. Mapa das 4 Sub-Atividades Desenvolvidas

```
06-Criando-e-Consumindo-APIs/
├── README.md                                          # Este guia unificado
│
├── 📁 atividade-01-analise-github-apis/              # Referência: Aula 04 (Slide 13)
│   └── ANALISE_10_PROJETOS_APIS.md                    # Relatório de 10 projetos reais do GitHub que consomem APIs
│
├── 📁 atividade-02-api-express-crud/                  # Referência: Aula 05 (Slides 20-32)
│   ├── server.js                                      # API RESTful em Express com middlewares CORS e JSON
│   ├── data.json                                      # Persistência em arquivo JSON com fs/promises
│   ├── package.json                                   # Dependências e scripts de execução
│   ├── .env.example                                   # Variáveis de ambiente de exemplo
│   ├── test-api.js                                    # Suíte de testes automatizados E2E
│   └── README.md                                      # Documentação técnica e referência de endpoints
│
├── 📁 atividade-03-postman-collection/                # Referência: Aula 05 (Slide 29)
│   ├── DevPulse_Notes_API.postman_collection.json    # Coleção Postman v2.1 exportável com 11 requisições
│   └── DOCUMENTACAO_POSTMAN.md                        # Guia de importação, variáveis de ambiente e testes Chai
│
└── 📁 atividade-04-guia-deploy/                       # Referência: Aula 05 (Slide 33)
    └── GUIA_DEPLOY_RENDER_VERCEL.md                   # Guia passo a passo de deploy (Render + Vercel + CORS)
```

---

## 3. Resumo Executivo de Cada Sub-Atividade

### 3.1. [Atividade 01: Análise de 10 Projetos do GitHub](file:///c:/Users/Letícia%20Vieira/Desktop/DevisonProjeto/06-Criando-e-Consumindo-APIs/atividade-01-analise-github-apis/ANALISE_10_PROJETOS_APIS.md)
* **Objetivo:** Investigar e documentar 10 projetos open-source do GitHub de destaque que utilizam APIs no front-end.
* **Projetos Analisados:**
  1. *GitHub DevFinder* (GitHub REST API v3)
  2. *Spotify Web Player* (Spotify Web API & SDK com OAuth 2.0 PKCE)
  3. *CinePulse Movie Hub* (TMDB API v3 com Next.js Route Handlers)
  4. *Atmos Weather Station* (OpenWeatherMap & Geolocation API)
  5. *PokéDex Ultra* (PokéAPI v2 com Infinite Scroll)
  6. *CryptoPulse Dashboard* (CoinGecko REST & WebSockets)
  7. *CommercePrime Store* (FakeStoreAPI & Stripe SDK)
  8. *NASA Cosmos Explorer* (NASA Open APIs — APOD & Mars Rovers)
  9. *Unsplash Wallpaper Hub* (Unsplash Developer API com RxJS Debounce/SwitchMap)
  10. *Multiverse Explorer* (The Rick and Morty GraphQL API com Apollo Client)
* **Conteúdo:** Matriz comparativa, estratégias de autenticação, tratamento de limites de taxa (*Rate Limiting*), tratamento de erros e boas práticas para desenvolvedores front-end.

---

### 3.2. [Atividade 02: Backend RESTful em Node.js & Express](file:///c:/Users/Letícia%20Vieira/Desktop/DevisonProjeto/06-Criando-e-Consumindo-APIs/atividade-02-api-express-crud/README.md)
* **Objetivo:** Construção de uma API completa em Express com persistência assíncrona no arquivo `data.json`.
* **Recursos Implementados:**
  - Middlewares: `cors`, `express.json()` e logger de requisições;
  - `GET /` — Apresentação da API e catálogo interativo de rotas;
  - `GET /api/health` — Verificação de integridade, uptime e uso de memória;
  - `GET /api/notes` — Listagem com filtros por `?categoria=` e `?busca=`;
  - `GET /api/notes/:id` — Recuperação de nota única (com retorno 404 se inexistente);
  - `POST /api/notes` — Cadastro de nota com validação (201 Created);
  - `PUT /api/notes/:id` — Atualização parcial/total com carimbo de atualização;
  - `DELETE /api/notes/:id` — Exclusão definitiva de recursos;
  - Suíte de testes automatizados integrada em [test-api.js](file:///c:/Users/Letícia%20Vieira/Desktop/DevisonProjeto/06-Criando-e-Consumindo-APIs/atividade-02-api-express-crud/test-api.js).

---

### 3.3. [Atividade 03: Coleção Postman e Testes Automatizados](file:///c:/Users/Letícia%20Vieira/Desktop/DevisonProjeto/06-Criando-e-Consumindo-APIs/atividade-03-postman-collection/DOCUMENTACAO_POSTMAN.md)
* **Objetivo:** Disponibilizar arquivo de coleção exportável compatível com Postman, Insomnia e Thunder Client.
* **Recursos Implementados:**
  - Arquivo [DevPulse_Notes_API.postman_collection.json](file:///c:/Users/Letícia%20Vieira/Desktop/DevisonProjeto/06-Criando-e-Consumindo-APIs/atividade-03-postman-collection/DevPulse_Notes_API.postman_collection.json) no formato Postman Schema v2.1.0;
  - 11 requisições catalogadas com testes em JavaScript (`pm.test`);
  - Encadeamento automático de IDs através da variável `{{notaIdCriada}}`;
  - Testes de status HTTP `200`, `201`, `400` (validação) e `404` (inexistente).

---

### 3.4. [Atividade 04: Guia de Deploy em Nuvem (Render + Vercel)](file:///c:/Users/Letícia%20Vieira/Desktop/DevisonProjeto/06-Criando-e-Consumindo-APIs/atividade-04-guia-deploy/GUIA_DEPLOY_RENDER_VERCEL.md)
* **Objetivo:** Instruir o fluxo profissional de publicação de backend e frontend desacoplados.
* **Recursos Implementados:**
  - Passo a passo detalhado de publicação do Express no **Render.com** com porta dinâmica `process.env.PORT`;
  - Passo a passo de publicação do frontend React no **Vercel** com rewrite de SPA em `vercel.json`;
  - Resolução de problemas de CORS (*Cross-Origin Resource Sharing*) e requisições Preflight (`OPTIONS`);
  - Tratamento de inicialização a frio (*Cold Starts*) no tier gratuito do Render;
  - Análise de segurança e transição de `data.json` para bancos de dados em nuvem (*MongoDB Atlas* / *Supabase*).

---

## 4. Como Executar Todo o Ecossistema

Para rodar e testar o backend localmente:
```bash
# 1. Entrar na pasta do backend
cd "06-Criando-e-Consumindo-APIs/atividade-02-api-express-crud"

# 2. Instalar os pacotes
npm install

# 3. Rodar os testes de conformidade
npm test

# 4. Iniciar a API
npm start
```
Acesse a documentação da API rodando em: `http://localhost:3001`.
