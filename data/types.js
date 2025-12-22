/**
 * TYPES.JS - Type Definitions for Educational Platform
 *
 * @fileoverview Définitions TypeScript-like via JSDoc pour l'ensemble de l'application.
 * Ce fichier centralise tous les types utilisés dans le wireframe pour faciliter
 * la compréhension par l'IA et assurer la cohérence des données.
 *
 * @author Blaiz'bot Educational Platform
 * @version 1.0.0 - Vibecoding Optimized
 *
 * @see {@link https://jsdoc.app/ JSDoc Documentation}
 */

// ==========================================
// CORE USER TYPES
// ==========================================

/**
 * Représente un élève dans le système.
 * @typedef {Object} Student
 * @property {string} id - Identifiant unique de l'élève (ex: "student1")
 * @property {string} name - Nom complet de l'élève (ex: "Alice MARTIN")
 * @property {string} [classId] - Identifiant de la classe (ex: "6A")
 * @property {number} [progressPercentage] - Progression globale (0-100)
 *
 * @example
 * const student = {
 *   id: 'student1',
 *   name: 'Alice MARTIN',
 *   classId: '6A',
 *   progressPercentage: 75
 * };
 */

/**
 * Représente un enseignant dans le système.
 * @typedef {Object} Teacher
 * @property {string} id - Identifiant unique de l'enseignant
 * @property {string} name - Nom complet de l'enseignant
 * @property {string[]} subjectIds - Liste des matières enseignées
 * @property {string[]} classIds - Liste des classes dont il a la charge
 *
 * @example
 * const teacher = {
 *   id: 'teacher1',
 *   name: 'Jean DUPONT',
 *   subjectIds: ['Maths', 'Physique'],
 *   classIds: ['6A', '3B']
 * };
 */

/**
 * Représente un administrateur du système.
 * @typedef {Object} Admin
 * @property {string} id - Identifiant unique de l'administrateur
 * @property {string} name - Nom complet
 * @property {string} role - Rôle spécifique ('superadmin', 'admin', 'moderator')
 * @property {string[]} permissions - Liste des permissions
 */

// ==========================================
// ACADEMIC STRUCTURE TYPES
// ==========================================

/**
 * Représente une classe scolaire.
 * @typedef {Object} Class
 * @property {string} id - Identifiant de la classe (ex: "6A", "3B")
 * @property {string} name - Nom complet de la classe
 * @property {number} level - Niveau scolaire (6 = 6ème, 3 = 3ème)
 * @property {string} teacherId - Professeur principal
 * @property {Student[]} students - Liste des élèves
 * @property {number} [studentCount] - Nombre d'élèves
 *
 * @example
 * const classe = {
 *   id: '6A',
 *   name: '6ème A',
 *   level: 6,
 *   teacherId: 'teacher1',
 *   students: [...]
 * };
 */

/**
 * Représente une matière enseignée.
 * @typedef {Object} Subject
 * @property {string} id - Identifiant de la matière (ex: "Maths", "Histoire")
 * @property {string} name - Nom complet de la matière
 * @property {string} color - Couleur associée (hex code)
 * @property {string} icon - Icône associée (emoji ou nom d'icône)
 * @property {string[]} topics - Liste des chapitres/thèmes
 *
 * @example
 * const subject = {
 *   id: 'Maths',
 *   name: 'Mathématiques',
 *   color: '#3498db',
 *   icon: '📐',
 *   topics: ['Chapitre 4 - Les Fractions', 'Géométrie : Les Triangles']
 * };
 */

/**
 * Représente un programme pédagogique.
 * @typedef {Object} Program
 * @property {string} id - Identifiant du programme
 * @property {string} name - Nom du programme
 * @property {string} subjectId - Matière associée
 * @property {number} level - Niveau scolaire
 * @property {string[]} competencies - Liste des compétences visées
 * @property {Course[]} courses - Cours du programme
 */

// ==========================================
// CONTENT TYPES
// ==========================================

