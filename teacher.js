/**
 * TEACHER.JS - Logic for the Teacher Dashboard Wireframe
 * 
 * @fileoverview Gère toute la logique frontend du tableau de bord professeur.
 * Contient les modèles de données, la gestion du calendrier, et les interactions UI.
 */

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
 * @type {{
 *   classes: Object.<string, Student[]>,
 *   subjects: Object.<string, string[]>
 * }}
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

let currentCalendarDate = new Date();
let selectedRangeStart = null;
let selectedRangeEnd = null;


// ==========================================
// 2. CALENDAR / PLANNING LOGIC
// ==========================================

function renderCalendar(date) {
    const grid = document.getElementById('calendar-grid');
    const monthYear = document.getElementById('calendar-month-year');
    
    if (!grid || !monthYear) return;

    const filterClass = document.getElementById('planning-filter-class').value;
    const filterStudent = document.getElementById('planning-filter-student').value;

    // Clear grid but keep headers
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
    
    let startDay = firstDay.getDay() - 1;
    if (startDay === -1) startDay = 6;

    // Empty slots
    for (let i = 0; i < startDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'calendar-day empty';
        empty.style.background = '#f9f9f9';
        grid.appendChild(empty);
    }

    // Days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayEl.classList.add('today');
        }

        // Range Selection Visuals
        if (selectedRangeStart && !selectedRangeEnd) {
            if (dateStr === selectedRangeStart) dayEl.style.background = '#bbdefb';
        } else if (selectedRangeStart && selectedRangeEnd) {
            if (dateStr >= selectedRangeStart && dateStr <= selectedRangeEnd) {
                dayEl.classList.add('selected-range');
            }
        }

        // Event Filtering
        const activeEvents = teacherEvents.filter(e => {
            const inDate = dateStr >= e.startDate && dateStr <= e.endDate;
            if (!inDate) return false;
            if (filterClass !== 'all' && e.classId !== filterClass) return false;
            if (filterStudent !== 'all') {
                if (e.studentIds.includes('all')) return true;
                return e.studentIds.includes(filterStudent);
            }
            return true;
        });

        activeEvents.sort((a, b) => (a.startTime || '00:00').localeCompare(b.startTime || '00:00'));

        let eventsHtml = activeEvents.map(e => {
            let classes = `day-event teacher`;
            let timeLabel = "";
            if (dateStr === e.startDate && e.startTime) {
                timeLabel = `<span style="font-size:0.7em; opacity:0.8; margin-right:3px;">${e.startTime}</span>`;
            }
            if (e.startDate !== e.endDate) {
                if (dateStr === e.startDate) classes += ' range-start';
                else if (dateStr === e.endDate) classes += ' range-end';
                else classes += ' range-middle';
            }
            let titlePrefix = e.studentIds.includes('all') ? '👥 ' : '👤 ';
            return `<div class='${classes}' title='${e.title}'>${timeLabel}${titlePrefix}${e.title}</div>`;
        }).join('');

        dayEl.innerHTML = `<div class="day-number">${i}</div>${eventsHtml}`;
        dayEl.onclick = () => handleDateClick(dateStr);
        grid.appendChild(dayEl);
    }
}

function handleDateClick(dateStr) {
    if (!selectedRangeStart || (selectedRangeStart && selectedRangeEnd)) {
        selectedRangeStart = dateStr;
        selectedRangeEnd = null;
        renderCalendar(currentCalendarDate);
    } else {
        if (dateStr < selectedRangeStart) {
            selectedRangeEnd = selectedRangeStart;
            selectedRangeStart = dateStr;
        } else {
            selectedRangeEnd = dateStr;
        }
        openTeacherCalendarModal(selectedRangeStart, selectedRangeEnd);
    }
}

function changeMonth(delta) {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + delta);
    renderCalendar(currentCalendarDate);
}

function updatePlanningView() {
    renderCalendar(currentCalendarDate);
}

// ==========================================
// 3. DASHBOARD & KPI LOGIC
// ==========================================

