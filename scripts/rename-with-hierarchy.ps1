# Script de renommage hiérarchique A-XX-YY-ZZ
# A = Espace (A=auth, B=admin, C=student, D=teacher)
# XX = Section (01-99)
# YY = Sous-section (01-99)  
# ZZ = Item (01-99)

$basePath = "pages"
$counter = 1

# Mapping des espaces principaux
$spaceMapping = @{
    "01-auth" = "A"
    "02-admin" = "B"
    "03-student" = "C"
    "04-teacher" = "D"
}

Write-Host "🔄 Renommage hiérarchique en cours...`n"

# Fonction récursive de renommage
function Rename-Hierarchical {
    param(
        [string]$Path,
        [string]$Prefix
    )
    
    $sectionCounter = 1
    
    # Parcourir les sous-dossiers
    Get-ChildItem -Path $Path -Directory | Sort-Object Name | ForEach-Object {
        $folder = $_
        $folderName = $folder.Name
        
        # Générer le nouveau préfixe
        $newPrefix = "$Prefix-{0:D2}" -f $sectionCounter
        $newName = "$newPrefix-$folderName"
        
        # Si le nom commence déjà par un numéro, on le retire
        if ($folderName -match '^\d+-(.+)') {
            $cleanName = $matches[1]
            $newName = "$newPrefix-$cleanName"
        }
        
        Write-Host "$($folder.FullName -replace [regex]::Escape((Get-Location).Path + '\'), '') → $newName"
        
        # Renommer le dossier
        $newPath = Join-Path $folder.Parent.FullName $newName
        Rename-Item -Path $folder.FullName -NewName $newName -Force
        
        # Récursion pour les sous-dossiers
        Rename-Hierarchical -Path $newPath -Prefix $newPrefix
        
        $sectionCounter++
    }
    
    # Renommer les fichiers dans ce dossier
    $fileCounter = 1
    Get-ChildItem -Path $Path -File | Where-Object { $_.Extension -eq ".md" -or $_.Extension -eq ".png" } | Sort-Object Name | ForEach-Object {
        $file = $_
        $baseName = $file.BaseName
        $extension = $file.Extension
        
        # Retirer les numéros existants
        if ($baseName -match '^(.+?)\d{3,6}$') {
            $cleanName = $matches[1]
        } else {
            $cleanName = $baseName
        }
        
        # Nouveau nom avec préfixe hiérarchique
        $newFileName = "$Prefix-{0:D2}$cleanName$extension" -f $fileCounter
        
        Write-Host "  $($file.Name) → $newFileName"
        
        Rename-Item -Path $file.FullName -NewName $newFileName -Force -ErrorAction SilentlyContinue
        
        $fileCounter++
    }
}

# Renommer les dossiers de niveau 1 (espaces)
foreach ($space in $spaceMapping.Keys | Sort-Object) {
    $spacePath = Join-Path $basePath $space
    if (Test-Path $spacePath) {
        $spaceCode = $spaceMapping[$space]
        $spaceName = $space -replace '^\d+-', ''
        $newSpaceName = "$spaceCode-$spaceName"
        
        Write-Host "`n=== Espace : $space → $newSpaceName ===" -ForegroundColor Cyan
        
        $newSpacePath = Join-Path $basePath $newSpaceName
        Rename-Item -Path $spacePath -NewName $newSpaceName -Force
        
        # Renommer récursivement le contenu
        Rename-Hierarchical -Path $newSpacePath -Prefix $spaceCode
    }
}

Write-Host "`n✅ Renommage hiérarchique terminé !" -ForegroundColor Green
