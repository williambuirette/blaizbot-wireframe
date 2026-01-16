# Renommage des fichiers avec crochets [id], [cardId], etc.
Write-Host "Renommage des fichiers avec crochets...`n"

Get-ChildItem -Path "pages" -Recurse -File | Where-Object { $_.Name -match '^\[' } | ForEach-Object {
    $file = $_
    $dir = $file.DirectoryName
    $dirName = Split-Path $dir -Leaf
    
    # Extraire le préfixe du dossier parent
    if ($dirName -match '^([A-D](-\d{2})+)-') {
        $prefix = $matches[1]
        $num = if ($file.Extension -eq '.md') { '01' } else { '02' }
        $newName = "$prefix-$num-$($file.Name)"
        
        Write-Host "$($file.FullName) -> $newName"
        Rename-Item -Path $file.FullName -NewName $newName -Force
    }
}

Write-Host "`nTermine!"
