# Guia Completo de Deploy em Produção: Backend no Render & Frontend no Vercel

> **Disciplina:** Frameworks Front-End  
> **Professor:** Me. Deivison S. Takatu  
> **Instituição:** SENAI  
> **Referência:** Aula 05 — Criando APIs para o Front-End (Slide 33)

---

## 1. Visão Geral da Arquitetura em Nuvem

Em arquiteturas modernas de sistemas web desacoplados (*Decoupled / JAMstack Architecture*), o Front-End e o Back-End residem em serviços de hospedagem e infraestruturas distintas e especializadas:

```
┌──────────────────────────────┐                ┌──────────────────────────────┐
│       CLIENTE FRONT-END      │                │       BACKEND REST API       │
│           (React 18)         │   HTTP/REST    │       (Node.js / Express)    │
│  Hospedagem: VERCEL (Edge)   │ ─────────────► │   Hospedagem: RENDER.COM     │
│  https://meu-front.vercel.app│ ◄───────────── │  https://meu-api.onrender.com│
└──────────────────────────────┘      JSON      └──────────────────────────────┘
                                                               │
                                                               ▼
                                                        ┌──────────────┐
                                                        │  data.json   │
                                                        │ Persistência │
                                                        └──────────────┘
```

- **Vercel:** Especializada na distribuição de ativos estáticos e páginas SPA via CDN (*Content Delivery Network*) global de altíssima velocidade e baixa latência.
- **Render:** Plataforma PaaS (*Platform as a Service*) moderna que gerencia containers, execução contínua de processos Node.js e orquestração de servidores HTTP.

---

## 2. Parte 1: Deploy do Backend no Render.com

### Passo 1: Preparação do Código
Certifique-se de que o arquivo `package.json` possui o script `"start"` apontando para o `server.js` e que a porta seja dinâmica via variável de ambiente:

```javascript
// No server.js:
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});
```
> [!IMPORTANT]
> O Render injeta dinamicamente a variável de ambiente `PORT` na inicialização do container. O servidor Express **deve obrigatoriamente** usar `process.env.PORT`, caso contrário o deploy falhará por *port binding timeout*.

### Passo 2: Subindo o Repositório no GitHub
1. Crie um repositório no seu GitHub (público ou privado);
2. Faça commit e push da pasta do projeto.

### Passo 3: Criando o Web Service no Render
1. Acesse [render.com](https://render.com) e faça login (pode usar sua conta do GitHub);
2. No painel principal (*Dashboard*), clique em **New +** ➔ **Web Service**;
3. Conecte sua conta do GitHub e selecione o repositório do projeto;
4. Preencha as configurações do formulário:
   * **Name:** `devpulse-notes-api` (ou nome de sua preferência)
   * **Region:** Ohio (US East) ou Frankfurt (EU Central)
   * **Root Directory:** `06-Criando-e-Consumindo-APIs/atividade-02-api-express-crud` *(essencial se o projeto estiver em uma subpasta)*
   * **Runtime:** `Node`
   * **Build Command:** `npm install`
   * **Start Command:** `npm start`
   * **Instance Type:** `Free`
5. Na seção **Environment Variables**, adicione as seguintes variáveis:
   * `NODE_ENV`: `production`
   * `CORS_ORIGIN`: `*` *(ou a URL futura do seu frontend na Vercel)*
6. Clique no botão **Create Web Service**.
7. O Render iniciará a compilação e, em cerca de 2 minutos, exibirá o status **Live** com a sua URL pública:
   `https://devpulse-notes-api.onrender.com`

---

## 3. Parte 2: Deploy do Frontend no Vercel

### Passo 1: Configuração do SPA Fallback
Como visto na Atividade 05, para que o roteamento baseado em histórico (`react-router-dom`) não retorne erro 404 em recarregamentos de página (F5), certifique-se de que o arquivo `vercel.json` existe na raiz do frontend:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Passo 2: Criando o Projeto na Vercel
1. Acesse [vercel.com](https://vercel.com) e entre com sua conta do GitHub;
2. Clique no botão **Add New...** ➔ **Project**;
3. Importe o mesmo repositório do GitHub;
4. Na tela de configuração de Build:
   * **Framework Preset:** `Vite`
   * **Root Directory:** `05-React-Avancado-Hooks-e-Rotas` *(clique em Edit e selecione a pasta)*
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
5. Na aba **Environment Variables**, adicione a URL do backend gerada no Render:
   * `VITE_API_URL`: `https://devpulse-notes-api.onrender.com`
6. Clique em **Deploy**.
7. Em menos de 1 minuto seu site estará disponível globalmente com HTTPS gratuito:
   `https://devpulse-notes.vercel.app`

---

## 4. Integração Front-End ➔ Back-End e Resolução de CORS

Ao rodar em produção, o navegador do usuário acessará `https://devpulse-notes.vercel.app` e disparará requisições AJAX (`fetch`) para `https://devpulse-notes-api.onrender.com`.

Como os domínios são diferentes (`.vercel.app` vs `.onrender.com`), o navegador enviará uma requisição preliminar chamada **Preflight (OPTIONS)** para verificar se o backend autoriza a origem.

### Configuração Recomendada de CORS em Produção:
No `server.js`, a configuração implementada suporta dinamicamente a origem através da variável `CORS_ORIGIN`:

```javascript
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
  : '*';

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

No Render, basta definir `CORS_ORIGIN` como:
`https://devpulse-notes.vercel.app`

Isso bloqueia qualquer outro site malicioso de consumir sua API diretamente pelo navegador do cliente.

---

## 5. Cuidados Especiais em Nuvem e Reflexão de Produção

### 5.1. Cold Starts no Plano Gratuito do Render
No plano gratuito do Render, os Web Services entram em modo de suspensão (*spin down*) após 15 minutos sem receber tráfego. 
- Quando o primeiro usuário acessa o frontend e faz uma requisição, o backend pode demorar cerca de **30 a 50 segundos** para "acordar".
- **Boa Prática no Front-End:** Sempre exibir uma mensagem amigável no spinner de carregamento:
  > *"Conectando ao servidor em nuvem... Caso seja a primeira requisição, pode levar até 40 segundos para acordar o serviço."*

### 5.2. Limitação de Persistência em `data.json` (Containers Efêmeros)
> [!WARNING]
> Em plataformas de container como Render, Heroku e Railway, o sistema de arquivos do servidor é **efêmero** (*Ephemeral Filesystem*). 
> Sempre que o serviço reinicia, sofre deploy ou acorda de uma suspensão, o container é recriado a partir da imagem do Git, restaurando o `data.json` original.
> 
> **Para sistemas de produção reais**, o arquivo `data.json` deve ser substituído por um banco de dados gerenciado em nuvem (ex: **MongoDB Atlas**, **PostgreSQL no Supabase** ou **Neon**). O padrão de código das nossas funções assíncronas `lerDados()` e `salvarDados()` foi modelado justamente para facilitar essa substituição direta por drivers como `mongoose` ou `prisma`.

---

## 6. Checklist de Verificação Pré-Deploy

- [x] O `package.json` possui script `"start": "node server.js"`?
- [x] O `server.js` escuta na porta dinâmica `process.env.PORT`?
- [x] O middleware `cors` está habilitado antes das rotas?
- [x] O arquivo `.env` está incluído no `.gitignore`?
- [x] O `vercel.json` está configurado para rewrites de SPA?
- [x] As variáveis de ambiente foram inseridas nos painéis do Render e Vercel?
