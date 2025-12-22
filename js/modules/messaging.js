/**
 * Module Messaging - Messagerie
 * Gère la messagerie entre élèves et professeurs
 * @module MessagingModule
 */

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

/**
 * État interne du module Messaging
 * @type {Object}
 */
const MessagingState = {
    /** @type {string} */
    currentTheme: 'Général',
    /** @type {string} */
    currentChatType: 'classe',
    /** @type {string} */
    currentTarget: ''
};

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialise le module Messaging
 * @param {Object} options - Options d'initialisation
 * @param {string} [options.defaultTheme='Général'] - Thème par défaut
 * @param {string} [options.defaultChatType='classe'] - Type de chat par défaut
 */
function init(options = {}) {
    MessagingState.currentTheme = options.defaultTheme || 'Général';
    MessagingState.currentChatType = options.defaultChatType || 'classe';
    
    // Setup recherche si présent
    setupSearch();
}

/**
 * Configure la recherche dans les conversations
 */
function setupSearch() {
    const searchInput = document.querySelector('#section-messages input[type="text"]');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const term = e.target.value.toLowerCase();
            document.querySelectorAll('#student-conv-list .msg-item, #student-conv-list > div[onclick]').forEach(item => {
                const text = item.innerText.toLowerCase();
                item.style.display = text.includes(term) ? 'flex' : 'none';
            });
        });
    }
}

// ============================================================================
// CHAT SELECTION
// ============================================================================

/**
 * Sélectionne un chat (classe ou privé)
 * @param {string} theme - Thème du chat
 * @param {string} type - Type: 'classe' ou 'prive'
 */
function selectChat(theme, type, sourceElement = null) {
    MessagingState.currentTheme = theme;
    MessagingState.currentChatType = type;

    // Mise à jour visuelle de la sidebar
    document.querySelectorAll('.msg-item, [onclick^="selectStudentChat"], [onclick*="MessagingModule.selectChat"]').forEach(item => {
        item.style.background = 'transparent';
        item.style.borderLeft = 'none';
        item.style.fontWeight = 'normal';
    });
    
    const selector = '.msg-item, [onclick^="selectStudentChat"], [onclick*="MessagingModule.selectChat"]';
    const activeFromEvent = (typeof window !== 'undefined' && window.event) ? window.event.currentTarget : null;
    const activeFromFocus = document.activeElement && document.activeElement.matches(selector)
        ? document.activeElement
        : null;
    const activeElement = sourceElement || activeFromEvent || activeFromFocus;

    if (activeElement) {
        activeElement.style.background = '#f0f7ff';
        activeElement.style.borderLeft = '4px solid #3498db';
        activeElement.style.fontWeight = 'bold';
    }

    // Déterminer le nom du prof selon le thème
    const profName = getProfName(theme);

    // Mise à jour du header
    const targetNameEl = document.getElementById('chat-target-name');
    const targetThemeEl = document.getElementById('chat-target-theme');
    
    if (targetNameEl) {
        targetNameEl.innerText = (type === 'classe' 
            ? `📢 Chat de Classe : ${theme}` 
            : `👤 Message à ${profName}`);
    }
    if (targetThemeEl) {
        targetThemeEl.innerText = `Thème : ${theme}`;
    }

    // Charger les messages
    loadMessages(theme, type, profName);
}

/**
 * Retourne le nom du professeur selon le thème
 * @param {string} theme - Thème du cours
 * @returns {string} Nom du professeur
 */
function getProfName(theme) {
    const profMapping = {
        'La Poésie': 'Mme. MARTIN',
        'Les Fractions': 'M. DUPONT',
        'Général': 'M. DUPONT'
    };
    return profMapping[theme] || 'M. DUPONT';
}

/**
 * Charge les messages d'une conversation
 * @param {string} theme - Thème
 * @param {string} type - Type de chat
 * @param {string} profName - Nom du professeur
 */
