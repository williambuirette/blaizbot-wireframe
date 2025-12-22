/**
 * MOCKDATA.JS - Simulated Data for Educational Platform Wireframe
 *
 * @fileoverview Centralise toutes les données simulées pour le prototypage.
 * Conçu pour être facilement remplacé par des appels API réels lors de l'intégration backend.
 *
 * @author Blaiz'bot Educational Platform
 * @version 1.0.0 - Vibecoding Optimized
 *
 * @see {@link ./types.js Types} Pour les définitions de types JSDoc
 */

// Import des types (pour référence JSDoc uniquement)
/// <reference path="./types.js" />

// ==========================================
// TEACHER DATA - Données Enseignant
// ==========================================

/**
 * Données structurées pour le tableau de bord enseignant.
 * Organisées par classes et matières pour faciliter le filtrage.
 *
 * @type {{
 *   classes: Object.<string, Student[]>,
 *   subjects: Object.<string, string[]>
 * }}
 */
export const teacherData = {
    classes: {
        '6A': [
            { id: 'student1', name: 'Alice MARTIN', progressPercentage: 85 },
            { id: 'student2', name: 'Thomas DUBOIS', progressPercentage: 72 },
            { id: 'student5', name: 'Emma PETIT', progressPercentage: 91 },
            { id: 'student6', name: 'Hugo DURAND', progressPercentage: 68 },
            { id: 'student8', name: 'Léa ROUSSEAU', progressPercentage: 78 },
            { id: 'student9', name: 'Noah LAMBERT', progressPercentage: 55 }
        ],
        '3B': [
            { id: 'student3', name: 'Lucas BERNARD', progressPercentage: 88 },
            { id: 'student4', name: 'Zoe BERNARD', progressPercentage: 94 },
            { id: 'student7', name: 'Chloé MOREL', progressPercentage: 82 },
            { id: 'student10', name: 'Gabriel VINCENT', progressPercentage: 76 },
            { id: 'student11', name: 'Camille FONTAINE', progressPercentage: 62 }
        ],
        '5C': [
            { id: 'student12', name: 'Louis MARTINEZ', progressPercentage: 74 },
            { id: 'student13', name: 'Sarah LEFEBVRE', progressPercentage: 89 },
            { id: 'student14', name: 'Jules GIRARD', progressPercentage: 70 },
            { id: 'student15', name: 'Inès ROBIN', progressPercentage: 83 }
        ]
    },
    subjects: {
        'Maths': [
            'Chapitre 4 - Les Fractions',
            'Géométrie : Les Triangles',
            'Introduction aux Nombres Relatifs',
            'Calcul Mental',
            'Algèbre : Équations du Premier Degré',
            'Statistiques et Probabilités'
        ],
        'Histoire': [
            'La Révolution Française',
            'La Guerre Froide',
            'L\'Empire Romain',
            'Les Grandes Découvertes',
            'La Seconde Guerre Mondiale'
        ],
        'Francais': [
            'La Poésie',
            'Grammaire : Le Verbe',
            'Lecture : Molière',
            'Orthographe : Accord du Participe Passé',
            'Rédaction : Le Récit Fantastique'
        ],
        'Physique': [
            'Les Atomes',
            'L\'Électricité',
            'Mécanique des fluides',
            'Optique et Lumière',
            'Forces et Mouvements'
        ],
        'SVT': [
            'Le Corps Humain',
            'L\'Écosystème',
            'La Cellule',
            'Génétique et Hérédité'
        ]
    }
};

/**
 * Événements du planning enseignant (devoirs, soutiens, examens).
 * @type {TeacherEvent[]}
 */
export const teacherEvents = [
    {
        id: 'event1',
        startDate: '2025-12-22',
        endDate: '2025-12-22',
        startTime: '10:00',
        endTime: '11:00',
        title: 'Devoir Maths',
        classId: '6A',
        studentIds: ['all'],
        subject: 'Maths',
        desc: 'Exercices page 42 - Les Fractions',
        type: 'homework'
    },
    {
        id: 'event2',
        startDate: '2025-12-23',
        endDate: '2025-12-23',
        startTime: '14:00',
        endTime: '15:00',
        title: 'Soutien Histoire',
        classId: '3B',
        studentIds: ['student3'],
        subject: 'Histoire',
        desc: 'Révision Révolution Française',
        type: 'support'
    },
    {
        id: 'event3',
        startDate: '2025-12-28',
        endDate: '2025-12-28',
        startTime: '09:00',
        endTime: '10:30',
        title: 'Exercice Français',
        classId: '6A',
        studentIds: ['all'],
        subject: 'Francais',
        desc: 'Grammaire - Le Verbe',
        type: 'homework'
    },
    {
        id: 'event4',
        startDate: '2026-01-05',
        endDate: '2026-01-05',
        startTime: '08:00',
        endTime: '10:00',
        title: 'Examen Physique',
        classId: '3B',
        studentIds: ['all'],
        subject: 'Physique',
        desc: 'Contrôle Électricité et Atomes',
        type: 'exam'
    },
    {
        id: 'event5',
        startDate: '2026-01-08',
        endDate: '2026-01-08',
        startTime: '15:00',
        endTime: '16:00',
        title: 'Réunion Parents',
        classId: '6A',
        studentIds: ['student1', 'student2'],
        subject: 'Général',
        desc: 'Entretien avec parents d\'élèves',
        type: 'meeting'
    }
];

