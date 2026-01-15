# Agendas et Assignations

> **Chemin de navigation** : Login → Dashboard Teacher → **Agendas et Assignations**  
> **Route** : `/teacher/agendas-assignations`  
> **Rôle** : TEACHER  
> **Composant source** : `src/app/(dashboard)/teacher/agendas-assignations/page.tsx`

---

## 📍 Parcours Utilisateur

```
1. Pages publiques
   └── 01-login.md

2. Authentification réussie (Professeur)
   └── teacher/dashboard.md

3. Sidebar → Agendas et Assignations
   └── VOUS ÊTES ICI
```

---

## 📸 Aperçu Visuel - Agendas et Assignations

### Onglet : Vue Calendrier

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Dashboard                           🔍 Rechercher...    🔔  [MD] Marc DUPONT │
├────────────┬─────────────────────────────────────────────────────────────────┤
│            │                                                                 │
│ 🏠 Dashb.  │  Agendas et Assignations      📅 Calendrier  📋 Liste  🔄      │
│            │  Gérez vos assignations de cours et exercices  + Nouvelle      │
│ 🏫 Mes     │                                                  assignation   │
│   classes  │  🔽 Filtres                                                     │
│            │  ┌────────────────────────────────────────────────────────────┐│
│ 👥 Mes     │  │ Matières ▼  Cours ▼  Classes ▼  Priorité ▼  📅 Période ▼ ││
│   élèves   │  └────────────────────────────────────────────────────────────┘│
│            │                                                                 │
│ 📚 Mes     │  Vue Calendrier                          4 assignations        │
│   cours    │  Jan à Avr   12-01                                              │
│            │                                                                 │
│ 📅 Agendas │  Précédent        Janvier 2026         Suivant                 │
│   et       │                                                                 │
│   Assigna. │  Mois   Semaine   Jour   Agenda                                │
│            │  ────                                                           │
│ 💬 Messag. │  ┌────────┬────────┬────────┬────────┬────────┬────────┬─────┐│
│            │  │  Lun.  │  Mar.  │  Mer.  │  Jeu.  │  Ven.  │  Sam.  │ Dim ││
│            │  ├────────┼────────┼────────┼────────┼────────┼────────┼─────┤│
│            │  │   29   │   30   │   31   │   01   │   02   │   03   │  04 ││
│            │  ├────────┼────────┼────────┼────────┼────────┼────────┼─────┤│
│            │  │   05   │   06   │   07   │   08   │   09   │   10   │  11 ││
│            │  ├────────┼────────┼────────┼────────┼────────┼────────┼─────┤│
│            │  │   12   │   13   │   14   │   15   │   16   │   17   │  18 ││
│            │  ├────────┼────────┼────────┼────────┼────────┼────────┼─────┤│
│            │  │   19   │   20   │   21   │   22   │   23   │   24   │  25 ││
│            │  │        │        │        │  🔵 La │  🔵 La │        │     ││
│            │  │        │        │        │  photo.│  photo.│        │     ││
│            │  │        │        │        │  🔵 La │  🔵 La │        │     ││
│            │  │        │        │        │  photo.│        │        │     ││
│            │  │        │        │        │  🔵 La │        │        │     ││
│            │  │        │        │        │  photo.│        │        │     ││
│            │  ├────────┼────────┼────────┼────────┼────────┼────────┼─────┤│
│            │  │   26   │   27   │   28   │   29   │   30   │   31   │  01 ││
│            │  │        │        │        │        │  🔵 La │        │     ││
│            │  │        │        │        │        │  photo.│        │     ││
│            │  └────────┴────────┴────────┴────────┴────────┴────────┴─────┘│
│            │                                                                 │
└────────────┴─────────────────────────────────────────────────────────────────┘
```

### Onglet : Vue Liste

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Dashboard                           🔍 Rechercher...    🔔  [MD] Marc DUPONT │
├────────────┬─────────────────────────────────────────────────────────────────┤
│            │  Agendas et Assignations      📅 Calendrier  📋 Liste  🔄      │
│            │  Gérez vos assignations de cours et exercices  + Nouvelle      │
│            │                                                  assignation   │
│            │  🔽 Filtres                                                     │
│            │  ┌────────────────────────────────────────────────────────────┐│
│            │  │ Matières ▼  Cours ▼  Classes ▼  Priorité ▼  📅 Période ▼ ││
│            │  └────────────────────────────────────────────────────────────┘│
│            │                                                                 │
│            │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────┐│
│            │  │ ☑ 4          │ │ ⚠ 0          │ │ 🕐 0         │ │ 📅 4   ││
│            │  │ Total        │ │ En retard    │ │ Aujourd'hui  │ │ À venir││
│            │  └──────────────┘ └──────────────┘ └──────────────┘ └────────┘│
│            │                                                                 │
│            │  📅 vendredi 23 janvier                        3 assignations  │
│            │                                                                 │
│            │  ┌───────────────────────────────────────────────────────────┐ │
│            │  │ 📚  La photosynthèse                       ⏰ 23 janv.    │ │
│            │  │     📄 La photosynthèse  [S.T.N]            🟠 Moyenne    │ │
│            │  │     👤 Emma DURAND                                     ... │ │
│            │  └───────────────────────────────────────────────────────────┘ │
│            │  ┌───────────────────────────────────────────────────────────┐ │
│            │  │ 📚  La photosynthèse                       ⏰ 23 janv.    │ │
│            │  │     📄 La photosynthèse  [S.T.N]            🟠 Moyenne    │ │
│            │  │     👤 Baptiste CURRY                                  ... │ │
│            │  └───────────────────────────────────────────────────────────┘ │
│            │  ┌───────────────────────────────────────────────────────────┐ │
│            │  │ 📚  La photosynthèse                       ⏰ 23 janv.    │ │
│            │  │     📄 La photosynthèse  [S.T.N]            🟠 Moyenne    │ │
│            │  │     👤 Lucas MARTIN                                    ... │ │
│            │  └───────────────────────────────────────────────────────────┘ │
│            │                                                                 │
│            │  📅 samedi 31 janvier                          1 assignation   │
│            │                                                                 │
│            │  ┌───────────────────────────────────────────────────────────┐ │
│            │  │ 📚  La photosynthèse                       ⏰ 31 janv.    │ │
│            │  │     📄 La photosynthèse  [S.T.N]            🟢 Basse      │ │
│            │  │     👤 Lucas MARTIN                                    ... │ │
│            │  └───────────────────────────────────────────────────────────┘ │
│            │                                                                 │
└────────────┴─────────────────────────────────────────────────────────────────┘
```

