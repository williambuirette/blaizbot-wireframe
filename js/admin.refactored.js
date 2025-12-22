/**
 * Admin Dashboard - Version Refactorisée
 * Utilise les modules ES6 pour une architecture propre
 * 
 * @file admin.refactored.js
 * @version 2.0.0
 * @description Point d'entrée du dashboard administrateur avec imports modulaires
 */

// ============================================================================
// IMPORTS
// ============================================================================

import { NavigationModule } from './modules/navigation.js';

// ============================================================================
// STATE
// ============================================================================

/**
 * État global du dashboard admin
 */
const AdminState = {
    initialized: false,
    currentSection: 'dashboard'
};

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialise l'application admin
 */
function initializeApp() {
    if (AdminState.initialized) return;
    
    
    // Navigation
    NavigationModule.init({
        navLinksSelector: '.nav-link',
        sectionPrefix: 'section-',
        onSectionChange: handleSectionChange
    });
    
    // Setup des event listeners
    setupModalListeners();
    setupTableFilters();
    
    AdminState.initialized = true;
}

/**
 * Callback appelé lors du changement de section
 * @param {string} sectionId - ID de la section
 */
function handleSectionChange(sectionId) {
    AdminState.currentSection = sectionId;
    
    if (sectionId === 'statistiques') {
        updateStatsFilters();
    }
}

// ============================================================================
// AI SETTINGS
// ============================================================================

/**
 * Toggle les champs API selon le provider sélectionné
 */
function toggleApiFields() {
    const provider = document.getElementById('ai-provider')?.value;
    const keyContainer = document.getElementById('api-key-container');
    const urlContainer = document.getElementById('api-url-container');
    
    if (!keyContainer || !urlContainer) return;
    
    if (provider === 'custom') {
        urlContainer.style.display = 'block';
        const label = keyContainer.querySelector('label');
        if (label) label.innerText = "Clé API (Optionnelle pour local)";
    } else {
        urlContainer.style.display = 'none';
        const label = keyContainer.querySelector('label');
        if (label) label.innerText = "Clé API (Secret Key)";
    }
}

/**
 * Sauvegarde les paramètres IA
 */
function saveAiSettings(evt) {
    const provider = document.getElementById('ai-provider')?.value;
    const key = document.getElementById('ai-api-key')?.value;
    const model = document.getElementById('ai-model')?.value;

    if (!key && provider !== 'custom') {
        alert("Veuillez saisir une cle API pour continuer.");
        return;
    }

    const btn = (evt && evt.target && evt.target.tagName === 'BUTTON')
        ? evt.target
        : (document.activeElement && document.activeElement.tagName === 'BUTTON' ? document.activeElement : null);

    const originalText = btn ? btn.innerText : '';
    if (btn) {
        btn.innerText = "Enregistrement...";
        btn.disabled = true;
    }

    setTimeout(() => {
        if (btn) {
            btn.innerText = "Configuration enregistree !";
            btn.style.background = "#2ecc71";
        }

        setTimeout(() => {
            if (btn) {
                btn.innerText = originalText;
                btn.style.background = "";
                btn.disabled = false;
            }
            alert(`La plateforme Blaiz'bot est maintenant connectee a ${provider} (${model}). L'IA va commencer a indexer les contenus.`);
        }, 1500);
    }, 1000);
}

/**
 * Teste la connexion IA
 */
function testAiConnection() {
    const provider = document.getElementById('ai-provider')?.value || 'OpenAI';
    
    alert(`Test de connexion en cours vers ${provider}...`);
    
    setTimeout(() => {
        alert("Connexion réussie ! Le modèle répond correctement.");
    }, 1500);
}

// ============================================================================
// MODALS
// ============================================================================

/**
 * Ouvre une modal par son ID
 * @param {string} modalId - ID de la modal
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // Mise à jour des listes selon le type de modal
    switch (modalId) {
        case 'modal-professeur':
            updateTeacherModalLists();
            break;
        case 'modal-eleve':
            updateStudentModalLists();
            break;
        case 'modal-programme':
            updateProgrammeModalLists();
            break;
    }
    
    modal.style.display = 'flex';
}

/**
 * Ferme une modal par son ID
 * @param {string} modalId - ID de la modal
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

/**
 * Ferme toutes les modals ouvertes
 */