function loadMessages(theme, type, profName) {
    const chatBox = document.getElementById('student-chat-messages');
    if (!chatBox) return;
    
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

// ============================================================================
// MESSAGE SENDING
// ============================================================================

/**
 * Envoie un message dans le chat
 * @param {string} [inputId='student-chat-input-text'] - ID de l'input
 * @param {string} [messagesId='student-chat-messages'] - ID du container messages
 */
function sendMessage(inputId = 'student-chat-input-text', messagesId = 'student-chat-messages') {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    const text = input.value.trim();
    if (text === "") return;

    const chatBox = document.getElementById(messagesId);
    if (!chatBox) return;
    
    // Message de l'utilisateur
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.style.cssText = "align-self: flex-end; background: #3498db; color: white; padding: 10px 15px; border-radius: 15px 15px 0 15px; max-width: 70%; margin-bottom: 10px;";
    userMsg.innerHTML = `<strong>Moi :</strong> ${text}`;
    
    chatBox.appendChild(userMsg);
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Simulation réponse automatique
    setTimeout(() => {
        const profName = getProfName(MessagingState.currentTheme);
        const botMsg = document.createElement('div');
        botMsg.style.cssText = "align-self: flex-start; background: white; color: #2c3e50; padding: 10px 15px; border-radius: 15px 15px 15px 0; max-width: 70%; border: 1px solid #ddd; margin-bottom: 10px;";
        botMsg.innerHTML = `<span style="font-weight: bold; color: #3498db;">${profName} :</span> Merci pour ton message, je te réponds dès que possible !`;
        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
}

/**
 * Ajoute un message du bot/professeur
 * @param {string} text - Texte du message
 * @param {string} senderName - Nom de l'expéditeur
 * @param {string} [messagesId='student-chat-messages'] - ID du container
 */
function addBotMessage(text, senderName, messagesId = 'student-chat-messages') {
    const chatBox = document.getElementById(messagesId);
    if (!chatBox) return;
    
    const botMsg = document.createElement('div');
    botMsg.style.cssText = "align-self: flex-start; background: white; color: #2c3e50; padding: 10px 15px; border-radius: 15px 15px 15px 0; max-width: 70%; border: 1px solid #ddd; margin-bottom: 10px;";
    botMsg.innerHTML = `<span style="font-weight: bold; color: #3498db;">${senderName} :</span> ${text}`;
    chatBox.appendChild(botMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

/**
 * Ajoute un message de l'utilisateur
 * @param {string} text - Texte du message
 * @param {string} [messagesId='student-chat-messages'] - ID du container
 */
function addUserMessage(text, messagesId = 'student-chat-messages') {
    const chatBox = document.getElementById(messagesId);
    if (!chatBox) return;
    
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.style.cssText = "align-self: flex-end; background: #3498db; color: white; padding: 10px 15px; border-radius: 15px 15px 0 15px; max-width: 70%; margin-bottom: 10px;";
    userMsg.innerHTML = `<strong>Moi :</strong> ${text}`;
    chatBox.appendChild(userMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ============================================================================
// STATE ACCESS
// ============================================================================

/**
 * Retourne l'état actuel de la messagerie
 * @returns {Object} État actuel
 */
function getState() {
    return { ...MessagingState };
}

/**
 * Retourne le thème actuel
 * @returns {string}
 */
function getCurrentTheme() {
    return MessagingState.currentTheme;
}

/**
 * Retourne le type de chat actuel
 * @returns {string}
 */
function getCurrentChatType() {
    return MessagingState.currentChatType;
}

// ============================================================================
// MODULE EXPORTS
// ============================================================================

/**
 * Module Messaging exporté
 */
export const MessagingModule = {
    // Initialization
    init,
    
    // Chat Selection
    selectChat,
    getProfName,
    loadMessages,
    
    // Message Sending
    sendMessage,
    addBotMessage,
    addUserMessage,
    
    // State
    getState,
    getCurrentTheme,
    getCurrentChatType
};

// Export global pour compatibilité onclick
if (typeof window !== 'undefined') {
    window.MessagingModule = MessagingModule;
}

export default MessagingModule;
