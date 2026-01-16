# Suivi de Documentation - BlaizBot Wireframe

> **Statut** : En cours | **Mise à jour** : 16 janvier 2026

---

## 📊 Progression Globale

| Espace | Documenté | Total | Progression | Priorité |
|--------|-----------|-------|-------------|----------|
| **Admin** | 14 | 14 | ✅ 100% | - |
| **Teacher** | 18 | 25 | 🟡 72% | Moyenne |
| **Student** | 1 | 20 | 🔴 5% | **Haute** |
| **Public** | 3 | 3 | ✅ 100% | - |

**Total** : 36/62 pages (58%)

---

## 🔍 Détail par Espace

### ✅ Pages Publiques (3/3 - 100%)

- [x] [00-accueil.md](../pages/00-accueil.md)
- [x] [01-login.md](../pages/01-login.md)
- [x] [02-unauthorized.md](../pages/02-unauthorized.md)

---

### ✅ Espace Admin (14/14 - 100%)

#### Dashboard
- [x] [admin/00-dashboard.md](../pages/admin/00-dashboard.md)

#### Header Menu
- [x] [admin/header-menu/mon-profil.md](../pages/admin/header-menu/mon-profil.md)
- [x] [admin/header-menu/parametres.md](../pages/admin/header-menu/parametres.md)
- [x] [admin/header-menu/config-ia.md](../pages/admin/header-menu/config-ia.md)

#### Gestion Utilisateurs
- [x] [admin/users/liste.md](../pages/admin/users/liste.md)
- [x] [admin/users/create.md](../pages/admin/users/create.md)
- [x] [admin/users/edit.md](../pages/admin/users/edit.md)

#### Gestion Classes
- [x] [admin/classes/liste.md](../pages/admin/classes/liste.md)
- [x] [admin/classes/create.md](../pages/admin/classes/create.md)
- [x] [admin/classes/edit.md](../pages/admin/classes/edit.md)

#### Gestion Matières
- [x] [admin/subjects/liste.md](../pages/admin/subjects/liste.md)
- [x] [admin/subjects/create.md](../pages/admin/subjects/create.md)
- [x] [admin/subjects/edit.md](../pages/admin/subjects/edit.md)

#### Statistiques
- [x] [admin/stats/overview.md](../pages/admin/stats/overview.md)

---

### 🟡 Espace Professeur (18/25 - 72%)

#### Dashboard
- [x] [teacher/dashboard.md](../pages/teacher/dashboard.md)

#### Header Menu
- [x] [teacher/header-menu/mon-profil.md](../pages/teacher/header-menu/mon-profil.md)
- [x] [teacher/header-menu/parametres.md](../pages/teacher/header-menu/parametres.md)

#### Mes Classes
- [x] [teacher/classes/liste.md](../pages/teacher/classes/liste.md)
- [x] [teacher/classes/detail/[id].md](../pages/teacher/classes/detail/[id].md)

#### Mes Élèves
- [x] [teacher/students/liste.md](../pages/teacher/students/liste.md)
- [x] [teacher/students/detail/[id].md](../pages/teacher/students/detail/[id].md)
- [x] [teacher/students/detail/courses/[courseId].md](../pages/teacher/students/detail/courses/[courseId].md)

#### Mes Cours
- [x] [teacher/courses/liste.md](../pages/teacher/courses/liste.md)
- [x] [teacher/courses/new.md](../pages/teacher/courses/new.md)
- [x] [teacher/courses/detail/[id].md](../pages/teacher/courses/detail/[id].md)
- [x] [teacher/courses/detail/edit.md](../pages/teacher/courses/detail/edit.md)

#### Cartes de Cours
- [x] [teacher/courses/detail/cards/lesson/[cardId].md](../pages/teacher/courses/detail/cards/lesson/[cardId].md)
- [x] [teacher/courses/detail/cards/video/[cardId].md](../pages/teacher/courses/detail/cards/video/[cardId].md)
- [x] [teacher/courses/detail/cards/exercise/[cardId].md](../pages/teacher/courses/detail/cards/exercise/[cardId].md)
- [x] [teacher/courses/detail/cards/quiz/[cardId].md](../pages/teacher/courses/detail/cards/quiz/[cardId].md)

#### Agendas et Assignations (⚠️ À faire)
- [ ] [teacher/agendas-assignations/liste.md](../pages/teacher/agendas-assignations/liste.md)
- [ ] teacher/agendas-assignations/create-assignment.md
- [ ] teacher/agendas-assignations/edit-assignment.md
- [ ] teacher/agendas-assignations/create-event.md
- [ ] teacher/agendas-assignations/detail/[id].md

