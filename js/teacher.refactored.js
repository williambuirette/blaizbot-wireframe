/**
 * TEACHER.JS - Teacher Dashboard Logic (Refactored)
 * 
 * @fileoverview Logique spécifique au tableau de bord professeur.
 * Utilise les modules partagés pour calendrier, modals, chat et navigation.
 * 
 * @version 2.0.0 - Refactored with ES6 Modules
 */

// Debug marker - si ce log apparaît, le fichier est exécuté
console.log('[teacher.refactored.js] Starting module load...');
window.teacherModuleLoaded = true;

// ==========================================
// IMPORTS
// ==========================================

import { CalendarModule } from './modules/calendar.js';
import { NavigationModule } from './modules/navigation.js';
import { ModalManager } from './utils/modals.js';

console.log('[teacher.refactored.js] All imports loaded successfully');

// ==========================================
// 1. DATA MODELS (MOCK DATA & TYPES)
// ==========================================

/**
 * @typedef {Object} Student
 * @property {string} id - Identifiant unique de l'élève
 * @property {string} name - Nom complet de l'élève
 */

/**
 * @typedef {Object} TeacherEvent
 * @property {string} startDate - Date de début (YYYY-MM-DD)
 * @property {string} endDate - Date de fin (YYYY-MM-DD)
 * @property {string} startTime - Heure de début (HH:MM)
 * @property {string} endTime - Heure de fin (HH:MM)
 * @property {string} title - Titre de l'événement
 * @property {string} classId - ID de la classe concernée
 * @property {string[]} studentIds - Liste des IDs élèves ('all' pour toute la classe)
 * @property {string} subject - Matière concernée
 * @property {string} [desc] - Description optionnelle
 * @property {string} [type] - Type d'événement ('teacher', 'exam', etc.)
 */

/**
 * Données simulées pour l'application.
 */
const teacherData = {
    classes: {
        '6A': [
            { id: 'student1', name: 'Alice MARTIN' },
            { id: 'student2', name: 'Thomas DUBOIS' },
            { id: 'student5', name: 'Emma PETIT' },
            { id: 'student6', name: 'Hugo DURAND' }
        ],
        '3B': [
            { id: 'student3', name: 'Lucas BERNARD' },
            { id: 'student4', name: 'Zoe BERNARD' },
            { id: 'student7', name: 'Chloé MOREL' }
        ]
    },
    subjects: {
        'Maths': ['Chapitre 4 - Les Fractions', 'Géométrie : Les Triangles', 'Introduction aux Nombres Relatifs', 'Calcul Mental'],
        'Histoire': ['La Révolution Française', 'La Guerre Froide', 'L\'Empire Romain'],
        'Francais': ['La Poésie', 'Grammaire : Le Verbe', 'Lecture : Molière'],
        'Physique': ['Les Atomes', 'L\'Électricité', 'Mécanique des fluides']
    }
};

/** @type {TeacherEvent[]} */
let teacherEvents = [
    { startDate: '2025-12-22', endDate: '2025-12-22', startTime: '10:00', endTime: '11:00', title: 'Devoir Maths', classId: '6A', studentIds: ['all'], subject: 'Maths', desc: 'Exercices page 42' },
    { startDate: '2025-12-23', endDate: '2025-12-23', startTime: '14:00', endTime: '15:00', title: 'Soutien Histoire', classId: '3B', studentIds: ['student1'], subject: 'Histoire', desc: 'Révision Révolution' },
    { startDate: '2025-12-28', endDate: '2025-12-28', startTime: '09:00', endTime: '10:30', title: 'Exercice Français', classId: '6A', studentIds: ['all'], subject: 'Francais', desc: 'Grammaire' }
];
let currentTeacherEventIndex = null;


// ==========================================
// 2. CALENDAR INTEGRATION
// ==========================================

/**
 * Filtre les événements selon les filtres de la vue planning
 * @param {TeacherEvent} event 
 * @param {string} dateStr 
 * @returns {boolean}
 */
