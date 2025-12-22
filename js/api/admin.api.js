/**
 * ADMIN.API.JS - Admin-specific API Layer
 *
 * @fileoverview API pour les opérations administrateur (gestion utilisateurs, stats, organisation).
 *
 * @author Blaiz'bot Educational Platform
 * @version 1.0.0 - Vibecoding Optimized
 */

import { BaseAPI } from './base.api.js';
import mockData from '../../data/mockData.js';

/// <reference path="../../data/types.js" />

// ==========================================
// ADMIN API CLASS
// ==========================================

/**
 * API pour toutes les opérations administrateur.
 * @extends BaseAPI
 */
export class AdminAPI extends BaseAPI {

    // ==========================================
    // USERS MANAGEMENT
    // ==========================================

    /**
     * Récupère tous les enseignants.
     * @returns {Promise<APIResponse<Teacher[]>>}
     */
    static async getTeachers() {
        if (this._isMockMode()) {
            return this._mockDelay(() => ({
                success: true,
                data: mockData.adminTeachers,
                message: 'Enseignants récupérés'
            }));
        }

        return this.get('/admin/teachers');
    }

    /**
     * Récupère tous les élèves.
     * @returns {Promise<APIResponse<Student[]>>}
     */
    static async getStudents() {
        if (this._isMockMode()) {
            return this._mockDelay(() => ({
                success: true,
                data: mockData.adminStudents,
                message: 'Élèves récupérés'
            }));
        }

        return this.get('/admin/students');
    }

    /**
     * Crée un nouvel utilisateur.
     * @param {Object} userData - Données utilisateur
     * @returns {Promise<APIResponse>}
     */
    static async createUser(userData) {
        if (this._isMockMode()) {
            return this._mockDelay(() => ({
                success: true,
                data: { id: mockData.generateId('user'), ...userData },
                message: 'Utilisateur créé'
            }));
        }

        return this.post('/admin/users', userData);
    }

    // ==========================================
    // STATISTICS
    // ==========================================

    /**
     * Récupère les statistiques globales.
     * @returns {Promise<APIResponse<ClassStatistics[]>>}
     */
    static async getStatistics() {
        if (this._isMockMode()) {
            return this._mockDelay(() => ({
                success: true,
                data: mockData.adminClassStats,
                message: 'Statistiques récupérées'
            }));
        }

        return this.get('/admin/statistics');
    }

    // ==========================================
    // SUBJECTS & PROGRAMS
    // ==========================================

    /**
     * Récupère toutes les matières.
     * @returns {Promise<APIResponse<Subject[]>>}
     */
    static async getSubjects() {
        if (this._isMockMode()) {
            return this._mockDelay(() => ({
                success: true,
                data: mockData.adminSubjects,
                message: 'Matières récupérées'
            }));
        }

        return this.get('/admin/subjects');
    }

    /**
     * Crée une nouvelle matière.
     * @param {Subject} subjectData - Données de la matière
     * @returns {Promise<APIResponse<Subject>>}
     */
    static async createSubject(subjectData) {
        if (this._isMockMode()) {
            return this._mockDelay(() => ({
                success: true,
                data: { ...subjectData },
                message: 'Matière créée'
            }));
        }

        return this.post('/admin/subjects', subjectData);
    }

    // ==========================================
    // HELPERS PRIVÉS
    // ==========================================

    /**
     * @private
     */
    static _isMockMode() {
        return true;
    }

    /**
     * @private
     */
    static async _mockDelay(callback) {
        const delay = Math.random() * 300 + 100;
        await new Promise(resolve => setTimeout(resolve, delay));
        return callback();
    }
}

export default AdminAPI;
