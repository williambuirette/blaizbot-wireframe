# ❓ Éditeur de Quiz (Supplément)

> **Chemin de navigation** : Révisions → Détail supplément → Chapitres → **Éditer Quiz**  
> **Route** : `/student/revisions/[id]/detail/cards/quiz/[cardId]`  
> **Rôle** : STUDENT  
> **Composant source** : `src/components/features/student/revisions/StudentCardEditor.tsx` + `StudentQuizEditor.tsx`  
> **Environnement** : ✏️ **ÉDITION COMPLÈTE** (structure quiz + réponses élève)

---

## 🔑 Contexte Clé

**Type de carte** : Quiz créé par le professeur, enrichissable par l'élève

**Source du contenu** : Structure quiz (questions, réponses correctes) créée par l'enseignant

**Capacités de l'élève** :
- Ajouter questions personnalisées
- Créer variantes du quiz prof
- Ajouter explications/feedback
- Personnaliser structure d'entraînement

---

## 📊 Différences selon contexte d'affichage

| Contexte | Environnement | Détail |
|----------|---------------|--------|
| **Mes Révisions** | ✏️ **ÉDITEUR COMPLET (QuizBuilder)** | Peut ajouter questions perso |
| **Mes Cours** | 👁️ **MODE ENTRAÎNEMENT (jeu interactive)** | Jouer quiz, voir correction, pas d'édition |

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