function updateDashboardView() {
    const classe = document.getElementById('dash-filter-classe').value;
    const kpiComp = document.getElementById('dash-kpi-comprehension');
    const kpiEng = document.getElementById('dash-kpi-engagement');
    const kpiAlerts = document.getElementById('dash-kpi-alerts');
    const alertsBody = document.getElementById('dash-alerts-body');

    if (!kpiComp) return;

    if (classe === '6A') {
        kpiComp.innerText = "72%";
        kpiEng.innerText = "90%";
        kpiAlerts.innerText = "3";
        alertsBody.innerHTML = `
            <tr>
                <td>Thomas DUBOIS</td>
                <td>6ème A</td>
                <td>Fractions</td>
                <td>Inactivité prolongée sur le quiz (3 jours)</td>
                <td><span class="status-pill" style="background: #ffebee; color: #c62828;">Haute</span></td>
                <td><button class="btn-small" onclick="selectChat('Thomas DUBOIS', 'eleve', 'Les Fractions')">Relancer</button></td>
            </tr>
        `;
    } else if (classe === '3B') {
        kpiComp.innerText = "84%";
        kpiEng.innerText = "78%";
        kpiAlerts.innerText = "1";
        alertsBody.innerHTML = `
            <tr>
                <td>Alice MARTIN</td>
                <td>3ème B</td>
                <td>Algèbre</td>
                <td>Erreurs répétées sur les nombres négatifs</td>
                <td><span class="status-pill" style="background: #fff3e0; color: #ef6c00;">Moyenne</span></td>
                <td><button class="btn-small" onclick="openEleveDetails('Alice MARTIN')">Voir détails</button></td>
            </tr>
        `;
    } else {
        kpiComp.innerText = "78%";
        kpiEng.innerText = "85%";
        kpiAlerts.innerText = "4";
        alertsBody.innerHTML = `
            <tr>
                <td>Thomas DUBOIS</td>
                <td>6ème A</td>
                <td>Fractions</td>
                <td>Inactivité prolongée sur le quiz (3 jours)</td>
                <td><span class="status-pill" style="background: #ffebee; color: #c62828;">Haute</span></td>
                <td><button class="btn-small" onclick="selectChat('Thomas DUBOIS', 'eleve', 'Les Fractions')">Relancer</button></td>
            </tr>
            <tr>
                <td>Alice MARTIN</td>
                <td>3ème B</td>
                <td>Algèbre</td>
                <td>Erreurs répétées sur les nombres négatifs</td>
                <td><span class="status-pill" style="background: #fff3e0; color: #ef6c00;">Moyenne</span></td>
                <td><button class="btn-small" onclick="openEleveDetails('Alice MARTIN')">Voir détails</button></td>
            </tr>
        `;
    }
}

// ==========================================
// 4. CONTENT MANAGEMENT
// ==========================================

function selectContent(title, type) {
    document.getElementById('selected-content-title').innerText = title;
    const typeTag = document.getElementById('selected-content-type');
    
    if (type === 'pdf') {
        typeTag.innerText = "Type : PDF / Cours";
        typeTag.style.background = "#e8f5e9";
        typeTag.style.color = "#2e7d32";
    } else {
        typeTag.innerText = "Type : Quiz IA";
        typeTag.style.background = "#e3f2fd";
        typeTag.style.color = "#1565c0";
    }

    const overlay = document.getElementById('content-loading-overlay');
    overlay.style.display = 'flex';
    setTimeout(() => { overlay.style.display = 'none'; }, 800);

    document.querySelectorAll('.tree-item.file').forEach(item => {
        item.classList.remove('active');
        if (item.innerText.includes(title)) item.classList.add('active');
    });
}

function selectAttrContent(element, title) {
    document.querySelectorAll('#attr-tree-view .tree-item.file').forEach(item => item.classList.remove('active'));
    element.classList.add('active');
    document.getElementById('attr-content-selected-value').value = title;
}

// ==========================================
// 5. MESSAGING & ATTRIBUTION LOGIC
// ==========================================

