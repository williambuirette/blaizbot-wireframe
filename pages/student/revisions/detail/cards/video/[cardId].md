# 🎬 Éditeur de Vidéo (Supplément)

> **Chemin de navigation** : Révisions → Détail supplément → Chapitres → **Éditer Vidéo**  
> **Route** : `/student/revisions/[id]/detail/cards/video/[cardId]`  
> **Rôle** : STUDENT  
> **Composant source** : `src/components/features/student/revisions/StudentCardEditor.tsx`  
> **Environnement** : ✏️ **ÉDITION COMPLÈTE** (métadonnées + notes personnelles sur vidéo prof)

---

## 🔑 Contexte Clé

**Type de carte** : Vidéo uploadée par le professeur, enrichissable par l'élève

**Source du contenu** : Fichier vidéo créé et uploadé par l'enseignant

**Capacités de l'élève** :
- Ajouter titre personnalisé
- Ajouter résumé/notes de visionnage
- Documenter timestamps clés
- Marquer points importants

---

## 📊 Différences selon contexte d'affichage

| Contexte | Environnement | Détail |
|----------|---------------|--------|
| **Mes Révisions** | ✏️ **ÉDITION COMPLÈTE** | Peut ajouter notes et timestamps |
| **Mes Cours** | 👁️ **Visionneur + modal lecture** | Affiche vidéo + notes, pas d'édition |

---

## ✏️ Fonctionnalités d'Édition

- **Titre** : Métadonnées enrichissables
- **Notes** : Rich text avec timestamps spécialisés (HH:MM:SS)
- **Fichier vidéo** : Immutable (créé par prof)
- **Type de carte** : Immutable (Vidéo)

**Point critique** : Même vidéo = **LECTURE SEULE** dans "Mes Cours"

---

**Mots-clés** : Éditeur, Vidéo, Timestamps, Notes de visionnage  
**Temps de lecture** : 2 minutes
