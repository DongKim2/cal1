import { describe, it, expect, beforeEach, vi } from 'vitest';
import AppState from '../AppState';
import storage from '../../utils/storage';

// Mock storage
vi.mock('../../utils/storage', () => ({
    default: {
        save: vi.fn(),
        load: vi.fn(),
    }
}));

describe('AppState', () => {
    let appState;

    beforeEach(() => {
        vi.clearAllMocks();
        // Reset singleton instance if possible or just create new if not strictly enforced singleton in test
        // For testability, usually we might expose a reset or just test the instance.
        // Assuming we export an instance or a class. Implementation plan said "Singleton class".
        // Let's assume we export the class and we can instantiate it, 
        // OR we export a singleton instance and have a method to reset it.
        // Let's implement as a class that is exported, and main.js creates the single instance.
        appState = new AppState();
    });

    it('should initialize with default state', () => {
        expect(appState.getState()).toEqual({
            expression: '',
            result: '',
            history: [],
            theme: 'light',
            angleMode: 'DEG',
            isResultShown: false // helper to know if current display is a result
        });
    });

    it('should update state and notify listeners', () => {
        const listener = vi.fn();
        appState.subscribe(listener);

        appState.setState({ expression: '1+2' });

        expect(appState.getState().expression).toBe('1+2');
        expect(listener).toHaveBeenCalledWith(appState.getState());
    });

    it('should partial update state', () => {
        appState.setState({ expression: '5', angleMode: 'RAD' });

        expect(appState.getState().expression).toBe('5');
        expect(appState.getState().angleMode).toBe('RAD');
        expect(appState.getState().theme).toBe('light'); // Unchanged
    });

    it('should load persisted state from storage', () => {
        const savedState = {
            theme: 'dark',
            history: [{ expression: '2+2', result: '4' }],
            angleMode: 'RAD'
        };
        storage.load.mockReturnValue(savedState);

        appState.loadFromStorage();

        const state = appState.getState();
        expect(state.theme).toBe('dark');
        expect(state.history).toHaveLength(1);
        expect(state.angleMode).toBe('RAD');
        // expression/result should usually reset or load if we want restore session
        // implementation decision: usually calculator starts fresh expression but keeps settings/history
    });

    it('should save persistent state to storage on update', () => {
        appState.setState({ theme: 'dark' });

        // Check if storage.save was called with correct data
        expect(storage.save).toHaveBeenCalled();
        const [key, value] = storage.save.mock.calls[0];
        expect(key).toBe('calculator-app-state');
        expect(value.theme).toBe('dark');
    });
});
