# Script PowerShell para criar e subir todos os repositórios para o GitHub
# Uso: .\subir_todos_github.ps1 -Token "SEU_PERSONAL_ACCESS_TOKEN"

param (
    [Parameter(Mandatory=$false)]
    [string]$Token
)

if (-not $Token) {
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host "  SENAI - Frameworks Front-End • Publicador para o GitHub" -ForegroundColor Green
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host ""
    $Token = Read-Host "Por favor, cole seu Personal Access Token do GitHub (com permissao 'repo')"
}

if (-not $Token) {
    Write-Host "Token nao informado. Operacao cancelada." -ForegroundColor Yellow
    exit 1
}

Write-Host "Iniciando criacao e upload de todos os 9 repositorios..." -ForegroundColor Green
node "publicar_todos_github.js" $Token
