# Script de renommage avec numérotation globale continue
# .md = impair (001, 003, 005...)
# .png = pair (002, 004, 006...)

$counter = 1

Write-Host "🔄 Renommage en cours...`n"

# Parcours récursif de tous les fichiers dans pages/
Get-ChildItem -Path "pages" -Recurse -File | Where-Object { $_.Extension -eq ".md" -or $_.Extension -eq ".png" } | Sort-Object FullName | ForEach-Object {
    $file = $_
    $extension = $file.Extension
    $baseName = $file.BaseName
    $directory = $file.DirectoryName
    
    # Générer le numéro (impair pour .md, pair pour .png)
    if ($extension -eq ".md") {
        $newNumber = "{0:D3}" -f $counter
        $counter++
    }
    elseif ($extension -eq ".png") {
        $newNumber = "{0:D3}" -f $counter
        $counter++
    }
    
    $newName = "$baseName$newNumber$extension"
    
    # Afficher le mapping
    $relativePath = $file.FullName -replace [regex]::Escape((Get-Location).Path + "\"), ""
    $newPath = Join-Path $directory $newName
    $newRelativePath = $newPath -replace [regex]::Escape((Get-Location).Path + "\"), ""
    
    Write-Host "$relativePath → $newRelativePath"
    
    # Renommer
    Rename-Item -Path $file.FullName -NewName $newName -Force
}

Write-Host "`n✅ Renommage terminé ! Total : $counter fichiers"
