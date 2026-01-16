# Script de correction de la numérotation
# Supprime les préfixes incorrects accumulés

Write-Host "🔧 Correction de la numérotation...`n" -ForegroundColor Yellow

# Fonction pour nettoyer un nom de fichier/dossier
function Clean-Name {
    param([string]$Name)
    
    # Retirer tous les préfixes de type C-XX-YY- répétés
    # Ex: C-06-03-01detail → detail
    $cleaned = $Name -replace '^[A-D]-\d{2}-(\d{2}-)*', ''
    return $cleaned
}

# Fonction récursive pour renommer
function Fix-Directory {
    param(
        [string]$Path,
        [string]$Prefix
    )
    
    $counter = 1
    
    # Traiter les sous-dossiers
    Get-ChildItem -Path $Path -Directory | Sort-Object Name | ForEach-Object {
        $folder = $_
        $cleanName = Clean-Name $folder.Name
        $newName = "$Prefix-{0:D2}-$cleanName" -f $counter
        
        if ($folder.Name -ne $newName) {
            Write-Host "📁 $($folder.Name) → $newName"
            $newPath = Join-Path $folder.Parent.FullName $newName
            Rename-Item -Path $folder.FullName -NewName $newName -Force
            
            # Récursion
            Fix-Directory -Path $newPath -Prefix "$Prefix-{0:D2}" -f $counter
        }
        
        $counter++
    }
    
    # Traiter les fichiers
    $fileCounter = 1
    Get-ChildItem -Path $Path -File | Where-Object { $_.Extension -eq ".md" -or $_.Extension -eq ".png" } | Sort-Object Name | ForEach-Object {
        $file = $_
        $cleanName = Clean-Name $file.BaseName
        $extension = $file.Extension
        $newName = "$Prefix-{0:D2}$cleanName$extension" -f $fileCounter
        
        if ($file.Name -ne $newName) {
            Write-Host "  📄 $($file.Name) → $newName"
            Rename-Item -Path $file.FullName -NewName $newName -Force -ErrorAction SilentlyContinue
        }
        
        $fileCounter++
    }
}

# Corriger chaque espace
$spaces = @("A-auth", "B-admin", "C-student", "D-teacher")

foreach ($space in $spaces) {
    $spacePath = "pages\$space"
    if (Test-Path $spacePath) {
        $spaceCode = $space.Substring(0, 1)
        Write-Host "`n=== Correction : $space ===" -ForegroundColor Cyan
        Fix-Directory -Path $spacePath -Prefix $spaceCode
    }
}

Write-Host "`n✅ Correction terminée !" -ForegroundColor Green
