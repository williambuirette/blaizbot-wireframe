# 📸 → 📝 Pipeline de Documentation

> **Workflow automatisé** : De la capture d'écran à la documentation technique complète

---

## 🎯 Vue d'Ensemble

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  1. CAPTURE                 2. ANALYSE                3. CRÉATION   │
│                                                                     │
│  📸 Screenshot       →      🤖 @WireframeDoc    →    📝 .md File   │
│  (Page/Modale)              (IA Vision)              (Structured)   │
│                                                                     │
│                             ↓                                       │
│                                                                     │
│                     4. SYNCHRONISATION                              │
│                                                                     │
│                     🗺️ NAVIGATION-ROADMAP.md                        │
│                     (Arborescence + Liens)                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Processus Détaillé

### Étape 1 : Capture d'Écran 📸

**Tu fournis :**
```
@WireframeDoc [glisser-déposer image]

Modale de création de classe (admin)
Champs : Nom (obligatoire)
```

---

### Étape 2 : Analyse IA 🤖

**L'agent identifie :**

| Aspect | Exemple |
|--------|---------|
| **Rôle** | `ADMIN` |
| **Type** | Modale (Dialog) |
| **Route** | `/admin/classes` (modale) |
| **Composants** | Dialog, Input, Button, Label |
| **Champs** | name (string, required) |
| **API** | POST `/api/admin/classes` |
| **Validation** | Obligatoire, unique, 1-50 caractères |
| **Actions** | Annuler (ferme), Créer (soumet) |

---

### Étape 3 : Création du Fichier 📝

**L'agent génère** : `pages/admin/classes/create.md`

**Structure complète (245 lignes)** :

```markdown
# Créer une Classe

> **Chemin de navigation** : Login → Dashboard Admin → Classes → **+ Ajouter**
> **Route** : `/admin/classes` (modale)
> **Rôle** : ADMIN
> **Composant source** : `src/components/features/classes/CreateClassModal.tsx`

---

## 📍 Parcours Utilisateur
[...]

## 📸 Aperçu Visuel - Modale Nouvelle Classe
┌───────────────────────────────────────────────────────────┐
│  Nouvelle classe                                    [×]   │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  Nom de la classe                                         │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Ex: 9H-A, 10H-B, Terminale S1                       │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│  Le nom peut être modifié à tout moment.                  │
│                                                           │
│                         [Annuler]    [Créer]              │
│                                      (gris)               │
└───────────────────────────────────────────────────────────┘

## 🧩 Composants Utilisés
[...]

## 🔗 API Endpoints
[...]

## 💾 Types & Interfaces
[...]

## 📋 Champs du Formulaire
[...]

## 🎯 Règles de Validation
[...]

## 🔄 Comportements
[...]

## 🔄 Actions Utilisateur
[...]
```

---

### Étape 4 : Synchronisation Roadmap 🗺️

**L'agent met à jour** : `pages/NAVIGATION-ROADMAP.md`

#### A. Arborescence Visuelle

```diff
blaizbot-wireframe/pages/
│
├── admin/
│   ├── classes/
│   │   ├── liste.md
+  │   │   ├── create.md     # ← AJOUTÉ
│   │   └── edit.md
```

#### B. Section Admin

```diff
### Espace Admin (`/admin`)

#### Gestion des Classes
- [admin/classes/liste.md](admin/classes/liste.md) - Liste des classes
+ - [admin/classes/create.md](admin/classes/create.md) - Modale : Créer une classe
- [admin/classes/edit.md](admin/classes/edit.md) - Modale : Modifier une classe
```

---

## ✅ Résultat Final

**Fichiers créés/modifiés** :
- ✅ `pages/admin/classes/create.md` (245 lignes)
- ✅ `pages/NAVIGATION-ROADMAP.md` (2 sections mises à jour)

**Contenu généré** :
- ✅ ASCII art de l'interface
- ✅ 4 composants UI identifiés
- ✅ 1 endpoint API documenté
- ✅ Types TypeScript complets
- ✅ 5 champs de formulaire
- ✅ 8 règles de validation
- ✅ 7 actions utilisateur

**Temps estimé** : ~30 secondes

---

## 🎨 Exemples Visuels

### Avant (Capture) → Après (Documentation)

#### Exemple 1 : Modale Simple

**INPUT** : 📸 Capture modale création classe

