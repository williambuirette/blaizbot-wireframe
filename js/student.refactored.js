/**
 * Student Dashboard - Version Refactorisée
 * Utilise les modules ES6 pour une architecture propre
 * 
 * @file student.refactored.js
 * @version 2.0.0
 * @description Point d'entrée du dashboard étudiant avec imports modulaires
 */

// ============================================================================
// IMPORTS
// ============================================================================

import { CalendarModule } from './modules/calendar.js';
import { NavigationModule } from './modules/navigation.js';
import { LabModule } from './modules/lab.js';
import { AIAssistantModule } from './modules/ai-assistant.js';
import { KnowledgeModule } from './modules/knowledge.js';
import { MessagingModule } from './modules/messaging.js';

// ============================================================================
// STATE
// ============================================================================

/**
 * État global du dashboard étudiant
 */
const StudentState = {
    initialized: false,
    currentSection: 'home'
};

// ============================================================================
// CALENDAR MODAL STATE
// ============================================================================

let currentCalendarEventIndex = null;

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialise tous les modules du dashboard étudiant
 */
function initializeApp() {
    if (StudentState.initialized) return;
    
    
    // Navigation
    NavigationModule.init({
        navLinksSelector: '.nav-link',
        sectionPrefix: 'section-',
        onSectionChange: handleSectionChange
    });
    
    // Calendrier de révisions
    CalendarModule.init({
        gridId: 'calendar-grid',
        monthYearId: 'calendar-month-year',
        mode: 'student',
        events: getDefaultCalendarEvents(),
        onDateClick: handleCalendarDateSelection,
        onEventClick: openEventDetails
    });
    
    // Lab (Blaiz'Lab)
    LabModule.init({
        storageKey: 'labProjects'
    });
    
    // AI Assistant (Blaiz'bot)
    AIAssistantModule.init({
        storageKey: 'assistantProjects'
    });
    
    // Base de connaissances
    KnowledgeModule.init();
    
    // Messagerie
    MessagingModule.init({
        defaultTheme: 'Général',
        defaultChatType: 'classe'
    });
    
    // Initialiser les dashboards selon la section active
    initializeActiveDashboards();
    
    StudentState.initialized = true;
}

/**
 * Retourne les événements calendrier par défaut
 * @returns {Array} Événements
 */
function getDefaultCalendarEvents() {
    return [
        { startDate: '2025-12-22', endDate: '2025-12-22', startTime: '10:00', endTime: '11:00', title: 'Devoir Maths', type: 'teacher', desc: 'Exercices page 42' },
        { startDate: '2025-12-23', endDate: '2025-12-27', startTime: '14:00', endTime: '16:00', title: 'Réviser Histoire', type: 'student', desc: 'Chapitre Révolution' },
        { startDate: '2025-12-25', endDate: '2025-12-25', startTime: '00:00', endTime: '23:59', title: 'Noël', type: 'student', desc: 'Repos' },
        { startDate: '2025-12-28', endDate: '2025-12-28', startTime: '09:00', endTime: '10:30', title: 'Exercice Français', type: 'teacher', desc: 'Grammaire' },
        { startDate: '2025-12-30', endDate: '2026-01-02', startTime: '10:00', endTime: '12:00', title: 'Préparer Exposé', type: 'student', desc: 'Recherches CDI' }
    ];
}

/**
 * Initialise les dashboards selon la section active au chargement
 */
function initializeActiveDashboards() {
    if (document.getElementById('section-lab')?.classList.contains('active')) {
        showLabDashboard();
    }
    if (document.getElementById('section-chatbot')?.classList.contains('active')) {
        showAssistantDashboard();
    }
    if (document.getElementById('section-knowledge')?.classList.contains('active')) {
        KnowledgeModule.switchTab('teacher');
    }
    if (document.getElementById('section-revisions')?.classList.contains('active')) {
        CalendarModule.render();
    }
}

/**
 * Callback appelé lors du changement de section
 * @param {string} sectionId - ID de la section
 */
function handleSectionChange(sectionId) {
    StudentState.currentSection = sectionId;
    
    switch (sectionId) {
        case 'lab':
            showLabDashboard();
            break;
        case 'chatbot':
            showAssistantDashboard();
            break;
        case 'knowledge':
            KnowledgeModule.switchTab('teacher');
            break;
        case 'revisions':
            CalendarModule.render();
            break;
    }
}