// ==========================================
// STUDENT DATA - Données Élève
// ==========================================

/**
 * Progression détaillée d'un élève (exemple pour student1 - Alice MARTIN).
 * @type {StudentProgress}
 */
export const studentProgressSample = {
    studentId: 'student1',
    subjectId: 'Maths',
    overallProgress: 85,
    competencies: [
        {
            id: 'comp1',
            name: 'Calcul numérique',
            level: 4,
            percentage: 88,
            status: 'in_progress',
            badge: '🏅'
        },
        {
            id: 'comp2',
            name: 'Géométrie',
            level: 5,
            percentage: 95,
            status: 'acquired',
            badge: '🥇'
        },
        {
            id: 'comp3',
            name: 'Raisonnement logique',
            level: 3,
            percentage: 72,
            status: 'in_progress',
            badge: '🔍'
        },
        {
            id: 'comp4',
            name: 'Résolution de problèmes',
            level: 4,
            percentage: 81,
            status: 'in_progress',
            badge: '🧩'
        }
    ],
    exercisesCompleted: 24,
    averageScore: 82,
    lastActivity: '2025-12-21T14:30:00Z',
    aiComment: 'Excellent progrès ! Continue de travailler la résolution de problèmes complexes. Tu maîtrises très bien la géométrie. 🎯'
};

/**
 * Projets du Blaiz'bot Lab pour un élève.
 * @type {LabProject[]}
 */
export const studentLabProjects = [
    {
        id: 'lab1',
        title: 'Mon Premier Site Web',
        type: 'web',
        description: 'Création d\'une page web HTML/CSS avec présentation personnelle',
        icon: '🌐',
        content: '<html><head><title>Mon site</title></head><body><h1>Bonjour!</h1></body></html>',
        sources: [],
        chatHistory: [],
        createdAt: '2025-12-15T10:00:00Z',
        updatedAt: '2025-12-20T16:45:00Z',
        isCompleted: false
    },
    {
        id: 'lab2',
        title: 'Calculatrice Python',
        type: 'python',
        description: 'Programme Python pour effectuer des calculs mathématiques',
        icon: '🐍',
        content: 'def add(a, b):\n    return a + b\n\nprint(add(5, 3))',
        sources: [],
        chatHistory: [],
        createdAt: '2025-12-18T14:00:00Z',
        updatedAt: '2025-12-21T11:20:00Z',
        isCompleted: true
    },
    {
        id: 'lab3',
        title: 'Analyse de Données',
        type: 'data',
        description: 'Visualisation de données avec des graphiques',
        icon: '📊',
        content: '',
        sources: [],
        chatHistory: [],
        createdAt: '2025-12-19T09:30:00Z',
        updatedAt: '2025-12-19T09:30:00Z',
        isCompleted: false
    }
];

/**
 * Cours assignés à l'élève.
 * @type {Course[]}
 */
export const studentCourses = [
    {
        id: 'course1',
        title: 'Les Fractions - Chapitre 4',
        subjectId: 'Maths',
        type: 'lesson',
        content: '<h2>Introduction aux Fractions</h2><p>Une fraction représente une partie d\'un tout...</p>',
        description: 'Comprendre les fractions et les opérations de base',
        createdAt: '2025-11-15T10:00:00Z',
        updatedAt: '2025-12-01T14:30:00Z',
        teacherId: 'teacher1',
        difficulty: 3
    },
    {
        id: 'course2',
        title: 'Les Triangles',
        subjectId: 'Maths',
        type: 'lesson',
        content: '<h2>Géométrie : Les Triangles</h2><p>Un triangle est un polygone à trois côtés...</p>',
        description: 'Propriétés et classification des triangles',
        createdAt: '2025-11-20T09:00:00Z',
        updatedAt: '2025-12-10T11:00:00Z',
        teacherId: 'teacher1',
        difficulty: 2
    },
    {
        id: 'course3',
        title: 'La Révolution Française',
        subjectId: 'Histoire',
        type: 'lesson',
        content: '<h2>La Révolution Française (1789-1799)</h2><p>Contexte historique...</p>',
        description: 'Causes et conséquences de la Révolution',
        createdAt: '2025-10-05T13:00:00Z',
        updatedAt: '2025-11-25T16:00:00Z',
        teacherId: 'teacher2',
        difficulty: 4
    }
];

