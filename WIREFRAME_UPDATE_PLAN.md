# 🎨 Plan de Mise à Jour du Wireframe - BlaizBot

> **Date** : 10 Décembre 2025
> **Objectif** : Synchroniser le wireframe HTML statique avec l'application Next.js finale développée
> **Contexte** : L'application BlaizBot-V1 est terminée. Le wireframe doit refléter toutes les évolutions (nouvelles pages, fonctionnalités, composants) pour rester une source de vérité visuelle.

---

## 📊 Analyse des Écarts

### Vue d'Ensemble

| Interface | Pages Wireframe | Pages App Finale | Écart |
|-----------|-----------------|------------------|-------|
| **Élève** | 8 sections | 7 routes + sous-routes | ✅ Proche |
| **Professeur** | 8 sections | 6 routes + sous-routes | ⚠️ Écarts |
| **Admin** | 9 sections | 3 routes principales | ❌ Écarts majeurs |

---

## 🎯 Objectifs de Mise à Jour

### 1. Aligner la Navigation (Sidebar)

**Wireframe actuel** : Sections statiques dans une page unique
**App finale** : Routes Next.js avec navigation dynamique

**Action** : Garder l'approche single-page du wireframe mais ajouter les nouvelles routes dans les onglets.

### 2. Ajouter les Nouvelles Fonctionnalités

**Nouvelles features à intégrer** :
- 🎓 **Coach Privé** (Élève) : Dashboard KPIs, badges, recommandations IA
- 📅 **Agenda** (Élève) : Vue calendrier avec filtres (cours/devoirs/événements)
- 🏋️ **Exercices interactifs** (Élève) : Quiz et exercices avec correction IA
- 📊 **Artefacts générés** (Élève) : Synthèses, flashcards, mindmaps sauvegardés
- 📚 **Assignments** (Professeur) : CRUD devoirs avec filtres avancés
- 👥 **Gestion élèves** (Professeur) : Suivi individuel + analytics

### 3. Moderniser le Design

**Améliorations visuelles** :
- Design System cohérent (couleurs, espacement, typo)
- Components UI shadcn/ui (Cards, Badges, Dialogs)
- Responsive mobile
- États de chargement et erreurs

### 4. Synchroniser les Données Mock

**mockData.js** : Ajouter les nouvelles entités (Assignments, Coach Stats, Artefacts, etc.)

---

## 📝 Plan d'Action Détaillé

### Phase 1 : Interface ÉLÈVE (`student.html`)

#### 1.1 Navigation Sidebar - AJOUTS

**Wireframe actuel** :
```
MON PARCOURS
├── Ma Progression
├── Mes Cours
├── Mes Exercices
└── Centre de Communication

ASSISTANCE IA
├── Mon Assistant IA
├── Blaiz'bot Lab
├── Base de connaissances
└── Planning de Révision
```

**Wireframe mis à jour** :
```
MON PARCOURS
├── Ma Progression (dashboard)
├── Mon Coach Privé ✨ NOUVEAU
├── Mes Cours
├── Mes Exercices
├── Agenda ✨ NOUVEAU
└── Centre de Communication

ASSISTANCE IA
├── Mon Assistant IA
├── Blaiz'bot Lab
├── Base de connaissances
└── Planning de Révision
```

#### 1.2 Nouvelle Section : Mon Coach Privé (`section-coach`)

**Route app** : `/student/coach`

**Composants à ajouter** :

##### Dashboard KPIs
```html
<div class="stats-grid">
  <div class="stats-card">
    <h3>🎯 Objectifs de la Semaine</h3>
    <div class="stats-value">3/5</div>
    <div class="performance-bar-container">
      <div class="performance-bar" style="width: 60%;"></div>
    </div>
  </div>
  
  <div class="stats-card">
    <h3>⚡ Points d'XP</h3>
    <div class="stats-value">1,247</div>
    <p>+125 cette semaine</p>
  </div>
  
  <div class="stats-card">
    <h3>🔥 Série en cours</h3>
    <div class="stats-value">7 jours</div>
    <p>Record : 12 jours</p>
  </div>
  
  <div class="stats-card">
    <h3>🏆 Badges Débloqués</h3>
    <div class="stats-value">8/20</div>
  </div>
</div>
```

##### Badges et Achievements
```html
<div class="badges-grid">
  <div class="badge-card unlocked">
    <div class="badge-icon">🌟</div>
    <h4>Première Victoire</h4>
    <p class="badge-date">Débloqué le 10 janv.</p>
  </div>
  
  <div class="badge-card locked">
    <div class="badge-icon">🔒</div>
    <h4>Expert Maths</h4>
    <p class="badge-requirement">10/20 quiz parfaits</p>
  </div>
</div>
```

