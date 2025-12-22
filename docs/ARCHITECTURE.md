# 🏗️ Architecture Technique : Blaiz'bot Educational Platform
## Document de Référence pour Exposé Académique

> **Version :** 1.0 - Architecture Refactorisée (Vibecoding Optimized)
> **Date :** 21 Décembre 2025
> **Auteur :** Équipe Blaiz'bot

---

## Table des Matières

1. [Vue d'Ensemble](#1-vue-densemble)
2. [Architecture Globale](#2-architecture-globale)
3. [Structure des Dossiers](#3-structure-des-dossiers)
4. [Couche de Données](#4-couche-de-données)
5. [Couche API](#5-couche-api)
6. [Couche Présentation](#6-couche-présentation)
7. [Modules Utilitaires](#7-modules-utilitaires)
8. [Design System](#8-design-system)
9. [Flux de Données](#9-flux-de-données)
10. [Évolution & Migration](#10-évolution--migration)

---

## 1. Vue d'Ensemble

### 1.1 Objectif du Système

Blaiz'bot est une **plateforme éducative modulaire** conçue pour :
- **Enseignants** : Gestion de classes, création de contenu, suivi élèves
- **Élèves** : Apprentissage assisté par IA, projets créatifs, progression
- **Administrateurs** : Pilotage, statistiques, gestion organisationnelle

### 1.2 Principes Architecturaux

```
┌─────────────────────────────────────────────────────────┐
│  ARCHITECTURE EN 4 COUCHES (Layer Architecture)         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  [1] Présentation Layer    →  HTML Views + UI Logic    │
│  [2] API Abstraction Layer →  Façade Mock/Backend      │
│  [3] Data Layer            →  Mock Data + Types        │
│  [4] Utilities Layer       →  Helpers + Constants      │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Avantages :**
- ✅ **Séparation des préoccupations** (Separation of Concerns)
- ✅ **Testabilité** : Chaque couche est isolée
- ✅ **Évolutivité** : Migration backend sans toucher UI
- ✅ **AI-Readability** : Code clair et modulaire

---

## 2. Architecture Globale

### 2.1 Diagramme de Composants

```
┌────────────────────────────────────────────────────────────────┐
│                      BLAIZ'BOT PLATFORM                        │
└────────────────────────────────────────────────────────────────┘

┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  teacher.html   │  │  student.html   │  │   admin.html    │
│                 │  │                 │  │                 │
│  • Dashboard    │  │  • Progression  │  │  • Users Mgmt   │
│  • Calendar     │  │  • Blaiz'bot AI │  │  • Statistics   │
│  • Messaging    │  │  • Lab Projects │  │  • Programs     │
└────────┬────────┘  └────────┬────────┘  └────────┬────────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │   style.css       │
                    │   (Design System) │
                    └─────────┬─────────┘
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
┌────────▼────────┐  ┌────────▼────────┐  ┌───────▼────────┐
│  teacher.js     │  │  student.js     │  │   admin.js     │
│  (Original)     │  │  (Original)     │  │  (Original)    │
└────────┬────────┘  └────────┬────────┘  └────────┬────────┘
         │                    │                     │
         └────────────────────┼─────────────────────┘
                              │
           ┌──────────────────┴──────────────────┐
           │       /js/api/   (Abstraction)      │
           │  ┌─────────────────────────────┐    │
           │  │  TeacherAPI  StudentAPI     │    │
           │  │  AdminAPI    BaseAPI        │    │
           │  └──────────┬──────────────────┘    │
           └─────────────┼───────────────────────┘
                         │
                ┌────────┴────────┐
                │                 │
         [Mock Mode]       [Production Mode]
                │                 │
        ┌───────▼─────┐   ┌───────▼──────┐
        │ mockData.js │   │ Backend API  │
        │ (Static)    │   │ (Node/Python)│
        └─────────────┘   └──────────────┘
```

### 2.2 Flux de Communication

```
USER INTERACTION
       ↓
   [HTML View]  (teacher.html, student.html, admin.html)
       ↓
   [Event Listener]  (addEventListener sur boutons, formulaires)
       ↓
   [Business Logic]  (teacher.js, student.js, admin.js)
       ↓
   [API Call]  (TeacherAPI.getClasses(), StudentAPI.getCourses())
       ↓
   [API Layer Decision]
       ├─→ [Mock Mode] → mockData.js (données simulées)
       └─→ [Prod Mode] → fetch() vers backend réel
       ↓
   [Response Processing]
       ↓
   [DOM Update]  (Mise à jour interface)
       ↓
   [Visual Feedback]  (Animation, message succès/erreur)
```

---

## 3. Structure des Dossiers

### 3.1 Arborescence Complète

```
wireframe-edu-app/
│
├── 📄 index.html                    # Portail de connexion
├── 📄 teacher.html                  # Dashboard enseignant
├── 📄 student.html                  # Dashboard élève
├── 📄 admin.html                    # Dashboard administrateur
├── 📄 style.css                     # Design System global
│
├── 📁 js/                           # JavaScript modulaire
│   ├── 📄 teacher.js                # Logique enseignant (Original - À refactoriser)
│   ├── 📄 student.js                # Logique élève (Original - À refactoriser)
│   ├── 📄 admin.js                  # Logique admin (Original - À refactoriser)
│   │
│   ├── 📁 api/                      # ✨ Couche API (NOUVEAU)
│   │   ├── 📄 base.api.js           # Classe de base avec fetch/mock
│   │   ├── 📄 teacher.api.js        # API enseignant (25 méthodes)
│   │   ├── 📄 student.api.js        # API élève (20 méthodes)
│   │   └── 📄 admin.api.js          # API admin (10 méthodes)
│   │
│   ├── 📁 modules/                  # ✨ Modules métier (FUTUR)
│   │   ├── 📄 calendar.js           # Module calendrier (Refactoring teacher.js)
│   │   ├── 📄 messaging.js          # Module messagerie
│   │   ├── 📄 ai-assistant.js       # Module chatbot Blaiz'bot
│   │   ├── 📄 lab.js                # Module Lab projets
│   │   └── 📄 progression.js        # Module suivi progression
│   │
│   └── 📁 utils/                    # ✨ Utilitaires (NOUVEAU)
│       ├── 📄 modals.js             # ModalManager centralisé
│       ├── 📄 dom.js                # Helpers DOM (createElement, etc.)
│       ├── 📄 validation.js         # Validation formulaires
│       └── 📄 formatters.js         # Formatage dates, nombres
│
├── 📁 data/                         # ✨ Données & Types (NOUVEAU)
│   ├── 📄 types.js                  # Typage JSDoc (40 @typedef)
│   └── 📄 mockData.js               # Mock data structurées (500+ lignes)
│
├── 📁 constants/                    # ✨ Constantes (NOUVEAU)
│   └── 📄 app.constants.js          # Couleurs, messages, config
│
├── 📁 docs/                         # ✨ Documentation (NOUVEAU)
│   ├── 📄 ARCHITECTURE.md           # Ce document
│   ├── 📄 API_REFERENCE.md          # Documentation API (à créer)
│   └── 📁 screenshots/              # Captures d'écran
│
├── 📁 .vscode/                      # Configuration VSCode
│   └── 📄 tasks.json
│
└── 📄 README.md                     # Documentation projet
└── 📄 VIBECODING_JOURNEY.md         # Document exposé académique
└── 📄 TECHNICAL_DOCS.md             # Documentation technique
```

### 3.2 Métriques par Dossier

| Dossier | Fichiers | Lignes de Code | Rôle |
|---------|----------|----------------|------|
| `/` (root) | 4 HTML + 1 CSS | ~3,800 | Présentation |
| `/js/` (legacy) | 3 JS | ~2,140 | Logique métier (à modulariser) |
| `/js/api/` | 4 JS | ~800 | Abstraction API |
| `/js/utils/` | 1 JS | ~350 | Utilitaires |
| `/data/` | 2 JS | ~1,050 | Données & Types |
| `/constants/` | 1 JS | ~400 | Configuration |
| `/docs/` | N/A | N/A | Documentation |
| **TOTAL** | **16 fichiers** | **~8,540 lignes** | **Système complet** |

---

## 4. Couche de Données

### 4.1 Types (JSDoc)

**Fichier :** [`/data/types.js`](../data/types.js)

**Contenu :** 40 définitions `@typedef` pour typage JavaScript sans compilation.

**Exemples :**

```javascript
/**
 * @typedef {Object} Student
 * @property {string} id - Identifiant unique
 * @property {string} name - Nom complet
 * @property {string} classId - Classe (ex: "6A")
 * @property {number} progressPercentage - Progression 0-100
 */

/**
 * @typedef {Object} TeacherEvent
 * @property {string} id - Identifiant unique
 * @property {string} startDate - YYYY-MM-DD
 * @property {string} endDate - YYYY-MM-DD
 * @property {string} title - Titre événement
 * @property {string[]} studentIds - IDs élèves ("all" pour tous)
 */
```

**Utilisation :**
```javascript
/// <reference path="./types.js" />

/**
 * @param {Student} student
 * @returns {string}
 */
function getStudentName(student) {
    return student.name; // ← Autocomplétion VSCode
}
```

### 4.2 Mock Data

**Fichier :** [`/data/mockData.js`](../data/mockData.js)

**Structure :**

```javascript
export const teacherData = {
    classes: {
        '6A': [/* 6 élèves */],
        '3B': [/* 5 élèves */],
        '5C': [/* 4 élèves */]
    },
    subjects: {
        'Maths': ['Chapitre 1', 'Chapitre 2', ...],
        'Histoire': [...],
        // ...
    }
};

export const teacherEvents = [
    { id: 'event1', startDate: '2025-12-22', title: 'Devoir Maths', ... },
    // ...
];

export const studentProgressSample = {
    studentId: 'student1',
    overallProgress: 85,
    competencies: [/* 4 compétences */],
    // ...
};

// + 10 autres exports (labProjects, messages, etc.)
```

**Helpers inclus :**

```javascript
export function getStudentById(studentId) { /* ... */ }
export function getEventsByDate(dateStr) { /* ... */ }
export function generateId(prefix) { /* ... */ }
```

---

## 5. Couche API

### 5.1 Architecture API

```
┌─────────────────────────────────────────────────────┐
│              BaseAPI (Classe Abstraite)              │
├─────────────────────────────────────────────────────┤
│  • get(endpoint, options)                           │
│  • post(endpoint, data, options)                    │
│  • put(endpoint, data, options)                     │
│  • delete(endpoint, options)                        │
│  • _mockDelay() → Simulation latence réseau        │
│  • _fetchWithTimeout() → Gestion timeout           │
│  • setMockMode(boolean) → Toggle Mock/Prod         │
└──────────────────────┬──────────────────────────────┘
                       │
         ┌─────────────┼─────────────┐
         │             │             │
┌────────▼────────┐ ┌──▼──────────┐ ┌▼────────────┐
│  TeacherAPI     │ │ StudentAPI  │ │  AdminAPI   │
│  (extends Base) │ │ (extends)   │ │ (extends)   │
├─────────────────┤ ├─────────────┤ ├─────────────┤
│ • getClasses()  │ │ •getProgress│ │ •getTeachers│
│ • getEvents()   │ │ •getCourses │ │ •getStudents│
│ • createCourse()│ │ •sendAIMsg  │ │ •getStats() │
│ • sendMessage() │ │ •submitExer │ │             │
│ (25 méthodes)   │ │ (20 méth.)  │ │ (10 méth.)  │
└─────────────────┘ └─────────────┘ └─────────────┘
```

### 5.2 Exemple : TeacherAPI

**Fichier :** [`/js/api/teacher.api.js`](../js/api/teacher.api.js)

```javascript
import { BaseAPI } from './base.api.js';
import mockData from '../../data/mockData.js';

export class TeacherAPI extends BaseAPI {
    /**
     * Récupère toutes les classes de l'enseignant.
     * @returns {Promise<APIResponse<Object.<string, Student[]>>>}
     */
    static async getClasses() {
        if (this._isMockMode()) {
            return this._mockDelay(() => ({
                success: true,
                data: mockData.teacherData.classes,
                message: 'Classes récupérées'
            }));
        }

        return this.get('/teacher/classes'); // ← Appel backend réel
    }

    // ... 24 autres méthodes
}
```

**Utilisation dans teacher.js :**

```javascript
// Avant (couplage fort)
const classes = teacherData.classes; // ❌ Hardcodé

// Après (abstraction API)
const response = await TeacherAPI.getClasses(); // ✅
if (response.success) {
    const classes = response.data;
    // Traitement...
}
```

### 5.3 Pattern : Mock/Production Switch

**Configuration :**

```javascript
// base.api.js
const API_CONFIG = {
    USE_MOCK_DATA: true, // ← false pour backend réel
    BASE_URL: 'http://localhost:3000/api'
};
```

**Avantage :** Développement avec mock → Production avec 1 ligne changée.

---

## 6. Couche Présentation

### 6.1 HTML Structure

**Pattern Sémantique :**

```html
<body>
    <!-- Sidebar Navigation -->
    <aside class="sidebar">
        <nav>
            <a href="#dashboard" class="nav-link active" data-section="dashboard">
                📊 Tableau de Bord
            </a>
            <a href="#classes" class="nav-link" data-section="mes-classes">
                🎓 Mes Classes
            </a>
            <!-- ... -->
        </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
        <!-- Section Dashboard -->
        <section id="dashboard" class="content-section active">
            <h2>Tableau de Bord</h2>
            <!-- Contenu... -->
        </section>

        <!-- Section Classes -->
        <section id="mes-classes" class="content-section">
            <h2>Mes Classes</h2>
            <!-- Contenu... -->
        </section>
    </main>

    <!-- Modales -->
    <div id="modal-create-course" class="modal">
        <div class="modal-content">
            <h3>Créer un Cours</h3>
            <form><!-- ... --></form>
        </div>
    </div>
</body>
```

**Convention :**
- `data-section` : Liaison sidebar ↔ section
- `class="content-section"` : Sections principales
- `class="modal"` : Modales réutilisables

### 6.2 JavaScript Event Handling

**Pattern :**

```javascript
// 1. Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    renderDashboard();
    attachEventListeners();
});

// 2. Navigation entre sections
function initNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.dataset.section;
            showSection(sectionId);
        });
    });
}

// 3. Affichage section
function showSection(sectionId) {
    // Masquer toutes les sections
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
    });

    // Afficher section ciblée
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
    }
}
```

---

## 7. Modules Utilitaires

### 7.1 ModalManager

**Fichier :** [`/js/utils/modals.js`](../js/utils/modals.js)

**Responsabilité :** Gestion centralisée de toutes les modales.

**Méthodes :**

```javascript
ModalManager.open('modal-create-course', {
    data: { subject: 'Maths' },
    onConfirm: (formData) => console.log('Créé:', formData),
    onCancel: () => console.log('Annulé')
});

