/**
 * Module Lab - Blaiz'Lab
 * Gère l'espace de travail projet avec sources, chat et génération de contenus
 * @module LabModule
 */

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

/**
 * État interne du module Lab
 * @type {Object}
 */
const LabState = {
    /** @type {Array<{id: number, title: string, date: string, sources: number}>} */
    projects: [],
    /** @type {{id: number, title: string, date: string, sources: number}|null} */
    currentProject: null,
    /** @type {Array<{name: string, type: string}>} */
    sources: [],
    /** @type {boolean} */
    isResizing: false
};

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialise le module Lab
 * @param {Object} options - Options d'initialisation
 * @param {string} [options.storageKey='labProjects'] - Clé localStorage
 * @param {Array} [options.defaultProjects] - Projets par défaut
 */
function init(options = {}) {
    const storageKey = options.storageKey || 'labProjects';
    
    try {
        const stored = localStorage.getItem(storageKey);
        LabState.projects = stored ? JSON.parse(stored) : (options.defaultProjects || []);
    } catch (e) {
        console.error('Erreur chargement projets Lab:', e);
        LabState.projects = options.defaultProjects || [];
    }
    
    renderProjects();
}

// ============================================================================
// PROJECT MANAGEMENT
// ============================================================================

/**
 * Charge et retourne la liste des projets
 * @returns {Array} Liste des projets
 */
function loadProjects() {
    try {
        const stored = localStorage.getItem('labProjects');
        LabState.projects = stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Erreur chargement projets:', e);
        LabState.projects = [];
    }
    return LabState.projects;
}

/**
 * Sauvegarde les projets dans localStorage
 */
function saveProjects() {
    try {
        localStorage.setItem('labProjects', JSON.stringify(LabState.projects));
    } catch (e) {
        console.error('Erreur sauvegarde projets:', e);
    }
}

/**
 * Affiche le rendu des projets dans la liste
 */