function selectChat(name, type, theme) {
    const targetNameEl = document.getElementById('chat-target-name');
    const targetStatusEl = document.getElementById('chat-target-status');
    
    if(targetNameEl) targetNameEl.innerText = (type === 'classe' ? '📢 ' : '👤 ') + name;
    if(targetStatusEl) targetStatusEl.innerHTML = `● ${type === 'classe' ? 'Discussion de groupe' : 'En ligne'} <span style="margin-left:10px; color:#3498db; font-weight:bold;">[Thème : ${theme}]</span>`;
    
    const chatMessages = document.getElementById('main-chat-messages');
    if(chatMessages) {
        chatMessages.innerHTML = `<div style="text-align:center; color:#95a5a6; font-size:0.8rem; margin:10px 0;">--- Début de la discussion sur ${theme} ---</div>`;
        chatMessages.innerHTML += `
            <div class="message bot" style="align-self: flex-end; background: #3498db; color: white; padding: 10px 15px; border-radius: 15px 15px 0 15px; max-width: 70%;">
                <strong>M. DUPONT :</strong> Bonjour ${type === 'classe' ? 'à tous' : name}, concernant "${theme}"...
            </div>
        `;
    }
}

function createMessagingTheme(theme, type, target) {
    const conversationList = document.getElementById('conversation-list');
    if (!conversationList) return;

    let groupDiv = document.getElementById(`conv-group-${target.replace(/\s+/g, '')}`);
    if (!groupDiv) {
        groupDiv = document.createElement('div');
        groupDiv.id = `conv-group-${target.replace(/\s+/g, '')}`;
        groupDiv.style.borderBottom = '1px solid #eee';
        groupDiv.innerHTML = `
            <div onclick="selectChat('${target}', 'classe', 'Général')" style="padding: 12px 15px; background: #f8f9fa; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-weight: bold; border-left: 4px solid #95a5a6;">
                <span>📢 ${target} - Général</span>
            </div>
        `;
        conversationList.prepend(groupDiv);
    }

    const themeBlock = document.createElement('div');
    themeBlock.className = "theme-messaging-block";
    let innerHTML = `
        <div style="padding: 5px 15px; background: #e3f2fd; font-size: 0.8rem; font-weight: bold; color: #1976d2; display: flex; align-items: center; gap: 5px; border-top: 1px solid #bbdefb;">
            📘 Thème : ${theme}
        </div>
        <div style="background: #fff; padding-left: 15px;">
    `;

    if (type === 'classe') {
        innerHTML += `
            <div class="msg-item" onclick="selectChat('${target}', 'classe', '${theme}')" style="padding: 8px 15px; border-bottom: 1px solid #f0f0f0; cursor: pointer; font-size: 0.85rem; color: #34495e;">📢 Chat de groupe</div>
            <div class="msg-item" onclick="selectChat('Alice MARTIN', 'eleve', '${theme}')" style="padding: 8px 15px; border-bottom: 1px solid #f0f0f0; cursor: pointer; font-size: 0.85rem;">👤 Alice MARTIN</div>
        `;
    } else {
        innerHTML += `<div class="msg-item" onclick="selectChat('${target}', 'eleve', '${theme}')" style="padding: 8px 15px; border-bottom: 1px solid #f0f0f0; cursor: pointer; font-size: 0.85rem;">👤 ${target} (Privé)</div>`;
    }

    innerHTML += `</div>`;
    themeBlock.innerHTML = innerHTML;
    groupDiv.appendChild(themeBlock);
}

// ==========================================
// 6. COURSE CREATION & AI LOGIC
// ==========================================

function openCreateCourseModal() {
    const modal = document.getElementById('modal-create-course');
    if (modal) {
        modal.style.display = 'flex';
        document.getElementById('create-course-title').value = '';
        document.getElementById('create-course-content').value = '';
        document.querySelectorAll('#modal-create-course input[type="checkbox"]').forEach((cb, index) => {
            cb.checked = index < 3; 
        });
    }
}

function closeCreateCourseModal() {
    const modal = document.getElementById('modal-create-course');
    if (modal) modal.style.display = 'none';
}

function saveCreatedCourse() {
    const title = document.getElementById('create-course-title').value;
    const content = document.getElementById('create-course-content').value;
    
    if (!title || !content) return alert("Veuillez remplir le titre et le contenu.");

    const aiOptions = [];
    document.querySelectorAll('#modal-create-course input[type="checkbox"]:checked').forEach(cb => {
        aiOptions.push(cb.parentElement.textContent.trim());
    });

    if (teacherData.subjects['Maths']) teacherData.subjects['Maths'].push(title);
    alert(`Cours "${title}" créé avec succès !\nOptions IA activées : ${aiOptions.join(', ')}`);
    closeCreateCourseModal();
}

