/**
 * Utility to handle global keyboard events.
 */
export function setupKeyboardListeners(handler) {
    document.addEventListener('keydown', (e) => {
        const key = e.key;

        // Numbers
        if (/[0-9.]/.test(key)) {
            e.preventDefault();
            handler({ type: 'number', value: key });
            return;
        }

        // Operators
        if (['+', '-', '*', '/', '%', '^', '(', ')'].includes(key)) {
            e.preventDefault();
            handler({ type: 'operator', value: key });
            return;
        }

        // Special mappings
        if (key === 'Enter') {
            e.preventDefault();
            handler({ type: 'equals' });
        } else if (key === 'Escape') {
            e.preventDefault();
            handler({ type: 'clear' });
        } else if (key === 'Backspace') {
            e.preventDefault();
            handler({ type: 'backspace' });
        }

        // Advanced mappings (optional)
        // e.g. 's' -> sin, 'c' -> cos, etc if desired
    });
}
