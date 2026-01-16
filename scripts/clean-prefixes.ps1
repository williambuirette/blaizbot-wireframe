# Nettoyage global de tous les préfixes incorrects

Write-Host "🧹 Nettoyage des préfixes incorrects...`n"

# Fonction récursive
function Clean-All {
    param([string]$Path)
    
    # Nettoyer les sous-dossiers d'abord (profondeur d'abord)
    Get-ChildItem -Path $Path -Directory -Recurse | Sort-Object FullName -Descending | ForEach-Object {
        $folder = $_
        $name = $folder.Name
        
        # Retirer les préfixes répétés (ex: C-06-03-01detail → detail)
        if ($name -match '^([A-D])-(\d{2}-)+(.+)$') {
            $prefix = $matches[1]
            $cleanName = $matches[3]
            
            # Trouver le bon préfixe basé sur le parent
            $parent = $folder.Parent.Name
            if ($parent -match '^([A-D](-\d{2})*)-') {
                $newPrefix = $matches[1]
                # Compter le niveau
                $level = ($newPrefix -split '-').Count
                $newNumber = "{0:D2}" -f 1  # Temporaire, sera corrigé après
                $newName = "$newPrefix-$newNumber-$cleanName"
            } else {
                $newName = $cleanName
            }
            
            if ($name -ne $newName) {
                Write-Host "📁 $($folder.FullName) → $newName"
                try {
                    Rename-Item -Path $folder.FullName -NewName $newName -Force -ErrorAction Stop
                } catch {
                    Write-Host "  ⚠️ Erreur: $_" -ForegroundColor Red
                }
            }
        }
    }
    
    # Nettoyer les fichiers
    Get-ChildItem -Path $Path -File -Recurse | Where-Object { $_.Extension -eq ".md" -or $_.Extension -eq ".png" } | ForEach-Object {
        $file = $_
        $name = $file.BaseName
        
        # Retirer les préfixes répétés
        if ($name -match '^([A-D])-(\d{2}-)+(.+)$') {
            $cleanName = $matches[3]
            $newName = "$cleanName$($file.Extension)"
            
            if ($file.Name -ne $newName) {
                Write-Host "  📄 $($file.Name) → $newName"
                try {
                    Rename-Item -Path $file.FullName -NewName $newName -Force -ErrorAction SilentlyContinue
                } catch {}
            }
        }
    }
}

Clean-All -Path "pages"

Write-Host "`n✅ Nettoyage terminé ! Relancez le script de numérotation." -ForegroundColor Green
