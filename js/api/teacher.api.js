/**
 * TEACHER.API.JS - Teacher-specific API Layer
 *
 * @fileoverview API pour les opérations enseignant (classes, événements, cours, élèves).
 * Utilise mockData en développement, prêt pour backend réel.
 *
 * @author Blaiz'bot Educational Platform
 * @version 1.0.0 - Vibecoding Optimized
 */

import { BaseAPI } from './base.api.js';
import mockData from '../../data/mockData.js';

/// <reference path="../../data/types.js" />

// ==========================================
// TEACHER API CLASS
// ==========================================

/**
 * API pour toutes les opérations enseignant.
 * @extends BaseAPI
 */
export class TeacherAPI extends BaseAPI {

    // ==========================================
    // CLASSES & STUDENTS
    // ==========================================

    /**
     * Récupère toutes les classes de l'enseignant.
     * @returns {Promise<APIResponse<Object.<string, Student[]>>>}
     *
     * @example
     * const response = await TeacherAPI.getClasses();
     * if (response.success) {
     *   const classes = response.data; // { '6A': [...], '3B': [...] }
     * }
     */
    static async getClasses() {
        // Mode mock : retourner les données simulées
        if (this._isMockMode()) {
            return this._mockDelay(() => ({
                success: true,
                data: mockData.teacherData.classes,
                message: 'Classes récupérées avec succès'
            }));
        }

        // Mode production : appel API réel
        return this.get('/teacher/classes');
    }

    /**
     * Récupère les élèves d'une classe spécifique.
     * @param {string} classId - ID de la classe (ex: '6A')
     * @returns {Promise<APIResponse<Student[]>>}
     *
     * @example
     * const response = await TeacherAPI.getStudentsByClass('6A');
     */
    static async getStudentsByClass(classId) {
        if (this._isMockMode()) {
            return this._mockDelay(() => ({
                success: true,
                data: mockData.getStudentsByClass(classId),
                message: `Élèves de la classe ${classId} récupérés`
            }));
        }

        return this.get(`/teacher/classes/${classId}/students`);
    }

    /**
     * Récupère les détails d'un élève spécifique.
     * @param {string} studentId - ID de l'élève
     * @returns {Promise<APIResponse<Student>>}
     *
     * @example
     * const response = await TeacherAPI.getStudentById('student1');
     */
    static async getStudentById(studentId) {
        if (this._isMockMode()) {
            return this._mockDelay(() => ({
                success: true,
                data: mockData.getStudentById(studentId),
                message: 'Élève récupéré avec succès'
            }));
        }

        return this.get(`/teacher/students/${studentId}`);
    }

    // ==========================================
    // SUBJECTS & COURSES
    // ==========================================

    /**
     * Récupère toutes les matières enseignées avec leurs chapitres.
     * @returns {Promise<APIResponse<Object.<string, string[]>>>}
     *
     * @example
     * const response = await TeacherAPI.getSubjects();
     * // data: { 'Maths': ['Chapitre 1', ...], 'Histoire': [...] }
     */
    static async getSubjects() {
        if (this._isMockMode()) {
            return this._mockDelay(() => ({
                success: true,
                data: mockData.teacherData.subjects,
                message: 'Matières récupérées avec succès'
            }));
        }

        return this.get('/teacher/subjects');
    }

