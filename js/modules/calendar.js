/**
 * @fileoverview Module Calendrier Partagé - Blaiz'bot Educational Platform
 * Gère l'affichage et les interactions du calendrier pour Teacher et Student
 * 
 * @module CalendarModule
 * @version 1.0.0
 */

// ==========================================
// CONSTANTES
// ==========================================

const MONTHS_FR = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const DAYS_SHORT_FR = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

// ==========================================
// ÉTAT DU MODULE
// ==========================================

/**
 * État interne du calendrier
 * @type {Object}
 */
const CalendarState = {
    currentDate: new Date(),
    selectedRangeStart: null,
    selectedRangeEnd: null,
    events: [],
    config: {
        gridId: 'calendar-grid',
        monthYearId: 'calendar-month-year',
        mode: 'teacher', // 'teacher' ou 'student'
        onDateClick: null,
        onEventClick: null,
        filterFn: null
    }
};

// ==========================================
// FONCTIONS UTILITAIRES
// ==========================================

/**
 * Formate une date en string YYYY-MM-DD
 * @param {number} year 
 * @param {number} month - 0-indexed
 * @param {number} day 
 * @returns {string}
 */
function formatDateStr(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/**
 * Vérifie si une date est aujourd'hui
 * @param {number} day 
 * @param {number} month 
 * @param {number} year 
 * @returns {boolean}
 */
function isToday(day, month, year) {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
}

/**
 * Calcule le jour de début (lundi = 0)
 * @param {Date} firstDayOfMonth 
 * @returns {number}
 */
function getStartDayOffset(firstDayOfMonth) {
    let startDay = firstDayOfMonth.getDay() - 1;
    return startDay === -1 ? 6 : startDay;
}

// ==========================================
// RENDU DU CALENDRIER
// ==========================================

/**
 * Rend le calendrier dans le DOM
 * @param {Date} [date] - Date à afficher (par défaut: date courante)
 * @param {Object} [options] - Options de rendu
 */
function renderCalendar(date = null, options = {}) {
    const targetDate = date || CalendarState.currentDate;
    const grid = document.getElementById(CalendarState.config.gridId);
    const monthYear = document.getElementById(CalendarState.config.monthYearId);
    
    if (!grid || !monthYear) {
        console.warn('[CalendarModule] Éléments DOM non trouvés:', CalendarState.config.gridId);
        return;
    }

    // Conserver les headers
    const headers = Array.from(grid.querySelectorAll('.calendar-day-header'));
    grid.innerHTML = '';
    headers.forEach(h => grid.appendChild(h));

    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();

    // Mise à jour du titre
    monthYear.innerText = `${MONTHS_FR[month]} ${year}`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOffset = getStartDayOffset(firstDay);

    // Jours vides avant le 1er du mois
    for (let i = 0; i < startDayOffset; i++) {
        const empty = document.createElement('div');
        empty.className = 'calendar-day empty';
        empty.style.background = '#f9f9f9';
        empty.style.cursor = 'default';
        grid.appendChild(empty);
    }

    // Jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = createDayElement(day, month, year);
        grid.appendChild(dayEl);
    }
}

/**
 * Crée un élément jour du calendrier
 * @param {number} day 
 * @param {number} month 
 * @param {number} year 
 * @returns {HTMLElement}
 */
function createDayElement(day, month, year) {
    const dayEl = document.createElement('div');
    dayEl.className = 'calendar-day';
    const dateStr = formatDateStr(year, month, day);

    // Aujourd'hui
    if (isToday(day, month, year)) {
        dayEl.classList.add('today');
    }

    // Sélection de plage
    applyRangeSelection(dayEl, dateStr);

    // Événements du jour
    const eventsHtml = renderDayEvents(dateStr);

    dayEl.innerHTML = `<div class="day-number">${day}</div>${eventsHtml}`;
    
    // Gestionnaire de clic
    dayEl.onclick = () => handleDateClick(dateStr);

    return dayEl;
}

/**
 * Applique le style de sélection de plage
 * @param {HTMLElement} dayEl 
 * @param {string} dateStr 
 */
