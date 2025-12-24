/**
 * Display Component
 * Renders the current expression and result.
 */
export default class Display {
    constructor(element) {
        this.element = element;
    }

    render(state) {
        const { expression, result, isResultShown } = state;
        this.element.innerHTML = `
      <div class="flex flex-col items-end justify-end h-full p-6 space-y-2 select-text">
        <!-- Expression -->
        <div class="text-slate-500 dark:text-slate-400 text-xl font-medium tracking-wide break-all text-right w-full transition-all duration-300 ${isResultShown ? 'scale-90 origin-right opacity-70' : 'scale-100 opacity-100'}">
          ${expression || '&nbsp;'}
        </div>
        
        <!-- Result / Current Input -->
        <div class="text-slate-900 dark:text-white text-5xl font-bold tracking-tight break-all text-right w-full transition-all duration-300 ${isResultShown ? 'scale-100' : 'scale-100'}">
          ${isResultShown ? (result || '0') : (expression || '0')}
        </div>
      </div>
    `;
    }
}
