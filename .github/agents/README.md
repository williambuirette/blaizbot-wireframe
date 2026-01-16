# Agents IA - BlaizBot Wireframe

> Agents spécialisés pour la documentation technique du wireframe

---

## 📚 Liste des Agents

| Agent | Mission | Usage |
|-------|---------|-------|
| **@WireframeDoc** | Transformer des captures d'écran en documentation technique structurée | `@WireframeDoc [capture(s)] Voici [description]` |

---

## 🎯 @WireframeDoc

### Mission
Analyser des captures d'écran de pages/modales de BlaizBot et créer automatiquement :
1. La documentation technique dans `pages/role/section/fichier.md`
2. La mise à jour de `NAVIGATION-ROADMAP.md`

### Workflow
```
1. Analyser visuellement la capture
   ├─ Identifier le rôle (Admin/Teacher/Student)
   ├─ Déterminer le type (Dashboard/Liste/Détail/Modale)
   └─ Repérer les composants UI

2. Créer le fichier .md
   ├─ En-tête (Route, Rôle, Composant)
   ├─ Aperçu visuel (ASCII art)
   ├─ Composants utilisés
   ├─ API endpoints
   ├─ Types TypeScript
   └─ Comportements

3. Synchroniser NAVIGATION-ROADMAP.md
   ├─ Ajouter dans l'arborescence visuelle
   └─ Créer le lien dans la section du rôle
```

### Exemples d'utilisation

#### Modale simple
```
@WireframeDoc [photo] Voici la modale de création d'utilisateur (admin)
```

#### Dashboard complet
```
@WireframeDoc [3 photos] Dashboard élève avec vue d'ensemble, cours et coach IA
```

#### Page de détail
```
@WireframeDoc [photo] Voici la page de détail d'un cours (teacher)
```

---

## 📐 Structure Cible

L'agent respecte cette arborescence :

```
pages/
├── _TEMPLATE.md                    # Template de référence
├── NAVIGATION-ROADMAP.md           # Roadmap mise à jour automatiquement
│
├── admin/
│   ├── 00-dashboard.md
│   ├── header-menu/
│   │   ├── mon-profil.md
│   │   ├── parametres.md
│   │   └── config-ia.md
│   ├── users/
│   │   ├── liste.md
│   │   ├── create.md
│   │   └── edit.md
│   ├── classes/
│   └── subjects/
│
├── teacher/
│   ├── dashboard.md
│   ├── header-menu/
│   ├── classes/
│   ├── students/
│   ├── courses/
│   │   └── detail/
│   │       └── cards/
│   │           ├── lesson/
│   │           ├── video/
│   │           ├── exercise/
│   │           └── quiz/
│   ├── agendas-assignations/
│   └── messages/
│
└── student/
    ├── dashboard.md
    ├── courses/
    ├── agenda/
    ├── revisions/
    ├── messages/
    ├── ai/
    └── coach/
```

---

## ✅ Garanties de Qualité

Chaque fichier créé contient :
- ✓ En-tête complet (Route, Rôle, Composant source)
- ✓ Parcours utilisateur (si applicable)
- ✓ Aperçu visuel en ASCII art
- ✓ Liste des composants shadcn/ui
- ✓ API endpoints
- ✓ Types TypeScript
- ✓ Champs de formulaire (si formulaire)
- ✓ Règles de validation
- ✓ Comportements et actions
- ✓ Synchronisation avec NAVIGATION-ROADMAP.md

---

## 🔧 Maintenance

Pour ajouter un nouvel agent :
1. Créer le fichier `.github/agents/nom-agent.md`
2. Suivre le format du template
3. Mettre à jour ce README
4. Référencer dans `blaizbot-wireframe/README.md`

---

## 📖 Documentation

- [Template de page](../pages/_TEMPLATE.md)
- [Roadmap de navigation](../pages/NAVIGATION-ROADMAP.md)
- [Exemple : create.md](../pages/admin/classes/create.md)
