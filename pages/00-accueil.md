# Page d'Accueil

> **Route** : `/`  
> **Rôle(s)** : Public (redirection automatique)  
> **Fichier source** : `src/app/page.tsx`

---

## 📸 Aperçu Visuel

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                                                                             │
│                         ⏳ Redirection automatique...                       │
│                                                                             │
│                              → /login                                       │
│                                                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Comportement

Cette page ne s'affiche jamais visuellement. Elle redirige immédiatement vers `/login`.

---

## 🧩 Composants Utilisés

| Composant | Chemin | Description |
|-----------|--------|-------------|
| Aucun | - | Page de redirection uniquement |

---

## 📦 Dépendances

### Packages NPM
```json
{
  "next": "15.x"
}
```

### Imports Next.js
```typescript
import { redirect } from "next/navigation";
```

### Composants shadcn/ui
- Aucun

### Composants Custom
- Aucun

---

## 🔗 API Endpoints

Aucun appel API.

---

## 💾 Types & Interfaces

```typescript
// Pas de props, page statique
export default function Home() {
  redirect("/login");
}
```

---

## 🔐 Authentification & Autorisations

| Aspect | Détail |
|--------|--------|
| **Middleware** | Non applicable |
| **Session** | Non vérifiée |
| **Rôles autorisés** | Tous (public) |
| **Redirection** | Toujours vers `/login` |

---

## 📋 Checklist de Recréation

### Structure
- [x] Route Next.js créée (`app/page.tsx`)
- [x] Redirection serveur (pas de rendu client)

### Code complet
```tsx
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
}
```

### Points clés
- Utilise `redirect()` de Next.js (redirection côté serveur)
- Pas de rendu HTML
- Comportement instantané

---

## 🔗 Navigation

| Direction | Page | Route |
|-----------|------|-------|
| → Suivant | Login | `/login` |

---

## 📝 Notes de Développement

> **Pourquoi une redirection ?**  
> L'application n'a pas de landing page publique. Tous les utilisateurs doivent s'authentifier pour accéder aux fonctionnalités.

> **Alternative possible** :  
> Une landing page marketing avec bouton "Se connecter" pourrait être ajoutée ultérieurement.

---

*Documentation générée par rétro-ingénierie de BlaizBot-V1*  
*Date : 13 décembre 2025*