##### Recommandations IA
```html
<div class="recommendations-panel">
  <h3>💡 Blaiz'bot te recommande</h3>
  <div class="recommendation-card">
    <span class="tag" style="background: #e3f2fd;">Maths</span>
    <p>Tu as du mal avec les fractions. Révise le chapitre 3 📚</p>
    <button class="btn-secondary">Voir le cours</button>
  </div>
</div>
```

**Données Mock à ajouter** :
```javascript
// data/mockData.js
coachStats: {
  weeklyGoals: { completed: 3, total: 5 },
  xpPoints: 1247,
  streak: { current: 7, record: 12 },
  badges: { unlocked: 8, total: 20 }
},
achievements: [
  { id: 1, name: "Première Victoire", icon: "🌟", unlocked: true, date: "2026-01-10" },
  { id: 2, name: "Expert Maths", icon: "🔒", unlocked: false, requirement: "10/20 quiz parfaits" }
],
recommendations: [
  { subject: "Maths", message: "Tu as du mal avec les fractions...", action: "Voir le cours" }
]
```

#### 1.3 Nouvelle Section : Agenda (`section-agenda`)

**Route app** : `/student/agenda`

**Composants à ajouter** :

##### Filtres Sidebar
```html
<aside class="filters-sidebar">
  <h3>Filtres</h3>
  
  <div class="filter-group">
    <label>Type d'événement</label>
    <label><input type="checkbox" checked> Cours</label>
    <label><input type="checkbox" checked> Devoirs</label>
    <label><input type="checkbox" checked> Événements</label>
  </div>
  
  <div class="filter-group">
    <label>Matières</label>
    <label><input type="checkbox" checked> Mathématiques</label>
    <label><input type="checkbox" checked> Français</label>
    <label><input type="checkbox"> Anglais</label>
  </div>
</aside>
```

##### Vue Calendrier
```html
<div class="calendar-view">
  <div class="calendar-header">
    <button class="btn-secondary">◀ Mois</button>
    <h3>Janvier 2026</h3>
    <button class="btn-secondary">Mois ▶</button>
  </div>
  
  <div class="calendar-grid">
    <!-- Grille 7x5 avec événements -->
    <div class="calendar-day">
      <span class="day-number">15</span>
      <div class="event-dot cours"></div>
      <div class="event-dot devoir"></div>
    </div>
  </div>
</div>
```

##### Vue Liste (toggle)
```html
<div class="agenda-list">
  <div class="agenda-item">
    <span class="event-type cours">Cours</span>
    <h4>Mathématiques - Les Fractions</h4>
    <p>🕐 15 janv. 2026 • 14h00-15h30</p>
  </div>
  
  <div class="agenda-item">
    <span class="event-type devoir">Devoir</span>
    <h4>Exercice Chapitre 3</h4>
    <p>📅 Échéance : 17 janv. 2026</p>
  </div>
</div>
```

**Données Mock à ajouter** :
```javascript
agendaEvents: [
  { 
    id: 1, 
    type: "cours", 
    title: "Mathématiques - Les Fractions", 
    date: "2026-01-15", 
    startTime: "14:00", 
    endTime: "15:30",
    subject: "Maths"
  },
  { 
    id: 2, 
    type: "devoir", 
    title: "Exercice Chapitre 3", 
    dueDate: "2026-01-17",
    subject: "Maths"
  }
]
```

#### 1.4 Section Exercices - AMÉLIORATIONS

**Ajouts** :

##### Quiz Interactif
```html
<div class="quiz-container">
  <div class="quiz-header">
    <h3>Quiz : Les Fractions</h3>
    <span class="quiz-progress">Question 2/10</span>
  </div>
  
  <div class="quiz-question">
    <p>Calculez : 3/4 + 1/2 = ?</p>
    
    <div class="quiz-options">
      <button class="quiz-option">A) 4/6</button>
      <button class="quiz-option">B) 5/4</button>
      <button class="quiz-option active">C) 5/8</button>
      <button class="quiz-option">D) 1/2</button>
    </div>
  </div>
  
  <div class="quiz-actions">
    <button class="btn-secondary">◀ Précédent</button>
    <button class="btn-primary">Valider</button>
    <button class="btn-secondary">Suivant ▶</button>
  </div>
</div>
```

##### Correction IA
```html
<div class="ai-feedback">
  <h4>✅ Bonne réponse !</h4>
  <p>Explication : Pour additionner des fractions, il faut d'abord trouver un dénominateur commun...</p>
  <button class="btn-link">Voir la méthode complète</button>
</div>
```

#### 1.5 Section Assistant IA - AJOUT Artefacts Sauvegardés

**Onglet supplémentaire** : "Mes Artefacts"

