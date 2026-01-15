/**
 * STUDENT.JS - Logic for the Student Dashboard Wireframe
 * BlaizBot v1.0
 */

console.log('🚀 student.js loaded!');

// ==========================================
// NAVIGATION
// ==========================================

/**
 * Navigue vers une section spécifique
 * @param {string} sectionName - Nom de la section (dashboard, cours, revisions, agenda, assistant, messages)
 */
window.navigateTo = function(sectionName) {
    const navLink = document.querySelector(`.nav-link[data-section="${sectionName}"]`);
    if (navLink) {
        navLink.click();
    }
};

/**
 * Switch entre les vues Calendrier et Liste pour l'Agenda étudiant
 * @param {string} view - 'calendar' ou 'list'
 */
window.switchStudentAgendaView = function(view) {
    const calendarView = document.getElementById('student-agenda-calendar-view');
    const listView = document.getElementById('student-agenda-list-view');
    const btnCalendar = document.getElementById('btn-calendar-view');
    const btnList = document.getElementById('btn-list-view');
    
    if (view === 'calendar') {
        if (calendarView) calendarView.style.display = 'block';
        if (listView) listView.style.display = 'none';
        if (btnCalendar) {
            btnCalendar.style.background = 'white';
            btnCalendar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        }
        if (btnList) {
            btnList.style.background = 'transparent';
            btnList.style.boxShadow = 'none';
        }
    } else {
        if (calendarView) calendarView.style.display = 'none';
        if (listView) listView.style.display = 'block';
        if (btnList) {
            btnList.style.background = 'white';
            btnList.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        }
        if (btnCalendar) {
            btnCalendar.style.background = 'transparent';
            btnCalendar.style.boxShadow = 'none';
        }
    }
};

/**
 * Change le mois du calendrier de l'agenda étudiant (placeholder)
 * @param {number} delta - -1 pour mois précédent, +1 pour mois suivant
 */
window.changeStudentAgendaMonth = function(delta) {
    const monthLabel = document.getElementById('student-agenda-month');
    if (monthLabel) {
        if (delta > 0) {
            monthLabel.textContent = 'Février 2026';
        } else {
            monthLabel.textContent = 'Décembre 2025';
        }
    }
};

// ==========================================
// BLAIZ'BOT STUDIO (Assistant IA)
// ==========================================

/**
 * Crée une nouvelle conversation
 */
window.newBotConversation = function() {
    const welcomeScreen = document.getElementById('bot-welcome-screen');
    const messagesContainer = document.getElementById('bot-messages-container');
    const chatTitle = document.getElementById('bot-chat-title');
    
    if (welcomeScreen) welcomeScreen.style.display = 'flex';
    if (messagesContainer) messagesContainer.style.display = 'none';
    if (chatTitle) chatTitle.textContent = 'Blaiz\'bot Studio';
    
    // Reset la sélection de conversation
    const items = document.querySelectorAll('.bot-conversation-item');
    items.forEach(item => {
        item.style.background = 'transparent';
        item.style.borderLeft = 'none';
    });
};

/**
 * Toggle les filtres du bot
 */
window.toggleBotFilters = function() {
    const panel = document.getElementById('bot-filters-panel');
    const arrow = document.getElementById('bot-filters-arrow');
    if (panel && arrow) {
        if (panel.style.display === 'none') {
            panel.style.display = 'block';
            arrow.textContent = '▼';
        } else {
            panel.style.display = 'none';
            arrow.textContent = '▶';
        }
    }
};

/**
 * Ouvre une conversation existante
 * @param {string} convId - ID de la conversation
 */
window.openBotConversation = function(convId) {
    const welcomeScreen = document.getElementById('bot-welcome-screen');
    const messagesContainer = document.getElementById('bot-messages-container');
    const chatTitle = document.getElementById('bot-chat-title');
    
    // Afficher les messages
    if (welcomeScreen) welcomeScreen.style.display = 'none';
    if (messagesContainer) messagesContainer.style.display = 'block';
    
    // Mettre à jour le titre
    const titles = {
        'algebre': 'algèbre',
        'revolution': 'Révolution française',
        'poesie': 'Analyse poème'
    };
    if (chatTitle) chatTitle.textContent = titles[convId] || convId;
    
    // Mettre en évidence la conversation sélectionnée
    const items = document.querySelectorAll('.bot-conversation-item');
    items.forEach(item => {
        item.style.background = 'transparent';
        item.style.borderLeft = 'none';
    });
    
    const selectedItem = document.querySelector(`.bot-conversation-item[onclick*="${convId}"]`);
    if (selectedItem) {
        selectedItem.style.background = '#f0f7ff';
        selectedItem.style.borderLeft = '3px solid #2563eb';
    }
};

/**
 * Configure Blaiz'bot Studio
 */
window.configureBotStudio = function() {
    alert('Configuration du Blaiz\'bot Studio (fonctionnalité simulée)');
};

/**
 * Ferme la conversation courante
 */
window.closeBotConversation = function() {
    window.newBotConversation();
};

/**
 * Pose une question rapide au bot
 * @param {string} question - La question à poser
 */
window.askBotQuestion = function(question) {
    const input = document.getElementById('bot-chat-input');
    if (input) {
        input.value = question;
        window.sendBotMessage();
    }
};

/**
 * Envoie un message au bot
 */
