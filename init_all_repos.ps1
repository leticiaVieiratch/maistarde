param([string]$RootPath = "C:\\Users\\Letícia Vieira\\Desktop\\DevisonProjeto")
Get-ChildItem -Path $RootPath -Recurse -Directory | ForEach-Object {
    # Skip if already a git repo (has .git folder)
    if (-not (Test-Path -LiteralPath (Join-Path $_.FullName ".git"))) {
        Write-Host "Initializing git repo in $($_.FullName)"
        git -C $_.FullName init | Out-Null
    }
}
Write-Host "All repositories initialized."