function filterTeacherEvents(event, dateStr) {
    const filterClass = document.getElementById('planning-filter-class')?.value || 'all';
    const filterStudent = document.getElementById('planning-filter-student')?.value || 'all';

    if (filterClass !== 'all' && event.classId !== filterClass) return false;
    if (filterStudent !== 'all') {
        if (event.studentIds.includes('all')) return true;
        return event.studentIds.includes(filterStudent);
    }
    return true;
}

/**
 * Callback quand une plage de dates est sélectionnée
 * @param {string} start 
 * @param {string} end 
 */
function onCalendarDateSelect(start, end) {
    openTeacherCalendarModal(start, end);
}

/**
 * Callback quand un événement est cliqué
 * @param {number} index 
 * @param {TeacherEvent} event 
 */
function onCalendarEventClick(index, event) {
    openTeacherEventDetails(index, event);
}


/**
 * Met à jour la vue planning (pour compatibilité)
 */
function updatePlanningView() {
    CalendarModule.render();
}

/**
 * Change le mois du calendrier (exposé globalement)
 * @param {number} delta 
 */
function changeMonth(delta) {
    CalendarModule.changeMonth(delta);
}

// ==========================================
// 3. DASHBOARD & KPI LOGIC
// ==========================================

function updateDashboardView() {
    const classe = document.getElementById('dash-filter-classe')?.value;
    const kpiComp = document.getElementById('dash-kpi-comprehension');
    const kpiEng = document.getElementById('dash-kpi-engagement');
    const kpiAlerts = document.getElementById('dash-kpi-alerts');
    const alertsBody = document.getElementById('dash-alerts-body');

    if (!kpiComp) return;

    const dashboardData = {
        '6A': { comp: '72%', eng: '90%', alerts: '3', html: createAlertRow('Thomas DUBOIS', '6ème A', 'Fractions', 'Inactivité prolongée sur le quiz (3 jours)', 'Haute') },
        '3B': { comp: '84%', eng: '78%', alerts: '1', html: createAlertRow('Alice MARTIN', '3ème B', 'Algèbre', 'Erreurs répétées sur les nombres négatifs', 'Moyenne') },
        'all': { comp: '78%', eng: '85%', alerts: '4', html: createAlertRow('Thomas DUBOIS', '6ème A', 'Fractions', 'Inactivité prolongée', 'Haute') + createAlertRow('Alice MARTIN', '3ème B', 'Algèbre', 'Erreurs répétées', 'Moyenne') }
    };

    const data = dashboardData[classe] || dashboardData['all'];
    kpiComp.innerText = data.comp;
    kpiEng.innerText = data.eng;
    kpiAlerts.innerText = data.alerts;
    alertsBody.innerHTML = data.html;
}

/**
 * Crée une ligne d'alerte pour le dashboard
 */
function createAlertRow(name, classe, subject, message, priority) {
    const priorityColors = {
        'Haute': { bg: '#ffebee', color: '#c62828' },
        'Moyenne': { bg: '#fff3e0', color: '#ef6c00' },
        'Basse': { bg: '#e8f5e9', color: '#2e7d32' }
    };
    const p = priorityColors[priority] || priorityColors['Moyenne'];
    
    return `
        <tr>
            <td>${name}</td>
            <td>${classe}</td>
            <td>${subject}</td>
            <td>${message}</td>
            <td><span class="status-pill" style="background: ${p.bg}; color: ${p.color};">${priority}</span></td>
            <td><button class="btn-small" onclick="selectChat('${name}', 'eleve', '${subject}')">Relancer</button></td>
        </tr>
    `;
}

// ==========================================
// 4. CONTENT MANAGEMENT
// ==========================================

