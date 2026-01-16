# Script de renommage complet
Write-Host "Renommage en cours...`n"

function Rename-Recursively {
    param([string]$Path, [string]$Prefix)
    
    $folderCounter = 1
    Get-ChildItem -Path $Path -Directory | Sort-Object Name | ForEach-Object {
        $folder = $_
        $oldName = $folder.Name
        $cleanName = $oldName -replace '^[A-D](-\d{2})*-', ''
        $newPrefix = "$Prefix-{0:D2}" -f $folderCounter
        $newName = "$newPrefix-$cleanName"
        
        if ($oldName -ne $newName) {
            Write-Host "Dossier: $oldName -> $newName"
            $newPath = Join-Path $folder.Parent.FullName $newName
            Rename-Item -Path $folder.FullName -NewName $newName -Force
            Rename-Recursively -Path $newPath -Prefix $newPrefix
        } else {
            Rename-Recursively -Path $folder.FullName -Prefix $newPrefix
        }
        $folderCounter++
    }
    
    $fileCounter = 1
    Get-ChildItem -Path $Path -File | Where-Object { $_.Extension -eq ".md" -or $_.Extension -eq ".png" } | Sort-Object Name | ForEach-Object {
        $file = $_
        $oldName = $file.Name
        $baseName = $file.BaseName -replace '^[A-D](-\d{2})*-', ''
        $newName = "$Prefix-{0:D2}-$baseName$($file.Extension)" -f $fileCounter
        
        if ($oldName -ne $newName) {
            Write-Host "  Fichier: $oldName -> $newName"
            Rename-Item -Path $file.FullName -NewName $newName -Force -ErrorAction SilentlyContinue
        }
        $fileCounter++
    }
}

$spaces = @{"A-auth"="A"; "B-admin"="B"; "C-student"="C"; "D-teacher"="D"}
foreach ($spaceName in $spaces.Keys | Sort-Object) {
    $spacePath = "pages\$spaceName"
    if (Test-Path $spacePath) {
        Write-Host "`n=== $spaceName ==="
        Rename-Recursively -Path $spacePath -Prefix $spaces[$spaceName]
    }
}

Write-Host "`nTermine!"
