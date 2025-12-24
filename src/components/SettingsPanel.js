/**
 * SettingsPanel Component
 * Slide-over panel for app settings (Theme, etc).
 */
export default class SettingsPanel {
    constructor(element, handlers) {
        this.element = element;
        this.handlers = handlers; // { onClose, onThemeChange, onResetApp }
        this.isVisible = false;
    }

    show() {
        this.isVisible = true;
        this.element.classList.remove('pointer-events-none');
        this.render({});
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
        const { theme } = state || { theme: 'light' }; // default fallback

        const overlayClass = this.isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none';
        const panelClass = this.isVisible ? 'translate-x-0' : 'translate-x-full';

        this.element.innerHTML = `
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${overlayClass}" data-action="close"></div>
      
      <!-- Panel -->
      <div class="absolute inset-y-0 right-0 w-3/4 max-w-sm bg-white dark:bg-slate-800 shadow-2xl transform transition-transform duration-300 ${panelClass} flex flex-col">
        <div class="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 class="text-lg font-bold text-slate-900 dark:text-white">Settings</h2>
          <button class="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors" data-action="close">
            <span class="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
        
        <div class="p-6 space-y-8">
          <!-- Theme Setting -->
          <div>
            <h3 class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">Appearance</h3>
            <div class="flex items-center justify-between">
              <span class="text-slate-900 dark:text-white font-medium">Dark Mode</span>
              <button 
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${theme === 'dark' ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-600'}"
                data-action="toggle-theme"
              >
                <span class="sr-only">Enable Dark Mode</span>
                <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}"></span>
              </button>
            </div>
          </div>

          <!-- Danger Zone -->
          <div>
            <h3 class="text-sm font-medium text-red-500 mb-3 uppercase tracking-wider">Danger Zone</h3>
            <button 
              class="w-full py-2 px-4 border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-sm font-medium transition-colors"
              data-action="reset-app"
            >
              Reset Application
            </button>
            <p class="mt-2 text-xs text-slate-400">Clears all history and settings.</p>
          </div>
          
           <div class="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
            <p class="text-xs text-slate-400">Scientific Calculator v1.0</p>
          </div>
        </div>
      </div>
    `;

        this._bindEvents();
    }

    _bindEvents() {
        this.element.querySelectorAll('[data-action="close"]').forEach(el => {
            el.addEventListener('click', () => this.handlers.onClose());
        });

        this.element.querySelector('[data-action="toggle-theme"]').addEventListener('click', () => {
            this.handlers.onThemeChange();
        });

        this.element.querySelector('[data-action="reset-app"]').addEventListener('click', () => {
            if (confirm('Are you sure you want to reset the app? This will clear all data.')) {
                this.handlers.onResetApp();
            }
        });
    }
}