function selectContent(title, type) {
    document.getElementById('selected-content-title').innerText = title;
    const typeTag = document.getElementById('selected-content-type');
    
    const typeConfig = {
        pdf: { text: 'Type : PDF / Cours', bg: '#e8f5e9', color: '#2e7d32' },
        quiz: { text: 'Type : Quiz IA', bg: '#e3f2fd', color: '#1565c0' }
    };
    
    const config = typeConfig[type] || typeConfig.pdf;
    typeTag.innerText = config.text;
    typeTag.style.background = config.bg;
    typeTag.style.color = config.color;

    // Animation de chargement
    const overlay = document.getElementById('content-loading-overlay');
    if (overlay) {
        overlay.style.display = 'flex';
        setTimeout(() => { overlay.style.display = 'none'; }, 800);
    }

    // Mise à jour visuelle de l'arbre
    document.querySelectorAll('.tree-item.file').forEach(item => {
        item.classList.toggle('active', item.innerText.includes(title));
    });
}

function selectAttrContent(element, title) {
    document.querySelectorAll('#attr-tree-view .tree-item.file').forEach(item => item.classList.remove('active'));
    element.classList.add('active');
    document.getElementById('attr-content-selected-value').value = title;
}

// ==========================================
// 4B. UI HELPERS
// ==========================================

function refreshTree() {
    const overlay = document.getElementById('content-loading-overlay');
    if (!overlay) return;
    overlay.style.display = 'flex';
    setTimeout(() => { overlay.style.display = 'none'; }, 400);
}

function handleFileSelection(input) {
    const info = document.getElementById('selected-file-info');
    const nameEl = document.getElementById('selected-file-name');
    if (!input || !info || !nameEl) return;

    if (!input.files || input.files.length === 0) {
        info.style.display = 'none';
        return;
    }

    nameEl.innerText = input.files[0].name;
    info.style.display = 'block';
}

function toggleAttrTarget() {
    const typeSelect = document.getElementById('attr-type');
    const classTarget = document.getElementById('attr-target-classe');
    const studentTarget = document.getElementById('attr-target-eleve');
    if (!typeSelect || !classTarget || !studentTarget) return;

    const isStudent = typeSelect.value === 'eleve';
    classTarget.style.display = isStudent ? 'none' : 'block';
    studentTarget.style.display = isStudent ? 'block' : 'none';
}

function updateAIConfig() {
    const goalInput = document.getElementById('ai-content-goal');
    const container = goalInput ? goalInput.closest('.stats-card') : null;
    const status = container ? container.querySelector('span[style]') : null;

    if (status) {
        status.innerText = 'Derniere mise a jour : maintenant';
        status.style.color = '#27ae60';
    }
}

function updateElevesList() {
    const classSelect = document.getElementById('filter-eleves-classe');
    const studentSelect = document.getElementById('filter-eleves-nom');
    if (!classSelect || !studentSelect) return;

    const classId = classSelect.value;
    const allStudents = Object.values(teacherData.classes || {}).flat();
    const students = classId && teacherData.classes[classId] ? teacherData.classes[classId] : allStudents;
    const sorted = [...students].sort((a, b) => a.name.localeCompare(b.name));

    const options = ['<option value="">Selectionner un eleve...</option>'];
    sorted.forEach(student => {
        options.push(`<option>${student.name}</option>`);
    });

    studentSelect.innerHTML = options.join('');
}

function isTabButtonForName(button, fnName, tabName) {
    const onclick = button.getAttribute('onclick') || '';
    return onclick.includes(`${fnName}('${tabName}')`) || onclick.includes(`${fnName}(\"${tabName}\")`);
}

function switchClasseTab(tabName) {
    const modal = document.getElementById('modal-classe-details');
    if (!modal) return;

    modal.querySelectorAll('.classe-tab-content').forEach(content => {
        content.style.display = content.id === `classe-tab-${tabName}` ? 'block' : 'none';
    });

    modal.querySelectorAll('.tab-btn-classe').forEach(button => {
        const isActive = isTabButtonForName(button, 'switchClasseTab', tabName);
        button.classList.toggle('active', isActive);
        button.style.borderBottom = isActive ? '2px solid #3498db' : 'none';
    });
}

function switchEleveTab(tabName) {
    const modal = document.getElementById('modal-eleve-details');
    if (!modal) return;

    modal.querySelectorAll('.eleve-tab-content').forEach(content => {
        content.style.display = content.id === `eleve-tab-${tabName}` ? 'block' : 'none';
    });

    modal.querySelectorAll('.tab-btn').forEach(button => {
        const isActive = isTabButtonForName(button, 'switchEleveTab', tabName);
        button.classList.toggle('active', isActive);
        button.style.borderBottom = isActive ? '2px solid #3498db' : 'none';
    });
}