---

## 🧩 Composants Utilisés

| Composant | Chemin | Description |
|-----------|--------|-------------|
| `DashboardShell` | `@/components/layout/DashboardShell` | Layout avec sidebar |
| `Header` | `@/components/layout/Header` | Barre supérieure |
| `Sidebar` | `@/components/layout/Sidebar` | Navigation professeur |
| `Button` | `@/components/ui/button` | Boutons Nouvelle assignation, Actualiser |
| `Tabs` | `@/components/ui/tabs` | Onglets (Calendrier, Liste) |
| `Calendar` | `@/components/ui/calendar` | Grille calendrier mensuelle |
| `Select` | `@/components/ui/select` | Filtres (Matières, Cours, Classes, Priorité) |
| `DateRangePicker` | `@/components/ui/date-range-picker` | Filtre Période |
| `Card` | `@/components/ui/card` | Cartes stats (Total, En retard, Aujourd'hui, À venir) |
| `Badge` | `@/components/ui/badge` | Badges priorité, matière |
| `DropdownMenu` | `@/components/ui/dropdown-menu` | Menu actions (•••) |
| `Collapsible` | `@/components/ui/collapsible` | Section filtres repliable |

---

## 📊 Structure de la Page

### En-tête

| Élément | Description |
|---------|-------------|
| **Titre** | "Agendas et Assignations" |
| **Sous-titre** | "Gérez vos assignations de cours et exercices" |
| **Toggle Vues** | Calendrier (📅) / Liste (📋) - 2 boutons |
| **Bouton Actualiser** | Icône 🔄 pour rafraîchir |
| **Bouton + Nouvelle assignation** | Ouvre modal de création |

### Filtres Communs (Repliables)

| Filtre | Type | Description |
|--------|------|-------------|
| **Matières** | Multi-select | Filtrage par matière(s) avec pastilles couleur |
| **Cours** | Multi-select | Filtrage par cours (dépend des matières sélectionnées) |
| **Classes** | Multi-select | Filtrage par classe(s) |
| **Priorité** | Single-select | Options : Toutes / Haute / Moyenne / Basse |
| **Période** | Date range | Sélection de plage de dates |

**Comportement** :
- Section repliable avec 🔽 Filtres
- Filtres cumulatifs (ET logique)
- Bouton "Réinitialiser" si au moins 1 filtre actif
- Filtres persistent lors du changement d'onglet

---

## 📅 ONGLET 1 : Vue Calendrier

### Objectif
Vision **temporelle** des assignations sur un calendrier interactif.

### Sections

#### 1. Controls Temporels & Navigation

| Section | Contenu |
|---------|---------|
| **Boutons Quick Filter** | "Jan à Avr" (🟢 actif) • "12-01" (🟢) |
| **Navigation Mois** | ← Précédent • **Janvier 2026** • Suivant → |
| **Compteur** | "4 assignations" (nombre selon filtres actifs) |
| **Modes Vue** | **Mois** (actif) / Semaine / Jour / Agenda |

**Comportement** :
- Boutons "Jan à Avr" et "12-01" : raccourcis temporels (style vert)
- Navigation par flèches pour changer de mois
- 4 modes de visualisation calendrier
- Compteur mis à jour dynamiquement

#### 2. Grille Calendrier (Mode Mois)

| Élément | Description |
|---------|-------------|
| **Header** | Jours de la semaine (Lun. à Dim.) |
| **Cellules** | Numéros de jour + assignations (barres bleues) |
| **Jours autres mois** | Numéros grisés (29, 30, 31 décembre / 01 février) |

**Affichage des Assignations** :
- Barres horizontales bleues : `bg-blue-500 text-white text-xs px-2 py-1 rounded`
- Texte tronqué : "La photosynthèse" → "La photo..."
- Si plusieurs le même jour : empilées verticalement (max 3 affichées)
- Si > 3 : "+ X autres" cliquable

**Exemple Screenshot** :
```
22 janvier : 
  🔵 La photosynthèse
  🔵 La photosynthèse
  🔵 La photosynthèse

23 janvier :
  🔵 La photosynthèse

30 janvier :
  🔵 La photosynthèse
```

#### 3. Interactions

| Action | Résultat |
|--------|----------|
| **Clic sur barre bleue** | Ouvre modal détail assignation |
| **Navigation mois** | Recharge assignations du nouveau mois |
| **Changement mode vue** | Passe de Mois → Semaine / Jour / Agenda |
| **Quick filters temporels** | Filtre la période affichée |

---

## 📋 ONGLET 2 : Vue Liste

### Objectif
Vision **détaillée** avec statistiques globales et groupement chronologique.

### Sections

#### 1. Cartes de Statistiques (Top)

```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ ☑ 4          │ │ ⚠ 0          │ │ 🕐 0         │ │ 📅 4         │
│ Total        │ │ En retard    │ │ Aujourd'hui  │ │ À venir      │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

| Carte | Icône | Description |
|-------|-------|-------------|
| **Total** | ☑ (bleu) | Nombre total d'assignations (selon filtres) |
| **En retard** | ⚠ (rouge) | Assignations passées non complétées |
| **Aujourd'hui** | 🕐 (orange) | Assignations dues aujourd'hui |
| **À venir** | 📅 (vert) | Assignations à venir |

**Layout** :
- Grid 4 colonnes (grid-cols-4)
- Bordure + ombre légère
- Responsive : grid-cols-2 en mobile

#### 2. Liste Groupée par Date

**Structure** :
```
📅 vendredi 23 janvier                        3 assignations
├─ Carte Assignation 1 (Emma DURAND)
├─ Carte Assignation 2 (Baptiste CURRY)
└─ Carte Assignation 3 (Lucas MARTIN)

📅 samedi 31 janvier                          1 assignation
└─ Carte Assignation 4 (Lucas MARTIN)
```

**Header de Groupe** :
- Fond : `bg-gray-50`
- Layout : `flex items-center justify-between px-4 py-2`
- Gauche : 📅 Date formatée ("vendredi 23 janvier")
- Droite : Compteur ("3 assignations")

**Carte Assignation** :
```
┌─────────────────────────────────────────────────────────────┐
│ 📚  La photosynthèse                       ⏰ 23 janv.      │
│     📄 La photosynthèse  [S.T.N]            🟠 Moyenne      │
│     👤 Emma DURAND                                      ... │
└─────────────────────────────────────────────────────────────┘
```

| Section | Contenu |
|---------|---------|
| **Icône type** | 📚 (Lesson) / ▶️ (Video) / ✏️ (Exercise) / ❓ (Quiz) |
| **Titre** | "La photosynthèse" |
| **Ligne 2** | Icône cours 📄 + Nom cours + Badge matière [S.T.N] |
| **Ligne 3** | Icône élève 👤 + Nom(s) élève(s) assigné(s) |
| **Droite haut** | Icône ⏰ + Date échéance (23 janv.) |
| **Droite milieu** | Badge priorité : 🟠 Moyenne / 🔴 Haute / 🟢 Basse |
| **Droite bas** | Menu ••• (Modifier, Dupliquer, Supprimer) |

**Comportement** :
- Groupement automatique par date
- Tri chronologique ascendant
- Clic sur carte → modal détail
- Scroll infini si > 50 assignations

---

## 🎯 Interactions Communes

### Nouvelle Assignation (Modal)

**Déclencheur** : Bouton "+ Nouvelle assignation" (header)

**Structure Modal** :
```
┌────────────────────────────────────────────────────┐
│ ✖  Nouvelle Assignation                           │
├────────────────────────────────────────────────────┤
│                                                    │
│  Titre de l'assignation *                         │
│  Ex: Devoir sur la photosynthèse                  │
│                                                    │
│  Matière *           Cours *                      │
│  Biologie ▼          La photosynthèse ▼           │
│                                                    │
│  Type *              Classes *                    │
│  Leçon ▼             Seconde A, Seconde B ▼       │
│                                                    │
│  Date d'échéance *   Priorité *                   │
│  📅 23/01/2026       Moyenne ▼                    │
│                                                    │
│  Description                                       │
│  [Éditeur rich text]                              │
│                                                    │
│  Fichiers joints                                   │
│  [Zone drag & drop]                               │
│                                                    │
├────────────────────────────────────────────────────┤
│               [Annuler]  [Créer l'assignation]    │
└────────────────────────────────────────────────────┘
```

**Validation** :
- Titre obligatoire
- Matière, Cours, Type, Classes, Date obligatoires
- Date ≥ aujourd'hui

### Détail Assignation (Modal)

**Déclencheur** : Clic sur barre calendrier OU carte liste

```
┌────────────────────────────────────────────────────┐
│ ✖  📚 La photosynthèse                            │
│     Biologie - La photosynthèse                   │
├────────────────────────────────────────────────────┤
│                                                    │
│  Classes assignées                                 │
│  [Seconde A] 28 élèves                            │
│                                                    │
│  📅 Échéance : 23 janvier 2026                    │
│  🟠 Priorité : Moyenne                            │
│                                                    │
│  Description                                       │
│  Étudier le processus de photosynthèse et         │
│  remplir le QCM.                                  │
│                                                    │
│  Fichiers joints                                   │
│  📎 cours-photosynthese.pdf                       │
│                                                    │
│  📊 Statistiques                                  │
│  ├─ Soumis : 12 / 28 (43%)                       │
│  ├─ Score moyen : —                              │
│  └─ Temps moyen : —                              │
│                                                    │
├────────────────────────────────────────────────────┤
│  [Modifier]  [Supprimer]  [Voir résultats]       │
└────────────────────────────────────────────────────┘
```

### Changement d'Onglet

**Comportement** :
- Transition fade (300ms)
- Filtres conservés entre onglets
- Compteur assignations mis à jour
- Style actif : `bg-gray-900 text-white` / Inactif : `bg-white text-gray-700`

---

## 📦 Données Mock

```javascript
// mockData.js
export const mockAssignments = [
  {
    id: "assign-1",
    title: "La photosynthèse",
    type: "LESSON",
    course: {
      id: "bio-101",
      name: "La photosynthèse",
      subject: { name: "S.T.N", color: "#3b82f6" } // Bleu
    },
    classes: [{ id: "class-1", name: "Seconde A", students: 28 }],
    assignedTo: [
      { id: "student-1", name: "Emma DURAND" }
    ],
    dueDate: new Date("2026-01-22"),
    priority: "HIGH",
    status: "PENDING",
    description: "Étudier le processus de photosynthèse et remplir le QCM.",
    attachments: ["cours-photosynthese.pdf"],
    stats: { submitted: 12, total: 28, averageScore: null }
  },
  {
    id: "assign-2",
    title: "La photosynthèse",
    type: "EXERCISE",
    course: {
      id: "bio-101",
      name: "La photosynthèse",
      subject: { name: "S.T.N", color: "#3b82f6" }
    },
    classes: [{ id: "class-2", name: "Seconde B", students: 25 }],
    assignedTo: [
      { id: "student-2", name: "Baptiste CURRY" }
    ],
    dueDate: new Date("2026-01-23"),
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    stats: { submitted: 8, total: 25, averageScore: 14.5 }
  },
  {
    id: "assign-3",
    title: "La photosynthèse",
    type: "QUIZ",
    course: {
      id: "bio-101",
      name: "La photosynthèse",
      subject: { name: "S.T.N", color: "#3b82f6" }
    },
    classes: [{ id: "class-1", name: "Seconde A", students: 28 }],
    assignedTo: [
      { id: "student-3", name: "Lucas MARTIN" }
    ],
    dueDate: new Date("2026-01-30"),
    priority: "LOW",
    status: "PENDING",
    stats: { submitted: 0, total: 28 }
  }
];
```

---

## 🎬 Scénarios Utilisateur

### Scénario 1 : Créer une assignation

```
1. Professeur clique "+ Nouvelle assignation"
2. Modal s'ouvre
3. Remplit :
   - Titre : "Devoir photosynthèse"
   - Matière : Biologie
   - Cours : La photosynthèse
   - Type : Exercise
   - Classes : Seconde A
   - Date : 25/01/2026
   - Priorité : Moyenne
4. Clic "Créer l'assignation"
5. Toast success
6. Assignation apparaît dans calendrier (25 janvier) ET liste
```

### Scénario 2 : Filtrer par matière et classe

```
[Vue Calendrier]
1. Professeur ouvre section Filtres (🔽)
2. Sélectionne "Biologie" dans Matières
3. Sélectionne "Seconde A" dans Classes
4. Calendrier se met à jour : affiche seulement 2 assignations
5. Compteur : "2 assignations"

[Bascule vers Vue Liste]
6. Clic sur bouton "Liste"
7. Vue Liste affiche :
   - Cartes stats : Total = 2, En retard = 0, etc.
   - 2 assignations filtrées
8. Filtres conservés
```

### Scénario 3 : Consulter détails depuis calendrier

```
1. Professeur voit barre bleue "La photosynthèse" le 22 janvier
2. Clic sur la barre
3. Modal détail s'ouvre :
   - Type : 📚 Leçon
   - Cours : Biologie - La photosynthèse
   - Classe : Seconde A (28 élèves)
   - Échéance : 22 janvier 2026
   - Priorité : Haute
   - Stats : 12/28 soumis (43%)
4. Options : Modifier, Supprimer, Voir résultats
```

### Scénario 4 : Basculer entre Calendrier et Liste

```
[Depuis Calendrier]
1. Professeur a filtré "Biologie"
2. Voit 4 barres dans calendrier
3. Clic "Liste"
4. Transition fade 300ms
5. Vue Liste affiche :
   - 4 cartes stats (Total = 4)
   - Groupes : vendredi 23 janvier (3) + samedi 31 janvier (1)
   - Filtre "Biologie" conservé
   
[Retour Calendrier]
6. Clic "Calendrier"
7. Revient au mois actuel avec filtres conservés
```

---

## ⚠️ États & Feedback

### État Vide (Aucune assignation)

```
┌─────────────────────────────────────────────┐
│                                             │
│            📅                               │
│    Aucune assignation trouvée               │
│                                             │
│    Créez votre première assignation        │
│    pour commencer                          │
│                                             │
│    [+ Nouvelle assignation]                │
│                                             │
└─────────────────────────────────────────────┘
```

### Filtres Actifs (Aucun résultat)

```
┌─────────────────────────────────────────────┐
│                                             │
│            🔍                               │
│    Aucune assignation ne correspond        │
│    aux filtres sélectionnés                │
│                                             │
│    [Réinitialiser les filtres]            │
│                                             │
└─────────────────────────────────────────────┘
```

### Chargement

- **Calendrier** : Skeleton grille 7×5 avec shimmer
- **Liste** : Skeleton cartes stats + cartes assignations
- **Filtres** : Skeleton selects

---

## 🔗 Navigation

| Départ | Action | Destination |
|--------|--------|-------------|
| Sidebar "Agendas et Assignations" | Clic | [agendas-assignations/liste.md](liste.md) |
| Bouton "+ Nouvelle assignation" | Clic | Modal création |
| Barre calendrier / Carte liste | Clic | Modal détail |
| Modal → "Modifier" | Clic | Modal édition |
| Modal → "Voir résultats" | Clic | Page résultats (à créer) |

---

## 📡 API Endpoints

| Méthode | Route | Description | Paramètres |
|---------|-------|-------------|------------|
| `GET` | `/api/teacher/assignments` | Liste assignations | `?startDate=...&endDate=...&subject=...&course=...&class=...&priority=...` |
| `POST` | `/api/teacher/assignments` | Créer assignation | Body: `{ title, courseId, classIds[], type, dueDate, priority, description, attachments[] }` |
| `GET` | `/api/teacher/assignments/:id` | Détail assignation | - |
| `PUT` | `/api/teacher/assignments/:id` | Modifier assignation | Body: `{ title?, dueDate?, priority?, ... }` |
| `DELETE` | `/api/teacher/assignments/:id` | Supprimer assignation | - |
| `GET` | `/api/teacher/assignments/:id/stats` | Stats assignation | - |

---

## 🗄️ Schéma Prisma (Référence)

```prisma
model Assignment {
  id          String   @id @default(cuid())
  title       String
  description String?
  type        AssignmentType // LESSON | EXERCISE | QUIZ | VIDEO
  courseId    String
  course      Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  classes     AssignmentClass[] // Relation many-to-many
  dueDate     DateTime
  priority    Priority @default(MEDIUM) // HIGH | MEDIUM | LOW
  status      AssignmentStatus @default(PENDING)
  attachments String[] // URLs fichiers
  createdById String
  createdBy   User     @relation(fields: [createdById], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model AssignmentClass {
  id           String     @id @default(cuid())
  assignmentId String
  assignment   Assignment @relation(fields: [assignmentId], references: [id], onDelete: Cascade)
  classId      String
  class        Class      @relation(fields: [classId], references: [id], onDelete: Cascade)
}

enum AssignmentType {
  LESSON
  EXERCISE
  QUIZ
  VIDEO
}

enum Priority {
  HIGH
  MEDIUM
  LOW
}

enum AssignmentStatus {
  PENDING
  IN_PROGRESS
  COMPLETED
}
```

---

*Dernière mise à jour : 13 décembre 2025*
```typescript
interface CalendarControls {
  timeRangeButtons: {
    janAvr: {
      label: "Jan à Avr";
      action: () => setDateRange(jan, apr);
      active: true; // Dans screenshot
      style: "bg-green-100 text-green-700 border-green-300";
    };
    specific: {
      label: "12-01"; // Raccourci date
      action: () => jumpToDate("2026-01-12");
      style: "bg-green-100 text-green-700 border-green-300";
    };
  };
  
  monthNavigation: {
    prev: {
      icon: ChevronLeft;
      label: "Précédent";
      action: () => setMonth(month - 1);
    };
    current: {
      label: "Janvier 2026"; // Affiché dans screenshot
      format: "MMMM YYYY";
      style: "text-center font-medium text-lg";
    };
    next: {
      icon: ChevronRight;
      label: "Suivant";
      action: () => setMonth(month + 1);
    };
  };
  
  viewModes: {
    label: "Vue Calendrier"; // Titre de la section
    counter: "4 assignations"; // Visible dans screenshot
    options: [
      { id: "mois", label: "Mois", icon: Calendar, active: true },
      { id: "semaine", label: "Semaine", icon: CalendarWeek },
      { id: "jour", label: "Jour", icon: CalendarDay },
      { id: "agenda", label: "Agenda", icon: List }
    ];
  };
}
```

**Comportement** :
- Boutons "Jan à Avr" et "12-01" : quick filters temporels
- Navigation mois : flèches prev/next
- 4 modes de vue calendrier (Mois actif par défaut)
- Compteur assignations mis à jour selon filtres

#### 1.2 Grille Calendrier (Mode Mois)
```typescript
interface MonthView {
  grid: {
    weekdays: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    weeks: CalendarWeek[];
  };
  cellStyle: {
    default: "bg-white border-gray-200";
    today: "bg-blue-50 border-blue-500";
    otherMonth: "bg-gray-50 text-gray-400";
    weekend: "bg-gray-100";
  };
}

interface CalendarDay {
  date: Date;
  dayNumber: number;
  isToday: boolean;
  isOtherMonth: boolean; // Jours avant/après le mois actuel
  assignments: Assignment[]; // Assignations du jour
}
```

**Affichage des Assignations** (d'après screenshot) :
- Barre horizontale bleue : `bg-blue-500 text-white text-xs px-2 py-1 rounded truncate`
- Texte tronqué avec `...` si trop long
- Exemple visible : **"La photosynthèse"** sur les 22, 23, 30 janvier
- Si plusieurs assignations le même jour → empiler verticalement
- Maximum 3 affichées, puis "+ X autres" cliquable

#### 1.3 Modal Détail Assignation (au clic sur barre)
```typescript
interface Assignment {
  id: string;
  title: string; // Ex: "La photosynthèse"
  course: {
    id: string;
    name: string;
    subject: Subject; // Avec couleur
  };
  classes: Class[]; // Classes assignées
  type: "LESSON" | "EXERCISE" | "QUIZ" | "VIDEO";
  dueDate: Date; // Date d'échéance
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  stats?: {
    submitted: number;
    total: number;
    averageScore?: number;
  };
}
```

**Modal Détail Assignation** (au clic sur une barre) :
```typescript
interface AssignmentDetailModal {
  header: {
    typeIcon: Icon; // Selon type (Lesson/Exercise/Quiz/Video)
    title: string;
    courseBadge: string; // "Matière - Nom du cours"
    closeButton: true;
  };
  content: {
    infos: {
      classes: Class[]; // Badges avec effectifs
      dueDate: Date;
      priority: PriorityBadge;
    };
    description: string; // Markdown
    attachments?: File[];
  };
  stats: {
    progress: {
      submitted: number;
      total: number;
      percentage: number;
    };
    averageScore?: number; // Si Quiz/Exercise
  };
  actions: {
    modifier: () => openEditModal();
    supprimer: () => confirmDelete();
    voirResultats: () => navigateToResults();
  };
}
```

---

## 📋 ONGLET 2 : Vue Liste

### Objectif
Vision **détaillée** des assignations avec stats globales et groupement par date.

### Sections

#### 2.1 Cartes de Statistiques (Top)
```typescript
interface StatsCards {
  cards: [
    {
      icon: SquareCheck; // Icône bleue
      label: "Total";
      value: number; // Ex: 4
      color: "blue";
    },
    {
      icon: AlertTriangle; // Icône rouge
      label: "En retard";
      value: number; // Ex: 0
      color: "red";
    },
    {
      icon: Clock; // Icône orange
      label: "Aujourd'hui";
      value: number; // Ex: 0
      color: "orange";
    },
    {
      icon: CalendarCheck; // Icône verte
      label: "À venir";
      value: number; // Ex: 4
      color: "green";
    }
  ];
}
```

**Layout** :
- 4 cartes en grille horizontale (grid-cols-4)
- Bordure + ombre légère (`border border-gray-200 shadow-sm`)
- Icône + label (petit) + valeur (grand)
- Responsive : grid-cols-2 en mobile

#### 2.2 Liste Groupée par Date
```typescript
interface ListView {
  groupedByDate: DateGroup[];
}

interface DateGroup {
  date: Date;
  dateLabel: string; // "vendredi 23 janvier"
  assignationsCount: number; // "3 assignations"
  assignments: AssignmentCard[];
}

interface AssignmentCard {
  layout: {
    container: "bg-white border rounded-lg p-4 hover:shadow-md transition";
    structure: "flex items-start gap-4";
  };
  
  sections: {
    left: {
      icon: Icon; // Selon type (Book, Video, FileText, HelpCircle)
      bgColor: string; // "bg-gray-100 p-2 rounded"
    };
    
    center: {
      title: string; // "La photosynthèse"
      courseInfo: {
        icon: FileText; // 📄
        courseName: string; // "La photosynthèse"
        badge: {
          text: string; // "S.T.N" (Sciences de la Nature)
          color: "bg-blue-500 text-white";
        };
      };
      assignedTo: {
        icon: Users; // 👤
        students: string[]; // ["Emma DURAND", "Baptiste CURRY", "Lucas MARTIN"]
        display: "inline-list"; // Séparés par virgules ou badges
      };
    };
    
    right: {
      dueDateTime: {
        icon: Clock; // ⏰
        date: string; // "23 janv."
        time?: string; // Si heure précise
      };
      priorityBadge: {
        text: "Moyenne" | "Haute" | "Basse";
        color: "orange" | "red" | "green"; // "bg-orange-100 text-orange-700"
      };
      statusBadge?: {
        text: "Basse"; // Dans screenshot
        color: "bg-green-100 text-green-700";
      };
      menu: {
        icon: MoreVertical; // "..."
        actions: ["Modifier", "Dupliquer", "Supprimer"];
      };
    };
  };
}
```

**Exemple Screenshot** :
```
📅 vendredi 23 janvier                           3 assignations
┌─────────────────────────────────────────────────────────────┐
│ 📚  La photosynthèse                          ⏰ 23 janv.   │
│     📄 La photosynthèse  [S.T.N]               🟠 Moyenne   │
│     👤 Emma DURAND                                       ... │
├─────────────────────────────────────────────────────────────┤
│ 📚  La photosynthèse                          ⏰ 23 janv.   │
│     📄 La photosynthèse  [S.T.N]               🟠 Moyenne   │
│     👤 Baptiste CURRY                                    ... │
├─────────────────────────────────────────────────────────────┤
│ 📚  La photosynthèse                          ⏰ 23 janv.   │
│     📄 La photosynthèse  [S.T.N]               🟠 Moyenne   │
│     👤 Lucas MARTIN                                      ... │
└─────────────────────────────────────────────────────────────┘

📅 samedi 31 janvier                             1 assignation
┌─────────────────────────────────────────────────────────────┐
│ 📚  La photosynthèse                          ⏰ 31 janv.   │
│     📄 La photosynthèse  [S.T.N]               🟢 Basse     │
│     👤 Lucas MARTIN                                      ... │
└─────────────────────────────────────────────────────────────┘
```

**Comportement** :
- Groupement automatique par date
- Header de groupe : `bg-gray-50 px-4 py-2 font-medium flex items-center justify-between`
- Compteur assignations par groupe (à droite)
- Clic sur carte → ouvre modal détail (même que vue Calendrier)
- Menu "..." → Modifier, Dupliquer, Supprimer
- Scroll infini si > 50 assignations
- Animation d'apparition au scroll (fade-in)

---

## Interactions Communes aux 2 Onglets

### Action "Nouvelle assignation"
```typescript
interface CreateAssignmentModal {
  onglets: ["Informations", "Contenu"];
  
  onglet1_Informations: {
    titre: TextField;
    matiere: Select<Subject>;
    cours: Select<Course>; // Filtré par matière
    type: Select<"LESSON" | "EXERCISE" | "QUIZ" | "VIDEO">;
    classes: MultiSelect<Class>;
    dateEcheance: DatePicker;
    priorite: Select<"HIGH" | "MEDIUM" | "LOW">;
  };
  
  onglet2_Contenu: {
    description: RichTextEditor;
    fichiers: FileUpload; // PDF, images, etc.
    lienRessource?: TextField; // URL externe
  };
  
  actions: {
    annuler: () => closeModal();
    creerAssignation: () => createAssignment();
  };
}
```

### Changement de Vue (Calendrier ↔ Liste)
```typescript
function toggleView(newView: "Calendrier" | "Liste") {
  // Conserver les filtres actifs
  // Réappliquer les filtres dans la nouvelle vue
  // Animation de transition (fade)
  
  if (newView === "Liste") {
    // Afficher 4 cartes stats en haut
    // Grouper assignations par date
    // Afficher compteurs par groupe
  } else {
    // Afficher calendrier mensuel
    // Afficher assignations comme barres
    // Conserver le mois actuel
  }
}
```

**Transitions** :
- Fade out → Fade in (300ms)
- Boutons toggle avec état actif : `bg-gray-900 text-white` (actif) vs `bg-white text-gray-700` (inactif)
- Icon swap : Calendar ↔ List

### Navigation Calendrier
```typescript
function navigateCalendar(action: "prev" | "next" | "today") {
  if (action === "prev") {
    setMonth(month - 1);
  } else if (action === "next") {
    setMonth(month + 1);
  } else {
    setMonth(new Date().getMonth());
  }
  fetchAssignments(newDateRange);
}
```

---

## États & Feedback

### Vide (Aucune assignation)
```typescript
interface EmptyState {
  icon: CalendarX;
  message: "Aucune assignation trouvée";
  suggestion: "Créez votre première assignation pour commencer";
  cta: {
    label: "+ Nouvelle assignation";
    action: openCreateModal;
  };
}
```

### Filtres actifs (Aucun résultat)
```typescript
interface NoResultState {
  icon: Filter;
  message: "Aucune assignation ne correspond aux filtres";
  action: {
    label: "Réinitialiser les filtres";
    onClick: clearFilters;
  };
}
```

### Chargement
```typescript
interface LoadingState {
  calendar: Skeleton; // Grille 7x5 avec shimmer
  filters: Skeleton; // 5 filtres avec shimmer
}
```

---

## Données Mockées (mockData.js)

```javascript
export const mockAssignments = [
  {
    id: "assign-1",
    title: "La photosynthèse",
    course: {
      id: "bio-101",
      name: "Biologie Fondamentale",
      subject: { name: "Biologie", color: "#10b981" }
    },
    classes: [
      { id: "class-1", name: "Seconde A", students: 28 }
    ],
    type: "LESSON",
    dueDate: new Date("2026-01-22"),
    priority: "HIGH",
    status: "PENDING",
    description: "Étudier le processus de photosynthèse et remplir le QCM.",
    stats: { submitted: 12, total: 28 }
  },
  {
    id: "assign-2",
    title: "La photosynthèse", // Même titre (répétition normale)
    course: {
      id: "bio-101",
      name: "Biologie Fondamentale",
      subject: { name: "Biologie", color: "#10b981" }
    },
    classes: [
      { id: "class-2", name: "Seconde B", students: 25 }
    ],
    type: "EXERCISE",
    dueDate: new Date("2026-01-23"),
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    stats: { submitted: 8, total: 25, averageScore: 14.5 }
  },
  {
    id: "assign-3",
    title: "La photosynthèse",
    course: {
      id: "bio-101",
      name: "Biologie Fondamentale",
      subject: { name: "Biologie", color: "#10b981" }
    },
    classes: [
      { id: "class-1", name: "Seconde A", students: 28 }
    ],
    type: "QUIZ",
    dueDate: new Date("2026-01-30"),
    priority: "LOW",
    status: "PENDING",
    stats: { submitted: 0, total: 28 }
  },
  // 1 autre assignation visible dans le screenshot...
];
```

---

## Composants Impliqués

| Composant | Librairie | Props |
|-----------|-----------|-------|
| **Calendar** | shadcn/ui | `mode="month"` `selected={selectedDates}` |
| **Select** | shadcn/ui | `multiple` pour filtres |
| **Badge** | shadcn/ui | `variant` selon priorité |
| **Dialog** | shadcn/ui | Modal assignation |
| **DatePicker** | react-day-picker | Range selection |
| **Skeleton** | shadcn/ui | Loading states |

---

## Scénarios Utilisateur

### 1. Créer une assignation rapide (depuis Calendrier OU Liste)
```
1. Clic "+ Nouvelle assignation"
2. Remplir onglet "Informations" (5 champs obligatoires)
3. [Optionnel] Ajouter contenu onglet 2
4. Clic "Créer assignation"
→ Toast success + assignation apparaît dans calendrier à la date d'échéance
```

### 2. Filtrer par matière et classe (Calendrier + Liste)
```
1. Sélectionner "Biologie" dans filtre Matières
2. Sélectionner "Seconde A" dans filtre Classes
3. Vue Calendrier : affiche uniquement les 2 assignations correspondantes
4. Vue Liste : affiche les 2 assignations + stats cards mises à jour
5. Compteur update : "2 assignations"
6. Filtres persistent si changement d'onglet
```

### 3. Basculer entre Calendrier et Liste
```
[DEPUIS VUE CALENDRIER]
1. Clic sur bouton "Liste" dans le toggle
2. Animation fade-out → fade-in (300ms)
3. Affichage de la vue Liste avec :
   - 4 cartes stats en haut
   - Assignations groupées par date
   - Filtres conservés
   
[DEPUIS VUE LISTE]
1. Clic sur bouton "Calendrier"
2. Animation fade-out → fade-in
3. Affichage de la vue Calendrier :
   - Mois actuel conservé
   - Assignations affichées comme barres
   - Filtres conservés
```

### 4. Consulter détails d'une assignation (depuis Calendrier)
```
1. Clic sur barre bleue "La photosynthèse" (22 janvier)
2. Modal s'ouvre avec :
   - Type : 📄 Leçon
   - Cours : Biologie - Biologie Fondamentale
   - Classes : Seconde A (28 élèves)
   - Échéance : 22 janvier 2026
   - Priorité : 🔴 Haute
   - Stats : 12/28 soumis (43%)
3. Actions : [Modifier] [Supprimer] [Voir résultats]
```

---

## Points d'Attention

### UX
- ⚠️ **Pastilles couleur** : Utiliser les couleurs des matières pour les badges cours
- ⚠️ **Responsive** : Calendrier → Liste en mobile (< 768px)
- ⚠️ **Accessibilité** : Navigation clavier dans calendrier (Tab + Arrow keys)

### Performance
- ⚠️ **Lazy loading** : Charger seulement le mois visible ± 1 mois tampon
- ⚠️ **Debounce filtres** : 300ms avant application

### Données
- ⚠️ **Validation** : Date d'échéance >= aujourd'hui
- ⚠️ **Cascade delete** : Si cours supprimé → supprimer ses assignations liées

---

## Spécifications Techniques

### API Endpoints
```typescript
GET    /api/teacher/assignments?startDate=2026-01-01&endDate=2026-01-31
POST   /api/teacher/assignments
PUT    /api/teacher/assignments/:id
DELETE /api/teacher/assignments/:id
GET    /api/teacher/assignments/:id/stats
```

### Schéma Prisma (référence)
```prisma
model Assignment {
  id          String   @id @default(cuid())
  title       String
  description String?
  type        AssignmentType // LESSON | EXERCISE | QUIZ | VIDEO
  courseId    String
  course      Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  classes     AssignmentClass[]
  dueDate     DateTime
  priority    Priority @default(MEDIUM) // HIGH | MEDIUM | LOW
  status      AssignmentStatus @default(PENDING)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

*Dernière mise à jour : 13 décembre 2025*