    /**
     * Crée un nouveau cours.
     * @param {Course} courseData - Données du cours à créer
     * @returns {Promise<APIResponse<Course>>}
     *
     * @example
     * const newCourse = {
     *   title: 'Les Équations',
     *   subjectId: 'Maths',
     *   type: 'lesson',
     *   content: '<h2>Introduction</h2>...'
     * };
     * const response = await TeacherAPI.createCourse(newCourse);
     */
    static async createCourse(courseData) {
        if (this._isMockMode()) {
            return this._mockDelay(() => ({
                success: true,
                data: {
                    id: mockData.generateId('course'),
                    ...courseData,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                message: 'Cours créé avec succès'
            }));
        }

        return this.post('/teacher/courses', courseData);
    }

    /**
     * Met à jour un cours existant.
     * @param {string} courseId - ID du cours
     * @param {Partial<Course>} updates - Modifications à apporter
     * @returns {Promise<APIResponse<Course>>}
     *
     * @example
     * const response = await TeacherAPI.updateCourse('course1', {
     *   title: 'Nouveau titre'
     * });
     */
    static async updateCourse(courseId, updates) {
        if (this._isMockMode()) {
            return this._mockDelay(() => ({
                success: true,
                data: {
                    id: courseId,
                    ...updates,
                    updatedAt: new Date().toISOString()
                },
                message: 'Cours mis à jour avec succès'
            }));
        }

        return this.put(`/teacher/courses/${courseId}`, updates);
    }

    /**
     * Supprime un cours.
     * @param {string} courseId - ID du cours à supprimer
     * @returns {Promise<APIResponse<void>>}
     */
    static async deleteCourse(courseId) {
        if (this._isMockMode()) {
            return this._mockDelay(() => ({
                success: true,
                data: null,
                message: 'Cours supprimé avec succès'
            }));
        }

        return this.delete(`/teacher/courses/${courseId}`);
    }

    // ==========================================
    // EVENTS & PLANNING
    // ==========================================

    /**
     * Récupère tous les événements de l'enseignant.
     * @param {Object} [filters] - Filtres optionnels (classId, dateFrom, dateTo)
     * @returns {Promise<APIResponse<TeacherEvent[]>>}
     *
     * @example
     * const response = await TeacherAPI.getEvents({ classId: '6A' });
     */
    static async getEvents(filters = {}) {
        if (this._isMockMode()) {
            let events = [...mockData.teacherEvents];

            // Filtrage côté client (en mode mock)
            if (filters.classId) {
                events = events.filter(e => e.classId === filters.classId);
            }
            if (filters.dateFrom) {
                events = events.filter(e => e.startDate >= filters.dateFrom);
            }
            if (filters.dateTo) {
                events = events.filter(e => e.endDate <= filters.dateTo);
            }

            return this._mockDelay(() => ({
                success: true,
                data: events,
                message: 'Événements récupérés avec succès'
            }));
        }

        const queryParams = new URLSearchParams(filters).toString();
        return this.get(`/teacher/events?${queryParams}`);
    }

    /**
     * Crée un nouvel événement (devoir, soutien, examen).
     * @param {TeacherEvent} eventData - Données de l'événement
     * @returns {Promise<APIResponse<TeacherEvent>>}
     *
     * @example
     * const newEvent = {
     *   startDate: '2026-01-15',
     *   endDate: '2026-01-15',
     *   startTime: '10:00',
     *   endTime: '11:00',
     *   title: 'Devoir Maths',
     *   classId: '6A',
     *   studentIds: ['all'],
     *   subject: 'Maths',
     *   desc: 'Exercices chapitre 5',
     *   type: 'homework'
     * };
     * const response = await TeacherAPI.createEvent(newEvent);
     */
    static async createEvent(eventData) {
        if (this._isMockMode()) {
            const newEvent = {
                id: mockData.generateId('event'),
                ...eventData
            };

            // En mode mock, on simule l'ajout dans le tableau
            mockData.teacherEvents.push(newEvent);

            return this._mockDelay(() => ({
                success: true,
                data: newEvent,
                message: 'Événement créé avec succès'
            }));
        }

        return this.post('/teacher/events', eventData);
    }

    /**
     * Met à jour un événement existant.
     * @param {string} eventId - ID de l'événement
     * @param {Partial<TeacherEvent>} updates - Modifications
     * @returns {Promise<APIResponse<TeacherEvent>>}
     */
    static async updateEvent(eventId, updates) {
        if (this._isMockMode()) {
            return this._mockDelay(() => ({
                success: true,
                data: { id: eventId, ...updates },
                message: 'Événement mis à jour'
            }));
        }

        return this.put(`/teacher/events/${eventId}`, updates);
    }

    /**
     * Supprime un événement.
     * @param {string} eventId - ID de l'événement
     * @returns {Promise<APIResponse<void>>}
     */
    static async deleteEvent(eventId) {
        if (this._isMockMode()) {
            const index = mockData.teacherEvents.findIndex(e => e.id === eventId);
            if (index !== -1) {
                mockData.teacherEvents.splice(index, 1);
            }

            return this._mockDelay(() => ({
                success: true,
                data: null,
                message: 'Événement supprimé'
            }));
        }

        return this.delete(`/teacher/events/${eventId}`);
    }

    // ==========================================
    // MESSAGING
    // ==========================================

    /**
     * Envoie un message à des élèves ou collègues.
     * @param {Message} messageData - Données du message
     * @returns {Promise<APIResponse<Message>>}
     *
     * @example
     * const message = {
     *   recipientIds: ['student1', 'student2'],
     *   subject: 'Rappel devoir',
     *   content: 'N\'oubliez pas...',
     *   priority: 'normal'
     * };
     * const response = await TeacherAPI.sendMessage(message);
     */
    static async sendMessage(messageData) {
        if (this._isMockMode()) {
            const newMessage = {
                id: mockData.generateId('msg'),
                senderId: 'teacher1', // Simulé
                senderName: 'Enseignant', // Simulé
                senderRole: 'teacher',
                sentAt: new Date().toISOString(),
                isRead: false,
                ...messageData
            };

            return this._mockDelay(() => ({
                success: true,
                data: newMessage,
                message: 'Message envoyé avec succès'
            }));
        }

        return this.post('/teacher/messages', messageData);
    }

    /**
     * Récupère les messages de l'enseignant.
     * @param {Object} [filters] - Filtres (isRead, dateFrom, etc.)
     * @returns {Promise<APIResponse<Message[]>>}
     */
    static async getMessages(filters = {}) {
        if (this._isMockMode()) {
            // En mode mock, retourner quelques messages types
            return this._mockDelay(() => ({
                success: true,
                data: mockData.studentMessages.slice(0, 5), // Messages d'exemple
                message: 'Messages récupérés'
            }));
        }

        const queryParams = new URLSearchParams(filters).toString();
        return this.get(`/teacher/messages?${queryParams}`);
    }

    // ==========================================
    // AI IMPROVEMENTS
    // ==========================================

    /**
     * Demande une amélioration IA pour un cours.
     * @param {string} courseId - ID du cours
     * @param {Object} options - Options d'amélioration
     * @returns {Promise<APIResponse<{suggestion: string, improvedContent: string}>>}
     *
     * @example
     * const response = await TeacherAPI.requestAIImprovement('course1', {
     *   focus: 'clarity'
     * });
     */
    static async requestAIImprovement(courseId, options = {}) {
        if (this._isMockMode()) {
            return this._mockDelay(() => ({
                success: true,
                data: {
                    suggestion: '🤖 Amélioration suggérée : Ajouter des exemples concrets et des exercices interactifs.',
                    improvedContent: '<h2>Contenu amélioré par l\'IA</h2><p>Exemples ajoutés...</p>'
                },
                message: 'Amélioration IA générée'
            }), 1500); // Délai plus long pour simuler IA
        }

        return this.post(`/teacher/courses/${courseId}/ai-improve`, options);
    }

    // ==========================================
    // HELPERS PRIVÉS
    // ==========================================

    /**
     * Vérifie si on est en mode mock.
     * @private
     * @returns {boolean}
     */
    static _isMockMode() {
        // Accès à la config de BaseAPI (héritage)
        return true; // Forcé à true pour le wireframe
    }

    /**
     * Simule un délai (hérité de BaseAPI mais avec override possible).
     * @private
     */
    static async _mockDelay(callback, customDelay = null) {
        const delay = customDelay || (Math.random() * 300 + 100);
        await new Promise(resolve => setTimeout(resolve, delay));
        return callback();
    }
}

// ==========================================
// EXPORT
// ==========================================

export default TeacherAPI;