// ============================================================================
// DASHBOARD VIEWS
// ============================================================================

/**
 * Affiche le dashboard Lab
 */
function showLabDashboard() {
    const dashboard = document.getElementById('lab-dashboard');
    const workspace = document.getElementById('lab-workspace-view');
    const headerActions = document.getElementById('lab-header-actions');
    
    if (dashboard) dashboard.style.display = 'block';
    if (workspace) workspace.style.display = 'none';
    if (headerActions) headerActions.style.display = 'flex';
    
    LabModule.renderProjects();
}

/**
 * Affiche le dashboard Assistant
 */
function showAssistantDashboard() {
    const dashboard = document.getElementById('assistant-dashboard');
    const workspace = document.getElementById('assistant-workspace-view');
    const headerActions = document.getElementById('assistant-header-actions');
    
    if (dashboard) dashboard.style.display = 'block';
    if (workspace) workspace.style.display = 'none';
    if (headerActions) headerActions.style.display = 'flex';
    
    AIAssistantModule.renderProjects();
}

/**
 * Retour au dashboard Lab depuis le workspace
 */
function backToLabDashboard() {
    LabModule.backToDashboard();
}

/**
 * Retour au dashboard Assistant depuis le workspace
 */
function backToAssistantDashboard() {
    AIAssistantModule.backToDashboard();
}

// ============================================================================
// CALENDAR FUNCTIONS
// ============================================================================

/**
 * Change le mois du calendrier
 * @param {number} delta - Nombre de mois (+1 ou -1)
 */
function changeMonth(delta) {
    CalendarModule.changeMonth(delta);
}

/**
 * Callback sur selection de dates (creation d'evenement)
 * @param {string} start - Date de debut (YYYY-MM-DD)
 * @param {string} end - Date de fin (YYYY-MM-DD)
 */
function handleCalendarDateSelection(start, end) {
    openCalendarModal(start, end);
}

/**
 * Ouvre la modal de creation d'evenement
 * @param {string} start - Date de debut
 * @param {string} end - Date de fin
 */
function openCalendarModal(start, end) {
    currentCalendarEventIndex = null;
    const modal = document.getElementById('calendar-event-modal');
    if (!modal) return;

    const titleInput = document.getElementById('event-title');
    const startDateInput = document.getElementById('event-start-date');
    const endDateInput = document.getElementById('event-end-date');
    const startTimeInput = document.getElementById('event-start-time');
    const endTimeInput = document.getElementById('event-end-time');
    const descInput = document.getElementById('event-desc');
    const deleteBtn = document.getElementById('btn-delete-event');
    const saveBtn = document.getElementById('btn-save-event');

    if (titleInput) titleInput.value = '';
    if (startDateInput) startDateInput.value = start || '';
    if (endDateInput) endDateInput.value = end || start || '';
    if (startTimeInput) startTimeInput.value = '09:00';
    if (endTimeInput) endTimeInput.value = '10:00';
    if (descInput) descInput.value = '';

    if (deleteBtn) deleteBtn.style.display = 'none';
    if (saveBtn) saveBtn.style.display = 'inline-block';

    setCalendarModalInputsEnabled(true);
    modal.style.display = 'flex';
}

/**
 * Ouvre les details d'un evenement existant
 * @param {number} index - Index de l'evenement
 * @param {Object} [eventData] - Donnees de l'evenement
 */
