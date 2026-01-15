# Page de Connexion

> **Route** : `/login`  
> **Rôle(s)** : Public  
> **Fichier source** : `src/app/(auth)/login/page.tsx`

---

## 📸 Aperçu Visuel

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                          (fond blanc/gris très clair)                       │
│                                                                             │
│                    ┌─────────────────────────────────┐                      │
│                    │                                 │                      │
│                    │        [Logo Robot 3D]          │  ← Image colorée     │
│                    │       (violet/rose/bleu)        │     (pas emoji)     │
│                    │                                 │                      │
│                    │         BlaizBot                │  ← Titre noir       │
│                    │   (text-2xl font-bold)          │     gras            │
│                    │                                 │                      │
│                    │  Plateforme éducative avec IA   │  ← Sous-titre       │
│                    │         intégrée                │     gris            │
│                    │   (text-muted-foreground)       │                      │
│                    │                                 │                      │
│                    │  Email                          │  ← Label            │
│                    │  ┌───────────────────────────┐  │                      │
│                    │  │ votre@email.com           │  │  ← Input            │
│                    │  └───────────────────────────┘  │     (border gris)   │
│                    │                                 │                      │
│                    │  Mot de passe                   │  ← Label            │
│                    │  ┌───────────────────────────┐  │                      │
│                    │  │ ••••••••                  │  │  ← Input password   │
│                    │  └───────────────────────────┘  │                      │
│                    │                                 │                      │
│                    │  ┌───────────────────────────┐  │                      │
│                    │  │    Se connecter           │  │  ← Bouton noir      │
│                    │  │    (bg-black text-white)  │  │     pleine largeur  │
│                    │  └───────────────────────────┘  │                      │
│                    │                                 │                      │
│                    │  ─────────────────────────────  │  ← Ligne séparation │
│                    │                                 │                      │
│                    │  🛠️ Connexion rapide (DEV)     │  ← Label centré     │
│                    │    (text-sm text-muted)         │                      │
│                    │                                 │                      │
│                    │  ┌───────┐ ┌───────┐ ┌───────┐ │                      │
│                    │  │ Élève │ │ Prof  │ │ Admin │ │  ← 3 boutons        │
│                    │  │(bleu) │ │(vert) │ │(violet)│ │     outline +       │
│                    │  └───────┘ └───────┘ └───────┘ │     colorés         │
│                    │                                 │                      │
│                    └─────────────────────────────────┘                      │
│                         (Card max-w-md, ombre)                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Légende des éléments

| Zone | Description |
|------|-------------|
| Logo | Emoji robot 🤖 (text-5xl) |
| Titre | "BlaizBot" (text-2xl, font-bold) |
| Sous-titre | "Plateforme éducative avec IA intégrée" (muted) |
| Formulaire | Email + Password + Bouton submit |
| DEV Section | 3 boutons de connexion rapide (colorés) |

---

## 🧩 Composants Utilisés

| Composant | Chemin | Description |
|-----------|--------|-------------|
| `LoginForm` | `@/components/auth/LoginForm` | Formulaire de connexion complet |
| `Card` | `@/components/ui/card` | Conteneur carte |
| `CardHeader` | `@/components/ui/card` | En-tête de carte |
| `CardTitle` | `@/components/ui/card` | Titre de carte |
| `CardDescription` | `@/components/ui/card` | Description de carte |
| `CardContent` | `@/components/ui/card` | Contenu de carte |
| `Input` | `@/components/ui/input` | Champs de saisie |
| `Button` | `@/components/ui/button` | Boutons |
| `Label` | `@/components/ui/label` | Labels des champs |

---

## 📦 Dépendances

### Packages NPM
```json
{
  "next": "15.x",
  "react": "19.x",
  "next-auth": "4.x"
}
```

### Composants shadcn/ui
- [x] `Card` (+ CardHeader, CardTitle, CardDescription, CardContent)
- [x] `Input`
- [x] `Button`
- [x] `Label`

### Composants Custom
- [x] `LoginForm` (`src/components/auth/LoginForm.tsx`)

---

## 🔗 API Endpoints

| Méthode | Endpoint | Description | Payload |
|---------|----------|-------------|---------|
| `POST` | `/api/auth/callback/credentials` | Authentification NextAuth | `{ email, password }` |
| `GET` | `/api/auth/session` | Récupérer la session | - |

---

## 💾 Types & Interfaces