function closeAllModals() {
    document.querySelectorAll('.wireframe-modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

/**
 * Configure les listeners pour les modals
 */
function setupModalListeners() {
    // Boutons de fermeture
    document.querySelectorAll('.close-modal, .btn-secondary').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    // Fermeture au clic sur l'overlay
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('wireframe-modal')) {
            closeAllModals();
        }
    });
}

// ============================================================================
// DYNAMIC LISTS SYNCHRONIZATION
// ============================================================================

/**
 * Met à jour les listes de la modal professeur
 */
function updateTeacherModalLists() {
    const matieresTable = document.getElementById('table-matieres-body');
    const classesTable = document.getElementById('table-classes-body');
    const matieresContainer = document.getElementById('list-matieres-checkboxes');
    const classesContainer = document.getElementById('list-classes-checkboxes');

    if (matieresTable && matieresContainer) {
        const matieres = Array.from(matieresTable.querySelectorAll('tr')).map(tr => tr.cells[0]?.innerText).filter(Boolean);
        matieresContainer.innerHTML = matieres.map(m => `
            <label class="checkbox-item"><input type="checkbox" value="${m}"> ${m}</label>
        `).join('');
    }

    if (classesTable && classesContainer) {
        const classes = Array.from(classesTable.querySelectorAll('tr')).map(tr => tr.cells[0]?.innerText).filter(Boolean);
        classesContainer.innerHTML = classes.map(c => `
            <label class="checkbox-item"><input type="checkbox" value="${c}"> ${c}</label>
        `).join('');
    }
}

/**
 * Met à jour les listes de la modal élève
 */
function updateStudentModalLists() {
    const classesTable = document.getElementById('table-classes-body');
    const matieresTable = document.getElementById('table-matieres-body');
    const selectEleveClasse = document.getElementById('select-eleve-classe');
    const matieresContainer = document.getElementById('list-matieres-eleve-checkboxes');

    if (classesTable && selectEleveClasse) {
        const classes = Array.from(classesTable.querySelectorAll('tr')).map(tr => tr.cells[0]?.innerText).filter(Boolean);
        const currentVal = selectEleveClasse.value;
        selectEleveClasse.innerHTML = '<option value="">Sélectionnez une classe...</option>' + 
            classes.map(c => `<option value="${c}" ${c === currentVal ? 'selected' : ''}>${c}</option>`).join('');
    }

    if (matieresTable && matieresContainer) {
        const matieres = Array.from(matieresTable.querySelectorAll('tr')).map(tr => tr.cells[0]?.innerText).filter(Boolean);
        matieresContainer.innerHTML = matieres.map(m => `
            <label class="checkbox-item"><input type="checkbox" value="${m}"> ${m}</label>
        `).join('');
    }
}

/**
 * Met à jour les listes de la modal programme
 */
function updateProgrammeModalLists() {
    const classesTable = document.getElementById('table-classes-body');
    const matieresTable = document.getElementById('table-matieres-body');
    const selectNiveau = document.getElementById('select-programme-niveau');
    const selectMatiere = document.getElementById('select-programme-matiere');

    if (classesTable && selectNiveau) {
        const niveaux = Array.from(new Set(
            Array.from(classesTable.querySelectorAll('tr'))
                .map(tr => tr.cells[1]?.innerText)
                .filter(Boolean)
        ));
        selectNiveau.innerHTML = '<option value="">Sélectionnez un niveau...</option>' + 
            niveaux.map(n => `<option value="${n}">${n}</option>`).join('');
    }

    if (matieresTable && selectMatiere) {
        const matieres = Array.from(matieresTable.querySelectorAll('tr')).map(tr => tr.cells[0]?.innerText).filter(Boolean);
        selectMatiere.innerHTML = '<option value="">Sélectionnez une matière...</option>' + 
            matieres.map(m => `<option value="${m}">${m}</option>`).join('');
    }
}