#### Messages (⚠️ À faire)
- [x] [teacher/messages/page.md](../pages/teacher/messages/page.md)
- [ ] teacher/messages/new.md

---

### 🔴 Espace Élève (1/20 - 5%) - PRIORITÉ HAUTE

#### Dashboard (⚠️ À faire)
- [ ] student/dashboard.md

#### Mes Cours (⚠️ À faire)
- [ ] student/courses/liste.md
- [ ] student/courses/detail/[id].md
- [ ] student/courses/detail/chapter/[chapterId].md
- [ ] student/courses/detail/cards/lesson/[cardId].md
- [ ] student/courses/detail/cards/video/[cardId].md
- [ ] student/courses/detail/cards/exercise/[cardId].md
- [ ] student/courses/detail/cards/quiz/[cardId].md

#### Agenda (⚠️ À faire)
- [ ] student/agenda/page.md
- [ ] student/agenda/detail/[assignmentId].md

#### Révisions (⚠️ À faire)
- [ ] student/revisions/page.md
- [ ] student/revisions/session/[sessionId].md

#### Messages (⚠️ À faire)
- [ ] student/messages/page.md
- [ ] student/messages/new.md

#### Assistant IA (⚠️ À faire)
- [x] [student/ai/chat.md](../pages/student/ai/chat.md)

#### Coach (⚠️ À faire)
- [ ] student/coach/page.md
- [ ] student/coach/goal/[goalId].md

---

## 🎯 Priorités de Documentation

### 🔴 Sprint 1 : Student Dashboard & Cours (5 pages)
1. **student/dashboard.md** - Page d'accueil élève
2. **student/courses/liste.md** - Liste des cours
3. **student/courses/detail/[id].md** - Détail cours
4. **student/courses/detail/chapter/[chapterId].md** - Chapitre
5. **student/courses/detail/cards/lesson/[cardId].md** - Carte leçon

### 🟡 Sprint 2 : Student Agenda & Révisions (4 pages)
6. **student/agenda/page.md** - Calendrier
7. **student/agenda/detail/[assignmentId].md** - Détail devoir
8. **student/revisions/page.md** - Planning révisions
9. **student/revisions/session/[sessionId].md** - Session

### 🟢 Sprint 3 : Student Messages & IA (5 pages)
10. **student/messages/page.md** - Messagerie
11. **student/messages/new.md** - Nouveau message
12. **student/coach/page.md** - Coach IA
13. **student/coach/goal/[goalId].md** - Objectif
14. student/courses/detail/cards/video/[cardId].md

### 🔵 Sprint 4 : Teacher Agendas (5 pages)
15. **teacher/agendas-assignations/liste.md**
16. teacher/agendas-assignations/create-assignment.md
17. teacher/agendas-assignations/edit-assignment.md
18. teacher/agendas-assignations/create-event.md
19. teacher/messages/new.md

### 🟣 Sprint 5 : Exercices & Quiz Student (6 pages)
20. student/courses/detail/cards/exercise/[cardId].md
21. student/courses/detail/cards/quiz/[cardId].md
22. teacher/agendas-assignations/detail/[id].md

---

## 📝 Template de Suivi

Quand une page est documentée, mettre à jour :
1. Cocher [ ] → [x] dans cette liste
2. Incrémenter le compteur global
3. Mettre à jour la date en haut
4. Commit : `docs(wireframe): add [page-name] documentation`

---

## 🛠 Commandes Utiles

### Générer une page
```
@WireframeDoc [capture] Description de la page
```

### Vérifier progression
```bash
# Compter fichiers .md dans pages/
find pages -name "*.md" | wc -l

# Ou en PowerShell
(Get-ChildItem -Path pages -Recurse -Filter "*.md").Count
```

### Mettre à jour roadmap
```
@WireframeDoc Synchronise NAVIGATION-ROADMAP.md
avec les nouveaux fichiers student/
```

---

## 📅 Historique

| Date | Action | Pages ajoutées |
|------|--------|----------------|
| 16 janv 2026 | Création tracker | - |
| 16 janv 2026 | Agent @WireframeDoc créé | - |

---

## 🎓 Objectif Final

**62 pages documentées** avec :
- ✅ En-tête complet
- ✅ Aperçu visuel ASCII
- ✅ Composants UI
- ✅ API endpoints
- ✅ Types TypeScript
- ✅ Comportements
- ✅ Roadmap synchronisée

**ETA** : Fin janvier 2026 (si 5 pages/jour)
