# ❓ Éditeur de Quiz (Supplément)

> **Chemin de navigation** : Révisions → Détail supplément → Chapitres → **Éditer Quiz**  
> **Route** : `/student/revisions/[id]/detail/cards/quiz/[cardId]`  
> **Rôle** : STUDENT  
> **Composant source** : `src/components/features/student/revisions/StudentCardEditor.tsx` + `StudentQuizEditor.tsx`  
> **Environnement** : ✏️ **ÉDITION COMPLÈTE** (structure quiz + réponses élève)

---

## 🔑 Contexte Clé

**Type de carte** : Quiz créé DE ZÉRO par l'élève (NON une modification de quiz prof)

**Important** :
- ✅ L'élève CRÉE ses propres quizzes dans Révisions (QuizBuilder)
- ❌ L'élève ne peut PAS modifier les quizzes du prof (Mes Cours = jeu seul)
- 🔗 Ses quizzes perso peuvent être liés à un cours du prof (optionnel)

**Accès** :
- Révisions : ✏️ Création/édition via QuizBuilder
- Mes Cours : 👁️ Mode entraînement seul (jeu interactif)

---

## ✏️ Fonctionnalités d'Édition

- **Titre** : Quiz, enrichissable
- **Structure** : QuizBuilder pour créer/modifier questions
- **Questions** : Ajout de variantes perso possible
- **Réponses** : Support QCM simple et multiple
- **Feedback** : Explications pour réponses correctes
- **Type de carte** : Immutable (Quiz)

**Point critique** : Même quiz = **MODE ENTRAÎNEMENT SEUL** dans "Mes Cours"

---

**Mots-clés** : Éditeur, Quiz, QCM, QuizBuilder, Questions  
**Temps de lecture** : 2 minutes
