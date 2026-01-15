# Roadmap de Navigation - BlaizBot V1

> **Cartographie complète de la navigation dans l'application**

---

## � Arborescence Visuelle

```
blaizbot-wireframe/pages/
│
├── 00-accueil.md               # Page d'accueil (/)
├── 01-login.md                 # Authentification (/login)
├── 02-unauthorized.md          # Accès refusé
│
├── admin/
│   ├── 00-dashboard.md         # Dashboard administrateur
│   │
│   ├── header-menu/            # Modales globales (header)
│   │   ├── mon-profil.md       # 👤 Profil (2 onglets)
│   │   ├── parametres.md       # ⚙️  Paramètres
│   │   └── config-ia.md        # 🤖 Configuration IA (admin only)
│   │
│   ├── users/                  # 👥 Gestion utilisateurs
│   │   ├── liste.md            # Liste + tableau
│   │   ├── create.md           # Modale : Créer
│   │   └── edit.md             # Modale : Modifier
│   │
│   ├── classes/                # 🏫 Gestion classes
│   │   ├── liste.md            # Liste + tableau
│   │   ├── create.md           # Modale : Créer
│   │   └── edit.md             # Modale : Modifier
│   │
│   └── subjects/               # 📚 Gestion matières
│       ├── liste.md            # Liste + tableau + couleurs
│       ├── create.md           # Modale : Créer
│       └── edit.md             # Modale : Modifier
│
├── student/                    # 🎓 Espace Élève (à documenter)
│   └── ...
│
└── teacher/                    # 👨‍🏫 Espace Professeur
    ├── dashboard.md            # Dashboard professeur
    │
    ├── header-menu/            # Modales globales (header)
    │   ├── mon-profil.md       # 👤 Profil (2 onglets)
    │   └── parametres.md       # ⚙️  Paramètres
    │
    ├── classes/                # 🏫 Mes classes
    │   ├── liste.md            # Liste des classes assignées
    │   └── detail/             # Détail d'une classe
    │       └── [id].md         # Vue classe + élèves + activité IA
    │
    ├── students/               # 👥 Mes élèves
    │   ├── liste.md            # Liste des élèves (9 élèves, grille/liste)
    │   └── detail/             # Profil d'un élève
    │       └── [id].md         # Vue profil + stats + 3 onglets
    │
    ├── courses/                # 📚 Mes cours
    │   ├── liste.md            # Liste des cours (contenus pédagogiques)
    │   ├── new.md              # Création cours (2 onglets : Infos + Contenu IA)
    │   └── detail/             # Détail d'un cours
    │       ├── [id].md         # 2 onglets : Infos + Structure (chapitres → cartes)
    │       └── cards/          # Édition des cartes (4 types)
    │           ├── lesson/     # 📄 Carte Leçon
    │           │   └── [cardId].md  # Éditeur rich text + ressources
    │           ├── video/      # ▶️ Carte Vidéo
    │           │   └── [cardId].md  # YouTube/Vimeo/Upload + transcription
    │           ├── exercise/   # ✏️ Carte Exercice
    │           │   └── [cardId].md  # Questions ouvertes + correction Auto/Manuel
    │           └── quiz/       # ❓ Carte Quiz
    │               └── [cardId].md  # QCM/Vrai-Faux/Réponse courte + paramètres
    │
    ├── assignments/            # 📅 Agendas et Assignations
    │   └── liste.md            # Gestion des devoirs et calendrier
    │
    └── messages/               # 💬 Messages
        └── liste.md            # Messagerie professeur
```

---

## �📐 Logique d'Arborescence

### Convention de Nommage des Fichiers

**Pour les pages avec modales** :
```
dossier/
├── liste.md    → Page principale (liste/tableau)
├── create.md   → Modale de création
└── edit.md     → Modale d'édition
```

**Principes** :
- ✅ Fichiers séparés pour chaque modale
- ✅ `liste.md` = page uniquement (pas de contenu des modales)
- ✅ `create.md` et `edit.md` = documentation dédiée
- ✅ Liens croisés dans la section Navigation

---

## Structure

### Pages Publiques
- [00-accueil.md](00-accueil.md) - Page d'accueil (`/`)
- [01-login.md](01-login.md) - Authentification (`/login`)
- [02-unauthorized.md](02-unauthorized.md) - Accès refusé (`/unauthorized`)

---

### Espace Admin (`/admin`)

#### Dashboard
- [admin/00-dashboard.md](admin/00-dashboard.md) - Dashboard administrateur

#### Header Menu (Modales globales)
- [admin/header-menu/mon-profil.md](admin/header-menu/mon-profil.md) - Profil utilisateur (onglets : Informations + Sécurité)
- [admin/header-menu/parametres.md](admin/header-menu/parametres.md) - Paramètres (Notifications, Préférences, Assistant IA)
- [admin/header-menu/config-ia.md](admin/header-menu/config-ia.md) - Configuration IA (Clé API Gemini, admin only)

#### Gestion des Utilisateurs
- [admin/users/liste.md](admin/users/liste.md) - Liste des utilisateurs (tableau, recherche, filtres)
- [admin/users/create.md](admin/users/create.md) - Modale : Créer un utilisateur
- [admin/users/edit.md](admin/users/edit.md) - Modale : Modifier un utilisateur

