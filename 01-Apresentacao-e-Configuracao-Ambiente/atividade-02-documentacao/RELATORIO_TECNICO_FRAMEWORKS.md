<!-- ========================================================================== -->
<!-- PÁGINA 1: CAPA E IDENTIFICAÇÃO INSTITUCIONAL                               -->
<!-- ========================================================================== -->

<div align="center">

# SERVIÇO NACIONAL DE APRENDIZAGEM INDUSTRIAL — SENAI
### FACULDADE DE TECNOLOGIA SENAI
### CURSO SUPERIOR DE TECNOLOGIA EM ANÁLISE E DESENVOLVIMENTO DE SISTEMAS

<br><br><br><br>

# RELATÓRIO TÉCNICO DE ENGENHARIA FRONT-END:
## ESTUDO APROFUNDADO DA BIBLIOTECA REACT, CARACTERÍSTICAS ARQUITETURAIS, IMPACTO NO MERCADO E CASO PRÁTICO DE IMPLEMENTAÇÃO

<br><br><br><br>

**Unidade Curricular:** Frameworks Front-end  
**Docente Responsável:** Prof. Me. Deivison S. Takatu  
**Ano Letivo / Semestre:** 2026/2  

<br><br><br><br>

**São Paulo — SP**  
**2026**

</div>

---
<!-- PÁGINA 2: SUMÁRIO E INTRODUÇÃO GERAL -->
---

# SUMÁRIO

1. **INTRODUÇÃO E CONTEXTO HISTÓRICO**
   - 1.1 Contexto da Evolução da Web: Da Web Estática às Single Page Applications (SPAs)
   - 1.2 O Surgimento do React no Facebook e a Ruptura de Paradigmas
2. **FUNDAMENTOS ARQUITETURAIS DO REACT**
   - 2.1 Filosofia Baseada em Componentes Reutilizáveis
   - 2.2 O Conceito de JSX (JavaScript XML) e Transpilação
   - 2.3 Mecanismo de Renderização: O Virtual DOM e o Algoritmo de Reconciliação
   - 2.4 Unidirecionalidade do Fluxo de Dados (One-Way Data Binding)
   - 2.5 Gerenciamento Moderno de Estado com React Hooks (`useState` e `useEffect`)
3. **ANÁLISE COMPARATIVA E VANTAGENS COMPETITIVAS**
   - 3.1 Biblioteca vs. Framework: A Autonomia do React em Relação ao Angular e Vue.js
   - 3.2 Desempenho em Tempo de Execução e Otimizações de Memória
   - 3.3 Ecossistema, Comunidade e Disponibilidade de Talentos no Mercado
4. **APLICAÇÕES NO MERCADO E CENÁRIOS INDUSTRIAIS**
   - 4.1 Grandes Corporações que Utilizam React em Ambientes Críticos
   - 4.2 Arquitetura de Micro-Frontends e Escalabilidade Corporativa
5. **EXEMPLO PRÁTICO DE UTILIZAÇÃO EM UM PROJETO WEB**
   - 5.1 Especificação do Projeto Modelo: Catálogo Dinâmico de Produtos
   - 5.2 Estrutura do Código-Fonte e Explicação Passo a Passo
6. **CONSIDERAÇÕES FINAIS**
7. **REFERÊNCIAS BIBLIOGRÁFICAS (NORMAS ABNT)**

---

## 1. INTRODUÇÃO E CONTEXTO HISTÓRICO

### 1.1 Contexto da Evolução da Web: Da Web Estática às Single Page Applications (SPAs)
Nos primórdios do desenvolvimento web, a arquitetura predominante baseava-se em páginas estáticas ou renderizadas inteiramente pelo servidor (*Server-Side Rendering* - SSR tradicional com PHP, JSP ou ASP clássico). A cada clique de hiperlink ou submissão de formulário pelo usuário, o navegador realizava uma nova requisição HTTP ao servidor, recarregando todo o documento HTML, folhas de estilo e scripts.

