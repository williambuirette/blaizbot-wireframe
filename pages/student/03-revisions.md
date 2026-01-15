# Liste des Révisions Élève

> **Route** : `/student/revisions`  
> **Rôle(s)** : STUDENT  
> **Fichier source** : `src/app/(dashboard)/student/revisions/page.tsx`

---

## 📸 Aperçu Visuel

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🤖 BlaizBot                              🔔  [LM] Lucas Martin  ▼         │
├──────────────┬──────────────────────────────────────────────────────────────┤
│              │                                                              │
│  🏠 Dashboard│  📖 Mes Révisions                                            │
│              │                                                              │
│  📚 Mes cours│  ┌─────────────────────────────────────────────────────────┐ │
│              │  │  📊 Statistiques                                        │ │
│  📖 Révisions│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                    │ │
│  ◀──────────▶│  │  │  8   │ │  5   │ │  3   │ │  45  │                    │ │
│  📅 Agenda   │  │  │Total │ │Liés  │ │Perso │ │Cartes│                    │ │
│              │  │  │suppl.│ │cours │ │      │ │      │                    │ │
│  🤖 Assist.  │  │  └──────┘ └──────┘ └──────┘ └──────┘                    │ │
│     IA       │  └─────────────────────────────────────────────────────────┘ │
│              │                                                              │
│  💬 Messages │  ┌─────────────────────────────────────────────────────────┐ │
│              │  │  [Tous] [Liés à un cours] [Cours personnels]   [+Créer] │ │
│              │  └─────────────────────────────────────────────────────────┘ │
│              │                                                              │
│              │  ┌─────────────────────────────────────────────────────────┐ │
│              │  │  ┌───────────────────┐ ┌───────────────────┐            │ │
│              │  │  │ 📚 Fractions      │ │ 📝 Mes notes SVT  │            │ │
│              │  │  │ Lié à : Maths     │ │ Cours personnel   │            │ │
│              │  │  │ 3 chapitres       │ │ 2 chapitres       │            │ │
│              │  │  │ 12 cartes         │ │ 8 cartes          │            │ │
│              │  │  │ Modifié : hier    │ │ Modifié : 2j      │            │ │
│              │  │  └───────────────────┘ └───────────────────┘            │ │
│              │  │                                                         │ │
│              │  │  ┌───────────────────┐                                  │ │
│              │  │  │ 📖 La Révolution  │                                  │ │
│              │  │  │ Lié à : Histoire  │                                  │ │
│              │  │  │ 5 chapitres       │                                  │ │
│              │  │  │ 25 cartes         │                                  │ │
│              │  │  └───────────────────┘                                  │ │
│              │  └─────────────────────────────────────────────────────────┘ │
└──────────────┴──────────────────────────────────────────────────────────────┘
```

### Légende des éléments

| Zone | Description |
|------|-------------|
| Header | Titre + statistiques globales |
| Tabs | Filtres par type (Tous / Liés cours / Personnels) + bouton créer |
| Grid | Cartes suppléments en grille |

---

## 🧩 Composants Utilisés

| Composant | Chemin | Description |
|-----------|--------|-------------|
| `RevisionsHeader` | `@/components/features/student/revisions/RevisionsHeader` | Header avec stats |
| `RevisionsTabs` | `@/components/features/student/revisions/RevisionsTabs` | Onglets + grille |
| `Skeleton` | `@/components/ui/skeleton` | Placeholder chargement |

---

## 📦 Dépendances

### Packages NPM
```json
{
  "next": "15.x",
  "react": "19.x",
  "@prisma/client": "latest"
}
```

### Composants shadcn/ui
- [x] `Skeleton`
- [x] `Tabs` (dans RevisionsTabs)
- [x] `Card` (dans cartes suppléments)
- [x] `Button`

---

## 🔗 API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| - | Server Component | Données chargées via Prisma |

### Requêtes Prisma
```typescript
// Suppléments de l'élève avec relations many-to-many
prisma.studentSupplement.findMany({
  where: { studentId: student.id },
  include: {
    Courses: {
      select: { Course: {...} }
    },
    Chapters: {
      select: { id, _count: { Cards } }
    }
  },
  orderBy: { updatedAt: 'desc' }
})
```

---

## 💾 Types & Interfaces

### Supplement (retour fonction)
```typescript
interface Supplement {
  id: string;
  title: string;
  description: string | null;
  // Many-to-many : plusieurs cours possibles
  courseIds: string[];
  courses: {
    id: string;
    title: string;
    teacher: string | null;
  }[];
  // Backward compat : premier cours
  courseId: string | null;
  course: { id: string; title: string; teacher: string | null } | null;
  chapterCount: number;
  cardCount: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Stats
```typescript
interface Stats {
  totalSupplements: number;
  linkedToCourse: number;    // Avec au moins 1 cours lié
  personalCourses: number;   // Sans cours lié (personnel)
  totalCards: number;
}
```

---

## 🔐 Authentification & Autorisations

| Aspect | Détail |
|--------|--------|
| **Session** | `auth()` côté serveur |
| **Vérification** | Redirection `/login` si non authentifié |
| **Données** | Filtrées par `studentId` |

---

## 🎨 États de l'Interface

### État de chargement (Suspense)
```
┌─────────────────────────────────────────┐
│  [████████░░] (Skeleton)                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │░░░░░░░░░░│ │░░░░░░░░░░│ │░░░░░░░░░░│ │
│  └──────────┘ └──────────┘ └──────────┘ │
└─────────────────────────────────────────┘
```

### État avec données
Affichage normal avec stats et grille.

### État vide
```
┌─────────────────────────────────────────┐
│  📭 Aucun supplément                    │
│  Créez votre premier supplément         │
│        [+ Créer un supplément]          │
└─────────────────────────────────────────┘
```

---

## 📱 Responsive Design

| Breakpoint | Comportement |
|------------|--------------|
| `mobile` < 768px | 1 colonne, stats empilées |
| `tablet` 768px-1024px | 2 colonnes |
| `desktop` > 1024px | 3 colonnes |

### Classes Tailwind
```css
.grid .gap-4 .md:grid-cols-2 .lg:grid-cols-3
```

---

## 📋 Checklist de Recréation

### Structure
- [x] Route Next.js (`app/(dashboard)/student/revisions/page.tsx`)
- [x] Server Component async
- [x] Suspense pour fallback

### UI
- [x] Header avec stats (4 indicateurs)
- [x] Tabs pour filtrer (Tous / Liés / Personnels)
- [x] Bouton "+ Créer"
- [x] Grille de cartes suppléments
- [x] Skeleton de chargement

### Fonctionnalités
- [x] Chargement Prisma avec relations
- [x] Support many-to-many (cours multiples)
- [x] Filtrage par type via tabs
- [x] Redirection vers création

### Qualité
- [x] Responsive (1→2→3 colonnes)
- [x] Suspense boundary
- [ ] Tests unitaires

---

## 🔗 Navigation

| Direction | Page | Route |
|-----------|------|-------|
| ← Parent | Dashboard | `/student` |
| → Détail | Détail supplément | `/student/revisions/[id]` |
| → Créer | Nouveau supplément | `/student/revisions/create` |

---

## 📝 Notes de Développement

> **Many-to-many** : Un supplément peut être lié à plusieurs cours. L'interface maintient la rétro-compatibilité avec `courseId` (premier cours).

> **Server Component** : Utilise `Suspense` pour afficher un skeleton pendant le chargement des données Prisma.

> **Performance** : Les données sont chargées côté serveur, pas de waterfall client.

---

*Documentation générée par rétro-ingénierie de BlaizBot-V1*  
*Date : 15 janvier 2026*
