/**
 * @fileoverview Module Navigation Partagé - Blaiz'bot Educational Platform
 * Gère la navigation par onglets/sections pour Teacher, Student et Admin
 * 
 * @module NavigationModule
 * @version 1.0.0
 */

// ==========================================
// ÉTAT DU MODULE
// ==========================================

/**
 * État interne de la navigation
 * @type {Object}
 */
const NavigationState = {
    currentSection: null,
    config: {
        navLinksSelector: '.nav-link',
        sectionsSelector: '.admin-section',
        sectionPrefix: 'section-',
        activeClass: 'active',
        onSectionChange: null
    }
};

// ==========================================
// FONCTIONS DE NAVIGATION
// ==========================================

/**
 * Active une section spécifique
 * @param {string} sectionName - Nom de la section (sans préfixe)
 * @param {Object} [options] - Options
 * @param {boolean} [options.updateNav=true] - Mettre à jour les liens nav
 * @param {boolean} [options.triggerCallback=true] - Déclencher le callback
 */
function activateSection(sectionName, options = {}) {
    const { updateNav = true, triggerCallback = true } = options;
    const { sectionPrefix, activeClass, sectionsSelector, navLinksSelector } = NavigationState.config;

    const targetId = `${sectionPrefix}${sectionName}`;
    const sections = document.querySelectorAll(sectionsSelector);
    const navLinks = document.querySelectorAll(navLinksSelector);

    // Masquer toutes les sections
    sections.forEach(section => {
        section.classList.remove(activeClass);
        if (section.id === targetId) {
            section.classList.add(activeClass);
        }
    });

    // Mettre à jour les liens de navigation
    if (updateNav) {
        navLinks.forEach(link => {
            link.classList.remove(activeClass);
            if (link.getAttribute('data-section') === sectionName) {
                link.classList.add(activeClass);
            }
        });
    }

    // Stocker la section courante
    NavigationState.currentSection = sectionName;

    // Callback personnalisé
    if (triggerCallback && NavigationState.config.onSectionChange) {
        NavigationState.config.onSectionChange(sectionName);
    }
}

/**
 * Configure les écouteurs de clic sur les liens de navigation
 */
function setupNavListeners() {
    const { navLinksSelector } = NavigationState.config;
    const navLinks = document.querySelectorAll(navLinksSelector);

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            if (targetSection) {
                activateSection(targetSection);
            }
        });
    });

}

/**
 * Récupère la section actuellement active
 * @returns {string|null}
 */
function getCurrentSection() {
    return NavigationState.currentSection;
}

/**
 * Récupère toutes les sections disponibles
 * @returns {string[]}
 */
function getAvailableSections() {
    const { sectionsSelector, sectionPrefix } = NavigationState.config;
    const sections = document.querySelectorAll(sectionsSelector);
    
    return Array.from(sections).map(section => {
        return section.id.replace(sectionPrefix, '');
    });
}

// ==========================================
// API PUBLIQUE DU MODULE
// ==========================================

/**
 * Module Navigation - API Publique
 * @namespace NavigationModule
 */
const NavigationModule = {
    /**
     * Initialise le module de navigation
     * @param {Object} [config] - Configuration
     * @param {string} [config.navLinksSelector='.nav-link'] - Sélecteur des liens
     * @param {string} [config.sectionsSelector='.admin-section'] - Sélecteur des sections
     * @param {string} [config.sectionPrefix='section-'] - Préfixe des IDs de section
     * @param {string} [config.activeClass='active'] - Classe CSS active
     * @param {Function} [config.onSectionChange] - Callback lors du changement de section
     */
    init(config = {}) {
        NavigationState.config = { ...NavigationState.config, ...config };
        setupNavListeners();
        
        // Détecter la section initiale
        const activeSection = document.querySelector(`${NavigationState.config.sectionsSelector}.${NavigationState.config.activeClass}`);
        if (activeSection) {
            NavigationState.currentSection = activeSection.id.replace(NavigationState.config.sectionPrefix, '');
        }

    },

    /**
     * Active une section
     * @param {string} sectionName - Nom de la section
     * @param {Object} [options] - Options
     */
    goTo(sectionName, options = {}) {
        activateSection(sectionName, options);
    },

    /**
     * Récupère la section courante
     * @returns {string|null}
     */
    getCurrentSection() {
        return getCurrentSection();
    },

    /**
     * Récupère toutes les sections
     * @returns {string[]}
     */
    getSections() {
        return getAvailableSections();
    },

    /**
     * Définit le callback de changement de section
     * @param {Function} callback - (sectionName) => void
     */
    onSectionChange(callback) {
        NavigationState.config.onSectionChange = callback;
    },

    /**
     * Ajoute un listener personnalisé pour une section spécifique
     * @param {string} sectionName - Nom de la section
     * @param {Function} callback - Callback à exécuter
     */
    onSection(sectionName, callback) {
        const originalCallback = NavigationState.config.onSectionChange;
        NavigationState.config.onSectionChange = (activatedSection) => {
            if (activatedSection === sectionName) {
                callback(activatedSection);
            }
            if (originalCallback) originalCallback(activatedSection);
        };
    },

    /**
     * Recharge les listeners (utile après modification du DOM)
     */
    refresh() {
        setupNavListeners();
    },

    /**
     * Récupère l'état courant
     * @returns {Object}
     */
    getState() {
        return { ...NavigationState };
    }
};

// Export ES6
export { NavigationModule };

// Export global
if (typeof window !== 'undefined') {
    window.NavigationModule = NavigationModule;
}
