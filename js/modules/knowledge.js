/**
 * Module Knowledge Base - Base de Connaissances
 * Gère les matières et documents du professeur et de l'étudiant
 * @module KnowledgeModule
 */

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

/**
 * État interne du module Knowledge
 * @type {Object}
 */
const KnowledgeState = {
    /** @type {Array<{id: string, name: string, icon: string, themes: Array}>} */
    teacherKnowledge: [],
    /** @type {Array<{id: string, name: string, icon: string, themes: Array}>} */
    studentKnowledge: [],
    /** @type {string} */
    currentTab: 'teacher',
    /** @type {Function|null} */
    pendingAction: null
};

// ============================================================================
// DEFAULT DATA
// ============================================================================

/**
 * Données par défaut pour les connaissances professeur
 */
const DEFAULT_TEACHER_KNOWLEDGE = [
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

/**
 * Données par défaut pour les connaissances étudiant
 */
const DEFAULT_STUDENT_KNOWLEDGE = [
    { 
        id: 'perso-maths', 
        name: 'Mes Maths', 
        icon: '📓',
        themes: [
            { name: 'Mes Fiches Révision', docs: ['Fiche_Fractions_Simplifiee.pdf'] }
        ]
    }
];

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialise le module Knowledge Base
 * @param {Object} options - Options d'initialisation
 * @param {Array} [options.teacherData] - Données professeur par défaut
 * @param {Array} [options.studentData] - Données étudiant par défaut
 */
function init(options = {}) {
    // Charger les données professeur
    KnowledgeState.teacherKnowledge = options.teacherData || DEFAULT_TEACHER_KNOWLEDGE;
    
    // Charger les données étudiant depuis localStorage
    try {
        const stored = localStorage.getItem('studentKnowledge');
        KnowledgeState.studentKnowledge = stored 
            ? JSON.parse(stored) 
            : (options.studentData || DEFAULT_STUDENT_KNOWLEDGE);
    } catch (e) {
        console.error('Erreur chargement studentKnowledge:', e);
        KnowledgeState.studentKnowledge = options.studentData || DEFAULT_STUDENT_KNOWLEDGE;
    }
    
    // Setup modal générique si elle existe
    setupGenericModal();
}

/**
 * Configure la modal générique
 */
function setupGenericModal() {
    const confirmBtn = document.getElementById('generic-modal-confirm');
    const modal = document.getElementById('generic-input-modal');
    
    if (confirmBtn) {
        confirmBtn.onclick = () => {
            const val = document.getElementById('generic-modal-input')?.value.trim();
            if (val && KnowledgeState.pendingAction) {
                KnowledgeState.pendingAction(val);
                closeGenericModal();
            }
        };
    }
    
    if (modal) {
        modal.onclick = (e) => {
            if (e.target === modal) closeGenericModal();
        };
    }
}

// ============================================================================
// TAB MANAGEMENT
// ============================================================================

/**
 * Bascule entre l'onglet professeur et étudiant
 * @param {string} type - 'teacher' ou 'student'
 */
function switchTab(type) {
    KnowledgeState.currentTab = type;
    
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
        renderSubjects('teacher');
        if (KnowledgeState.teacherKnowledge.length > 0) {
            selectSubject('teacher', KnowledgeState.teacherKnowledge[0].id);
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
        renderSubjects('student');
        if (KnowledgeState.studentKnowledge.length > 0) {
            selectSubject('student', KnowledgeState.studentKnowledge[0].id);
        }
    }
}

// ============================================================================
// SUBJECT RENDERING
// ============================================================================

/**
 * Affiche la liste des matières
 * @param {string} type - 'teacher' ou 'student'
 */
function renderSubjects(type) {
    const containerId = type === 'teacher' ? 'knowledge-teacher-subjects' : 'knowledge-student-subjects';
    const container = document.getElementById(containerId);
    const data = type === 'teacher' ? KnowledgeState.teacherKnowledge : KnowledgeState.studentKnowledge;

    if (!container) return;

    container.innerHTML = data.map(subject => `
        <div class="subject-item" onclick="KnowledgeModule.selectSubject('${type}', '${subject.id}', this)" style="padding: 12px; margin-bottom: 5px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: background 0.2s; position: relative;">
            <span style="font-size: 1.2rem;">${subject.icon}</span>
            <span style="font-weight: 500; flex-grow: 1;">${subject.name}</span>
            ${type === 'student' ? `
                <div style="display: flex; gap: 5px;">
                    <button class="btn-icon" style="font-size: 0.8rem; padding: 2px 5px; color: #3498db;" onclick="event.stopPropagation(); KnowledgeModule.renameSubject('${subject.id}')" title="Renommer">✏️</button>
                    <button class="btn-icon" style="font-size: 0.8rem; padding: 2px 5px; color: #e74c3c;" onclick="event.stopPropagation(); KnowledgeModule.deleteSubject('${subject.id}')" title="Supprimer">🗑️</button>
                </div>
            ` : ''}
        </div>
    `).join('');
}

/**
 * Sélectionne une matière et affiche ses détails
 * @param {string} type - 'teacher' ou 'student'
 * @param {string} subjectId - ID de la matière
 * @param {HTMLElement} [element] - Élément cliqué
 */
function selectSubject(type, subjectId, element = null) {
    const containerId = type === 'teacher' ? 'knowledge-teacher-subjects' : 'knowledge-student-subjects';
    const items = document.querySelectorAll(`#${containerId} .subject-item`);
    
    // Reset styles
    items.forEach(item => {
        item.style.background = 'transparent';
    });
    
    // Highlight selected
    if (element) {
        element.style.background = '#f0f7ff';
    } else {
        items.forEach(item => {
            if (item.getAttribute('onclick')?.includes(subjectId)) {
                item.style.background = '#f0f7ff';
            }
        });
    }

    const data = type === 'teacher' ? KnowledgeState.teacherKnowledge : KnowledgeState.studentKnowledge;
    const subject = data.find(s => s.id === subjectId);
    const detailsContainerId = type === 'teacher' ? 'knowledge-teacher-details' : 'knowledge-student-details';
    const detailsContainer = document.getElementById(detailsContainerId);

    if (!subject || !detailsContainer) return;

    let html = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h2 style="margin: 0; display: flex; align-items: center; gap: 10px;">${subject.icon} ${subject.name}</h2>
            ${type === 'student' ? `<button class="btn-primary" style="font-size: 0.8rem; padding: 6px 12px;" onclick="KnowledgeModule.addTheme('${subject.id}')">+ Nouvelle Sous-catégorie</button>` : ''}
        </div>
    `;

    if (!subject.themes || subject.themes.length === 0) {
        html += `
            <div style="text-align: center; color: #95a5a6; margin-top: 50px; border: 2px dashed #eee; padding: 40px; border-radius: 10px;">
                <p>Aucune sous-catégorie dans cette section.</p>
                ${type === 'student' ? `<button class="btn-secondary" onclick="KnowledgeModule.addTheme('${subject.id}')">Créer ma première sous-catégorie</button>` : ''}
            </div>
        `;
    } else {
        html += subject.themes.map(theme => `
            <div style="margin-bottom: 30px; background: #fcfcfc; padding: 15px; border-radius: 10px; border: 1px solid #f0f0f0;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                    <h3 style="font-size: 1rem; color: #34495e; margin: 0; display: flex; align-items: center; gap: 10px;">
                        📂 ${theme.name}
                        ${type === 'student' ? `
                            <button class="btn-icon" style="font-size: 0.7rem; color: #3498db; background: none; border: none; cursor: pointer;" onclick="KnowledgeModule.renameTheme('${subject.id}', '${theme.name.replace(/'/g, "\\'")}')" title="Renommer">✏️</button>
                            <button class="btn-icon" style="font-size: 0.7rem; color: #e74c3c; background: none; border: none; cursor: pointer;" onclick="KnowledgeModule.deleteTheme('${subject.id}', '${theme.name.replace(/'/g, "\\'")}')" title="Supprimer">🗑️</button>
                        ` : ''}
                    </h3>
                    ${type === 'student' ? `<button class="btn-icon" style="font-size: 0.7rem; background: #eee; padding: 4px 8px;" onclick="KnowledgeModule.addDoc('${subject.id}', '${theme.name.replace(/'/g, "\\'")}')" title="Ajouter un document">➕ Ajouter un doc</button>` : ''}
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
                    ${theme.docs.length === 0 ? '<p style="font-size: 0.8rem; color: #95a5a6; grid-column: 1/-1;">Aucun document ici.</p>' : ''}
                    ${theme.docs.map(doc => `
                        <div class="doc-card" style="padding: 15px; border: 1px solid #eee; border-radius: 8px; background: #fff; display: flex; align-items: center; gap: 10px; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; position: relative;">
                            <div style="font-size: 1.5rem;">${getDocIcon(doc)}</div>
                            <div style="overflow: hidden; flex-grow: 1;">
                                <div style="font-size: 0.85rem; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${doc}</div>
                                <div style="font-size: 0.7rem; color: #95a5a6;">${doc.split('.').pop().toUpperCase()}</div>
                            </div>
                            ${type === 'student' ? `
                                <div style="display: flex; flex-direction: column; gap: 2px;">
                                    <button style="border: none; background: none; cursor: pointer; color: #3498db; font-size: 0.8rem;" onclick="event.stopPropagation(); KnowledgeModule.renameDoc('${subject.id}', '${theme.name.replace(/'/g, "\\'")}', '${doc.replace(/'/g, "\\'")}')" title="Renommer">✏️</button>
                                    <button style="border: none; background: none; cursor: pointer; color: #e74c3c; font-size: 0.8rem;" onclick="event.stopPropagation(); KnowledgeModule.deleteDoc('${subject.id}', '${theme.name.replace(/'/g, "\\'")}', '${doc.replace(/'/g, "\\'")}')" title="Supprimer">🗑️</button>
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

