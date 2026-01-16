# Carte Note - Supplément Élève

> **Chemin de navigation** : Login → Dashboard Student → Mes révisions → [Supplément] → **Carte Note**  
> **Route** : `/student/revisions/[supplementId]` (avec carte note sélectionnée)  
> **Rôle** : STUDENT  
> **Mode** : ✏️ Création / Édition  
> **Composant source** : `src/app/(dashboard)/student/revisions/[supplementId]/page.tsx`

---

## 📍 Parcours Utilisateur

```
1. Pages publiques
   └── 01-login.md

2. Authentification réussie (Élève)
   └── student/dashboard.md

3. Sidebar → Mes révisions
   └── student/revisions/liste.md

4. Clic sur un supplément
   └── student/revisions/[supplementId]/

5. Carte Note sélectionnée
   └── VOUS ÊTES ICI
```

---

## 📸 Aperçu Visuel

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ←  📄 notes sur la photosynthèse                                    ⚙️     │
│     🔗 La photosynthèse (Marc DUPONT)                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ▼  complément                                           5 cartes  ✏️  🗑️  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  ⋮  📄 Note de compréhension           Note  [✓ Contenu]  ✏️  🗑️  ▲│   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Contenu de la note                                    ✨ Améliorer avec l'IA│
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  ## Préparation Test 2 : Compréhension de Lecture                   │   │
│  │                                                                     │   │
│  │  * **Objectif principal :** Évaluer la capacité à comprendre        │   │
│  │    et interpréter des textes écrits.                                │   │
│  │  * **Types de questions possibles :**                               │   │
│  │    * **Questions factuelles :** Identifier des informations...      │   │
│  │    * **Questions d'inférence :** Déduire des informations...        │   │
│  │    * **Questions de vocabulaire :** Comprendre le sens...           │   │
│  │    * **Questions sur l'intention de l'auteur :** Identifier...      │   │
│  │    * **Questions sur la structure du texte :** Comprendre...        │   │
│  │  * **Stratégies de préparation :**                                  │   │
│  │    * **Lecture active :** Surligner, annoter, prendre des notes...  │   │
│  │    * **Pratique régulière :** Lire différents types de textes...    │   │
│  │    * **Développement du vocabulaire :** Apprendre de nouveaux...    │   │
│  │    * **Analyse de textes :** S'exercer à identifier les idées...    │   │
│  │  * **Conseils pour le jour du test :**                              │   │
│  │    * **Lire attentivement les questions :** S'assurer de bien...    │   │
│  │    * **Gérer son temps :** Ne pas passer trop de temps...           │   │
│  │    * **Éliminer les réponses incorrectes :** Réduire les options... │   │
│  │    * **Relire ses réponses :** Vérifier qu'elles sont cohérentes... │   │
│  │                                                                 ↘   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  💡 Conseil : Prenez des notes personnelles, reformulez avec vos propres   │
│     mots pour mieux retenir.                                               │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                              ⬆️                                      │   │
│  │        Glissez un fichier ou cliquez pour uploader                  │   │
│  │                                                                     │   │
│  │                      [ Choisir un fichier ]                         │   │
│  │                                                                     │   │
│  │   Max 100 MB - PDF, Word, Excel, PowerPoint, Images, Vidéos, Audio │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│                        Aucun fichier attaché                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🧩 Composants Utilisés

| Composant | Chemin | Description |
|-----------|--------|-------------|
| `Card` | `@/components/ui/card` | Conteneur principal carte note |
| `Button` | `@/components/ui/button` | Boutons actions (Contenu, Éditer, Supprimer) |
| `Badge` | `@/components/ui/badge` | Badge "Note" (type de carte) |
| `Textarea` | `@/components/ui/textarea` | Éditeur rich text Markdown |
| `Collapsible` | `@/components/ui/collapsible` | Section "complément" expandable |
| `Alert` | `@/components/ui/alert` | Conseil en bas de page |
| `Dropzone` | Custom | Zone d'upload fichiers |

---

## 🔗 API Endpoints

| Méthode | Endpoint | Description | Payload |
|---------|----------|-------------|---------|
| `GET` | `/api/student/supplements/[supplementId]` | Détail supplément + cartes | - |
| `GET` | `/api/student/supplements/[supplementId]/cards/[cardId]` | Détail carte note | - |
| `PATCH` | `/api/student/supplements/[supplementId]/cards/[cardId]` | Modifier contenu note | `{ content: string }` |
| `POST` | `/api/student/supplements/[supplementId]/cards/[cardId]/files` | Upload fichier | `FormData` |
| `DELETE` | `/api/student/supplements/[supplementId]/cards/[cardId]/files/[fileId]` | Supprimer fichier | - |
| `POST` | `/api/student/supplements/[supplementId]/cards/[cardId]/ai-improve` | Améliorer avec IA | `{ content: string }` |

---

## 💾 Types & Interfaces

```typescript
interface NoteCard {
  id: string;
  type: 'NOTE';
  title: string;
  content: string;           // Contenu Markdown
  order: number;
  supplementId: string;
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;
}

interface Attachment {
  id: string;
  name: string;
  type: string;              // 'pdf', 'word', 'image', etc.
  url: string;
  size: number;              // en bytes
  uploadedAt: Date;
}

interface Supplement {
  id: string;
  title: string;
  courseId?: string;         // Lié à un cours (optionnel)
  courseName?: string;
  teacherName?: string;
  cards: NoteCard[];
  createdAt: Date;
}
```

