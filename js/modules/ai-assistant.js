/**
 * @fileoverview Module AI Assistant - Blaiz'bot Educational Platform
 * Gère l'assistant IA Blaiz'bot pour l'aide aux devoirs et les révisions
 * 
 * @module AIAssistantModule
 * @version 1.0.0
 */

import { ChatModule } from './chat.js';

// ==========================================
// ÉTAT DU MODULE
// ==========================================

/**
 * État interne de l'assistant
 * @type {Object}
 */
const AssistantState = {
    currentSubject: 'maths',
    currentTheme: null,
    sources: [],
    currentProject: null,
    isResizing: false,
    themes: {
        'maths': ['Les Fractions (Cours du 15/12)', 'Nombres Relatifs', 'Géométrie : Triangles'],
        'francais': ['La Poésie au XIXème', 'Grammaire : Le Passé Simple', 'Analyse de texte'],
        'histoire': ['La Révolution Française', 'La Première Guerre Mondiale', 'Géographie : Les Climats']
    },
    config: {
        chatContainerId: 'chat-messages',
        chatInputId: 'chat-input',
        workspaceOutputId: 'assistant-workspace-output',
        subjectSelectId: 'chat-subject',
        themeSelectId: 'chat-theme'
    }
};

/**
 * Projets de l'assistant (cours du professeur)
 * @type {Array}
 */
let assistantProjects = [];

// ==========================================
// GESTION DU CONTEXTE
// ==========================================

/**
 * Met à jour le contexte de chat selon la matière sélectionnée
 */
function updateChatContext() {
    const subjectSelect = document.getElementById(AssistantState.config.subjectSelectId);
    const themeSelect = document.getElementById(AssistantState.config.themeSelectId);
    
    if (!subjectSelect || !themeSelect) return;

    const subject = subjectSelect.value;
    AssistantState.currentSubject = subject;

    // Mettre à jour les thèmes disponibles
    const themes = AssistantState.themes[subject] || [];
    themeSelect.innerHTML = themes.map(t => `<option>${t}</option>`).join('');

    // Message de confirmation
    const subjectNames = {
        'maths': 'Mathématiques',
        'francais': 'Français',
        'histoire': 'Histoire-Géo'
    };
    
    addBotMessage(`D'accord ! Je me concentre maintenant sur tes cours de **${subjectNames[subject] || subject}**. Sur quel chapitre veux-tu travailler ?`);
}

/**
 * Définit les thèmes disponibles pour une matière
 * @param {string} subject - Code matière
 * @param {string[]} themes - Liste des thèmes
 */
function setThemes(subject, themes) {
    AssistantState.themes[subject] = themes;
}

// ==========================================
// GESTION DES MESSAGES
// ==========================================

/**
 * Ajoute un message du bot Blaiz'bot
 * @param {string} text - Contenu du message (supporte Markdown basique)
 */