Com a evolução dos dispositivos móveis, o aumento da largura de banda e a exigência de interfaces fluidas comparáveis a softwares desktop nativos, emergiu a demanda pelas chamadas *Single Page Applications* (SPAs). Nas SPAs, uma única casca HTML é baixada no carregamento inicial; a partir deste ponto, toda a navegação e atualização da interface acontecem dinamicamente no lado do cliente (*client-side*), solicitando apenas dados em formato JSON através de serviços web e APIs RESTful.

### 1.2 O Surgimento do React no Facebook e a Ruptura de Paradigmas
À medida que aplicações como o Facebook e o Instagram cresciam em volume de usuários e complexidade de tela (múltiplos feeds, chat em tempo real, painéis de anúncios e notificações concorrentes), a manipulação imperativa do DOM nativo através de Vanilla JS ou bibliotecas como jQuery tornou-se insustentável. O problema central residia na inconsistência do estado da aplicação: múltiplos módulos disputavam a sincronização de elementos da tela, gerando lentidão, vazamento de memória e códigos com alto acoplamento ("código espaguete").

Em 2011, Jordan Walke, engenheiro de software do Facebook, concebeu o protótipo *FaxJS*, que mais tarde se tornaria o **React**, lançado como projeto de código aberto em maio de 2013 na conferência JSConf US. A grande revolução do React não foi tentar ser uma solução monolítica "tudo-em-um" (como o AngularJS da época), mas sim focar com extrema excelência em uma única responsabilidade: **a construção declarativa de interfaces de usuário**, introduzindo conceitos até então contestados como o JSX e a reconciliação através de uma árvore de DOM virtual em memória.

---
<!-- PÁGINA 3: FUNDAMENTOS ARQUITETURAIS DO REACT -->
---

## 2. FUNDAMENTOS ARQUITETURAIS DO REACT

### 2.1 Filosofia Baseada em Componentes Reutilizáveis
A pedra fundamental do React é o princípio da **componentização**. Um componente é uma unidade isolada, autônoma e modular que encapsula sua própria estrutura visual (HTML/JSX), comportamento interativo (JavaScript) e regras de estilização (CSS). 

Em vez de conceber uma aplicação como um arquivo único gigante, o engenheiro decompõe a interface em uma árvore hierárquica de componentes:
- O componente raiz (`<App />`) governa o leiaute global;
- Componentes intermediários (`<Navbar />`, `<Sidebar />`, `<ProductGrid />`) orquestram seções lógicas;
- Componentes folha (`<Button />`, `<Badge />`, `<ProductCard />`) representam elementos elementares de interface.

