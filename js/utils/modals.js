/**
 * MODALS.JS - Centralized Modal Management System
 *
 * @fileoverview Gestionnaire universel des modales pour toute l'application.
 * Remplace les multiples fonctions open/close dispersées dans le code.
 *
 * @author Blaiz'bot Educational Platform
 * @version 1.0.0 - Vibecoding Optimized
 *
 * @example
 * // Ouvrir une modale simple
 * ModalManager.open('modal-create-course');
 *
 * // Ouvrir avec callback de confirmation
 * ModalManager.open('modal-delete', {
 *   onConfirm: () => console.log('Suppression confirmée'),
 *   onCancel: () => console.log('Annulé')
 * });
 *
 * // Pré-remplir des données
 * ModalManager.open('modal-edit-student', {
 *   data: { name: 'Alice', class: '6A' }
 * });
 */

// ==========================================
// MODAL MANAGER CLASS
// ==========================================

/**
 * Gestionnaire centralisé de toutes les modales de l'application.
 * Pattern Singleton pour une utilisation globale.
 */
export class ModalManager {
    /**
     * État interne des modales.
     * @private
     * @type {Map<string, ModalState>}
     */
    static _modals = new Map();

    /**
     * Callbacks globaux pour interception.
     * @private
     */
    static _globalHooks = {
        beforeOpen: null,
        afterOpen: null,
        beforeClose: null,
        afterClose: null
    };

    // ==========================================
    // CORE METHODS
    // ==========================================

    /**
     * Ouvre une modale.
     * @param {string} modalId - ID de la modale (avec ou sans #)
     * @param {Object} [options] - Options d'ouverture
     * @param {Function} [options.onConfirm] - Callback de confirmation
     * @param {Function} [options.onCancel] - Callback d'annulation
     * @param {Object} [options.data] - Données à passer à la modale
     * @param {boolean} [options.closeOnBackdrop=true] - Fermer au clic sur backdrop
     *
     * @example
     * ModalManager.open('modal-create-course', {
     *   onConfirm: (formData) => {
     *     console.log('Cours créé:', formData);
     *   },
     *   data: { subject: 'Maths' }
     * });
     */
    static open(modalId, options = {}) {
        const id = this._normalizeId(modalId);
        const modal = document.getElementById(id);

        if (!modal) {
            console.error(`[ModalManager] Modal not found: ${id}`);
            return;
        }

        // Hook beforeOpen
        if (this._globalHooks.beforeOpen) {
            this._globalHooks.beforeOpen(id, options);
        }

        // Enregistrer l'état de la modale
        this._modals.set(id, {
            id: id,
            isOpen: true,
            data: options.data || null,
            onConfirm: options.onConfirm || null,
            onCancel: options.onCancel || null,
            closeOnBackdrop: options.closeOnBackdrop !== false
        });

        // Pré-remplir les données si fournies
        if (options.data) {
            this._populateModalData(modal, options.data);
        }

        // Afficher la modale
        modal.style.display = 'flex';
        modal.classList.add('modal-active');

        // Ajouter listeners pour fermeture
        this._attachCloseListeners(id, modal);

        // Hook afterOpen
        if (this._globalHooks.afterOpen) {
            this._globalHooks.afterOpen(id, options);
        }

        // Accessibility: focus sur premier input
        const firstInput = modal.querySelector('input, textarea, select');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }

    /**
     * Ferme une modale.
     * @param {string} modalId - ID de la modale
     * @param {boolean} [triggeredByConfirm=false] - Fermeture via confirmation
     *
     * @example
     * ModalManager.close('modal-create-course');
     */
    static close(modalId, triggeredByConfirm = false) {
        const id = this._normalizeId(modalId);
        const modal = document.getElementById(id);
        const state = this._modals.get(id);

        if (!modal) {
            console.error(`[ModalManager] Modal not found: ${id}`);
            return;
        }

        // Hook beforeClose
        if (this._globalHooks.beforeClose) {
            this._globalHooks.beforeClose(id, triggeredByConfirm);
        }

        // Appeler callback approprié
        if (state) {
            if (triggeredByConfirm && state.onConfirm) {
                state.onConfirm();
            } else if (!triggeredByConfirm && state.onCancel) {
                state.onCancel();
            }
        }

        // Masquer la modale
        modal.style.display = 'none';
        modal.classList.remove('modal-active');

        // Nettoyer l'état
        this._modals.delete(id);

        // Réinitialiser le contenu (optionnel)
        this._resetModalContent(modal);

        // Hook afterClose
        if (this._globalHooks.afterClose) {
            this._globalHooks.afterClose(id, triggeredByConfirm);
        }
    }

