# Fix D-teacher numbering errors

$teacherPath = "C:\Users\prote\Documents\GitHub\blaizbot-wireframe\pages\D-teacher"

Write-Host "Correction des numerotations dans D-teacher..." -ForegroundColor Yellow

# D-02-header-menu: D-04 -> D-02
Write-Host "1. D-02-header-menu (D-04 -> D-02)" -ForegroundColor Cyan
Get-ChildItem "$teacherPath\D-02-header-menu" -File | ForEach-Object {
    $newName = $_.Name -replace '^D-04-', 'D-02-'
    if ($newName -ne $_.Name) {
        Rename-Item $_.FullName $newName -Force
        Write-Host "  OK: $($_.Name) -> $newName"
    }
}

# D-03-classes: D-02 -> D-03
Write-Host "2. D-03-classes (D-02 -> D-03)" -ForegroundColor Cyan
if (Test-Path "$teacherPath\D-03-classes\D-02-01-detail") {
    Rename-Item "$teacherPath\D-03-classes\D-02-01-detail" "D-03-01-detail" -Force
    Write-Host "  OK: D-02-01-detail -> D-03-01-detail"
}
Get-ChildItem "$teacherPath\D-03-classes" -File | ForEach-Object {
    $newName = $_.Name -replace '^D-02-', 'D-03-'
    if ($newName -ne $_.Name) {
        Rename-Item $_.FullName $newName -Force
        Write-Host "  OK: $($_.Name) -> $newName"
    }
}
if (Test-Path "$teacherPath\D-03-classes\D-03-01-detail") {
    Get-ChildItem "$teacherPath\D-03-classes\D-03-01-detail" -File | ForEach-Object {
        $newName = $_.Name -replace '^D-02-', 'D-03-'
        if ($newName -ne $_.Name) {
            Rename-Item -LiteralPath $_.FullName $newName -Force
            Write-Host "  OK: $($_.Name) -> $newName"
        }
    }
}

# D-04-students: D-06 -> D-04
Write-Host "3. D-04-students (D-06 -> D-04)" -ForegroundColor Cyan
if (Test-Path "$teacherPath\D-04-students\D-06-01-detail") {
    Rename-Item "$teacherPath\D-04-students\D-06-01-detail" "temp-detail" -Force
    Rename-Item "$teacherPath\D-04-students\temp-detail" "D-04-01-detail" -Force
    Write-Host "  OK: D-06-01-detail -> D-04-01-detail"
}
Get-ChildItem "$teacherPath\D-04-students" -File | ForEach-Object {
    $newName = $_.Name -replace '^D-06-', 'D-04-'
    if ($newName -ne $_.Name) {
        Rename-Item $_.FullName $newName -Force
        Write-Host "  OK: $($_.Name) -> $newName"
    }
}
if (Test-Path "$teacherPath\D-04-students\D-04-01-detail\D-06-01-01-courses") {
    Rename-Item "$teacherPath\D-04-students\D-04-01-detail\D-06-01-01-courses" "D-04-01-01-courses" -Force
    Write-Host "  OK: D-06-01-01-courses -> D-04-01-01-courses"
}
if (Test-Path "$teacherPath\D-04-students\D-04-01-detail") {
    Get-ChildItem "$teacherPath\D-04-students\D-04-01-detail" -File | ForEach-Object {
        $newName = $_.Name -replace '^D-06-', 'D-04-'
        if ($newName -ne $_.Name) {
            Rename-Item -LiteralPath $_.FullName $newName -Force
            Write-Host "  OK: $($_.Name) -> $newName"
        }
    }
}
if (Test-Path "$teacherPath\D-04-students\D-04-01-detail\D-04-01-01-courses") {
    Get-ChildItem "$teacherPath\D-04-students\D-04-01-detail\D-04-01-01-courses" -File | ForEach-Object {
        $newName = $_.Name -replace '^D-06-', 'D-04-'
        if ($newName -ne $_.Name) {
            Rename-Item -LiteralPath $_.FullName $newName -Force
            Write-Host "  OK: $($_.Name) -> $newName"
        }
    }
}