window.sendBotMessage = function() {
    const input = document.getElementById('bot-chat-input');
    if (input && input.value.trim()) {
        // Créer une nouvelle conversation si nécessaire
        const welcomeScreen = document.getElementById('bot-welcome-screen');
        const messagesContainer = document.getElementById('bot-messages-container');
        
        if (welcomeScreen && welcomeScreen.style.display !== 'none') {
            welcomeScreen.style.display = 'none';
            if (messagesContainer) {
                messagesContainer.style.display = 'block';
                messagesContainer.innerHTML = ''; // Clear default messages
            }
        }
        
        // Ajouter le message utilisateur
        const userMessage = `
            <div style="display: flex; gap: 12px; margin-bottom: 20px; justify-content: flex-end;">
                <div style="background: #2563eb; padding: 14px 18px; border-radius: 18px 18px 4px 18px; max-width: 70%;">
                    <p style="margin: 0; font-size: 0.95rem; color: white; line-height: 1.5;">${input.value}</p>
                </div>
                <div style="width: 36px; height: 36px; background: #e5e7eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <span style="font-size: 0.85rem;">LP</span>
                </div>
            </div>
        `;
        if (messagesContainer) messagesContainer.innerHTML += userMessage;
        
        input.value = '';
        
        // Simuler une réponse du bot après 1s
        setTimeout(() => {
            const botResponse = `
                <div style="display: flex; gap: 12px; margin-bottom: 20px;">
                    <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <span style="color: white; font-size: 1rem;">🤖</span>
                    </div>
                    <div style="background: #f3f4f6; padding: 14px 18px; border-radius: 4px 18px 18px 18px; max-width: 70%;">
                        <p style="margin: 0; font-size: 0.95rem; color: #333; line-height: 1.5;">
                            Je suis là pour t'aider ! Cette fonctionnalité est simulée dans le wireframe. 
                            Dans l'application finale, je pourrai répondre à toutes tes questions sur tes cours. 😊
                        </p>
                    </div>
                </div>
            `;
            if (messagesContainer) messagesContainer.innerHTML += botResponse;
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1000);
    }
};

// ==========================================
// COURS CONTENT
// ==========================================

// --- OUVRIR UN COURS ---
function openCoursContent(matiere, chapitre) {
    // Redirige vers la section chatbot avec le contexte du cours
    const chatSection = document.getElementById('section-chatbot');
    const allSections = document.querySelectorAll('.admin-section');
    const allNavLinks = document.querySelectorAll('.nav-link');
    
    // Masquer toutes les sections
    allSections.forEach(s => s.classList.remove('active'));
    allNavLinks.forEach(l => l.classList.remove('active'));
    
    // Afficher la section chatbot
    if (chatSection) {
        chatSection.classList.add('active');
        // Activer le lien de navigation correspondant
        const chatNavLink = document.querySelector('.nav-link[data-section="chatbot"]');
        if (chatNavLink) chatNavLink.classList.add('active');
        
        // Message de bienvenue contextuel
        setTimeout(() => {
            addBotMessage(`📚 Bienvenue dans ton cours de <strong>${matiere}</strong> ! Tu travailles actuellement sur le chapitre "<strong>${chapitre}</strong>". Comment puis-je t'aider ?`);
        }, 300);
    }
}

// --- ASSISTANT IA BLAIZ'BOT ---
function updateChatContext() {
    const subject = document.getElementById('chat-subject').value;
    const themeSelect = document.getElementById('chat-theme');
    
    const themes = {
        'maths': ['Les Fractions (Cours du 15/12)', 'Nombres Relatifs', 'Géométrie : Triangles'],
        'francais': ['La Poésie au XIXème', 'Grammaire : Le Passé Simple', 'Analyse de texte'],
        'histoire': ['La Révolution Française', 'La Première Guerre Mondiale', 'Géographie : Les Climats']
    };

    themeSelect.innerHTML = themes[subject].map(t => `<option>${t}</option>`).join('');
    
    addBotMessage(`D'accord ! Je me concentre maintenant sur tes cours de **${subject === 'maths' ? 'Mathématiques' : subject === 'francais' ? 'Français' : 'Histoire-Géo'}**. Sur quel chapitre veux-tu travailler ?`);
}

function addBotMessage(text) {
    const chatMessages = document.getElementById('chat-messages');
    const msg = document.createElement('div');
    msg.style.cssText = "margin-bottom: 15px; display: flex; gap: 10px; animation: highlightNew 0.5s ease-out;";
    msg.innerHTML = `
        <div style="width: 35px; height: 35px; background: #3498db; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">B</div>
        <div style="background: #f1f2f6; padding: 12px; border-radius: 0 15px 15px 15px; max-width: 80%; font-size: 0.9rem;">
            ${text}
        </div>
    `;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendStudentMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;

    const chatMessages = document.getElementById('chat-messages');
    const msg = document.createElement('div');
    msg.style.cssText = "margin-bottom: 15px; display: flex; gap: 10px; justify-content: flex-end;";
    msg.innerHTML = `
        <div style="background: #3498db; color: white; padding: 12px; border-radius: 15px 15px 0 15px; max-width: 80%; font-size: 0.9rem;">
            ${text}
        </div>
    `;
    chatMessages.appendChild(msg);
    input.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulation réponse
    setTimeout(() => {
        addBotMessage("C'est une excellente question ! En me basant sur ton cours, voici l'explication...");
    }, 1000);
}

function generateQuiz() {
    openAssistantConfig('quiz');
}

function getRevisionMethod() {
    openAssistantConfig('methode');
}

function explainExercise() {
    const output = document.getElementById('assistant-workspace-output');
    output.innerHTML = `<div style="text-align:center; margin-top:50px;"><div class="loading-spinner"></div><br>Analyse de l'exercice...</div>`;
    
    setTimeout(() => {
        output.innerHTML = `
            <h4>❓ Aide à l'exercice</h4>
            <p style="background: #fff9c4; padding: 10px; border-radius: 5px; border-left: 4px solid #f1c40f;">
                <strong>Consigne détectée :</strong> Calculer la somme de 3/4 et 1/2.
            </p>
            <p><strong>Indice 1 :</strong> Pour additionner des fractions, elles doivent avoir le même dénominateur.</p>
            <p><strong>Indice 2 :</strong> Quel est le plus petit multiple commun de 4 et 2 ?</p>
            <button class="btn-small" style="width:100%; margin-top:10px;">Demander l'indice suivant</button>
        `;
        addBotMessage("J'ai analysé ton exercice. Regarde dans l'espace de travail à droite pour les premiers indices !");
    }, 1500);
}

function promptAddAssistantSource() {
    const name = prompt("Nom de votre source (Lien ou nom de fichier) :");
    if (name) {
        addAssistantSourceItem(name, 'web');
    }
}

function addAssistantSourceItem(name, type) {
    const sourcesList = document.getElementById('assistant-student-sources');
    if (sourcesList.innerText === "Aucune source perso.") sourcesList.innerHTML = "";

    const icon = type === 'pdf' ? '📄' : '🌐';
    const sourceItem = document.createElement('div');
    sourceItem.className = 'source-item';
    sourceItem.innerHTML = `
        <div class="source-icon">${icon}</div>
        <span style="flex-grow: 1; font-size: 0.8rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${name}</span>
        <button style="border: none; background: none; cursor: pointer; color: #e74c3c;" onclick="this.parentElement.remove()">✕</button>
    `;
    sourcesList.appendChild(sourceItem);
    addBotMessage(`J'ai ajouté ta source **${name}**. Je l'utiliserai en complément des cours de ton professeur.`);
}

function openAssistantConfig(type) {
    const modal = document.getElementById('lab-config-modal');
    const configTitle = document.getElementById('lab-config-title');
    const confirmBtn = document.getElementById('lab-config-confirm-btn');
    const promptInput = document.getElementById('lab-contextual-prompt');

    modal.style.display = 'flex';
    promptInput.value = "";
    setTimeout(() => promptInput.focus(), 50);
    
    let label = "";
    if (type === 'quiz') label = "🎲 Configurer le Quiz";
    if (type === 'methode') label = "🧠 Configurer la Méthode";
    if (type === 'synthese') label = "📄 Configurer le Résumé";

    configTitle.innerText = label;
    confirmBtn.onclick = () => {
        const userInstructions = promptInput.value.trim();
        closeLabModal();
        generateAssistantOutput(type, userInstructions);
    };

    modal.onclick = (e) => { if (e.target === modal) closeLabModal(); };
}

function generateAssistantOutput(type, instructions = "") {
    const output = document.getElementById('assistant-workspace-output');
    output.innerHTML = `<div style="text-align:center; margin-top:50px;"><div class="loading-spinner"></div><br>Génération de votre ${type}...</div>`;
    
    setTimeout(() => {
        let content = "";
        let instrText = instructions ? `<p style="font-size:0.75rem; color:#3498db; font-style:italic; background:#e3f2fd; padding:5px; border-radius:4px;">Instructions : "${instructions}"</p>` : "";

        if (type === 'quiz') {
            content = `<h4>🎲 Quiz d'entraînement</h4>${instrText}<p>Basé sur le cours de ton prof :</p><ol><li>Question sur les fractions...</li><li>Question sur les dénominateurs...</li></ol>`;
        } else if (type === 'methode') {
            content = `<h4>🧠 Méthode de révision</h4>${instrText}<p>Planning suggéré :</p><ul><li>Lundi : Relecture active</li><li>Mercredi : Exercices d'application</li></ul>`;
        } else {
            content = `<h4>📄 Résumé du cours</h4>${instrText}<p>Points clés à retenir : ...</p>`;
        }
        
        output.innerHTML = content + `<button class="btn-small" style="margin-top:10px; width:100%;">📥 Télécharger en PDF</button>`;
        addBotMessage(`Ton document **${type}** est prêt dans l'espace de travail !`);
    }, 1500);
}

function handleStudentFileUpload(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        
        // Ajouter aux sources de l'assistant
        addAssistantSourceItem(file.name, 'pdf');

        // Simulation d'analyse IA dans le chat
        setTimeout(() => {
            addBotMessage(`Analyse de **${file.name}** terminée ! C'est un exercice sur les fractions. Regarde dans l'espace de travail si tu veux une aide étape par étape.`);
        }, 1500);
    }
}

