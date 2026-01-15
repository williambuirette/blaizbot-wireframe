# Dashboard Élève

> **Route** : `/student`  
> **Rôle(s)** : STUDENT  
> **Fichier source** : `src/app/(dashboard)/student/page.tsx`

---

## 📸 Aperçu Visuel

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🤖 BlaizBot                              🔔  [LM] Lucas Martin  ▼         │
├──────────────┬──────────────────────────────────────────────────────────────┤
│              │                                                              │
│  🏠 Dashboard│  ┌─────────────────────────────────────────────────────────┐ │
│  ◀──────────▶│  │  Bonjour, Lucas 👋                                     │ │
│  📚 Mes cours│  │  Prêt à apprendre quelque chose de nouveau ?           │ │
│              │  │  Classe : 3ème A                                       │ │
│  📖 Révisions│  └─────────────────────────────────────────────────────────┘ │
│              │         (gradient bleu → indigo, texte blanc)               │
│  📅 Agenda   │                                                              │
│              │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐    │
│  🤖 Assist.  │  │ 📚        │ │ 🎯        │ │ 🏆        │ │ ⏱️        │    │
│     IA       │  │ Cours     │ │Progression│ │ Score     │ │ Heures    │    │
│              │  │ terminés  │ │           │ │ moyen     │ │ passées   │    │
│  💬 Messages │  │ 2/5       │ │ 40%       │ │ 75%       │ │ 12h       │    │
│              │  └───────────┘ └───────────┘ └───────────┘ └───────────┘    │
│              │   (liens cliquables vers /courses et /revisions)            │
│  ──────────  │                                                              │
│  BlaizBot v1 │  ┌─────────────────────────────────────────────────────────┐ │
│              │  │  Accès rapide                                          │ │
│              │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │ │
│              │  │  │ 💬      │ │ 📅      │ │ 📚      │ │ 🤖      │       │ │
│              │  │  │Messages │ │ Agenda  │ │Mes Cours│ │Assist.IA│       │ │
│              │  │  │  (2)    │ │         │ │         │ │         │       │ │
│              │  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │ │
│              │  └─────────────────────────────────────────────────────────┘ │
└──────────────┴──────────────────────────────────────────────────────────────┘
```

### Légende des éléments

| Zone | Description |
|------|-------------|
| Welcome Card | Gradient bleu-indigo avec prénom + classe |
| Stats Grid | 4 cartes de statistiques cliquables |
| Quick Access | 4 raccourcis vers fonctionnalités principales |

---

## 🧩 Composants Utilisés

| Composant | Chemin | Description |
|-----------|--------|-------------|
| `DashboardShell` | `@/components/layout/DashboardShell` | Layout principal |
| `Card` | `@/components/ui/card` | Conteneur carte |
| `CardContent` | `@/components/ui/card` | Contenu de carte |
| `StudentStatsGrid` | `@/components/features/student/StudentStatsGrid` | Grille de stats |
| `StudentStatsCard` | `@/components/features/student/StudentStatsCard` | Carte stat individuelle |
| `QuickAccessCard` | `@/components/dashboard/QuickAccessCard` | Raccourcis |
| `Badge` | `@/components/ui/badge` | Badge notification |

---

## 📦 Dépendances

### Packages NPM
```json
{
  "next": "15.x",
  "react": "19.x",
  "@prisma/client": "latest",
  "lucide-react": "latest"
}
```

### Composants shadcn/ui
- [x] `Card` (CardContent)
- [x] `Badge`

### Icônes lucide-react
- [x] `BookOpen`
- [x] `Target`
- [x] `Trophy`
- [x] `Clock`
- [x] `MessageSquare`
- [x] `Calendar`
- [x] `Bot`

---

## 🔗 API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| - | Server Component | Données chargées côté serveur via Prisma |

### Requêtes Prisma (Server Component)
```typescript
// Profil élève avec classe
prisma.studentProfile.findUnique({ where: { userId }, include: {...} })

