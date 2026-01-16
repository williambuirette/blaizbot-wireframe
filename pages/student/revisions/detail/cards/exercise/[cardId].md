# ✏️ Éditeur d'Exercice (Supplément)

> **Chemin de navigation** : Révisions → Détail supplément → Chapitres → **Éditer Exercice**  
> **Route** : `/student/revisions/[id]/detail/cards/exercise/[cardId]`  
> **Rôle** : STUDENT  
> **Composant source** : `src/components/features/student/revisions/StudentCardEditor.tsx`  
> **Environnement** : ✏️ **ÉDITION COMPLÈTE** (énoncé prof + réponses/solutions élève)

---

## 🔑 Contexte Clé

**Type de carte** : Exercice créé DE ZÉRO par l'élève (NON une modification d'exercice prof)

**Important** :
- ✅ L'élève CRÉE ses propres exercices dans Révisions
- ❌ L'élève ne peut PAS modifier les exercices du prof (Mes Cours = lecture seule)
- 🔗 Ses exercices perso peuvent être liés à un cours du prof (optionnel)

**Accès** :
- Révisions : ✏️ Création/édition de ses propres exercices
- Mes Cours : 👁️ Lecture seule des exercices du professeur

---

## ✏️ Fonctionnalités d'Édition

- **Titre** : Référence d'exercice, enrichissable
- **Contenu** : Sections distinctes (énoncé prof, ma réponse, correction)
- **Formules** : Support notations mathématiques (∑, √, ², etc.)
- **Énoncé** : Immutable (créé par prof)
- **Type de carte** : Immutable (Exercice)

**Points clés** :
- ✅ **Création perso** : L'élève crée ses propres Exercices de zéro
- ✅ **Environnement complet** : Accès à tous les outils d'un "vrai" éditeur
- ❌ **Pas d'accès aux exercices du prof** : Ne voit les exercices du prof qu'en lecture seule (Mes Cours)
- 🔗 **Liaison optionnelle** : Peut lier ses Exercices à un cours du prof
- 🔓 **Isolation** : Ses Exercices perso sont complètement séparés

---

**Mots-clés** : Éditeur, Exercice, Solutions, Formules mathématiques  
**Temps de lecture** : 2 minutes
