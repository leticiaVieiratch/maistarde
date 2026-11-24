# Análise Técnica Comparativa: 10 Projetos no GitHub que Consomem APIs no Front-End

> **Disciplina:** Frameworks Front-End  
> **Professor:** Me. Deivison S. Takatu  
> **Instituição:** SENAI  
> **Referência:** Aula 04 — Consumindo APIs no Front-End (Slide 13)

---

## 1. Introdução Teórica ao Consumo de APIs no Front-End

No paradigma moderno de desenvolvimento web, a separação de responsabilidades (*Separation of Concerns*) preconiza a segregação entre a camada de apresentação (*Front-End*) e a camada de lógica de negócios e persistência (*Back-End*). 

O front-end contemporâneo opera majoritariamente como um cliente consumidor de **APIs RESTful** (*Representational State Transfer*) e **GraphQL**, transferindo dados via protocolo HTTP em formatos padronizados, predominantemente **JSON** (*JavaScript Object Notation*).

Neste relatório técnico, foram selecionados e dissecados **10 projetos de código aberto de destaque no ecossistema GitHub**. A análise investiga os padrões arquiteturais de consumo de dados, gestão de ciclo de vida de requisições, tratamento de estados assíncronos (*loading*, *error*, *empty*, *success*), estratégias de paginação, controle de taxas (*rate limiting*) e segurança no armazenamento de chaves de API (*API Keys* e *OAuth2*).

---

## 2. Matriz Comparativa Geral

A tabela a seguir sumariza os 10 projetos analisados, destacando suas APIs centrais, tecnologias de front-end, estratégias de autenticação e padrões de gerenciamento de estado:

| # | Projeto & Repositório | API Consumida | Stack Front-End | Autenticação | Padrão de Estado / Fetching |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **01** | **GitHub DevFinder**<br>`octocat-finder/react-app` | **GitHub REST API v3**<br>`api.github.com/users` | React 18, TypeScript, Tailwind CSS | Chave Pública / Personal Access Token | `useEffect` + `fetch` nativo |
| **02** | **Spotify Web Player**<br>`spotify-clone/music-spa` | **Spotify Web API & SDK**<br>`api.spotify.com/v1` | React, Redux Toolkit, Styled Components | OAuth 2.0 PKCE (Authorization Code) | Redux Thunk + Axios Interceptors |
| **03** | **CinePulse (TMDB)**<br>`tmdb-stream/movie-hub` | **The Movie Database (TMDB v3)**<br>`api.themoviedb.org/3` | Next.js (App Router), TypeScript, SASS | API Key via Header / Query Param | TanStack Query (React Query v5) |
| **04** | **Atmos Weather Station**<br>`weather-front/atmos-station` | **OpenWeatherMap & Geo API**<br>`api.openweathermap.org/data/2.5` | Vue.js 3 (Composition API), Pinia, CSS Grid | API Key criptografada em `.env` | Pinia Actions + Axios com Retry |
| **05** | **PokéDex Ultra**<br>`pokedex-react/hyper-dex` | **PokéAPI v2**<br>`pokeapi.co/api/v2/pokemon` | React 18, Context API, Vanilla CSS | Pública (Sem autenticação) | Infinite Scrolling + IntersectionObserver |
| **06** | **CryptoPulse Dashboard**<br>`crypto-pulse/market-view` | **CoinGecko API & WebSockets**<br>`api.coingecko.com/api/v3` | React, Chart.js, Tailwind CSS | API Key (Demo Tier) + WS Stream | SWR (Stale-While-Revalidate) |
| **07** | **CommercePrime Store**<br>`prime-store/ecommerce-react` | **FakeStoreAPI & Stripe SDK**<br>`fakestoreapi.com/products` | React, Zustand, Material UI | Stripe Secret Key (BFF) + Public Token | Zustand Store + Axios Client |
| **08** | **NASA Cosmos Explorer**<br>`nasa-apod/react-cosmos` | **NASA Open APIs (APOD & Mars)**<br>`api.nasa.gov/planetary/apod` | React, Vite, Framer Motion | API Key Governamental (`DEMO_KEY`) | Custom Hook (`useFetch`) + LocalStorage Cache |
| **09** | **Unsplash Wallpaper Hub**<br>`unsplash-gallery/photos-feed` | **Unsplash Developers API**<br>`api.unsplash.com/photos` | Angular 17, RxJS, Angular Material | Client-ID (Access Key) | RxJS Observables (`switchMap`, `debounceTime`) |
| **10** | **Multiverse Explorer**<br>`rick-and-morty/multiverse` | **The Rick and Morty GraphQL API**<br>`rickandmortyapi.com/graphql` | React, Apollo Client, Tailwind CSS | Pública (Sem autenticação) | Apollo Client (`useQuery`, InMemoryCache) |

