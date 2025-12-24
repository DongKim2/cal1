import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import storage from '../storage';

describe('Storage Utility', () => {
    const TEST_KEY = 'test_key';

    beforeEach(() => {
        localStorage.clear();
        vi.restoreAllMocks(); // Restore implementations
    });

    describe('save', () => {
        it('should save data to localStorage', () => {
            const data = { foo: 'bar' };
            const result = storage.save(TEST_KEY, data);

            expect(result).toBe(true);
            expect(localStorage.getItem(TEST_KEY)).toBe(JSON.stringify(data));
        });

        it('should return false if saving fails (e.g. quota exceeded)', () => {
            // Mock setItem to throw
            vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
                throw new Error('QuotaExceededError');
            });

            const result = storage.save(TEST_KEY, { foo: 'bar' });
            expect(result).toBe(false);
        });
    });

    describe('load', () => {
        it('should load and parse data', () => {
            const data = { foo: 'bar' };
            localStorage.setItem(TEST_KEY, JSON.stringify(data));

            const result = storage.load(TEST_KEY);
            expect(result).toEqual(data);
        });

        it('should return default value if key does not exist', () => {
            const defaultValue = { default: true };
            const result = storage.load('non_existent', defaultValue);

            expect(result).toEqual(defaultValue);
        });

        it('should return default value if parsing fails', () => {
            localStorage.setItem(TEST_KEY, 'invalid json');
            const defaultValue = { default: true };

            const result = storage.load(TEST_KEY, defaultValue);
            expect(result).toEqual(defaultValue);
        });
    });

    describe('remove', () => {
        it('should remove item', () => {
            localStorage.setItem(TEST_KEY, 'data');
            storage.remove(TEST_KEY);
            expect(localStorage.getItem(TEST_KEY)).toBeNull();
        });
    });

    describe('clear', () => {
        it('should clear all items', () => {
            localStorage.setItem('key1', 'data1');
            localStorage.setItem('key2', 'data2');

            storage.clear();

            expect(localStorage.length).toBe(0);
        });
    });
});