ModalManager.close('modal-create-course');

ModalManager.getFormData('modal-create-course'); // → { title: '...', ... }

ModalManager.isOpen('modal-create-course'); // → true/false
```

**Avantages :**
- ✅ **DRY** : Plus de duplication openModal/closeModal
- ✅ **Callbacks** : Gestion cohérente confirmation/annulation
- ✅ **Accessibilité** : Fermeture Escape, focus trap

### 7.2 Constantes Globales

**Fichier :** [`/constants/app.constants.js`](../constants/app.constants.js)

**Exports :**

```javascript
export const COLORS = {
    PRIMARY: '#3498db',
    SECONDARY: '#2ecc71',
    ACCENT: '#e74c3c'
};

export const MESSAGES = {
    SUCCESS_SAVE: 'Enregistrement réussi ✓',
    ERROR_GENERIC: 'Une erreur est survenue'
};

export const SELECTORS = {
    CALENDAR_GRID: '#calendar-grid',
    NAV_LINK: '.nav-link'
};

export const MONTHS_FR = ['Janvier', 'Février', ...];
```

**Utilisation :**

```javascript
import { COLORS, MESSAGES, MONTHS_FR } from './constants/app.constants.js';

button.style.backgroundColor = COLORS.PRIMARY; // ✅ Pas de #3498db hardcodé
alert(MESSAGES.SUCCESS_SAVE);
```

---

## 8. Design System

### 8.1 CSS Variables (`:root`)

**Fichier :** [`style.css`](../style.css)

```css
:root {
    /* Couleurs */
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --accent-color: #e74c3c;
    --text-dark: #2c3e50;
    --text-light: #ecf0f1;

    /* Espacements (8px grid) */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;

    /* Typographie */
    --font-main: 'Segoe UI', Tahoma, sans-serif;
    --font-size-base: 16px;
    --font-size-lg: 18px;

    /* Ombres */
    --shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
    --shadow-md: 0 4px 8px rgba(0,0,0,0.15);

    /* Transitions */
    --transition-fast: 0.15s ease;
    --transition-normal: 0.3s ease;
}
```

### 8.2 Composants Réutilisables

**Boutons :**

```css
.button {
    padding: var(--spacing-md) var(--spacing-lg);
    background: var(--primary-color);
    color: var(--text-light);
    border: none;
    border-radius: 8px;
    font-size: var(--font-size-base);
    cursor: pointer;
    transition: all var(--transition-normal);
}