// --- GESTION DES PROJETS (LAB & ASSISTANT) ---
let labProjects = JSON.parse(localStorage.getItem('labProjects')) || [
    { id: 1, title: "Étude sur la Révolution Française", date: "20/12/2025", sources: 3 },
    { id: 2, title: "Analyse des écosystèmes marins", date: "18/12/2025", sources: 5 }
];

let assistantProjects = JSON.parse(localStorage.getItem('assistantProjects'));
// Si vide ou inexistant, on charge les exemples du professeur
if (!assistantProjects || assistantProjects.length === 0) {
    assistantProjects = [
        { id: 101, title: "Mathématiques - 6ème : Les Fractions", subject: "maths", date: "21/12/2025", sources: 4 },
        { id: 102, title: "Mathématiques - 6ème : Géométrie de base", subject: "maths", date: "20/12/2025", sources: 2 },
        { id: 103, title: "Français - 3ème : La Poésie au XIXème", subject: "francais", date: "19/12/2025", sources: 3 },
        { id: 104, title: "Histoire-Géo : La Guerre Froide", subject: "histoire", date: "15/12/2025", sources: 5 }
    ];
    localStorage.setItem('assistantProjects', JSON.stringify(assistantProjects));
}

let currentLabProject = null;
let currentAssistantProject = null;
let modalContext = 'lab';

// --- DASHBOARD LAB ---
function showLabDashboard() {
    document.getElementById('lab-dashboard').style.display = 'block';
    document.getElementById('lab-workspace-view').style.display = 'none';
    document.getElementById('lab-header-actions').style.display = 'block';
    renderLabProjects();
}

function renderLabProjects() {
    const grid = document.getElementById('lab-projects-grid');
    grid.innerHTML = `
        <div class="project-card-new" onclick="openCreateProjectModal('lab')">
            <div style="font-size: 2rem; margin-bottom: 10px;">➕</div>
            <div style="font-weight: bold;">Créer un nouveau projet</div>
            <div style="font-size: 0.8rem; color: #7f8c8d; margin-top: 5px;">Importez vos sources et commencez à explorer</div>
        </div>
    `;
    labProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.onclick = () => openLabProject(project.id);
        card.innerHTML = `
            <div class="project-icon">📁</div>
            <h3>${project.title}</h3>
            <p>${project.sources} sources enregistrées</p>
            <div class="project-meta"><span>Dernière modif.</span><span>${project.date}</span></div>
        `;
        grid.appendChild(card);
    });
}

// --- DASHBOARD ASSISTANT ---
function showAssistantDashboard() {
    document.getElementById('assistant-dashboard').style.display = 'block';
    document.getElementById('assistant-workspace-view').style.display = 'none';
    document.getElementById('assistant-header-actions').style.display = 'none';
    renderAssistantProjects();
}