```html
<div class="tab-content" id="tab-artefacts">
  <div class="artefacts-grid">
    <div class="artefact-card">
      <span class="artefact-type">📝 Synthèse</span>
      <h4>Chapitre 3 : Les Fractions</h4>
      <p class="artefact-date">Créé le 14 janv.</p>
      <button class="btn-secondary">Voir</button>
    </div>
    
    <div class="artefact-card">
      <span class="artefact-type">🧠 Flashcards</span>
      <h4>Vocabulaire Français</h4>
      <p class="artefact-date">Créé le 12 janv.</p>
      <button class="btn-secondary">Réviser</button>
    </div>
  </div>
</div>
```

**Données Mock** :
```javascript
savedArtefacts: [
  { 
    id: 1, 
    type: "synthese", 
    title: "Chapitre 3 : Les Fractions", 
    createdAt: "2026-01-14",
    content: "..."
  },
  { 
    id: 2, 
    type: "flashcards", 
    title: "Vocabulaire Français", 
    createdAt: "2026-01-12",
    cards: [...]
  }
]
```

---

### Phase 2 : Interface PROFESSEUR (`teacher.html`)

#### 2.1 Navigation Sidebar - AJOUTS

**Wireframe actuel** :
```
MON ACTIVITÉ
├── Tableau de bord
├── Mes Matières
├── Mes Classes
├── Mes Élèves
├── Mes Cours & Contenus
├── Gestion des Attributions
├── Planning & Agenda
└── Messagerie
```

**Wireframe mis à jour** :
```
MON ACTIVITÉ
├── Tableau de bord
├── Mes Matières (lecture seule)
├── Mes Classes
├── Mes Élèves
├── Mes Cours & Contenus
├── Gestion des Devoirs ✨ RENOMMÉ (ex: Attributions)
├── Planning & Agenda
└── Messagerie
```

#### 2.2 Section Gestion des Devoirs - REFONTE COMPLÈTE

**Route app** : `/teacher/assignments`

**Nouvelle structure** :

##### Filtres Avancés (Sidebar)
```html
<aside class="filters-sidebar">
  <h3>Filtres</h3>
  
  <div class="filter-group">
    <label>Statut</label>
    <label><input type="radio" name="status" checked> Tous</label>
    <label><input type="radio" name="status"> À venir</label>
    <label><input type="radio" name="status"> En cours</label>
    <label><input type="radio" name="status"> Terminés</label>
  </div>
  
  <div class="filter-group">
    <label>Classes</label>
    <select multiple>
      <option>6ème A</option>
      <option>3ème B</option>
    </select>
  </div>
  
  <div class="filter-group">
    <label>Matières</label>
    <select multiple>
      <option>Mathématiques</option>
      <option>Français</option>
    </select>
  </div>
  
  <div class="filter-group">
    <label>Sections</label>
    <label><input type="checkbox"> Chapitre 1</label>
    <label><input type="checkbox"> Chapitre 2</label>
  </div>
</aside>
```

##### Vues : Calendrier / Liste / Grille

**Vue Calendrier** :
```html
<div class="assignments-calendar">
  <!-- Similaire à l'agenda élève -->
  <div class="calendar-grid">
    <div class="calendar-day">
      <span class="day-number">17</span>
      <div class="assignment-indicator">
        <span class="badge">3</span> devoirs
      </div>
    </div>
  </div>
</div>
```

**Vue Liste** :
```html
<table class="data-table">
  <thead>
    <tr>
      <th>Titre</th>
      <th>Classes</th>
      <th>Matière</th>
      <th>Type</th>
      <th>Échéance</th>
      <th>Statut</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Exercice Fractions</td>
      <td><span class="tag">6ème A</span></td>
      <td>Maths</td>
      <td>Quiz</td>
      <td>17 janv. 2026</td>
      <td><span class="status-pill ongoing">En cours</span></td>
      <td>
        <button class="btn-icon">✎</button>
        <button class="btn-icon">📊</button>
        <button class="btn-icon">🗑</button>
      </td>
    </tr>
  </tbody>
</table>
```

**Vue Grille** :
```html
<div class="assignments-grid">
  <div class="assignment-card">
    <div class="card-header">
      <h4>Exercice Fractions</h4>
      <span class="status-pill ongoing">En cours</span>
    </div>
    <div class="card-meta">
      <span class="tag">6ème A</span>
      <span class="tag">Maths</span>
    </div>
    <p>📅 Échéance : 17 janv. 2026</p>
    <div class="card-stats">
      <span>✅ 12/25 rendus</span>
    </div>
    <div class="card-actions">
      <button class="btn-secondary">Modifier</button>
      <button class="btn-secondary">Voir les résultats</button>
    </div>
  </div>
</div>
```

