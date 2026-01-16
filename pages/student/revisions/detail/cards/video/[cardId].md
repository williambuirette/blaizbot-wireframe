# 🎬 Éditeur de Vidéo (Supplément)

> **Chemin de navigation** : Révisions → Détail supplément → Chapitres → **Éditer Vidéo**  
> **Route** : `/student/revisions/[id]/detail/cards/video/[cardId]`  
> **Rôle** : STUDENT  
> **Composant source** : `src/components/features/student/revisions/StudentCardEditor.tsx`  
> **Environnement** : ✏️ **ÉDITION COMPLÈTE** (métadonnées + notes personnelles sur vidéo prof)

---

## 🔑 Contexte Clé

**Type de carte** : Vidéo uploadée DE ZÉRO par l'élève (NON une modification de vidéo prof)

**Important** :
- ✅ L'élève CRÉE ses propres vidéos dans Révisions
- ❌ L'élève ne peut PAS modifier les vidéos du prof (Mes Cours = lecture seule)
- 🔗 Ses vidéos perso peuvent être liées à un cours du prof (optionnel)

**Accès** :
- Révisions : ✏️ Upload/édition de ses propres vidéos
- Mes Cours : 👁️ Visionneur seul pour vidéos du professeur

---

## ✏️ Fonctionnalités d'Édition

- **Titre** : Métadonnées enrichissables
- **Notes** : Rich text avec timestamps spécialisés (HH:MM:SS)
- **Fichier vidéo** : Immutable (créé par prof)
- **Type de carte** : Immutable (Vidéo)

**Points clés** :
- ✅ **Upload perso** : L'élève upload ses propres Vidéos de zéro
- ✅ **Environnement complet** : Accès à tous les outils d'un "vrai" éditeur
- ❌ **Pas d'accès aux vidéos du prof** : Ne voit les vidéos du prof qu'en lecture seule (Mes Cours)
- 🔗 **Liaison optionnelle** : Peut lier ses Vidéos à un cours du prof
- 🔓 **Isolation** : Ses Vidéos perso sont complètement séparées

---

**Mots-clés** : Éditeur, Vidéo, Timestamps, Notes de visionnage  
**Temps de lecture** : 2 minutes