function renderAssistantProjects() {
    const grid = document.getElementById('assistant-projects-grid');
    grid.innerHTML = ``; // Pas de bouton "Nouveau" pour l'assistant (géré par le prof)
    
    assistantProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.onclick = () => openAssistantProject(project.id);
        const icon = project.subject === 'maths' ? '📐' : project.subject === 'francais' ? '✍️' : '🌍';
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

// --- MODAL LOGIC ---
function openCreateProjectModal(context) {
    // Le contexte est désormais toujours 'lab' car l'assistant est géré par le prof
    modalContext = 'lab';
    const modal = document.getElementById('create-project-modal');
    const confirmBtn = document.getElementById('confirm-create-project');
    const input = document.getElementById('new-project-name');

    input.value = "";
    modal.style.display = 'flex';

    confirmBtn.onclick = () => {
        const name = input.value.trim();
        if (!name) return alert("Veuillez donner un nom à votre projet !");
        
        const newP = { id: Date.now(), title: name, date: new Date().toLocaleDateString(), sources: 0 };
        labProjects.unshift(newP);
        localStorage.setItem('labProjects', JSON.stringify(labProjects));
        openLabProject(newP.id);
        closeCreateProjectModal();
    };
}

function closeCreateProjectModal() {
    document.getElementById('create-project-modal').style.display = 'none';
}

// --- OPENING PROJECTS ---
function openLabProject(id) {
    currentLabProject = labProjects.find(p => p.id === id);
    document.getElementById('lab-dashboard').style.display = 'none';
    document.getElementById('lab-workspace-view').style.display = 'block';
    document.getElementById('lab-header-actions').style.display = 'none';
    document.getElementById('current-project-title').innerText = currentLabProject.title;
    clearLabChat();
}

function openAssistantProject(id) {
    currentAssistantProject = assistantProjects.find(p => p.id === id);
    document.getElementById('assistant-dashboard').style.display = 'none';
    document.getElementById('assistant-workspace-view').style.display = 'block';
    document.getElementById('assistant-header-actions').style.display = 'none';
    document.getElementById('current-assistant-title').innerText = `Cours : ${currentAssistantProject.title}`;
    
    // Mettre à jour les sélecteurs de matière dans le workspace
    document.getElementById('chat-subject').value = currentAssistantProject.subject;
    updateChatContext();
}

function clearLabChat() {
    const chat = document.getElementById('lab-chat-messages');
    if (!chat) return;
    chat.innerHTML = `
        <div style="margin-bottom: 15px; display: flex; gap: 10px;">
            <div style="width: 35px; height: 35px; background: #9b59b6; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">L</div>
            <div style="background: #f3e5f5; padding: 12px; border-radius: 0 15px 15px 15px; max-width: 80%; font-size: 0.9rem;">
                Bonjour ! Je suis prêt à travailler sur le projet "<strong>${currentLabProject ? currentLabProject.title : 'Nouveau Projet'}</strong>". 
                <br><br>
                Importe tes sources à gauche pour commencer.
            </div>
        </div>
    `;
    labSources = [];
    renderLabSources();
}

function initResize(e, side, context = 'lab') {
    isResizing = true;
    const container = context === 'lab' ? document.getElementById('lab-container') : document.getElementById('assistant-container');
    const leftCol = context === 'lab' ? document.getElementById('lab-col-sources') : document.getElementById('assistant-col-sources');
    const rightCol = context === 'lab' ? document.getElementById('lab-col-workspace') : document.getElementById('assistant-col-workspace');
    
    document.body.classList.add('is-resizing');
    document.body.style.cursor = 'col-resize';
    
    // Préparer les colonnes pour un redimensionnement fluide
    leftCol.style.flex = 'none';
    rightCol.style.flex = 'none';

    const onMouseMove = (e) => {
        if (!isResizing) return;
        
        const containerRect = container.getBoundingClientRect();
        const minMiddleWidth = 200;
        const containerWidth = containerRect.width;
        
        if (side === 'left') {
            let newWidth = e.clientX - containerRect.left;
            
            // Snap de fermeture uniquement si très proche du bord
            if (newWidth < 20) newWidth = 0;
            
            // Limites max
            if (newWidth > 500) newWidth = 500;
            
            // Sécurité pour la colonne centrale
            const rightWidth = rightCol.offsetWidth;
            if (containerWidth - newWidth - rightWidth < minMiddleWidth) {
                newWidth = containerWidth - rightWidth - minMiddleWidth;
            }

            if (newWidth < 0) newWidth = 0;

            leftCol.style.width = newWidth + 'px';
            leftCol.style.minWidth = newWidth + 'px';
            
            // Gestion visuelle de la fermeture
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
        isResizing = false;
        document.body.classList.remove('is-resizing');
        document.body.style.cursor = 'default';
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

function resetLayout(side, context) {
    const leftCol = context === 'lab' ? document.getElementById('lab-col-sources') : document.getElementById('assistant-col-sources');
    const rightCol = context === 'lab' ? document.getElementById('lab-col-workspace') : document.getElementById('assistant-col-workspace');
    
    if (side === 'left') {
        leftCol.style.width = '300px';
        leftCol.style.minWidth = '300px';
        leftCol.style.opacity = '1';
        leftCol.style.pointerEvents = 'auto';
    } else {
        rightCol.style.width = '320px';
        rightCol.style.minWidth = '320px';
        rightCol.style.opacity = '1';
        rightCol.style.pointerEvents = 'auto';
    }
}

function promptAddSource(type) {
    let val = "";
    if (type === 'web') val = prompt("Entrez l'URL du site internet :");
    if (type === 'yt') val = prompt("Entrez l'URL de la vidéo YouTube :");
    
    if (val) {
        addLabSourceItem(val, type);
    }
}

function addLabSource(input) {
    if (input.files && input.files[0]) {
        addLabSourceItem(input.files[0].name, 'pdf');
    }
}

function addLabSourceItem(name, type) {
    labSources.push({ name, type });
    renderLabSources();
    addLabBotMessage(`J'ai ajouté la source **${name}** (${type}). Je l'analyse pour l'intégrer à ton projet.`);
}

function renderLabSources() {
    const sourcesList = document.getElementById('lab-sources-list');
    if (!sourcesList) return;
    
    const noSourcesMsg = document.getElementById('no-sources-msg');
    
    if (labSources.length === 0) {
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

    labSources.forEach((source, index) => {
        const icon = source.type === 'pdf' ? '📄' : source.type === 'yt' ? '🎥' : '🌐';
        const iconClass = source.type === 'pdf' ? 'icon-pdf' : source.type === 'yt' ? 'icon-yt' : 'icon-web';

        const sourceItem = document.createElement('div');
        sourceItem.className = 'source-item';
        sourceItem.innerHTML = `
            <div class="source-icon ${iconClass}">${icon}</div>
            <span style="flex-grow: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${source.name}</span>
            <button style="border: none; background: none; cursor: pointer; color: #e74c3c;" onclick="removeLabSource(${index})">✕</button>
        `;
        sourcesList.appendChild(sourceItem);
    });
}

function removeLabSource(index) {
    labSources.splice(index, 1);
    renderLabSources();
}

function openLabConfig(type) {
    const modal = document.getElementById('lab-config-modal');
    const configTitle = document.getElementById('lab-config-title');
    const confirmBtn = document.getElementById('lab-config-confirm-btn');
    const promptInput = document.getElementById('lab-contextual-prompt');

    modal.style.display = 'flex';
    promptInput.value = ""; // Reset
    
    // Focus après un court délai pour s'assurer que le modal est affiché
    setTimeout(() => promptInput.focus(), 50);
    
    let label = "";
    if (type === 'synthese') label = "📝 Configurer la Synthèse";
    if (type === 'quiz') label = "🎲 Configurer le Quiz";
    if (type === 'flashcards') label = "🗂️ Configurer les Flashcards";
    if (type === 'mindmap') label = "🧠 Configurer la Carte Mentale";

    configTitle.innerText = label;
    confirmBtn.onclick = () => {
        const userInstructions = promptInput.value.trim();
        closeLabModal();
        generateLabOutput(type, userInstructions);
    };

    // Fermer si on clique à l'extérieur du contenu
    modal.onclick = (e) => {
        if (e.target === modal) closeLabModal();
    };
}

function closeLabModal() {
    document.getElementById('lab-config-modal').style.display = 'none';
}

function handleLabChatFile(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const chatMessages = document.getElementById('lab-chat-messages');
        const msg = document.createElement('div');
        msg.style.cssText = "margin-bottom: 15px; display: flex; gap: 10px; justify-content: flex-end;";
        msg.innerHTML = `
            <div style="background: #ecf0f1; color: #2c3e50; padding: 10px 15px; border-radius: 15px; font-size: 0.85rem; border: 1px dashed #bdc3c7;">
                📎 Fichier joint : ${file.name}
            </div>
        `;
        chatMessages.appendChild(msg);
        addLabBotMessage(`Fichier **${file.name}** reçu dans le fil de discussion. Je l'ajoute temporairement au contexte.`);
    }
}

function generateLabOutput(type, instructions = "") {
    const output = document.getElementById('lab-workspace-output');
    output.innerHTML = `<div style="text-align:center; margin-top:50px;"><div class="loading-spinner"></div><br>Génération de votre ${type}...</div>`;
    
    setTimeout(() => {
        let content = "";
        let instrText = instructions ? `<p style="font-size:0.75rem; color:#8e44ad; font-style:italic; background:#f5f0ff; padding:5px; border-radius:4px;">Instructions appliquées : "${instructions}"</p>` : "";

        if (type === 'synthese') content = `<h4>📝 Synthèse du Projet</h4>${instrText}<p>Basé sur vos sources, voici les points clés : ...</p>`;
        if (type === 'quiz') content = `<h4>🎲 Quiz d'entraînement</h4>${instrText}<ol><li>Question 1...</li><li>Question 2...</li></ol>`;
        if (type === 'flashcards') content = `<h4>🗂️ Flashcards</h4>${instrText}<div style='padding:10px; border:1px solid #9b59b6; border-radius:5px;'>Recto: Concept A<br>Verso: Définition A</div>`;
        if (type === 'mindmap') content = `<h4>🧠 Carte Mentale</h4>${instrText}<p>[Représentation visuelle générée : Concept Central -> Branche 1, Branche 2]</p>`;
        
        output.innerHTML = content + `<button class="btn-small" style="margin-top:10px; width:100%;">📥 Télécharger en PDF</button>`;
        addLabBotMessage(`Ton document **${type}** est prêt dans l'espace de travail !`);
    }, 1500);
}

function addLabBotMessage(text) {
    const chatMessages = document.getElementById('lab-chat-messages');
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

function sendLabMessage() {
    const input = document.getElementById('lab-chat-input');
    const text = input.value.trim();
    if (!text) return;

    const chatMessages = document.getElementById('lab-chat-messages');
    const userMsg = document.createElement('div');
    userMsg.style.cssText = "margin-bottom: 15px; display: flex; gap: 10px; justify-content: flex-end;";
    userMsg.innerHTML = `<div style="background: #9b59b6; color: white; padding: 12px; border-radius: 15px 15px 0 15px; max-width: 80%; font-size: 0.9rem;">${text}</div>`;
    chatMessages.appendChild(userMsg);
    input.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
        addLabBotMessage("En analysant tes sources (PDF, Web, YouTube), voici ma réponse...");
    }, 1000);
}

function clearLabChat() {
    if (confirm("Voulez-vous réinitialiser tout le projet ?")) {
        // On vide juste les sources et le chat, on ne recharge pas la page
        labSources = [];
        renderLabSources();
        document.getElementById('lab-chat-messages').innerHTML = `
            <div style="margin-bottom: 15px; display: flex; gap: 10px;">
                <div style="width: 35px; height: 35px; background: #9b59b6; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">L</div>
                <div style="background: #f3e5f5; padding: 12px; border-radius: 0 15px 15px 15px; max-width: 80%; font-size: 0.9rem;">
                    Projet réinitialisé. Importe tes sources pour recommencer.
                </div>
            </div>
        `;
    }
}

// --- BASE DE CONNAISSANCES ---
let teacherKnowledge = [
    { 
        id: 'maths', 
        name: 'Mathématiques', 
        icon: '📐',
        themes: [
            { name: 'Les Fractions', docs: ['Cours_Simplification.pdf', 'Exercices_Corriges.pdf', 'Video_Explicative.mp4'] },
            { name: 'Géométrie Plane', docs: ['Theoreme_Pythagore.pdf', 'Proprietes_Triangles.pdf'] }
        ]
    },
    { 
        id: 'francais', 
        name: 'Français', 
        icon: '✍️',
        themes: [
            { name: 'La Poésie au XIXème', docs: ['Baudelaire_Analyse.pdf', 'Figures_de_style.pdf'] },
            { name: 'Grammaire', docs: ['Le_Passe_Simple.pdf', 'Accords_Participes.pdf'] }
        ]
    }
];

let studentKnowledge = [];
try {
    studentKnowledge = JSON.parse(localStorage.getItem('studentKnowledge')) || [
        { 
            id: 'perso-maths', 
            name: 'Mes Maths', 
            icon: '📓',
            themes: [
                { name: 'Mes Fiches Révision', docs: ['Fiche_Fractions_Simplifiee.pdf'] }
            ]
        }
    ];
} catch (e) {
    console.error("Erreur lors du chargement de studentKnowledge:", e);
    studentKnowledge = [
        { 
            id: 'perso-maths', 
            name: 'Mes Maths', 
            icon: '📓',
            themes: [
                { name: 'Mes Fiches Révision', docs: ['Fiche_Fractions_Simplifiee.pdf'] }
            ]
        }
    ];
}

function switchKnowledgeTab(type) {
    const teacherView = document.getElementById('knowledge-teacher-view');
    const studentView = document.getElementById('knowledge-student-view');
    const teacherBtn = document.getElementById('tab-btn-teacher');
    const studentBtn = document.getElementById('tab-btn-student');

    if (type === 'teacher') {
        if (teacherView) teacherView.style.display = 'block';
        if (studentView) studentView.style.display = 'none';
        if (teacherBtn) {
            teacherBtn.classList.add('active');
            teacherBtn.style.background = '#fff';
            teacherBtn.style.color = '#2c3e50';
        }
        if (studentBtn) {
            studentBtn.classList.remove('active');
            studentBtn.style.background = 'transparent';
            studentBtn.style.color = '#7f8c8d';
        }
        renderKnowledgeSubjects('teacher');
        if (teacherKnowledge.length > 0) {
            selectKnowledgeSubject('teacher', teacherKnowledge[0].id);
        }
    } else {
        if (teacherView) teacherView.style.display = 'none';
        if (studentView) studentView.style.display = 'block';
        if (studentBtn) {
            studentBtn.classList.add('active');
            studentBtn.style.background = '#fff';
            studentBtn.style.color = '#2c3e50';
        }
        if (teacherBtn) {
            teacherBtn.classList.remove('active');
            teacherBtn.style.background = 'transparent';
            teacherBtn.style.color = '#7f8c8d';
        }
        renderKnowledgeSubjects('student');
        if (studentKnowledge.length > 0) {
            selectKnowledgeSubject('student', studentKnowledge[0].id);
        }
    }
}

function renderKnowledgeSubjects(type) {
    const containerId = type === 'teacher' ? 'knowledge-teacher-subjects' : 'knowledge-student-subjects';
    const container = document.getElementById(containerId);
    const data = type === 'teacher' ? teacherKnowledge : studentKnowledge;

    if (!container) return;

    container.innerHTML = data.map(subject => `
        <div class="subject-item" onclick="selectKnowledgeSubject('${type}', '${subject.id}', this)" style="padding: 12px; margin-bottom: 5px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: background 0.2s; position: relative;">
            <span style="font-size: 1.2rem;">${subject.icon}</span>
            <span style="font-weight: 500; flex-grow: 1;">${subject.name}</span>
            ${type === 'student' ? `
                <div style="display: flex; gap: 5px;">
                    <button class="btn-icon" style="font-size: 0.8rem; padding: 2px 5px; color: #3498db;" onclick="event.stopPropagation(); renameStudentSubject('${subject.id}')" title="Renommer">✏️</button>
                    <button class="btn-icon" style="font-size: 0.8rem; padding: 2px 5px; color: #e74c3c;" onclick="event.stopPropagation(); deleteStudentSubject('${subject.id}')" title="Supprimer">🗑️</button>
                </div>
            ` : ''}
        </div>
    `).join('');
}

function selectKnowledgeSubject(type, subjectId, element = null) {
    // Mise à jour visuelle de la sélection
    const containerId = type === 'teacher' ? 'knowledge-teacher-subjects' : 'knowledge-student-subjects';
    const items = document.querySelectorAll(`#${containerId} .subject-item`);
    items.forEach(item => {
        item.style.background = 'transparent';
    });
    
    if (element) {
        element.style.background = '#f0f7ff';
    } else {
        // Essayer de trouver l'élément correspondant dans la liste
        items.forEach(item => {
            if (item.getAttribute('onclick')?.includes(subjectId)) {
                item.style.background = '#f0f7ff';
            }
        });
    }

    const data = type === 'teacher' ? teacherKnowledge : studentKnowledge;
    const subject = data.find(s => s.id === subjectId);
    const detailsContainerId = type === 'teacher' ? 'knowledge-teacher-details' : 'knowledge-student-details';
    const detailsContainer = document.getElementById(detailsContainerId);

    if (!subject || !detailsContainer) return;

    let html = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h2 style="margin: 0; display: flex; align-items: center; gap: 10px;">${subject.icon} ${subject.name}</h2>
            ${type === 'student' ? `<button class="btn-primary" style="font-size: 0.8rem; padding: 6px 12px;" onclick="addStudentTheme('${subject.id}')">+ Nouvelle Sous-catégorie</button>` : ''}
        </div>
    `;

    if (!subject.themes || subject.themes.length === 0) {
        html += `
            <div style="text-align: center; color: #95a5a6; margin-top: 50px; border: 2px dashed #eee; padding: 40px; border-radius: 10px;">
                <p>Aucune sous-catégorie dans cette section.</p>
                ${type === 'student' ? `<button class="btn-secondary" onclick="addStudentTheme('${subject.id}')">Créer ma première sous-catégorie</button>` : ''}
            </div>
        `;
    } else {
        html += subject.themes.map(theme => `
            <div style="margin-bottom: 30px; background: #fcfcfc; padding: 15px; border-radius: 10px; border: 1px solid #f0f0f0;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                    <h3 style="font-size: 1rem; color: #34495e; margin: 0; display: flex; align-items: center; gap: 10px;">
                        📂 ${theme.name}
                        ${type === 'student' ? `
                            <button class="btn-icon" style="font-size: 0.7rem; color: #3498db; background: none; border: none; cursor: pointer;" onclick="renameStudentTheme('${subject.id}', this.getAttribute('data-theme'))" data-theme="${theme.name.replace(/"/g, '&quot;')}" title="Renommer">✏️</button>
                            <button class="btn-icon" style="font-size: 0.7rem; color: #e74c3c; background: none; border: none; cursor: pointer;" onclick="deleteStudentTheme('${subject.id}', this.getAttribute('data-theme'))" data-theme="${theme.name.replace(/"/g, '&quot;')}" title="Supprimer">🗑️</button>
                        ` : ''}
                    </h3>
                    ${type === 'student' ? `<button class="btn-icon" style="font-size: 0.7rem; background: #eee; padding: 4px 8px;" onclick="addStudentDoc('${subject.id}', this.getAttribute('data-theme'))" data-theme="${theme.name.replace(/"/g, '&quot;')}" title="Ajouter un document">➕ Ajouter un doc</button>` : ''}
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
                    ${theme.docs.length === 0 ? '<p style="font-size: 0.8rem; color: #95a5a6; grid-column: 1/-1;">Aucun document ici.</p>' : ''}
                    ${theme.docs.map(doc => `
                        <div class="doc-card" style="padding: 15px; border: 1px solid #eee; border-radius: 8px; background: #fff; display: flex; align-items: center; gap: 10px; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; position: relative;">
                            <div style="font-size: 1.5rem;">${doc.endsWith('.pdf') ? '📄' : doc.endsWith('.mp4') ? '🎥' : doc.endsWith('.epub') || doc.endsWith('.mobi') ? '📚' : '📝'}</div>
                            <div style="overflow: hidden; flex-grow: 1;">
                                <div style="font-size: 0.85rem; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${doc}</div>
                                <div style="font-size: 0.7rem; color: #95a5a6;">${doc.split('.').pop().toUpperCase()}</div>
                            </div>
                            ${type === 'student' ? `
                                <div style="display: flex; flex-direction: column; gap: 2px;">
                                    <button style="border: none; background: none; cursor: pointer; color: #3498db; font-size: 0.8rem;" onclick="event.stopPropagation(); renameStudentDoc('${subject.id}', '${theme.name.replace(/'/g, "\\'")}', '${doc.replace(/'/g, "\\'")}')" title="Renommer">✏️</button>
                                    <button style="border: none; background: none; cursor: pointer; color: #e74c3c; font-size: 0.8rem;" onclick="event.stopPropagation(); deleteStudentDoc('${subject.id}', '${theme.name.replace(/'/g, "\\'")}', '${doc.replace(/'/g, "\\'")}')" title="Supprimer">🗑️</button>
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    detailsContainer.innerHTML = html;
}

// --- MODAL GÉNÉRIQUE ---
let pendingAction = null;

function openGenericModal(title, placeholder, callback, defaultValue = '') {
    document.getElementById('generic-modal-title').innerText = title;
    const input = document.getElementById('generic-modal-input');
    input.value = defaultValue;
    input.placeholder = placeholder;
    document.getElementById('generic-input-modal').style.display = 'flex';
    input.focus();
    if (defaultValue) input.select();
    
    pendingAction = callback;
}

function closeGenericModal() {
    document.getElementById('generic-input-modal').style.display = 'none';
    pendingAction = null;
}

document.getElementById('generic-modal-confirm').onclick = () => {
    const val = document.getElementById('generic-modal-input').value.trim();
    if (val && pendingAction) {
        pendingAction(val);
        closeGenericModal();
    }
};

// Fermeture au clic extérieur
document.getElementById('generic-input-modal').onclick = (e) => {
    if (e.target === document.getElementById('generic-input-modal')) closeGenericModal();
};

// --- ACTIONS CRUD ---

function renameStudentSubject(id) {
    const subject = studentKnowledge.find(s => s.id === id);
    if (subject) {
        openGenericModal("Renommer la matière", "Nouveau nom", (newName) => {
            subject.name = newName;
            localStorage.setItem('studentKnowledge', JSON.stringify(studentKnowledge));
            renderKnowledgeSubjects('student');
            selectKnowledgeSubject('student', id);
        }, subject.name);
    }
}

function deleteStudentSubject(id) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette matière et tout son contenu ?")) {
        studentKnowledge = studentKnowledge.filter(s => s.id !== id);
        localStorage.setItem('studentKnowledge', JSON.stringify(studentKnowledge));
        renderKnowledgeSubjects('student');
        document.getElementById('knowledge-student-details').innerHTML = '';
    }
}

