# Carte Note - Vue Élève (Modale Lecture)

> **Chemin de navigation** : Login → Dashboard Student → Mes cours → [Cours] → Onglet Cours → Clic carte Note → **Modale**  
> **Route** : `/student/courses/[id]?tab=cours` (modale ouverte)  
> **Rôle** : STUDENT  
> **Mode** : 👁️ Lecture seule (modale)  
> **Composant source** : `src/components/features/cards/NoteCardModal.tsx`

---

## 📍 Parcours Utilisateur

```
1. Pages publiques
   └── 01-login.md

2. Authentification réussie (Élève)
   └── student/dashboard.md

3. Sidebar → Mes cours
   └── student/courses/liste.md

4. Clic sur "Voir" (ligne du tableau)
   └── student/courses/detail/[id].md

5. Onglet "Cours" → Section "Contenu du cours" OU "Mes suppléments"
   └── Clic sur carte Note
   └── MODALE OUVERTE (VOUS ÊTES ICI)
```

---

## 📸 Aperçu Visuel

### Page en arrière-plan + Modale

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ←  La photosynthèse   SVT                                                  │
│     Par Marc DUPONT                                                         │
│                                                                             │
│  Ma progression                                                    100%     │
│  ████████████████████████████████████████████████████████████████████       │
│  1 / 1 chapitres terminés                            8 sections au total    │
├─────────────────────────────────────────────────────────────────────────────┤
│           ⓘ Informations                    📚 Cours                        │
│                                             ───────                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  📚 Contenu du cours                                                        │
│  Parcourez les chapitres et réalisez les exercices pour progresser          │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  ✅  1.  Introduction                      8 sections   Terminé  ▼  │   │
│  │  ┌─────────────────────────────────────────────────────────────┐    │   │
│  │  │  📄 Introduction                                     Leçon  │    │   │
│  │  │  🎬 Vidéo photosynthèse                              Vidéo  │    │   │
│  │  │  📄 Carte leçon                                      Leçon  │ ◄──│───── sélectionné (bleu)
│  │  │  ✏️ Carte exercice                                Exercice  │    │   │
│  │  │  ❓ Carte quiz                                        Quiz  │    │   │
│  │  │  🎬 Carte vidéo                                      Vidéo  │    │   │
│  │  └─────────────────────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  🎒 Mes suppléments                                              + Créer    │
│  Vos notes et ressources personnelles liées à ce cours                      │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  📚 1  notes sur la photosynthèse           5 cartes            ▼   │   │
│  │                                      Modifier ce supplément →       │   │
│  │  ┌─────────────────────────────────────────────────────────────┐    │   │
│  │  │  📄 Note de compréhension                              Note │    │   │
│  │  │  🎬 vidéo                                              Vidéo │    │   │
│  │  │  📄 test                                               Leçon │    │   │
│  │  │  ✏️ test                                            Exercice │    │   │
│  │  │  ❓ test                                                Quiz │    │   │
│  │  └─────────────────────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Modale seule (détail)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Note de compréhension                                          │
│  ┌──────┐ ┌─────────────────────┐                               │
│  │ Note │ │ Supplément personnel│                               │
│  └──────┘ └─────────────────────┘                               │
│                                                                 │
│  ## Préparation Test 2 : Compréhension de Lecture * **Objectif  │
│  principal :** Évaluer la capacité à comprendre et interpréter  │
│  des textes écrits. * **Types de questions possibles :** * **   │
│  Questions factuelles :** Identifier des informations explicites│
│  dans le texte. * **Questions d'inférence :** Déduire des       │
│  informations implicites à partir du texte. * **Questions de    │
│  vocabulaire :** Comprendre le sens de mots et d'expressions    │
│  dans leur contexte. * **Questions sur l'intention de l'auteur  │
│  :** Identifier le but de l'auteur en écrivant le texte. *      │
│  **Questions sur la structure du texte :** Comprendre comment   │
│  les différentes parties du texte sont organisées et liées      │
│  entre elles. * **Stratégies de préparation :** * **Lecture     │
│  active :** Surligner, annoter, prendre des notes pendant la    │
│  lecture. * **Pratique régulière :** Lire différents types de   │
│  textes (articles, essais, romans, etc.). * **Développement du  │
│  vocabulaire :** Apprendre de nouveaux mots et expressions. *   │
│  **Analyse de textes :** S'exercer à identifier les idées       │
│  principales, les arguments et les conclusions. * **Conseils    │
│  pour le jour du test :** * **Lire attentivement les questions  │
│  :** S'assurer de bien comprendre ce qui est demandé. * **Gérer │
│  son temps :** Ne pas passer trop de temps sur une seule        │
│  question. * **Éliminer les réponses incorrectes :** Réduire    │
│  les options pour augmenter les chances de choisir la bonne     │
│  réponse. * **Relire ses réponses :** Vérifier qu'elles sont    │
│  cohérentes avec le texte.                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

