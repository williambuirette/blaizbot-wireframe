# Liste des Cours Élève

> **Route** : `/student/courses`  
> **Rôle(s)** : STUDENT  
> **Fichier source** : `src/app/(dashboard)/student/courses/page.tsx`

---

## 📸 Aperçu Visuel

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🤖 BlaizBot                              🔔  [LM] Lucas Martin  ▼         │
├──────────────┬──────────────────────────────────────────────────────────────┤
│              │                                                              │
│  🏠 Dashboard│  Mes Cours                                                   │
│              │  Accédez à vos cours et suivez votre progression.            │
│  📚 Mes cours│                                                              │
│  ◀──────────▶│  ┌─────────────────────────────────────────────────────────┐ │
│  📖 Révisions│  │  📊 Statistiques                                        │ │
│              │  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                        │ │
│  📅 Agenda   │  │  │  5  │ │  2  │ │  3  │ │ 40% │                        │ │
│              │  │  │Total│ │Term.│ │En   │ │Prog.│                        │ │
│  🤖 Assist.  │  │  │     │ │     │ │cours│ │     │                        │ │
│     IA       │  │  └─────┘ └─────┘ └─────┘ └─────┘                        │ │
│              │  └─────────────────────────────────────────────────────────┘ │
│  💬 Messages │                                                              │
│              │  ┌─────────────────────────────────────────────────────────┐ │
│              │  │  Filtres                                                │ │
│              │  │  [Matières ▼] [Profs ▼] [Thèmes ▼] [Statut ▼]          │ │
│              │  └─────────────────────────────────────────────────────────┘ │
│              │                                                              │
│              │  ┌─────────────────────────────────────────────────────────┐ │
│              │  │  Cours          │ Matière │ Prof    │ Prog. │ Statut   │ │
│              │  ├─────────────────┼─────────┼─────────┼───────┼──────────┤ │
│              │  │  Les fractions  │ Maths   │ Dupont  │ 75%   │ En cours │ │
│              │  │  La Révolution  │ Hist.   │ Martin  │ 100%  │ Terminé  │ │
│              │  │  Photosynthèse  │ SVT     │ Bernard │ 0%    │ À faire  │ │
│              │  └─────────────────────────────────────────────────────────┘ │
└──────────────┴──────────────────────────────────────────────────────────────┘
```

### Légende des éléments

| Zone | Description |
|------|-------------|
| Header | Titre + description |
| Stats | 4 indicateurs (total, terminés, en cours, progression) |
| Filtres | Multi-select pour matières, profs, thèmes, statut |
| Table | Liste des cours avec progression |

---

## 🧩 Composants Utilisés

| Composant | Chemin | Description |
|-----------|--------|-------------|
| `StudentCoursesStatsHeader` | `@/components/features/student/StudentCoursesStatsHeader` | Stats header |
| `StudentCoursesTable` | `@/components/features/student/StudentCoursesTable` | Table des cours |
| `StudentCoursesFilters` | `@/components/features/student/StudentCoursesFiltersMulti` | Filtres multi-select |
| `Loader2` | `lucide-react` | Spinner chargement |

---

## 📦 Dépendances

### Packages NPM
```json
{
  "next": "15.x",
  "react": "19.x",
  "lucide-react": "latest"
}
```

### Composants shadcn/ui
- [x] Composants internes des filtres (Select, Button, etc.)

### Hooks React
- [x] `useState`
- [x] `useEffect`
- [x] `useCallback`
- [x] `useMemo`

---

## 🔗 API Endpoints

| Méthode | Endpoint | Description | Réponse |
|---------|----------|-------------|---------|
| `GET` | `/api/student/courses` | Liste des cours assignés | `{ success, data: { courses, overview, filters } }` |

### Structure de la réponse
```typescript
{
  success: true,
  data: {
    courses: StudentCourseData[],
    overview: StudentCoursesOverview,
    filters: {
      subjects: FilterOption[],
      teachers: FilterOption[]
    }
  }
}
```

---

## 💾 Types & Interfaces

### StudentCourseData
```typescript
interface StudentCourseData {
  id: string;
  title: string;
  description: string | null;
  subject: { id: string; name: string };
  teacher: { id: string; firstName: string; lastName: string };
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  progressPercent: number;
  lastAccessedAt: string | null;
}
```

### StudentCoursesOverview
```typescript
interface StudentCoursesOverview {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  overallProgress: number;
}
```

### FilterOption
```typescript
interface FilterOption {
  id: string;
  name: string;
}
```

### États des filtres
```typescript
const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
const [selectedStatus, setSelectedStatus] = useState('all');
```

---

## 🔐 Authentification & Autorisations

| Aspect | Détail |
|--------|--------|
| **Layout parent** | Vérifie la session dans `(dashboard)/layout.tsx` |
| **API** | Vérifie le rôle STUDENT côté serveur |
| **Données** | Filtrées par classe de l'élève |

---

## 🎨 États de l'Interface

### État de chargement
```
┌─────────────────────────────────────────┐
│           ⏳ (Loader2 spinner)          │
│            Chargement...                │
└─────────────────────────────────────────┘
```

### État avec données
Affichage complet (stats + filtres + table).

### État filtré (aucun résultat)
Table vide avec message contextuel.

---

## 📱 Responsive Design

| Breakpoint | Comportement |
|------------|--------------|
| `mobile` < 768px | Stats 2×2, filtres empilés, table scrollable |
| `tablet` 768px+ | Stats en ligne, filtres en ligne |

---

## 📋 Checklist de Recréation

### Structure
- [x] Route Next.js (`app/(dashboard)/student/courses/page.tsx`)
- [x] Client Component (`'use client'`)

### UI
- [x] Titre + description
- [x] Header statistiques (4 indicateurs)
- [x] Filtres multi-select
- [x] Table des cours
- [x] Indicateurs de progression (badges)

### Fonctionnalités
- [x] Fetch API `/api/student/courses`
- [x] Filtrage côté client (useMemo)
- [x] Multi-select pour matières/profs/thèmes
- [x] Single-select pour statut
- [x] État de chargement

### Qualité
- [x] Responsive
- [ ] Tests unitaires

---

## 🔗 Navigation

| Direction | Page | Route |
|-----------|------|-------|
| ← Parent | Dashboard | `/student` |
| → Détail | Détail cours | `/student/courses/[id]` |

---

## 📝 Notes de Développement

> **Filtrage client** : Les filtres utilisent `useMemo` pour recalculer la liste filtrée uniquement quand les critères changent.

> **Multi-select** : Les filtres matières, profs et thèmes supportent la sélection multiple (tableau de strings).

> **Performance** : Toutes les données sont chargées en une seule requête API, le filtrage est fait côté client.

---

*Documentation générée par rétro-ingénierie de BlaizBot-V1*  
*Date : 15 janvier 2026*