function renameStudentTheme(subjectId, themeName) {
    const subject = studentKnowledge.find(s => s.id === subjectId);
    if (subject) {
        const theme = subject.themes.find(t => t.name === themeName);
        if (theme) {
            openGenericModal("Renommer la sous-catégorie", "Nouveau nom", (newName) => {
                theme.name = newName;
                localStorage.setItem('studentKnowledge', JSON.stringify(studentKnowledge));
                selectKnowledgeSubject('student', subjectId);
            }, theme.name);
        }
    }
}

function deleteStudentTheme(subjectId, themeName) {
    if (confirm("Supprimer cette sous-catégorie et ses documents ?")) {
        const subject = studentKnowledge.find(s => s.id === subjectId);
        if (subject) {
            subject.themes = subject.themes.filter(t => t.name !== themeName);
            localStorage.setItem('studentKnowledge', JSON.stringify(studentKnowledge));
            selectKnowledgeSubject('student', subjectId);
        }
    }
}

function renameStudentDoc(subjectId, themeName, docName) {
    const subject = studentKnowledge.find(s => s.id === subjectId);
    if (subject) {
        const theme = subject.themes.find(t => t.name === themeName);
        if (theme) {
            openGenericModal("Renommer le document", "Nouveau nom", (newName) => {
                // Trouver l'index pour remplacer
                const index = theme.docs.indexOf(docName);
                if (index !== -1) {
                    theme.docs[index] = newName;
                    localStorage.setItem('studentKnowledge', JSON.stringify(studentKnowledge));
                    selectKnowledgeSubject('student', subjectId);
                }
            }, docName);
        }
    }
}

