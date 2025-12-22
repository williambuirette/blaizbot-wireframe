/**
 * APP.CONSTANTS.JS - Application-wide Constants
 *
 * @fileoverview Constantes globales pour l'application éducative.
 * Centralise les couleurs, strings, configurations pour éviter les "magic values".
 *
 * @author Blaiz'bot Educational Platform
 * @version 1.0.0 - Vibecoding Optimized
 *
 * @example
 * import { COLORS, MESSAGES, SELECTORS } from './constants/app.constants.js';
 * element.style.backgroundColor = COLORS.PRIMARY;
 */

// ==========================================
// DESIGN SYSTEM - COLORS
// ==========================================

/**
 * Palette de couleurs de l'application.
 * Synchronisée avec les CSS variables de style.css.
 * @constant
 */
export const COLORS = {
    // Couleurs principales
    PRIMARY: '#3498db',       // Bleu - Confiance, Calme
    SECONDARY: '#2ecc71',     // Vert - Succès, Progression
    ACCENT: '#e74c3c',        // Rouge - Alertes, Urgence
    WARNING: '#f39c12',       // Orange - Avertissements
    INFO: '#3498db',          // Bleu - Informations

    // Textes
    TEXT_DARK: '#2c3e50',     // Texte principal
    TEXT_LIGHT: '#ecf0f1',    // Texte sur fond sombre
    TEXT_MUTED: '#95a5a6',    // Texte secondaire

    // Backgrounds
    BG_PRIMARY: '#ffffff',    // Fond principal
    BG_SECONDARY: '#f8f9fa',  // Fond secondaire
    BG_DARK: '#2c3e50',       // Fond sombre (sidebar)
    BG_LIGHT: '#ecf0f1',      // Fond clair

    // Matières (par couleur thématique)
    SUBJECT_MATHS: '#3498db',      // Bleu
    SUBJECT_HISTOIRE: '#e74c3c',   // Rouge
    SUBJECT_FRANCAIS: '#9b59b6',   // Violet
    SUBJECT_PHYSIQUE: '#2ecc71',   // Vert
    SUBJECT_SVT: '#27ae60',        // Vert foncé
    SUBJECT_ANGLAIS: '#e67e22',    // Orange

    // États
    SUCCESS: '#2ecc71',
    ERROR: '#e74c3c',
    DISABLED: '#bdc3c7',
    HOVER: '#2980b9'
};

// ==========================================
// DESIGN SYSTEM - SPACING
// ==========================================

/**
 * Système d'espacement cohérent (en pixels).
 * @constant
 */
export const SPACING = {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
    XXL: 48
};

/**
 * Tailles de police (en pixels).
 * @constant
 */
export const FONT_SIZES = {
    XS: 12,
    SM: 14,
    MD: 16,
    LG: 18,
    XL: 24,
    XXL: 32
};

// ==========================================
// DOM SELECTORS
// ==========================================

/**
 * Sélecteurs DOM fréquemment utilisés.
 * Évite les typos et centralise les IDs/classes.
 * @constant
 */
export const SELECTORS = {
    // Layout
    SIDEBAR: '.sidebar',
    MAIN_CONTENT: '.main-content',
    NAV_LINK: '.nav-link',

    // Teacher Dashboard
    CALENDAR_GRID: '#calendar-grid',
    CALENDAR_MONTH_YEAR: '#calendar-month-year',
    PLANNING_FILTER_CLASS: '#planning-filter-class',
    PLANNING_FILTER_STUDENT: '#planning-filter-student',

    // Student Dashboard
    LAB_WORKSPACE: '#lab-workspace',
    CHAT_CONTAINER: '#chat-container',
    PROGRESS_SECTION: '#ma-progression',

    // Modales communes
    MODAL_PREFIX: 'modal-',
    CLOSE_BTN: '.close-btn',
    CONFIRM_BTN: '.confirm-btn',
    CANCEL_BTN: '.cancel-btn',

    // Formulaires
    FORM: 'form',
    INPUT: 'input',
    SELECT: 'select',
    TEXTAREA: 'textarea'
};

// ==========================================
// MESSAGES & STRINGS
// ==========================================

/**
 * Messages utilisateur centralisés.
 * Facilite la traduction future et maintient la cohérence.
 * @constant
 */
