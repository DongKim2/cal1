import { create, all } from 'mathjs';

/**
 * Calculator module for evaluating mathematical expressions.
 */
export default class Calculator {
    constructor() {
        this.math = create(all);
        this.angleMode = 'DEG'; // Default to degrees
        this._configureMath();
    }

    /**
     * Configures mathjs based on current settings.
     */
    _configureMath() {
        // There isn't a global "mode" in simple mathjs, but we can override trig functions
        // or wrap them. However, a cleaner way for a simple calculator is to
        // just swap the implementation or append ' deg' / ' rad' units if we were using units.
        // BUT, standard scientific calculators usually treat inputs as numbers, not units.
        // mathjs trig functions take radians by default.
        // To support degrees, we can use the config option if available or wrap functions.
        // NOTE: mathjs doesn't have a simple "switch to degrees" global state for numbers without units.
        // Common workaround: replace sin(x) with sin(x deg) or convert input.
        // A more robust way for a calculator app:
        // We will import specific functions and override them?
        // Or just append 'deg' to arguments of trig functions in the string before evaluation if mode is DEG.
        // Let's try the replacer approach in preprocess, or use a custom scope.

        // Actually, mathjs has a trick:
        // math.evaluate('sin(45 deg)') works.
        // So if mode is DEG, we can inject 'deg' into the expression for trig functions.
        // Or we can define custom functions like `sin` that satisfy the mode.

        const replacements = {};

        // We will handle unit conversion in evaluate/preprocess or define custom functions.
        // Let's define custom functions in the import scope.

        // For this implementation, I will rely on replacing standard trig calls 
        // to include units if in DEG mode, or use a transform.
        // Simpler: Just define `sin`, `cos`, `tan` in the scope passed to evaluate.
    }

    /**
     * Sets the angle mode.
     * @param {'DEG'|'RAD'} mode 
     */
    setAngleMode(mode) {
        if (mode === 'DEG' || mode === 'RAD') {
            this.angleMode = mode;
        }
    }

    /**
     * Preprocesses the expression to replace visual operators and handle implicit multiplication/units.
     * @param {string} expression 
     * @returns {string}
     */
    preprocess(expression) {
        if (!expression) return '';

        let expr = expression;

        // Replace visual operators
        expr = expr.replace(/×/g, '*');
        expr = expr.replace(/÷/g, '/');
        expr = expr.replace(/π/g, 'pi');
        expr = expr.replace(/√\(/g, 'sqrt('); // If user has √ symbol

        // Handle angle mode for trig functions
        // Regex to find sin(...), cos(...), tan(...)
        // If DEG, we want to ensure the argument is treated as degrees.
        // Approach: Replace `sin(` with `sinDeg(` and implement sinDeg, etc.
        // OR simpler: append ' deg' to numbers inside? No, that's hard to parse.
        // Better: Helper functions in scope.

        return expr;
    }

    /**
     * Evaluates the expression.
     * @param {string} expression 
     * @returns {number}
     */
    evaluate(expression) {
        try {
            if (!expression) return 0;

            const processedExpr = this.preprocess(expression);

            // Define a scope with custom trig functions if needed, or simple mathjs usage
            // For DEG support, let's create custom functions.
            const scope = {
                sin: (x) => this.angleMode === 'DEG' ? this.math.sin(this.math.unit(x, 'deg')) : this.math.sin(x),
                cos: (x) => this.angleMode === 'DEG' ? this.math.cos(this.math.unit(x, 'deg')) : this.math.cos(x),
                tan: (x) => this.angleMode === 'DEG' ? this.math.tan(this.math.unit(x, 'deg')) : this.math.tan(x),
                // mathjs has log (natural) and log10. Most sci calcs: log is base 10, ln is base e.
                // mathjs: log(x) is ln(x), log(x, base) is log base. log10(x) is base 10.
                // We want 'log' in string to map to base 10 usually? 
                // Based on tests: log(100) -> 2. So we need `log` to be `log10`.
                // and `ln` to be `log`.
                log: (x, base) => {
                    if (base) return this.math.log(x, base);
                    return this.math.log10(x);
                },
                ln: (x) => this.math.log(x),
                e: this.math.e,
                pi: this.math.pi
            };

            const result = this.math.evaluate(processedExpr, scope);

            // Handle precision issues (e.g. 0.1 + 0.2)
            // mathjs usually handles this well with BigNumbers if configured, 
            // but here we are using default numbers.
            // We can use format to strip tiny errors if needed, but returning the number is standard.
            // The tests use `toBeCloseTo`, so standard float behavior is acceptable.

            return result;
        } catch (error) {
            // Check for division by zero resulting in Infinity (mathjs does this by default for default number type)
            // If usage of BigNumber, it might throw.
            // We catch errors and rethrow or return NaN/Infinity as needed.
            throw error;
        }
    }
}