// Progressions des cours
prisma.studentProgress.findMany({ where: { studentId: userId } })

// Scores (moyenne continue)
prisma.studentScore.findMany({ where: { studentId: userId } })

// Messages non lus
prisma.messageReadStatus.count({ where: { userId, readAt: null } })
```

---

## 💾 Types & Interfaces

### Données du dashboard
```typescript
interface DashboardData {
  firstName: string;
  className: string;
  stats: {
    coursesCompleted: number;
    totalCourses: number;
    averageScore: number;
    hoursSpent: number;
  };
  unreadMessages: number;
}
```

### Props StudentStatsGrid
```typescript
interface StudentStatsGridProps {
  stats: {
    coursesCompleted: number;
    totalCourses: number;
    averageScore: number;
    hoursSpent: number;
  };
}
```

### Props QuickAccessCard
```typescript
interface QuickAccessCardProps {
  unreadMessages?: number;
}
```

---

## 🔐 Authentification & Autorisations

| Aspect | Détail |
|--------|--------|
| **Session** | `auth()` côté serveur |
| **Rôle requis** | `STUDENT` |
| **Redirection** | `/login` si non authentifié ou mauvais rôle |

### Vérification
```typescript
const session = await auth();
if (!session?.user?.id || session.user.role !== 'STUDENT') {
  redirect('/login');
}
```

---

## 🎨 États de l'Interface

### État normal
Affichage complet avec données chargées.

### État profil non trouvé
```
┌─────────────────────────────────────────┐
│  Profil élève non trouvé.               │
│  (text-muted-foreground)                │
└─────────────────────────────────────────┘
```

---

## 📱 Responsive Design

| Breakpoint | Comportement |
|------------|--------------|
| `mobile` < 768px | Stats en 2 colonnes, Quick Access en 2 colonnes |
| `tablet` 768px+ | Stats en 4 colonnes, Quick Access en 4 colonnes |

### Classes Tailwind clés
```css
/* Stats Grid */
.grid .grid-cols-2 .md:grid-cols-4 .gap-4

/* Welcome Card gradient */
.bg-gradient-to-r .from-blue-500 .to-indigo-600 .text-white
```

---

## 📋 Checklist de Recréation

### Structure
- [x] Route Next.js (`app/(dashboard)/student/page.tsx`)
- [x] Server Component (async)
- [x] Layout parent `(dashboard)` appliqué

### UI
- [x] Welcome Card avec gradient
- [x] Prénom dynamique + classe
- [x] Grille de 4 statistiques
- [x] Cartes stats cliquables (liens)
- [x] Section Accès rapide
- [x] Badge messages non lus

### Fonctionnalités
- [x] Chargement données Prisma
- [x] Calcul progression %
- [x] Calcul score moyen
- [x] Comptage messages non lus
- [x] Gestion profil non trouvé

### Qualité
- [x] Responsive (2→4 colonnes)
- [ ] Tests unitaires

---

## 🔗 Navigation

| Direction | Page | Route |
|-----------|------|-------|
| → Mes cours | Liste cours | `/student/courses` |
| → Révisions | Liste révisions | `/student/revisions` |
| → Messages | Messagerie | `/student/messages` |
| → Agenda | Calendrier | `/student/agenda` |
| → Assistant IA | Chat IA | `/student/ai` |

---

## 📝 Notes de Développement

> **Server Component** : Cette page est un Server Component async pour charger les données Prisma côté serveur sans API supplémentaire.

> **Calculs** : 
> - Progression = (coursesCompleted / totalCourses) × 100
> - Score moyen = moyenne des `continuousScore`
> - Heures = somme des `timeSpent` / 60

> **Performance** : Les requêtes Prisma pourraient être optimisées avec `Promise.all()` pour paralléliser.

---

*Documentation générée par rétro-ingénierie de BlaizBot-V1*  
*Date : 15 janvier 2026*
