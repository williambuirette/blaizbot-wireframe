// --- Settings & AI Configuration ---
function toggleApiFields() {
    const provider = document.getElementById('ai-provider').value;
    const keyContainer = document.getElementById('api-key-container');
    const urlContainer = document.getElementById('api-url-container');
    
    if (provider === 'custom') {
        urlContainer.style.display = 'block';
        keyContainer.querySelector('label').innerText = "Clé API (Optionnelle pour local)";
    } else {
        urlContainer.style.display = 'none';
        keyContainer.querySelector('label').innerText = "Clé API (Secret Key)";
    }
}

function saveAiSettings() {
    const provider = document.getElementById('ai-provider').value;
    const key = document.getElementById('ai-api-key').value;
    const model = document.getElementById('ai-model').value;

    if (!key && provider !== 'custom') {
        alert("Veuillez saisir une clé API pour continuer.");
        return;
    }

    // Simulation de sauvegarde
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = "Enregistrement...";
    btn.disabled = true;

    setTimeout(() => {
        btn.innerText = "Configuration enregistrée !";
        btn.style.background = "#2ecc71";
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = "";
            btn.disabled = false;
            alert(`La plateforme Blaiz'bot est maintenant connectée à ${provider} (${model}). L'IA va commencer à indexer les contenus.`);
        }, 1500);
    }, 1000);
}

function testAiConnection() {
    const provider = document.getElementById('ai-provider').value;
    
    alert(`Test de connexion en cours vers ${provider}...`);
    
    setTimeout(() => {
        alert("Connexion réussie ! Le modèle répond correctement.");
    }, 1500);
}

// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.admin-section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = link.getAttribute('data-section');
        
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        sections.forEach(section => {
            section.classList.toggle('active', section.id === `section-${targetSection}`);
        });

        if (targetSection === 'statistiques') {
            updateStatsFilters();
        }
    });
});

// Modals Logic
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        if (modalId === 'modal-professeur') {
            updateTeacherModalLists();
        } else if (modalId === 'modal-eleve') {
            updateStudentModalLists();
        } else if (modalId === 'modal-programme') {
            updateProgrammeModalLists();
        }
        modal.style.display = 'flex';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

function closeAllModals() {
    document.querySelectorAll('.wireframe-modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Dynamic Lists Synchronization
function updateTeacherModalLists() {
    const matieresTable = document.getElementById('table-matieres-body');
    const classesTable = document.getElementById('table-classes-body');
    
    const matieresContainer = document.getElementById('list-matieres-checkboxes');
    const classesContainer = document.getElementById('list-classes-checkboxes');

    if (matieresTable && matieresContainer) {
        const matieres = Array.from(matieresTable.querySelectorAll('tr')).map(tr => tr.cells[0].innerText);
        matieresContainer.innerHTML = matieres.map(m => `
            <label class="checkbox-item"><input type="checkbox" value="${m}"> ${m}</label>
        `).join('');
    }

    if (classesTable && classesContainer) {
        const classes = Array.from(classesTable.querySelectorAll('tr')).map(tr => tr.cells[0].innerText);
        classesContainer.innerHTML = classes.map(c => `
            <label class="checkbox-item"><input type="checkbox" value="${c}"> ${c}</label>
        `).join('');
    }
}

function updateStudentModalLists() {
    const classesTable = document.getElementById('table-classes-body');
    const matieresTable = document.getElementById('table-matieres-body');
    const selectEleveClasse = document.getElementById('select-eleve-classe');
    const matieresContainer = document.getElementById('list-matieres-eleve-checkboxes');

    if (classesTable && selectEleveClasse) {
        const classes = Array.from(classesTable.querySelectorAll('tr')).map(tr => tr.cells[0].innerText);
        const currentVal = selectEleveClasse.value;
        selectEleveClasse.innerHTML = '<option value="">Sélectionnez une classe...</option>' + 
            classes.map(c => `<option value="${c}" ${c === currentVal ? 'selected' : ''}>${c}</option>`).join('');
    }

    if (matieresTable && matieresContainer) {
        const matieres = Array.from(matieresTable.querySelectorAll('tr')).map(tr => tr.cells[0].innerText);
        matieresContainer.innerHTML = matieres.map(m => `
            <label class="checkbox-item"><input type="checkbox" value="${m}"> ${m}</label>
        `).join('');
    }
}

function updateProgrammeModalLists() {
    const classesTable = document.getElementById('table-classes-body');
    const matieresTable = document.getElementById('table-matieres-body');
    
    const selectNiveau = document.getElementById('select-programme-niveau');
    const selectMatiere = document.getElementById('select-programme-matiere');

    if (classesTable && selectNiveau) {
        // On récupère les niveaux uniques depuis la table des classes (colonne 2)
        const niveaux = Array.from(new Set(Array.from(classesTable.querySelectorAll('tr')).map(tr => tr.cells[1].innerText)));
        selectNiveau.innerHTML = '<option value="">Sélectionnez un niveau...</option>' + 
            niveaux.map(n => `<option value="${n}">${n}</option>`).join('');
    }

    if (matieresTable && selectMatiere) {
        const matieres = Array.from(matieresTable.querySelectorAll('tr')).map(tr => tr.cells[0].innerText);
        selectMatiere.innerHTML = '<option value="">Sélectionnez une matière...</option>' + 
            matieres.map(m => `<option value="${m}">${m}</option>`).join('');
    }
}

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
        const matieres = Array.from(matieresTable.querySelectorAll('tr')).map(tr => tr.cells[0].innerText);
        selectMatiere.innerHTML = '<option value="">Toutes les matières</option>' + 
            matieres.map(m => `<option value="${m}">${m}</option>`).join('');
    }

    if (classesTable && selectClasse) {
        const classes = Array.from(classesTable.querySelectorAll('tr')).map(tr => tr.cells[0].innerText);
        selectClasse.innerHTML = '<option value="">Toutes les classes</option>' + 
            classes.map(c => `<option value="${c}">${c}</option>`).join('');
    }

    if (professeursTable && selectProf) {
        const profs = Array.from(professeursTable.querySelectorAll('tr')).map(tr => {
            const nom = tr.cells[0].innerText;
            const prenom = tr.cells[1].innerText;
            return `${nom} ${prenom}`;
        });
        selectProf.innerHTML = '<option value="">Tous les professeurs</option>' + 
            profs.map(p => `<option value="${p}">${p}</option>`).join('');
    }

    if (elevesTable && selectEleve) {
        const eleves = Array.from(elevesTable.querySelectorAll('tr')).map(tr => {
            const nom = tr.cells[0].innerText;
            const prenom = tr.cells[1].innerText;
            return `${nom} ${prenom}`;
        });
        selectEleve.innerHTML = '<option value="">Tous les élèves</option>' + 
            eleves.map(e => `<option value="${e}">${e}</option>`).join('');
    }
}

// Table Filtering Logic
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

// Event Listeners for closing modals
document.querySelectorAll('.close-modal, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
});

window.onclick = function(event) {
    if (event.target.classList.contains('wireframe-modal')) {
        closeAllModals();
    }
}