function showRemediation(topic) {
    const box = document.getElementById('remediation-box');
    const title = document.getElementById('remediation-title');
    const content = document.getElementById('remediation-content');
    if (!box || !title || !content) return;

    const data = {
        fractions: {
            title: 'Remediation : Fractions',
            content: '<ul><li>Revoir numerateur et denominateur.</li><li>Utiliser un schema visuel.</li><li>3 exercices courts avec correction.</li></ul>'
        },
        calcul: {
            title: 'Remediation : Calcul',
            content: '<ul><li>Revoir priorites operatoires.</li><li>5 calculs rapides a la suite.</li><li>Verifier avec estimation.</li></ul>'
        }
    };

    const selected = data[topic] || {
        title: 'Remediation',
        content: '<ul><li>Revoir les bases du chapitre.</li><li>Faire un exercice guide.</li></ul>'
    };

    title.innerText = selected.title;
    content.innerHTML = selected.content;
    box.style.display = 'block';
}

// ==========================================
// 5. MESSAGING LOGIC
// ==========================================

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function appendTeacherMessage(container, text) {
    if (!container) return;
    const message = document.createElement('div');
    message.className = 'message bot';
    message.style.alignSelf = 'flex-end';
    message.style.background = '#3498db';
    message.style.color = 'white';
    message.style.padding = '10px 15px';
    message.style.borderRadius = '15px 15px 0 15px';
    message.style.maxWidth = '70%';
    message.innerHTML = `<strong>M. DUPONT :</strong> ${escapeHtml(text)}`;
    container.appendChild(message);
    container.scrollTop = container.scrollHeight;
}

function appendFileMessage(container, fileName) {
    const safeName = fileName ? `Fichier joint : ${fileName}` : 'Fichier joint';
    appendTeacherMessage(container, safeName);
}

function selectChat(name, type, theme) {
    const targetNameEl = document.getElementById('chat-target-name');
    const targetStatusEl = document.getElementById('chat-target-status');
    
    if (targetNameEl) targetNameEl.innerText = (type === 'classe' ? '📢 ' : '👤 ') + name;
    if (targetStatusEl) {
        targetStatusEl.innerHTML = `● ${type === 'classe' ? 'Discussion de groupe' : 'En ligne'} <span style="margin-left:10px; color:#3498db; font-weight:bold;">[Thème : ${theme}]</span>`;
    }
    
    const chatMessages = document.getElementById('main-chat-messages');
    if (chatMessages) {
        chatMessages.innerHTML = `
            <div style="text-align:center; color:#95a5a6; font-size:0.8rem; margin:10px 0;">--- Début de la discussion sur ${theme} ---</div>
            <div class="message bot" style="align-self: flex-end; background: #3498db; color: white; padding: 10px 15px; border-radius: 15px 15px 0 15px; max-width: 70%;">
                <strong>M. DUPONT :</strong> Bonjour ${type === 'classe' ? 'à tous' : name}, concernant "${theme}"...
            </div>
        `;
    }
}

function sendMainChatMessage() {
    const input = document.getElementById('main-chat-input-text');
    const messages = document.getElementById('main-chat-messages');
    if (!input || !messages) return;

    const text = input.value.trim();
    if (!text) return;

    appendTeacherMessage(messages, text);
    input.value = '';
}

function handleMainFileUpload(input) {
    if (!input || !input.files || input.files.length === 0) return;
    const messages = document.getElementById('main-chat-messages');
    if (messages) {
        appendFileMessage(messages, input.files[0].name);
    }
    input.value = '';
}

function sendClassChatMessage() {
    const input = document.getElementById('class-chat-input-text');
    const messages = document.getElementById('class-chat-messages');
    if (!input || !messages) return;

    const text = input.value.trim();
    if (!text) return;

    appendTeacherMessage(messages, text);
    input.value = '';
}