function openEventDetails(index, eventData = null) {
    const event = eventData || CalendarModule.getEvent(index);
    if (!event) return;

    currentCalendarEventIndex = index;

    const modal = document.getElementById('calendar-event-modal');
    if (!modal) return;

    const titleInput = document.getElementById('event-title');
    const startDateInput = document.getElementById('event-start-date');
    const endDateInput = document.getElementById('event-end-date');
    const startTimeInput = document.getElementById('event-start-time');
    const endTimeInput = document.getElementById('event-end-time');
    const descInput = document.getElementById('event-desc');
    const deleteBtn = document.getElementById('btn-delete-event');
    const saveBtn = document.getElementById('btn-save-event');

    if (titleInput) titleInput.value = event.title || '';
    if (startDateInput) startDateInput.value = event.startDate || '';
    if (endDateInput) endDateInput.value = event.endDate || event.startDate || '';
    if (startTimeInput) startTimeInput.value = event.startTime || '';
    if (endTimeInput) endTimeInput.value = event.endTime || '';
    if (descInput) descInput.value = event.desc || '';

    const isTeacherEvent = event.type === 'teacher';
    setCalendarModalInputsEnabled(!isTeacherEvent);
    if (deleteBtn) deleteBtn.style.display = isTeacherEvent ? 'none' : 'inline-block';
    if (saveBtn) saveBtn.style.display = isTeacherEvent ? 'none' : 'inline-block';

    modal.style.display = 'flex';
}

/**
 * Active/desactive les champs de la modal calendrier
 * @param {boolean} enabled
 */
function setCalendarModalInputsEnabled(enabled) {
    const inputs = document.querySelectorAll('#calendar-event-modal input, #calendar-event-modal textarea');
    inputs.forEach(input => {
        input.disabled = !enabled;
    });
}

/**
 * Ferme la modal calendrier
 */
function closeCalendarModal() {
    const modal = document.getElementById('calendar-event-modal');
    if (modal) modal.style.display = 'none';
    currentCalendarEventIndex = null;
    CalendarModule.clearSelection();
}

/**
 * Sauvegarde un evenement calendrier
 */
function saveCalendarEvent() {
    const title = document.getElementById('event-title')?.value.trim() || '';
    const startDate = document.getElementById('event-start-date')?.value || '';
    const endDateRaw = document.getElementById('event-end-date')?.value || '';
    const startTime = document.getElementById('event-start-time')?.value || '';
    const endTime = document.getElementById('event-end-time')?.value || '';
    const desc = document.getElementById('event-desc')?.value.trim() || '';
    const endDate = endDateRaw || startDate;

    if (!title || !startDate || !endDate) {
        alert('Veuillez remplir au moins le titre et les dates.');
        return;
    }

    const eventData = {
        startDate,
        endDate,
        startTime,
        endTime,
        title,
        desc,
        type: 'student'
    };

    if (currentCalendarEventIndex !== null) {
        const existing = CalendarModule.getEvent(currentCalendarEventIndex);
        if (existing && existing.type === 'teacher') return;
        CalendarModule.updateEvent(currentCalendarEventIndex, eventData);
    } else {
        CalendarModule.addEvent(eventData);
    }

    closeCalendarModal();
}

/**
 * Supprime un evenement calendrier
 */
function deleteCalendarEvent() {
    if (currentCalendarEventIndex === null) return;

    const existing = CalendarModule.getEvent(currentCalendarEventIndex);
    if (existing && existing.type === 'teacher') return;

    if (confirm('Voulez-vous vraiment supprimer cet evenement ?')) {
        CalendarModule.removeEvent(currentCalendarEventIndex);
        closeCalendarModal();
    }
}
// ============================================================================
// LAB FUNCTIONS (délégation au module)
// ============================================================================

/**
 * Ouvre la modal de création de projet Lab
 */
function openCreateLabProject() {
    LabModule.openCreateModal();
}

/**
 * Ferme la modal de création de projet
 */
function closeCreateProjectModal() {
    LabModule.closeCreateModal();
}

/**
 * Ouvre un projet Lab
 * @param {number} id - ID du projet
 */
function openLabProject(id) {
    LabModule.openProject(id);
}

/**
 * Ajoute une source au Lab
 * @param {HTMLInputElement} input - Input file
 */
function addLabSource(input) {
    LabModule.handleFileUpload(input);
}

/**
 * Prompt pour ajouter une source
 * @param {string} type - Type de source
 */
function promptAddSource(type) {
    LabModule.promptAddSource(type);
}

/**
 * Envoie un message dans le chat Lab
 */
function sendLabMessage() {
    LabModule.sendMessage();
}

/**
 * Réinitialise le chat Lab
 */
function clearLabChat() {
    LabModule.resetProject();
}

/**
 * Ouvre la config de génération
 * @param {string} type - Type de sortie
 */
function openLabConfig(type) {
    LabModule.openConfig(type);
}

