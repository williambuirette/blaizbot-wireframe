# 📖 Éditeur de Leçon (Supplément)

> **Chemin de navigation** : Révisions → Détail supplément → Chapitres → **Éditer Leçon**  
> **Route** : `/student/revisions/[id]/detail/cards/lesson/[cardId]`  
> **Rôle** : STUDENT  
> **Composant source** : `src/components/features/student/revisions/StudentCardEditor.tsx`  
> **Environnement** : ✏️ **ÉDITION COMPLÈTE** (personnalisation du contenu professeur)

---

## 🔑 Contexte Clé

**Type de carte** : Leçon créée DE ZÉRO par l'élève (NON une modification de leçon prof)

**Important** :
- ✅ L'élève CRÉE ses propres leçons dans Révisions
- ❌ L'élève ne peut PAS modifier les leçons du prof (Mes Cours = lecture seule)
- 🔗 Ses leçons perso peuvent être liées à un cours du prof (optionnel)

**Accès** :
- Révisions : ✏️ Création/édition de ses propres leçons
- Mes Cours : 👁️ Lecture seule des leçons du professeur

---

## ✏️ Fonctionnalités d'Édition

- **Titre** : Enrichissable, min 3 caractères
- **Contenu** : Rich text avec notes personnelles distinctes
- **Sections** : Contenu original + zone notes élève
- **Type de carte** : Immutable (Leçon)

**Points clés** :
- ✅ **Création perso** : L'élève crée ses propres Leçons de zéro
- ✅ **Environnement complet** : Accès à tous les outils d'un "vrai" éditeur
- ❌ **Pas d'accès aux leçons du prof** : Ne voit les leçons du prof qu'en lecture seule (Mes Cours)
- 🔗 **Liaison optionnelle** : Peut lier ses Leçons à un cours du prof
- 🔓 **Isolation** : Ses Leçons perso sont complètement séparées

---

**Mots-clés** : Éditeur, Leçon enrichie, Personnalisation  
**Temps de lecture** : 2 minutes