##### Modal Nouveau Devoir - REFONTE

**Ancien** : Simple formulaire
**Nouveau** : Wizard multi-étapes

```html
<div class="modal" id="modal-new-assignment">
  <div class="modal-content" style="max-width: 700px;">
    <div class="modal-header">
      <h2>Créer un Devoir</h2>
    </div>
    
    <!-- Stepper -->
    <div class="stepper">
      <div class="step active">1. Informations</div>
      <div class="step">2. Contenu</div>
      <div class="step">3. Configuration IA</div>
      <div class="step">4. Attribution</div>
    </div>
    
    <!-- Step 1 : Informations -->
    <div class="step-content active" data-step="1">
      <label>Titre du devoir</label>
      <input type="text" placeholder="Ex: Exercice sur les fractions">
      
      <label>Type</label>
      <select>
        <option>Quiz</option>
        <option>Exercice libre</option>
        <option>Projet</option>
      </select>
      
      <label>Matière</label>
      <select>
        <option>Mathématiques</option>
        <option>Français</option>
      </select>
      
      <label>Section/Chapitre</label>
      <select>
        <option>Chapitre 3 : Les Fractions</option>
      </select>
      
      <label>Date d'échéance</label>
      <input type="date">
    </div>
    
    <!-- Step 2 : Contenu -->
    <div class="step-content" data-step="2">
      <label>Instructions pour les élèves</label>
      <textarea rows="4"></textarea>
      
      <label>Documents de référence</label>
      <div class="file-upload-zone">
        <button class="btn-secondary">📎 Ajouter des fichiers</button>
      </div>
    </div>
    
    <!-- Step 3 : Config IA -->
    <div class="step-content" data-step="3">
      <label>
        <input type="checkbox" checked>
        Activer l'assistance IA pour ce devoir
      </label>
      
      <label>Directives pour l'IA</label>
      <textarea placeholder="Ex: L'IA peut expliquer la méthode mais ne doit pas donner les réponses directement"></textarea>
      
      <label>Niveau d'aide autorisé</label>
      <select>
        <option>Minimal (indices uniquement)</option>
        <option>Modéré (explications)</option>
        <option>Complet (correction interactive)</option>
      </select>
    </div>
    
    <!-- Step 4 : Attribution -->
    <div class="step-content" data-step="4">
      <label>Attribuer à</label>
      <div class="target-selection">
        <label><input type="radio" name="target"> Toutes mes classes</label>
        <label><input type="radio" name="target"> Classes spécifiques</label>
        <label><input type="radio" name="target"> Élèves spécifiques</label>
      </div>
      
      <div class="classes-checkboxes">
        <label><input type="checkbox"> 6ème A (25 élèves)</label>
        <label><input type="checkbox"> 3ème B (22 élèves)</label>
      </div>
    </div>
    
    <div class="modal-actions">
      <button class="btn-secondary" onclick="previousStep()">◀ Précédent</button>
      <button class="btn-primary" onclick="nextStep()">Suivant ▶</button>
      <button class="btn-primary" style="display:none;" onclick="createAssignment()">Créer le devoir</button>
    </div>
  </div>
</div>
```

#### 2.3 Section Mes Élèves - AJOUT Analytics

**Ajouts** :

##### Graphique de Progression
```html
<div class="student-analytics">
  <canvas id="student-progress-chart"></canvas>
</div>
```

##### Historique Interactions IA
```html
<div class="ia-interactions-timeline">
  <h4>Dernières interactions avec Blaiz'bot</h4>
  <div class="timeline-item">
    <span class="timeline-date">14 janv. 14h32</span>
    <p>Question sur les fractions (Maths)</p>
  </div>
  <div class="timeline-item">
    <span class="timeline-date">13 janv. 16h15</span>
    <p>Génération flashcards (Français)</p>
  </div>
</div>
```

---

### Phase 3 : Interface ADMIN (`admin.html`)

#### 3.1 Navigation Sidebar - RÉORGANISATION

**Wireframe mis à jour** :
```
ORGANISATION
├── Matières
├── Classes / Niveaux
└── Utilisateurs ✨ FUSIONNÉ (Profs + Élèves + Users)

PILOTAGE
└── Statistiques

CONFIGURATION
└── Paramètres IA
```

**Suppression** :
- Section "Professeurs" (fusionnée dans Utilisateurs)
- Section "Élèves" (fusionnée dans Utilisateurs)
- Section "Programmes" (fonctionnalité reportée)

#### 3.2 Section Utilisateurs - REFONTE COMPLÈTE

**Route app** : `/admin/users`

**Nouvelle structure** :

