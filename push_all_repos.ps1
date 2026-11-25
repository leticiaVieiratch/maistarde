param(
    [Parameter(Mandatory=$true)]
    [string]$Token
)

$repos = @(
    @{nome='senai-aula07-boxmodel-flexbox'; pasta='07-Frameworks-CSS/atividade-01-box-model-flexbox'}
    @{nome='senai-aula07-tailwind-dashboard'; pasta='07-Frameworks-CSS/atividade-02-tailwind'}
    @{nome='senai-aula08-projeto-react'; pasta='08-Projeto-React'}
    @{nome='senai-aula09-projeto-react-02'; pasta='09-Projeto-React-02'}
    @{nome='senai-aula01-vanillajs-notes'; pasta='01-Apresentacao-e-Configuracao-Ambiente/atividade-01-vanillajs'}
    @{nome='senai-aula01-relatorio-frameworks'; pasta='01-Apresentacao-e-Configuracao-Ambiente/atividade-02-documentacao'}
    @{nome='senai-aula03-kanban-board'; pasta='03-Gestao-de-Projetos-FrontEnd/kanban-board'}
    @{nome='senai-aula06-api-express-crud'; pasta='06-Criando-e-Consumindo-APIs/atividade-02-api-express-crud'}
    @{nome='senai-frameworks-frontend-portal'; pasta='.'}
)

foreach ($repo in $repos) {
    $fullPath = Join-Path "C:\Users\Letícia Vieira\Desktop\DevisonProjeto" $repo.pasta
    Write-Host "--- Adding remote for $($repo.nome) in $fullPath"
    $remoteUrl = "https://$Token@github.com/leticiaVieiratch/$($repo.nome).git"
    # Add remote (ignore if already exists)
    git -C $fullPath remote add origin $remoteUrl 2>$null
    # Commit any existing files (if nothing to commit, ignore error)
    git -C $fullPath add .
    # Use a generic commit message; if no changes, git will error, so ignore
    git -C $fullPath commit -m "Initial commit" 2>$null
    # Push to GitHub (force create branch if needed)
    git -C $fullPath push -u origin main
}

Write-Host "All repositories pushed to GitHub."