function deleteStudentDoc(subjectId, themeName, docName) {
    if (confirm("Supprimer ce document ?")) {
        const subject = studentKnowledge.find(s => s.id === subjectId);
        if (subject) {
            const theme = subject.themes.find(t => t.name === themeName);
            if (theme) {
                theme.docs = theme.docs.filter(d => d !== docName);
                localStorage.setItem('studentKnowledge', JSON.stringify(studentKnowledge));
                selectKnowledgeSubject('student', subjectId);
            }
        }
    }
}

function addStudentTheme(subjectId) {
    openGenericModal("Nouvelle Sous-catégorie", "Nom (ex: Mes Livres, Cours du 1er Trimestre...)", (name) => {
        const subject = studentKnowledge.find(s => s.id === subjectId);
        if (subject) {
            if (!subject.themes) subject.themes = [];
            subject.themes.push({ name: name, docs: [] });
            localStorage.setItem('studentKnowledge', JSON.stringify(studentKnowledge));
            selectKnowledgeSubject('student', subjectId);
        }
    });
}

function addStudentDoc(subjectId, themeName) {
    // Création dynamique d'un input file s'il n'existe pas
    let input = document.getElementById('knowledge-file-input');
    if (!input) {
        input = document.createElement('input');
        input.type = 'file';
        input.id = 'knowledge-file-input';
        input.style.display = 'none';
        document.body.appendChild(input);
    }

    // Gestionnaire d'événement pour le changement de fichier
    input.onchange = function(e) {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const name = file.name;
            
            const subject = studentKnowledge.find(s => s.id === subjectId);
            if (subject) {
                if (!subject.themes) subject.themes = [];
                const theme = subject.themes.find(t => t.name === themeName);
                if (theme) {
                    if (!theme.docs) theme.docs = [];
                    theme.docs.push(name);
                    localStorage.setItem('studentKnowledge', JSON.stringify(studentKnowledge));
                    selectKnowledgeSubject('student', subjectId);
                }
            }
        }
        // Réinitialiser pour permettre de ré-uploader le même fichier
        input.value = '';
    };

    // Ouvrir l'explorateur de fichiers
    input.click();
}

