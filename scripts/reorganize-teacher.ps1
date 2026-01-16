# Reorganisation du dossier D-teacher
Write-Host "Reorganisation de D-teacher...`n"

$teacherPath = "pages\D-teacher"

# 1. Creer dossier dashboard
New-Item -ItemType Directory "$teacherPath\D-01-dashboard" -Force | Out-Null
Write-Host "Cree: D-01-dashboard"

# 2. Deplacer les fichiers dashboard
Move-Item "$teacherPath\D-01-01dashboard.md" "$teacherPath\D-01-dashboard\" -Force
Move-Item "$teacherPath\D-02-02dashboard.png" "$teacherPath\D-01-dashboard\" -Force
Write-Host "Fichiers dashboard deplaces"

# 3. Renommer dans l'ordre avec prefixes temporaires
Rename-Item "$teacherPath\D-04-header-menu" "$teacherPath\temp-header-menu" -Force
Rename-Item "$teacherPath\D-02-classes" "$teacherPath\temp-classes" -Force
Rename-Item "$teacherPath\D-06-students" "$teacherPath\temp-students" -Force
Rename-Item "$teacherPath\D-03-courses" "$teacherPath\temp-courses" -Force
Rename-Item "$teacherPath\D-01-agendas-assignations" "$teacherPath\temp-agendas" -Force
Rename-Item "$teacherPath\D-05-messages" "$teacherPath\temp-messages" -Force

# 4. Renommer avec les bons numeros
Rename-Item "$teacherPath\temp-header-menu" "$teacherPath\D-02-header-menu" -Force
Rename-Item "$teacherPath\temp-classes" "$teacherPath\D-03-classes" -Force
Rename-Item "$teacherPath\temp-students" "$teacherPath\D-04-students" -Force
Rename-Item "$teacherPath\temp-courses" "$teacherPath\D-05-courses" -Force
Rename-Item "$teacherPath\temp-agendas" "$teacherPath\D-06-agendas-assignations" -Force
Rename-Item "$teacherPath\temp-messages" "$teacherPath\D-07-messages" -Force

Write-Host "`nOrdre final:"
Write-Host "1. D-01-dashboard"
Write-Host "2. D-02-header-menu"
Write-Host "3. D-03-classes"
Write-Host "4. D-04-students"
Write-Host "5. D-05-courses"
Write-Host "6. D-06-agendas-assignations"
Write-Host "7. D-07-messages"
Write-Host "`nTermine!"