function addBotMessage(text) {
    const chatMessages = document.getElementById(AssistantState.config.chatContainerId);
    if (!chatMessages) return;

    const msg = document.createElement('div');
    msg.style.cssText = 'margin-bottom: 15px; display: flex; gap: 10px; animation: highlightNew 0.5s ease-out;';
    msg.innerHTML = `
        <div style="width: 35px; height: 35px; background: #3498db; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">B</div>
        <div style="background: #f1f2f6; padding: 12px; border-radius: 0 15px 15px 15px; max-width: 80%; font-size: 0.9rem;">
            ${text}
        </div>
    `;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Envoie un message de l'étudiant et génère une réponse
 */
function sendStudentMessage() {
    const input = document.getElementById(AssistantState.config.chatInputId);
    if (!input) return;

    const text = input.value.trim();
    if (!text) return;

    const chatMessages = document.getElementById(AssistantState.config.chatContainerId);
    if (!chatMessages) return;

    // Message de l'utilisateur
    const msg = document.createElement('div');
    msg.style.cssText = 'margin-bottom: 15px; display: flex; gap: 10px; justify-content: flex-end;';
    msg.innerHTML = `
        <div style="background: #3498db; color: white; padding: 12px; border-radius: 15px 15px 0 15px; max-width: 80%; font-size: 0.9rem;">
            ${text}
        </div>
    `;
    chatMessages.appendChild(msg);
    input.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulation de réponse IA
    setTimeout(() => {
        addBotMessage("C'est une excellente question ! En me basant sur ton cours, voici l'explication...");
    }, 1000);
}

// ==========================================
// GÉNÉRATION DE CONTENU IA
// ==========================================

/**
 * Ouvre la modale de configuration pour générer du contenu
 * @param {string} type - Type de contenu ('quiz', 'methode', 'synthese')
 */
function openAssistantConfig(type) {
    const modal = document.getElementById('lab-config-modal');
    const configTitle = document.getElementById('lab-config-title');
    const confirmBtn = document.getElementById('lab-config-confirm-btn');
    const promptInput = document.getElementById('lab-contextual-prompt');

    if (!modal) return;

    modal.style.display = 'flex';
    promptInput.value = '';
    setTimeout(() => promptInput.focus(), 50);

    const labels = {
        'quiz': '🎲 Configurer le Quiz',
        'methode': '🧠 Configurer la Méthode',
        'synthese': '📄 Configurer le Résumé'
    };

    configTitle.innerText = labels[type] || 'Configuration';

    confirmBtn.onclick = () => {
        const userInstructions = promptInput.value.trim();
        closeConfigModal();
        generateAssistantOutput(type, userInstructions);
    };

    modal.onclick = (e) => {
        if (e.target === modal) closeConfigModal();
    };
}

/**
 * Ferme la modale de configuration
 */
function closeConfigModal() {
    const modal = document.getElementById('lab-config-modal');
    if (modal) modal.style.display = 'none';
}

/**
 * Génère le contenu IA dans l'espace de travail
 * @param {string} type - Type de contenu
 * @param {string} instructions - Instructions personnalisées
 */
function generateAssistantOutput(type, instructions = '') {
    const output = document.getElementById(AssistantState.config.workspaceOutputId);
    if (!output) return;

    // Affichage du loader
    output.innerHTML = `
        <div style="text-align:center; margin-top:50px;">
            <div class="loading-spinner"></div>
            <br>Génération de votre ${type}...
        </div>
    `;

    setTimeout(() => {
        const instrText = instructions 
            ? `<p style="font-size:0.75rem; color:#3498db; font-style:italic; background:#e3f2fd; padding:5px; border-radius:4px;">Instructions : "${instructions}"</p>` 
            : '';

        const contents = {
            'quiz': `
                <h4>🎲 Quiz d'entraînement</h4>
                ${instrText}
                <p>Basé sur le cours de ton prof :</p>
                <ol>
                    <li>Question sur les fractions...</li>
                    <li>Question sur les dénominateurs...</li>
                    <li>Question sur les opérations...</li>
                </ol>
            `,
            'methode': `
                <h4>🧠 Méthode de révision</h4>
                ${instrText}
                <p>Planning suggéré :</p>
                <ul>
                    <li>Lundi : Relecture active</li>
                    <li>Mercredi : Exercices d'application</li>
                    <li>Vendredi : Auto-évaluation</li>
                </ul>
            `,
            'synthese': `
                <h4>📄 Résumé du cours</h4>
                ${instrText}
                <p>Points clés à retenir :</p>
                <ul>
                    <li>Concept principal...</li>
                    <li>Formule importante...</li>
                    <li>Exemple d'application...</li>
                </ul>
            `
        };

        output.innerHTML = (contents[type] || '<p>Contenu généré</p>') + `
            <button class="btn-small" style="margin-top:10px; width:100%;">📥 Télécharger en PDF</button>
        `;

        addBotMessage(`Ton document **${type}** est prêt dans l'espace de travail !`);
    }, 1500);
}

/**
 * Génère un quiz
 */
function generateQuiz() {
    openAssistantConfig('quiz');
}

/**
 * Génère une méthode de révision
 */
function getRevisionMethod() {
    openAssistantConfig('methode');
}

/**
 * Explique un exercice avec des indices
 */
function explainExercise() {
    const output = document.getElementById(AssistantState.config.workspaceOutputId);
    if (!output) return;

    output.innerHTML = `
        <div style="text-align:center; margin-top:50px;">
            <div class="loading-spinner"></div>
            <br>Analyse de l'exercice...
        </div>
    `;

    setTimeout(() => {
        output.innerHTML = `
            <h4>❓ Aide à l'exercice</h4>
            <p style="background: #fff9c4; padding: 10px; border-radius: 5px; border-left: 4px solid #f1c40f;">
                <strong>Consigne détectée :</strong> Calculer la somme de 3/4 et 1/2.
            </p>
            <p><strong>Indice 1 :</strong> Pour additionner des fractions, elles doivent avoir le même dénominateur.</p>
            <p><strong>Indice 2 :</strong> Quel est le plus petit multiple commun de 4 et 2 ?</p>
            <button class="btn-small" style="width:100%; margin-top:10px;" onclick="AIAssistantModule.showNextHint()">
                Demander l'indice suivant
            </button>
        `;
        addBotMessage("J'ai analysé ton exercice. Regarde dans l'espace de travail à droite pour les premiers indices !");
    }, 1500);
}

/**
 * Affiche l'indice suivant (simulation)
 */
function showNextHint() {
    addBotMessage("**Indice 3 :** Le dénominateur commun est 4. Maintenant, comment transformer 1/2 pour avoir un dénominateur de 4 ?");
}

// ==========================================
// GESTION DES SOURCES
// ==========================================

/**
 * Demande une source à l'utilisateur
 */
function promptAddSource() {
    const name = prompt("Nom de votre source (Lien ou nom de fichier) :");
    if (name) {
        addSourceItem(name, 'web');
    }
}

/**
 * Ajoute une source à l'assistant
 * @param {string} name - Nom de la source
 * @param {string} type - Type ('pdf', 'web')
 */
function addSourceItem(name, type) {
    const sourcesList = document.getElementById('assistant-student-sources');
    if (!sourcesList) return;

    if (sourcesList.innerText === "Aucune source perso.") {
        sourcesList.innerHTML = '';
    }

    const icon = type === 'pdf' ? '📄' : '🌐';
    const sourceItem = document.createElement('div');
    sourceItem.className = 'source-item';
    sourceItem.innerHTML = `
        <div class="source-icon">${icon}</div>
        <span style="flex-grow: 1; font-size: 0.8rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${name}</span>
        <button style="border: none; background: none; cursor: pointer; color: #e74c3c;" onclick="this.parentElement.remove()">✕</button>
    `;
    sourcesList.appendChild(sourceItem);

    AssistantState.sources.push({ name, type });
    addBotMessage(`J'ai ajouté ta source **${name}**. Je l'utiliserai en complément des cours de ton professeur.`);
}

/**
 * Gère l'upload d'un fichier par l'étudiant
 * @param {HTMLInputElement} input - Input file
 */
function handleFileUpload(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        addSourceItem(file.name, 'pdf');

        setTimeout(() => {
            addBotMessage(`Analyse de **${file.name}** terminée ! C'est un exercice sur les fractions. Regarde dans l'espace de travail si tu veux une aide étape par étape.`);
        }, 1500);
    }
}