**OUTPUT** : 📝 [create.md](../pages/admin/classes/create.md) (245 lignes)

```
┌─────────────────────────────────┐
│  Nouvelle classe          [×]   │
├─────────────────────────────────┤
│  Nom de la classe               │
│  ┌───────────────────────────┐  │
│  │ Ex: 9H-A                  │  │
│  └───────────────────────────┘  │
│                                 │
│        [Annuler]    [Créer]     │
└─────────────────────────────────┘
```

---

#### Exemple 2 : Dashboard Complet

**INPUT** : 📸 3 captures dashboard élève

**OUTPUT** : 📝 student/dashboard.md (450 lignes)

```
┌─────────────────────────────────────────────────────────┐
│  🏠 BlaizBot          🔔  👤 Jean Dupont        [Déco]  │
├───────────┬─────────────────────────────────────────────┤
│           │                                             │
│ 📊 Accueil│  ┌─────────────────┐ ┌─────────────────┐   │
│ 📚 Cours  │  │ Progression     │ │ Objectifs       │   │
│ 📝 Devoirs│  │ 78%             │ │ 3/5 atteints    │   │
│ 💬 Coach  │  └─────────────────┘ └─────────────────┘   │
│ ⚙️ Params │                                             │
│           │  [Mes Cours]                                │
│           │  Grid de 6 cards...                         │
└───────────┴─────────────────────────────────────────────┘
```

---

#### Exemple 3 : Page de Liste

**INPUT** : 📸 Capture liste utilisateurs

**OUTPUT** : 📝 admin/users/liste.md (320 lignes)

```
┌─────────────────────────────────────────────────────────┐
│  Gestion des Utilisateurs                               │
├─────────────────────────────────────────────────────────┤
│  🔍 Rechercher...  [Filtre Rôle ▾]      [+ Ajouter]     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌───────┬──────────────┬──────────┬──────┬─────────┐  │
│  │ Avatar│ Nom          │ Email    │ Rôle │ Actions │  │
│  ├───────┼──────────────┼──────────┼──────┼─────────┤  │
│  │  👤   │ Jean Dupont  │ j@e.fr   │ PROF │ ⋮       │  │
│  │  👤   │ Marie Martin │ m@e.fr   │ ÉLÈVE│ ⋮       │  │
│  └───────┴──────────────┴──────────┴──────┴─────────┘  │
│                                                         │
│  Page 1 sur 5                             ← 1 2 3 ... →│
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Avantages du Pipeline

| Aspect | Avant (Manuel) | Après (Agent) |
|--------|----------------|---------------|
| **Temps** | 30-60 min/page | ~30 sec/page |
| **Erreurs** | Oublis fréquents | Checklist complète |
| **Cohérence** | Variable | Template strict |
| **Synchronisation** | Manuelle | Automatique |
| **Typage** | Approximatif | TypeScript complet |
| **ASCII Art** | Souvent absent | Toujours présent |

**Gain de productivité** : **×60-120**

---

## 🎯 Cas d'Usage

### 1. Nouveau Projet
```
Documenter toutes les pages du wireframe en 1h au lieu de 2 jours
```

### 2. Itération UI
```
Capturer nouvelle version → @WireframeDoc → Mise à jour automatique
```

### 3. Onboarding Développeur
```
Développeur lit la doc technique → Connaît tous les composants/API
```

### 4. Specification pour IA de Code
```
Prompt : "Code CreateClassModal.tsx en suivant pages/admin/classes/create.md"
```

---

## 📊 Métriques Cibles

| Métrique | Objectif |
|----------|----------|
| Pages documentées | 62/62 (100%) |
| Temps moyen/page | < 1 min |
| Erreurs détectées | 0 |
| Roadmap à jour | Toujours |
| Satisfaction dev | 9+/10 |

---

## 🛠 Prochaines Étapes

1. **Documenter Student** (19 pages restantes)
2. **Documenter Teacher** (7 pages restantes)
3. **Générer exports** (PDF, Confluence, Notion)
4. **Créer index visuel** (Screenshots dans la doc)

---

## 📚 Ressources

- [Guide d'utilisation](.github/agents/GUIDE-WIREFRAME-DOC.md)
- [Exemples de prompts](.github/agents/EXEMPLES-PROMPTS.md)
- [Progression](DOCUMENTATION-PROGRESS.md)
- [Template](.github/agents/wireframe-doc.md)