.button:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.button.secondary {
    background: var(--secondary-color);
}

.button.accent {
    background: var(--accent-color);
}
```

**Cards :**

```css
.card {
    background: white;
    padding: var(--spacing-lg);
    border-radius: 12px;
    box-shadow: var(--shadow-sm);
    transition: all var(--transition-normal);
}

.card:hover {
    box-shadow: var(--shadow-md);
}
```

---

## 9. Flux de Données

### 9.1 Exemple Complet : Création d'Événement

```
[1] USER ACTION
    ↓
    Click "Créer événement" button
    ↓
[2] MODAL OPENING
    ↓
    ModalManager.open('modal-event-create', {
        data: { classId: '6A' },
        onConfirm: handleEventCreation
    });
    ↓
[3] USER FILLS FORM
    ↓
    { title: 'Devoir Maths', date: '2026-01-15', ... }
    ↓
[4] FORM SUBMISSION
    ↓
    handleEventCreation(formData)
    ↓
[5] API CALL
    ↓
    const response = await TeacherAPI.createEvent(formData);
    ↓
[6] API PROCESSING
    ↓
    [Mock Mode] → mockData.teacherEvents.push(newEvent)
    [Prod Mode] → fetch('/api/teacher/events', { method: 'POST', ... })
    ↓