// ==========================================
// RESIZE MANAGEMENT
// ==========================================

function initResize(e, side) {
    AssistantState.isResizing = true;

    const container = document.getElementById('assistant-container');
    const leftCol = document.getElementById('assistant-col-sources');
    const rightCol = document.getElementById('assistant-col-workspace');

    if (!container || !leftCol || !rightCol) {
        AssistantState.isResizing = false;
        return;
    }

    document.body.classList.add('is-resizing');
    document.body.style.cursor = 'col-resize';

    leftCol.style.flex = 'none';
    rightCol.style.flex = 'none';

    const onMouseMove = (evt) => {
        if (!AssistantState.isResizing) return;

        const containerRect = container.getBoundingClientRect();
        const minMiddleWidth = 200;
        const containerWidth = containerRect.width;

        if (side === 'left') {
            let newWidth = evt.clientX - containerRect.left;

            if (newWidth < 20) newWidth = 0;
            if (newWidth > 500) newWidth = 500;

            const rightWidth = rightCol.offsetWidth;
            if (containerWidth - newWidth - rightWidth < minMiddleWidth) {
                newWidth = containerWidth - rightWidth - minMiddleWidth;
            }

            if (newWidth < 0) newWidth = 0;

            leftCol.style.width = newWidth + 'px';
            leftCol.style.minWidth = newWidth + 'px';
            leftCol.style.opacity = newWidth < 30 ? '0' : '1';
            leftCol.style.pointerEvents = newWidth < 30 ? 'none' : 'auto';
        } else {
            let newWidth = containerRect.right - evt.clientX;

            if (newWidth < 20) newWidth = 0;
            if (newWidth > 500) newWidth = 500;

            const leftWidth = leftCol.offsetWidth;
            if (containerWidth - newWidth - leftWidth < minMiddleWidth) {
                newWidth = containerWidth - leftWidth - minMiddleWidth;
            }

            if (newWidth < 0) newWidth = 0;

            rightCol.style.width = newWidth + 'px';
            rightCol.style.minWidth = newWidth + 'px';
            rightCol.style.opacity = newWidth < 30 ? '0' : '1';
            rightCol.style.pointerEvents = newWidth < 30 ? 'none' : 'auto';
        }
    };

    const onMouseUp = () => {
        AssistantState.isResizing = false;
        document.body.classList.remove('is-resizing');
        document.body.style.cursor = 'default';
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

function resetLayout(side) {
    const leftCol = document.getElementById('assistant-col-sources');
    const rightCol = document.getElementById('assistant-col-workspace');

    if (side === 'left' && leftCol) {
        leftCol.style.width = '280px';
        leftCol.style.minWidth = '280px';
        leftCol.style.opacity = '1';
        leftCol.style.pointerEvents = 'auto';
    } else if (side === 'right' && rightCol) {
        rightCol.style.width = '300px';
        rightCol.style.minWidth = '300px';
        rightCol.style.opacity = '1';
        rightCol.style.pointerEvents = 'auto';
    }
}

// ==========================================
// GESTION DES PROJETS ASSISTANT
// ==========================================

/**
 * Charge les projets de l'assistant depuis le localStorage
 */
function loadProjects() {
    const stored = localStorage.getItem('assistantProjects');
    if (stored) {
        try {
            assistantProjects = JSON.parse(stored);
        } catch (e) {
            console.error('[AIAssistant] Erreur parsing projets:', e);
        }
    }

    // Données par défaut si vide
    if (!assistantProjects || assistantProjects.length === 0) {
        assistantProjects = [
            { id: 101, title: "Mathématiques - 6ème : Les Fractions", subject: "maths", date: "21/12/2025", sources: 4 },
            { id: 102, title: "Mathématiques - 6ème : Géométrie de base", subject: "maths", date: "20/12/2025", sources: 2 },
            { id: 103, title: "Français - 3ème : La Poésie au XIXème", subject: "francais", date: "19/12/2025", sources: 3 },
            { id: 104, title: "Histoire-Géo : La Guerre Froide", subject: "histoire", date: "15/12/2025", sources: 5 }
        ];
        saveProjects();
    }
}

/**
 * Sauvegarde les projets dans le localStorage
 */
function saveProjects() {
    localStorage.setItem('assistantProjects', JSON.stringify(assistantProjects));
}

/**
 * Affiche le dashboard des projets assistant
 */
function showDashboard() {
    const dashboard = document.getElementById('assistant-dashboard');
    const workspace = document.getElementById('assistant-workspace-view');
    const actions = document.getElementById('assistant-header-actions');

    if (dashboard) dashboard.style.display = 'block';
    if (workspace) workspace.style.display = 'none';
    if (actions) actions.style.display = 'none';

    renderProjects();
}

/**
 * Rend la liste des projets
 */
function renderProjects() {
    const grid = document.getElementById('assistant-projects-grid');
    if (!grid) return;

    grid.innerHTML = '';

    assistantProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.onclick = () => openProject(project.id);

        const icons = { 'maths': '📐', 'francais': '✍️', 'histoire': '🌍' };
        const icon = icons[project.subject] || '📚';

        card.innerHTML = `
            <div class="project-icon" style="background:#e3f2fd; color:#3498db;">${icon}</div>
            <div style="position: absolute; top: 10px; right: 10px; font-size: 0.7rem; background: #3498db; color: white; padding: 2px 6px; border-radius: 10px;">Professeur</div>
            <h3>${project.title}</h3>
            <p>${project.sources} documents de cours</p>
            <div class="project-meta"><span>Mis à jour le</span><span>${project.date}</span></div>
        `;
        grid.appendChild(card);
    });
}

