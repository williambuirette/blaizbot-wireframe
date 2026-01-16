# 📝 Éditeur de Note (Supplément)

> **Chemin de navigation** : Révisions → Détail supplément → Chapitres → **Éditer Note**  
> **Route** : `/student/revisions/[id]/detail/cards/note/[cardId]`  
> **Rôle** : STUDENT  
> **Composant source** : `src/components/features/student/revisions/StudentCardEditor.tsx`  
> **Environnement** : ✏️ **ÉDITION COMPLÈTE** (même que professeur pour ses propres notes)

---

## 🔑 Contexte Clé

**Type de carte** : Note personnelle créée entièrement par l'élève

**Différences selon contexte d'affichage** :

| Contexte | Environnement |
|----------|---------------|
| **Mes Révisions** (detail/[id].md) | ✏️ **ÉDITION COMPLÈTE** |
| **Mes Cours** (courses/detail/[id].md) | 👁️ **Lecture seule** (modal) |

---

## ✏️ Fonctionnalités d'Édition

- **Titre** : Éditable, min 3 caractères
- **Contenu** : Rich text (gras, italique, code, listes, etc.)
- **Type de carte** : Immutable (Note)
- **Sauvegarde** : API synchrone, persistance immédiate

**Points clés** :
- Pas de limitations : l'élève a l'environnement complet du professeur
- Cohérence UI garantie
- Type de carte inchangeable (Note = Note)

---

**Mots-clés** : Éditeur, Note personnelle, Rich text  
**Temps de lecture** : 2 minutes