/**
 * Représente un cours ou un contenu pédagogique.
 * @typedef {Object} Course
 * @property {string} id - Identifiant unique du cours
 * @property {string} title - Titre du cours
 * @property {string} subjectId - Matière associée
 * @property {string} type - Type de contenu ('lesson', 'exercise', 'exam', 'resource')
 * @property {string} content - Contenu HTML ou texte
 * @property {string} [description] - Description courte
 * @property {string} createdAt - Date de création (ISO 8601)
 * @property {string} updatedAt - Date de dernière modification
 * @property {string} teacherId - Auteur du cours
 * @property {string[]} [attachments] - URLs des fichiers joints
 * @property {number} [difficulty] - Niveau de difficulté (1-5)
 *
 * @example
 * const course = {
 *   id: 'course1',
 *   title: 'Les Fractions',
 *   subjectId: 'Maths',
 *   type: 'lesson',
 *   content: '<h2>Introduction</h2><p>...</p>',
 *   createdAt: '2025-12-21T10:00:00Z',
 *   updatedAt: '2025-12-21T10:00:00Z',
 *   teacherId: 'teacher1',
 *   difficulty: 3
 * };
 */

/**
 * Représente un exercice ou une activité.
 * @typedef {Object} Exercise
 * @property {string} id - Identifiant unique
 * @property {string} title - Titre de l'exercice
 * @property {string} courseId - Cours parent
 * @property {Question[]} questions - Liste des questions
 * @property {number} totalPoints - Points totaux
 * @property {number} timeLimit - Temps limite en minutes (0 = illimité)
 * @property {string} type - Type d'exercice ('quiz', 'open', 'practical')
 */

/**
 * Représente une question d'exercice.
 * @typedef {Object} Question
 * @property {string} id - Identifiant unique
 * @property {string} text - Texte de la question
 * @property {string} type - Type ('mcq', 'open', 'true-false')
 * @property {string[]} [options] - Options de réponse (pour MCQ)
 * @property {string|string[]} correctAnswer - Réponse(s) correcte(s)
 * @property {number} points - Points attribués
 * @property {string} [explanation] - Explication de la réponse
 */

/**
 * Représente un fichier ou ressource.
 * @typedef {Object} FileResource
 * @property {string} id - Identifiant unique
 * @property {string} name - Nom du fichier
 * @property {string} type - Type MIME ou extension
 * @property {string} url - URL d'accès
 * @property {number} size - Taille en octets
 * @property {string} uploadedBy - ID de l'utilisateur
 * @property {string} uploadedAt - Date d'upload (ISO 8601)
 */

// ==========================================
// EVENT & SCHEDULING TYPES
// ==========================================

/**
 * Représente un événement dans le planning (devoir, soutien, examen).
 * @typedef {Object} TeacherEvent
 * @property {string} id - Identifiant unique de l'événement
 * @property {string} startDate - Date de début (format YYYY-MM-DD)
 * @property {string} endDate - Date de fin (format YYYY-MM-DD)
 * @property {string} startTime - Heure de début (format HH:MM)
 * @property {string} endTime - Heure de fin (format HH:MM)
 * @property {string} title - Titre de l'événement
 * @property {string} classId - ID de la classe concernée
 * @property {string[]} studentIds - Liste des IDs élèves ('all' pour toute la classe)
 * @property {string} subject - Matière concernée
 * @property {string} [desc] - Description optionnelle
 * @property {string} [type] - Type d'événement ('homework', 'exam', 'support', 'meeting')
 * @property {string} [color] - Couleur personnalisée (hex)
 * @property {boolean} [isRecurring] - Événement récurrent
 *
 * @example
 * const event = {
 *   id: 'event1',
 *   startDate: '2025-12-22',
 *   endDate: '2025-12-22',
 *   startTime: '10:00',
 *   endTime: '11:00',
 *   title: 'Devoir Maths',
 *   classId: '6A',
 *   studentIds: ['all'],
 *   subject: 'Maths',
 *   desc: 'Exercices page 42',
 *   type: 'homework'
 * };
 */

/**
 * Représente un planning de révision pour un élève.
 * @typedef {Object} RevisionSchedule
 * @property {string} id - Identifiant unique
 * @property {string} studentId - ID de l'élève
 * @property {string} subjectId - Matière à réviser
 * @property {string} date - Date de la session (YYYY-MM-DD)
 * @property {string} timeSlot - Créneau horaire
 * @property {string[]} topics - Thèmes à réviser
 * @property {boolean} completed - Session terminée ou non
 * @property {string} [aiRecommendation] - Suggestion de l'IA
 */

// ==========================================
// PROGRESS & ANALYTICS TYPES
// ==========================================

