# 📖 Éditeur de Leçon (Supplément)

> **Chemin de navigation** : Révisions → Détail supplément → Chapitres → **Éditer Leçon**  
> **Route** : `/student/revisions/[id]/detail/cards/lesson/[cardId]`  
> **Rôle** : STUDENT  
> **Composant source** : `src/components/features/student/revisions/StudentCardEditor.tsx`  
> **Environnement** : ✏️ **ÉDITION COMPLÈTE** (personnalisation du contenu professeur)

---

## 🔑 Contexte Clé

**Type de carte** : Leçon créée par le professeur, enrichissable par l'élève

**Source du contenu** : Créée et envoyée par l'enseignant

**Capacités de l'élève** : 
- Ajouter notes personnelles
- Enrichir explications
- Ajouter références et mnémoniques

---

## 📊 Différences selon contexte d'affichage

| Contexte | Environnement | Détail |
|----------|---------------|--------|
| **Mes Révisions** | ✏️ **ÉDITION COMPLÈTE** | Peut enrichir contenu prof |
| **Mes Cours** | 👁️ **Lecture seule (modal)** | Affiche contenu + notes, pas d'édition |

---

## ✏️ Fonctionnalités d'Édition

- **Titre** : Enrichissable, min 3 caractères
- **Contenu** : Rich text avec notes personnelles distinctes
- **Sections** : Contenu original + zone notes élève
- **Type de carte** : Immutable (Leçon)

**Point critique** : Même leçon = **LECTURE SEULE** dans "Mes Cours"

---

**Mots-clés** : Éditeur, Leçon enrichie, Personnalisation  
**Temps de lecture** : 2 minutes