### State du composant LoginForm
```typescript
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
```

### Comptes de test (DEV)
```typescript
const DEV_ACCOUNTS = {
  student: { email: 'lucas.martin@blaizbot.edu', password: 'eleve123' },
  teacher: { email: 'm.dupont@blaizbot.edu', password: 'prof123' },
  admin: { email: 'admin@blaizbot.edu', password: 'admin123' },
};
```

### Mapping rôles → routes
```typescript
const roleRoutes: Record<string, string> = {
  ADMIN: '/admin',
  TEACHER: '/teacher',
  STUDENT: '/student',
};
```

---

## 🔐 Authentification & Autorisations

| Aspect | Détail |
|--------|--------|
| **Provider** | NextAuth (credentials) |
| **Session** | JWT via cookies |
| **Rôles autorisés** | Public (page de login) |
| **Après login** | Redirection selon rôle |

### Flux d'authentification
```
1. User remplit email/password
2. signIn('credentials', { email, password, redirect: false })
3. Si succès → fetch session pour obtenir le rôle
4. Redirection vers /{role} (admin, teacher, student)
5. Si erreur → affichage message d'erreur
```

---

## 🎨 États de l'Interface

### État initial
```
┌─────────────────────────────────┐
│  Email: [                     ] │
│  Password: [                  ] │
│  [      Se connecter        ]   │
└─────────────────────────────────┘
```

### État de chargement
```
┌─────────────────────────────────┐
│  Email: [votre@email.com    ] ◌ │  (disabled)
│  Password: [••••••••        ] ◌ │  (disabled)
│  [     Connexion...         ]   │  (disabled + spinner)
└─────────────────────────────────┘
```

### État erreur
```
┌─────────────────────────────────┐
│  Email: [votre@email.com      ] │
│  Password: [••••••••          ] │
│                                 │
│  ❌ Email ou mot de passe       │
│     incorrect                   │
│                                 │
│  [      Se connecter          ] │
└─────────────────────────────────┘
```

---

## 📱 Responsive Design

| Breakpoint | Comportement |
|------------|--------------|
| `mobile` < 768px | Carte pleine largeur avec padding |
| `tablet` 768px+ | Carte centrée `max-w-md` |
| `desktop` 1024px+ | Idem tablet |

### Classes Tailwind clés
```css
/* Page */
.min-h-screen .flex .items-center .justify-center .bg-gray-50

/* Carte */
.w-full .max-w-md

/* Boutons DEV */
.grid .grid-cols-3 .gap-2
```

---

## 📋 Checklist de Recréation

### Structure
- [x] Route Next.js (`app/(auth)/login/page.tsx`)
- [x] Groupe de route `(auth)` pour layout dédié
- [ ] Métadonnées SEO (title, description)

### UI
- [x] Fond gris clair
- [x] Carte centrée
- [x] Logo emoji robot
- [x] Titre + sous-titre
- [x] Formulaire email/password
- [x] Bouton submit
- [x] Séparateur horizontal
- [x] Boutons DEV colorés

### Fonctionnalités
- [x] Gestion état (useState)
- [x] Validation formulaire
- [x] Appel NextAuth signIn
- [x] Récupération session post-login
- [x] Redirection selon rôle
- [x] Affichage erreurs
- [x] États loading sur inputs et boutons
- [x] Connexion rapide DEV

### Qualité
- [x] Responsive (mobile-first)
- [x] Accessibilité (labels, autocomplete)
- [ ] Tests unitaires

---

## 🔗 Navigation

| Direction | Page | Route |
|-----------|------|-------|
| ← Précédent | Accueil | `/` (redirige ici) |
| → Succès (Élève) | Dashboard Élève | `/student` |
| → Succès (Prof) | Dashboard Prof | `/teacher` |
| → Succès (Admin) | Dashboard Admin | `/admin` |

---

## 📝 Notes de Développement

> **Section DEV** : Les boutons de connexion rapide sont utiles pour le développement mais devraient être masqués en production (`process.env.NODE_ENV !== 'production'`).

> **Sécurité** : Les mots de passe sont hashés avec bcrypt côté serveur (voir `src/lib/auth/authOptions.ts`).

> **UX** : Le délai de 300ms avant redirection permet au cookie de session d'être correctement posé.

---

*Documentation générée par rétro-ingénierie de BlaizBot-V1*  
*Date : 13 décembre 2025*
