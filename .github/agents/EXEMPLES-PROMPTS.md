# Exemples de Prompts - @WireframeDoc

> **Guide pratique** : Prompts efficaces pour documenter BlaizBot

---

## 🎯 Prompts par Type de Page

### 1. Modale Simple (Création/Édition)

#### ✅ Bon Prompt
```
@WireframeDoc [image]

Modale de création d'une matière (admin).
Champs : Nom, Code couleur (picker), Description (optionnel).
Boutons : Annuler, Créer (désactivé si nom vide).
```

#### ❌ Mauvais Prompt
```
@WireframeDoc [image] Voici une modale
```
*Problème : Manque de contexte (rôle, type, action)*

---

### 2. Dashboard / Page Complète

#### ✅ Bon Prompt
```
@WireframeDoc [3 images]

Dashboard Élève (`/student`) avec 3 sections :

1. Vue d'ensemble (stats, progression)
2. Mes Cours (grid de cards)
3. Coach IA (chat + suggestions)

Header : Logo, notifs, profil
Sidebar : Navigation 7 items
```

#### ❌ Mauvais Prompt
```
@WireframeDoc [image] Dashboard student
```
*Problème : Capture unique pour page complexe, manque détails sections*

---

### 3. Page de Liste

#### ✅ Bon Prompt
```
@WireframeDoc [image]

Liste des utilisateurs (admin) - `/admin/users`

Toolbar : Recherche, filtres (Rôle, Statut), bouton "+ Ajouter"
Tableau : Avatar, Nom, Email, Rôle, Classe, Statut, Actions
Actions par ligne : Éditer, Supprimer
Pagination : 10/page
```

#### ❌ Mauvais Prompt
```
@WireframeDoc [image] Liste users admin
```
*Problème : Manque détails tableau et interactions*

---

### 4. Page de Détail

#### ✅ Bon Prompt
```
@WireframeDoc [2 images]

Détail d'un élève (teacher) - `/teacher/students/[id]`

Header : Avatar, Nom, Stats (Moyenne, Assiduité, Progression)
3 Onglets :
1. Vue d'ensemble (activité récente, graphiques)
2. Cours assignés (table)
3. Historique IA (chat logs)

Actions : Envoyer message, Exporter rapport
```

#### ❌ Mauvais Prompt
```
@WireframeDoc [image] Page élève
```
*Problème : Quel rôle ? Quelle vue ? Manque structure*

---

### 5. Workflow Multi-Étapes

#### ✅ Bon Prompt
```
@WireframeDoc [5 images]

Création de cours (teacher) - workflow complet :

1. Page `/teacher/courses/new`
   - Onglet "Infos" : Titre, Matière, Classe, Description
   - Onglet "Contenu IA" : Prompt génération

2. Modale "Ajouter chapitre"
   - Champs : Titre, Ordre
   - Bouton IA : "Générer plan"

3. Modale "Ajouter carte"
   - 4 types : Leçon, Vidéo, Exercice, Quiz
   - Icônes cliquables

4. Édition carte Leçon
   - Rich text editor
   - Upload ressources
   - Génération IA

5. Validation finale
   - Prévisualisation
   - Publier / Brouillon
```

#### ❌ Mauvais Prompt
```
@WireframeDoc [5 images] Création cours teacher
```
*Problème : Manque séquence logique et détails par étape*

---

## 🎨 Prompts par Composant

### Formulaire

```
@WireframeDoc [image]

Formulaire de connexion (`/login`)

Champs :
- Email (type email, obligatoire, placeholder "nom@exemple.fr")
- Mot de passe (type password, obligatoire, toggle visibilité)
- Remember me (checkbox)

Validation :
- Email : format valide
- Password : min 8 caractères

Boutons :
- "Se connecter" (désactivé si invalide)
- "Mot de passe oublié ?" (lien)

États :
- Idle : champs vides
- Erreur : bordure rouge + message
- Loading : spinner + bouton désactivé
- Success : redirect dashboard
```

---

### Tableau de Données

```
@WireframeDoc [image]

Tableau des classes (admin) - `/admin/classes/liste`

Colonnes :
- Nom (triable)
- Nombre d'élèves (badge)
- Professeurs assignés (avatars empilés)
- Matières (tags colorés)
- Actions (menu 3 points)

Features :
- Recherche temps réel (nom classe)
- Tri multi-colonnes
- Sélection multiple (checkbox)
- Actions bulk : Supprimer, Exporter

Pagination : 20/page, total 147
```

---

### Calendrier/Agenda