##### Onglets par Rôle
```html
<div class="tabs">
  <button class="tab active" data-tab="all">Tous (47)</button>
  <button class="tab" data-tab="admin">Admins (2)</button>
  <button class="tab" data-tab="teacher">Professeurs (8)</button>
  <button class="tab" data-tab="student">Élèves (37)</button>
</div>
```

##### Table Unifiée
```html
<table class="data-table">
  <thead>
    <tr>
      <th>Utilisateur</th>
      <th>Rôle</th>
      <th>Email</th>
      <th>Classe/Matières</th>
      <th>Dernière Connexion</th>
      <th>Statut</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <div class="user-cell">
          <div class="avatar">JP</div>
          <span>Jean PETIT</span>
        </div>
      </td>
      <td><span class="role-badge admin">Admin</span></td>
      <td>jean.petit@school.fr</td>
      <td>-</td>
      <td>14 janv. 2026 - 15h32</td>
      <td><span class="status-pill active">Actif</span></td>
      <td>
        <button class="btn-icon">✎</button>
        <button class="btn-icon">🔒</button>
        <button class="btn-icon">🗑</button>
      </td>
    </tr>
    
    <tr>
      <td>
        <div class="user-cell">
          <div class="avatar">MD</div>
          <span>Marie DUPONT</span>
        </div>
      </td>
      <td><span class="role-badge teacher">Prof</span></td>
      <td>marie.dupont@school.fr</td>
      <td>
        <span class="tag">Maths</span>
        <span class="tag">Physique</span>
      </td>
      <td>15 janv. 2026 - 09h12</td>
      <td><span class="status-pill active">Actif</span></td>
      <td>...</td>
    </tr>
    
    <tr>
      <td>
        <div class="user-cell">
          <div class="avatar">LM</div>
          <span>Lucas MARTIN</span>
        </div>
      </td>
      <td><span class="role-badge student">Élève</span></td>
      <td>lucas.martin@school.fr</td>
      <td><span class="tag">6ème A</span></td>
      <td>15 janv. 2026 - 10h45</td>
      <td><span class="status-pill active">Actif</span></td>
      <td>...</td>
    </tr>
  </tbody>
</table>
```

##### Modal Utilisateur - Formulaire Dynamique

```html
<div class="modal" id="modal-user">
  <div class="modal-content" style="max-width: 600px;">
    <h2>Créer un Utilisateur</h2>
    
    <!-- Sélection Rôle en premier -->
    <label>Rôle</label>
    <select id="user-role" onchange="updateFormFields(this.value)">
      <option value="admin">Administrateur</option>
      <option value="teacher">Professeur</option>
      <option value="student">Élève</option>
    </select>
    
    <!-- Champs communs -->
    <label>Nom</label>
    <input type="text">
    
    <label>Prénom</label>
    <input type="text">
    
    <label>Email</label>
    <input type="email">
    
    <label>Mot de passe</label>
    <input type="password">
    
    <!-- Champs conditionnels Professeur -->
    <div id="fields-teacher" style="display:none;">
      <label>Matières enseignées</label>
      <div class="checkbox-group">
        <label><input type="checkbox"> Mathématiques</label>
        <label><input type="checkbox"> Français</label>
        <label><input type="checkbox"> Histoire-Géo</label>
      </div>
      
      <label>Classes assignées</label>
      <div class="checkbox-group">
        <label><input type="checkbox"> 6ème A</label>
        <label><input type="checkbox"> 3ème B</label>
      </div>
    </div>
    
    <!-- Champs conditionnels Élève -->
    <div id="fields-student" style="display:none;">
      <label>Classe</label>
      <select>
        <option>6ème A</option>
        <option>5ème B</option>
        <option>3ème B</option>
      </select>
      
      <label>Email Parent (optionnel)</label>
      <input type="email">
    </div>
    
    <div class="modal-actions">
      <button class="btn-secondary" onclick="closeModal('modal-user')">Annuler</button>
      <button class="btn-primary">Créer</button>
    </div>
  </div>
</div>
```

#### 3.3 Suppression Section Programmes

Cette fonctionnalité n'a pas été implémentée dans l'app finale.
→ Supprimer complètement cette section du wireframe.

---

### Phase 4 : Composants UI Globaux

#### 4.1 Design System - Ajouts CSS

**Nouvelles classes à ajouter dans `style.css`** :