/**
 * Retourne l'icône appropriée pour un document
 * @param {string} doc - Nom du document
 * @returns {string} Emoji icône
 */
function getDocIcon(doc) {
    if (doc.endsWith('.pdf')) return '📄';
    if (doc.endsWith('.mp4')) return '🎥';
    if (doc.endsWith('.epub') || doc.endsWith('.mobi')) return '📚';
    return '📝';
}

// ============================================================================
// GENERIC MODAL
// ============================================================================

/**
 * Ouvre la modal générique
 * @param {string} title - Titre de la modal
 * @param {string} placeholder - Placeholder de l'input
 * @param {Function} callback - Callback appelé avec la valeur saisie
 * @param {string} [defaultValue] - Valeur par défaut
 */
function openGenericModal(title, placeholder, callback, defaultValue = '') {
    const titleEl = document.getElementById('generic-modal-title');
    const input = document.getElementById('generic-modal-input');
    const modal = document.getElementById('generic-input-modal');
    
    if (titleEl) titleEl.innerText = title;
    if (input) {
        input.value = defaultValue;
        input.placeholder = placeholder;
        setTimeout(() => {
            input.focus();
            if (defaultValue) input.select();
        }, 50);
    }
    if (modal) modal.style.display = 'flex';
    
    KnowledgeState.pendingAction = callback;
}