/**
 * Ferme la modal de config Lab
 */
function closeLabModal() {
    LabModule.closeConfigModal();
}

/**
 * Gère les fichiers du chat Lab
 * @param {HTMLInputElement} input - Input file
 */
function handleLabChatFile(input) {
    LabModule.handleChatFile(input);
}

/**
 * Initialise le redimensionnement Lab
 * @param {MouseEvent} e - Event
 * @param {string} side - Côté
 */
function initResize(e, side, context) {
    if (context === 'assistant') {
        AIAssistantModule.initResize(e, side);
    } else {
        LabModule.initResize(e, side);
    }
}

/**
 * Réinitialise la disposition Lab
 * @param {string} side - Côté
 * @param {string} context - Contexte
 */
function resetLayout(side, context) {
    if (context === 'lab') {
        LabModule.resetLayout(side);
    } else {
        AIAssistantModule.resetLayout(side);
    }
}

// ============================================================================
// ASSISTANT FUNCTIONS (délégation au module)
// ============================================================================

/**
 * Ouvre la modal de création de projet Assistant
 */
function openCreateAssistantProject() {
    AIAssistantModule.openCreateModal();
}

/**
 * Ferme la modal de création Assistant
 */
function closeCreateAssistantModal() {
    AIAssistantModule.closeCreateModal();
}

/**
 * Ouvre un projet Assistant
 * @param {number} id - ID du projet
 */
function openAssistantProject(id) {
    AIAssistantModule.openProject(id);
}

/**
 * Met à jour le contexte du chat
 */
function updateChatContext() {
    AIAssistantModule.updateChatContext();
}

/**
 * Génère un quiz
 */
function generateQuiz() {
    AIAssistantModule.generateQuiz();
}

/**
 * Obtient une méthode de révision
 */
function getRevisionMethod() {
    AIAssistantModule.getRevisionMethod();
}

/**
 * Explique un exercice
 */
function explainExercise() {
    AIAssistantModule.explainExercise();
}

/**
 * Envoie un message à l'assistant
 */
function sendStudentMessage() {
    AIAssistantModule.sendMessage();
}

/**
 * Gère les sources de l'assistant
 * @param {HTMLInputElement} input - Input file
 */
function addAssistantSource(input) {
    AIAssistantModule.handleFileUpload(input);
}

/**
 * Prompt pour source assistant
 * @param {string} type - Type
 */
function promptAssistantSource(type) {
    AIAssistantModule.promptAddSource(type);
}

// ============================================================================
// KNOWLEDGE FUNCTIONS (délégation au module)
// ============================================================================

/**
 * Bascule entre les onglets de la base de connaissances
 * @param {string} type - 'teacher' ou 'student'
 */
function switchKnowledgeTab(type) {
    KnowledgeModule.switchTab(type);
}

/**
 * Sélectionne une matière
 * @param {string} type - Type
 * @param {string} subjectId - ID
 * @param {HTMLElement} element - Élément
 */
function selectKnowledgeSubject(type, subjectId, element) {
    KnowledgeModule.selectSubject(type, subjectId, element);
}

/**
 * Ajoute une matière étudiant
 */
function addStudentSubject() {
    KnowledgeModule.addSubject();
}

/**
 * Renomme une matière étudiant
 * @param {string} id - ID
 */
function renameStudentSubject(id) {
    KnowledgeModule.renameSubject(id);
}

/**
 * Supprime une matière étudiant
 * @param {string} id - ID
 */
function deleteStudentSubject(id) {
    KnowledgeModule.deleteSubject(id);
}

/**
 * Ajoute un thème
 * @param {string} subjectId - ID matière
 */
function addStudentTheme(subjectId) {
    KnowledgeModule.addTheme(subjectId);
}

/**
 * Renomme un thème
 * @param {string} subjectId - ID matière
 * @param {string} themeName - Nom thème
 */
function renameStudentTheme(subjectId, themeName) {
    KnowledgeModule.renameTheme(subjectId, themeName);
}

/**
 * Supprime un thème
 * @param {string} subjectId - ID matière
 * @param {string} themeName - Nom thème
 */
function deleteStudentTheme(subjectId, themeName) {
    KnowledgeModule.deleteTheme(subjectId, themeName);
}

