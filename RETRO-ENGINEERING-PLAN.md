# 📋 Plan de Rétro-Ingénierie - BlaizBot V1 → Documentation Wireframe

> **Objectif** : Documenter chaque page de l'application BlaizBot-V1 en Markdown avec le visuel et les dépendances nécessaires à sa création.

---

## 🎯 Structure de Sortie

```
blaizbot-wireframe/
└── pages/
    ├── _TEMPLATE.md              # Template de documentation
    ├── 00-accueil.md             # Page d'accueil (/)
    ├── 01-login.md               # Page de connexion
    ├── 02-unauthorized.md        # Page accès refusé
    │
    ├── student/                  # Espace Élève
    │   ├── 00-dashboard.md       # Tableau de bord élève
    │   ├── 01-courses.md         # Liste des cours
    │   ├── 02-course-detail.md   # Détail d'un cours [id]
    │   ├── 03-revisions.md       # Liste des révisions
    │   ├── 04-revision-detail.md # Détail révision [id]
    │   ├── 05-revision-create.md # Créer une révision
    │   ├── 06-revision-cards.md  # Session de révision (cartes)
    │   ├── 07-ai-assistant.md    # Assistant IA
    │   ├── 08-coach.md           # Coach IA
    │   ├── 09-agenda.md          # Agenda
    │   └── 10-messages.md        # Messagerie
    │
    ├── teacher/                  # Espace Professeur
    │   ├── 00-dashboard.md       # Tableau de bord prof
    │   ├── 01-courses.md         # Liste des cours
    │   ├── 02-course-detail.md   # Détail d'un cours [id]
    │   ├── 03-course-new.md      # Créer un cours
    │   ├── 04-course-edit.md     # Éditer un cours [id]/edit
    │   ├── 05-classes.md         # Liste des classes
    │   ├── 06-class-detail.md    # Détail d'une classe [id]
    │   ├── 07-students.md        # Liste des élèves
    │   ├── 08-student-detail.md  # Détail d'un élève [id]
    │   ├── 09-student-courses.md # Cours d'un élève [id]/courses
    │   ├── 10-assignments.md     # Devoirs
    │   └── 11-messages.md        # Messagerie
    │
    └── admin/                    # Espace Admin
        ├── 00-dashboard.md       # Tableau de bord admin
        ├── 01-users.md           # Gestion utilisateurs
        ├── 02-classes.md         # Gestion classes
        └── 03-subjects.md        # Gestion matières
```

---

## 📝 Format de Chaque Fichier

Chaque fichier de documentation suit ce format :

```markdown
# [Nom de la Page]

> Route : `/chemin/de/la/page`
> Rôle(s) : STUDENT | TEACHER | ADMIN

---

## 📸 Aperçu Visuel (Markdown)

[Reproduction de l'interface en ASCII/Markdown]

---

## 🧩 Composants Utilisés

| Composant | Chemin | Description |
|-----------|--------|-------------|
| ... | ... | ... |

---

## 📦 Dépendances

### Packages NPM
- package1
- package2

### Composants UI (shadcn/ui)
- Button
- Card
- ...

### Composants Custom
- Sidebar
- Header
- ...

---

## 🔗 API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/... | ... |

---

## 💾 Données (Types)

### Props de la page
[Interface TypeScript]

### Données affichées
[Types des données]

---

## 🔐 Authentification & Autorisations

- Middleware requis : ...
- Rôles autorisés : ...

---

## 📋 Checklist de Recréation

- [ ] Layout principal
- [ ] Header avec navigation
- [ ] Sidebar
- [ ] Contenu principal
- [ ] États de chargement
- [ ] Gestion des erreurs
- [ ] Responsive design
```

---

## 🗓️ Plan d'Exécution

### Phase 1 : Pages Communes (3 pages)
| # | Page | Fichier | Priorité |
|---|------|---------|----------|
| 1.1 | Accueil | `00-accueil.md` | 🔴 Haute |
| 1.2 | Login | `01-login.md` | 🔴 Haute |
| 1.3 | Unauthorized | `02-unauthorized.md` | 🟡 Moyenne |