/**
 * Ferme la modal générique
 */
function closeGenericModal() {
    const modal = document.getElementById('generic-input-modal');
    if (modal) modal.style.display = 'none';
    KnowledgeState.pendingAction = null;
}

// ============================================================================
// CRUD OPERATIONS - SUBJECTS
// ============================================================================

/**
 * Ajoute une nouvelle matière étudiant
 */
function addSubject() {
    openGenericModal("Nouvelle Matière", "Nom de la matière", (name) => {
        const newSubject = {
            id: 'perso-' + Date.now(),
            name: name,
            icon: '📓',
            themes: []
        };
        KnowledgeState.studentKnowledge.push(newSubject);
        saveStudentKnowledge();
        renderSubjects('student');
        selectSubject('student', newSubject.id);
    });
}

/**
 * Renomme une matière étudiant
 * @param {string} subjectId - ID de la matière
 */
function renameSubject(subjectId) {
    const subject = KnowledgeState.studentKnowledge.find(s => s.id === subjectId);
    if (subject) {
        openGenericModal("Renommer la matière", "Nouveau nom", (newName) => {
            subject.name = newName;
            saveStudentKnowledge();
            renderSubjects('student');
            selectSubject('student', subjectId);
        }, subject.name);
    }
}

/**
 * Supprime une matière étudiant
 * @param {string} subjectId - ID de la matière
 */
function deleteSubject(subjectId) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette matière et tout son contenu ?")) {
        KnowledgeState.studentKnowledge = KnowledgeState.studentKnowledge.filter(s => s.id !== subjectId);
        saveStudentKnowledge();
        renderSubjects('student');
        const detailsEl = document.getElementById('knowledge-student-details');
        if (detailsEl) detailsEl.innerHTML = '';
    }
}

// ============================================================================
// CRUD OPERATIONS - THEMES
// ============================================================================

/**
 * Ajoute une sous-catégorie à une matière
 * @param {string} subjectId - ID de la matière
 */
function addTheme(subjectId) {
    openGenericModal("Nouvelle Sous-catégorie", "Nom (ex: Mes Livres, Cours du 1er Trimestre...)", (name) => {
        const subject = KnowledgeState.studentKnowledge.find(s => s.id === subjectId);
        if (subject) {
            if (!subject.themes) subject.themes = [];
            subject.themes.push({ name: name, docs: [] });
            saveStudentKnowledge();
            selectSubject('student', subjectId);
        }
    });
}

/**
 * Renomme une sous-catégorie
 * @param {string} subjectId - ID de la matière
 * @param {string} themeName - Nom actuel du thème
 */
function renameTheme(subjectId, themeName) {
    const subject = KnowledgeState.studentKnowledge.find(s => s.id === subjectId);
    if (subject) {
        const theme = subject.themes.find(t => t.name === themeName);
        if (theme) {
            openGenericModal("Renommer la sous-catégorie", "Nouveau nom", (newName) => {
                theme.name = newName;
                saveStudentKnowledge();
                selectSubject('student', subjectId);
            }, theme.name);
        }
    }
}

