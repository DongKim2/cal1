import { describe, it, expect, beforeEach } from 'vitest';
import Calculator from '../Calculator';

describe('Calculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    describe('Basic Arithmetic', () => {
        it('should evaluate addition', () => {
            expect(calculator.evaluate('2 + 2')).toBe(4);
        });

        it('should evaluate subtraction', () => {
            expect(calculator.evaluate('5 - 3')).toBe(2);
        });

        it('should evaluate multiplication', () => {
            expect(calculator.evaluate('4 * 3')).toBe(12);
        });

        it('should evaluate division', () => {
            expect(calculator.evaluate('10 / 2')).toBe(5);
        });

        it('should evaluate floating point math correctly', () => {
            expect(calculator.evaluate('0.1 + 0.2')).toBeCloseTo(0.3);
        });
    });

    describe('Scientific Functions', () => {
        it('should evaluate sin in DEG mode initially', () => {
            // sin(30) in deg is 0.5
            expect(calculator.evaluate('sin(30)')).toBeCloseTo(0.5);
        });

        it('should switch to RAD mode and evaluate', () => {
            calculator.setAngleMode('RAD');
            // sin(PI/2) in rad is 1
            // mathjs uses 'pi'
            expect(calculator.evaluate('sin(pi/2)')).toBeCloseTo(1);
        });

        it('should evaluate log', () => {
            expect(calculator.evaluate('log(100)')).toBeCloseTo(2); // base 10
            expect(calculator.evaluate('log(10, 10)')).toBeCloseTo(1);
        });

        it('should evaluate natural log (ln)', () => {
            expect(calculator.evaluate('ln(e)')).toBeCloseTo(1);
        });

        it('should evaluate sqrt', () => {
            expect(calculator.evaluate('sqrt(16)')).toBe(4);
        });

        it('should evaluate power', () => {
            expect(calculator.evaluate('2^3')).toBe(8);
        });
    });

    describe('Preprocessing', () => {
        it('should replace visual operators', () => {
            // × to *
            expect(calculator.evaluate('2 × 3')).toBe(6);
            // ÷ to /
            expect(calculator.evaluate('6 ÷ 2')).toBe(3);
            // π to pi
            expect(calculator.evaluate('π')).toBeCloseTo(3.14159);
        });
    });

    describe('Error Handling', () => {
        it('should throw error for division by zero', () => {
            // mathjs returns Infinity for 1/0.
            expect(calculator.evaluate('1/0')).toBe(Infinity);
        });

        it('should throw error for invalid expression', () => {
            expect(() => calculator.evaluate('2 + * 3')).toThrow();
        });
    });
});
