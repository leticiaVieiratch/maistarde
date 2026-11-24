/**
 * Script de Automação para Criação e Publicação dos Repositórios no GitHub
 * Disciplina: Frameworks Front-End • SENAI • Prof. Me. Deivison S. Takatu
 * Aluna: Letícia Vieira (@leticiaVieiratch)
 * 
 * Como usar:
 *   node publicar_todos_github.js <SEU_GITHUB_PERSONAL_ACCESS_TOKEN>
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const https = require('https');

const GITHUB_USERNAME = 'leticiaVieiratch';
const TOKEN = process.argv[2] || process.env.GITHUB_TOKEN;

const REPOSITORIOS = [
  {
    nome: 'senai-aula07-boxmodel-flexbox',
    pasta: '07-Frameworks-CSS/atividade-01-box-model-flexbox',
    descricao: 'SENAI • Aula 07 - Atividade 01: Box Model (Content, Padding, Border, Margin) e 20 Propriedades Flexbox'
  },
  {
    nome: 'senai-aula07-tailwind-dashboard',
    pasta: '07-Frameworks-CSS/atividade-02-tailwind',
    descricao: 'SENAI • Aula 07 - Atividade 02: Dashboard de Métricas com Tailwind CSS Utility-First e Mapeamento'
  },
  {
    nome: 'senai-aula08-projeto-react',
    pasta: '08-Projeto-React',
    descricao: 'SENAI • Aula 08: Projeto React - Fundamentos (JSX, Componentes, Props, Virtual DOM, Listas com Keys)'
  },
  {
    nome: 'senai-aula09-projeto-react-02',
    pasta: '09-Projeto-React-02',
    descricao: 'SENAI • Aula 09: Projeto React 02 - State, Formulários Controlados, useEffect, APIs e React Router'
  },
  {
    nome: 'senai-aula01-vanillajs-notes',
    pasta: '01-Apresentacao-e-Configuracao-Ambiente/atividade-01-vanillajs',
    descricao: 'SENAI • Aula 01 - Atividade 01: Manipulação de DOM Nativo e LocalStorage em Vanilla JS'
  },
  {
    nome: 'senai-aula01-relatorio-frameworks',
    pasta: '01-Apresentacao-e-Configuracao-Ambiente/atividade-02-documentacao',
    descricao: 'SENAI • Aula 01 - Atividade 02: Relatório Técnico Comparativo de Frameworks Front-End (ABNT)'
  },
  {
    nome: 'senai-aula03-kanban-board',
    pasta: '03-Gestao-de-Projetos-FrontEnd/kanban-board',
    descricao: 'SENAI • Aula 06: Gestão Ágil de Projetos Front-End com Kanban Board Interativo'
  },
  {
    nome: 'senai-aula06-api-express-crud',
    pasta: '06-Criando-e-Consumindo-APIs/atividade-02-api-express-crud',
    descricao: 'SENAI • Aula 04/05: API RESTful CRUD em Node.js e Express com Persistência em JSON e Postman'
  },
  {
    nome: 'senai-frameworks-frontend-portal',
    pasta: '.',
    descricao: 'SENAI • Portal Central com Todas as 9 Aulas e Atividades da Disciplina Frameworks Front-End'
  }
];

function executar(cmd, cwd = process.cwd()) {
  try {
    return execSync(cmd, { cwd, stdio: 'pipe' }).toString().trim();
  } catch (err) {
    if (err.stdout) console.log(err.stdout.toString());
    if (err.stderr) console.error(err.stderr.toString());
    throw err;
  }
}

function criarRepoGitHub(nome, descricao) {
  return new Promise((resolve, reject) => {
    if (!TOKEN) {
      return reject(new Error('GitHub Token não informado!'));
    }

    const data = JSON.stringify({
      name: nome,
      description: descricao,
      private: false,
      has_issues: true,
      has_projects: true,
      has_wiki: true
    });

    const req = https.request({
      hostname: 'api.github.com',
      port: 443,
      path: '/user/repos',
      method: 'POST',
      headers: {
        'User-Agent': 'NodeJS-Deploy-Script',
        'Authorization': `token ${TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 201) {
          console.log(`✅ Repositório criado no GitHub: https://github.com/${GITHUB_USERNAME}/${nome}`);
          resolve(JSON.parse(body));
        } else if (res.statusCode === 422) {
          console.log(`ℹ️ Repositório já existe no GitHub: https://github.com/${GITHUB_USERNAME}/${nome}`);
          resolve({ exists: true });
        } else {
          reject(new Error(`Falha HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function processarRepositorio(repo) {
  const dirAbsoluto = path.resolve(repo.pasta);
  console.log(`\n======================================================`);
  console.log(`📦 Processando: ${repo.nome}`);
  console.log(`📂 Pasta: ${repo.pasta}`);

  // Se tiver TOKEN, tenta criar o repositório na API do GitHub
  if (TOKEN) {
    try {
      await criarRepoGitHub(repo.nome, repo.descricao);
    } catch (e) {
      console.warn(`Aviso ao criar repo no GitHub:`, e.message);
    }
  }

  // Prepara o repositório Git local
  const gitDir = path.join(dirAbsoluto, '.git');
  
  if (repo.pasta === '.') {
    // Repositório principal
    console.log(`⚡ Repositório raiz já versionado.`);
    if (TOKEN) {
      try {
        const urlComToken = `https://${TOKEN}@github.com/${GITHUB_USERNAME}/${repo.nome}.git`;
        executar(`git remote set-url origin "${urlComToken}"`);
      } catch {
        const urlComToken = `https://${TOKEN}@github.com/${GITHUB_USERNAME}/${repo.nome}.git`;
        executar(`git remote add origin "${urlComToken}"`);
      }
      console.log(`🚀 Enviando commits do repositório principal...`);
      executar(`git branch -M main`);
      executar(`git push -u origin main --force`);
      console.log(`🎉 Sucesso: https://github.com/${GITHUB_USERNAME}/${repo.nome}`);
    }
    return;
  }

  // Para subpastas: criar repo isolado caso não exista
  if (!fs.existsSync(gitDir)) {
    console.log(`🔧 Inicializando Git em: ${repo.pasta}`);
    executar(`git init`, dirAbsoluto);
  }

  try {
    executar(`git add .`, dirAbsoluto);
    try {
      executar(`git commit -m "feat: publicacao da atividade no GitHub"`, dirAbsoluto);
    } catch (cErr) {
      // Já está tudo commitado
    }
    executar(`git branch -M main`, dirAbsoluto);

    if (TOKEN) {
      const urlComToken = `https://${TOKEN}@github.com/${GITHUB_USERNAME}/${repo.nome}.git`;
      try {
        executar(`git remote set-url origin "${urlComToken}"`, dirAbsoluto);
      } catch {
        executar(`git remote add origin "${urlComToken}"`, dirAbsoluto);
      }
      console.log(`🚀 Enviando commits para o GitHub...`);
      executar(`git push -u origin main --force`, dirAbsoluto);
      console.log(`🎉 Sucesso: https://github.com/${GITHUB_USERNAME}/${repo.nome}`);
    } else {
      console.log(`💡 Para enviar manualmente após criar o repo no GitHub:`);
      console.log(`   cd "${dirAbsoluto}"`);
      console.log(`   git remote add origin https://github.com/${GITHUB_USERNAME}/${repo.nome}.git`);
      console.log(`   git push -u origin main`);
    }
  } catch (err) {
    console.error(`Erro ao processar pasta ${repo.pasta}:`, err.message);
  }
}

async function main() {
  if (!TOKEN) {
    console.log(`
ℹ️ NENHUM GITHUB TOKEN FORNECIDO.
O script irá preparar todos os repositórios locais e gerar os comandos.
Para criar e enviar automaticamente para sua conta no GitHub, execute:
  node publicar_todos_github.js <SEU_PERSONAL_ACCESS_TOKEN>
`);
  }

  for (const repo of REPOSITORIOS) {
    await processarRepositorio(repo);
  }

  console.log(`\n======================================================`);
  console.log(`✨ Todos os repositórios foram preparados e versionados!`);
}

main().catch(err => {
  console.error('Erro na execução:', err);
  process.exit(1);
});
