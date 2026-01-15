# Page Accès Non Autorisé

> **Route** : `/unauthorized`  
> **Rôle(s)** : Public (page d'erreur)  
> **Fichier source** : `src/app/unauthorized/page.tsx`

---

## 📸 Aperçu Visuel

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                                                                             │
│                                                                             │
│                          ┌─────────────────┐                                │
│                          │                 │                                │
│                          │   🛡️❌          │  (cercle rouge clair)          │
│                          │   (ShieldX)     │                                │
│                          │                 │                                │
│                          └─────────────────┘                                │
│                                                                             │
│                        Accès non autorisé                                   │
│                        (text-3xl, font-bold)                                │
│                                                                             │
│              Vous n'avez pas les droits nécessaires pour                    │
│              accéder à cette page. Veuillez contacter un                    │
│              administrateur si vous pensez qu'il s'agit                     │
│              d'une erreur.                                                  │
│                                                                             │
│                   ┌──────────┐    ┌─────────────────────┐                   │
│                   │  Retour  │    │ 🏠 Mon tableau de   │                   │
│                   │ (outline)│    │      bord           │                   │
│                   └──────────┘    └─────────────────────┘                   │
│                                                                             │
│                          (fond gris clair : bg-gray-50)                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Variante : Non connecté

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                          [Même icône et texte]                              │
│                                                                             │
│                   ┌──────────┐    ┌──────────────────┐                      │
│                   │  Retour  │    │  Se connecter    │                      │
│                   │ (outline)│    │                  │                      │
│                   └──────────┘    └──────────────────┘                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Légende des éléments

| Zone | Description |
|------|-------------|
| Icône | ShieldX de lucide-react dans cercle rouge |
| Titre | "Accès non autorisé" |
| Message | Explication + suggestion de contacter admin |
| Bouton Retour | `router.back()` |
| Bouton Principal | Dépend de la session (connecté ou non) |

---

## 🧩 Composants Utilisés

| Composant | Chemin | Description |
|-----------|--------|-------------|
| `Button` | `@/components/ui/button` | Boutons d'action |
| `ShieldX` | `lucide-react` | Icône bouclier avec X |
| `Home` | `lucide-react` | Icône maison |

---

## 📦 Dépendances

### Packages NPM
```json
{
  "next": "15.x",
  "react": "19.x",
  "next-auth": "4.x",
  "lucide-react": "latest"
}
```

### Composants shadcn/ui
- [x] `Button`

### Icônes lucide-react
- [x] `ShieldX`
- [x] `Home`

### Hooks
- [x] `useRouter` (next/navigation)
- [x] `useSession` (next-auth/react)

---

## 🔗 API Endpoints

Aucun appel API direct. Utilise la session NextAuth via `useSession()`.

---

## 💾 Types & Interfaces

### Session utilisateur
```typescript
interface Session {
  user?: {
    role?: 'ADMIN' | 'TEACHER' | 'STUDENT';
    // ... autres champs
  };
}
```

### Logique de redirection
```typescript
const getDashboardUrl = () => {
  const role = session?.user?.role;
  if (role === 'ADMIN') return '/admin';
  if (role === 'TEACHER') return '/teacher';
  if (role === 'STUDENT') return '/student';
  return '/login';
};
```

---

## 🔐 Authentification & Autorisations

| Aspect | Détail |
|--------|--------|
| **Session** | Optionnelle (vérifie si connecté) |
| **Rôles autorisés** | Tous (page d'erreur publique) |
| **Comportement** | Adapte les boutons selon la session |

### Scénarios d'affichage

| Condition | Bouton Principal |
|-----------|------------------|
| `session` existe | "Mon tableau de bord" → `/{role}` |
| Pas de session | "Se connecter" → `/login` |

---

## 🎨 États de l'Interface

### État avec session
```
Boutons : [Retour] [🏠 Mon tableau de bord]
```

### État sans session
```
Boutons : [Retour] [Se connecter]
```

---

## 📱 Responsive Design

| Breakpoint | Comportement |
|------------|--------------|
| `mobile` < 768px | Boutons empilés ou gap réduit |
| `tablet` 768px+ | Boutons côte à côte |
| `desktop` 1024px+ | Idem tablet |

### Classes Tailwind clés
```css
/* Page */
.min-h-screen .flex .items-center .justify-center .bg-gray-50

/* Contenu */
.text-center .space-y-6 .p-8

/* Icône */
.rounded-full .bg-red-100 .p-6
.h-16 .w-16 .text-red-600

/* Boutons */
.flex .gap-4 .justify-center
```

---

## 📋 Checklist de Recréation

### Structure
- [x] Route Next.js (`app/unauthorized/page.tsx`)
- [x] Directive `'use client'` (hooks React)
- [ ] Métadonnées SEO

### UI
- [x] Fond gris clair centré
- [x] Icône ShieldX dans cercle rouge
- [x] Titre "Accès non autorisé"
- [x] Message explicatif
- [x] Bouton "Retour" (outline)
- [x] Bouton principal conditionnel

### Fonctionnalités
- [x] Vérification session (useSession)
- [x] Navigation retour (router.back)
- [x] Redirection vers dashboard selon rôle
- [x] Fallback vers login si pas de session

### Qualité
- [x] Responsive
- [x] Accessibilité (texte lisible)
- [ ] Tests unitaires

---

## 🔗 Navigation

| Direction | Page | Route |
|-----------|------|-------|
| ← Retour | Page précédente | `router.back()` |
| → Dashboard | Selon rôle | `/admin`, `/teacher`, `/student` |
| → Login | Si non connecté | `/login` |

---

## 📝 Notes de Développement

> **Quand cette page s'affiche ?**  
> Le middleware redirige vers `/unauthorized` quand un utilisateur tente d'accéder à une route réservée à un autre rôle (ex: élève tentant d'accéder à `/admin`).

> **UX** : Le bouton "Retour" permet de revenir à la page précédente sans perdre l'historique de navigation.

> **Sécurité** : Cette page ne divulgue aucune information sensible, juste que l'accès est refusé.

---

*Documentation générée par rétro-ingénierie de BlaizBot-V1*  
*Date : 15 janvier 2026*
