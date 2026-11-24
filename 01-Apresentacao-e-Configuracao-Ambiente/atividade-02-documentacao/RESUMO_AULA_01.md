# Resumo Técnico — Aula 01: Apresentação da Disciplina e Configuração do Ambiente

> **Instituição:** SENAI — Serviço Nacional de Aprendizagem Industrial  
> **Curso:** Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas  
> **Unidade Curricular:** Frameworks Front-end  
> **Docente:** Prof. Me. Deivison S. Takatu  
> **Atividade 02 (Parte 1):** Resumo em Markdown (.md) abordando os principais conceitos discutidos na Aula 01.

---

## 1. Contexto e Objetivos da Disciplina

No cenário tecnológico contemporâneo, as aplicações web deixaram de ser páginas estáticas para se tornarem sistemas altamente interativos, distribuídos e reativos (*Single Page Applications* - SPAs). Empresas de escala global necessitam de interfaces velozes, modulares, acessíveis e de fácil manutenção.

O objetivo da disciplina de **Frameworks Front-end** é capacitar os futuros desenvolvedores a:
1. Compreender os fundamentos do desenvolvimento front-end com JavaScript moderno;
2. Dominar os principais frameworks e bibliotecas do mercado (React, Angular, Vue.js e Next.js);
3. Aplicar boas práticas de engenharia de software, incluindo controle de versão profissional com Git/GitHub;
4. Realizar o ciclo completo de entrega contínua (*Continuous Deployment*) em nuvem com plataformas modernas como Vercel e Render.

---

## 2. O que é Desenvolvimento Front-End?

O **Front-end** é a camada da aplicação com a qual os usuários interagem diretamente no navegador (*client-side*). Suas atribuições englobam:
- **Estruturação Semântica:** Construção da hierarquia do documento via HTML5;
- **Apresentação e Design:** Estilização visual, responsividade e layout via CSS3/Frameworks de estilização;
- **Interatividade e Lógica:** Processamento de eventos, validação de entradas, controle de estado e manipulação do DOM via JavaScript;
- **Comunicação com o Back-end:** Consumo de serviços web e APIs RESTful via protocolo HTTP/HTTPS, parseando dados em formato JSON.

---

## 3. Vanilla JS vs Abstrações por Frameworks

| Aspecto | Vanilla JS (JavaScript Puro) | Frameworks Front-End (React, Vue, etc.) |
| :--- | :--- | :--- |
| **Dependências** | Zero dependências externas; roda nativamente no browser. | Exige tooling (Node.js, bundlers como Vite/Webpack, transpilers como Babel). |
| **Manipulação de Tela** | Manipulação direta e imperativa do DOM (`querySelector`, `innerHTML`). | Manipulação declarativa via **Virtual DOM** ou reatividade dirigida a estado. |
| **Manutenibilidade** | Torna-se complexa e propensa a código espaguete em sistemas grandes. | Alta manutenibilidade, organização em componentes reutilizáveis e desacoplados. |
| **Curva de Aprendizado** | Essencial para a base de qualquer engenheiro web. | Requer domínio prévio de Vanilla JS + regras do ecossistema do framework. |

---

## 4. Controle de Versão: Versionamento vs Backup

Um dos maiores problemas no desenvolvimento sem processo é a perda de código, sobrescrita acidental e a proliferação de arquivos com sufixos arbitrários (como `versao_final_v2_agora_vai.zip`).

### Versionamento vs Backup Simples:
- **Backup:** Cópia pontual e congelada de um estado atual; não possui histórico granular, não rastreia autoria e não permite fusão de alterações concorrentes (*merge*).
- **Controle de Versão (VCS):** Registra cada modificação atômica (*commit*) com carimbo de data/hora, autor e justificativa. Permite trabalho simultâneo sem conflitos, auditoria detalhada e reversão segura a qualquer ponto da linha do tempo do projeto.

---

## 5. Versionamento Semântico (SemVer)

O padrão **SemVer** adota a convenção numérica estruturada `MAJOR.MINOR.PATCH` (ex: `2.4.1`):
1. **MAJOR (X.y.z):** Mudança incompatível com versões anteriores (*Breaking Change*). Exige adaptação de código por parte dos consumidores da API/aplicação.
2. **MINOR (x.Y.z):** Adição de nova funcionalidade mantendo retrocompatibilidade (*Backward-Compatible*).
3. **PATCH (x.y.Z):** Correção de falhas (*bug fixes*) e melhorias de estabilidade sem adição de novas funcionalidades na API pública.

*Nota pedagógica:* Versões `0.x.x` representam estágio de desenvolvimento inicial ou protótipo; a versão `1.0.0` marca o primeiro lançamento público estável de um software.

---

## 6. O Ecossistema Git e GitHub

- **Git:** Sistema de controle de versão distribuído criado por Linus Torvalds. Roda localmente no terminal do desenvolvedor.
- **GitHub:** Plataforma baseada em nuvem que hospeda repositórios remotos Git, fornecendo ferramentas de colaboração em equipe (*Pull Requests*, *Code Review*, *Issues* e automação de CI/CD).

### Boas Práticas Essenciais de Git:
- **Commits Pequenos e Atômicos:** Facilitam a localização de bugs e facilitam operações de *cherry-pick* ou *revert*.
- **Mensagens Claras e Semânticas:** Ex: `feat: add task filter`, `fix: prevent empty submission`.
- **Estratégia de Branches:** Manter a branch `main` sempre estável e pronta para produção; desenvolver funcionalidades em *feature branches* (`feature/login`, `feature/dark-mode`).
- **Uso de Tags:** Marcação de pontos específicos no histórico de commits para sinalizar releases oficiais (ex: `git tag -a 1.0.0 -m "Release v1.0.0"`).
- **Arquivo `.gitignore`:** Exclusão de artefatos temporários, chaves secretas e dependências pesadas (`node_modules/`, `.env`).

---

## 7. Ambiente de Desenvolvimento: Node.js e NPM

- **Node.js:** Ambiente de execução assíncrono e orientado a eventos que permite rodar código JavaScript fora do navegador (no servidor ou terminal). Unifica a linguagem em toda a stack (*full-stack* JS).
- **NPM (*Node Package Manager*):** Gerenciador de pacotes que automatiza o download, atualização e resolução de dependências de bibliotecas externas.
- **`package.json`:** Manifesto do projeto que lista metadados, scripts de execução (`start`, `build`, `test`) e dependências de produção e desenvolvimento.
- **`npx`:** Utilitário que permite executar pacotes npm temporariamente sem a necessidade de instalá-los globalmente no sistema operacional.

---

## 8. Deploy e Hospedagem em Nuvem com a Vercel

O **Deploy** é o processo de transferir a aplicação do ambiente local de desenvolvimento para a infraestrutura de produção, tornando-a acessível via internet por usuários finais.

A **Vercel** destaca-se como a plataforma padrão para aplicações web modernas por:
- **Integração Nativa com GitHub:** Disparo automático de compilação e deploy a cada comando `git push` executado;
- **Rede Global de Distribuição de Conteúdo (Edge CDN):** Disponibilização de arquivos estáticos em servidores distribuídos pelo planeta, garantindo baixa latência e velocidade de carregamento;
- **Pré-visualizações Instantâneas (*Preview Deployments*):** Geração de URLs temporárias para cada *branch* ou *Pull Request* antes do merge na versão de produção;
- **Suporte a Funções Serverless:** Execução escalável de trechos de código backend sem gestão manual de servidores.