function handleClassFileUpload(input) {
    if (!input || !input.files || input.files.length === 0) return;
    const messages = document.getElementById('class-chat-messages');
    if (messages) {
        appendFileMessage(messages, input.files[0].name);
    }
    input.value = '';
}

function handleFileUpload(input) {
    if (!input || !input.files || input.files.length === 0) return;
    const messages = document.querySelector('#eleve-tab-chat .chat-messages');
    if (messages) {
        appendFileMessage(messages, input.files[0].name);
    }
    input.value = '';
}

function createMessagingTheme(theme, type, target) {
    const conversationList = document.getElementById('conversation-list');
    if (!conversationList) return;

    const groupId = `conv-group-${target.replace(/\s+/g, '')}`;
    let groupDiv = document.getElementById(groupId);
    
    if (!groupDiv) {
        groupDiv = document.createElement('div');
        groupDiv.id = groupId;
        groupDiv.style.borderBottom = '1px solid #eee';
        groupDiv.innerHTML = `
            <div onclick="selectChat('${target}', 'classe', 'Général')" style="padding: 12px 15px; background: #f8f9fa; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-weight: bold; border-left: 4px solid #95a5a6;">
                <span>📢 ${target} - Général</span>
            </div>
        `;
        conversationList.prepend(groupDiv);
    }

    const themeBlock = document.createElement('div');
    themeBlock.className = 'theme-messaging-block';
    themeBlock.innerHTML = `
        <div style="padding: 5px 15px; background: #e3f2fd; font-size: 0.8rem; font-weight: bold; color: #1976d2; display: flex; align-items: center; gap: 5px; border-top: 1px solid #bbdefb;">
            📘 Thème : ${theme}
        </div>
        <div style="background: #fff; padding-left: 15px;">
            ${type === 'classe' ? `
                <div class="msg-item" onclick="selectChat('${target}', 'classe', '${theme}')" style="padding: 8px 15px; border-bottom: 1px solid #f0f0f0; cursor: pointer; font-size: 0.85rem; color: #34495e;">📢 Chat de groupe</div>
                <div class="msg-item" onclick="selectChat('Alice MARTIN', 'eleve', '${theme}')" style="padding: 8px 15px; border-bottom: 1px solid #f0f0f0; cursor: pointer; font-size: 0.85rem;">👤 Alice MARTIN</div>
            ` : `
                <div class="msg-item" onclick="selectChat('${target}', 'eleve', '${theme}')" style="padding: 8px 15px; border-bottom: 1px solid #f0f0f0; cursor: pointer; font-size: 0.85rem;">👤 ${target} (Privé)</div>
            `}
        </div>
    `;
    groupDiv.appendChild(themeBlock);
}

// ==========================================
// 6. COURSE CREATION & AI LOGIC
// ==========================================

function openCreateCourseModal() {
    ModalManager.open('modal-create-course', {
        onConfirm: saveCreatedCourse
    });
    document.getElementById('create-course-title').value = '';
    document.getElementById('create-course-content').value = '';
    document.querySelectorAll('#modal-create-course input[type="checkbox"]').forEach((cb, i) => cb.checked = i < 3);
}

function closeCreateCourseModal() {
    ModalManager.close('modal-create-course');
}

function saveCreatedCourse() {
    const title = document.getElementById('create-course-title').value;
    const content = document.getElementById('create-course-content').value;
    
    if (!title || !content) return alert("Veuillez remplir le titre et le contenu.");

    const aiOptions = Array.from(document.querySelectorAll('#modal-create-course input[type="checkbox"]:checked'))
        .map(cb => cb.parentElement.textContent.trim());

    if (teacherData.subjects['Maths']) teacherData.subjects['Maths'].push(title);
    alert(`Cours "${title}" créé avec succès !\nOptions IA activées : ${aiOptions.join(', ')}`);
    closeCreateCourseModal();
}

function openAiImproveModal() {
    const currentContent = document.getElementById('create-course-content').value;
    if (!currentContent.trim()) return alert("Veuillez d'abord rédiger un brouillon.");

    ModalManager.open('modal-ai-improve');
    document.getElementById('ai-improve-original').innerText = currentContent;
    document.getElementById('ai-improve-result').value = '';
    document.getElementById('ai-improve-prompt').value = '';
}

