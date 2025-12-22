# Documentation Technique - Wireframe Edu App (Blaiz'bot)

## 1. Vue d'ensemble
Ce projet est un wireframe haute-fidélité pour une application éducative destinée aux professeurs. Il simule une interface de gestion de classe, de création de cours assistée par IA, et de suivi des élèves.
L'application est construite en **HTML5, CSS3 et JavaScript (Vanilla)**, sans dépendances externes ni framework, pour assurer une portabilité maximale et une compréhension claire de la structure.

## 2. Structure du Projet

```
/wireframe-edu-app
│
├── index.html          # Page d'accueil / Connexion (Portail)
├── teacher.html        # Dashboard Professeur (Cœur de l'application)
├── student.html        # Dashboard Élève (Simulation)
├── admin.html          # Dashboard Administrateur (Simulation)
├── style.css           # Feuille de style globale (Refactorisée)
├── teacher.js          # Logique métier du Dashboard Professeur (Refactorisé)
└── TECHNICAL_DOCS.md   # Ce fichier
```

## 3. Architecture Technique

### HTML (`teacher.html`)
- **Structure Sémantique** : Utilisation de `<aside>` pour la navigation, `<main>` pour le contenu, et `<section>` pour les différentes vues (Dashboard, Planning, Cours, etc.).
- **Système de Navigation** : Les onglets fonctionnent via un système de classes `.active`. Les liens de la sidebar ont un attribut `data-section` qui correspond à l'ID de la section à afficher.
- **Modales** : Les fenêtres modales (Création de cours, IA, Planning) sont présentes dans le DOM mais masquées par défaut (`display: none`).

### CSS (`style.css`)
- **Approche Modulaire** : Les styles sont regroupés par composants (Boutons, Cartes, Modales, Arborescence).
- **Variables** : (À implémenter pour une future version) Utilisation de couleurs standardisées (Bleu `#3498db`, Vert `#2ecc71`, Rouge `#e74c3c`).
- **Classes Utilitaires** : `.hidden`, `.active`, `.btn-primary`, `.modal-large` pour faciliter la maintenance.

### JavaScript (`teacher.js`)
Le code JavaScript a été refactorisé pour être modulaire et lisible. Il est divisé en 7 sections principales :

1.  **Data Models** : Données simulées (Mock Data) pour les classes, élèves, matières et événements.
2.  **Calendar Logic** : Moteur de rendu du calendrier, gestion des clics, sélection de plages de dates et filtrage par classe/élève.
3.  **Dashboard Logic** : Mise à jour dynamique des KPI et des alertes en fonction de la classe sélectionnée.
4.  **Content Management** : Gestion de l'arborescence de fichiers (Tree View) et simulation d'upload.
5.  **Messaging** : Simulation d'un chat interactif avec contextes (Classe vs Privé).
6.  **Course Creation & AI** : Logique pour la modale de création de cours et simulation de l'amélioration de contenu par IA (appel asynchrone simulé).
7.  **Event Listeners** : Gestionnaires d'événements globaux pour la navigation et les modales.

## 4. Fonctionnalités Clés

### 📅 Planning & Calendrier
- **Rendu Dynamique** : Le calendrier est généré en JS en fonction du mois en cours.
- **Filtrage** : Possibilité de filtrer les événements par Classe ou par Élève spécifique.
- **Création d'événements** : Interface modale pour ajouter des devoirs ou des cours, avec sélection multiple d'élèves.

### 🤖 Assistant IA
- **Amélioration de Contenu** : Une fonctionnalité simule l'appel à une IA pour structurer un cours brut.
- **Workflow** :
    1. Rédaction d'un brouillon.
    2. Clic sur "Améliorer avec l'IA".
    3. Saisie d'un prompt (ex: "Structure ce cours").
    4. Simulation de chargement (Spinner).
    5. Affichage du résultat en Markdown simulé.

### 📊 Dashboard & Suivi
- **KPIs Interactifs** : Les taux de compréhension et d'engagement changent selon la classe sélectionnée.
- **Alertes** : Système de notification pour les élèves en difficulté (ex: "Inactivité prolongée").

## 5. Modèle de Données (Mock)
Les données sont stockées dans des objets JS simples pour la démonstration :
```javascript
const teacherData = {
    classes: { '6A': [...], '3B': [...] },
    subjects: { 'Maths': [...], 'Histoire': [...] }
};
```
Cela permet de tester l'interface sans backend.

## 6. Pistes d'Amélioration (Roadmap)
Pour passer du wireframe à une application réelle (MVP) :
1.  **Backend** : Connecter à une API (Node.js/Python) pour persister les données.
2.  **Base de Données** : Remplacer les objets JS par une BDD (PostgreSQL/MongoDB).
3.  **Authentification** : Implémenter un vrai système de login (JWT/OAuth).
4.  **IA Réelle** : Connecter la fonction `runAiImprovement` à l'API OpenAI ou Anthropic.
5.  **Framework Frontend** : Migrer vers React ou Vue.js pour une meilleure gestion de l'état si l'application grossit.

---
*Généré par GitHub Copilot pour le projet Wireframe Edu App.*