function openAiImproveModal() {
    const currentContent = document.getElementById('create-course-content').value;
    if (!currentContent.trim()) return alert("Veuillez d'abord rédiger un brouillon.");

    const modal = document.getElementById('modal-ai-improve');
    if (modal) {
        modal.style.display = 'flex';
        document.getElementById('ai-improve-original').innerText = currentContent;
        document.getElementById('ai-improve-result').value = '';
        document.getElementById('ai-improve-prompt').value = '';
    }
}

function closeAiImproveModal() {
    const modal = document.getElementById('modal-ai-improve');
    if (modal) modal.style.display = 'none';
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
        let improvedText = '# ' + (document.getElementById('create-course-title').value || 'Titre') + '\n\n' +
                       '## Introduction\n' + original + '\n\n' +
                       '## Points Clés\n- Concept 1\n- Concept 2\n\n' +
                       '## Résumé\nContenu structuré par IA.';
        resultArea.value = improvedText;
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
// 7. MODAL MANAGEMENT & EVENT LISTENERS
// ==========================================

// Calendar Modal
function openTeacherCalendarModal(start, end) {
    const modal = document.getElementById('teacher-calendar-modal');
    document.getElementById('event-start-date').value = start;
    document.getElementById('event-end-date').value = end;
    document.getElementById('event-target-students-container').innerHTML = '<div style="color: #95a5a6; font-size: 0.8rem; font-style: italic;">Sélectionnez une classe d\'abord</div>';
    modal.style.display = 'flex';
}

function closeTeacherCalendarModal() {
    document.getElementById('teacher-calendar-modal').style.display = 'none';
    selectedRangeStart = null;
    selectedRangeEnd = null;
    renderCalendar(currentCalendarDate);
}

function saveTeacherEvent() {
    const startDate = document.getElementById('event-start-date').value;
    const endDate = document.getElementById('event-end-date').value;
    const classId = document.getElementById('event-target-class').value;
    const title = document.getElementById('event-content-select').value;
    
    const checkboxes = document.querySelectorAll('#event-target-students-container input[type="checkbox"]:checked');
    let studentIds = Array.from(checkboxes).map(cb => cb.value);

    if (!classId || !title || !startDate) return alert("Champs manquants.");
    if (studentIds.length === 0) return alert("Sélectionnez au moins un élève.");

    teacherEvents.push({ startDate, endDate, title, classId, studentIds, type: 'teacher' });
    closeTeacherCalendarModal();
}

// Dynamic Form Listeners
document.getElementById('planning-filter-class').addEventListener('change', function() {
    const classVal = this.value;
    const studentSelect = document.getElementById('planning-filter-student');
    studentSelect.innerHTML = '<option value="all">Tous les élèves</option>';
    if (teacherData.classes[classVal]) {
        teacherData.classes[classVal].forEach(s => studentSelect.innerHTML += `<option value="${s.id}">${s.name}</option>`);
    }
    updatePlanningView();
});

document.getElementById('event-target-class').addEventListener('change', function() {
    const classVal = this.value;
    const container = document.getElementById('event-target-students-container');
    container.innerHTML = '';
    if (teacherData.classes[classVal]) {
        container.innerHTML = `<label style="font-weight:bold;"><input type="checkbox" value="all" onchange="toggleAllStudents(this)"> Toute la classe</label>`;
        teacherData.classes[classVal].forEach(s => {
            container.innerHTML += `<div style="margin-left:10px;"><label><input type="checkbox" value="${s.id}" class="student-checkbox"> ${s.name}</label></div>`;
        });
    }
});

function toggleAllStudents(source) {
    document.querySelectorAll('.student-checkbox').forEach(cb => cb.checked = source.checked);
}

document.getElementById('event-subject').addEventListener('change', function() {
    const subjectVal = this.value;
    const contentSelect = document.getElementById('event-content-select');
    contentSelect.innerHTML = '<option value="">-- Sélectionner un contenu --</option>';
    if (teacherData.subjects[subjectVal]) {
        teacherData.subjects[subjectVal].forEach(c => contentSelect.innerHTML += `<option value="${c}">${c}</option>`);
    }
});

// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.admin-section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = link.getAttribute('data-section');
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        sections.forEach(section => section.classList.toggle('active', section.id === `section-${targetSection}`));
        if (targetSection === 'planning') renderCalendar(currentCalendarDate);
    });
});