function closeAiImproveModal() {
    ModalManager.close('modal-ai-improve');
}

function runAiImprovement() {
    const prompt = document.getElementById('ai-improve-prompt').value;
    const original = document.getElementById('ai-improve-original').innerText;
    const loading = document.getElementById('ai-loading');
    const resultArea = document.getElementById('ai-improve-result');

    if (!prompt.trim()) return alert("Veuillez entrer une instruction pour l'IA.");

    loading.style.display = 'flex';
    setTimeout(() => {
        loading.style.display = 'none';
        const title = document.getElementById('create-course-title').value || 'Titre';
        resultArea.value = `# ${title}\n\n## Introduction\n${original}\n\n## Points Clés\n- Concept 1\n- Concept 2\n\n## Résumé\nContenu structuré par IA.`;
    }, 1500);
}

function applyAiChanges() {
    const improvedContent = document.getElementById('ai-improve-result').value;
    if (!improvedContent.trim()) return alert("Aucun contenu généré.");
    document.getElementById('create-course-content').value = improvedContent;
    closeAiImproveModal();
    alert("Contenu amélioré inséré.");
}

// ==========================================
// 7. CALENDAR MODAL LOGIC
// ==========================================

function renderEventStudents(classId, selectedIds = []) {
    const container = document.getElementById('event-target-students-container');
    if (!container) return;

    container.innerHTML = '';
    const students = teacherData.classes[classId];

    if (!students) {
        container.innerHTML = '<div style="color: #95a5a6; font-size: 0.8rem; font-style: italic;">Selectionnez une classe d'abord</div>';
        return;
    }

    const normalized = new Set(selectedIds);
    const selectAll = normalized.has('all');

    container.innerHTML = `<label style="font-weight:bold;"><input type="checkbox" value="all" onchange="toggleAllStudents(this)" ${selectAll ? 'checked' : ''}> Toute la classe</label>`;
    students.forEach(s => {
        const checked = selectAll || normalized.has(s.id);
        container.innerHTML += `<div style="margin-left:10px;"><label><input type="checkbox" value="${s.id}" class="student-checkbox" ${checked ? 'checked' : ''}> ${s.name}</label></div>`;
    });
}

function populateEventContentOptions(subjectVal, selectedTitle = '') {
    const contentSelect = document.getElementById('event-content-select');
    if (!contentSelect) return;

    contentSelect.innerHTML = '<option value="">-- Selectionner un contenu --</option>';

    const contents = teacherData.subjects[subjectVal] || [];
    contents.forEach(c => {
        contentSelect.innerHTML += `<option value="${c}">${c}</option>`;
    });

    if (selectedTitle && !contents.includes(selectedTitle)) {
        contentSelect.innerHTML += `<option value="${selectedTitle}">${selectedTitle}</option>`;
    }

    if (selectedTitle) {
        contentSelect.value = selectedTitle;
    }
}

function resetTeacherEventForm(start, end) {
    const classSelect = document.getElementById('event-target-class');
    const subjectSelect = document.getElementById('event-subject');
    const contentSelect = document.getElementById('event-content-select');
    const startDateInput = document.getElementById('event-start-date');
    const endDateInput = document.getElementById('event-end-date');
    const startTimeInput = document.getElementById('event-start-time');
    const endTimeInput = document.getElementById('event-end-time');
    const descInput = document.getElementById('event-desc');

    if (classSelect) classSelect.value = '';
    if (subjectSelect) subjectSelect.value = '';
    if (contentSelect) contentSelect.innerHTML = '<option value="">-- Selectionner un contenu --</option>';
    if (startDateInput) startDateInput.value = start || '';
    if (endDateInput) endDateInput.value = end || start || '';
    if (startTimeInput) startTimeInput.value = '';
    if (endTimeInput) endTimeInput.value = '';
    if (descInput) descInput.value = '';

    renderEventStudents('', []);
}