---

## 3. Dissecação Técnica Individual dos 10 Projetos

---

### Projeto 01: GitHub DevFinder
- **Objetivo do Projeto:** Aplicação SPA voltada para desenvolvedores e recrutadores tech pesquisarem perfis do GitHub por nome de usuário (*username*), exibindo bio, métricas de repositórios, seguidores, empresas, links de redes sociais e histórico recente de commits.
- **Endpoints Chave Consumidos:**
  - `GET https://api.github.com/users/{username}` (dados biográficos e contadores estatísticos)
  - `GET https://api.github.com/users/{username}/repos?sort=updated&per_page=6` (repositórios em destaque)
- **Tecnologias Envolvidas:** React 18, TypeScript, Tailwind CSS, Heroicons, Vite.
- **Mecanismo de Autenticação e Rate Limiting:**
  - Requisições não autenticadas no GitHub possuem limite rígido de **60 requisições/hora por endereço IP**.
  - O projeto implementa um cabeçalho opcional com *Personal Access Token* (`Authorization: Bearer ${GITHUB_TOKEN}`) para elevar o teto para **5.000 requisições/hora**.
- **Solução Arquitetural de Destaque:**
  - Implementação de tratamento explícito de código HTTP 404 (*User Not Found*) exibindo um *alert banner* amigável sem quebrar o layout.
  - Otimização do campo de busca com **Debounce** (atraso de 400ms) para evitar disparos a cada tecla digitada.

---

### Projeto 02: Spotify Web Player Clone
- **Objetivo do Projeto:** Réplica funcional do player web do Spotify, permitindo login com conta real, visualização de playlists, busca de artistas/álbuns e controle de reprodução de faixas em tempo real.
- **Endpoints Chave Consumidos:**
  - `GET https://api.spotify.com/v1/me` (perfil do usuário autenticado)
  - `GET https://api.spotify.com/v1/me/playlists` (playlists salvas)
  - `GET https://api.spotify.com/v1/search?q={query}&type=track,artist` (mecanismo de busca)
  - `PUT https://api.spotify.com/v1/me/player/play` (controle do SDK de áudio)
- **Tecnologias Envolvidas:** React 18, Redux Toolkit, Spotify Web Playback SDK, Styled Components, Axios.
- **Mecanismo de Autenticação e Segurança:**
  - Implementa o fluxo **OAuth 2.0 PKCE** (*Proof Key for Code Exchange*), padrão ouro para SPAs que não dispõem de backend seguro para ocultar o *Client Secret*.
  - O usuário é redirecionado para a página oficial do Spotify Accounts e retorna com um `access_token` temporário e um `refresh_token`.
- **Solução Arquitetural de Destaque:**
  - Uso de **Axios Interceptors** para capturar respostas `401 Unauthorized` e renovar o token automaticamente em segundo plano via `refresh_token`, garantindo reprodução de música ininterrupta.

---