```css
/* === BADGES ET TAGS === */
.role-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.role-badge.admin {
  background: #f3e5f5;
  color: #7b1fa2;
}

.role-badge.teacher {
  background: #e3f2fd;
  color: #1976d2;
}

.role-badge.student {
  background: #e8f5e9;
  color: #388e3c;
}

/* === STATUS PILLS === */
.status-pill {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-pill.active {
  background: #e8f5e9;
  color: #2e7d32;
}

.status-pill.ongoing {
  background: #fff3e0;
  color: #e65100;
}

.status-pill.completed {
  background: #e0e0e0;
  color: #616161;
}

/* === AVATAR === */
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

/* === USER CELL === */
.user-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* === STEPPER === */
.stepper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  padding: 0 20px;
}

.step {
  flex: 1;
  text-align: center;
  padding: 10px;
  border-bottom: 3px solid #e0e0e0;
  color: #9e9e9e;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s;
}

.step.active {
  border-bottom-color: #3498db;
  color: #3498db;
}

.step.completed {
  border-bottom-color: #2ecc71;
  color: #2ecc71;
}

/* === FILTERS SIDEBAR === */
.filters-sidebar {
  width: 280px;
  background: #f8f9fa;
  border-right: 1px solid #dee2e6;
  padding: 20px;
  overflow-y: auto;
}

.filter-group {
  margin-bottom: 24px;
}

.filter-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.875rem;
}

.filter-group input[type="checkbox"],
.filter-group input[type="radio"] {
  margin-right: 8px;
}

/* === CALENDAR VIEW === */
.calendar-view {
  padding: 20px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}

.calendar-day {
  aspect-ratio: 1;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 8px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s;
}

.calendar-day:hover {
  background: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.day-number {
  font-weight: 600;
  font-size: 0.875rem;
}

.event-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 4px;
}

.event-dot.cours {
  background: #3498db;
}

.event-dot.devoir {
  background: #e74c3c;
}

.event-dot.evenement {
  background: #2ecc71;
}

/* === BADGES GRID === */
.badges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.badge-card {
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s;
}

.badge-card.unlocked {
  border-color: #ffd700;
  background: #fffef7;
}

.badge-card.locked {
  opacity: 0.5;
}

.badge-icon {
  font-size: 3rem;
  margin-bottom: 10px;
}

.badge-date,
.badge-requirement {
  font-size: 0.75rem;
  color: #757575;
  margin-top: 8px;
}

/* === ARTEFACTS === */
.artefacts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.artefact-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
}

.artefact-type {
  display: inline-block;
  padding: 4px 10px;
  background: #e3f2fd;
  border-radius: 6px;
  font-size: 0.75rem;
  margin-bottom: 10px;
}

.artefact-date {
  font-size: 0.75rem;
  color: #757575;
  margin: 8px 0;
}

/* === QUIZ === */
.quiz-container {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e0e0e0;
}

.quiz-progress {
  font-size: 0.875rem;
  color: #757575;
  font-weight: 500;
}

.quiz-question {
  margin: 30px 0;
}

.quiz-question p {
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 20px;
}

.quiz-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.quiz-option {
  padding: 16px 20px;
  background: #f8f9fa;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
}

.quiz-option:hover {
  background: #e9ecef;
}

.quiz-option.active {
  border-color: #3498db;
  background: #e3f2fd;
}

.quiz-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.ai-feedback {
  margin-top: 20px;
  padding: 20px;
  background: #e8f5e9;
  border-left: 4px solid #2ecc71;
  border-radius: 8px;
}

.ai-feedback h4 {
  color: #2e7d32;
  margin-bottom: 10px;
}
```

#### 4.2 Modules JS - Nouveaux Fichiers

**À créer** :

##### `js/modules/coach.js`
```javascript
export class CoachModule {
  constructor() {
    this.stats = null;
  }
  
  async loadStats() {
    // Fetch coach stats
  }
  
  renderDashboard(containerId) {
    // Render KPIs, badges, recommendations
  }
  
  unlockBadge(badgeId) {
    // Animation unlock badge
  }
}
```

##### `js/modules/agenda.js`
```javascript
export class AgendaModule {
  constructor() {
    this.events = [];
    this.filters = {
      types: ['cours', 'devoir', 'evenement'],
      subjects: []
    };
  }
  
  async loadEvents() {
    // Fetch events
  }
  
  applyFilters() {
    // Filter events
  }
  
  renderCalendar(containerId) {
    // Render calendar grid
  }
  
  renderList(containerId) {
    // Render list view
  }
  
  toggleView(view) {
    // Switch calendar/list
  }
}
```

##### `js/modules/assignments.js`
```javascript
export class AssignmentsModule {
  constructor(userRole) {
    this.role = userRole; // 'teacher' or 'student'
    this.assignments = [];
    this.currentView = 'list'; // 'list', 'calendar', 'grid'
  }
  
  async loadAssignments(filters = {}) {
    // Fetch assignments with filters
  }
  
  renderView(containerId) {
    // Render based on currentView
  }
  
  openCreationWizard() {
    // Open modal with stepper
  }
  
  submitAssignment(data) {
    // Submit new assignment
  }
}
```

