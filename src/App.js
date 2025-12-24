import Calculator from './core/Calculator';
import AppState from './state/AppState';
import Display from './components/Display';
import Header from './components/Header';
import ScientificRow from './components/ScientificRow';
import Keypad from './components/Keypad';
import HistoryPanel from './components/HistoryPanel';
import SettingsPanel from './components/SettingsPanel';
import { setupKeyboardListeners } from './utils/keyboard';

export default class App {
  constructor() {
    this.calculator = new Calculator();
    this.appState = new AppState();

    // Components
    this.display = null;
    this.header = null;
    this.scientificRow = null;
    this.keypad = null;
    this.historyPanel = null;
    this.settingsPanel = null;
  }

  init() {
    // Initialize UI Containers
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = `
      <div class="flex flex-col h-screen max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden relative">
        <header id="header-container" class="z-10"></header>
        <div id="display-container" class="flex-none h-48 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"></div>
        <div id="scientific-row-container" class="flex-none bg-slate-100 dark:bg-slate-800/80 border-y border-slate-200 dark:border-slate-700"></div>
        <div id="keypad-container" class="flex-1 flex flex-col bg-slate-100 dark:bg-slate-900"></div>
        
        <!-- Panels -->
        <div id="history-panel-container" class="absolute inset-0 pointer-events-none z-50"></div>
        <div id="settings-panel-container" class="absolute inset-0 pointer-events-none z-50"></div>
      </div>
    `;

    // Initialize Panels first to pass to header handlers
    this.historyPanel = new HistoryPanel(document.getElementById('history-panel-container'), {
      onClose: () => this.historyPanel.hide(),
      onClear: () => {
        this.appState.setState({ history: [] });
      },
      onItemClick: (item) => {
        this.appState.setState({ expression: item.expression, isResultShown: false });
        this.historyPanel.hide();
      }
    });

    this.settingsPanel = new SettingsPanel(document.getElementById('settings-panel-container'), {
      onClose: () => this.settingsPanel.hide(),
      onThemeChange: () => {
        const currentTheme = this.appState.getState().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.appState.setState({ theme: newTheme });
        this._applyTheme(newTheme);
      },
      onResetApp: () => {
        localStorage.clear();
        window.location.reload();
      }
    });

    // Initialize Components with Handlers
    this.header = new Header(document.getElementById('header-container'), {
      onHistoryClick: () => this.historyPanel.toggle(),
      onSettingsClick: () => this.settingsPanel.toggle(),
      onAngleModeClick: () => {
        const currentMode = this.appState.getState().angleMode;
        const newMode = currentMode === 'DEG' ? 'RAD' : 'DEG';
        this.appState.setState({ angleMode: newMode });
        this.calculator.setAngleMode(newMode);
      }
    });

    this.display = new Display(document.getElementById('display-container'));

    this.scientificRow = new ScientificRow(document.getElementById('scientific-row-container'), {
      onFunctionClick: (val) => this.handleInput(val)
    });

    this.keypad = new Keypad(document.getElementById('keypad-container'), {
      onNumberClick: (num) => this.handleInput(num),
      onOperatorClick: (op) => this.handleInput(op),
      onClearClick: () => {
        this.appState.setState({ expression: '', result: '', isResultShown: false });
      },
      onBackspaceClick: () => {
        const current = this.appState.getState().expression;
        this.appState.setState({ expression: current.slice(0, -1) });
      },
      onEqualsClick: () => this.handleCalculation()
    });

    // Initial Render of static components
    this.scientificRow.render();
    this.keypad.render();

    // Subscribe to State Changes
    this.appState.subscribe((state) => {
      this.render(state);
    });

    // Keyboard Support
    setupKeyboardListeners((event) => {
      switch (event.type) {
        case 'number':
        case 'operator':
          this.handleInput(event.value);
          break;
        case 'equals':
          this.handleCalculation();
          break;
        case 'clear':
          this.appState.setState({ expression: '', result: '', isResultShown: false });
          break;
        case 'backspace':
          {
            const current = this.appState.getState().expression;
            this.appState.setState({ expression: current.slice(0, -1) });
          }
          break;
      }
    });

    // Load Initial State
    this.appState.loadFromStorage();
    // Force initial render
    const initialState = this.appState.getState();
    this._applyTheme(initialState.theme);
    this.render(initialState);
  }

  handleInput(val) {
    const currentState = this.appState.getState();
    if (currentState.isResultShown) {
      // If result is shown, number input starts new, operator continues
      if (/[0-9.]/.test(val)) {
        this.appState.setState({ expression: val, isResultShown: false });
      } else {
        // Operator or function
        this.appState.setState({ expression: currentState.result + val, isResultShown: false });
      }
    } else {
      this.appState.setState({ expression: currentState.expression + val });
    }
  }

  handleCalculation() {
    try {
      const expr = this.appState.getState().expression;
      if (!expr) return;

      const result = this.calculator.evaluate(expr);

      // Update History
      const currentHistory = this.appState.getState().history;
      const newHistory = [{ expression: expr, result: String(result) }, ...currentHistory].slice(0, 50); // Keep last 50

      this.appState.setState({
        result: String(result),
        isResultShown: true,
        history: newHistory
      });
    } catch (e) {
      this.appState.setState({ result: 'Error', isResultShown: true });
    }
  }

  _applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  render(state) {
    this.header.render(state);
    this.display.render(state);
    this.historyPanel.render(state);
    this.settingsPanel.render(state);
    // ScientificRow and Keypad are static mostly, but if they had state..
    // this.scientificRow.render();
    // this.keypad.render(); 
    // Usually only need to re-render if data changes. 
    // They are rendered once in init. 
    // But Header needs update for Angle Mode.
  }
}