```
@WireframeDoc [image]

Agenda professeur (teacher) - `/teacher/agendas-assignations`

Vue mois avec :
- Événements : Cours, Devoirs, Examens (3 couleurs)
- Cliquable → Détail événement
- Drag & drop pour déplacer
- Bouton "+ Ajouter" → Modale création

Sidebar :
- Mini calendrier navigation
- Légende couleurs
- Filtres : Classe, Matière

Modale détail événement :
- Titre, Date, Heure, Classe
- Description
- Actions : Éditer, Supprimer, Dupliquer
```

---

## 🚀 Prompts Avancés

### Mise à Jour d'un Fichier Existant

```
@WireframeDoc [image]

Mettre à jour `teacher/courses/detail/[id].md`

Nouvelle section à ajouter après "Onglet Structure" :

Onglet "Statistiques" :
- Graphique progression élèves
- Taux complétion par chapitre
- Temps moyen par carte
- Scores exercices/quiz

Bouton "Exporter rapport PDF"
```

---

### Analyse Seule (Sans Création)

```
@WireframeDoc [image]

Analyse seulement (ne crée pas le fichier) :

Quelle page c'est ?
Composants utilisés ?
API endpoints probables ?
Fichier cible recommandé ?
```

---

### Synchronisation Roadmap

```
@WireframeDoc

Synchronise NAVIGATION-ROADMAP.md avec ces nouveaux fichiers :
- student/dashboard.md
- student/courses/liste.md
- student/courses/detail/[id].md

Ajoute-les dans la section "Espace Élève" et l'arborescence visuelle.
```

---

## 🧪 Prompts de Test

### Test 1 : Modale Simple
```
@WireframeDoc [image fictive]

Imagine une modale "Créer un devoir" (teacher).
Champs : Titre, Description, Date limite, Classe.
Crée la doc complète.
```

### Test 2 : Dashboard
```
@WireframeDoc [sans image]

Crée la doc pour le dashboard admin (`/admin`) avec :
- 4 cards de stats (Utilisateurs, Classes, Matières, Activité)
- Graphique évolution
- Liste activités récentes
- Boutons actions rapides
```

### Test 3 : Workflow
```
@WireframeDoc

Documente le workflow de création d'utilisateur (admin) :
1. Clic bouton "+ Ajouter" dans `/admin/users`
2. Modale s'ouvre (create.md)
3. Remplir formulaire
4. Valider → Toast succès
5. Retour liste avec nouvel utilisateur

Crée `create.md` et met à jour `liste.md`.
```

---

## 📝 Template de Prompt Complet

```
@WireframeDoc [image(s)]

📍 Contexte
- Rôle : [ADMIN | TEACHER | STUDENT]
- Route : [/chemin/de/la/page]
- Type : [Dashboard | Liste | Détail | Modale | Formulaire]

🎨 Description Visuelle
- Layout : [Header, Sidebar, Contenu principal]
- Sections : [Liste des sections]
- Composants : [Boutons, Cards, Tables, etc.]

🔧 Interactions
- Actions principales : [Créer, Modifier, Supprimer, etc.]
- Validations : [Règles métier]
- États : [Idle, Loading, Error, Success]

📦 Données
- API endpoint : [GET/POST/PUT/DELETE /api/...]
- Payload : [{ champs }]
- Types : [Interfaces TypeScript]

📂 Fichier Cible
- Créer : [pages/role/section/fichier.md]
- Ou Mettre à jour : [fichier existant]
```

---

## 💡 Conseils

### Ajouter du Contexte
Plus de détails = meilleur résultat
- ✅ Nommer les champs du formulaire
- ✅ Indiquer les validations
- ✅ Décrire les comportements
- ✅ Préciser les routes API

### Structurer les Prompts
- 🎯 Titre clair
- 📍 Route et rôle
- 🎨 Description visuelle
- 🔧 Interactions
- 📦 Données

### Réviser et Ajuster
L'agent peut se tromper :
- 👀 Vérifie le fichier généré
- 🛠️ Demande des ajustements
- 🔁 Itère jusqu'au résultat parfait

---

## 🎓 Apprendre par l'Exemple

Consulte les fichiers existants :
- [admin/classes/create.md](../pages/admin/classes/create.md) - Modale simple
- [teacher/dashboard.md](../pages/teacher/dashboard.md) - Dashboard complet
- [teacher/students/detail/[id].md](../pages/teacher/students/detail/[id].md) - Détail avec onglets

Reproduis la structure pour tes nouvelles pages !