    /**
     * Ferme toutes les modales ouvertes.
     *
     * @example
     * ModalManager.closeAll();
     */
    static closeAll() {
        const openModals = Array.from(this._modals.keys());
        openModals.forEach(id => this.close(id));
    }

    /**
     * Vérifie si une modale est ouverte.
     * @param {string} modalId - ID de la modale
     * @returns {boolean}
     *
     * @example
     * if (ModalManager.isOpen('modal-create-course')) {
     *   console.log('Modale ouverte');
     * }
     */
    static isOpen(modalId) {
        const id = this._normalizeId(modalId);
        const state = this._modals.get(id);
        return state ? state.isOpen : false;
    }

    /**
     * Récupère les données associées à une modale ouverte.
     * @param {string} modalId - ID de la modale
     * @returns {Object|null}
     */
    static getData(modalId) {
        const id = this._normalizeId(modalId);
        const state = this._modals.get(id);
        return state ? state.data : null;
    }

    // ==========================================
    // FORM HANDLING
    // ==========================================

    /**
     * Récupère les données d'un formulaire dans une modale.
     * @param {string} modalId - ID de la modale
     * @param {string} [formSelector='form'] - Sélecteur du formulaire
     * @returns {Object} Données du formulaire (key-value pairs)
     *
     * @example
     * const formData = ModalManager.getFormData('modal-create-course');
     * console.log(formData); // { title: '...', subject: '...', ... }
     */
    static getFormData(modalId, formSelector = 'form') {
        const id = this._normalizeId(modalId);
        const modal = document.getElementById(id);

        if (!modal) return {};

        const form = modal.querySelector(formSelector);
        if (!form) return {};

        const formData = new FormData(form);
        const data = {};

        formData.forEach((value, key) => {
            // Gérer les checkboxes multiples
            if (data[key]) {
                if (!Array.isArray(data[key])) {
                    data[key] = [data[key]];
                }
                data[key].push(value);
            } else {
                data[key] = value;
            }
        });

        return data;
    }

    /**
     * Réinitialise un formulaire dans une modale.
     * @param {string} modalId - ID de la modale
     * @param {string} [formSelector='form'] - Sélecteur du formulaire
     */
    static resetForm(modalId, formSelector = 'form') {
        const id = this._normalizeId(modalId);
        const modal = document.getElementById(id);

        if (!modal) return;

        const form = modal.querySelector(formSelector);
        if (form) {
            form.reset();
        }
    }

    // ==========================================
    // GLOBAL HOOKS
    // ==========================================

    /**
     * Enregistre un hook global pour intercepter les événements modales.
     * @param {string} hookName - Nom du hook ('beforeOpen', 'afterOpen', etc.)
     * @param {Function} callback - Fonction à exécuter
     *
     * @example
     * ModalManager.on('afterOpen', (modalId) => {
     *   console.log(`Modale ${modalId} ouverte`);
     * });
     */
    static on(hookName, callback) {
        if (this._globalHooks.hasOwnProperty(hookName)) {
            this._globalHooks[hookName] = callback;
        } else {
            console.warn(`[ModalManager] Hook inconnu: ${hookName}`);
        }
    }

    /**
     * Retire un hook global.
     * @param {string} hookName - Nom du hook
     */
    static off(hookName) {
        if (this._globalHooks.hasOwnProperty(hookName)) {
            this._globalHooks[hookName] = null;
        }
    }

    // ==========================================
    // PRIVATE HELPERS
    // ==========================================

