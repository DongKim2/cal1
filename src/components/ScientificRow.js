/**
 * ScientificRow Component
 * Scrollable row of scientific function buttons.
 */
export default class ScientificRow {
    constructor(element, handlers) {
        this.element = element;
        this.handlers = handlers; // { onFunctionClick }
    }

    render() {
        const functions = [
            { label: 'sin', value: 'sin(' },
            { label: 'cos', value: 'cos(' },
            { label: 'tan', value: 'tan(' },
            { label: 'ln', value: 'ln(' },
            { label: 'log', value: 'log(' },
            { label: '(', value: '(' },
            { label: ')', value: ')' },
            { label: '^', value: '^' },
            { label: '√', value: 'sqrt(' },
            { label: '!', value: '!' },
            { label: 'π', value: 'pi' },
            { label: 'e', value: 'e' },
        ];

        this.element.innerHTML = `
      <div class="flex overflow-x-auto whitespace-nowrap px-4 py-2 space-x-2 scrollbar-hide">
        ${functions.map(fn => `
          <button 
            class="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-sm hover:bg-slate-300 dark:hover:bg-slate-600 active:scale-95 transition-all"
            data-value="${fn.value}"
          >
            ${fn.label}
          </button>
        `).join('')}
      </div>
    `;

        this._bindEvents();
    }

    _bindEvents() {
        this.element.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                this.handlers.onFunctionClick(btn.dataset.value);
            });
        });
    }
}