/**
 * Messages pour un élève.
 * @type {Message[]}
 */
export const studentMessages = [
    {
        id: 'msg1',
        senderId: 'teacher1',
        senderName: 'M. DUPONT',
        senderRole: 'teacher',
        recipientIds: ['student1'],
        subject: 'Rappel - Devoir Maths',
        content: 'Bonjour Alice, n\'oublie pas le devoir de maths pour demain (exercices page 42). Bon courage !',
        sentAt: '2025-12-21T16:00:00Z',
        isRead: false,
        priority: 'normal'
    },
    {
        id: 'msg2',
        senderId: 'student2',
        senderName: 'Thomas DUBOIS',
        senderRole: 'student',
        recipientIds: ['student1'],
        subject: 'Question exercice 5',
        content: 'Salut Alice, tu as compris l\'exercice 5 ? Je bloque sur la question b...',
        sentAt: '2025-12-21T18:30:00Z',
        isRead: true,
        priority: 'low'
    },
    {
        id: 'msg3',
        senderId: 'teacher2',
        senderName: 'Mme MARTIN',
        senderRole: 'teacher',
        recipientIds: ['student1', 'student2', 'student5'],
        subject: 'Révision Histoire - Documents',
        content: 'Voici les documents pour réviser le chapitre sur la Révolution Française. Bonne révision !',
        sentAt: '2025-12-20T10:15:00Z',
        isRead: true,
        priority: 'normal',
        attachments: ['docs/revolution_francaise.pdf']
    }
];

// ==========================================
// ADMIN DATA - Données Administration
// ==========================================

/**
 * Liste complète des enseignants.
 * @type {Teacher[]}
 */
export const adminTeachers = [
    {
        id: 'teacher1',
        name: 'Jean DUPONT',
        subjectIds: ['Maths', 'Physique'],
        classIds: ['6A', '3B']
    },
    {
        id: 'teacher2',
        name: 'Marie MARTIN',
        subjectIds: ['Histoire', 'Francais'],
        classIds: ['6A', '5C']
    },
    {
        id: 'teacher3',
        name: 'Pierre LEFEBVRE',
        subjectIds: ['SVT'],
        classIds: ['3B', '5C']
    }
];

/**
 * Liste complète des élèves.
 * @type {Student[]}
 */
export const adminStudents = [
    { id: 'student1', name: 'Alice MARTIN', classId: '6A', progressPercentage: 85 },
    { id: 'student2', name: 'Thomas DUBOIS', classId: '6A', progressPercentage: 72 },
    { id: 'student3', name: 'Lucas BERNARD', classId: '3B', progressPercentage: 88 },
    { id: 'student4', name: 'Zoe BERNARD', classId: '3B', progressPercentage: 94 },
    { id: 'student5', name: 'Emma PETIT', classId: '6A', progressPercentage: 91 },
    { id: 'student6', name: 'Hugo DURAND', classId: '6A', progressPercentage: 68 },
    { id: 'student7', name: 'Chloé MOREL', classId: '3B', progressPercentage: 82 },
    { id: 'student8', name: 'Léa ROUSSEAU', classId: '6A', progressPercentage: 78 },
    { id: 'student9', name: 'Noah LAMBERT', classId: '6A', progressPercentage: 55 },
    { id: 'student10', name: 'Gabriel VINCENT', classId: '3B', progressPercentage: 76 },
    { id: 'student11', name: 'Camille FONTAINE', classId: '3B', progressPercentage: 62 },
    { id: 'student12', name: 'Louis MARTINEZ', classId: '5C', progressPercentage: 74 },
    { id: 'student13', name: 'Sarah LEFEBVRE', classId: '5C', progressPercentage: 89 },
    { id: 'student14', name: 'Jules GIRARD', classId: '5C', progressPercentage: 70 },
    { id: 'student15', name: 'Inès ROBIN', classId: '5C', progressPercentage: 83 }
];

/**
 * Classes avec statistiques agrégées.
 * @type {ClassStatistics[]}
 */
