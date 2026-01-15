# Agendas et Assignations - Liste

**Route** : `/teacher/agendas-assignations` (depuis sidebar Professeur)  
**Composants** : Calendar, Filters, AssignmentCard, ViewToggle  
**Data** : assignments[], subjects[], courses[], classes[]  
**Date** : 13 décembre 2025

---

## Objectif

Gérer les assignations de cours et exercices via un calendrier interactif avec filtres multiples et vues personnalisables.

---

## Sections Principales

### 1. Header Page
```typescript
interface HeaderSection {
  titre: "Agendas et Assignations";
  sousTitre: "Gérez vos assignations de cours et exercices";
  actions: {
    nouvelleCTA: {
      label: "+ Nouvelle assignation";
      icon: CalendarPlus;
      action: () => openAssignmentModal();
    };
  };
}
```

**Comportement** :
- Bouton "+ Nouvelle assignation" ouvre une modale de création
- Titre et sous-titre fixes

---

### 2. Barre de Filtres
```typescript
interface FiltersBar {
  filters: {
    matieres: {
      label: "🎨 Matières";
      type: "multi-select";
      options: Subject[]; // Avec pastilles couleur
      placeholder: "Toutes les matières";
    };
    cours: {
      label: "📚 Cours";
      type: "multi-select";
      options: Course[]; // Filtrés par matières sélectionnées
      placeholder: "Tous les cours";
    };
    classes: {
      label: "👥 Classes";
      type: "multi-select";
      options: Class[];
      placeholder: "Toutes les classes";
    };
    priorite: {
      label: "⚠️ Priorité";
      type: "single-select";
      options: ["Toutes", "Haute", "Moyenne", "Basse"];
      default: "Toutes";
    };
    periode: {
      label: "📅 Période";
      type: "date-range";
      icon: Calendar;
      placeholder: "Sélectionner période";
    };
  };
  viewToggle: {
    options: ["Calendrier", "Liste"];
    default: "Calendrier"; // Actif dans screenshot
  };
}
```

**Logique Filtres** :
- **Matières** → filtre les cours disponibles
- **Cours** → filtre les assignations liées
- **Classes** → filtre les assignations par classe
- **Priorité** → badge visuel sur les cartes
- **Période** → limite les dates affichées dans le calendrier
- Les filtres sont cumulatifs (ET logique)
- Bouton "Réinitialiser" si au moins 1 filtre actif

---

### 3. Vue Calendrier (par défaut)

#### 3.1 Controls Navigation
```typescript
interface CalendarControls {
  timeRangeButtons: {
    janAvr: {
      label: "Jan à Avr";
      action: () => setDateRange(jan, apr);
      active: true; // Dans screenshot
    };
    specific: {
      label: "12-01"; // Raccourci date
      action: () => jumpToDate("2026-01-12");
    };
  };
  monthNavigation: {
    prev: {
      icon: ChevronLeft;
      action: () => setMonth(month - 1);
    };
    current: {
      label: "Janvier 2026"; // Affiché dans screenshot
      format: "MMMM YYYY";
    };
    next: {
      icon: ChevronRight;
      action: () => setMonth(month + 1);
    };
  };
  viewModes: {
    options: ["Mois", "Semaine", "Jour", "Agenda"];
    default: "Mois"; // Actif dans screenshot
    icons: {
      mois: Calendar,
      semaine: CalendarWeek,
      jour: CalendarDay,
      agenda: List
    };
  };
}
```

#### 3.2 Grille Calendrier Mois
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

#### 3.3 Carte Assignation (Modal au clic)
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

### 4. Vue Liste (Alternative)

```typescript
interface ListView {
  header: {
    counter: string; // "4 assignations"
    sortOptions: ["Date", "Priorité", "Classe", "Matière"];
  };
  items: AssignmentListItem[];
}

interface AssignmentListItem {
  layout: "horizontal-card";
  sections: {
    left: {
      typeIcon: Icon;
      title: string;
      courseName: string;
      classesBadges: Badge[];
    };
    center: {
      dueDate: Date;
      priorityBadge: Badge;
      statusBadge: Badge;
    };
    right: {
      stats: {
        submitted: string; // "X/Y soumis"
        averageScore?: string;
      };
      actions: ["Voir", "Modifier", "Supprimer"];
    };
  };
}
```

**Comportement** :
- Clic sur une carte → ouvre modal détail
- Tri par défaut : Date croissante
- Pagination si > 20 items

---

## Interactions Clés

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
  // Animation de transition
}
```

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

### 1. Créer une assignation rapide
```
1. Clic "+ Nouvelle assignation"
2. Remplir onglet "Informations" (5 champs obligatoires)
3. [Optionnel] Ajouter contenu onglet 2
4. Clic "Créer assignation"
→ Toast success + assignation apparaît dans calendrier à la date d'échéance
```

### 2. Filtrer par matière et classe
```
1. Sélectionner "Biologie" dans filtre Matières
2. Sélectionner "Seconde A" dans filtre Classes
3. Calendrier affiche uniquement les 2 assignations correspondantes
4. Compteur update : "2 assignations"
```

### 3. Basculer en vue Liste
```
1. Clic sur "Liste" dans le toggle Vue
2. Animation de transition
3. Affichage des 4 assignations en cartes horizontales
4. Tri par défaut : Date croissante
```

### 4. Consulter détails d'une assignation
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