function renderProjects() {
    const container = document.getElementById('lab-projects-list');
    if (!container) return;

    if (LabState.projects.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; color: #7f8c8d; margin-top: 20px;">
                <p>Aucun projet créé.</p>
                <p style="font-size: 0.85rem;">Créez votre premier projet pour commencer.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = LabState.projects.map(project => `
        <div class="project-card" onclick="LabModule.openProject(${project.id})" style="cursor: pointer; padding: 15px; background: white; border-radius: 10px; margin-bottom: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: transform 0.2s;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4 style="margin: 0; color: #9b59b6;">${project.title}</h4>
                <span style="font-size: 0.75rem; color: #95a5a6;">${project.date}</span>
            </div>
            <div style="margin-top: 8px; font-size: 0.85rem; color: #7f8c8d;">
                📚 ${project.sources || 0} sources
            </div>
        </div>
    `).join('');
}

/**
 * Ouvre la modal de création de projet
 */
function openCreateModal() {
    const modal = document.getElementById('create-project-modal');
    const confirmBtn = document.getElementById('confirm-create-project');
    const input = document.getElementById('new-project-name');

    if (!modal || !confirmBtn || !input) return;

    input.value = "";
    modal.style.display = 'flex';

    confirmBtn.onclick = () => {
        const name = input.value.trim();
        if (!name) return alert("Veuillez donner un nom à votre projet !");
        
        const newProject = { 
            id: Date.now(), 
            title: name, 
            date: new Date().toLocaleDateString(), 
            sources: 0 
        };
        
        LabState.projects.unshift(newProject);
        saveProjects();
        openProject(newProject.id);
        closeCreateModal();
    };
}

/**
 * Ferme la modal de création de projet
 */
function closeCreateModal() {
    const modal = document.getElementById('create-project-modal');
    if (modal) modal.style.display = 'none';
}

/**
 * Ouvre un projet existant
 * @param {number} projectId - ID du projet à ouvrir
 */
function openProject(projectId) {
    LabState.currentProject = LabState.projects.find(p => p.id === projectId);
    
    const dashboard = document.getElementById('lab-dashboard');
    const workspace = document.getElementById('lab-workspace-view');
    const headerActions = document.getElementById('lab-header-actions');
    const titleEl = document.getElementById('current-project-title');
    
    if (dashboard) dashboard.style.display = 'none';
    if (workspace) workspace.style.display = 'block';
    if (headerActions) headerActions.style.display = 'none';
    if (titleEl && LabState.currentProject) {
        titleEl.innerText = LabState.currentProject.title;
    }
    
    clearChat();
}

/**
 * Retourne au dashboard depuis le workspace
 */
function backToDashboard() {
    const dashboard = document.getElementById('lab-dashboard');
    const workspace = document.getElementById('lab-workspace-view');
    const headerActions = document.getElementById('lab-header-actions');
    
    if (dashboard) dashboard.style.display = 'block';
    if (workspace) workspace.style.display = 'none';
    if (headerActions) headerActions.style.display = 'flex';
    
    LabState.currentProject = null;
    renderProjects();
}

/**
 * Retourne le projet actuellement ouvert
 * @returns {{id: number, title: string, date: string, sources: number}|null}
 */
function getCurrentProject() {
    return LabState.currentProject;
}

// ============================================================================
// SOURCE MANAGEMENT
// ============================================================================

/**
 * Affiche la liste des sources du projet
 */
function renderSources() {
    const sourcesList = document.getElementById('lab-sources-list');
    if (!sourcesList) return;
    
    const noSourcesMsg = document.getElementById('no-sources-msg');
    
    if (LabState.sources.length === 0) {
        if (noSourcesMsg) noSourcesMsg.style.display = 'block';
        sourcesList.innerHTML = `
            <div style="text-align: center; color: #95a5a6; font-size: 0.8rem; margin-top: 20px;" id="no-sources-msg">
                Aucune source.<br>Importez des fichiers, liens ou vidéos.
            </div>
        `;
        return;
    }

    if (noSourcesMsg) noSourcesMsg.style.display = 'none';
    sourcesList.innerHTML = '';

    LabState.sources.forEach((source, index) => {
        const icon = source.type === 'pdf' ? '📄' : source.type === 'yt' ? '🎥' : '🌐';
        const iconClass = source.type === 'pdf' ? 'icon-pdf' : source.type === 'yt' ? 'icon-yt' : 'icon-web';

        const sourceItem = document.createElement('div');
        sourceItem.className = 'source-item';
        sourceItem.innerHTML = `
            <div class="source-icon ${iconClass}">${icon}</div>
            <span style="flex-grow: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${source.name}</span>
            <button style="border: none; background: none; cursor: pointer; color: #e74c3c;" onclick="LabModule.removeSource(${index})">✕</button>
        `;
        sourcesList.appendChild(sourceItem);
    });
}

/**
 * Ajoute une source au projet
 * @param {string} name - Nom de la source
 * @param {string} type - Type: 'pdf', 'web', 'yt'
 */
function addSource(name, type) {
    LabState.sources.push({ name, type });
    renderSources();
    addBotMessage(`J'ai ajouté la source **${name}** (${type}). Je l'analyse pour l'intégrer à ton projet.`);
}

/**
 * Supprime une source par son index
 * @param {number} index - Index de la source à supprimer
 */
function removeSource(index) {
    LabState.sources.splice(index, 1);
    renderSources();
}

/**
 * Demande l'ajout d'une source (URL ou YouTube)
 * @param {string} type - Type: 'web' ou 'yt'
 */
function promptAddSource(type) {
    let val = "";
    if (type === 'web') val = prompt("Entrez l'URL du site internet :");
    if (type === 'yt') val = prompt("Entrez l'URL de la vidéo YouTube :");
    
    if (val) {
        addSource(val, type);
    }
}

/**
 * Gère l'upload d'un fichier source
 * @param {HTMLInputElement} input - Input file element
 */
function handleFileUpload(input) {
    if (input.files && input.files[0]) {
        addSource(input.files[0].name, 'pdf');
    }
}

// ============================================================================
// CHAT MANAGEMENT
// ============================================================================

/**
 * Réinitialise le chat du projet
 */
function clearChat() {
    const chat = document.getElementById('lab-chat-messages');
    if (!chat) return;
    
    const projectTitle = LabState.currentProject ? LabState.currentProject.title : 'Nouveau Projet';
    
    chat.innerHTML = `
        <div style="margin-bottom: 15px; display: flex; gap: 10px;">
            <div style="width: 35px; height: 35px; background: #9b59b6; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">L</div>
            <div style="background: #f3e5f5; padding: 12px; border-radius: 0 15px 15px 15px; max-width: 80%; font-size: 0.9rem;">
                Bonjour ! Je suis prêt à travailler sur le projet "<strong>${projectTitle}</strong>". 
                <br><br>
                Importe tes sources à gauche pour commencer.
            </div>
        </div>
    `;
    
    LabState.sources = [];
    renderSources();
}

/**
 * Ajoute un message du bot dans le chat
 * @param {string} text - Texte du message (supporte le markdown basique)
 */
function addBotMessage(text) {
    const chatMessages = document.getElementById('lab-chat-messages');
    if (!chatMessages) return;
    
    const botMsg = document.createElement('div');
    botMsg.style.cssText = "margin-bottom: 15px; display: flex; gap: 10px; animation: highlightNew 0.5s ease-out;";
    botMsg.innerHTML = `
        <div style="width: 35px; height: 35px; background: #9b59b6; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">L</div>
        <div style="background: #f3e5f5; padding: 12px; border-radius: 0 15px 15px 15px; max-width: 80%; font-size: 0.9rem;">
            ${text}
        </div>
    `;
    chatMessages.appendChild(botMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Envoie un message utilisateur dans le chat Lab
 */
function sendMessage() {
    const input = document.getElementById('lab-chat-input');
    if (!input) return;
    
    const text = input.value.trim();
    if (!text) return;

    const chatMessages = document.getElementById('lab-chat-messages');
    if (!chatMessages) return;
    
    const userMsg = document.createElement('div');
    userMsg.style.cssText = "margin-bottom: 15px; display: flex; gap: 10px; justify-content: flex-end;";
    userMsg.innerHTML = `<div style="background: #9b59b6; color: white; padding: 12px; border-radius: 15px 15px 0 15px; max-width: 80%; font-size: 0.9rem;">${text}</div>`;
    chatMessages.appendChild(userMsg);
    input.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simuler une réponse du bot
    setTimeout(() => {
        addBotMessage("En analysant tes sources (PDF, Web, YouTube), voici ma réponse...");
    }, 1000);
}

/**
 * Gère l'upload d'un fichier dans le chat
 * @param {HTMLInputElement} input - Input file element
 */
function handleChatFile(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const chatMessages = document.getElementById('lab-chat-messages');
        if (!chatMessages) return;
        
        const msg = document.createElement('div');
        msg.style.cssText = "margin-bottom: 15px; display: flex; gap: 10px; justify-content: flex-end;";
        msg.innerHTML = `
            <div style="background: #ecf0f1; color: #2c3e50; padding: 10px 15px; border-radius: 15px; font-size: 0.85rem; border: 1px dashed #bdc3c7;">
                📎 Fichier joint : ${file.name}
            </div>
        `;
        chatMessages.appendChild(msg);
        addBotMessage(`Fichier **${file.name}** reçu dans le fil de discussion. Je l'ajoute temporairement au contexte.`);
    }
}

/**
 * Réinitialise complètement le projet (après confirmation)
 */
function resetProject() {
    if (confirm("Voulez-vous réinitialiser tout le projet ?")) {
        LabState.sources = [];
        renderSources();
        clearChat();
    }
}

// ============================================================================
// OUTPUT GENERATION
// ============================================================================

/**
 * Ouvre la modal de configuration pour un type de sortie
 * @param {string} type - Type: 'synthese', 'quiz', 'flashcards', 'mindmap'
 */
function openConfig(type) {
    const modal = document.getElementById('lab-config-modal');
    const configTitle = document.getElementById('lab-config-title');
    const confirmBtn = document.getElementById('lab-config-confirm-btn');
    const promptInput = document.getElementById('lab-contextual-prompt');

    if (!modal || !configTitle || !confirmBtn || !promptInput) return;

    modal.style.display = 'flex';
    promptInput.value = "";
    
    setTimeout(() => promptInput.focus(), 50);
    
    const labels = {
        'synthese': "📝 Configurer la Synthèse",
        'quiz': "🎲 Configurer le Quiz",
        'flashcards': "🗂️ Configurer les Flashcards",
        'mindmap': "🧠 Configurer la Carte Mentale"
    };

    configTitle.innerText = labels[type] || "Configuration";
    
    confirmBtn.onclick = () => {
        const userInstructions = promptInput.value.trim();
        closeConfigModal();
        generateOutput(type, userInstructions);
    };

    modal.onclick = (e) => {
        if (e.target === modal) closeConfigModal();
    };
}

/**
 * Ferme la modal de configuration
 */
function closeConfigModal() {
    const modal = document.getElementById('lab-config-modal');
    if (modal) modal.style.display = 'none';
}

/**
 * Génère une sortie (synthèse, quiz, flashcards, mindmap)
 * @param {string} type - Type de sortie
 * @param {string} [instructions] - Instructions personnalisées
 */
function generateOutput(type, instructions = "") {
    const output = document.getElementById('lab-workspace-output');
    if (!output) return;
    
    output.innerHTML = `<div style="text-align:center; margin-top:50px;"><div class="loading-spinner"></div><br>Génération de votre ${type}...</div>`;
    
    setTimeout(() => {
        const instrText = instructions 
            ? `<p style="font-size:0.75rem; color:#8e44ad; font-style:italic; background:#f5f0ff; padding:5px; border-radius:4px;">Instructions appliquées : "${instructions}"</p>` 
            : "";

        const templates = {
            'synthese': `<h4>📝 Synthèse du Projet</h4>${instrText}<p>Basé sur vos sources, voici les points clés : ...</p>`,
            'quiz': `<h4>🎲 Quiz d'entraînement</h4>${instrText}<ol><li>Question 1...</li><li>Question 2...</li></ol>`,
            'flashcards': `<h4>🗂️ Flashcards</h4>${instrText}<div style='padding:10px; border:1px solid #9b59b6; border-radius:5px;'>Recto: Concept A<br>Verso: Définition A</div>`,
            'mindmap': `<h4>🧠 Carte Mentale</h4>${instrText}<p>[Représentation visuelle générée : Concept Central -> Branche 1, Branche 2]</p>`
        };
        
        const content = templates[type] || '<p>Type non reconnu</p>';
        output.innerHTML = content + `<button class="btn-small" style="margin-top:10px; width:100%;">📥 Télécharger en PDF</button>`;
        addBotMessage(`Ton document **${type}** est prêt dans l'espace de travail !`);
    }, 1500);
}

// ============================================================================
// RESIZE MANAGEMENT
// ============================================================================

/**
 * Initialise le redimensionnement des colonnes
 * @param {MouseEvent} e - Événement souris
 * @param {string} side - Côté: 'left' ou 'right'
 */
function initResize(e, side) {
    LabState.isResizing = true;
    
    const container = document.getElementById('lab-container');
    const leftCol = document.getElementById('lab-col-sources');
    const rightCol = document.getElementById('lab-col-workspace');
    
    if (!container || !leftCol || !rightCol) {
        LabState.isResizing = false;
        return;
    }
    
    document.body.classList.add('is-resizing');
    document.body.style.cursor = 'col-resize';
    
    leftCol.style.flex = 'none';
    rightCol.style.flex = 'none';

    const onMouseMove = (e) => {
        if (!LabState.isResizing) return;
        
        const containerRect = container.getBoundingClientRect();
        const minMiddleWidth = 200;
        const containerWidth = containerRect.width;
        
        if (side === 'left') {
            let newWidth = e.clientX - containerRect.left;
            
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
            let newWidth = containerRect.right - e.clientX;
            
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
        LabState.isResizing = false;
        document.body.classList.remove('is-resizing');
        document.body.style.cursor = 'default';
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

/**
 * Réinitialise la disposition d'une colonne
 * @param {string} side - Côté: 'left' ou 'right'
 */
function resetLayout(side) {
    const leftCol = document.getElementById('lab-col-sources');
    const rightCol = document.getElementById('lab-col-workspace');
    
    if (side === 'left' && leftCol) {
        leftCol.style.width = '300px';
        leftCol.style.minWidth = '300px';
        leftCol.style.opacity = '1';
        leftCol.style.pointerEvents = 'auto';
    } else if (side === 'right' && rightCol) {
        rightCol.style.width = '320px';
        rightCol.style.minWidth = '320px';
        rightCol.style.opacity = '1';
        rightCol.style.pointerEvents = 'auto';
    }
}

// ============================================================================
// MODULE EXPORTS
// ============================================================================

/**
 * Module Lab exporté
 */
export const LabModule = {
    // Initialization
    init,
    
    // Project Management
    loadProjects,
    saveProjects,
    renderProjects,
    openCreateModal,
    closeCreateModal,
    openProject,
    backToDashboard,
    getCurrentProject,
    
    // Source Management
    renderSources,
    addSource,
    removeSource,
    promptAddSource,
    handleFileUpload,
    
    // Chat
    clearChat,
    addBotMessage,
    sendMessage,
    handleChatFile,
    resetProject,
    
    // Output Generation
    openConfig,
    closeConfigModal,
    generateOutput,
    
    // Resize
    initResize,
    resetLayout,
    
    // State access (for debugging)
    getState: () => ({ ...LabState })
};

// Export global pour compatibilité onclick
if (typeof window !== 'undefined') {
    window.LabModule = LabModule;
}

export default LabModule;