function openTeacherCalendarModal(start, end) {
    currentTeacherEventIndex = null;
    ModalManager.open('teacher-calendar-modal');
    resetTeacherEventForm(start, end);
}

function openTeacherEventDetails(index, eventData = null) {
    const event = eventData || CalendarModule.getEvent(index);
    if (!event) return;

    currentTeacherEventIndex = index;
    ModalManager.open('teacher-calendar-modal');

    const classSelect = document.getElementById('event-target-class');
    const subjectSelect = document.getElementById('event-subject');
    const startDateInput = document.getElementById('event-start-date');
    const endDateInput = document.getElementById('event-end-date');
    const startTimeInput = document.getElementById('event-start-time');
    const endTimeInput = document.getElementById('event-end-time');
    const descInput = document.getElementById('event-desc');

    if (classSelect) classSelect.value = event.classId || '';
    renderEventStudents(event.classId, event.studentIds || []);

    if (subjectSelect) subjectSelect.value = event.subject || '';
    populateEventContentOptions(event.subject, event.title);

    if (startDateInput) startDateInput.value = event.startDate || '';
    if (endDateInput) endDateInput.value = event.endDate || event.startDate || '';
    if (startTimeInput) startTimeInput.value = event.startTime || '';
    if (endTimeInput) endTimeInput.value = event.endTime || '';
    if (descInput) descInput.value = event.desc || '';
}

function closeTeacherCalendarModal() {
    ModalManager.close('teacher-calendar-modal');
    CalendarModule.clearSelection();
    currentTeacherEventIndex = null;
}

function saveTeacherEvent() {
    const startDate = document.getElementById('event-start-date')?.value || '';
    const endDateRaw = document.getElementById('event-end-date')?.value || '';
    const startTime = document.getElementById('event-start-time')?.value || '';
    const endTime = document.getElementById('event-end-time')?.value || '';
    const classId = document.getElementById('event-target-class')?.value || '';
    const subject = document.getElementById('event-subject')?.value || '';
    const title = document.getElementById('event-content-select')?.value || '';
    const desc = document.getElementById('event-desc')?.value.trim() || '';

    const studentIds = Array.from(document.querySelectorAll('#event-target-students-container input[type="checkbox"]:checked'))
        .map(cb => cb.value);

    if (!classId || !title || !startDate) return alert('Champs manquants.');
    if (studentIds.length === 0) return alert('Selectionnez au moins un eleve.');

    const normalizedStudentIds = studentIds.includes('all') ? ['all'] : studentIds;
    const endDate = endDateRaw || startDate;

    const eventData = {
        startDate,
        endDate,
        startTime,
        endTime,
        title,
        classId,
        subject,
        studentIds: normalizedStudentIds,
        desc,
        type: 'teacher'
    };

    if (currentTeacherEventIndex !== null) {
        CalendarModule.updateEvent(currentTeacherEventIndex, eventData);
    } else {
        CalendarModule.addEvent(eventData);
    }

    closeTeacherCalendarModal();
}

function toggleAllStudents(source) {
    document.querySelectorAll('.student-checkbox').forEach(cb => cb.checked = source.checked);
}

// ==========================================
// 8. OTHER MODALS (SIMPLE)
// ==========================================

function openNewFolderModal() { ModalManager.open('modal-new-folder'); }
function openUploadModal() { ModalManager.open('modal-upload'); }
function openNewAttributionModal() { ModalManager.open('modal-attribution'); }
function confirmNewFolder() { ModalManager.close('modal-new-folder'); alert("Dossier cree"); }
function confirmUpload() { ModalManager.close('modal-upload'); alert("Fichier uploade"); }
function confirmAttribution() { ModalManager.close('modal-attribution'); alert("Attribution reussie"); }
function openClasseModal(name) { ModalManager.open('modal-classe-details'); }
function openEleveDetails(name) { ModalManager.open('modal-eleve-details'); }