function addStudentSubject() {
    openGenericModal("Nouvelle Matière", "Nom de la matière", (name) => {
        const newSubject = {
            id: 'perso-' + Date.now(),
            name: name,
            icon: '📓',
            themes: []
        };
        studentKnowledge.push(newSubject);
        localStorage.setItem('studentKnowledge', JSON.stringify(studentKnowledge));
        renderKnowledgeSubjects('student');
        selectKnowledgeSubject('student', newSubject.id);
    });
}

// Navigation identique à l'admin
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.admin-section');
    const pageTitle = document.getElementById('page-title');

    // Mapping des titres de pages
    const sectionTitles = {
        'dashboard': 'Dashboard',
        'cours': 'Mes Cours',
        'revisions': 'Mes Révisions',
        'agenda': 'Agenda',
        'assistant': 'Assistant IA',
        'messages': 'Messages',
        'chatbot': 'Assistant IA',
        'lab': 'Blaiz\'bot Lab',
        'knowledge': 'Base de connaissances',
        'coach': 'Mon Coach',
        'exercices': 'Mes Exercices'
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            
            // Mise à jour du titre de la page
            if (pageTitle && sectionTitles[targetSection]) {
                pageTitle.textContent = sectionTitles[targetSection];
            }
            
            // Mise à jour des liens de navigation (styles)
            navLinks.forEach(l => {
                l.classList.remove('active');
                l.style.background = 'transparent';
                l.style.color = 'rgba(255,255,255,0.7)';
            });
            link.classList.add('active');
            link.style.background = 'rgba(102, 126, 234, 0.2)';
            link.style.color = '#667eea';

            // Afficher la section correspondante
            sections.forEach(section => {
                if (section.id === `section-${targetSection}`) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });

            // Dashboards par défaut
            if (targetSection === 'lab') showLabDashboard();
            if (targetSection === 'chatbot' || targetSection === 'assistant') showAssistantDashboard();
            if (targetSection === 'knowledge') switchKnowledgeTab('teacher');
            if (targetSection === 'revisions') renderCalendar(currentCalendarDate);
        });
    });

    // Initialiser les dashboards au chargement
    if (document.getElementById('section-lab') && document.getElementById('section-lab').classList.contains('active')) showLabDashboard();
    if (document.getElementById('section-chatbot') && document.getElementById('section-chatbot').classList.contains('active')) showAssistantDashboard();
    if (document.getElementById('section-knowledge') && document.getElementById('section-knowledge').classList.contains('active')) switchKnowledgeTab('teacher');
    if (document.getElementById('section-revisions') && document.getElementById('section-revisions').classList.contains('active')) renderCalendar(currentCalendarDate);

    console.log("✅ BlaizBot Student Dashboard Loaded");
});

// --- MESSAGERIE ---
let currentTheme = 'Général';
let currentChatType = 'classe';