Essa separação garante a aderência direta ao princípio *DRY (Don't Repeat Yourself)*, eleva a testabilidade do sistema e viabiliza a manutenção paralela por múltiplos times de desenvolvimento.

### 2.2 O Conceito de JSX (JavaScript XML) e Transpilação
O JSX é uma extensão de sintaxe para o JavaScript que permite expressar a estrutura visual da interface diretamente no código de lógica de negócios. Embora visualmente semelhante ao HTML, o JSX opera sobre a sintaxe do JavaScript:
- Atributos utilizam a convenção *camelCase* (`className` em substituição a `class`; `htmlFor` em substituição a `for`);
- Elementos vazios exigem fechamento obrigatório com barra (`<img src="foto.jpg" alt="Exemplo" />`);
- O uso de chaves `{}` permite injetar qualquer expressão JavaScript válida diretamente na renderização de dados, operadores ternários ou funções matemáticas.

Como os navegadores nativos não compreendem JSX, ferramentas de *build* e empacotamento (como Babel, SWC ou esbuild, configurados via Webpack ou Vite) compilam o código JSX em chamadas nativas de funções `React.createElement()` ou na nova especificação de *JSX Transform*.

### 2.3 Mecanismo de Renderização: O Virtual DOM e a Reconciliação
A interação direta com o DOM (*Document Object Model*) dos navegadores é uma das operações mais lentas e custosas computacionalmente na web, pois a alteração de nós acarreta recálculos contínuos de leiaute (*Reflow*) e repintura de pixels (*Repaint*).

Para solucionar esse gargalo, o React implementa uma representação virtual da árvore do documento em memória RAM, denominada **Virtual DOM (VDOM)**:
1. **Disparo da Mudança:** Quando uma interação do usuário ou a chegada de dados de uma API modifica o estado (*state*) de um componente, o React dispara um novo ciclo de renderização.
2. **Cálculo da Nova Árvore:** O componente gera uma nova descrição virtual da interface correspondente ao novo estado.
3. **Algoritmo de Reconciliação (*Diffing Algorithm*):** O motor interno do React compara a nova árvore do Virtual DOM com o snapshot da árvore anterior com complexidade algorítmica $O(n)$, baseando-se em heurísticas eficientes (identidade estável de elementos, tipos de nós e a presença obrigatória da propriedade `key` em coleções).
4. **Atualização Atômica no DOM Real:** Identificadas apenas as propriedades ou nós que sofreram mutação real, o React consolida as diferenças em lote (*batching*) e aplica cirurgicamente apenas as modificações estritas no DOM do navegador, poupando ciclos de CPU da GPU do cliente.

```
+------------------+         +--------------------+         +-----------------+
| Novo Estado (UI) | ------> | Novo Virtual DOM   | ------> | Algoritmo Diff  |
+------------------+         +--------------------+         +--------+--------+
                                                                     |
                                      +------------------------------+
                                      v
                         +--------------------------+
                         | Aplicação Cirúrgica     | ------> [ DOM Real do Navegador ]
                         | Apenas nas Diferenças    |
                         +--------------------------+
```

### 2.4 Unidirecionalidade do Fluxo de Dados (One-Way Data Binding)
Ao contrário de frameworks que implementavam amarração bidirecional descontrolada (*two-way data binding*), o React consolida um **fluxo unidirecional descendente de dados**. Os dados trafegam exclusivamente dos componentes ancestrais (pais) para os componentes descendentes (filhos) através de propriedades somente-leitura denominadas **`props`**. 

Quando um componente filho necessita solicitar a alteração de um dado de seu pai, ele o faz invocando funções de retorno (*callbacks*) repassadas explicitamente via props. Isso confere previsibilidade total à aplicação: em caso de anomalia ou bug, o desenvolvedor sabe exatamente a origem de cada dado inspecionando a hierarquia.

### 2.5 Gerenciamento Moderno de Estado com React Hooks
Com o lançamento do React 16.8 em 2019, as funções tornaram-se o padrão hegemônico da biblioteca, substituindo os antigos componentes baseados em classes através dos **React Hooks**:
- **`useState`:** Permite que componentes funcionais declarem e gerenciem estado interno de maneira reativa, desencadeando re-renderizações controladas quando alterados.
- **`useEffect`:** Coordena a execução de efeitos colaterais (*side effects*) fora do fluxo síncrono de renderização, tais como consumo assíncrono de APIs REST (`fetch`/`axios`), manipulação manual de títulos de página (`document.title`), inscrição em eventos de janela (*window listeners*) e temporizadores, oferecendo inclusive mecanismo explícito de limpeza (*cleanup function*) para desvincular recursos e evitar vazamentos de memória.

---
<!-- PÁGINA 4: ANÁLISE COMPARATIVA E MERCADO -->
---

## 3. ANÁLISE COMPARATIVA E VANTAGENS COMPETITIVAS

### 3.1 Biblioteca vs. Framework: A Autonomia do React em Relação ao Angular e Vue.js
Uma discussão basilar no ecossistema de software reside na distinção técnica entre **Frameworks** e **Bibliotecas**:
- **Framework (ex: Angular):** É uma arquitetura opinionada e completa que detém a *Inversão de Controle*. O framework estabelece a estrutura de pastas, o mecanismo de injeção de dependências, o cliente HTTP oficial (`HttpClient`), o sistema de formulários reativos e o roteador padrão. O desenvolvedor escreve o código preenchendo as lacunas definidas pelo framework.
- **Biblioteca (ex: React):** Foca estritamente na camada de visualização (a letra "V" do clássico padrão MVC). O desenvolvedor retém o controle do fluxo da aplicação, tendo a flexibilidade de selecionar as bibliotecas complementares que melhor se adequem ao problema: gerenciamento de estado global (*Redux Toolkit*, *Zustand*, *Context API*), roteamento (*React Router*) e estilização (*Tailwind CSS*, *Styled Components*).

```
+---------------------------------------------------------------------------------------+
| Critério              | React (Meta)             | Angular (Google)        | Vue.js (Comunidade)     |
+-----------------------+--------------------------+-------------------------+-------------------------+
| Classificação         | Biblioteca flexível      | Framework opinativo     | Framework progressivo   |
| Linguagem Base        | JavaScript / TypeScript  | TypeScript obrigatório  | JavaScript / TypeScript |
| Abordagem Visual      | JSX (HTML in JS)         | Templates HTML externos | Single File Components  |
| Curva de Aprendizado  | Moderada                 | Alta / Íngreme          | Suave                   |
| Roteamento / Estado   | Bibliotecas da comunidade| Solução oficial embutida| Soluções oficiais livres|
| Desempenho            | Elevado (Virtual DOM)    | Elevado (Change Det.)   | Elevado (Reatividade 3) |
+---------------------------------------------------------------------------------------+
```

### 3.2 Desempenho e Eficiência em Produção
O React destaca-se pela alta eficiência em ambientes de produção. Com os novos avanços do motor React Fiber, a introdução de renderização concorrente (*Concurrent Features*), transições prioritárias (`useTransition`) e o advento dos componentes de servidor (*React Server Components* - RSC em frameworks como Next.js), o React minimiza o tamanho dos pacotes (*bundle size*) enviados ao cliente, reduzindo o tempo de carregamento de métricas essenciais como o *Largest Contentful Paint* (LCP).

### 3.3 Ecossistema, Comunidade e Demanda Corporativa
De acordo com levantamentos globais de mercado (como a pesquisa anual do *Stack Overflow* e índices do *State of JS*), o React sustenta há mais de uma década o posto de tecnologia front-end mais demandada pelas empresas. A magnitude do seu ecossistema garante:
- Milhares de componentes de terceiros prontos para uso no repositório NPM;
- Ampla documentação, fóruns ativos e suporte comunitário em nível mundial;
- Compatibilidade direta com o desenvolvimento mobile multiplataforma através do **React Native**, permitindo que equipes compartilhem lógica entre web, Android e iOS.

---

## 4. APLICAÇÕES NO MERCADO E CENÁRIOS INDUSTRIAIS

### 4.1 Grandes Corporações que Utilizam React em Ambientes Críticos
O React é a espinha dorsal de algumas das maiores plataformas digitais do planeta:
- **Meta (Facebook, Instagram, WhatsApp Web):** Construtor e mantenedor da tecnologia, operando interfaces massivas que servem bilhões de requisições simultâneas.
- **Netflix:** Reformulou sua interface de streaming web e para televisores inteligentes migrando para React, conquistando redução drástica no tempo de inicialização dos aplicativos e modularidade de componentes.
- **Airbnb:** Pioneira na estruturação de sistemas corporativos de design (*Design Systems*) unificados em React, garantindo consistência visual entre equipes globais.
- **Nubank & Uber:** Empregam React e React Native em suas plataformas operacionais de atendimento, finanças e mobilidade, acelerando o ciclo de entrega de novas funcionalidades.

### 4.2 Arquitetura de Micro-Frontends
Em organizações corporativas complexas, o React é comumente empregado sob a abordagem de **Micro-Frontends** (via *Module Federation* do Webpack ou Vite). Essa técnica permite que diferentes squads independentes desenvolvam, testem e publiquem partes distintas de uma mesma aplicação web (ex: checkout, catálogo e área do cliente) sem que o build de um time afete o deploy do outro.

---
<!-- PÁGINA 5: EXEMPLO PRÁTICO DE IMPLEMENTAÇÃO E CONCLUSÃO -->
---

## 5. EXEMPLO PRÁTICO DE UTILIZAÇÃO EM UM PROJETO WEB

Para ilustrar de forma concisa e rigorosa os fundamentos conceituais estudados — **JSX, Componentização, Passagem de Dados via Props, Estado com `useState`, Listas com `key` e Renderização Condicional** —, apresenta-se a seguir a implementação de um Catálogo Interativo com Filtro e Adição ao Carrinho.

### 5.1 Implementação do Código-Fonte

```jsx
import React, { useState } from 'react';

// =========================================================================
// 1. Componente Filho: CardProduto (Demonstração de Props e Reutilização)
// =========================================================================
function CardProduto({ id, nome, preco, emEstoque, onAdicionar }) {
  return (
    <article className="produto-card" style={{ border: '1px solid #e2e8f0', padding: '16px', borderRadius: '8px' }}>
      <header>
        <h3 style={{ margin: '0 0 8px 0' }}>{nome}</h3>
        {/* Renderização Condicional: Indicador visual de estoque */}
        <span style={{ 
          color: emEstoque ? '#16a34a' : '#dc2626',
          fontWeight: 'bold',
          fontSize: '0.85rem' 
        }}>
          {emEstoque ? '● Disponível' : '✖ Esgotado'}
        </span>
      </header>

      <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '12px 0' }}>
        R$ {preco.toFixed(2)}
      </p>

      {/* Renderização Condicional no Botão */}
      <button
        onClick={() => onAdicionar({ id, nome, preco })}
        disabled={!emEstoque}
        style={{
          padding: '8px 16px',
          background: emEstoque ? '#2563eb' : '#94a3b8',
          color: '#ffffff',
          border: 'none',
          borderRadius: '4px',
          cursor: emEstoque ? 'pointer' : 'not-allowed'
        }}
      >
        {emEstoque ? 'Adicionar ao Carrinho' : 'Indisponível'}
      </button>
    </article>
  );
}

// =========================================================================
// 2. Componente Pai: CatalogoApp (Demonstração de State, Map, Keys e Eventos)
// =========================================================================
export default function CatalogoApp() {
  // Estado para armazenar os itens do carrinho
  const [carrinho, setCarrinho] = useState([]);
  
  // Estado para controle de exibição (filtro de disponíveis)
  const [apenasDisponiveis, setApenasDisponiveis] = useState(false);

  // Lista estática de dados
  const produtos = [
    { id: 101, nome: 'Monitor Gamer 27" IPS', preco: 1299.90, emEstoque: true },
    { id: 102, nome: 'Teclado Mecânico RGB', preco: 349.50, emEstoque: true },
    { id: 103, nome: 'Mouse Sem Fio 16000 DPI', preco: 219.00, emEstoque: false },
    { id: 104, nome: 'Headset 7.1 Surround', preco: 450.00, emEstoque: true },
  ];

  // Função disparada pelo componente filho para atualizar o estado pai
  const handleAdicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => [...prev, produto]);
  };

  // Filtragem declarativa da lista de dados
  const produtosExibidos = apenasDisponiveis 
    ? produtos.filter(p => p.emEstoque) 
    : produtos;

  // Cálculo reativo do valor total acumulado
  const totalValor = carrinho.reduce((acc, item) => acc + item.preco, 0);

  return (
    <main style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Loja de Periféricos — Demonstração React</h2>
      
      {/* Painel do Carrinho (Renderização Condicional de Conteúdo Vazio vs Preenchido) */}
      <section style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
        <strong>Resumo do Carrinho: </strong>
        {carrinho.length === 0 ? (
          <span>Seu carrinho está vazio no momento.</span>
        ) : (
          <span>{carrinho.length} itens adicionados | Total: R$ {totalValor.toFixed(2)}</span>
        )}
      </section>

      {/* Controles de Filtro */}
      <div style={{ marginBottom: '16px' }}>
        <label>
          <input 
            type="checkbox" 
            checked={apenasDisponiveis} 
            onChange={(e) => setApenasDisponiveis(e.target.checked)} 
          />
          {' '}Exibir apenas produtos em estoque
        </label>
      </div>

      {/* Renderização de Lista com map() e chaves exclusivas key */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {produtosExibidos.map((prod) => (
          <CardProduto
            key={prod.id}
            id={prod.id}
            nome={prod.nome}
            preco={prod.preco}
            emEstoque={prod.emEstoque}
            onAdicionar={handleAdicionarAoCarrinho}
          />
        ))}
      </div>
    </main>
  );
}
```

### 5.2 Análise Técnica do Exemplo
1. **Passagem e Encapsulamento de Props:** O componente pai `CatalogoApp` itera sobre a coleção `produtos` e repassa os dados individuais (`nome`, `preco`, `emEstoque`) para `CardProduto`.
2. **Propriedade `key` Estável:** A utilização de `key={prod.id}` provê um identificador persistente e único entre nós irmãos, permitindo ao algoritmo de reconciliação rastrear exatamente quais elementos foram alterados ou mantidos na tela.
3. **Comunicação Filho-para-Pai:** Quando o botão é acionado, `onAdicionar` executa a função de callback fornecida pelo pai, manipulando o estado de forma imutável via `setCarrinho`.

---

## 6. CONSIDERAÇÕES FINAIS

O estudo técnico desenvolvido comprova que a ampla dominância do **React** no mercado corporativo decorre da consistência de seus alicerces conceituais:
- A adoção do **Virtual DOM** soluciona o custo de renderização do DOM do navegador;
- A **unidirecionalidade dos dados** assegura rastreabilidade e simplicidade cognitiva em projetos de grande escala;
- A transição para os **React Hooks** promoveu uma reutilização sem precedentes de lógica de negócios sem a rigidez das classes;
- A sua condição de **biblioteca modular** em vez de framework monolítico viabiliza arquiteturas altamente flexíveis que acompanham o dinamismo da web moderna.

Portanto, o domínio das competências do ecossistema React capacita o estudante de Análise e Desenvolvimento de Sistemas do SENAI a construir interfaces de padrão profissional, integradas a pipelines contínuos de entrega em nuvem.

---

## 7. REFERÊNCIAS BIBLIOGRÁFICAS (NORMAS ABNT)

1. SOUZA, Natan. **Bootstrap 4: conheça a biblioteca front-end mais utilizada no mundo.** São Paulo: Casa do Código, 2018. E-book. Disponível em: https://plataforma.bvirtual.com.br.
2. MACHADO, Kheronn Khennedy. **Angular 11 e Firebase: construindo uma aplicação integrada com a plataforma do Google.** São Paulo: Casa do Código, 2021. E-book. Disponível em: https://plataforma.bvirtual.com.br.
3. EIS, Diego. **Guia Front-end: o caminho das pedras para ser um dev front-end.** São Paulo: Casa do Código, 2015. E-book. Disponível em: https://plataforma.bvirtual.com.br.
4. GONÇALVES, Edson. **Desenvolvendo aplicações Web com JSP, Servlets, JavaServer Faces, Hibernate, EJB 3 Persistence e Ajax.** Rio de Janeiro: Ciência Moderna, c2007.
5. HARTCOPP, Patrícia Ferreira. **Métrica Web.** São Paulo: Contentus, 2020. E-book (94 p.). Disponível em: https://plataforma.bvirtual.com.br/Acervo/Publicacao/185191.
6. NIEDERAUER, Juliano. **Desenvolvendo Websites com PHP: aprenda a criar Websites dinâmicos e interativos com PHP e banco de dados.** 3. ed. São Paulo: Novatec, 2017.
7. PREECE, J.; ROGERS, Y.; SHARP, H. **Design de Interação: além da interação Homem-Computador.** 3. ed. Porto Alegre: Bookman, 2013.
8. SOUSA, Roque Fernando Marcos. **Canvas HTML 5: composição gráfica e interatividade na Web.** Rio de Janeiro: Brasport, 2014. E-book. Disponível em: https://plataforma.bvirtual.com.br/Acervo/Publicacao/160686.
9. REACT. **React Documentation: Quick Start and Core Concepts.** Disponível em: https://react.dev. Acesso em: 18 nov. 2026.
