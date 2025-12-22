/**
 * STUDENT.API.JS - Student-specific API Layer
 *
 * @fileoverview API pour les opérations élève (progression, cours, exercices, IA assistant).
 * Interface cohérente entre mock data et backend futur.
 *
 * @author Blaiz'bot Educational Platform
 * @version 1.0.0 - Vibecoding Optimized
 */

import { BaseAPI } from './base.api.js';
import mockData from '../../data/mockData.js';

/// <reference path="../../data/types.js" />

// ==========================================
// STUDENT API CLASS
// ==========================================

/**
 * API pour toutes les opérations élève.
 * @extends BaseAPI
 */
export class StudentAPI extends BaseAPI {

    // ==========================================
    // PROGRESS & COMPETENCIES
    // ==========================================

    /**
     * Récupère la progression de l'élève dans toutes les matières.
     * @param {string} studentId - ID de l'élève
     * @returns {Promise<APIResponse<StudentProgress[]>>}
     *
     * @example
     * const response = await StudentAPI.getProgress('student1');
     * if (response.success) {
     *   const progressData = response.data;
     * }
     */
    static async getProgress(studentId) {
        if (this._isMockMode()) {
            return this._mockDelay(() => ({
                success: true,
                data: [mockData.studentProgressSample], // Liste de progressions par matière
                message: 'Progression récupérée avec succès'
            }));
        }

        return this.get(`/student/${studentId}/progress`);
    }

    /**
     * Récupère la progression dans une matière spécifique.
     * @param {string} studentId - ID de l'élève
     * @param {string} subjectId - ID de la matière
     * @returns {Promise<APIResponse<StudentProgress>>}
     */
    static async getProgressBySubject(studentId, subjectId) {
        if (this._isMockMode()) {
            return this._mockDelay(() => ({
                success: true,
                data: mockData.studentProgressSample,
                message: `Progression en ${subjectId} récupérée`
            }));
        }

        return this.get(`/student/${studentId}/progress/${subjectId}`);
    }

    // ==========================================
    // COURSES & EXERCISES
    // ==========================================

    /**
     * Récupère les cours assignés à l'élève.
     * @param {string} studentId - ID de l'élève
     * @param {Object} [filters] - Filtres (subjectId, status, etc.)
     * @returns {Promise<APIResponse<Course[]>>}
     *
     * @example
     * const response = await StudentAPI.getCourses('student1', { subjectId: 'Maths' });
     */
    static async getCourses(studentId, filters = {}) {
        if (this._isMockMode()) {
            let courses = [...mockData.studentCourses];

            if (filters.subjectId) {
                courses = courses.filter(c => c.subjectId === filters.subjectId);
            }

            return this._mockDelay(() => ({
                success: true,
                data: courses,
                message: 'Cours récupérés avec succès'
            }));
        }

        const queryParams = new URLSearchParams(filters).toString();
        return this.get(`/student/${studentId}/courses?${queryParams}`);
    }

    /**
     * Récupère un cours spécifique.
     * @param {string} courseId - ID du cours
     * @returns {Promise<APIResponse<Course>>}
     */
    static async getCourseById(courseId) {
        if (this._isMockMode()) {
            const course = mockData.studentCourses.find(c => c.id === courseId);
            return this._mockDelay(() => ({
                success: !!course,
                data: course || null,
                message: course ? 'Cours récupéré' : 'Cours introuvable'
            }));
        }

        return this.get(`/student/courses/${courseId}`);
    }

    /**
     * Soumet une réponse à un exercice.
     * @param {string} exerciseId - ID de l'exercice
     * @param {Object} answers - Réponses de l'élève
     * @returns {Promise<APIResponse<{score: number, feedback: string}>>}
     *
     * @example
     * const response = await StudentAPI.submitExercise('ex1', {
     *   question1: 'réponse A',
     *   question2: 'réponse B'
     * });
     */
    static async submitExercise(exerciseId, answers) {
        if (this._isMockMode()) {
            const score = Math.floor(Math.random() * 40) + 60; // 60-100%
            return this._mockDelay(() => ({
                success: true,
                data: {
                    score: score,
                    feedback: score >= 80
                        ? '🎉 Excellent travail ! Continue comme ça.'
                        : score >= 60
                        ? '👍 Bon travail, mais tu peux encore progresser.'
                        : '💪 Continue tes efforts, tu vas y arriver !'
                },
                message: 'Exercice soumis avec succès'
            }), 800);
        }

        return this.post(`/student/exercises/${exerciseId}/submit`, { answers });
    }

