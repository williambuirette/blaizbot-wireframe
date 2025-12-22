/**
 * @fileoverview Module Chat Partagé - Blaiz'bot Educational Platform
 * Gère les messages de chat pour l'assistant IA et le Lab
 * 
 * @module ChatModule
 * @version 1.0.0
 */

// ==========================================
// ÉTAT DU MODULE
// ==========================================

/**
 * Configuration du chat
 * @type {Object}
 */
const ChatState = {
    config: {
        containerId: 'chat-messages',
        inputId: 'chat-input',
        botName: 'B',
        botColor: '#3498db',
        botBgColor: '#f1f2f6',
        userColor: '#3498db'
    }
};

// ==========================================
// FONCTIONS DE CRÉATION DE MESSAGES
// ==========================================

/**
 * Crée un élément de message bot
 * @param {string} text - Contenu du message (supporte HTML/Markdown basique)
 * @param {Object} [options] - Options de style
 * @param {string} [options.botName='B'] - Initiale du bot
 * @param {string} [options.botColor='#3498db'] - Couleur de l'avatar
 * @param {string} [options.bgColor='#f1f2f6'] - Couleur de fond du message
 * @returns {HTMLElement}
 */
function createBotMessage(text, options = {}) {
    const config = { ...ChatState.config, ...options };
    
    const msg = document.createElement('div');
    msg.style.cssText = 'margin-bottom: 15px; display: flex; gap: 10px; animation: highlightNew 0.5s ease-out;';
    msg.innerHTML = `
        <div style="width: 35px; height: 35px; background: ${config.botColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; flex-shrink: 0;">
            ${config.botName}
        </div>
        <div style="background: ${config.bgColor}; padding: 12px; border-radius: 0 15px 15px 15px; max-width: 80%; font-size: 0.9rem;">
            ${text}
        </div>
    `;
    return msg;
}

/**
 * Crée un élément de message utilisateur
 * @param {string} text - Contenu du message
 * @param {Object} [options] - Options de style
 * @param {string} [options.bgColor='#3498db'] - Couleur de fond
 * @returns {HTMLElement}
 */
function createUserMessage(text, options = {}) {
    const bgColor = options.bgColor || ChatState.config.userColor;
    
    const msg = document.createElement('div');
    msg.style.cssText = 'margin-bottom: 15px; display: flex; gap: 10px; justify-content: flex-end;';
    msg.innerHTML = `
        <div style="background: ${bgColor}; color: white; padding: 12px; border-radius: 15px 15px 0 15px; max-width: 80%; font-size: 0.9rem;">
            ${text}
        </div>
    `;
    return msg;
}

/**
 * Crée un message système (centré, grisé)
 * @param {string} text - Contenu du message
 * @returns {HTMLElement}
 */
function createSystemMessage(text) {
    const msg = document.createElement('div');
    msg.style.cssText = 'text-align: center; color: #95a5a6; font-size: 0.8rem; margin: 10px 0;';
    msg.innerHTML = `--- ${text} ---`;
    return msg;
}

/**
 * Crée un message avec fichier joint
 * @param {string} fileName - Nom du fichier
 * @returns {HTMLElement}
 */
function createFileMessage(fileName) {
    const msg = document.createElement('div');
    msg.style.cssText = 'margin-bottom: 15px; display: flex; gap: 10px; justify-content: flex-end;';
    msg.innerHTML = `
        <div style="background: #ecf0f1; color: #2c3e50; padding: 10px 15px; border-radius: 15px; font-size: 0.85rem; border: 1px dashed #bdc3c7;">
            📎 Fichier joint : ${fileName}
        </div>
    `;
    return msg;
}

// ==========================================
// FONCTIONS D'AJOUT AU DOM
// ==========================================

/**
 * Ajoute un message bot au conteneur de chat
 * @param {string} text - Contenu du message
 * @param {string} [containerId] - ID du conteneur (optionnel)
 * @param {Object} [options] - Options de style
 */
function addBotMessage(text, containerId = null, options = {}) {
    const container = document.getElementById(containerId || ChatState.config.containerId);
    if (!container) {
        console.warn('[ChatModule] Container not found:', containerId || ChatState.config.containerId);
        return;
    }

    const msg = createBotMessage(text, options);
    container.appendChild(msg);
    scrollToBottom(container);
}

/**
 * Ajoute un message utilisateur au conteneur de chat
 * @param {string} text - Contenu du message
 * @param {string} [containerId] - ID du conteneur (optionnel)
 * @param {Object} [options] - Options de style
 */
function addUserMessage(text, containerId = null, options = {}) {
    const container = document.getElementById(containerId || ChatState.config.containerId);
    if (!container) return;

    const msg = createUserMessage(text, options);
    container.appendChild(msg);
    scrollToBottom(container);
}

/**
 * Ajoute un message système au conteneur de chat
 * @param {string} text - Contenu du message
 * @param {string} [containerId] - ID du conteneur (optionnel)
 */
function addSystemMessage(text, containerId = null) {
    const container = document.getElementById(containerId || ChatState.config.containerId);
    if (!container) return;

    const msg = createSystemMessage(text);
    container.appendChild(msg);
    scrollToBottom(container);
}

/**
 * Scroll automatique vers le bas du conteneur
 * @param {HTMLElement} container 
 */
function scrollToBottom(container) {
    container.scrollTop = container.scrollHeight;
}

