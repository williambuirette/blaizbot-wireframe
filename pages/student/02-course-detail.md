# Détail d'un Cours Élève

> **Route** : `/student/courses/[id]`  
> **Rôle(s)** : STUDENT  
> **Fichier source** : `src/app/(dashboard)/student/courses/[id]/page.tsx`

---

## 📸 Aperçu Visuel

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🤖 BlaizBot                              🔔  [LM] Lucas Martin  ▼         │
├──────────────┬──────────────────────────────────────────────────────────────┤
│              │                                                              │
│  🏠 Dashboard│  ← Retour aux cours                                          │
│              │                                                              │
│  📚 Mes cours│  Les fractions                                               │
│  ◀──────────▶│  Matière : Mathématiques  |  Prof : M. Dupont               │
│              │                                                              │
│  📖 Révisions│  ┌─────────────────────────────────────────────────────────┐ │
│              │  │  📊 KPIs de Score                                       │ │
│  📅 Agenda   │  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                    │ │
│              │  │  │ 15/20│ │ 14.5 │ │  2   │ │ 75%  │                    │ │
│  🤖 Assist.  │  │  │Exam  │ │Moy.  │ │Quiz  │ │Prog. │                    │ │
│     IA       │  │  └──────┘ └──────┘ └──────┘ └──────┘                    │ │
│              │  └─────────────────────────────────────────────────────────┘ │
│  💬 Messages │                                                              │
│              │  ┌─────────────────────────────────────────────────────────┐ │
│              │  │  [Cours] [Ressources] [Planning] [Suppléments]          │ │
│              │  └─────────────────────────────────────────────────────────┘ │
│              │                                                              │
│              │  ┌─────────────────────────────────────────────────────────┐ │
│              │  │  📖 Chapitre 1 : Introduction aux fractions      [✓]   │ │
│              │  │  ├── 📄 Leçon : Définition                              │ │
│              │  │  ├── 🎬 Vidéo : Explication visuelle                    │ │
│              │  │  └── 📝 Exercice : Pratique                             │ │
│              │  │                                                         │ │
│              │  │  📖 Chapitre 2 : Opérations                       [ ]   │ │
│              │  │  ├── 📄 Leçon : Addition/Soustraction                   │ │
│              │  │  └── ❓ Quiz : Auto-évaluation                          │ │
│              │  └─────────────────────────────────────────────────────────┘ │
└──────────────┴──────────────────────────────────────────────────────────────┘
```

### Onglets

| Onglet | Contenu |
|--------|---------|
| **Cours** | Chapitres avec sections (leçons, vidéos, exercices, quiz) |
| **Ressources** | Fichiers téléchargeables du cours |
| **Planning** | Calendrier des échéances |
| **Suppléments** | Révisions liées au cours |

---

## 🧩 Composants Utilisés

| Composant | Chemin | Description |
|-----------|--------|-------------|
| `Tabs` | `@/components/ui/tabs` | Navigation par onglets |
| `TabsList`, `TabsTrigger`, `TabsContent` | `@/components/ui/tabs` | Composants onglets |
| `Card` | `@/components/ui/card` | Conteneurs |
| `Badge` | `@/components/ui/badge` | Statuts |
| `Progress` | `@/components/ui/progress` | Barre progression |
| `Accordion` | `@/components/ui/accordion` | Chapitres dépliables |
| `Dialog` | `@/components/ui/dialog` | Modales (visualiseurs) |
| `Calendar` | `@/components/ui/calendar` | Planning |
| `Button` | `@/components/ui/button` | Actions |
| `StudentChaptersViewer` | `@/components/features/student/StudentChaptersViewer` | Visualisation chapitres |
| `CourseScoreKPIs` | `@/components/shared/CourseScoreKPIs` | KPIs de score |
| `VideoViewer` | `@/components/features/student/viewers/VideoViewer` | Lecteur vidéo |
| `QuizViewer` | `@/components/features/student/viewers/quiz` | Interface quiz |
| `ExerciseViewer` | `@/components/features/student/viewers/ExerciseViewer` | Interface exercice |

---

## 📦 Dépendances

### Packages NPM
```json
{
  "next": "15.x",
  "react": "19.x",
  "date-fns": "latest",
  "lucide-react": "latest"
}
```

### Composants shadcn/ui
- [x] `Tabs`
- [x] `Card`
- [x] `Badge`
- [x] `Progress`
- [x] `Accordion`
- [x] `Dialog`
- [x] `Calendar`
- [x] `Button`

### Icônes lucide-react
- `Loader2`, `ArrowLeft`, `BookOpen`, `FolderTree`, `File`, `FileText`
- `FileSpreadsheet`, `Presentation`, `Image`, `Video`, `Music`
- `Download`, `ExternalLink`, `User`, `CalendarDays`, `Clock`
- `Pencil`, `Trash2`, `Plus`, `Layers`, `ChevronRight`

---

## 🔗 API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/student/courses/[id]` | Détail du cours |
| `GET` | `/api/student/courses/[id]/scores` | Scores de l'élève |
| `GET` | `/api/student/courses/[id]/supplements` | Suppléments liés |

