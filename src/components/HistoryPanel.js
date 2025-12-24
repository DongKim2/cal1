/**
 * HistoryPanel Component
 * Displays calculation history and allows restoring/clearing.
 */
export default class HistoryPanel {
    constructor(element, handlers) {
        this.element = element;
        this.handlers = handlers; // { onClose, onClear, onItemClick }
        this.isVisible = false;
    }

    show() {
        this.isVisible = true;
        this.element.classList.remove('pointer-events-none');
        this.render({}); // Re-render to update classes
    }

    hide() {
        this.isVisible = false;
        this.element.classList.add('pointer-events-none');
        this.render({});
    }

    toggle() {
        if (this.isVisible) this.hide();
        else this.show();
    }

    render(state) {
        // If state is not provided (e.g. toggle call), we might just toggle visibility classes
        // But usually we need the history data.
        // We'll rely on the main App calling render(state) whenever state changes.
        // Or explicit show/hide calls.

        // For full render including content:
        const history = state.history || [];

        const overlayClass = this.isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none';
        const panelClass = this.isVisible ? 'translate-x-0' : 'translate-x-full';

        this.element.innerHTML = `
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${overlayClass}" data-action="close"></div>
      
      <!-- Panel -->
      <div class="absolute inset-y-0 right-0 w-3/4 max-w-sm bg-white dark:bg-slate-800 shadow-2xl transform transition-transform duration-300 ${panelClass} flex flex-col">
        <div class="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 class="text-lg font-bold text-slate-900 dark:text-white">History</h2>
          <div class="flex items-center space-x-2">
            <button class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors" data-action="clear" title="Clear History">
              <span class="material-symbols-outlined text-xl">delete</span>
            </button>
            <button class="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors" data-action="close">
              <span class="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>
        
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
          ${history.length === 0 ? `
            <div class="flex flex-col items-center justify-center h-full text-slate-400">
              <span class="material-symbols-outlined text-4xl mb-2">history_toggle_off</span>
              <p>No history yet</p>
            </div>
          ` : history.map((item, index) => `
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors group" data-index="${index}">
              <div class="text-slate-500 dark:text-slate-400 text-sm mb-1 text-right font-medium">${item.expression} =</div>
              <div class="text-slate-900 dark:text-white text-xl font-bold text-right group-hover:text-primary transition-colors">${item.result}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

        this._bindEvents(history);
    }

    _bindEvents(history) {
        this.element.querySelectorAll('[data-action="close"]').forEach(el => {
            el.addEventListener('click', () => this.handlers.onClose());
        });

        this.element.querySelector('[data-action="clear"]')?.addEventListener('click', () => {
            if (confirm('Clear all history?')) {
                this.handlers.onClear();
            }
        });

        this.element.querySelectorAll('[data-index]').forEach(el => {
            el.addEventListener('click', () => {
                const index = el.dataset.index;
                this.handlers.onItemClick(history[index]);
            });
        });
    }
}