/**
 * Met à jour les filtres de statistiques
 */
function updateStatsFilters() {
    const matieresTable = document.getElementById('table-matieres-body');
    const classesTable = document.getElementById('table-classes-body');
    const professeursTable = document.getElementById('table-professeurs-body');
    const elevesTable = document.getElementById('table-eleves-body');

    const selectMatiere = document.getElementById('stats-select-matiere');
    const selectClasse = document.getElementById('stats-select-classe');
    const selectProf = document.getElementById('stats-select-professeur');
    const selectEleve = document.getElementById('stats-select-eleve');

    if (matieresTable && selectMatiere) {
        const matieres = Array.from(matieresTable.querySelectorAll('tr')).map(tr => tr.cells[0]?.innerText).filter(Boolean);
        selectMatiere.innerHTML = '<option value="">Toutes les matières</option>' + 
            matieres.map(m => `<option value="${m}">${m}</option>`).join('');
    }

    if (classesTable && selectClasse) {
        const classes = Array.from(classesTable.querySelectorAll('tr')).map(tr => tr.cells[0]?.innerText).filter(Boolean);
        selectClasse.innerHTML = '<option value="">Toutes les classes</option>' + 
            classes.map(c => `<option value="${c}">${c}</option>`).join('');
    }

    if (professeursTable && selectProf) {
        const profs = Array.from(professeursTable.querySelectorAll('tr')).map(tr => {
            const nom = tr.cells[0]?.innerText;
            const prenom = tr.cells[1]?.innerText;
            return nom && prenom ? `${nom} ${prenom}` : null;
        }).filter(Boolean);
        selectProf.innerHTML = '<option value="">Tous les professeurs</option>' + 
            profs.map(p => `<option value="${p}">${p}</option>`).join('');
    }

    if (elevesTable && selectEleve) {
        const eleves = Array.from(elevesTable.querySelectorAll('tr')).map(tr => {
            const nom = tr.cells[0]?.innerText;
            const prenom = tr.cells[1]?.innerText;
            return nom && prenom ? `${nom} ${prenom}` : null;
        }).filter(Boolean);
        selectEleve.innerHTML = '<option value="">Tous les élèves</option>' + 
            eleves.map(e => `<option value="${e}">${e}</option>`).join('');
    }
}

// ============================================================================
// TABLE FILTERING
// ============================================================================

/**
 * Filtre une table par recherche
 * @param {string} tableBodyId - ID du tbody
 * @param {string} query - Terme de recherche
 */
function filterTable(tableBodyId, query) {
    const tbody = document.getElementById(tableBodyId);
    if (!tbody) return;
    
    const rows = tbody.querySelectorAll('tr');
    const lowerQuery = query.toLowerCase();

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(lowerQuery) ? '' : 'none';
    });
}

/**
 * Configure les filtres de recherche pour les tables
 */
function setupTableFilters() {
    // Les filtres sont gérés via les attributs oninput dans le HTML
    // Cette fonction peut être étendue pour ajouter des listeners dynamiques
}

// ============================================================================
// GLOBAL EXPORTS (pour compatibilité onclick dans HTML)
// ============================================================================

// AI Settings
window.toggleApiFields = toggleApiFields;
window.saveAiSettings = saveAiSettings;
window.testAiConnection = testAiConnection;

// Modals
window.openModal = openModal;
window.closeModal = closeModal;
window.closeAllModals = closeAllModals;

// Lists Update
window.updateTeacherModalLists = updateTeacherModalLists;
window.updateStudentModalLists = updateStudentModalLists;
window.updateProgrammeModalLists = updateProgrammeModalLists;
window.updateStatsFilters = updateStatsFilters;

// Table Filtering
window.filterTable = filterTable;

// ============================================================================
// DOM READY
// ============================================================================

document.addEventListener('DOMContentLoaded', initializeApp);

// ============================================================================
// MODULE EXPORTS
// ============================================================================

export {
    initializeApp,
    toggleApiFields,
    saveAiSettings,
    testAiConnection,
    openModal,
    closeModal,
    filterTable,
    AdminState
};