### Appels parallèles
```typescript
const [courseRes, scoresRes, supplementsRes] = await Promise.all([
  fetch(`/api/student/courses/${courseId}`),
  fetch(`/api/student/courses/${courseId}/scores`),
  fetch(`/api/student/courses/${courseId}/supplements`)
]);
```

---

## 💾 Types & Interfaces

### CourseData
```typescript
interface CourseData {
  id: string;
  title: string;
  description: string | null;
  subject: { id: string; name: string };
  teacher: { id: string; firstName: string; lastName: string };
  chapters: Chapter[];
  files: CourseFile[];
  stats: {
    totalChapters: number;
    completedChapters: number;
    progressPercent: number;
  };
}
```

### Chapter
```typescript
interface Chapter {
  id: string;
  title: string;
  description: string | null;
  order: number;
  isCompleted: boolean;
  sections: Section[];
}
```

### Section
```typescript
interface Section {
  id: string;
  title: string;
  type: 'LESSON' | 'VIDEO' | 'EXERCISE' | 'QUIZ' | 'NOTE';
  order: number;
  content: string | null;
  files?: SectionFile[];
}
```

### CourseScoreData
```typescript
interface CourseScoreData {
  examScore: number | null;
  continuousScore: number;
  quizCount: number;
  progressPercent: number;
}
```

---

## 🔐 Authentification & Autorisations

| Aspect | Détail |
|--------|--------|
| **Vérification** | L'API vérifie que l'élève a accès au cours (assignation classe) |
| **Erreur 403/404** | Redirection vers `/student/courses` |

---

## 🎨 États de l'Interface

### État de chargement
```
⏳ Loader2 spinner centré
```

### État avec données
Affichage complet avec onglets.

### Modales de visualisation

**Carte de type VIDEO**
```
┌─────────────────────────────────────────┐
│  Titre de la vidéo               [×]   │
├─────────────────────────────────────────┤
│  [▶ Lecteur vidéo intégré]              │
│                                         │
│  Description...                         │
└─────────────────────────────────────────┘
```

**Carte de type QUIZ**
```
┌─────────────────────────────────────────┐
│  Quiz : Auto-évaluation          [×]   │
├─────────────────────────────────────────┤
│  Question 1/5                           │
│  Quelle est la définition d'une        │
│  fraction ?                             │
│                                         │
│  ○ Option A                             │
│  ● Option B                             │
│  ○ Option C                             │
│                                         │
│  [Suivant →]                            │
└─────────────────────────────────────────┘
```

---

## 📱 Responsive Design

| Breakpoint | Comportement |
|------------|--------------|
| `mobile` < 768px | Tabs scrollables, accordéon pleine largeur |
| `desktop` 1024px+ | Layout standard |

---

## 📋 Checklist de Recréation

### Structure
- [x] Route dynamique (`app/(dashboard)/student/courses/[id]/page.tsx`)
- [x] Client Component (`'use client'`)
- [x] Résolution async des params Next.js 15

### UI
- [x] Bouton retour
- [x] Titre + matière + prof
- [x] KPIs de score
- [x] Tabs (Cours, Ressources, Planning, Suppléments)
- [x] Accordéon chapitres
- [x] Liste sections avec icônes par type
- [x] Modales de visualisation par type

### Fonctionnalités
- [x] Fetch parallèle (cours + scores + suppléments)
- [x] Gestion onglet actif via URL (`?tab=...`)
- [x] Ouverture modale pour chaque type de carte
- [x] Téléchargement fichiers
- [x] Redirection si accès refusé

### Qualité
- [x] Responsive
- [ ] Tests unitaires

---

## 🔗 Navigation

| Direction | Page | Route |
|-----------|------|-------|
| ← Retour | Liste cours | `/student/courses` |
| → Supplément | Révision liée | `/student/revisions/[id]` |

---

## 📝 Notes de Développement

> **Next.js 15** : Les `params` sont maintenant une Promise, utiliser `await params` ou `useEffect` pour résoudre.

> **Viewers** : Chaque type de section (VIDEO, QUIZ, EXERCISE, LESSON, NOTE) a un composant viewer dédié.

> **Performance** : Utilise `Promise.all()` pour charger cours, scores et suppléments en parallèle.

> **Taille fichier** : 956 lignes → devrait être refactorisé en sous-composants.

---

*Documentation générée par rétro-ingénierie de BlaizBot-V1*  
*Date : 15 janvier 2026*