[7] RESPONSE HANDLING
    ↓
    if (response.success) {
        showSuccessMessage('Événement créé ✓');
        renderCalendar(currentDate); // Rafraîchir affichage
        ModalManager.close('modal-event-create');
    } else {
        showErrorMessage(response.error.message);
    }
```

### 9.2 Diagramme de Séquence

```
User          UI              API Layer        Mock Data
 │             │                  │                │
 │   Click     │                  │                │
 ├────────────>│                  │                │
 │             │  openModal()     │                │
 │             ├─────────────────>│                │
 │             │                  │                │
 │  Fill Form  │                  │                │
 ├────────────>│                  │                │
 │             │  submit()        │                │
 │             ├─────────────────>│                │
 │             │                  │  createEvent() │
 │             │                  ├───────────────>│
 │             │                  │                │
 │             │                  │ ← return data  │
 │             │                  │<───────────────│
 │             │ ← response       │                │
 │             │<─────────────────│                │
 │  ← Success  │                  │                │
 │<────────────│                  │                │
 │             │  renderUI()      │                │
 │             ├──────────┐       │                │
 │             │          │       │                │
 │  Visual     │<─────────┘       │                │
 │  Update     │                  │                │
 │<────────────│                  │                │
```

---

## 10. Évolution & Migration

### 10.1 Roadmap Architecture

#### Phase 1 : Wireframe (ACTUEL)
```
✅ HTML/CSS/JS Vanilla
✅ Mock data inline
✅ Aucune dépendance
✅ Fonctionnel en 11h
```

#### Phase 2 : Refactoring (EN COURS)
```
✅ Extraction mock data → /data/mockData.js
✅ API abstraction layer → /js/api/*.api.js
✅ Typage JSDoc → /data/types.js
✅ Constantes → /constants/app.constants.js
🔄 Modularisation → /js/modules/*.js (À FAIRE)
```

#### Phase 3 : Backend Intégration (3-6 mois)
```
🔄 Backend API : Node.js + Express ou Python + FastAPI
🔄 Base de données : PostgreSQL ou MongoDB
🔄 Authentification : JWT + OAuth
🔄 Switch USE_MOCK_DATA = false
```

#### Phase 4 : Production (6-12 mois)
```
🔄 Migration React/Vue (optionnel si validé)
🔄 CI/CD : GitHub Actions
🔄 Monitoring : Sentry + Analytics
🔄 Tests automatisés : Jest/Vitest
🔄 Déploiement : Vercel/AWS/Azure
```

### 10.2 Migration Backend (Scénario)

**Avant (Mock) :**

```javascript
// teacher.js
const response = await TeacherAPI.getClasses();
// → Retourne mockData.teacherData.classes
```

**Après (Backend) :**

```javascript
// base.api.js
const API_CONFIG = {
    USE_MOCK_DATA: false, // ← Changement 1 ligne
    BASE_URL: 'https://api.blaizbot.com'
};

// teacher.js (INCHANGÉ)
const response = await TeacherAPI.getClasses();
// → Retourne fetch('https://api.blaizbot.com/teacher/classes')
```

**Résultat :** 0 modification du code métier.

### 10.3 Migration Framework (Si nécessaire)

**Stratégie Progressive :**

1. **Garder design system** : Réutiliser variables CSS
2. **Garder API layer** : Importer dans composants React/Vue
3. **Garder types** : Convertir JSDoc → TypeScript interfaces
4. **Migrer composant par composant** :
   ```
   Semaine 1 : Dashboard enseignant → React
   Semaine 2 : Calendrier → React Component
   Semaine 3 : Messaging → React Component
   ...
   ```

**Avantage Vibecoding :** Architecture propre = migration facilitée.

---

## Conclusion

L'architecture de Blaiz'bot démontre qu'un système **vanilla bien structuré** peut rivaliser avec des frameworks modernes pour du prototypage rapide.

**Points clés :**
- ✅ **Layered Architecture** : Séparation présentation/API/données
- ✅ **API Abstraction** : Migration backend transparente
- ✅ **Design System** : Cohérence visuelle via CSS Variables
- ✅ **Modularité** : Évolution progressive sans refonte totale
- ✅ **AI-Readability** : Code clair, types explicites, structure logique

**Cette architecture est optimisée pour :**
- 🚀 Prototypage ultra-rapide (11h pour MVP)
- 🤖 Collaboration Humain-IA efficace
- 📈 Évolution contrôlée (wireframe → production)
- 🎓 Pédagogie (code simple à comprendre)

---

**Document technique : ARCHITECTURE.md**
*Version 1.0 - 21 Décembre 2025*
*Équipe Blaiz'bot - Vibecoding Methodology*