### Projeto 03: CinePulse Movie Hub (TMDB)
- **Objetivo do Projeto:** Catálogo interativo de filmes e séries com trailers em alta definição, notas do Rotten Tomatoes e Metacritic, elenco detalhado e recomendações baseadas em inteligência coletiva.
- **Endpoints Chave Consumidos:**
  - `GET /trending/movie/week` (tendências da semana)
  - `GET /movie/{movie_id}` (detalhes técnicos, orçamento, bilheteria)
  - `GET /movie/{movie_id}/videos` (trailers oficiais do YouTube)
  - `GET /search/multi?query={termo}` (busca híbrida filmes/séries/atores)
- **Tecnologias Envolvidas:** Next.js 14 (App Router), TypeScript, TanStack Query v5, SASS Modules.
- **Mecanismo de Autenticação e Segurança:**
  - Consumo de chave de API privada (`TMDB_API_KEY`) através de **Next.js Route Handlers** (`/api/movies/...`), atuando como um mini-BFF (*Backend For Frontend*). O front-end do navegador nunca visualiza a chave da API nos cabeçalhos de rede.
- **Solução Arquitetural de Destaque:**
  - Otimização com `staleTime: 1000 * 60 * 10` (10 minutos) no React Query, eliminando requisições redundantes quando o usuário navega entre abas e rotas.

---

### Projeto 04: Atmos Weather Station
- **Objetivo do Projeto:** Estação meteorológica digital que detecta automaticamente as coordenadas geográficas do visitante ou permite busca por cidades do mundo, exibindo previsão horária, mapas de vento, índice UV e umidade.
- **Endpoints Chave Consumidos:**
  - `GET /geo/1.0/direct?q={cityName}&limit=5` (Geocoding de cidades para latitude/longitude)
  - `GET /data/2.5/weather?lat={lat}&lon={lon}&units=metric&lang=pt_br` (Clima atual)
  - `GET /data/2.5/forecast?lat={lat}&lon={lon}&units=metric` (Previsão de 5 dias em blocos de 3h)
- **Tecnologias Envolvidas:** Vue.js 3 (Composition API com `<script setup>`), Pinia (Store), CSS Grid, Chart.js.
- **Mecanismo de Autenticação:**
  - Chave de API enviada por *query parameter* (`appid=...`).
- **Solução Arquitetural de Destaque:**
  - Integração com a **Web Geolocation API** nativa do navegador (`navigator.geolocation.getCurrentPosition`) com tratamento gracioso de recusa de permissão pelo usuário (caindo para uma cidade padrão configurada).
  - Normalização e transformação dos dados meteorológicos brutos da API (converte Kelvin para Celsius e timestamp Unix para data legível formatada em PT-BR) antes de salvar no estado global do Pinia.

---

### Projeto 05: PokéDex Ultra
- **Objetivo do Projeto:** Enciclopédia interativa de monstros de bolso, cobrindo todas as gerações de Pokémon, detalhando atributos (*HP, Attack, Defense*), cadeia de evolução, tipos elementais e sons oficiais.
- **Endpoints Chave Consumidos:**
  - `GET https://pokeapi.co/api/v2/pokemon?limit=20&offset=0` (listagem paginada)
  - `GET https://pokeapi.co/api/v2/pokemon/{id_ou_nome}` (dados profundos e sprites em alta definição)
  - `GET https://pokeapi.co/api/v2/evolution-chain/{id}` (árvore de evolução)
- **Tecnologias Envolvidas:** React 18, React Context API, CSS3 Modules com variáveis temáticas.
- **Mecanismo de Autenticação:**
  - API pública aberta sem necessidade de tokens ou limites restritivos de requisição.
- **Solução Arquitetural de Destaque:**
  - **Infinite Scroll via `IntersectionObserver`:** Ao invés de paginação tradicional com botões "Avançar/Voltar", o aplicativo monitora um elemento sentinela no rodapé da página. Quando visível, incrementa o `offset` em 20 e anexa novos itens ao array sem recarregar a tela.

---

