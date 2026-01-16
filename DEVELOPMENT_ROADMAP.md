# 🚀 Blaiz'bot - Feuille de route de développement

> **Document de référence** pour l'IA et les développeurs lors du développement de l'application Blaiz'bot.
> 
> **Projet** : Plateforme éducative avec assistant IA  
> **Wireframe** : https://github.com/williambuirette/blaizbot-wireframe  
> **Date de création** : 22 décembre 2025  
> **Dernière mise à jour** : 22 décembre 2025

---

## 📋 Contexte du projet

### Ce qui a été fait ✅
- [x] Wireframe complet en HTML/CSS/JavaScript vanilla
- [x] 3 espaces utilisateur : Élève, Professeur, Administrateur
- [x] Interactions UI fonctionnelles (modales, onglets, navigation)
- [x] Design responsive
- [x] Code refactorisé avec modules ES6
- [x] Poussé sur GitHub comme référence

### Score du wireframe
- **Note globale** : 97/100
- **Architecture** : Bien structurée, composants réutilisables identifiés
- **UX/UI** : Navigation claire, interactions cohérentes

---

## 🎯 Vision du produit

**Blaiz'bot** est une plateforme éducative qui utilise l'IA pour :
1. Accompagner les élèves dans leur apprentissage (chatbot pédagogique)
2. Aider les professeurs à suivre leurs classes et créer du contenu
3. Permettre aux administrateurs de gérer l'établissement

---

## 🏗️ Architecture recommandée

### Stack technique suggérée

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
├─────────────────────────────────────────────────────────────┤
│  Framework   : React.js ou Vue.js                           │
│  Language    : TypeScript (fortement recommandé)            │
│  Styling     : Tailwind CSS ou CSS Modules                  │
│  State       : Zustand (React) / Pinia (Vue)                │
│  Build       : Vite                                         │
│  Tests       : Vitest + Playwright                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        BACKEND                               │
├─────────────────────────────────────────────────────────────┤
│  Framework   : Next.js 15 App Router (API Routes)           │
│  Database    : Vercel Postgres + Prisma ORM                 │
│  Auth        : NextAuth.js v5 (JWT sessions)                │
│  Validation  : Zod                                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     BASE DE DONNÉES                          │
├─────────────────────────────────────────────────────────────┤
│  Principal   : Vercel Postgres (PostgreSQL managé)          │
│  ORM         : Prisma (TypeScript, migrations)              │
│  Cache       : Redis (optionnel, sessions chat)             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      IA / CHATBOT                            │
├─────────────────────────────────────────────────────────────┤
│  LLM         : Gemini ou Anthropic Claude             │
│  RAG         : LangChain + Vector DB (Pinecone/Chroma)      │
│  Contenu     : Embeddings des cours pour réponses précises  │
└─────────────────────────────────────────────────────────────┘
```

### Structure de dossiers recommandée

```
blaizbot-app/
├── 📁 apps/
│   ├── 📁 web/                    # Frontend React/Vue
│   │   ├── 📁 src/
│   │   │   ├── 📁 components/     # Composants UI réutilisables
│   │   │   │   ├── 📁 chat/       # ChatWindow, ChatMessage, ChatInput
│   │   │   │   ├── 📁 calendar/   # CalendarView, EventCard
│   │   │   │   ├── 📁 common/     # Button, Modal, Card, Tabs
│   │   │   │   └── 📁 layout/     # Sidebar, Header, Navigation
│   │   │   ├── 📁 pages/          # Pages par rôle
│   │   │   │   ├── 📁 student/
│   │   │   │   ├── 📁 teacher/
│   │   │   │   └── 📁 admin/
│   │   │   ├── 📁 hooks/          # useAuth, useChat, useApi
│   │   │   ├── 📁 services/       # API calls, WebSocket
│   │   │   ├── 📁 store/          # État global
│   │   │   ├── 📁 types/          # Types TypeScript
│   │   │   └── 📁 utils/          # Helpers, formatters
│   │   └── package.json
│   │
│   └── 📁 api/                    # Backend Node.js/Python
│       ├── 📁 src/
│       │   ├── 📁 routes/         # /auth, /chat, /courses, /classes
│       │   ├── 📁 controllers/    # Logique métier
│       │   ├── 📁 models/         # Schémas Prisma/Mongoose
│       │   ├── 📁 middleware/     # Auth, validation, errors
│       │   ├── 📁 services/       # AI, email, notifications
│       │   └── 📁 utils/          # Helpers
│       └── package.json
│
├── 📁 packages/                   # Code partagé (monorepo)
│   ├── 📁 types/                  # Types partagés front/back
│   └── 📁 utils/                  # Utilitaires partagés
│
├── 📁 docs/                       # Documentation
│   ├── specifications.md
│   ├── api-reference.md
│   └── user-stories.md
│
├── 📁 wireframe/                  # Lien/copie du wireframe
├── docker-compose.yml
├── .github/workflows/             # CI/CD
└── README.md
```

---

## 📊 Modèle de données (ERD)

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    USER      │     │    CLASS     │     │   COURSE     │
├──────────────┤     ├──────────────┤     ├──────────────┤
│ id           │     │ id           │     │ id           │
│ email        │     │ name         │     │ title        │
│ password     │     │ level        │     │ subject      │
│ firstName    │     │ year         │     │ content      │
│ lastName     │     │ teacherId FK │────▶│ classId FK   │
│ role         │     │ createdAt    │     │ createdAt    │
│ avatar       │     └──────────────┘     └──────────────┘
│ createdAt    │            │
└──────────────┘            │
       │                    │
       │    ┌───────────────┴───────────────┐
       │    │                               │
       ▼    ▼                               ▼
┌──────────────────┐              ┌──────────────┐
│  CLASS_STUDENT   │              │   MESSAGE    │
├──────────────────┤              ├──────────────┤
│ classId FK       │              │ id           │
│ studentId FK     │              │ content      │
│ enrolledAt       │              │ role (user/ai)│
└──────────────────┘              │ userId FK    │
                                  │ sessionId    │
                                  │ createdAt    │
                                  └──────────────┘

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   HOMEWORK   │     │    GRADE     │     │    EVENT     │
├──────────────┤     ├──────────────┤     ├──────────────┤
│ id           │     │ id           │     │ id           │
│ title        │     │ value        │     │ title        │
│ description  │     │ comment      │     │ description  │
│ dueDate      │     │ homeworkId FK│     │ startDate    │
│ courseId FK  │     │ studentId FK │     │ endDate      │
│ createdAt    │     │ createdAt    │     │ type         │
└──────────────┘     └──────────────┘     │ userId FK    │
                                          └──────────────┘
```

