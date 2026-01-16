# ✏️ Éditeur d'Exercice (Supplément)

> **Chemin de navigation** : Révisions → Détail supplément → Chapitres → **Éditer Exercice**  
> **Route** : `/student/revisions/[id]/detail/cards/exercise/[cardId]`  
> **Rôle** : STUDENT  
> **Composant source** : `src/components/features/student/revisions/StudentCardEditor.tsx`  
> **Environnement** : ✏️ **ÉDITION COMPLÈTE** (énoncé prof + réponses/solutions élève)

---

## 🔑 Contexte Clé

**Type de carte** : Exercice créé par le professeur, enrichissable par l'élève

**Source du contenu** : Énoncé créé et assigné par l'enseignant

**Capacités de l'élève** :
- Ajouter réponses personnelles
- Ajouter solutions détaillées
- Ajouter explications de démarche
- Documenter avec formules mathématiques

---

## 📊 Différences selon contexte d'affichage

| Contexte | Environnement | Détail |
|----------|---------------|--------|
| **Mes Révisions** | ✏️ **ÉDITION COMPLÈTE** | Peut ajouter réponses et solutions |
| **Mes Cours** | 👁️ **Modal de correction (lecture)** | Affiche énoncé + correction + réponses, pas d'édition |

---

## ✏️ Fonctionnalités d'Édition

- **Titre** : Référence d'exercice, enrichissable
- **Contenu** : Sections distinctes (énoncé prof, ma réponse, correction)
- **Formules** : Support notations mathématiques (∑, √, ², etc.)
- **Énoncé** : Immutable (créé par prof)
- **Type de carte** : Immutable (Exercice)

**Point critique** : Même exercice = **CORRECTION EN LECTURE** dans "Mes Cours"

---

**Mots-clés** : Éditeur, Exercice, Solutions, Formules mathématiques  
**Temps de lecture** : 2 minutes