function applyRangeSelection(dayEl, dateStr) {
    const { selectedRangeStart, selectedRangeEnd } = CalendarState;

    if (selectedRangeStart && !selectedRangeEnd) {
        if (dateStr === selectedRangeStart) {
            dayEl.style.background = '#bbdefb';
        }
    } else if (selectedRangeStart && selectedRangeEnd) {
        if (dateStr >= selectedRangeStart && dateStr <= selectedRangeEnd) {
            dayEl.classList.add('selected-range');
        }
    }
}

/**
 * Rend les événements pour une date donnée
 * @param {string} dateStr - Format YYYY-MM-DD
 * @returns {string} HTML des événements
 */
function renderDayEvents(dateStr) {
    let events = CalendarState.events.filter(e => {
        if (!e || !e.startDate) return false;
        const endDate = e.endDate || e.startDate;
        return dateStr >= e.startDate && dateStr <= endDate;
    });

    // Appliquer le filtre personnalisé si défini
    if (CalendarState.config.filterFn) {
        events = events.filter(e => CalendarState.config.filterFn(e, dateStr));
    }

    // Trier par heure de début
    events.sort((a, b) => (a.startTime || '00:00').localeCompare(b.startTime || '00:00'));

    return events.map((e, index) => {
        const eventType = e.type || CalendarState.config.mode;
        let classes = `day-event ${eventType}`;
        let timeLabel = '';

        // Afficher l'heure si c'est le jour de début
        if (dateStr === e.startDate && e.startTime) {
            timeLabel = `<span style="font-size:0.7em; opacity:0.8; margin-right:3px;">${e.startTime}</span>`;
        }

        const endDate = e.endDate || e.startDate;

        // Style pour les événements multi-jours
        if (e.startDate !== endDate) {
            if (dateStr === e.startDate) classes += ' range-start';
            else if (dateStr === endDate) classes += ' range-end';
            else classes += ' range-middle';
        }

        // Préfixe selon le mode
        let titlePrefix = '';
        if (CalendarState.config.mode === 'teacher' && e.studentIds) {
            titlePrefix = e.studentIds.includes('all') ? '👥 ' : '👤 ';
        }

        // Index réel pour le callback
        const realIndex = CalendarState.events.indexOf(e);

        const timeRange = e.startTime ? (e.endTime ? `${e.startTime}-${e.endTime}` : e.startTime) : '';
        const titleText = `${e.title}${timeRange ? ` (${timeRange})` : ''}\n${e.desc || ""}`;

        return `<div class='${classes}' 
                    title='${titleText}'
                    onclick='event.stopPropagation(); CalendarModule.onEventClick(${realIndex})'>
                    ${timeLabel}${titlePrefix}${e.title}
                </div>`;
    }).join('');
}

// ==========================================
// GESTION DES INTERACTIONS
// ==========================================

/**
 * Gère le clic sur une date
 * @param {string} dateStr - Format YYYY-MM-DD
 */
function handleDateClick(dateStr) {
    const { selectedRangeStart, selectedRangeEnd } = CalendarState;

    if (!selectedRangeStart || (selectedRangeStart && selectedRangeEnd)) {
        // Nouvelle sélection
        CalendarState.selectedRangeStart = dateStr;
        CalendarState.selectedRangeEnd = null;
        renderCalendar(CalendarState.currentDate);
    } else {
        // Fin de sélection
        if (dateStr < selectedRangeStart) {
            CalendarState.selectedRangeEnd = selectedRangeStart;
            CalendarState.selectedRangeStart = dateStr;
        } else {
            CalendarState.selectedRangeEnd = dateStr;
        }

        // Callback personnalisé
        if (CalendarState.config.onDateClick) {
            CalendarState.config.onDateClick(CalendarState.selectedRangeStart, CalendarState.selectedRangeEnd);
        }
    }
}

/**
 * Change le mois affiché
 * @param {number} delta - +1 ou -1
 */
function changeMonth(delta) {
    CalendarState.currentDate.setMonth(CalendarState.currentDate.getMonth() + delta);
    renderCalendar(CalendarState.currentDate);
}