/**
 * Ouvre un projet assistant
 * @param {number} id - ID du projet
 */
function openProject(id) {
    const project = assistantProjects.find(p => p.id === id);
    if (!project) return;

    AssistantState.currentProject = project;

    const dashboard = document.getElementById('assistant-dashboard');
    const workspace = document.getElementById('assistant-workspace-view');
    const actions = document.getElementById('assistant-header-actions');
    const title = document.getElementById('current-assistant-title');
    const subjectSelect = document.getElementById(AssistantState.config.subjectSelectId);

    if (dashboard) dashboard.style.display = 'none';
    if (workspace) workspace.style.display = 'block';
    if (actions) actions.style.display = 'none';
    if (title) title.innerText = `Cours : ${project.title}`;
    if (subjectSelect) subjectSelect.value = project.subject;

    updateChatContext();
}

/**
 * Récupère le projet courant
 * @returns {Object|null}
 */
function getCurrentProject() {
    return AssistantState.currentProject;
}

// ==========================================
// API PUBLIQUE DU MODULE
// ==========================================

/**
 * Module AI Assistant - API Publique
 * @namespace AIAssistantModule
 */
const AIAssistantModule = {
    /**
     * Initialise le module
     * @param {Object} [config] - Configuration optionnelle
     */
    init(config = {}) {
        AssistantState.config = { ...AssistantState.config, ...config };
        loadProjects();
    },

    // Contexte
    updateChatContext,
    setThemes,

    // Messages
    addBotMessage,
    sendStudentMessage,

    // Génération IA
    generateQuiz,
    getRevisionMethod,
    explainExercise,
    openAssistantConfig,
    generateAssistantOutput,
    showNextHint,

    // Sources
    promptAddSource,
    addSourceItem,
    handleFileUpload,

    // Resize
    initResize,
    resetLayout,

    // Projets
    showDashboard,
    renderProjects,
    openProject,
    getCurrentProject,
    getProjects: () => [...assistantProjects],

    // État
    getState: () => ({ ...AssistantState })
};

// Export ES6
export { AIAssistantModule };

// Export global
if (typeof window !== 'undefined') {
    window.AIAssistantModule = AIAssistantModule;
}