/**
 * Ajoute un document
 * @param {string} subjectId - ID matière
 * @param {string} themeName - Nom thème
 */
function addStudentDoc(subjectId, themeName) {
    KnowledgeModule.addDoc(subjectId, themeName);
}

/**
 * Renomme un document
 * @param {string} subjectId - ID matière
 * @param {string} themeName - Nom thème
 * @param {string} docName - Nom doc
 */
function renameStudentDoc(subjectId, themeName, docName) {
    KnowledgeModule.renameDoc(subjectId, themeName, docName);
}

/**
 * Supprime un document
 * @param {string} subjectId - ID matière
 * @param {string} themeName - Nom thème
 * @param {string} docName - Nom doc
 */
function deleteStudentDoc(subjectId, themeName, docName) {
    KnowledgeModule.deleteDoc(subjectId, themeName, docName);
}

/**
 * Ferme la modal générique
 */
function closeGenericModal() {
    KnowledgeModule.closeGenericModal();
}

// ============================================================================
// MESSAGING FUNCTIONS (délégation au module)
// ============================================================================

/**
 * Sélectionne un chat étudiant
 * @param {string} theme - Thème
 * @param {string} type - Type
 */
function selectStudentChat(theme, type, element) {
    MessagingModule.selectChat(theme, type, element);
}

/**
 * Envoie un message dans le chat étudiant
 */
function sendStudentChatMessage() {
    MessagingModule.sendMessage();
}

// ============================================================================
// GLOBAL EXPORTS (pour compatibilité onclick dans HTML)
// ============================================================================

// Exposer les fonctions globalement
window.showLabDashboard = showLabDashboard;
window.showAssistantDashboard = showAssistantDashboard;
window.backToLabDashboard = backToLabDashboard;
window.backToAssistantDashboard = backToAssistantDashboard;

// Calendar
window.changeMonth = changeMonth;
window.openCalendarModal = openCalendarModal;
window.openEventDetails = openEventDetails;
window.closeCalendarModal = closeCalendarModal;
window.saveCalendarEvent = saveCalendarEvent;
window.deleteCalendarEvent = deleteCalendarEvent;

// Lab
window.openCreateLabProject = openCreateLabProject;
window.closeCreateProjectModal = closeCreateProjectModal;
window.openLabProject = openLabProject;
window.addLabSource = addLabSource;
window.promptAddSource = promptAddSource;
window.sendLabMessage = sendLabMessage;
window.clearLabChat = clearLabChat;
window.openLabConfig = openLabConfig;
window.closeLabModal = closeLabModal;
window.handleLabChatFile = handleLabChatFile;
window.initResize = initResize;
window.resetLayout = resetLayout;

// Assistant
window.openCreateAssistantProject = openCreateAssistantProject;
window.closeCreateAssistantModal = closeCreateAssistantModal;
window.openAssistantProject = openAssistantProject;
window.updateChatContext = updateChatContext;
window.generateQuiz = generateQuiz;
window.getRevisionMethod = getRevisionMethod;
window.explainExercise = explainExercise;
window.sendStudentMessage = sendStudentMessage;
window.addAssistantSource = addAssistantSource;
window.promptAssistantSource = promptAssistantSource;

// Knowledge
window.switchKnowledgeTab = switchKnowledgeTab;
window.selectKnowledgeSubject = selectKnowledgeSubject;
window.addStudentSubject = addStudentSubject;
window.renameStudentSubject = renameStudentSubject;
window.deleteStudentSubject = deleteStudentSubject;
window.addStudentTheme = addStudentTheme;
window.renameStudentTheme = renameStudentTheme;
window.deleteStudentTheme = deleteStudentTheme;
window.addStudentDoc = addStudentDoc;
window.renameStudentDoc = renameStudentDoc;
window.deleteStudentDoc = deleteStudentDoc;
window.closeGenericModal = closeGenericModal;

// Messaging
window.selectStudentChat = selectStudentChat;
window.sendStudentChatMessage = sendStudentChatMessage;

// ============================================================================
// DOM READY
// ============================================================================

document.addEventListener('DOMContentLoaded', initializeApp);

// Export pour usage module
export {
    initializeApp,
    showLabDashboard,
    showAssistantDashboard,
    StudentState
};
