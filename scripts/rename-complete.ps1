# Script de renommage complet et propre avec numérotation A-XX-YY-ZZ
# Parcourt TOUT et numérote chaque niveau correctement

Write-Host "🔄 Renommage complet avec numérotation hiérarchique...`n" -ForegroundColor Cyan

function Rename-Recursively {
    param(
        [string]$Path,
        [string]$Prefix
    )
    
    Write-Host "`n📂 Traitement de : $Path (Préfixe: $Prefix)" -ForegroundColor Yellow
    
    # 1. D'ABORD les sous-dossiers
    $folderCounter = 1
    Get-ChildItem -Path $Path -Directory | Sort-Object Name | ForEach-Object {
        $folder = $_
        $oldName = $folder.Name
        
        # Nettoyer le nom (retirer tous les préfixes existants)
        $cleanName = $oldName -replace '^[A-D](-\d{2})*-', ''
        
        # Nouveau préfixe pour ce dossier
        $newPrefix = "$Prefix-{0:D2}" -f $folderCounter
        $newName = "$newPrefix-$cleanName"
        
        if ($oldName -ne $newName) {
            Write-Host "  📁 $oldName → $newName"
            $newPath = Join-Path $folder.Parent.FullName $newName
            Rename-Item -Path $folder.FullName -NewName $newName -Force
            
            # Appel récursif avec le nouveau préfixe
            Rename-Recursively -Path $newPath -Prefix $newPrefix
        } else {
            # Même si le nom ne change pas, on parcourt quand même les sous-dossiers
            Rename-Recursively -Path $folder.FullName -Prefix $newPrefix
        }
        
        $folderCounter++
    }
    
    # 2. ENSUITE les fichiers dans CE dossier
    $fileCounter = 1
    Get-ChildItem -Path $Path -File | Where-Object { $_.Extension -eq ".md" -or $_.Extension -eq ".png" } | Sort-Object Name | ForEach-Object {
        $file = $_
        $oldName = $file.Name
        $extension = $file.Extension
        
        # Nettoyer le nom de base
        $baseName = $file.BaseName -replace '^[A-D](-\d{2})*-', ''
        
        # Nouveau nom avec préfixe
        $newName = "$Prefix-{0:D2}-$baseName$extension" -f $fileCounter
        
        if ($oldName -ne $newName) {
            Write-Host "    📄 $oldName → $newName"
            Rename-Item -Path $file.FullName -NewName $newName -Force -ErrorAction SilentlyContinue
        }
        
        $fileCounter++
    }
}

# Traiter chaque espace principal
$spaces = @{
    "A-auth" = "A"
    "B-admin" = "B"
    "C-student" = "C"
    "D-teacher" = "D"
}

foreach ($spaceName in $spaces.Keys | Sort-Object) {
    $spacePath = "pages\$spaceName"
    if (Test-Path $spacePath) {
        $spaceCode = $spaces[$spaceName]
        Write-Host "`n=== ESPACE : $spaceName ===" -ForegroundColor Green
        Rename-Recursively -Path $spacePath -Prefix $spaceCode
    }
}

Write-Host "`n✅ Renommage complet terminé !" -ForegroundColor Green
Write-Host "Rafraîchissez VS Code (F5)" -ForegroundColor Yellow