---

## 🔐 Sécurité - Checklist

- [ ] Authentification JWT avec refresh tokens (expiration 15min/7j)
- [ ] Hashage mots de passe avec bcrypt (cost factor 12)
- [ ] Validation stricte des inputs (Zod côté serveur)
- [ ] Protection CORS configurée
- [ ] Rate limiting sur les endpoints sensibles
- [ ] Sanitization des données avant stockage
- [ ] HTTPS obligatoire en production
- [ ] Variables d'environnement pour les secrets
- [ ] Rôles et permissions (RBAC) : student, teacher, admin
- [ ] Audit logs des actions sensibles

---

## 🧪 Stratégie de tests

### Pyramide de tests
```
         ▲
        /E2E\           5% - Parcours critiques (Playwright)
       /─────\
      / Intég \         15% - API endpoints (Supertest)
     /─────────\
    /  Unitaires \      80% - Fonctions, composants (Vitest)
   /───────────────\
```

### Tests prioritaires
1. **Auth** : Login, logout, refresh token, permissions
2. **Chat** : Envoi message, réception réponse IA, historique
3. **CRUD** : Création/modification cours, classes, utilisateurs

---

## 📝 Conventions de code

### Commits (Conventional Commits)
```
feat: ajout du chat en temps réel
fix: correction du bug de déconnexion
docs: mise à jour du README
style: formatage du code
refactor: réorganisation des services
test: ajout tests unitaires auth
chore: mise à jour des dépendances
```

### Branches
```
main          ← Production stable
develop       ← Intégration continue
feature/*     ← Nouvelles fonctionnalités
fix/*         ← Corrections de bugs
release/*     ← Préparation release
```

### Code style
- ESLint + Prettier configurés
- Nommage : camelCase (variables), PascalCase (composants)
- Fichiers : kebab-case (chat-window.tsx)
- Maximum 300 lignes par fichier
- Fonctions < 50 lignes
- Commentaires JSDoc pour les fonctions publiques

