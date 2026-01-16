# Script de numérotation complète - TOUS niveaux
Write-Host "Numerotation complete de tous les niveaux...`n"

function Rename-AllLevels {
    param([string]$Path, [string]$Prefix)
    
    # 1. Renommer les sous-dossiers
    $folderCounter = 1
    Get-ChildItem -Path $Path -Directory | Sort-Object Name | ForEach-Object {
        $folder = $_
        $oldName = $folder.Name
        
        # Extraire le nom propre (sans préfixe)
        $cleanName = $oldName -replace '^[A-D](-\d{2})*-', ''
        
        # Nouveau nom avec préfixe hiérarchique
        $newPrefix = "$Prefix-{0:D2}" -f $folderCounter
        $newName = "$newPrefix-$cleanName"
        
        if ($oldName -ne $newName) {
            Write-Host "Dossier: $oldName -> $newName"
            Rename-Item -Path $folder.FullName -NewName $newName -Force
            $newPath = Join-Path $folder.Parent.FullName $newName
            Rename-AllLevels -Path $newPath -Prefix $newPrefix
        } else {
            Rename-AllLevels -Path $folder.FullName -Prefix $newPrefix
        }
        
        $folderCounter++
    }
    
    # 2. Renommer TOUS les fichiers (y compris ceux avec crochets)
    $fileCounter = 1
    Get-ChildItem -Path $Path -File | Where-Object { $_.Extension -eq ".md" -or $_.Extension -eq ".png" } | Sort-Object Name | ForEach-Object {
        $file = $_
        $oldName = $file.Name
        $extension = $file.Extension
        
        # Extraire le nom de base propre
        $baseName = $file.BaseName -replace '^[A-D](-\d{2})*-', ''
        
        # Nouveau nom avec numérotation
        $newName = "$Prefix-{0:D2}-$baseName$extension" -f $fileCounter
        
        if ($oldName -ne $newName) {
            Write-Host "  Fichier: $oldName -> $newName"
            Rename-Item -LiteralPath $file.FullName -NewName $newName -Force -ErrorAction SilentlyContinue
        }
        
        $fileCounter++
    }
}

# Traiter chaque espace
$spaces = @{"A-auth"="A"; "B-admin"="B"; "C-student"="C"; "D-teacher"="D"}

foreach ($spaceName in $spaces.Keys | Sort-Object) {
    $spacePath = "pages\$spaceName"
    if (Test-Path $spacePath) {
        Write-Host "`n=== ESPACE: $spaceName ===" -ForegroundColor Green
        Rename-AllLevels -Path $spacePath -Prefix $spaces[$spaceName]
    }
}

Write-Host "`n=== TERMINE ===" -ForegroundColor Green
Write-Host "Rafraichissez VS Code (F5)"