    // ==========================================
    // LAB PROJECTS
    // ==========================================

    /**
     * Récupère les projets du Blaiz'bot Lab.
     * @param {string} studentId - ID de l'élève
     * @returns {Promise<APIResponse<LabProject[]>>}
     *
     * @example
     * const response = await StudentAPI.getLabProjects('student1');
     */
    static async getLabProjects(studentId) {
        if (this._isMockMode()) {
            return this._mockDelay(() => ({
                success: true,
                data: mockData.studentLabProjects,
                message: 'Projets Lab récupérés'
            }));
        }

        return this.get(`/student/${studentId}/lab/projects`);
    }

    /**
     * Crée un nouveau projet Lab.
     * @param {string} studentId - ID de l'élève
     * @param {Partial<LabProject>} projectData - Données du projet
     * @returns {Promise<APIResponse<LabProject>>}
     *
     * @example
     * const newProject = {
     *   title: 'Mon jeu Python',
     *   type: 'python',
     *   description: 'Un jeu de devinettes',
     *   icon: '🎮'
     * };
     * const response = await StudentAPI.createLabProject('student1', newProject);
     */
    static async createLabProject(studentId, projectData) {
        if (this._isMockMode()) {
            const newProject = {
                id: mockData.generateId('lab'),
                content: '',
                sources: [],
                chatHistory: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                isCompleted: false,
                ...projectData
            };

            mockData.studentLabProjects.push(newProject);

            return this._mockDelay(() => ({
                success: true,
                data: newProject,
                message: 'Projet créé avec succès'
            }));
        }

        return this.post(`/student/${studentId}/lab/projects`, projectData);
    }

    /**
     * Met à jour un projet Lab.
     * @param {string} projectId - ID du projet
     * @param {Partial<LabProject>} updates - Modifications
     * @returns {Promise<APIResponse<LabProject>>}
     */
    static async updateLabProject(projectId, updates) {
        if (this._isMockMode()) {
            return this._mockDelay(() => ({
                success: true,
                data: {
                    id: projectId,
                    ...updates,
                    updatedAt: new Date().toISOString()
                },
                message: 'Projet mis à jour'
            }));
        }

        return this.put(`/student/lab/projects/${projectId}`, updates);
    }

    // ==========================================
    // AI ASSISTANT (Blaiz'bot)
    // ==========================================

    /**
     * Envoie un message à l'assistant IA.
     * @param {AIRequest} request - Requête IA
     * @returns {Promise<APIResponse<AIResponse>>}
     *
     * @example
     * const response = await StudentAPI.sendAIMessage({
     *   prompt: 'Peux-tu m\'expliquer les fractions ?',
     *   context: 'course',
     *   relatedContent: 'course1',
     *   studentId: 'student1',
     *   sessionId: 'session123'
     * });
     */
    static async sendAIMessage(request) {
        if (this._isMockMode()) {
            // Simulation de réponses IA variées
            const mockResponses = [
                {
                    content: 'Bien sûr ! Les fractions représentent une partie d\'un tout. Par exemple, 1/2 signifie « un morceau sur deux morceaux égaux ». 🍕 Si tu coupes une pizza en 2 parts égales et que tu en prends 1, tu as 1/2 de la pizza !',
                    suggestions: ['Donne-moi un exemple', 'Comment additionner des fractions ?', 'Exercice pratique']
                },
                {
                    content: 'Excellente question ! Pour résoudre ce problème, commençons par identifier les données : qu\'est-ce qu\'on connaît ? Et qu\'est-ce qu\'on cherche ? 🔍',
                    suggestions: ['Montre-moi un exemple', 'Je ne comprends pas', 'Autre méthode ?']
                },
                {
                    content: 'Voici le code pour créer une page web simple :\n\n```html\n<!DOCTYPE html>\n<html>\n<head>\n  <title>Ma page</title>\n</head>\n<body>\n  <h1>Bonjour le monde !</h1>\n</body>\n</html>\n```',
                    code: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Ma page</title>\n</head>\n<body>\n  <h1>Bonjour le monde !</h1>\n</body>\n</html>',
                    suggestions: ['Ajoute du CSS', 'Explique le code', 'Autre exemple']
                }
            ];

            const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];

            return this._mockDelay(() => ({
                success: true,
                data: randomResponse,
                message: 'Réponse IA générée'
            }), 1200); // Délai réaliste pour IA
        }