##### `js/modules/quiz.js`
```javascript
export class QuizModule {
  constructor() {
    this.currentQuiz = null;
    this.currentQuestion = 0;
    this.answers = [];
  }
  
  async loadQuiz(quizId) {
    // Fetch quiz data
  }
  
  renderQuestion(questionIndex) {
    // Render question + options
  }
  
  selectAnswer(optionIndex) {
    // Mark answer
  }
  
  submitAnswer() {
    // Send to API, get AI feedback
  }
  
  renderFeedback(feedback) {
    // Show AI explanation
  }
  
  nextQuestion() {
    // Navigate
  }
}
```

---

### Phase 5 : Données Mock (`data/mockData.js`)

#### 5.1 Nouvelles Entités à Ajouter

```javascript
// Ajouts au fichier mockData.js

// === COACH STATS ===
export const coachStats = {
  weeklyGoals: {
    completed: 3,
    total: 5,
    goals: [
      { id: 1, title: "Terminer 5 quiz", completed: true },
      { id: 2, title: "Réviser Chapitre 3", completed: true },
      { id: 3, title: "Faire 10 flashcards", completed: true },
      { id: 4, title: "Lire 2 chapitres", completed: false },
      { id: 5, title: "Projet Maths", completed: false }
    ]
  },
  xpPoints: {
    current: 1247,
    weeklyGain: 125,
    level: 8,
    nextLevelAt: 1500
  },
  streak: {
    current: 7,
    record: 12
  },
  badges: {
    unlocked: [
      { 
        id: 1, 
        name: "Première Victoire", 
        icon: "🌟", 
        description: "Réussir ton premier quiz",
        unlockedAt: "2026-01-10" 
      },
      { 
        id: 2, 
        name: "Marathonien", 
        icon: "🏃", 
        description: "7 jours de suite",
        unlockedAt: "2026-01-15" 
      }
    ],
    locked: [
      { 
        id: 3, 
        name: "Expert Maths", 
        icon: "🔒", 
        description: "20 quiz parfaits",
        requirement: "10/20" 
      }
    ]
  },
  recommendations: [
    {
      id: 1,
      subject: "Mathématiques",
      type: "weakness",
      message: "Tu as du mal avec les fractions. Révise le chapitre 3 📚",
      action: { label: "Voir le cours", url: "/student/courses/3" }
    },
    {
      id: 2,
      subject: "Français",
      type: "opportunity",
      message: "Tu es proche d'un nouveau badge ! Complète 2 quiz de plus 🎯",
      action: { label: "Commencer un quiz", url: "/student/exercises" }
    }
  ]
};

// === AGENDA EVENTS ===
export const agendaEvents = [
  {
    id: 1,
    type: "cours",
    title: "Mathématiques - Les Fractions",
    subject: "Mathématiques",
    date: "2026-01-15",
    startTime: "14:00",
    endTime: "15:30",
    location: "Salle 203"
  },
  {
    id: 2,
    type: "devoir",
    title: "Exercice Chapitre 3",
    subject: "Mathématiques",
    dueDate: "2026-01-17",
    assignmentId: 5
  },
  {
    id: 3,
    type: "evenement",
    title: "Sortie Musée des Sciences",
    date: "2026-01-20",
    startTime: "09:00",
    endTime: "17:00"
  }
];

// === SAVED ARTEFACTS ===
export const savedArtefacts = [
  {
    id: 1,
    type: "synthese",
    title: "Chapitre 3 : Les Fractions",
    subject: "Mathématiques",
    createdAt: "2026-01-14",
    content: "# Les Fractions\n\n## Définition\n..."
  },
  {
    id: 2,
    type: "flashcards",
    title: "Vocabulaire Français - La Poésie",
    subject: "Français",
    createdAt: "2026-01-12",
    cards: [
      { question: "Qu'est-ce qu'une strophe ?", answer: "Un groupe de vers" },
      { question: "Définir une rime", answer: "Répétition de sons à la fin de vers" }
    ]
  },
  {
    id: 3,
    type: "mindmap",
    title: "Carte Mentale : La Révolution Française",
    subject: "Histoire",
    createdAt: "2026-01-10",
    data: { /* mindmap JSON */ }
  }
];

// === ASSIGNMENTS (PROFESSEUR) ===
export const assignments = [
  {
    id: 1,
    title: "Exercice sur les Fractions",
    type: "quiz",
    subject: "Mathématiques",
    section: "Chapitre 3",
    classes: ["6ème A", "6ème B"],
    dueDate: "2026-01-17",
    status: "ongoing",
    stats: {
      totalStudents: 50,
      submitted: 32,
      avgScore: 15.2
    },
    aiConfig: {
      enabled: true,
      helpLevel: "moderate",
      directives: "L'IA peut expliquer mais pas donner les réponses"
    }
  },
  {
    id: 2,
    title: "Analyse de Texte - Poème",
    type: "exercice",
    subject: "Français",
    section: "Chapitre 5",
    classes: ["3ème B"],
    dueDate: "2026-01-20",
    status: "upcoming",
    stats: {
      totalStudents: 22,
      submitted: 0,
      avgScore: null
    }
  }
];

// === QUIZ DATA ===
export const quizzes = [
  {
    id: 1,
    title: "Quiz : Les Fractions",
    subject: "Mathématiques",
    section: "Chapitre 3",
    totalQuestions: 10,
    timeLimit: 20, // minutes
    questions: [
      {
        id: 1,
        question: "Calculez : 3/4 + 1/2 = ?",
        options: [
          { id: "A", text: "4/6" },
          { id: "B", text: "5/4" },
          { id: "C", text: "5/8" },
          { id: "D", text: "1/2" }
        ],
        correctAnswer: "B",
        explanation: "Pour additionner des fractions, il faut trouver un dénominateur commun. Ici : 3/4 + 2/4 = 5/4"
      }
      // ... 9 autres questions
    ]
  }
];

// === USER ANALYTICS (PROFESSEUR) ===
export const studentAnalytics = {
  studentId: 123,
  progressionHistory: [
    { date: "2026-01-08", score: 12.5 },
    { date: "2026-01-10", score: 14.0 },
    { date: "2026-01-12", score: 15.2 },
    { date: "2026-01-15", score: 16.8 }
  ],
  iaInteractions: [
    {
      id: 1,
      timestamp: "2026-01-14T14:32:00",
      type: "question",
      subject: "Mathématiques",
      topic: "Fractions",
      summary: "Demande d'explication sur les dénominateurs communs"
    },
    {
      id: 2,
      timestamp: "2026-01-13T16:15:00",
      type: "generation",
      subject: "Français",
      topic: "Vocabulaire",
      summary: "Génération de flashcards"
    }
  ],
  strengths: ["Algèbre", "Géométrie"],
  weaknesses: ["Fractions", "Problèmes"]
};
```