---

## 📅 Plan de développement (phases)

### Phase 1 : Foundation (2-3 semaines)
- [ ] Setup projet (Vite + TypeScript + Tailwind)
- [ ] Configuration ESLint/Prettier
- [ ] CI/CD GitHub Actions
- [ ] Structure de dossiers
- [ ] Composants UI de base (Button, Modal, Card, Input)
- [ ] Layout principal (Sidebar, Header)
- [ ] Système de routing

### Phase 2 : Authentification (1-2 semaines)
- [ ] Backend : endpoints auth (register, login, logout, refresh)
- [ ] Frontend : pages login/register
- [ ] Middleware d'authentification
- [ ] Gestion des rôles (student, teacher, admin)
- [ ] Protection des routes

### Phase 3 : Chat IA - MVP (2-3 semaines)
- [ ] Interface chat (messages, input, historique)
- [ ] Intégration API OpenAI/Claude
- [ ] Streaming des réponses
- [ ] Contexte pédagogique (RAG basique)
- [ ] Sauvegarde des conversations

### Phase 4 : Dashboard Élève (2 semaines)
- [ ] Vue d'ensemble (stats, progression)
- [ ] Liste des cours
- [ ] Calendrier des devoirs
- [ ] Historique des notes

### Phase 5 : Dashboard Professeur (2-3 semaines)
- [ ] Gestion des classes
- [ ] Création de cours
- [ ] Attribution de devoirs
- [ ] Suivi des élèves
- [ ] Chat de classe

### Phase 6 : Dashboard Admin (1-2 semaines)
- [ ] Statistiques globales
- [ ] Gestion utilisateurs
- [ ] Configuration établissement
- [ ] Logs et audit

### Phase 7 : Polish & Deploy (1-2 semaines)
- [ ] Tests E2E complets
- [ ] Optimisation performances
- [ ] Documentation utilisateur
- [ ] Déploiement production

---

## 🛠️ Outils recommandés

| Catégorie | Outil | Usage |
|-----------|-------|-------|
| IDE | VS Code | Développement |
| API Testing | Bruno / Postman | Test endpoints |
| DB GUI | TablePlus / DBeaver | Gestion BDD |
| Design | Figma | Si évolutions UI |
| Monitoring | Sentry | Erreurs production |
| Analytics | Plausible / PostHog | Usage utilisateurs |
| Déploiement | Vercel (front) + Railway (back) | Hosting |

---

## 🔗 Ressources utiles

### Documentation
- [React](https://react.dev/) / [Vue](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Prisma](https://www.prisma.io/docs)
- [OpenAI API](https://platform.openai.com/docs)
- [LangChain](https://js.langchain.com/docs)

### Tutoriels recommandés
- Full-stack React + Node.js
- Intégration ChatGPT dans une app
- Authentification JWT sécurisée
- RAG avec LangChain

---

## 💡 Notes pour l'IA

> **À l'attention de l'IA qui reprendra ce projet :**
>
> 1. **Wireframe de référence** : Le dépôt actuel contient le wireframe complet. 
>    Consultez les fichiers HTML pour comprendre la structure des pages et les interactions.
>
> 2. **Fichiers clés du wireframe** :
>    - `index.html` : Page de connexion avec choix du rôle
>    - `student.html` : Dashboard élève complet
>    - `teacher.html` : Dashboard professeur complet  
>    - `admin.html` : Dashboard administrateur complet
>    - `style.css` : Tous les styles (2400+ lignes)
>    - `js/*.js` : Logique d'interaction
>
> 3. **Comportements implémentés dans le wireframe** :
>    - Navigation par onglets (sidebar)
>    - Modales pour les détails
>    - Chat simulé avec réponses automatiques
>    - Calendrier interactif
>    - Tableaux de données avec actions
>
> 4. **Ce qui doit être développé** :
>    - Backend réel (actuellement tout est simulé)
>    - Base de données
>    - Vraie authentification
>    - Intégration IA réelle
>    - Temps réel (WebSocket pour le chat)

---

## 📞 Contact

**Développeur** : Maxime Buirette  
**Projet** : Blaiz'bot - Vibecoding  
**Année** : 2025

---

*Ce document sera mis à jour au fur et à mesure de l'avancement du projet.*
