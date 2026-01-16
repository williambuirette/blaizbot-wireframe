# 📝 Éditeur de Note (Supplément)

> **Chemin de navigation** : Révisions → Détail supplément → Chapitres → **Éditer Note**  
> **Route** : `/student/revisions/[id]/detail/cards/note/[cardId]`  
> **Rôle** : STUDENT  
> **Composant source** : `src/components/features/student/revisions/StudentCardEditor.tsx`  
> **Environnement** : ✏️ **ÉDITION COMPLÈTE** (même que professeur pour ses propres notes)

---

## 🔑 Contexte Clé

**Type de carte** : Note créée DE ZÉRO par l'élève (NON une modification de carte prof)

**Important** :
- ✅ L'élève CRÉE ses propres cartes Note dans Révisions
- ❌ L'élève ne peut PAS modifier les cartes Note du prof (Mes Cours = lecture seule)
- 🔗 Ses cartes perso peuvent être liées à un cours du prof (optionnel)

**Accès** :
- Révisions : ✏️ Création/édition de ses propres cartes Note
- Mes Cours : 👁️ Lecture seule des cartes Note du professeur

---

## ✏️ Fonctionnalités d'Édition

- **Titre** : Éditable, min 3 caractères
- **Contenu** : Rich text (gras, italique, code, listes, etc.)
- **Type de carte** : Immutable (Note)
- **Sauvegarde** : API synchrone, persistance immédiate

**Points clés** :
- ✅ **Création perso** : L'élève crée ses propres Notes de zéro
- ✅ **Environnement complet** : Accès à tous les outils d'un "vrai" éditeur
- ❌ **Pas d'accès aux notes du prof** : Ne voit les Notes du prof qu'en lecture seule (Mes Cours)
- 🔗 **Liaison optionnelle** : Peut lier ses Notes à un cours du prof
- 🔓 **Isolation** : Ses Notes perso sont complètement séparées

---

**Mots-clés** : Éditeur, Note personnelle, Rich text  
**Temps de lecture** : 2 minutes
