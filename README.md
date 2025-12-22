# 🎓 Blaiz'bot - Plateforme Éducative IA

> Wireframe interactif d'une plateforme éducative intégrant l'intelligence artificielle pour accompagner élèves et professeurs.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![Status](https://img.shields.io/badge/status-wireframe-orange)
![Score](https://img.shields.io/badge/qualité-97%2F100-green)

## 📸 Aperçu

| Interface Élève | Interface Professeur | Interface Admin |
|-----------------|---------------------|-----------------|
| Dashboard progression | Tableau de bord pédagogique | Gestion établissement |
| Assistant IA contextuel | Création de cours | Statistiques globales |
| Blaiz'Lab (recherche) | Planning & Agenda | Paramètres IA |

## 🚀 Démarrage rapide

```bash
# Cloner le projet
git clone https://github.com/VOTRE_USERNAME/blaizbot-wireframe.git

# Accéder au dossier
cd blaizbot-wireframe

# Lancer un serveur local
python -m http.server 8000

# Ouvrir dans le navigateur
# http://localhost:8000
```

## 🏗️ Architecture

```
wireframe-edu-app/
├── index.html          # Page de connexion (hub)
├── student.html        # Interface Élève
├── teacher.html        # Interface Professeur
├── admin.html          # Interface Administrateur
├── style.css           # Design System unifié
├── student.js          # Logique élève
├── teacher.js          # Logique professeur
└── js/
    ├── modules/        # 7 modules ES6 réutilisables
    │   ├── calendar.js
    │   ├── chat.js
    │   ├── navigation.js
    │   ├── ai-assistant.js
    │   ├── lab.js
    │   ├── knowledge.js
    │   └── messaging.js
    ├── utils/
    │   └── modals.js   # Gestionnaire de modales
    └── api/            # Couche d'abstraction API
        ├── base.api.js
        ├── teacher.api.js
        ├── student.api.js
        └── admin.api.js
```

## 📊 Métriques du projet

| Métrique | Valeur |
|----------|--------|
| Réduction de code | **-46%** (-992 lignes) |
| Modules ES6 créés | **7 modules** |
| Annotations JSDoc | **606** |
| Types définis | **40** |
| Score qualité | **97/100** |

## 🎯 Fonctionnalités

### 👨‍🎓 Espace Élève
- ✅ Dashboard de progression personnalisé
- ✅ Assistant IA contextuel par matière
- ✅ Blaiz'Lab - Studio de recherche augmenté
- ✅ Base de connaissances organisée
- ✅ Planning de révision avec calendrier
- ✅ Centre de communication

### 👨‍🏫 Espace Professeur
- ✅ Tableau de bord analytique
- ✅ Gestion des matières et cours
- ✅ Création d'exercices assistée par IA
- ✅ Suivi individuel des élèves
- ✅ Planning et agenda intégré
- ✅ Messagerie classe/individuelle

### ⚙️ Espace Admin
- ✅ Vue globale établissement
- ✅ Gestion des utilisateurs
- ✅ Configuration des paramètres IA
- ✅ Statistiques et rapports

## 🛠️ Technologies

- **HTML5** - Structure sémantique
- **CSS3** - Design System avec variables
- **JavaScript ES6+** - Modules, async/await
- **JSDoc** - Typage et documentation

## 🎓 Contexte : Vibecoding

Ce projet a été réalisé dans le cadre d'un exposé sur le **Vibecoding** - une approche de développement assisté par IA où :

1. **L'humain définit la vision** (wireframe, UX)
2. **L'IA assiste le développement** (refactoring, documentation)
3. **L'architecture reste lisible** pour les deux parties

### Principes appliqués :
- 📖 Code auto-documenté (JSDoc)
- 🧩 Architecture modulaire (ES6 modules)
- 🔄 Séparation des responsabilités
- 📊 Métriques de qualité mesurables

## 📝 Licence

MIT License - Libre d'utilisation et modification.

---

**Développé avec 🤖 + 🧠** | Projet Vibecoding 2025
