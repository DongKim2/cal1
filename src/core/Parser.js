/**
 * Parser module for validating and processing mathematical expressions.
 */
export default class Parser {
    /**
     * Checks if the expression is valid for evaluation.
     * @param {string} expression
     * @returns {boolean}
     */
    static validate(expression) {
        if (!expression || typeof expression !== 'string' || expression.trim() === '') {
            return false;
        }

        // Check for unbalanced parentheses (strict check for valid syntax)
        // Note: autoCloseBrackets can be used before validation if we want to be lenient,
        // but validate() usually checks the current state.
        // The test expects (1+2 to be false.
        if (!this.isBalancedParentheses(expression)) {
            return false;
        }

        // Check for invalid operator sequences
        // Reject any sequence of 2 or more operators.
        // This is a simplified validation. For negative numbers support in complex ways (like 5*-2),
        // we might need to relax this, but for now we follow strict operator rules.
        if (/[\+\-\*\/%]{2,}/.test(expression)) {
            return false;
        }

        // Check for starting with invalid operators (*, /, %)
        // Allow + or - at start (unary)
        if (/^[\*\/%)]/.test(expression)) {
            return false;
        }

        // Check for ending with any operator
        if (/[\+\-\*\/%]$/.test(expression)) {
            return false;
        }

        // Check for empty parentheses ()
        if (/\(\)/.test(expression)) {
            return false;
        }

        return true;
    }

    /**
     * Checks if parentheses are balanced.
     * @param {string} expression
     * @returns {boolean}
     */
    static isBalancedParentheses(expression) {
        if (!expression) return true;

        let count = 0;
        for (let i = 0; i < expression.length; i++) {
            const char = expression[i];
            if (char === '(') count++;
            else if (char === ')') count--;

            if (count < 0) return false;
        }
        return count === 0;
    }

    /**
     * Automatically closes missing right parentheses.
     * @param {string} expression
     * @returns {string}
     */
    static autoCloseBrackets(expression) {
        if (!expression) return expression;

        let count = 0;
        for (let i = 0; i < expression.length; i++) {
            const char = expression[i];
            if (char === '(') count++;
            else if (char === ')') count--;
        }

        if (count > 0) {
            return expression + ')'.repeat(count);
        }
        return expression;
    }
}
