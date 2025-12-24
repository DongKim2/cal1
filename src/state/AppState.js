import storage from '../utils/storage';

const STORAGE_KEY = 'calculator-app-state';

class AppState {
    constructor() {
        this.state = {
            expression: '',
            result: '',
            history: [],
            theme: 'light',
            angleMode: 'DEG',
            isResultShown: false
        };
        this.listeners = new Set();
    }

    /**
     * Get current state.
     * @returns {Object}
     */
    getState() {
        return { ...this.state };
    }

    /**
     * Update state and notify listeners.
     * @param {Object} partialState 
     */
    setState(partialState) {
        this.state = { ...this.state, ...partialState };
        this.notifyListeners();
        this.saveToStorage();
    }

    /**
     * Subscribe to state changes.
     * @param {Function} listener 
     * @returns {Function} Unsubscribe function
     */
    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    /**
     * Notify all listeners of current state.
     */
    notifyListeners() {
        const currentState = this.getState();
        this.listeners.forEach(listener => listener(currentState));
    }

    /**
     * Load persisted state from local storage.
     */
    loadFromStorage() {
        const savedState = storage.load(STORAGE_KEY, {});
        if (savedState) {
            // Only restore specific fields to avoid stale logic state
            const { theme, history, angleMode } = savedState;
            const updates = {};
            if (theme) updates.theme = theme;
            if (history) updates.history = history;
            if (angleMode) updates.angleMode = angleMode;

            if (Object.keys(updates).length > 0) {
                this.setState(updates);
            }
        }
    }

    /**
     * Save persistent state to local storage.
     */
    saveToStorage() {
        const { theme, history, angleMode } = this.state;
        storage.save(STORAGE_KEY, { theme, history, angleMode });
    }
}

export default AppState;
