/**
 * BASE.API.JS - Base API Layer for Backend Communication
 *
 * @fileoverview Couche d'abstraction API permettant de passer facilement
 * des données mock à un vrai backend sans modifier le code métier.
 *
 * @author Blaiz'bot Educational Platform
 * @version 1.0.0 - Vibecoding Optimized
 *
 * @example
 * // En mode mock (actuellement)
 * const students = await BaseAPI.get('/students');
 *
 * // Plus tard avec backend réel
 * // Le code appelant reste identique, seule cette couche change
 */

/// <reference path="../../data/types.js" />

// ==========================================
// CONFIGURATION
// ==========================================

/**
 * Configuration de l'API.
 * @type {Object}
 */
const API_CONFIG = {
    // En mode développement : utiliser les données mock
    USE_MOCK_DATA: true,

    // URL du backend (pour future intégration)
    BASE_URL: 'http://localhost:3000/api',

    // Timeout des requêtes (ms)
    TIMEOUT: 10000,

    // Headers par défaut
    DEFAULT_HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

// ==========================================
// BASE API CLASS
// ==========================================

/**
 * Classe de base pour toutes les interactions API.
 * Gère le mode mock et les vrais appels HTTP.
 */
export class BaseAPI {
    /**
     * Effectue une requête GET.
     * @param {string} endpoint - Endpoint de l'API (ex: '/students')
     * @param {Object} [options] - Options de la requête
     * @returns {Promise<APIResponse>} Réponse de l'API
     *
     * @example
     * const response = await BaseAPI.get('/students');
     * if (response.success) {
     * }
     */
    static async get(endpoint, options = {}) {
        if (API_CONFIG.USE_MOCK_DATA) {
            return this._mockDelay(() => this._mockResponse(endpoint, 'GET', options));
        }

        return this._fetchWithTimeout(
            `${API_CONFIG.BASE_URL}${endpoint}`,
            {
                method: 'GET',
                headers: { ...API_CONFIG.DEFAULT_HEADERS, ...options.headers }
            }
        );
    }

    /**
     * Effectue une requête POST.
     * @param {string} endpoint - Endpoint de l'API
     * @param {Object} data - Données à envoyer
     * @param {Object} [options] - Options de la requête
     * @returns {Promise<APIResponse>} Réponse de l'API
     *
     * @example
     * const response = await BaseAPI.post('/courses', { title: 'Nouveau cours' });
     */
    static async post(endpoint, data, options = {}) {
        if (API_CONFIG.USE_MOCK_DATA) {
            return this._mockDelay(() => this._mockResponse(endpoint, 'POST', { data }));
        }

        return this._fetchWithTimeout(
            `${API_CONFIG.BASE_URL}${endpoint}`,
            {
                method: 'POST',
                headers: { ...API_CONFIG.DEFAULT_HEADERS, ...options.headers },
                body: JSON.stringify(data)
            }
        );
    }

    /**
     * Effectue une requête PUT (mise à jour).
     * @param {string} endpoint - Endpoint de l'API
     * @param {Object} data - Données à mettre à jour
     * @param {Object} [options] - Options de la requête
     * @returns {Promise<APIResponse>} Réponse de l'API
     *
     * @example
     * const response = await BaseAPI.put('/courses/123', { title: 'Titre modifié' });
     */
    static async put(endpoint, data, options = {}) {
        if (API_CONFIG.USE_MOCK_DATA) {
            return this._mockDelay(() => this._mockResponse(endpoint, 'PUT', { data }));
        }

        return this._fetchWithTimeout(
            `${API_CONFIG.BASE_URL}${endpoint}`,
            {
                method: 'PUT',
                headers: { ...API_CONFIG.DEFAULT_HEADERS, ...options.headers },
                body: JSON.stringify(data)
            }
        );
    }

    /**
     * Effectue une requête DELETE.
     * @param {string} endpoint - Endpoint de l'API
     * @param {Object} [options] - Options de la requête
     * @returns {Promise<APIResponse>} Réponse de l'API
     *
     * @example
     * const response = await BaseAPI.delete('/courses/123');
     */
    static async delete(endpoint, options = {}) {
        if (API_CONFIG.USE_MOCK_DATA) {
            return this._mockDelay(() => this._mockResponse(endpoint, 'DELETE', options));
        }

        return this._fetchWithTimeout(
            `${API_CONFIG.BASE_URL}${endpoint}`,
            {
                method: 'DELETE',
                headers: { ...API_CONFIG.DEFAULT_HEADERS, ...options.headers }
            }
        );
    }

    // ==========================================
    // PRIVATE HELPERS
    // ==========================================

    /**
     * Fetch avec timeout pour éviter les requêtes bloquées.
     * @private
     * @param {string} url - URL de la requête
     * @param {Object} options - Options fetch
     * @returns {Promise<APIResponse>}
     */
    static async _fetchWithTimeout(url, options) {
        const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timeout')), API_CONFIG.TIMEOUT)
        );

        try {
            const response = await Promise.race([
                fetch(url, options),
                timeout
            ]);

            const data = await response.json();

            return {
                success: response.ok,
                data: response.ok ? data : null,
                message: response.ok ? 'Success' : data.message || 'Error',
                error: response.ok ? null : {
                    code: response.status,
                    message: data.message || 'Unknown error',
                    details: data.details || null
                }
            };
        } catch (error) {
            return {
                success: false,
                data: null,
                message: 'Network error',
                error: {
                    code: 0,
                    message: error.message,
                    details: null
                }
            };
        }
    }

    /**
     * Simule un délai réseau pour les données mock.
     * @private
     * @param {Function} callback - Fonction à exécuter après le délai
     * @returns {Promise<APIResponse>}
     */
    static async _mockDelay(callback) {
        const delay = Math.random() * 300 + 100; // 100-400ms
        await new Promise(resolve => setTimeout(resolve, delay));
        return callback();
    }

    /**
     * Génère une réponse mock selon l'endpoint.
     * CETTE FONCTION SERA REMPLACÉE PAR DE VRAIS APPELS API.
     *
     * @private
     * @param {string} endpoint - Endpoint appelé
     * @param {string} method - Méthode HTTP
     * @param {Object} options - Options de la requête
     * @returns {APIResponse} Réponse simulée
     */
    static _mockResponse(endpoint, method, options) {

        // Réponse générique de succès
        // Les API spécifiques (teacher.api.js, etc.) surchargent ce comportement
        return {
            success: true,
            data: { message: `Mock response for ${method} ${endpoint}` },
            message: 'Success (mock data)',
            error: null
        };
    }

    /**
     * Active/désactive le mode mock.
     * @param {boolean} useMock - true pour utiliser les données mock
     */
    static setMockMode(useMock) {
        API_CONFIG.USE_MOCK_DATA = useMock;
    }

    /**
     * Définit l'URL du backend.
     * @param {string} url - URL de base de l'API
     */
    static setBaseURL(url) {
        API_CONFIG.BASE_URL = url;
    }
}

// ==========================================
// EXPORT
// ==========================================

export default BaseAPI;