/**
 * Supprime une sous-catégorie
 * @param {string} subjectId - ID de la matière
 * @param {string} themeName - Nom du thème
 */
function deleteTheme(subjectId, themeName) {
    if (confirm("Supprimer cette sous-catégorie et ses documents ?")) {
        const subject = KnowledgeState.studentKnowledge.find(s => s.id === subjectId);
        if (subject) {
            subject.themes = subject.themes.filter(t => t.name !== themeName);
            saveStudentKnowledge();
            selectSubject('student', subjectId);
        }
    }
}

// ============================================================================
// CRUD OPERATIONS - DOCUMENTS
// ============================================================================

/**
 * Ajoute un document à une sous-catégorie
 * @param {string} subjectId - ID de la matière
 * @param {string} themeName - Nom du thème
 */
function addDoc(subjectId, themeName) {
    let input = document.getElementById('knowledge-file-input');
    if (!input) {
        input = document.createElement('input');
        input.type = 'file';
        input.id = 'knowledge-file-input';
        input.style.display = 'none';
        document.body.appendChild(input);
    }

    input.onchange = function(e) {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const name = file.name;
            
            const subject = KnowledgeState.studentKnowledge.find(s => s.id === subjectId);
            if (subject) {
                if (!subject.themes) subject.themes = [];
                const theme = subject.themes.find(t => t.name === themeName);
                if (theme) {
                    if (!theme.docs) theme.docs = [];
                    theme.docs.push(name);
                    saveStudentKnowledge();
                    selectSubject('student', subjectId);
                }
            }
        }
        input.value = '';
    };

    input.click();
}

/**
 * Renomme un document
 * @param {string} subjectId - ID de la matière
 * @param {string} themeName - Nom du thème
 * @param {string} docName - Nom actuel du document
 */
function renameDoc(subjectId, themeName, docName) {
    const subject = KnowledgeState.studentKnowledge.find(s => s.id === subjectId);
    if (subject) {
        const theme = subject.themes.find(t => t.name === themeName);
        if (theme) {
            openGenericModal("Renommer le document", "Nouveau nom", (newName) => {
                const index = theme.docs.indexOf(docName);
                if (index !== -1) {
                    theme.docs[index] = newName;
                    saveStudentKnowledge();
                    selectSubject('student', subjectId);
                }
            }, docName);
        }
    }
}

/**
 * Supprime un document
 * @param {string} subjectId - ID de la matière
 * @param {string} themeName - Nom du thème
 * @param {string} docName - Nom du document
 */
function deleteDoc(subjectId, themeName, docName) {
    if (confirm("Supprimer ce document ?")) {
        const subject = KnowledgeState.studentKnowledge.find(s => s.id === subjectId);
        if (subject) {
            const theme = subject.themes.find(t => t.name === themeName);
            if (theme) {
                theme.docs = theme.docs.filter(d => d !== docName);
                saveStudentKnowledge();
                selectSubject('student', subjectId);
            }
        }
    }
}

// ============================================================================
// PERSISTENCE
// ============================================================================

/**
 * Sauvegarde les connaissances étudiant dans localStorage
 */
function saveStudentKnowledge() {
    try {
        localStorage.setItem('studentKnowledge', JSON.stringify(KnowledgeState.studentKnowledge));
    } catch (e) {
        console.error('Erreur sauvegarde studentKnowledge:', e);
    }
}

/**
 * Retourne les données actuelles
 * @returns {Object} Données teacher et student
 */
function getData() {
    return {
        teacher: KnowledgeState.teacherKnowledge,
        student: KnowledgeState.studentKnowledge
    };
}

// ============================================================================
// MODULE EXPORTS
// ============================================================================

/**
 * Module Knowledge Base exporté
 */
export const KnowledgeModule = {
    // Initialization
    init,
    
    // Tab Management
    switchTab,
    
    // Rendering
    renderSubjects,
    selectSubject,
    
    // Modal
    openGenericModal,
    closeGenericModal,
    
    // CRUD Subjects
    addSubject,
    renameSubject,
    deleteSubject,
    
    // CRUD Themes
    addTheme,
    renameTheme,
    deleteTheme,
    
    // CRUD Documents
    addDoc,
    renameDoc,
    deleteDoc,
    
    // Persistence
    saveStudentKnowledge,
    getData,
    
    // State access
    getState: () => ({ ...KnowledgeState })
};

// Export global pour compatibilité onclick
if (typeof window !== 'undefined') {
    window.KnowledgeModule = KnowledgeModule;
}

export default KnowledgeModule;