---

## 📋 Structure de la Page

### Header Supplément
| Élément | Description |
|---------|-------------|
| **← Bouton** | Retour à la liste des révisions |
| **📄 Icône** | Icône supplément |
| **Titre** | Nom du supplément (ex: "notes sur la photosynthèse") |
| **🔗 Lien cours** | Cours associé + professeur (cliquable) |
| **⚙️ Paramètres** | Menu options supplément |

### Section Complément (Accordion)
| Élément | Description |
|---------|-------------|
| **Titre section** | "complément" |
| **Badge** | "5 cartes" (nombre de cartes) |
| **Boutons** | ✏️ Éditer nom + 🗑️ Supprimer section |
| **État** | Expand/Collapse (▼/▲) |

### Carte Note (dans la section)
| Élément | Description |
|---------|-------------|
| **⋮ Handle** | Drag & drop pour réordonner |
| **📄 Icône** | Type de carte (Note) |
| **Titre** | Nom de la carte (ex: "Note de compréhension") |
| **Badge** | "Note" (orange) |
| **[✓ Contenu]** | Toggle afficher/masquer contenu |
| **Boutons** | ✏️ Éditer + 🗑️ Supprimer carte |

### Éditeur de Contenu
| Élément | Description |
|---------|-------------|
| **Label** | "Contenu de la note" |
| **✨ Améliorer avec l'IA** | Bouton génération IA |
| **Textarea** | Éditeur Markdown multi-lignes |
| **Resize** | Coin resize (↘) |

### Zone Conseil
| Élément | Description |
|---------|-------------|
| **💡 Icône** | Ampoule conseil |
| **Texte** | "Prenez des notes personnelles, reformulez avec vos propres mots pour mieux retenir." |

### Zone Upload Fichiers
| Élément | Description |
|---------|-------------|
| **⬆️ Icône** | Upload |
| **Texte** | "Glissez un fichier ou cliquez pour uploader" |
| **Bouton** | "Choisir un fichier" |
| **Formats** | "Max 100 MB - PDF, Word, Excel, PowerPoint, Images, Vidéos, Audio" |
| **État** | "Aucun fichier attaché" ou liste fichiers |

---

## 🔄 Comportements

### Édition du contenu
1. L'élève tape dans le textarea
2. Sauvegarde automatique (debounce 1s)
3. Indicateur "Enregistré" ou "Enregistrement..."
4. Support Markdown (preview possible)

### Améliorer avec l'IA
1. Clic sur "✨ Améliorer avec l'IA"
2. Envoi du contenu actuel à l'API
3. Loading spinner
4. Réponse IA affichée en suggestion
5. L'élève peut accepter/rejeter

### Upload de fichiers
1. Glisser-déposer OU clic sur "Choisir un fichier"
2. Validation format + taille (max 100 MB)
3. Upload avec progress bar
4. Fichier apparaît dans la liste
5. Possibilité de supprimer

### Toggle Contenu
1. Clic sur "[✓ Contenu]"
2. Affiche/masque l'éditeur et la zone upload
3. État persisté dans localStorage

---

## 🔄 Actions Utilisateur

| Action | Comportement |
|--------|--------------|
| **Cliquer ←** | Retour `/student/revisions` |
| **Cliquer cours lié** | Ouvre `/student/courses/[courseId]` |
| **Expand section** | Affiche les cartes de la section |
| **Toggle Contenu** | Affiche/masque éditeur |
| **Éditer textarea** | Sauvegarde auto du contenu |
| **✨ Améliorer IA** | Génère suggestion IA |
| **Upload fichier** | Ajoute pièce jointe |
| **✏️ Éditer carte** | Ouvre modale édition titre |
| **🗑️ Supprimer carte** | Confirmation + suppression |

---

## ✅ Règles de Validation

```typescript
// Contenu note
✓ content : string (optionnel, peut être vide)
✓ Markdown supporté
✓ Pas de limite de caractères

// Fichiers
✓ Taille max : 100 MB par fichier
✓ Formats acceptés : PDF, Word, Excel, PowerPoint, Images, Vidéos, Audio
✓ Extensions : .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .jpg, .jpeg, .png, .gif, .mp4, .mp3, .wav
```

---

## 📊 Récapitulatif Technique

**Type de page** : Édition carte note (supplément)  
**Layout** : Header + Section collapsible + Éditeur + Upload  
**Mode** : ✏️ Lecture/Écriture (élève propriétaire)  
**Données** : API `/api/student/supplements/[supplementId]/cards/[cardId]`  
**Sauvegarde** : Auto-save avec debounce 1s  
**IA** : Amélioration du contenu disponible  

---

**Navigation** :
- ← [Liste révisions](../../liste.md)
- → [Autres cartes du supplément](../lesson/[cardId].md) *(si existantes)*
- 🔗 [Cours associé](../../../../courses/detail/[id].md) *(si lié)*

---

*Fichier créé le 16 janvier 2026*