/**
 * Représente la progression d'un élève dans une matière.
 * @typedef {Object} StudentProgress
 * @property {string} studentId - ID de l'élève
 * @property {string} subjectId - ID de la matière
 * @property {number} overallProgress - Progression globale (0-100)
 * @property {CompetencyProgress[]} competencies - Détail par compétence
 * @property {number} exercisesCompleted - Nombre d'exercices terminés
 * @property {number} averageScore - Score moyen (0-100)
 * @property {string} lastActivity - Date de dernière activité (ISO 8601)
 * @property {string} [aiComment] - Commentaire généré par l'IA
 *
 * @example
 * const progress = {
 *   studentId: 'student1',
 *   subjectId: 'Maths',
 *   overallProgress: 75,
 *   competencies: [...],
 *   exercisesCompleted: 24,
 *   averageScore: 82,
 *   lastActivity: '2025-12-21T14:30:00Z',
 *   aiComment: 'Excellent progrès sur les fractions'
 * };
 */

/**
 * Représente la progression dans une compétence spécifique.
 * @typedef {Object} CompetencyProgress
 * @property {string} id - Identifiant de la compétence
 * @property {string} name - Nom de la compétence
 * @property {number} level - Niveau acquis (1-5)
 * @property {number} percentage - Pourcentage de maîtrise (0-100)
 * @property {string} status - Statut ('acquired', 'in_progress', 'not_started')
 * @property {string} [badge] - Badge obtenu (emoji ou URL)
 */

/**
 * Représente des statistiques agrégées pour une classe.
 * @typedef {Object} ClassStatistics
 * @property {string} classId - ID de la classe
 * @property {number} averageProgress - Progression moyenne (0-100)
 * @property {number} averageScore - Score moyen (0-100)
 * @property {number} activeStudents - Nombre d'élèves actifs
 * @property {number} totalStudents - Nombre total d'élèves
 * @property {SubjectStats[]} bySubject - Statistiques par matière
 * @property {string[]} alerts - Alertes pédagogiques
 *
 * @example
 * const stats = {
 *   classId: '6A',
 *   averageProgress: 68,
 *   averageScore: 72,
 *   activeStudents: 23,
 *   totalStudents: 28,
 *   bySubject: [...],
 *   alerts: ['3 élèves en difficulté en Maths']
 * };
 */

/**
 * Statistiques pour une matière dans une classe.
 * @typedef {Object} SubjectStats
 * @property {string} subjectId - ID de la matière
 * @property {number} averageScore - Score moyen
 * @property {number} completionRate - Taux de complétion (0-100)
 * @property {number} studentsAtRisk - Nombre d'élèves en difficulté
 */

// ==========================================
// MESSAGING & COMMUNICATION TYPES
// ==========================================

/**
 * Représente un message dans le système de messagerie.
 * @typedef {Object} Message
 * @property {string} id - Identifiant unique du message
 * @property {string} senderId - ID de l'expéditeur
 * @property {string} senderName - Nom de l'expéditeur
 * @property {string} senderRole - Rôle ('teacher', 'student', 'admin')
 * @property {string[]} recipientIds - Liste des destinataires
 * @property {string} subject - Sujet du message
 * @property {string} content - Contenu du message (HTML ou texte)
 * @property {string} sentAt - Date d'envoi (ISO 8601)
 * @property {boolean} isRead - Message lu ou non
 * @property {string} [threadId] - ID du fil de discussion
 * @property {string[]} [attachments] - URLs des pièces jointes
 * @property {string} [priority] - Priorité ('low', 'normal', 'high', 'urgent')
 *
 * @example
 * const message = {
 *   id: 'msg1',
 *   senderId: 'teacher1',
 *   senderName: 'Jean DUPONT',
 *   senderRole: 'teacher',
 *   recipientIds: ['student1', 'student2'],
 *   subject: 'Rappel - Devoir Maths',
 *   content: 'N\'oubliez pas le devoir pour demain...',
 *   sentAt: '2025-12-21T16:00:00Z',
 *   isRead: false,
 *   priority: 'normal'
 * };
 */