    /**
     * Normalise un ID de modale (enlève le # si présent).
     * @private
     * @param {string} modalId
     * @returns {string}
     */
    static _normalizeId(modalId) {
        return modalId.startsWith('#') ? modalId.substring(1) : modalId;
    }

    /**
     * Attache les listeners de fermeture (backdrop, boutons).
     * @private
     * @param {string} id - ID de la modale
     * @param {HTMLElement} modal - Élément modal
     */
    static _attachCloseListeners(id, modal) {
        const state = this._modals.get(id);

        // Clic sur backdrop
        if (state.closeOnBackdrop) {
            const backdropListener = (e) => {
                if (e.target === modal) {
                    this.close(id);
                    modal.removeEventListener('click', backdropListener);
                }
            };
            modal.addEventListener('click', backdropListener);
        }

        // Boutons de fermeture (.close-btn, .cancel-btn)
        const closeBtns = modal.querySelectorAll('.close-btn, .cancel-btn, [data-close-modal]');
        closeBtns.forEach(btn => {
            const closeListener = () => {
                this.close(id);
                btn.removeEventListener('click', closeListener);
            };
            btn.addEventListener('click', closeListener);
        });

        // Boutons de confirmation (.confirm-btn, [data-confirm-modal])
        const confirmBtns = modal.querySelectorAll('.confirm-btn, [data-confirm-modal]');
        confirmBtns.forEach(btn => {
            const confirmListener = () => {
                this.close(id, true); // triggeredByConfirm = true
                btn.removeEventListener('click', confirmListener);
            };
            btn.addEventListener('click', confirmListener);
        });

        // Touche Escape
        const escapeListener = (e) => {
            if (e.key === 'Escape') {
                this.close(id);
                document.removeEventListener('keydown', escapeListener);
            }
        };
        document.addEventListener('keydown', escapeListener);
    }

    /**
     * Pré-remplit les champs de la modale avec des données.
     * @private
     * @param {HTMLElement} modal - Élément modal
     * @param {Object} data - Données à injecter
     */
    static _populateModalData(modal, data) {
        Object.keys(data).forEach(key => {
            const input = modal.querySelector(`[name="${key}"], #${key}`);
            if (input) {
                if (input.type === 'checkbox') {
                    input.checked = !!data[key];
                } else if (input.type === 'radio') {
                    const radio = modal.querySelector(`[name="${key}"][value="${data[key]}"]`);
                    if (radio) radio.checked = true;
                } else {
                    input.value = data[key];
                }
            }
        });
    }

    /**
     * Réinitialise le contenu d'une modale après fermeture.
     * @private
     * @param {HTMLElement} modal - Élément modal
     */
    static _resetModalContent(modal) {
        // Réinitialiser les formulaires
        const forms = modal.querySelectorAll('form');
        forms.forEach(form => form.reset());

        // Nettoyer les messages d'erreur
        const errorMsgs = modal.querySelectorAll('.error-message, .validation-error');
        errorMsgs.forEach(msg => msg.remove());
    }

    // ==========================================
    // AUTO-INITIALIZATION
    // ==========================================

    /**
     * Initialise automatiquement les modales au chargement de la page.
     * Détecte tous les éléments `.modal` et configure les listeners.
     *
     * @example
     * // Dans votre HTML, appeler au chargement:
     * ModalManager.autoInit();
     */
    static autoInit() {
        document.querySelectorAll('.modal').forEach(modal => {
            const id = modal.id;
            if (!id) {
                console.warn('[ModalManager] Modal sans ID détectée, ignorée:', modal);
                return;
            }

            // Enregistrer dans la Map (état fermé par défaut)
            if (!this._modals.has(id)) {
                this._modals.set(id, {
                    id: id,
                    isOpen: false,
                    data: null,
                    onConfirm: null,
                    onCancel: null,
                    closeOnBackdrop: true
                });
            }
        });

    }
}

// ==========================================
// AUTO-INIT AU CHARGEMENT (optionnel)
// ==========================================

// Décommenter pour auto-init au chargement du module
// if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', () => ModalManager.autoInit());
// } else {
//     ModalManager.autoInit();
// }

// ==========================================
// EXPORT
// ==========================================

export default ModalManager;