export const MESSAGES = {
    // Succès
    SUCCESS_SAVE: 'Enregistrement réussi ✓',
    SUCCESS_DELETE: 'Suppression réussie',
    SUCCESS_CREATE: 'Création réussie',
    SUCCESS_UPDATE: 'Mise à jour réussie',

    // Erreurs
    ERROR_GENERIC: 'Une erreur est survenue. Veuillez réessayer.',
    ERROR_NETWORK: 'Erreur de connexion au serveur',
    ERROR_NOT_FOUND: 'Élément introuvable',
    ERROR_VALIDATION: 'Veuillez vérifier les champs du formulaire',
    ERROR_PERMISSION: 'Vous n\'avez pas les permissions nécessaires',

    // Confirmations
    CONFIRM_DELETE: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
    CONFIRM_LEAVE: 'Vous avez des modifications non enregistrées. Quitter quand même ?',

    // Informations
    INFO_LOADING: 'Chargement en cours...',
    INFO_NO_DATA: 'Aucune donnée disponible',
    INFO_EMPTY_LIST: 'La liste est vide',

    // IA
    AI_THINKING: '🤖 Blaiz\'bot réfléchit...',
    AI_ERROR: '⚠️ Désolé, je rencontre un problème technique.',
    AI_WELCOME: '👋 Bonjour ! Je suis Blaiz\'bot, ton assistant personnel. Comment puis-je t\'aider ?'
};

// ==========================================
// CALENDAR & DATES
// ==========================================

/**
 * Mois de l'année en français.
 * @constant
 */
export const MONTHS_FR = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

/**
 * Jours de la semaine (longs).
 * @constant
 */
export const DAYS_FR = [
    'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'
];

/**
 * Jours de la semaine (courts).
 * @constant
 */
export const DAYS_SHORT_FR = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

/**
 * Formats de date courants.
 * @constant
 */
export const DATE_FORMATS = {
    ISO: 'YYYY-MM-DD',           // 2025-12-21
    FR_SHORT: 'DD/MM/YYYY',      // 21/12/2025
    FR_LONG: 'DD MMMM YYYY',     // 21 Décembre 2025
    TIME: 'HH:MM',               // 14:30
    DATETIME: 'DD/MM/YYYY HH:MM' // 21/12/2025 14:30
};

// ==========================================
// API CONFIGURATION
// ==========================================

/**
 * Configuration API (pour future intégration backend).
 * @constant
 */
export const API_CONFIG = {
    BASE_URL: 'http://localhost:3000/api',
    TIMEOUT: 10000, // 10 secondes
    USE_MOCK: true, // Utiliser données simulées pour wireframe

    ENDPOINTS: {
        // Teacher
        TEACHER_CLASSES: '/teacher/classes',
        TEACHER_EVENTS: '/teacher/events',
        TEACHER_COURSES: '/teacher/courses',
        TEACHER_MESSAGES: '/teacher/messages',

        // Student
        STUDENT_PROGRESS: '/student/:id/progress',
        STUDENT_COURSES: '/student/:id/courses',
        STUDENT_LAB: '/student/:id/lab/projects',
        STUDENT_AI: '/student/ai/chat',

        // Admin
        ADMIN_USERS: '/admin/users',
        ADMIN_STATS: '/admin/statistics',
        ADMIN_SUBJECTS: '/admin/subjects'
    }
};

// ==========================================
// EVENT TYPES
// ==========================================

/**
 * Types d'événements dans le planning.
 * @constant
 */
export const EVENT_TYPES = {
    HOMEWORK: 'homework',      // Devoir à rendre
    EXAM: 'exam',             // Examen
    SUPPORT: 'support',       // Soutien scolaire
    MEETING: 'meeting',       // Réunion
    ACTIVITY: 'activity'      // Activité pédagogique
};

/**
 * Couleurs associées aux types d'événements.
 * @constant
 */
export const EVENT_COLORS = {
    homework: '#3498db',      // Bleu
    exam: '#e74c3c',          // Rouge
    support: '#2ecc71',       // Vert
    meeting: '#9b59b6',       // Violet
    activity: '#f39c12'       // Orange
};

// ==========================================
// USER ROLES
// ==========================================

/**
 * Rôles utilisateur dans l'application.
 * @constant
 */