// Global Click Handler (Modals & Tree)
window.onclick = function(event) {
    const modals = [
        document.getElementById('modal-create-course'),
        document.getElementById('teacher-calendar-modal'),
        document.getElementById('modal-ai-improve'),
        document.getElementById('modal-classe-details'),
        document.getElementById('modal-eleve-details'),
        document.getElementById('modal-attribution'),
        document.getElementById('modal-new-folder'),
        document.getElementById('modal-upload')
    ];

    modals.forEach(modal => {
        if (event.target == modal) modal.style.display = 'none';
    });
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('tree-toggle')) {
        const children = e.target.parentElement.querySelector('.tree-children');
        if (children) {
            const isOpen = children.style.display !== 'none';
            children.style.display = isOpen ? 'none' : 'block';
            e.target.innerText = isOpen ? '▶' : '▼';
        }
    }
});

// Other Modal Openers (Simplified for brevity)
function openNewFolderModal() { document.getElementById('modal-new-folder').style.display = 'flex'; }
function openUploadModal() { document.getElementById('modal-upload').style.display = 'flex'; }
function openNewAttributionModal() { document.getElementById('modal-attribution').style.display = 'flex'; }
function confirmNewFolder() { document.getElementById('modal-new-folder').style.display = 'none'; alert("Dossier créé"); }
function confirmUpload() { document.getElementById('modal-upload').style.display = 'none'; alert("Fichier uploadé"); }
function confirmAttribution() { document.getElementById('modal-attribution').style.display = 'none'; alert("Attribution réussie"); }
function openClasseModal(name) { document.getElementById('modal-classe-details').style.display = 'flex'; }
function openEleveDetails(name) { document.getElementById('modal-eleve-details').style.display = 'flex'; }

// ==========================================
// ONGLETS MODALE CLASSE (Suivi / Chat)
// ==========================================
function switchClasseTab(tab) {
    // Masquer tous les contenus d'onglets
    document.querySelectorAll('.classe-tab-content').forEach(content => {
        content.style.display = 'none';
    });
    
    // Désactiver tous les boutons d'onglets
    document.querySelectorAll('.tab-btn-classe').forEach(btn => {
        btn.classList.remove('active');
        btn.style.borderBottom = 'none';
    });
    
    // Afficher le contenu sélectionné
    if (tab === 'suivi') {
        document.getElementById('classe-tab-suivi').style.display = 'block';
        document.querySelectorAll('.tab-btn-classe')[0].classList.add('active');
        document.querySelectorAll('.tab-btn-classe')[0].style.borderBottom = '2px solid #3498db';
    } else if (tab === 'chat') {
        document.getElementById('classe-tab-chat').style.display = 'block';
        document.querySelectorAll('.tab-btn-classe')[1].classList.add('active');
        document.querySelectorAll('.tab-btn-classe')[1].style.borderBottom = '2px solid #3498db';
    }
}

// ==========================================
// 8. INITIALIZATION & LISTENERS (VIBECODING)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // ===== GESTIONNAIRE GLOBAL DES BOUTONS CLOSE-MODAL =====
    // Ferme la modale parente quand on clique sur .close-modal ou ×
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.wireframe-modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Action Buttons (Clean Code: No inline onclick)
    const btnNewFolder = document.getElementById('btn-new-folder');
    if (btnNewFolder) btnNewFolder.addEventListener('click', openNewFolderModal);

    const btnCreateCourse = document.getElementById('btn-create-course');
    if (btnCreateCourse) btnCreateCourse.addEventListener('click', openCreateCourseModal);

    const btnUploadDoc = document.getElementById('btn-upload-doc');
    if (btnUploadDoc) btnUploadDoc.addEventListener('click', openUploadModal);

    console.log(" Blaiz'bot Teacher Dashboard Loaded - Vibe Checked ");
});