function selectStudentChat(theme, type) {
    currentTheme = theme;
    currentChatType = type;

    // Mise à jour visuelle de la sidebar
    document.querySelectorAll('.msg-item, [onclick^="selectStudentChat"]').forEach(item => {
        item.style.background = 'transparent';
        item.style.borderLeft = 'none';
        item.style.fontWeight = 'normal';
    });
    
    const evt = window.event;
    if (evt && evt.currentTarget) {
        evt.currentTarget.style.background = '#f0f7ff';
        evt.currentTarget.style.borderLeft = '4px solid #3498db';
        evt.currentTarget.style.fontWeight = 'bold';
    }

    // Déterminer le nom du prof selon le thème (simulation)
    let profName = "M. DUPONT";
    if (theme === 'La Poésie') profName = "Mme. MARTIN";

    // Mise à jour du header
    const targetNameEl = document.getElementById('chat-target-name');
    const targetThemeEl = document.getElementById('chat-target-theme');
    
    if(targetNameEl) {
        targetNameEl.innerText = (type === 'classe' ? `📢 Chat de Classe : ${theme}` : `👤 Message à ${profName}`);
    }
    if(targetThemeEl) targetThemeEl.innerText = `Thème : ${theme}`;

    // Simulation de chargement des messages
    const chatBox = document.getElementById('student-chat-messages');
    if(chatBox) {
        chatBox.innerHTML = `<div style="text-align:center; color:#95a5a6; font-size:0.8rem; margin:10px 0;">--- Début de la discussion sur ${theme} ---</div>`;
        
        if (type === 'classe') {
            chatBox.innerHTML += `
                <div class="message bot" style="align-self: flex-start; background: white; color: #2c3e50; padding: 10px 15px; border-radius: 15px 15px 15px 0; max-width: 70%; border: 1px solid #ddd; margin-bottom: 10px;">
                    <span style="font-weight: bold; color: #3498db;">${profName} :</span> Bonjour à tous ! Des questions sur le thème "${theme}" ?
                </div>
            `;
        } else {
            chatBox.innerHTML += `
                <div class="message bot" style="align-self: flex-start; background: white; color: #2c3e50; padding: 10px 15px; border-radius: 15px 15px 15px 0; max-width: 70%; border: 1px solid #ddd; margin-bottom: 10px;">
                    <span style="font-weight: bold; color: #e67e22;">${profName} :</span> Bonjour Lucas, comment puis-je t'aider sur "${theme}" ?
                </div>
            `;
        }
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

function sendStudentChatMessage() {
    const input = document.getElementById('student-chat-input-text');
    if(!input) return;
    const text = input.value.trim();
    if (text === "") return;

    const chatBox = document.getElementById('student-chat-messages');
    if(!chatBox) return;
    
    // Message de l'élève
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.style.cssText = "align-self: flex-end; background: #3498db; color: white; padding: 10px 15px; border-radius: 15px 15px 0 15px; max-width: 70%; margin-bottom: 10px;";
    userMsg.innerHTML = `<strong>Moi :</strong> ${text}`;
    
    chatBox.appendChild(userMsg);
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Simulation réponse automatique
    setTimeout(() => {
        const profName = currentTheme === 'La Poésie' ? "Mme. MARTIN" : "M. DUPONT";
        const botMsg = document.createElement('div');
        botMsg.style.cssText = "align-self: flex-start; background: white; color: #2c3e50; padding: 10px 15px; border-radius: 15px 15px 15px 0; max-width: 70%; border: 1px solid #ddd; margin-bottom: 10px;";
        botMsg.innerHTML = `<span style="font-weight: bold; color: #3498db;">${profName} :</span> Merci pour ton message, je te réponds dès que possible !`;
        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
}

// --- CALENDRIER DE RÉVISION ---
let currentCalendarDate = new Date();
let selectedRangeStart = null;
let selectedRangeEnd = null;
let currentEventIndex = null; // Pour l'édition/suppression

// Structure mise à jour pour supporter les plages de dates et heures
let calendarEvents = [
    { startDate: '2025-12-22', endDate: '2025-12-22', startTime: '10:00', endTime: '11:00', title: 'Devoir Maths', type: 'teacher', desc: 'Exercices page 42' },
    { startDate: '2025-12-23', endDate: '2025-12-27', startTime: '14:00', endTime: '16:00', title: 'Réviser Histoire', type: 'student', desc: 'Chapitre Révolution' },
    { startDate: '2025-12-25', endDate: '2025-12-25', startTime: '00:00', endTime: '23:59', title: 'Noël', type: 'student', desc: 'Repos' },
    { startDate: '2025-12-28', endDate: '2025-12-28', startTime: '09:00', endTime: '10:30', title: 'Exercice Français', type: 'teacher', desc: 'Grammaire' },
    { startDate: '2025-12-30', endDate: '2026-01-02', startTime: '10:00', endTime: '12:00', title: 'Préparer Exposé', type: 'student', desc: 'Recherches CDI' }
];

function renderCalendar(date) {
    const grid = document.getElementById('calendar-grid');
    const monthYear = document.getElementById('calendar-month-year');
    
    if (!grid || !monthYear) return;

    // Nettoyer la grille (garder les headers)
    const headers = Array.from(grid.querySelectorAll('.calendar-day-header'));
    grid.innerHTML = '';
    headers.forEach(h => grid.appendChild(h));

    const year = date.getFullYear();
    const month = date.getMonth();
    
    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    monthYear.innerText = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Ajustement pour commencer le lundi (0 = Dimanche dans JS, mais on veut 0 = Lundi pour l'affichage)
    let startDay = firstDay.getDay() - 1;
    if (startDay === -1) startDay = 6;

    // Jours vides avant le début du mois
    for (let i = 0; i < startDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'calendar-day empty';
        empty.style.background = '#f9f9f9';
        empty.style.cursor = 'default';
        grid.appendChild(empty);
    }

    // Jours du mois
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        
        // Date formatée pour comparaison YYYY-MM-DD
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

        // Vérifier si c'est aujourd'hui
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayEl.classList.add('today');
        }

        // Gestion de la sélection de plage en cours
        if (selectedRangeStart && !selectedRangeEnd) {
            if (dateStr === selectedRangeStart) dayEl.style.background = '#bbdefb';
        } else if (selectedRangeStart && selectedRangeEnd) {
            if (dateStr >= selectedRangeStart && dateStr <= selectedRangeEnd) {
                dayEl.classList.add('selected-range');
            }
        }

        // Trouver les événements actifs pour ce jour
        const activeEvents = calendarEvents.filter(e => {
            return dateStr >= e.startDate && dateStr <= e.endDate;
        });

        // Trier par heure de début
        activeEvents.sort((a, b) => (a.startTime || '00:00').localeCompare(b.startTime || '00:00'));

        let eventsHtml = activeEvents.map(e => {
            let classes = `day-event ${e.type}`;
            let timeLabel = "";
            
            // Afficher l'heure si c'est le jour de début ou si c'est un événement d'un jour
            if (dateStr === e.startDate && e.startTime) {
                timeLabel = `<span style="font-size:0.7em; opacity:0.8; margin-right:3px;">${e.startTime}</span>`;
            }

            // Style pour les barres continues
            if (e.startDate !== e.endDate) {
                if (dateStr === e.startDate) classes += ' range-start';
                else if (dateStr === e.endDate) classes += ' range-end';
                else classes += ' range-middle';
            }
            
            // Trouver l'index réel dans le tableau principal
            const realIndex = calendarEvents.indexOf(e);

            return `<div class='${classes}' 
                        title='${e.title} (${e.startTime}-${e.endTime})\n${e.desc || ""}'
                        onclick='event.stopPropagation(); openEventDetails(${realIndex})'>
                        ${timeLabel}${e.title}
                    </div>`;
        }).join('');

        dayEl.innerHTML = `
            <div class="day-number">${i}</div>
            ${eventsHtml}
        `;

        dayEl.onclick = () => handleDateClick(dateStr);

        grid.appendChild(dayEl);
    }
}

function handleDateClick(dateStr) {
    if (!selectedRangeStart || (selectedRangeStart && selectedRangeEnd)) {
        // Nouvelle sélection
        selectedRangeStart = dateStr;
        selectedRangeEnd = null;
        renderCalendar(currentCalendarDate); // Rafraîchir pour montrer la sélection
    } else {
        // Fin de sélection
        if (dateStr < selectedRangeStart) {
            selectedRangeEnd = selectedRangeStart;
            selectedRangeStart = dateStr;
        } else {
            selectedRangeEnd = dateStr;
        }
        
        // Ouvrir le modal complet pour création
        openCalendarModal(selectedRangeStart, selectedRangeEnd);
    }
}

function openCalendarModal(start, end) {
    currentEventIndex = null; // Mode création
    const modal = document.getElementById('calendar-event-modal');
    
    // Reset champs
    document.getElementById('event-title').value = "";
    document.getElementById('event-start-date').value = start;
    document.getElementById('event-end-date').value = end;
    document.getElementById('event-start-time').value = "09:00";
    document.getElementById('event-end-time').value = "10:00";
    document.getElementById('event-desc').value = "";
    
    // UI Reset
    document.getElementById('btn-delete-event').style.display = 'none';
    document.getElementById('btn-save-event').style.display = 'block';
    enableModalInputs(true);

    modal.style.display = 'flex';
}

function openEventDetails(index) {
    currentEventIndex = index;
    const event = calendarEvents[index];
    const modal = document.getElementById('calendar-event-modal');

    // Remplir champs
    document.getElementById('event-title').value = event.title;
    document.getElementById('event-start-date').value = event.startDate;
    document.getElementById('event-end-date').value = event.endDate;
    document.getElementById('event-start-time').value = event.startTime;
    document.getElementById('event-end-time').value = event.endTime;
    document.getElementById('event-desc').value = event.desc || "";

    // Gestion des droits
    const deleteBtn = document.getElementById('btn-delete-event');
    const saveBtn = document.getElementById('btn-save-event');

    if (event.type === 'teacher') {
        // Lecture seule pour prof
        deleteBtn.style.display = 'none';
        saveBtn.style.display = 'none';
        enableModalInputs(false);
    } else {
        // Édition pour élève
        deleteBtn.style.display = 'block';
        saveBtn.style.display = 'block';
        enableModalInputs(true);
    }

    modal.style.display = 'flex';
}

function enableModalInputs(enabled) {
    const inputs = document.querySelectorAll('#calendar-event-modal input, #calendar-event-modal textarea');
    inputs.forEach(input => input.disabled = !enabled);
}

function closeCalendarModal() {
    document.getElementById('calendar-event-modal').style.display = 'none';
    // Reset sélection si annulé
    selectedRangeStart = null;
    selectedRangeEnd = null;
    currentEventIndex = null;
    renderCalendar(currentCalendarDate);
}

function saveCalendarEvent() {
    const title = document.getElementById('event-title').value.trim();
    const startDate = document.getElementById('event-start-date').value;
    const endDate = document.getElementById('event-end-date').value;
    const startTime = document.getElementById('event-start-time').value;
    const endTime = document.getElementById('event-end-time').value;
    const desc = document.getElementById('event-desc').value.trim();

    if (!title || !startDate || !endDate) {
        alert("Veuillez remplir au moins le titre et les dates.");
        return;
    }

    const eventData = {
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
        title: title,
        desc: desc,
        type: 'student' // Toujours 'student' si créé/modifié par l'élève
    };

    if (currentEventIndex !== null) {
        // Mise à jour
        calendarEvents[currentEventIndex] = eventData;
    } else {
        // Création
        calendarEvents.push(eventData);
    }

    closeCalendarModal();
}

function deleteCalendarEvent() {
    if (currentEventIndex !== null) {
        if (confirm("Voulez-vous vraiment supprimer cet événement ?")) {
            calendarEvents.splice(currentEventIndex, 1);
            closeCalendarModal();
        }
    }
}

function changeMonth(delta) {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + delta);
    renderCalendar(currentCalendarDate);
}