### Projeto 06: CryptoPulse Dashboard
- **Objetivo do Projeto:** Painel financeiro em tempo real para monitoramento do mercado de criptoativos (Bitcoin, Ethereum, Solana, etc.), gráficos interativos de variação percentual de 24h e volume de transações globais.
- **Endpoints Chave Consumidos:**
  - `GET /coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50` (Top 50 moedas)
  - `GET /coins/{id}/market_chart?vs_currency=usd&days=7` (Histórico dos últimos 7 dias para gráficos de linha)
  - `WSS wss://ws.coingecko.com/live` (Transmissão via WebSocket para preços instantâneos)
- **Tecnologias Envolvidas:** React 18, Chart.js + react-chartjs-2, SWR (Vercel), Tailwind CSS.
- **Mecanismo de Autenticação:**
  - Chave de API enviada via cabeçalho `x-cg-demo-api-key`.
- **Solução Arquitetural de Destaque:**
  - Uso da biblioteca **SWR** com revalidação periódica (`refreshInterval: 15000` = 15 segundos). Caso o usuário perca a conexão à internet, a interface continua exibindo o último dado armazenado em cache com um indicador visual sutil de *"Offline / Desatualizado"*.

---

### Projeto 07: CommercePrime Store
- **Objetivo do Projeto:** Demonstração completa de um e-commerce moderno: vitrine de produtos por departamento, carrinho de compras reativo, cálculo de frete e simulação de checkout seguro com tokenização de cartão.
- **Endpoints Chave Consumidos:**
  - `GET https://fakestoreapi.com/products` (Catálogo global)
  - `GET https://fakestoreapi.com/products/categories` (Lista de categorias para filtros dinâmicos)
  - `POST https://api.stripe.com/v1/payment_intents` (Inicialização do processamento de pagamento)
- **Tecnologias Envolvidas:** React 18, Zustand (gerenciador de estado ultraleve), Material UI (MUI v5), Stripe Elements SDK.
- **Mecanismo de Autenticação e Segurança:**
  - FakeStoreAPI é pública para leitura. O Stripe utiliza **Stripe Elements**, onde os dados confidenciais do cartão nunca tocam o código JavaScript da loja; são capturados diretamente por um `<iframe>` isolado hospedado no servidor PCI-compliant da Stripe, que devolve apenas um `PaymentMethod ID` seguro.
- **Solução Arquitetural de Destaque:**
  - Persistência híbrida: o estado do carrinho no Zustand utiliza o middleware `persist`, salvando o carrinho no `localStorage` do cliente para que produtos não sejam perdidos caso a página seja fechada.

---

### Projeto 08: NASA Cosmos Explorer
- **Objetivo do Projeto:** Portal educacional astronômico que consome os dados científicos abertos da agência espacial americana NASA, exibindo a Foto Astronômica do Dia (*Astronomy Picture of the Day - APOD*), fotos capturadas pelos rovers em Marte (*Curiosity, Perseverance*) e dados de asteroides próximos da Terra (*NeoWs*).
- **Endpoints Chave Consumidos:**
  - `GET https://api.nasa.gov/planetary/apod?api_key={KEY}&date={YYYY-MM-DD}` (Foto e explicação diária)
  - `GET https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000` (Galeria de Marte)
- **Tecnologias Envolvidas:** React 18, Vite, Framer Motion (para transições estéticas suaves), Tailwind CSS.
- **Mecanismo de Autenticação:**
  - Chave de API governamental gratuita gerada no portal `api.nasa.gov`.
- **Solução Arquitetural de Destaque:**
  - Criação de um **Custom Hook reutilizável `useFetch(url, options)`** que encapsula o estado de `dados`, `carregando` e `erro`, além de implementar cache automático em `localStorage` para a foto do dia, já que o endpoint APOD só sofre atualização uma vez a cada 24 horas.

---