export const adminClassStats = [
    {
        classId: '6A',
        averageProgress: 75,
        averageScore: 73,
        activeStudents: 6,
        totalStudents: 6,
        bySubject: [
            { subjectId: 'Maths', averageScore: 78, completionRate: 82, studentsAtRisk: 1 },
            { subjectId: 'Francais', averageScore: 71, completionRate: 75, studentsAtRisk: 2 }
        ],
        alerts: ['1 élève en difficulté (Hugo DURAND)', 'Taux d\'achèvement Français : 75%']
    },
    {
        classId: '3B',
        averageProgress: 80,
        averageScore: 82,
        activeStudents: 5,
        totalStudents: 5,
        bySubject: [
            { subjectId: 'Histoire', averageScore: 85, completionRate: 90, studentsAtRisk: 0 },
            { subjectId: 'Physique', averageScore: 79, completionRate: 85, studentsAtRisk: 1 }
        ],
        alerts: ['Classe performante', '1 élève nécessite suivi (Camille FONTAINE)']
    },
    {
        classId: '5C',
        averageProgress: 79,
        averageScore: 79,
        activeStudents: 4,
        totalStudents: 4,
        bySubject: [
            { subjectId: 'SVT', averageScore: 81, completionRate: 88, studentsAtRisk: 1 }
        ],
        alerts: ['Bon niveau général']
    }
];

/**
 * Sujets/matières avec métadonnées.
 * @type {Subject[]}
 */
export const adminSubjects = [
    { id: 'Maths', name: 'Mathématiques', color: '#3498db', icon: '📐', topics: teacherData.subjects['Maths'] },
    { id: 'Histoire', name: 'Histoire-Géographie', color: '#e74c3c', icon: '📚', topics: teacherData.subjects['Histoire'] },
    { id: 'Francais', name: 'Français', color: '#9b59b6', icon: '✍️', topics: teacherData.subjects['Francais'] },
    { id: 'Physique', name: 'Physique-Chimie', color: '#2ecc71', icon: '⚗️', topics: teacherData.subjects['Physique'] },
    { id: 'SVT', name: 'Sciences de la Vie et de la Terre', color: '#27ae60', icon: '🌱', topics: teacherData.subjects['SVT'] }
];

// ==========================================
// SHARED / COMMON DATA
// ==========================================

/**
 * Mois de l'année en français (pour calendriers).
 * @type {string[]}
 */
export const MONTHS_FR = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

/**
 * Jours de la semaine en français.
 * @type {string[]}
 */
export const DAYS_FR = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

/**
 * Jours courts pour l'affichage calendrier.
 * @type {string[]}
 */
export const DAYS_SHORT_FR = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

// ==========================================
// HELPER FUNCTIONS - Utilitaires de données
// ==========================================

/**
 * Récupère un élève par son ID.
 * @param {string} studentId - ID de l'élève
 * @returns {Student|null} Élève trouvé ou null
 */
export function getStudentById(studentId) {
    return adminStudents.find(s => s.id === studentId) || null;
}

/**
 * Récupère tous les élèves d'une classe.
 * @param {string} classId - ID de la classe
 * @returns {Student[]} Liste des élèves
 */
export function getStudentsByClass(classId) {
    return teacherData.classes[classId] || [];
}

/**
 * Récupère les événements pour une date donnée.
 * @param {string} dateStr - Date au format YYYY-MM-DD
 * @returns {TeacherEvent[]} Événements de la journée
 */
export function getEventsByDate(dateStr) {
    return teacherEvents.filter(evt =>
        evt.startDate <= dateStr && evt.endDate >= dateStr
    );
}

/**
 * Filtre les événements par classe.
 * @param {string} classId - ID de la classe
 * @returns {TeacherEvent[]} Événements de la classe
 */
export function getEventsByClass(classId) {
    return teacherEvents.filter(evt => evt.classId === classId);
}

/**
 * Génère un ID unique simple (pour prototypage uniquement).
 * @param {string} prefix - Préfixe de l'ID
 * @returns {string} ID généré
 */
export function generateId(prefix = 'item') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// ==========================================
// EXPORT PAR DÉFAUT (si besoin)
// ==========================================

export default {
    // Teacher
    teacherData,
    teacherEvents,

    // Student
    studentProgressSample,
    studentLabProjects,
    studentCourses,
    studentMessages,

    // Admin
    adminTeachers,
    adminStudents,
    adminClassStats,
    adminSubjects,

    // Common
    MONTHS_FR,
    DAYS_FR,
    DAYS_SHORT_FR,

    // Helpers
    getStudentById,
    getStudentsByClass,
    getEventsByDate,
    getEventsByClass,
    generateId
};