// ==========================================
// 9. INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialiser le module Calendrier
    CalendarModule.init({
        gridId: 'calendar-grid',
        monthYearId: 'calendar-month-year',
        mode: 'teacher',
        events: teacherEvents,
        onDateClick: onCalendarDateSelect,
        onEventClick: onCalendarEventClick,
        filterFn: filterTeacherEvents
    });

    // Initialiser la navigation
    NavigationModule.init({
        onSectionChange: (section) => {
            if (section === 'planning') CalendarModule.render();
        }
    });

    // Listener: Filtre par classe
    document.getElementById('planning-filter-class')?.addEventListener('change', function() {
        const classVal = this.value;
        const studentSelect = document.getElementById('planning-filter-student');
        studentSelect.innerHTML = '<option value="all">Tous les eleves</option>';
        if (teacherData.classes[classVal]) {
            teacherData.classes[classVal].forEach(s => {
                studentSelect.innerHTML += `<option value="${s.id}">${s.name}</option>`;
            });
        }
        CalendarModule.render();
    });

    // Listener: Filtre par eleve
    document.getElementById('planning-filter-student')?.addEventListener('change', () => CalendarModule.render());

    // Listener: Classe dans modal evenement
    document.getElementById('event-target-class')?.addEventListener('change', function() {
        renderEventStudents(this.value);
    });

    // Listener: Matiere dans modal evenement
    document.getElementById('event-subject')?.addEventListener('change', function() {
        populateEventContentOptions(this.value);
    });

    // Boutons d'action
    document.getElementById('btn-new-folder')?.addEventListener('click', openNewFolderModal);
    document.getElementById('btn-create-course')?.addEventListener('click', openCreateCourseModal);
    document.getElementById('btn-upload-doc')?.addEventListener('click', openUploadModal);

    // Tree toggle
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('tree-toggle')) {
            const children = e.target.parentElement.querySelector('.tree-children');
            if (children) {
                const isOpen = children.style.display !== 'none';
                children.style.display = isOpen ? 'none' : 'block';
                e.target.innerText = isOpen ? '>' : 'v';

            }
        }
    });
});

// ==========================================
// 10. GLOBAL EXPORTS (pour onclick inline)
// ==========================================

// Exposer les fonctions necessaires globalement pour les onclick restants
window.changeMonth = changeMonth;
window.updatePlanningView = updatePlanningView;
window.updateDashboardView = updateDashboardView;
window.selectContent = selectContent;
window.selectAttrContent = selectAttrContent;
window.selectChat = selectChat;
window.createMessagingTheme = createMessagingTheme;
window.openCreateCourseModal = openCreateCourseModal;
window.closeCreateCourseModal = closeCreateCourseModal;
window.saveCreatedCourse = saveCreatedCourse;
window.openAiImproveModal = openAiImproveModal;
window.closeAiImproveModal = closeAiImproveModal;
window.runAiImprovement = runAiImprovement;
window.applyAiChanges = applyAiChanges;
window.openTeacherCalendarModal = openTeacherCalendarModal;
window.closeTeacherCalendarModal = closeTeacherCalendarModal;
window.saveTeacherEvent = saveTeacherEvent;
window.toggleAllStudents = toggleAllStudents;
window.openNewFolderModal = openNewFolderModal;
window.openUploadModal = openUploadModal;
window.openNewAttributionModal = openNewAttributionModal;
window.confirmNewFolder = confirmNewFolder;
window.confirmUpload = confirmUpload;
window.confirmAttribution = confirmAttribution;
window.openClasseModal = openClasseModal;
window.openEleveDetails = openEleveDetails;
window.refreshTree = refreshTree;
window.handleFileSelection = handleFileSelection;
window.toggleAttrTarget = toggleAttrTarget;
window.updateAIConfig = updateAIConfig;
window.updateElevesList = updateElevesList;
window.switchClasseTab = switchClasseTab;
window.switchEleveTab = switchEleveTab;
window.showRemediation = showRemediation;
window.sendMainChatMessage = sendMainChatMessage;
window.handleMainFileUpload = handleMainFileUpload;
window.sendClassChatMessage = sendClassChatMessage;
window.handleClassFileUpload = handleClassFileUpload;
window.handleFileUpload = handleFileUpload;