### Phase 2 : Espace Élève (11 pages)
| # | Page | Fichier | Priorité |
|---|------|---------|----------|
| 2.1 | Dashboard Élève | `student/00-dashboard.md` | 🔴 Haute |
| 2.2 | Liste Cours | `student/01-courses.md` | 🔴 Haute |
| 2.3 | Détail Cours | `student/02-course-detail.md` | 🔴 Haute |
| 2.4 | Liste Révisions | `student/03-revisions.md` | 🔴 Haute |
| 2.5 | Détail Révision | `student/04-revision-detail.md` | 🟡 Moyenne |
| 2.6 | Créer Révision | `student/05-revision-create.md` | 🟡 Moyenne |
| 2.7 | Session Cartes | `student/06-revision-cards.md` | 🟡 Moyenne |
| 2.8 | Assistant IA | `student/07-ai-assistant.md` | 🔴 Haute |
| 2.9 | Coach IA | `student/08-coach.md` | 🟡 Moyenne |
| 2.10 | Agenda | `student/09-agenda.md` | 🟢 Basse |
| 2.11 | Messages | `student/10-messages.md` | 🟢 Basse |

### Phase 3 : Espace Professeur (12 pages)
| # | Page | Fichier | Priorité |
|---|------|---------|----------|
| 3.1 | Dashboard Prof | `teacher/00-dashboard.md` | 🔴 Haute |
| 3.2 | Liste Cours | `teacher/01-courses.md` | 🔴 Haute |
| 3.3 | Détail Cours | `teacher/02-course-detail.md` | 🔴 Haute |
| 3.4 | Nouveau Cours | `teacher/03-course-new.md` | 🔴 Haute |
| 3.5 | Éditer Cours | `teacher/04-course-edit.md` | 🟡 Moyenne |
| 3.6 | Liste Classes | `teacher/05-classes.md` | 🔴 Haute |
| 3.7 | Détail Classe | `teacher/06-class-detail.md` | 🟡 Moyenne |
| 3.8 | Liste Élèves | `teacher/07-students.md` | 🔴 Haute |
| 3.9 | Détail Élève | `teacher/08-student-detail.md` | 🟡 Moyenne |
| 3.10 | Cours d'un Élève | `teacher/09-student-courses.md` | 🟢 Basse |
| 3.11 | Devoirs | `teacher/10-assignments.md` | 🟡 Moyenne |
| 3.12 | Messages | `teacher/11-messages.md` | 🟢 Basse |

### Phase 4 : Espace Admin (4 pages)
| # | Page | Fichier | Priorité |
|---|------|---------|----------|
| 4.1 | Dashboard Admin | `admin/00-dashboard.md` | 🔴 Haute |
| 4.2 | Gestion Users | `admin/01-users.md` | 🔴 Haute |
| 4.3 | Gestion Classes | `admin/02-classes.md` | 🟡 Moyenne |
| 4.4 | Gestion Matières | `admin/03-subjects.md` | 🟡 Moyenne |

---

## 📊 Récapitulatif

| Phase | Pages | Priorité Haute | Priorité Moyenne | Priorité Basse |
|-------|-------|----------------|------------------|----------------|
| 1. Communes | 3 | 2 | 1 | 0 |
| 2. Élève | 11 | 5 | 4 | 2 |
| 3. Professeur | 12 | 5 | 4 | 3 |
| 4. Admin | 4 | 2 | 2 | 0 |
| **Total** | **30** | **14** | **11** | **5** |

---

## 🔄 Workflow par Page

```
Pour chaque page :

1. 📖 LIRE le fichier page.tsx dans BlaizBot-V1
2. 🔍 IDENTIFIER les composants importés
3. 📦 LISTER les dépendances (packages, UI, custom)
4. 🌐 RELEVER les appels API
5. 📝 REPRODUIRE le visuel en Markdown ASCII
6. ✅ CRÉER le fichier de documentation
```

---

## 🚀 Commandes de Démarrage

```bash
# Créer la structure de dossiers
mkdir -p pages/student pages/teacher pages/admin

# Créer le template
touch pages/_TEMPLATE.md
```

---

## ✅ Prochaine Étape

**Action immédiate** : Créer la structure de dossiers et le template `_TEMPLATE.md`

---

*Document créé le 15 janvier 2026*
*Source : BlaizBot-V1 (application Next.js)*