/**
 * Réinitialise la sélection de plage
 */
function clearSelection() {
    CalendarState.selectedRangeStart = null;
    CalendarState.selectedRangeEnd = null;
    renderCalendar(CalendarState.currentDate);
}

// ==========================================
// API PUBLIQUE DU MODULE
// ==========================================

/**
 * Module Calendrier - API Publique
 * @namespace CalendarModule
 */
const CalendarModule = {
    /**
     * Initialise le calendrier
     * @param {Object} config - Configuration
     * @param {string} [config.gridId='calendar-grid'] - ID de la grille
     * @param {string} [config.monthYearId='calendar-month-year'] - ID du titre mois/année
     * @param {string} [config.mode='teacher'] - Mode 'teacher' ou 'student'
     * @param {Array} [config.events=[]] - Événements initiaux
     * @param {Function} [config.onDateClick] - Callback sur sélection de dates
     * @param {Function} [config.onEventClick] - Callback sur clic événement
     * @param {Function} [config.filterFn] - Fonction de filtrage des événements
     */
    init(config = {}) {
        CalendarState.config = { ...CalendarState.config, ...config };
        CalendarState.events = config.events || [];
        CalendarState.currentDate = config.initialDate || new Date();
        
        this.render();
    },

    /**
     * Rend le calendrier
     * @param {Date} [date] - Date optionnelle
     */
    render(date = null) {
        renderCalendar(date);
    },

    /**
     * Change le mois
     * @param {number} delta - +1 ou -1
     */
    changeMonth(delta) {
        changeMonth(delta);
    },

    /**
     * Met à jour les événements
     * @param {Array} events - Nouveaux événements
     */
    setEvents(events) {
        CalendarState.events = events;
        this.render();
    },

    /**
     * Ajoute un événement
     * @param {Object} event - Événement à ajouter
     */
    addEvent(event) {
        CalendarState.events.push(event);
        this.render();
    },

    /**
     * Supprime un événement par index
     * @param {number} index - Index de l'événement
     */
    removeEvent(index) {
        CalendarState.events.splice(index, 1);
        this.render();
    },

    /**
     * Met à jour un événement
     * @param {number} index - Index de l'événement
     * @param {Object} eventData - Nouvelles données
     */
    updateEvent(index, eventData) {
        if (CalendarState.events[index]) {
            CalendarState.events[index] = { ...CalendarState.events[index], ...eventData };
            this.render();
        }
    },

    /**
     * Récupère un événement par index
     * @param {number} index 
     * @returns {Object|null}
     */
    getEvent(index) {
        return CalendarState.events[index] || null;
    },

    /**
     * Récupère tous les événements
     * @returns {Array}
     */
    getEvents() {
        return [...CalendarState.events];
    },

    /**
     * Réinitialise la sélection
     */
    clearSelection() {
        clearSelection();
    },

    /**
     * Récupère la sélection courante
     * @returns {{start: string|null, end: string|null}}
     */
    getSelection() {
        return {
            start: CalendarState.selectedRangeStart,
            end: CalendarState.selectedRangeEnd
        };
    },

    /**
     * Callback appelé lors du clic sur un événement
     * @param {number} index - Index de l'événement
     */
    onEventClick(index) {
        if (CalendarState.config.onEventClick) {
            const event = CalendarState.events[index] || null;
            CalendarState.config.onEventClick(index, event);
        }
    },

    /**
     * Définit le filtre d'événements
     * @param {Function} filterFn - Fonction de filtrage (event, dateStr) => boolean
     */
    setFilter(filterFn) {
        CalendarState.config.filterFn = filterFn;
        this.render();
    },

    /**
     * Récupère l'état courant (pour debug)
     * @returns {Object}
     */
    getState() {
        return { ...CalendarState };
    }
};

// Export pour utilisation en module ES6
export { CalendarModule, MONTHS_FR, DAYS_SHORT_FR };

// Export global pour compatibilité avec scripts inline
if (typeof window !== 'undefined') {
    window.CalendarModule = CalendarModule;
}