# D-05-courses: D-03 -> D-05
Write-Host "4. D-05-courses (D-03 -> D-05)" -ForegroundColor Cyan
if (Test-Path "$teacherPath\D-05-courses\D-03-01-detail") {
    Rename-Item "$teacherPath\D-05-courses\D-03-01-detail" "temp-detail" -Force
    Rename-Item "$teacherPath\D-05-courses\temp-detail" "D-05-01-detail" -Force
    Write-Host "  OK: D-03-01-detail -> D-05-01-detail"
}
Get-ChildItem "$teacherPath\D-05-courses" -File | ForEach-Object {
    $newName = $_.Name -replace '^D-03-', 'D-05-'
    if ($newName -ne $_.Name) {
        Rename-Item $_.FullName $newName -Force
        Write-Host "  OK: $($_.Name) -> $newName"
    }
}
if (Test-Path "$teacherPath\D-05-courses\D-05-01-detail\D-03-01-01-cards") {
    Rename-Item "$teacherPath\D-05-courses\D-05-01-detail\D-03-01-01-cards" "D-05-01-01-cards" -Force
    Write-Host "  OK: D-03-01-01-cards -> D-05-01-01-cards"
}
if (Test-Path "$teacherPath\D-05-courses\D-05-01-detail") {
    Get-ChildItem "$teacherPath\D-05-courses\D-05-01-detail" -File | ForEach-Object {
        $newName = $_.Name -replace '^D-03-', 'D-05-'
        if ($newName -ne $_.Name) {
            Rename-Item -LiteralPath $_.FullName $newName -Force
            Write-Host "  OK: $($_.Name) -> $newName"
        }
    }
}

$cardTypes = @('exercise', 'lesson', 'note', 'quiz', 'video')
$cardPath = "$teacherPath\D-05-courses\D-05-01-detail\D-05-01-01-cards"
for ($i = 0; $i -lt $cardTypes.Length; $i++) {
    $num = "{0:D2}" -f ($i + 1)
    $oldFolder = "$cardPath\D-03-01-01-$num-$($cardTypes[$i])"
    if (Test-Path $oldFolder) {
        Rename-Item $oldFolder "temp-$($cardTypes[$i])" -Force
        Rename-Item "$cardPath\temp-$($cardTypes[$i])" "D-05-01-01-$num-$($cardTypes[$i])" -Force
        Write-Host "  OK: D-03-01-01-$num-$($cardTypes[$i]) -> D-05-01-01-$num-$($cardTypes[$i])"
        
        $newCardPath = "$cardPath\D-05-01-01-$num-$($cardTypes[$i])"
        Get-ChildItem $newCardPath -File | ForEach-Object {
            $newName = $_.Name -replace '^D-03-', 'D-05-'
            if ($newName -ne $_.Name) {
                Rename-Item -LiteralPath $_.FullName $newName -Force
                Write-Host "    OK: $($_.Name) -> $newName"
            }
        }
    }
}

# D-06-agendas-assignations: D-01 -> D-06
Write-Host "5. D-06-agendas-assignations (D-01 -> D-06)" -ForegroundColor Cyan
Get-ChildItem "$teacherPath\D-06-agendas-assignations" -File | ForEach-Object {
    $newName = $_.Name -replace '^D-01-', 'D-06-'
    if ($newName -ne $_.Name) {
        Rename-Item $_.FullName $newName -Force
        Write-Host "  OK: $($_.Name) -> $newName"
    }
}

# D-07-messages: D-05 -> D-07
Write-Host "6. D-07-messages (D-05 -> D-07)" -ForegroundColor Cyan
Get-ChildItem "$teacherPath\D-07-messages" -File | ForEach-Object {
    $newName = $_.Name -replace '^D-05-', 'D-07-'
    if ($newName -ne $_.Name) {
        Rename-Item $_.FullName $newName -Force
        Write-Host "  OK: $($_.Name) -> $newName"
    }
}

Write-Host "Correction terminee!" -ForegroundColor Green
