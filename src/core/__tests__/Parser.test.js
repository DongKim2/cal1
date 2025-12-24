import { describe, it, expect } from 'vitest';
import Parser from '../Parser';

describe('Parser', () => {
    describe('isBalancedParentheses', () => {
        it('should return true for balanced parentheses', () => {
            expect(Parser.isBalancedParentheses('(1+2)')).toBe(true);
            expect(Parser.isBalancedParentheses('((1+2)*3)')).toBe(true);
            expect(Parser.isBalancedParentheses('')).toBe(true); // Empty is balanced
        });

        it('should return false for unbalanced parentheses', () => {
            expect(Parser.isBalancedParentheses('(1+2')).toBe(false);
            expect(Parser.isBalancedParentheses('1+2)')).toBe(false); // Extra closing
            expect(Parser.isBalancedParentheses('((1+2)')).toBe(false);
            expect(Parser.isBalancedParentheses(')(')).toBe(false); // Wrong order
        });
    });

    describe('autoCloseBrackets', () => {
        it('should close missing right parentheses', () => {
            expect(Parser.autoCloseBrackets('(1+2')).toBe('(1+2)');
            expect(Parser.autoCloseBrackets('((1')).toBe('((1))');
            expect(Parser.autoCloseBrackets('sin(30')).toBe('sin(30)');
        });

        it('should return original string if already balanced', () => {
            expect(Parser.autoCloseBrackets('(1+2)')).toBe('(1+2)');
        });
    });

    describe('validate', () => {
        it('should return true for valid expressions', () => {
            expect(Parser.validate('1+2')).toBe(true);
            expect(Parser.validate('3*(4+5)')).toBe(true);
            expect(Parser.validate('-5')).toBe(true);
            expect(Parser.validate('3.14')).toBe(true);
            expect(Parser.validate('sin(30)')).toBe(true);
        });

        it('should return false for invalid operator sequences', () => {
            expect(Parser.validate('1++2')).toBe(false);
            expect(Parser.validate('1+*2')).toBe(false);
            expect(Parser.validate('*5')).toBe(false);
            expect(Parser.validate('/')).toBe(false);
        });

        it('should return false for empty string', () => {
            expect(Parser.validate('')).toBe(false);
            expect(Parser.validate('   ')).toBe(false);
        });

        it('should return false for unbalanced parentheses if checks enabled', () => {
            // validate checks basic syntax, balanced parentheses might be a separate check or part of it.
            // Usually validate should probably fail if parentheses are strictly wrong (like `)3(`).
            // But `(3+4` might be auto-fixed before validate?
            // Let's assume validate checks strict syntax including parenthesis balance.
            expect(Parser.validate('(1+2')).toBe(false);
            expect(Parser.validate('1+2)')).toBe(false);
        });
    });
});