        return this.post('/student/ai/chat', request);
    }

    /**
     * Génère un quiz IA sur un cours.
     * @param {string} courseId - ID du cours
     * @returns {Promise<APIResponse<Exercise>>}
     *
     * @example
     * const response = await StudentAPI.generateQuiz('course1');
     */
    static async generateQuiz(courseId) {
        if (this._isMockMode()) {
            const mockQuiz = {
                id: mockData.generateId('quiz'),
                title: 'Quiz IA - Les Fractions',
                courseId: courseId,
                questions: [
                    {
                        id: 'q1',
                        text: 'Combien vaut 1/2 + 1/4 ?',
                        type: 'mcq',
                        options: ['1/6', '2/6', '3/4', '1/8'],
                        correctAnswer: '3/4',
                        points: 2,
                        explanation: '1/2 = 2/4, donc 2/4 + 1/4 = 3/4'
                    },
                    {
                        id: 'q2',
                        text: 'Une fraction avec un dénominateur égal au numérateur vaut combien ?',
                        type: 'mcq',
                        options: ['0', '1', '2', 'Impossible'],
                        correctAnswer: '1',
                        points: 1,
                        explanation: 'Par exemple 5/5 = 1 (on prend 5 parts sur 5)'
                    }
                ],
                totalPoints: 3,
                timeLimit: 10,
                type: 'quiz'
            };

            return this._mockDelay(() => ({
                success: true,
                data: mockQuiz,
                message: 'Quiz généré par l\'IA'
            }), 1500);
        }

        return this.post(`/student/courses/${courseId}/generate-quiz`);
    }

    // ==========================================
    // MESSAGING
    // ==========================================

    /**
     * Récupère les messages de l'élève.
     * @param {string} studentId - ID de l'élève
     * @param {Object} [filters] - Filtres (isRead, senderRole, etc.)
     * @returns {Promise<APIResponse<Message[]>>}
     */
    static async getMessages(studentId, filters = {}) {
        if (this._isMockMode()) {
            return this._mockDelay(() => ({
                success: true,
                data: mockData.studentMessages,
                message: 'Messages récupérés'
            }));
        }

        const queryParams = new URLSearchParams(filters).toString();
        return this.get(`/student/${studentId}/messages?${queryParams}`);
    }

    /**
     * Envoie un message.
     * @param {string} studentId - ID de l'élève
     * @param {Partial<Message>} messageData - Données du message
     * @returns {Promise<APIResponse<Message>>}
     */
    static async sendMessage(studentId, messageData) {
        if (this._isMockMode()) {
            const newMessage = {
                id: mockData.generateId('msg'),
                senderId: studentId,
                senderName: 'Alice MARTIN', // Simulé
                senderRole: 'student',
                sentAt: new Date().toISOString(),
                isRead: false,
                ...messageData
            };

            return this._mockDelay(() => ({
                success: true,
                data: newMessage,
                message: 'Message envoyé'
            }));
        }

        return this.post(`/student/${studentId}/messages`, messageData);
    }

    // ==========================================
    // KNOWLEDGE BASE
    // ==========================================

    /**
     * Recherche dans la base de connaissances.
     * @param {string} query - Terme de recherche
     * @param {string} [type] - Type de ressource ('article', 'video', 'exercise')
     * @returns {Promise<APIResponse<any[]>>}
     *
     * @example
     * const response = await StudentAPI.searchKnowledge('pythagore', 'article');
     */
    static async searchKnowledge(query, type = null) {
        if (this._isMockMode()) {
            const mockResults = [
                {
                    id: 'kb1',
                    title: 'Le Théorème de Pythagore',
                    type: 'article',
                    subject: 'Maths',
                    content: 'Dans un triangle rectangle...',
                    relevance: 0.95
                },
                {
                    id: 'kb2',
                    title: 'Vidéo : Calculer avec Pythagore',
                    type: 'video',
                    subject: 'Maths',
                    url: 'https://example.com/video',
                    relevance: 0.87
                }
            ];

            return this._mockDelay(() => ({
                success: true,
                data: type ? mockResults.filter(r => r.type === type) : mockResults,
                message: `${mockResults.length} résultats trouvés`
            }));
        }

        const params = new URLSearchParams({ q: query });
        if (type) params.append('type', type);

        return this.get(`/student/knowledge/search?${params.toString()}`);
    }

    // ==========================================
    // HELPERS PRIVÉS
    // ==========================================

    /**
     * @private
     */
    static _isMockMode() {
        return true; // Mode mock forcé pour wireframe
    }

    /**
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

export default StudentAPI;
