/**
 * Header Component
 * Contains History, Angle Mode (DEG/RAD), and Settings toggles.
 */
export default class Header {
    constructor(element, handlers) {
        this.element = element;
        this.handlers = handlers; // { onHistoryClick, onSettingsClick, onAngleModeClick }
    }

    render(state) {
        const { angleMode } = state;

        this.element.innerHTML = `
      <div class="flex items-center justify-between px-4 py-2">
        <!-- Angle Mode Toggle -->
        <button 
          id="angle-mode-btn"
          class="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          data-action="toggle-angle"
        >
          ${angleMode}
        </button>

        <div class="flex items-center space-x-2">
          <!-- History Toggle -->
          <button 
            class="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            data-action="toggle-history"
            aria-label="History"
          >
            <span class="material-symbols-outlined text-xl">history</span>
          </button>

          <!-- Settings Toggle -->
          <button 
            class="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            data-action="toggle-settings"
            aria-label="Settings"
          >
            <span class="material-symbols-outlined text-xl">settings</span>
          </button>
        </div>
      </div>
    `;

        this._bindEvents();
    }

    _bindEvents() {
        this.element.querySelector('[data-action="toggle-angle"]').addEventListener('click', () => {
            this.handlers.onAngleModeClick();
        });

        this.element.querySelector('[data-action="toggle-history"]').addEventListener('click', () => {
            this.handlers.onHistoryClick();
        });

        this.element.querySelector('[data-action="toggle-settings"]').addEventListener('click', () => {
            this.handlers.onSettingsClick();
        });
    }
}