// ==========================================
// FONCTIONS DE GESTION DU CHAT
// ==========================================

/**
 * Vide le conteneur de chat
 * @param {string} [containerId] - ID du conteneur
 */
function clearChat(containerId = null) {
    const container = document.getElementById(containerId || ChatState.config.containerId);
    if (container) {
        container.innerHTML = '';
    }
}

/**
 * Envoie un message depuis l'input
 * @param {string} [inputId] - ID de l'input
 * @param {string} [containerId] - ID du conteneur de messages
 * @param {Function} [onSend] - Callback après envoi
 * @returns {string|null} - Texte envoyé ou null si vide
 */
function sendMessageFromInput(inputId = null, containerId = null, onSend = null) {
    const input = document.getElementById(inputId || ChatState.config.inputId);
    if (!input) return null;

    const text = input.value.trim();
    if (!text) return null;

    addUserMessage(text, containerId);
    input.value = '';

    if (onSend) {
        onSend(text);
    }

    return text;
}

/**
 * Simule une réponse bot avec délai
 * @param {string} text - Texte de la réponse
 * @param {number} [delay=1000] - Délai en ms
 * @param {string} [containerId] - ID du conteneur
 * @param {Object} [options] - Options de style
 */
function simulateBotResponse(text, delay = 1000, containerId = null, options = {}) {
    setTimeout(() => {
        addBotMessage(text, containerId, options);
    }, delay);
}

// ==========================================
// CONFIGURATIONS PRÉDÉFINIES
// ==========================================

/**
 * Configurations prédéfinies pour différents contextes
 */
const ChatConfigs = {
    /** Configuration pour l'assistant Blaiz'bot */
    assistant: {
        containerId: 'chat-messages',
        inputId: 'chat-input',
        botName: 'B',
        botColor: '#3498db',
        bgColor: '#f1f2f6'
    },
    /** Configuration pour le Lab */
    lab: {
        containerId: 'lab-chat-messages',
        inputId: 'lab-chat-input',
        botName: 'L',
        botColor: '#9b59b6',
        bgColor: '#f3e5f5'
    },
    /** Configuration pour la messagerie teacher */
    teacherMessaging: {
        containerId: 'main-chat-messages',
        inputId: 'teacher-chat-input',
        botName: 'P',
        botColor: '#27ae60',
        bgColor: '#e8f5e9'
    },
    /** Configuration pour la messagerie student */
    studentMessaging: {
        containerId: 'student-chat-messages',
        inputId: 'student-chat-input-text',
        botName: 'P',
        botColor: '#3498db',
        bgColor: '#ffffff'
    }
};

// ==========================================
// API PUBLIQUE DU MODULE
// ==========================================

/**
 * Module Chat - API Publique
 * @namespace ChatModule
 */
const ChatModule = {
    /**
     * Initialise le module avec une configuration
     * @param {Object|string} config - Configuration ou nom de preset
     */
    init(config = {}) {
        if (typeof config === 'string' && ChatConfigs[config]) {
            ChatState.config = { ...ChatState.config, ...ChatConfigs[config] };
        } else {
            ChatState.config = { ...ChatState.config, ...config };
        }
    },

    /**
     * Ajoute un message bot
     * @param {string} text 
     * @param {Object} [options]
     */
    addBotMessage(text, options = {}) {
        addBotMessage(text, options.containerId, options);
    },

    /**
     * Ajoute un message utilisateur
     * @param {string} text 
     * @param {Object} [options]
     */
    addUserMessage(text, options = {}) {
        addUserMessage(text, options.containerId, options);
    },

    /**
     * Ajoute un message système
     * @param {string} text 
     * @param {string} [containerId]
     */
    addSystemMessage(text, containerId) {
        addSystemMessage(text, containerId);
    },

    /**
     * Ajoute un message fichier
     * @param {string} fileName 
     * @param {string} [containerId]
     */
    addFileMessage(fileName, containerId) {
        const container = document.getElementById(containerId || ChatState.config.containerId);
        if (container) {
            container.appendChild(createFileMessage(fileName));
            scrollToBottom(container);
        }
    },

    /**
     * Envoie depuis l'input et retourne le texte
     * @param {Function} [onSend] - Callback avec le texte
     * @returns {string|null}
     */
    sendFromInput(onSend = null) {
        return sendMessageFromInput(null, null, onSend);
    },

    /**
     * Simule une réponse bot
     * @param {string} text 
     * @param {number} [delay=1000]
     */
    simulateResponse(text, delay = 1000) {
        simulateBotResponse(text, delay);
    },

    /**
     * Vide le chat
     */
    clear() {
        clearChat();
    },

    /**
     * Scroll vers le bas
     */
    scrollToBottom() {
        const container = document.getElementById(ChatState.config.containerId);
        if (container) scrollToBottom(container);
    },

    /**
     * Récupère les configurations prédéfinies
     * @returns {Object}
     */
    getConfigs() {
        return { ...ChatConfigs };
    },

    /**
     * Crée les éléments de message (pour usage avancé)
     */
    create: {
        botMessage: createBotMessage,
        userMessage: createUserMessage,
        systemMessage: createSystemMessage,
        fileMessage: createFileMessage
    }
};

// Export ES6
export { ChatModule, ChatConfigs };

// Export global
if (typeof window !== 'undefined') {
    window.ChatModule = ChatModule;
}