---

## 🔄 Plan d'Exécution

### Ordre recommandé

1. ✅ **Phase 5** : Mettre à jour `data/mockData.js` d'abord (base de données)
2. ✅ **Phase 4** : Ajouter CSS au Design System (`style.css`)
3. ✅ **Phase 1** : Mettre à jour `student.html` (2-3h)
4. ✅ **Phase 2** : Mettre à jour `teacher.html` (2-3h)
5. ✅ **Phase 3** : Mettre à jour `admin.html` (1-2h)
6. ✅ **Phase 4.2** : Créer les nouveaux modules JS (1-2h)
7. ✅ **Tests** : Valider toutes les interactions (30min)
8. ✅ **Documentation** : Mettre à jour README et DOCUMENTATION.md (30min)

### Estimation totale : 8-12 heures de travail

---

## ✅ Checklist de Validation

### Visuel
- [ ] Toutes les nouvelles pages sont présentes
- [ ] La navigation sidebar reflète l'app finale
- [ ] Le design est cohérent (couleurs, espacements)
- [ ] Les états (actif, hover, disabled) sont visibles
- [ ] Version mobile responsive

### Fonctionnel
- [ ] Tous les boutons ont des actions (même mockées)
- [ ] Les modales s'ouvrent/ferment
- [ ] Les filtres fonctionnent (filtrage local JS)
- [ ] Les vues multiples (calendrier/liste) switchent
- [ ] Le stepper modal avance/recule

### Données
- [ ] mockData.js contient toutes les nouvelles entités
- [ ] Les données mockées sont réalistes
- [ ] Les relations entre entités sont cohérentes

### Documentation
- [ ] README mis à jour avec les nouvelles sections
- [ ] DOCUMENTATION.md liste tous les composants
- [ ] Captures d'écran actualisées

---

## 📸 Captures d'Écran Recommandées

Après mise à jour, prendre des screenshots pour la documentation :

1. **Élève - Coach Privé** : Dashboard KPIs + Badges
2. **Élève - Agenda** : Vue calendrier avec filtres
3. **Élève - Quiz** : Interface interactive
4. **Professeur - Assignments** : Vue grille + Modal wizard
5. **Professeur - Analytics Élève** : Graphique + Timeline IA
6. **Admin - Utilisateurs** : Table unifiée avec onglets

---

## 🎯 Next Steps

1. **Valider ce plan** avec l'utilisateur
2. **Prioriser** les phases (tout ou partie ?)
3. **Lancer l'exécution** phase par phase

---

**Prêt à démarrer ? Quelle phase veux-tu que je commence en premier ?**