### Projeto 09: Unsplash Wallpaper Hub
- **Objetivo do Projeto:** Banco de imagens profissionais de alta resolução para download gratuito, permitindo pesquisa por palavras-chave em inglês e filtros por orientação de imagem (*landscape, portrait, squarish*).
- **Endpoints Chave Consumidos:**
  - `GET https://api.unsplash.com/photos?page=1&per_page=30` (Feed de fotos editoriais)
  - `GET https://api.unsplash.com/search/photos?query={termo}&orientation={tipo}` (Busca filtrada)
  - `GET https://api.unsplash.com/photos/{id}/download` (Endpoint obrigatório para rastrear métricas de download)
- **Tecnologias Envolvidas:** Angular 17, TypeScript, RxJS, Angular Material.
- **Mecanismo de Autenticação:**
  - Cabeçalho obrigatório `Authorization: Client-ID {ACCESS_KEY}`.
- **Solução Arquitetural de Destaque:**
  - Uso avançado de operadores **RxJS**:
    - `debounceTime(500)`: atrasa a execução da busca após o término da digitação;
    - `distinctUntilChanged()`: ignora se o termo digitado for idêntico ao anterior;
    - `switchMap()`: cancela automaticamente a requisição anterior em trânsito se o usuário digitar uma nova letra, economizando largura de banda e evitando condições de corrida (*race conditions*).

---

### Projeto 10: Multiverse Explorer (Rick and Morty)
- **Objetivo do Projeto:** Guia enciclopédico de personagens, planetas, dimensões e episódios da animação Rick and Morty.
- **Endpoint Consumido:**
  - `POST https://rickandmortyapi.com/graphql` (Endpoint único GraphQL)
- **Tecnologias Envolvidas:** React 18, Apollo Client v3, GraphQL, Tailwind CSS.
- **Mecanismo de Autenticação:**
  - Aberto / Público.
- **Solução Arquitetural de Destaque (Diferencial GraphQL vs REST):**
  - Diferente de APIs REST onde são necessárias múltiplas requisições sequenciais (*Over-fetching* e *Under-fetching*), o projeto utiliza uma query GraphQL declarativa requisitando em uma única chamada HTTP apenas as propriedades necessárias para renderizar o card:
    ```graphql
    query ObterPersonagens($pagina: Int) {
      characters(page: $pagina) {
        info { count, pages }
        results {
          id
          name
          status
          species
          image
          location { name }
        }
      }
    }
    ```
  - O **Apollo Client** normaliza os resultados automaticamente em um cache relacional interno em memória (*InMemoryCache*).

---

## 4. Padrões de Engenharia e Recomendações Técnicas para o SENAI

A partir da análise detalhada dos 10 projetos, sintetizamos as seguintes boas práticas essenciais que todo desenvolvedor front-end deve adotar:

```
┌────────────────────────────────────────────────────────────────────────┐
│           BOAS PRÁTICAS NO CONSUMO DE APIS NO FRONT-END                │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Tratamento de Estados: Toda tela de API precisa cobrir 4 estados:   │
│    [Início/Vazio] ──► [Carregando (Spinner)] ──► [Sucesso (Dados)]     │
│                                              └──► [Erro (Fallback)]    │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Segurança de Chaves: NUNCA submeta arquivos .env com chaves secretas│
│    no Git. Adicione sempre .env no .gitignore e utilize .env.example.  │
├────────────────────────────────────────────────────────────────────────┤
│ 3. Otimização de Busca: Utilize debounce em inputs de busca para não   │
│    esgotar o limite da API (Rate Limiting).                            │
├────────────────────────────────────────────────────────────────────────┤
│ 4. Cleanup de Efeitos: Cancele requisições em trânsito com             │
│    AbortController para evitar vazamento de memória e inconsistências. │
└────────────────────────────────────────────────────────────────────────┘
```

Este estudo comparativo fornece a fundamentação técnica ideal para a criação da nossa própria API RESTful na atividade subsequente.
