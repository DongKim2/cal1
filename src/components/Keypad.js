/**
 * Keypad Component
 * Main numeric and operator keypad.
 */
export default class Keypad {
    constructor(element, handlers) {
        this.element = element;
        this.handlers = handlers; // { onNumberClick, onOperatorClick, onEqualsClick, onClearClick, onBackspaceClick }
    }

    render() {
        this.element.innerHTML = `
      <div class="grid grid-cols-4 gap-3 p-4 flex-1">
        <!-- Row 1 -->
        <button class="col-span-1 p-4 rounded-2xl bg-slate-200 dark:bg-slate-700 text-red-500 font-bold text-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors" data-action="clear">AC</button>
        <button class="col-span-1 p-4 rounded-2xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors" data-action="backspace">
          <span class="material-symbols-outlined">backspace</span>
        </button>
        <button class="col-span-1 p-4 rounded-2xl bg-slate-200 dark:bg-slate-700 text-primary font-bold text-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors" data-operator="%">%</button>
        <button class="col-span-1 p-4 rounded-2xl bg-slate-200 dark:bg-slate-700 text-primary font-bold text-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors" data-operator="÷">÷</button>

        <!-- Row 2 -->
        <button class="p-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-2xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors" data-number="7">7</button>
        <button class="p-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-2xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors" data-number="8">8</button>
        <button class="p-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-2xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors" data-number="9">9</button>
        <button class="p-4 rounded-2xl bg-slate-200 dark:bg-slate-700 text-primary font-bold text-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors" data-operator="×">×</button>

        <!-- Row 3 -->
        <button class="p-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-2xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors" data-number="4">4</button>
        <button class="p-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-2xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors" data-number="5">5</button>
        <button class="p-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-2xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors" data-number="6">6</button>
        <button class="p-4 rounded-2xl bg-slate-200 dark:bg-slate-700 text-primary font-bold text-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors" data-operator="-">-</button>

        <!-- Row 4 -->
        <button class="p-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-2xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors" data-number="1">1</button>
        <button class="p-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-2xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors" data-number="2">2</button>
        <button class="p-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-2xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors" data-number="3">3</button>
        <button class="p-4 rounded-2xl bg-slate-200 dark:bg-slate-700 text-primary font-bold text-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors" data-operator="+">+</button>

        <!-- Row 5 -->
        <button class="col-span-1 p-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-2xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors" data-number="0">0</button>
        <button class="p-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-2xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors" data-number=".">.</button>
        <button class="col-span-2 p-4 rounded-2xl bg-primary text-white font-bold text-2xl shadow-lg shadow-primary/30 hover:bg-primary-hover active:scale-95 transition-all" data-action="equals">=</button>
      </div>
    `;

        this._bindEvents();
    }

    _bindEvents() {
        this.element.querySelectorAll('[data-number]').forEach(btn => {
            btn.addEventListener('click', () => this.handlers.onNumberClick(btn.dataset.number));
        });

        this.element.querySelectorAll('[data-operator]').forEach(btn => {
            btn.addEventListener('click', () => this.handlers.onOperatorClick(btn.dataset.operator));
        });

        this.element.querySelector('[data-action="clear"]').addEventListener('click', () => this.handlers.onClearClick());
        this.element.querySelector('[data-action="backspace"]').addEventListener('click', () => this.handlers.onBackspaceClick());
        this.element.querySelector('[data-action="equals"]').addEventListener('click', () => this.handlers.onEqualsClick());
    }
}
