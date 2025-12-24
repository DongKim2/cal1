/**
 * Utility for handling localStorage operations safely.
 */
const storage = {
    /**
     * Save data to localStorage.
     * @param {string} key 
     * @param {any} value 
     * @returns {boolean} true if successful, false otherwise.
     */
    save(key, value) {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
            return true;
        } catch (error) {
            console.warn(`Error saving to localStorage key "${key}":`, error);
            return false;
        }
    },

    /**
     * Load data from localStorage.
     * @param {string} key 
     * @param {any} defaultValue 
     * @returns {any} Stored value or default value.
     */
    load(key, defaultValue = null) {
        try {
            const serializedValue = localStorage.getItem(key);
            if (serializedValue === null) {
                return defaultValue;
            }
            return JSON.parse(serializedValue);
        } catch (error) {
            console.warn(`Error loading from localStorage key "${key}":`, error);
            return defaultValue;
        }
    },

    /**
     * Remove item from localStorage.
     * @param {string} key 
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.warn(`Error removing from localStorage key "${key}":`, error);
        }
    },

    /**
     * Clear all app data from localStorage.
     */
    clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.warn(`Error clearing localStorage:`, error);
        }
    }
};

export default storage;