#### Gestion des Classes
- [admin/classes/liste.md](admin/classes/liste.md) - Liste des classes
- [admin/classes/create.md](admin/classes/create.md) - Modale : Créer une classe
- [admin/classes/edit.md](admin/classes/edit.md) - Modale : Modifier une classe

#### Gestion des Matières
- [admin/subjects/liste.md](admin/subjects/liste.md) - Liste des matières (avec couleurs)
- [admin/subjects/create.md](admin/subjects/create.md) - Modale : Créer une matière
- [admin/subjects/edit.md](admin/subjects/edit.md) - Modale : Modifier une matière

---

### Espace Élève (`/student`)

*À compléter*

---

### Espace Professeur (`/teacher`)

#### Dashboard
- [teacher/dashboard.md](teacher/dashboard.md) - Dashboard professeur (Centre de Pilotage)

#### Header Menu (Modales globales)
- [teacher/header-menu/mon-profil.md](teacher/header-menu/mon-profil.md) - Profil professeur (onglets : Informations + Sécurité)
- [teacher/header-menu/parametres.md](teacher/header-menu/parametres.md) - Paramètres (Notifications, Préférences, Assistant IA)

#### Mes Classes
- [teacher/classes/liste.md](teacher/classes/liste.md) - Mes classes (2 classes assignées, statistiques, filtres)
- [teacher/classes/detail/[id].md](teacher/classes/detail/[id].md) - Détail classe (élèves, Score IA, Cockpit Pédagogique)

#### Mes Élèves
- [teacher/students/liste.md](teacher/students/liste.md) - Mes élèves (9 élèves, statistiques, filtres, vue grille/liste)
- [teacher/students/detail/[id].md](teacher/students/detail/[id].md) - Profil élève (4 stats, 3 onglets : Scores, Assignations, Activités IA)

#### Mes Cours
- [teacher/courses/liste.md](teacher/courses/liste.md) - Mes cours (contenus pédagogiques, performances)
- [teacher/courses/new.md](teacher/courses/new.md) - Nouveau cours (2 onglets : Informations + Contenu & Fichiers avec Assistant IA)
- [teacher/courses/detail/[id].md](teacher/courses/detail/[id].md) - Détail cours (2 onglets : Informations + Structure arborescente avec chapitres → cartes [Leçon/Vidéo/Exercice/Quiz])
- **Cartes pédagogiques (4 types)** :
  - [teacher/courses/detail/cards/lesson/[cardId].md](teacher/courses/detail/cards/lesson/[cardId].md) - 📄 Carte Leçon (éditeur rich text + ressources)
  - [teacher/courses/detail/cards/video/[cardId].md](teacher/courses/detail/cards/video/[cardId].md) - ▶️ Carte Vidéo (YouTube/Vimeo/Upload + transcription auto)
  - [teacher/courses/detail/cards/exercise/[cardId].md](teacher/courses/detail/cards/exercise/[cardId].md) - ✏️ Carte Exercice (questions ouvertes + correction IA/Manuelle)
  - [teacher/courses/detail/cards/quiz/[cardId].md](teacher/courses/detail/cards/quiz/[cardId].md) - ❓ Carte Quiz (QCM/Vrai-Faux/Réponse courte + scoring automatique)

#### Agendas et Assignations
- [teacher/assignments/liste.md](teacher/assignments/liste.md) - Gestion des devoirs et calendrier (à documenter)

#### Messages
- [teacher/messages/liste.md](teacher/messages/liste.md) - Messagerie professeur (à documenter)

---

## 🗺️ Flux de Navigation

### Connexion
```
00-accueil.md → 01-login.md → [Dashboard selon rôle]
                           ↓
                    02-unauthorized.md (si accès refusé)
```

### Admin - Gestion Utilisateurs
```
admin/00-dashboard.md
  ↓
admin/users/liste.md
  ├→ [+ Ajouter] → admin/users/create.md
  └→ [...] → Éditer → admin/users/edit.md
```

### Admin - Gestion Classes
```
admin/00-dashboard.md
  ↓
admin/classes/liste.md
  ├→ [+ Ajouter] → admin/classes/create.md
  └→ [...] → Modifier → admin/classes/edit.md
```

### Admin - Gestion Matières
```
admin/00-dashboard.md
  ↓
admin/subjects/liste.md
  ├→ [+ Ajouter] → admin/subjects/create.md
  └→ [...] → Modifier → admin/subjects/edit.md
```

---

## 📊 Statistiques de Documentation

| Section | Fichiers | Status |
|---------|----------|--------|
| **Pages publiques** | 3 | ✅ Complétées |
| **Admin - Dashboard** | 1 | ✅ Complété |
| **Admin - Header Menu** | 3 | ✅ Complété |
| **Admin - Utilisateurs** | 3 | ✅ Complété |
| **Admin - Classes** | 3 | ✅ Complété |
| **Admin - Matières** | 3 | ✅ Complété |
| **Élève** | - | ⏳ À faire |
| **Professeur** | - | ⏳ À faire |

**Total** : 16 fichiers documentés

---

*Dernière mise à jour : 13 décembre 2025*

