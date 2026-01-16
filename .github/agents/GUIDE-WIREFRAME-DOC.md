# Guide d'Utilisation - @WireframeDoc

> **Pour qui ?** Toi, quand tu veux documenter une page/modale de BlaizBot

---

## 🚀 Démarrage Rapide

### 1. Prendre la/les capture(s)

**Conseils** :
- 📸 Capture d'écran complète (incluant navigation)
- 🖱️ Inclure les états interactifs (hover, focus) si pertinent
- 📝 Plusieurs captures pour un workflow complet

### 2. Invoquer l'agent

Dans Copilot Chat :
```
@WireframeDoc [glisser-déposer image(s)] Voici [description courte]
```

**Exemples** :
```
@WireframeDoc [image] Voici la modale de création de classe (admin)
```

```
@WireframeDoc [3 images] Dashboard student avec :
1. Vue d'ensemble
2. Section Mes Cours
3. Section Coach IA
```

### 3. Vérifier le résultat

L'agent te confirme :
```
✅ Fichier créé : pages/admin/classes/create.md (245 lignes)
📍 NAVIGATION-ROADMAP.md mis à jour
```

### 4. Réviser si besoin

Si l'agent s'est trompé :
```
@WireframeDoc Ajuste admin/classes/create.md :
- Le bouton "Créer" est bleu, pas gris
- Ajouter champ "Description" (optionnel)
```

---

## 📋 Checklist Avant d'Invoquer

- [ ] J'ai une capture claire de la page/modale
- [ ] Je sais quel rôle (Admin/Teacher/Student)
- [ ] Je sais le nom de la page
- [ ] Je sais si c'est une modale, une page ou un détail

---

## 🎯 Scénarios Courants

### Documenter une modale
```
@WireframeDoc [image] Modale d'édition utilisateur (admin)
```
→ Créera `admin/users/edit.md`

### Documenter un dashboard
```
@WireframeDoc [image] Dashboard professeur
```
→ Créera `teacher/dashboard.md`

### Documenter une page de détail
```
@WireframeDoc [image] Détail d'un élève avec onglets (teacher)
```
→ Créera `teacher/students/detail/[id].md`

### Documenter un workflow multi-étapes
```
@WireframeDoc [4 images] Création de cours (teacher) :
1. Page infos générales
2. Onglet contenu IA
3. Modale ajout chapitre
4. Modale ajout carte
```
→ Créera plusieurs fichiers liés

---

## ⚙️ Options Avancées

### Préciser le fichier cible
```
@WireframeDoc [image] Mettre à jour teacher/courses/new.md
avec l'onglet "Contenu IA"
```

### Demander uniquement l'analyse
```
@WireframeDoc [image] Analyse seulement (ne crée pas le fichier)
Quelle page c'est et quels composants ?
```

### Synchroniser roadmap après coup
```
@WireframeDoc Synchronise NAVIGATION-ROADMAP.md
avec admin/users/create.md
```

---

## 🛑 Erreurs Courantes

### "Je ne trouve pas le bon emplacement"
**Cause** : Capture floue ou manque de contexte

**Solution** :
```
@WireframeDoc [image] Page de liste des classes (teacher)
Route : /teacher/classes
```

### "Le fichier existe déjà"
**Cause** : Page déjà documentée

**Solution** :
```
@WireframeDoc Mettre à jour teacher/classes/liste.md
avec cette nouvelle capture [image]
```

### "ASCII art illisible"
**Cause** : Layout complexe

**Solution** :
```
@WireframeDoc Refais l'ASCII art de admin/users/create.md
en simplifiant (juste les zones principales)
```

---

## 📊 Progression de la Documentation

### État actuel (16 janvier 2026)

| Espace | Pages documentées | Manquantes | Progression |
|--------|-------------------|------------|-------------|
| **Admin** | 14/14 | 0 | ✅ 100% |
| **Teacher** | 18/25 | 7 | 🟡 72% |
| **Student** | 1/20 | 19 | 🔴 5% |

### Priorités

1. **Student** (dashboard + cours + messages + agenda)
2. **Teacher** (agendas-assignations + exercices + quiz)
3. **Modales globales** (notifications, recherche)

---

## 🎓 Bonnes Pratiques

### ✅ Faire
- Capturer la page entière (header + sidebar + contenu)
- Indiquer le rôle et le contexte
- Vérifier le fichier créé après génération
- Demander des ajustements si besoin

### ❌ Ne pas faire
- Capturer une zone partielle sans contexte
- Oublier d'indiquer le rôle
- Accepter sans vérifier
- Documenter la même page 2 fois sans raison

---

## 📚 Ressources

- [wireframe-doc.md](wireframe-doc.md) - Documentation complète de l'agent
- [_TEMPLATE.md](../pages/_TEMPLATE.md) - Template de référence
- [NAVIGATION-ROADMAP.md](../pages/NAVIGATION-ROADMAP.md) - Roadmap mise à jour
- [create.md](../pages/admin/classes/create.md) - Exemple complet

---

## 💬 Support

**Problème avec l'agent ?**
```
@WireframeDoc [décrire le problème]
```

**Demander de l'aide pour structurer** :
```
@WireframeDoc J'ai ces 5 pages à documenter :
[liste]. Par où commencer ?
```