/**
 * Représente une conversation dans le chat de l'assistant IA.
 * @typedef {Object} ChatMessage
 * @property {string} id - Identifiant unique
 * @property {string} role - Rôle ('user' ou 'assistant')
 * @property {string} content - Contenu du message
 * @property {string} timestamp - Horodatage (ISO 8601)
 * @property {string} [context] - Contexte du chat ('exercise', 'course', 'free')
 * @property {string} [relatedId] - ID du cours/exercice lié
 */

// ==========================================
// AI & ASSISTANT TYPES
// ==========================================

/**
 * Représente un projet dans le Blaiz'bot Lab.
 * @typedef {Object} LabProject
 * @property {string} id - Identifiant unique du projet
 * @property {string} title - Titre du projet
 * @property {string} type - Type de projet ('web', 'python', 'data', 'creative')
 * @property {string} description - Description du projet
 * @property {string} icon - Icône (emoji)
 * @property {string} content - Contenu/code du projet
 * @property {FileResource[]} sources - Sources importées
 * @property {ChatMessage[]} chatHistory - Historique des conversations
 * @property {string} createdAt - Date de création
 * @property {string} updatedAt - Dernière modification
 * @property {boolean} isCompleted - Projet terminé
 *
 * @example
 * const project = {
 *   id: 'lab1',
 *   title: 'Mon site web',
 *   type: 'web',
 *   description: 'Créer ma première page web',
 *   icon: '🌐',
 *   content: '<html>...</html>',
 *   sources: [],
 *   chatHistory: [],
 *   createdAt: '2025-12-20T10:00:00Z',
 *   updatedAt: '2025-12-21T15:30:00Z',
 *   isCompleted: false
 * };
 */

/**
 * Requête envoyée à l'assistant IA.
 * @typedef {Object} AIRequest
 * @property {string} prompt - Prompt utilisateur
 * @property {string} context - Contexte ('exercise', 'course', 'project')
 * @property {string} [relatedContent] - Contenu associé
 * @property {string} studentId - ID de l'élève
 * @property {string} sessionId - ID de session
 */

/**
 * Réponse de l'assistant IA.
 * @typedef {Object} AIResponse
 * @property {string} content - Contenu de la réponse
 * @property {string} [code] - Code généré (si applicable)
 * @property {string[]} [suggestions] - Suggestions de suivi
 * @property {string} [explanation] - Explications pédagogiques
 */

// ==========================================
// UI & INTERACTION TYPES
// ==========================================

/**
 * Représente l'état d'une modale.
 * @typedef {Object} ModalState
 * @property {string} id - ID de la modale
 * @property {boolean} isOpen - Modale ouverte ou fermée
 * @property {Object} [data] - Données contextuelles
 * @property {Function} [onConfirm] - Callback de confirmation
 * @property {Function} [onCancel] - Callback d'annulation
 */

/**
 * Configuration d'un filtre de données.
 * @typedef {Object} FilterConfig
 * @property {string} classId - Filtre par classe
 * @property {string} subjectId - Filtre par matière
 * @property {string} studentId - Filtre par élève
 * @property {string} dateFrom - Date de début
 * @property {string} dateTo - Date de fin
 * @property {string} status - Filtre par statut
 */

/**
 * Notification système.
 * @typedef {Object} Notification
 * @property {string} id - Identifiant unique
 * @property {string} type - Type ('info', 'success', 'warning', 'error')
 * @property {string} title - Titre de la notification
 * @property {string} message - Message détaillé
 * @property {string} timestamp - Horodatage
 * @property {boolean} isRead - Lu ou non
 * @property {string} [actionUrl] - URL d'action
 */

// ==========================================
// API RESPONSE TYPES
// ==========================================

/**
 * Réponse API standard.
 * @typedef {Object} APIResponse
 * @property {boolean} success - Succès de l'opération
 * @property {*} [data] - Données retournées
 * @property {string} [message] - Message de retour
 * @property {APIError} [error] - Erreur éventuelle
 */

/**
 * Erreur API.
 * @typedef {Object} APIError
 * @property {number} code - Code d'erreur HTTP
 * @property {string} message - Message d'erreur
 * @property {string} [details] - Détails supplémentaires
 */

// ==========================================
// EXPORTS (for ES6 modules)
// ==========================================

// Note: Ces types sont utilisés via JSDoc @typedef
// Pas besoin d'export explicite pour JSDoc, mais ajouté pour compatibilité future

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Types exportés pour Node.js si nécessaire
    };
}