> ⚠️ **Note** : Le contenu Markdown est affiché en **texte brut** (les `**` et `*` sont visibles), il n'est pas rendu en HTML formaté.

---

## 🧩 Composants Utilisés

| Composant | Chemin | Description |
|-----------|--------|-------------|
| `Dialog` | `@/components/ui/dialog` | Conteneur modale |
| `DialogHeader` | `@/components/ui/dialog` | Header avec titre + badges |
| `DialogContent` | `@/components/ui/dialog` | Zone contenu scrollable |
| `Badge` | `@/components/ui/badge` | "Note" (type) + "Supplément personnel" |
| `Button` | `@/components/ui/button` | Bouton fermer (×) |
| `Prose` | Custom | Rendu Markdown formaté |
| `ScrollArea` | `@/components/ui/scroll-area` | Zone scrollable si contenu long |

---

## 🔗 API Endpoints

| Méthode | Endpoint | Description | Payload |
|---------|----------|-------------|---------|
| `GET` | `/api/student/courses/[id]/cards/[cardId]` | Détail carte note | - |

---

## 💾 Types & Interfaces

```typescript
interface NoteCardModal {
  id: string;
  type: 'NOTE';
  title: string;
  content: string;           // Contenu Markdown (lecture seule)
  source: 'COURSE' | 'SUPPLEMENT';  // Origine de la carte
  supplementTitle?: string;  // Si source = SUPPLEMENT
}
```

---

## 📋 Structure de la Modale

### Header Modale
| Élément | Description |
|---------|-------------|
| **📄 Icône** | Icône type note |
| **Titre** | Nom de la carte (ex: "Note de compréhension") |
| **× Bouton** | Fermer la modale |

### Badges (sous le titre)
| Badge | Description |
|-------|-------------|
| **Note** | Type de carte (orange) |
| **Supplément personnel** | Indique que c'est un supplément créé par l'élève |

### Contenu
| Élément | Description |
|---------|-------------|
| **Zone texte** | Markdown rendu en HTML |
| **Scroll** | ScrollArea si contenu dépasse |
| **Style** | Prose formatting (headings, lists, bold) |

---

## 🔄 Comportements

### Ouverture modale
1. Clic sur une carte Note dans la liste
2. Modale s'ouvre avec animation fade-in
3. Background page devient grisé
4. Focus trap dans la modale

### Lecture contenu
- Markdown rendu en HTML formaté
- Pas d'édition possible
- Scroll si contenu long

### Fermeture modale
1. Clic sur × (coin supérieur droit)
2. OU clic en dehors de la modale
3. OU touche Escape
4. Modale se ferme avec animation fade-out

---

## 🔄 Actions Utilisateur

| Action | Comportement |
|--------|--------------|
| **Cliquer × ou backdrop** | Ferme la modale |
| **Touche Escape** | Ferme la modale |
| **Scroll** | Parcourir le contenu si long |
| **Sélectionner texte** | Copier possible |

---

## 📊 Récapitulatif Technique

**Type** : Modale de consultation  
**Layout** : Header (titre + badges) + Contenu Markdown  
**Mode** : 👁️ Lecture seule  
**Overlay** : Background grisé semi-transparent  
**Animation** : Fade in/out  
**Fermeture** : ×, backdrop click, Escape  

---

**Navigation** :
- ← Fermer → Retour à [Détail cours](../../[id].md) (onglet Cours)

---

*Fichier mis à jour le 16 janvier 2026*