# Documentation Technique - Blaiz'bot (Wireframe)

## 1. Présentation du Projet
Blaiz'bot est une application de gestion éducative moderne conçue pour centraliser l'administration, la pédagogie et le suivi des performances. Ce projet est actuellement au stade de **Wireframe fonctionnel** (HTML/CSS/JS).

## 2. Architecture de l'Interface
L'application utilise une structure de type **Dashboard Professionnel** :
- **Séparation des préoccupations** : Les fichiers HTML gèrent la structure, `style.css` gère le design, et des fichiers JS dédiés (`admin.js`, `teacher.js`, `student.js`) gèrent la logique interactive.
- **Sidebar Latérale** : Navigation par modules et catégories.
- **Main Content** : Zone dynamique affichant les différentes sections sans rechargement de page.
- **Modaux Contextuels** : Utilisés pour toutes les actions de création et d'édition.

## 3. Modules Implémentés

### A. Interface Administrateur (admin.html)
- **Organisation** : Matières, Classes, Professeurs, Élèves.
- **Pédagogie** : Programmes et Base de Connaissances.
- **Pilotage** : Statistiques et Performance.
- **Sécurité** : Gestion des Utilisateurs et accès.

### B. Interface Professeur (teacher.html)
- **Tableau de Bord** : Alertes IA et statistiques de progression.
- **Mes Cours & Contenus** : Gestion hiérarchique (Tree View) des supports de cours et quiz.
- **Gestion des Attributions** : Attribution de contenus aux classes ou élèves via une arborescence simplifiée.
- **Mes Élèves** : Suivi individuel, benchmarks IA et remédiations suggérées.
- **Centre de Communication** : Messagerie structurée par thèmes (Classe -> Thème -> Discussion).

### C. Interface Élève (student.html)
- **Ma Progression** : Suivi des objectifs et notes avec commentaires IA.
- **Mes Cours & Exercices** : Accès aux ressources attribuées.
- **Mon Assistant IA** : Chatbot d'aide aux devoirs.
- **Planning de Révision** : Programme personnalisé généré par l'IA.
- **Centre de Communication** : Échanges thématiques avec les professeurs et la classe.

## 4. Logique de Données (JavaScript)
Bien que l'application soit statique, elle simule une base de données relationnelle :
- **Synchronisation Dynamique** : Les listes déroulantes et les grilles de sélection dans les modaux sont peuplées en temps réel en "scannant" le contenu des tableaux HTML existants.
- **Filtrage Temps Réel** : Un moteur de recherche textuel permet de filtrer instantanément n'importe quel tableau de données.

## 5. Stack Technique actuelle
- **Frontend** : HTML5, CSS3 (Flexbox & Grid), Vanilla JavaScript (ES6+).
- **Serveur de développement** : Python `http.server`.
- **Design** : Approche "Wireframe propre" utilisant des codes couleurs sémantiques (Bleu pour le primaire, Vert pour le succès, Rouge pour les alertes).

## 6. Roadmap de Développement
1. **Finalisation du Design** : Harmonisation complète des styles et responsive design.
2. **Backend (Futur)** : Migration vers une architecture API (Node.js ou Python/FastAPI) avec base de données PostgreSQL.
3. **Intégration IA Réelle** : Remplacement des simulations par des appels API (OpenAI/Gemini) pour l'analyse de contenus et la génération de quiz.