export const USER_ROLES = {
    ADMIN: 'admin',
    TEACHER: 'teacher',
    STUDENT: 'student',
    PARENT: 'parent'        // Pour future extension
};

// ==========================================
// COMPETENCY LEVELS
// ==========================================

/**
 * Niveaux de compétence.
 * @constant
 */
export const COMPETENCY_LEVELS = {
    NOT_STARTED: 0,
    BEGINNER: 1,
    INTERMEDIATE: 2,
    ADVANCED: 3,
    EXPERT: 4,
    MASTER: 5
};

/**
 * Labels pour les niveaux de compétence.
 * @constant
 */
export const COMPETENCY_LABELS = [
    'Non démarré',
    'Débutant',
    'Intermédiaire',
    'Avancé',
    'Expert',
    'Maîtrise'
];

// ==========================================
// SUBJECT ICONS
// ==========================================

/**
 * Icônes (emojis) par matière.
 * @constant
 */
export const SUBJECT_ICONS = {
    Maths: '📐',
    Histoire: '📚',
    Francais: '✍️',
    Physique: '⚗️',
    SVT: '🌱',
    Anglais: '🇬🇧',
    Espagnol: '🇪🇸',
    Sport: '⚽',
    Arts: '🎨',
    Musique: '🎵'
};

// ==========================================
// LAB PROJECT TYPES
// ==========================================

/**
 * Types de projets dans le Blaiz'bot Lab.
 * @constant
 */
export const LAB_PROJECT_TYPES = {
    WEB: 'web',           // HTML/CSS/JS
    PYTHON: 'python',     // Python
    DATA: 'data',         // Data Science
    CREATIVE: 'creative', // Créatif (dessin, animation)
    OTHER: 'other'        // Autre
};

/**
 * Icônes pour les types de projets Lab.
 * @constant
 */
export const LAB_PROJECT_ICONS = {
    web: '🌐',
    python: '🐍',
    data: '📊',
    creative: '🎨',
    other: '💡'
};

// ==========================================
// VALIDATION RULES
// ==========================================

/**
 * Règles de validation de formulaires.
 * @constant
 */
export const VALIDATION = {
    // Email
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    EMAIL_MAX_LENGTH: 255,

    // Nom
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,

    // Mot de passe (pour future intégration auth)
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,

    // Cours
    COURSE_TITLE_MIN: 3,
    COURSE_TITLE_MAX: 200,
    COURSE_DESC_MAX: 1000,

    // Messages
    MESSAGE_SUBJECT_MAX: 200,
    MESSAGE_CONTENT_MAX: 5000
};

// ==========================================
// PAGINATION
// ==========================================

/**
 * Configuration de pagination.
 * @constant
 */
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 20,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
    MAX_PAGE_SIZE: 100
};

// ==========================================
// LOCAL STORAGE KEYS
// ==========================================

/**
 * Clés pour le stockage local.
 * @constant
 */
export const STORAGE_KEYS = {
    USER_PREFS: 'blaizbot_user_preferences',
    LAST_VIEW: 'blaizbot_last_view',
    DRAFT_MESSAGE: 'blaizbot_draft_message',
    LAB_PROJECT_DRAFT: 'blaizbot_lab_draft',
    THEME: 'blaizbot_theme' // dark/light pour future feature
};

// ==========================================
// ANIMATION DURATIONS (ms)
// ==========================================

/**
 * Durées d'animation (millisecondes).
 * @constant
 */
export const ANIMATION = {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
    VERY_SLOW: 1000
};

// ==========================================
// EXPORT PAR DÉFAUT (objet complet)
// ==========================================

export default {
    COLORS,
    SPACING,
    FONT_SIZES,
    SELECTORS,
    MESSAGES,
    MONTHS_FR,
    DAYS_FR,
    DAYS_SHORT_FR,
    DATE_FORMATS,
    API_CONFIG,
    EVENT_TYPES,
    EVENT_COLORS,
    USER_ROLES,
    COMPETENCY_LEVELS,
    COMPETENCY_LABELS,
    SUBJECT_ICONS,
    LAB_PROJECT_TYPES,
    LAB_PROJECT_ICONS,
    VALIDATION,
    PAGINATION,
    STORAGE_KEYS,
    ANIMATION
};
