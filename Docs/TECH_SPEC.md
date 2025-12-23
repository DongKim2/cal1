# Tech Spec: 공학용 전자계산기 웹앱

## 1. 문서 개요

### 1.1 목적
본 문서는 공학용 전자계산기 웹 애플리케이션의 기술적 구현 방법, 아키텍처, 기술 스택, 그리고 개발 가이드라인을 정의합니다.

### 1.2 범위
- 프론트엔드 아키텍처 설계
- 기술 스택 선정 및 정당화
- 모듈 구조 및 컴포넌트 설계
- 계산 엔진 설계
- 상태 관리 전략
- 빌드 및 배포 전략

### 1.3 관련 문서
- [PRD.md](./PRD.md) - 제품 요구사항 문서
- Design Reference: `design/code.html`, `design/screen.png`

---

## 2. 기술 스택

### 2.1 코어 기술

#### 2.1.1 프론트엔드 프레임워크
**선택: Vanilla JavaScript (ES6+)**

**선정 이유**:
- ✅ 단순한 SPA 구조로 프레임워크 오버헤드 불필요
- ✅ 빠른 초기 로딩 속도
- ✅ 번들 크기 최소화
- ✅ 학습 곡선 낮음
- ✅ 브라우저 호환성 우수

**대안 고려**:
- React: 과도한 복잡성, 번들 크기 증가
- Vue: 단순 계산기에는 과도한 기능
- Svelte: 컴파일 단계 추가, 생태계 작음

#### 2.1.2 빌드 도구
**선택: Vite**

**선정 이유**:
- ✅ 빠른 개발 서버 (ESM 기반)
- ✅ 최적화된 프로덕션 빌드
- ✅ 간단한 설정
- ✅ HMR (Hot Module Replacement) 지원
- ✅ 플러그인 생태계 풍부

**설정**:
```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
```

#### 2.1.3 CSS 프레임워크
**선택: Tailwind CSS v3**

**선정 이유**:
- ✅ 디자인 파일이 이미 Tailwind 사용
- ✅ 유틸리티 우선 접근법으로 빠른 개발
- ✅ PurgeCSS로 최적화된 번들 크기
- ✅ 다크 모드 내장 지원
- ✅ 커스터마이징 용이

**커스텀 설정**:
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#2b6cee',
        'background-light': '#f6f6f8',
        'background-dark': '#101622',
        'surface-dark': '#1e293b',
        'surface-darker': '#111827',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'body': ['Noto Sans', 'sans-serif']
      },
      borderRadius: {
        'DEFAULT': '0.25rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        'full': '9999px'
      },
    },
  },
  plugins: [],
}
```

### 2.2 외부 라이브러리

#### 2.2.1 수식 파싱 및 평가
**선택: math.js**

**선정 이유**:
- ✅ 안전한 수식 평가 (eval 사용 안 함)
- ✅ 풍부한 수학 함수 지원
- ✅ 단위 및 복소수 지원 (향후 확장)
- ✅ 활발한 유지보수
- ✅ TypeScript 지원

**설치**:
```bash
npm install mathjs
```

**사용 예시**:
```javascript
import { create, all } from 'mathjs'

const math = create(all, {
  number: 'BigNumber',
  precision: 64
})

// DEG 모드 설정
math.config({ angleUnit: 'deg' })

// 계산
const result = math.evaluate('sin(45) * 120 + 500 / 2')
```

#### 2.2.2 폰트 및 아이콘
**선택**:
- **Google Fonts**: Space Grotesk, Noto Sans
- **Material Symbols**: Outlined 스타일

**로딩 전략**:
```html
<!-- Preconnect for performance -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Noto+Sans:wght@400;500;700&display=swap" rel="stylesheet">

<!-- Icons -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
```

### 2.3 개발 도구

#### 2.3.1 코드 품질
- **ESLint**: JavaScript 린팅
- **Prettier**: 코드 포맷팅
- **Stylelint**: CSS 린팅 (선택적)

#### 2.3.2 테스팅
- **Vitest**: 단위 테스트 (Vite 네이티브)
- **Playwright**: E2E 테스트 (선택적)

#### 2.3.3 버전 관리
- **Git**: 소스 코드 관리
- **GitHub**: 원격 저장소
- **GitHub Actions**: CI/CD

---

## 3. 아키텍처 설계

### 3.1 프로젝트 구조

```
cal1/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── main.css          # Tailwind 진입점
│   ├── components/
│   │   ├── Display.js            # 디스플레이 컴포넌트
│   │   ├── Header.js             # 상단 바 컴포넌트
│   │   ├── Keypad.js             # 키패드 컴포넌트
│   │   ├── ScientificRow.js      # 공학용 함수 행
│   │   ├── HistoryPanel.js       # 히스토리 패널
│   │   └── SettingsPanel.js      # 설정 패널
│   ├── core/
│   │   ├── Calculator.js         # 계산 엔진
│   │   ├── Parser.js             # 수식 파서
│   │   └── Formatter.js          # 숫자 포맷터
│   ├── utils/
│   │   ├── storage.js            # 로컬 스토리지 유틸
│   │   ├── constants.js          # 상수 정의
│   │   └── helpers.js            # 헬퍼 함수
│   ├── state/
│   │   └── AppState.js           # 전역 상태 관리
│   ├── main.js                   # 앱 진입점
│   └── App.js                    # 메인 앱 클래스
├── index.html                    # HTML 진입점
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.json
├── .prettierrc
├── .gitignore
└── README.md
```

### 3.2 아키텍처 패턴

#### 3.2.1 MVC 변형 (Model-View-Controller)
```
┌─────────────────────────────────────────┐
│              View Layer                 │
│  (Components: Display, Keypad, etc.)    │
└──────────────┬──────────────────────────┘
               │ Events
               ↓
┌─────────────────────────────────────────┐
│          Controller Layer               │
│        (App.js, AppState.js)            │
└──────────────┬──────────────────────────┘
               │ Commands
               ↓
┌─────────────────────────────────────────┐
│           Model Layer                   │
│  (Calculator, Parser, Formatter)        │
└─────────────────────────────────────────┘
```

**책임 분리**:
- **View**: UI 렌더링, 사용자 입력 수신
- **Controller**: 이벤트 처리, 상태 업데이트
- **Model**: 비즈니스 로직, 계산 수행

#### 3.2.2 컴포넌트 기반 설계
각 컴포넌트는 독립적인 모듈로 구현:

```javascript
// 컴포넌트 인터페이스
class Component {
  constructor(container, state) {
    this.container = container
    this.state = state
  }
  
  render() {
    // DOM 생성 및 업데이트
  }
  
  bindEvents() {
    // 이벤트 리스너 등록
  }
  
  destroy() {
    // 정리 작업
  }
}
```

### 3.3 상태 관리

#### 3.3.1 AppState 클래스
```javascript
// src/state/AppState.js
class AppState {
  constructor() {
    this.state = {
      // 계산 상태
      currentInput: '',
      expression: '',
      result: null,
      
      // UI 상태
      angleMode: 'DEG', // 'DEG' | 'RAD'
      theme: 'dark',    // 'light' | 'dark' | 'system'
      
      // 히스토리
      history: [],
      
      // 설정
      decimalPlaces: 10,
      
      // 패널 상태
      showHistory: false,
      showSettings: false,
    }
    
    this.listeners = []
  }
  
  // 상태 업데이트
  setState(updates) {
    this.state = { ...this.state, ...updates }
    this.notifyListeners()
  }
  
  // 구독
  subscribe(listener) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }
  
  // 알림
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state))
  }
  
  // 로컬 스토리지 동기화
  saveToStorage() {
    localStorage.setItem('calculator-state', JSON.stringify({
      angleMode: this.state.angleMode,
      theme: this.state.theme,
      history: this.state.history,
      decimalPlaces: this.state.decimalPlaces,
    }))
  }
  
  loadFromStorage() {
    const saved = localStorage.getItem('calculator-state')
    if (saved) {
      const data = JSON.parse(saved)
      this.setState(data)
    }
  }
}

export default new AppState()
```

---

## 4. 핵심 모듈 설계

### 4.1 계산 엔진 (Calculator.js)

#### 4.1.1 책임
- 수식 평가
- 각도 모드 처리
- 오류 처리
- 결과 포맷팅

#### 4.1.2 구현
```javascript
// src/core/Calculator.js
import { create, all } from 'mathjs'

class Calculator {
  constructor() {
    this.math = create(all, {
      number: 'BigNumber',
      precision: 64
    })
    
    this.setAngleMode('deg')
  }
  
  setAngleMode(mode) {
    this.angleMode = mode.toLowerCase()
    this.math.config({ angleUnit: this.angleMode })
  }
  
  evaluate(expression) {
    try {
      // 수식 전처리
      const processed = this.preprocessExpression(expression)
      
      // 계산
      const result = this.math.evaluate(processed)
      
      // 결과 변환
      return this.formatResult(result)
    } catch (error) {
      throw new Error(this.getErrorMessage(error))
    }
  }
  
  preprocessExpression(expr) {
    // × → *
    // ÷ → /
    // − → -
    return expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/π/g, 'pi')
  }
  
  formatResult(result) {
    // BigNumber를 일반 숫자로 변환
    const num = Number(result)
    
    // 정밀도 처리
    if (Math.abs(num) < 1e-10) return 0
    if (Math.abs(num) > 1e15) return num.toExponential(10)
    
    // 소수점 처리
    return parseFloat(num.toPrecision(12))
  }
  
  getErrorMessage(error) {
    if (error.message.includes('division by zero')) {
      return '0으로 나눌 수 없습니다'
    }
    if (error.message.includes('Undefined symbol')) {
      return '잘못된 수식입니다'
    }
    return '계산 오류가 발생했습니다'
  }
}

export default Calculator
```

### 4.2 수식 파서 (Parser.js)

#### 4.2.1 책임
- 입력 검증
- 괄호 균형 확인
- 수식 정규화

#### 4.2.2 구현
```javascript
// src/core/Parser.js
class Parser {
  static validate(expression) {
    // 빈 수식
    if (!expression.trim()) {
      return { valid: false, error: '수식을 입력하세요' }
    }
    
    // 괄호 균형
    if (!this.isBalancedParentheses(expression)) {
      return { valid: false, error: '괄호가 올바르지 않습니다' }
    }
    
    // 연속된 연산자
    if (/[+\-×÷]{2,}/.test(expression)) {
      return { valid: false, error: '연산자가 연속되었습니다' }
    }
    
    return { valid: true }
  }
  
  static isBalancedParentheses(expr) {
    let count = 0
    for (const char of expr) {
      if (char === '(') count++
      if (char === ')') count--
      if (count < 0) return false
    }
    return count === 0
  }
  
  static autoCloseBrackets(expr) {
    const open = (expr.match(/\(/g) || []).length
    const close = (expr.match(/\)/g) || []).length
    return expr + ')'.repeat(Math.max(0, open - close))
  }
}

export default Parser
```

### 4.3 숫자 포맷터 (Formatter.js)

#### 4.3.1 책임
- 천 단위 구분 쉼표
- 소수점 자릿수 제한
- 과학적 표기법 변환

#### 4.3.2 구현
```javascript
// src/core/Formatter.js
class Formatter {
  static formatNumber(num, decimalPlaces = 10) {
    if (num === null || num === undefined) return ''
    
    const number = Number(num)
    
    // NaN 처리
    if (isNaN(number)) return 'Error'
    
    // Infinity 처리
    if (!isFinite(number)) return '∞'
    
    // 과학적 표기법 (매우 크거나 작은 수)
    if (Math.abs(number) > 1e15 || (Math.abs(number) < 1e-6 && number !== 0)) {
      return number.toExponential(6)
    }
    
    // 일반 숫자
    const formatted = number.toLocaleString('en-US', {
      maximumFractionDigits: decimalPlaces,
      minimumFractionDigits: 0
    })
    
    return formatted
  }
  
  static formatExpression(expr) {
    // 수식 표시용 포맷팅
    return expr
      .replace(/\*/g, '×')
      .replace(/\//g, '÷')
      .replace(/-/g, '−')
      .replace(/pi/g, 'π')
  }
}

export default Formatter
```

---

## 5. 컴포넌트 설계

### 5.1 Display 컴포넌트

```javascript
// src/components/Display.js
import Formatter from '../core/Formatter.js'

class Display {
  constructor(container, state) {
    this.container = container
    this.state = state
    this.render()
  }
  
  render() {
    const { expression, result } = this.state.state
    
    this.container.innerHTML = `
      <section class="flex-1 flex flex-col justify-end px-6 pb-6 text-right break-words relative">
        <!-- Input Expression -->
        <div class="text-slate-500 dark:text-slate-400 text-xl font-normal mb-2 opacity-80 overflow-hidden text-ellipsis whitespace-nowrap">
          ${Formatter.formatExpression(expression) || '0'}
        </div>
        
        <!-- Result -->
        <h1 class="text-slate-900 dark:text-white text-6xl font-bold tracking-tight leading-none mb-4">
          ${result !== null ? Formatter.formatNumber(result) : '0'}
        </h1>
      </section>
    `
  }
  
  update(state) {
    this.state = state
    this.render()
  }
}

export default Display
```

### 5.2 Keypad 컴포넌트

```javascript
// src/components/Keypad.js
class Keypad {
  constructor(container, onButtonClick) {
    this.container = container
    this.onButtonClick = onButtonClick
    this.render()
    this.bindEvents()
  }
  
  render() {
    this.container.innerHTML = `
      <section class="bg-white dark:bg-[#151c2b] rounded-t-[2rem] shadow-[0_-4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)] pb-8 pt-6 px-4 flex flex-col gap-4 h-auto max-h-[65vh]">
        <!-- Scientific Functions Row -->
        <div id="scientific-row" class="flex gap-3 overflow-x-auto hide-scrollbar px-2 pb-2">
          ${this.renderScientificButtons()}
        </div>
        
        <!-- Divider -->
        <div class="h-px w-full bg-slate-200 dark:bg-white/5 mx-2"></div>
        
        <!-- Main Keypad Grid -->
        <div id="main-keypad" class="grid grid-cols-4 gap-3 px-2 flex-1">
          ${this.renderMainButtons()}
        </div>
      </section>
    `
  }
  
  renderScientificButtons() {
    const buttons = ['√', 'π', '^', '!', 'sin', 'cos', 'tan', 'log', 'ln', '(', ')']
    return buttons.map(btn => `
      <button data-value="${btn}" class="shrink-0 h-10 px-4 rounded-full bg-slate-100 dark:bg-surface-dark text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-200 dark:hover:bg-primary/20 transition-colors">
        ${btn}
      </button>
    `).join('')
  }
  
  renderMainButtons() {
    const layout = [
      ['AC', 'backspace', '%', '÷'],
      ['7', '8', '9', '×'],
      ['4', '5', '6', '−'],
      ['1', '2', '3', '+'],
      ['0', '.', '=', '='] // = spans 2 columns
    ]
    
    return layout.map((row, rowIndex) => {
      return row.map((btn, colIndex) => {
        if (rowIndex === 4 && colIndex === 2) return '' // Skip duplicate =
        
        const isEquals = btn === '='
        const isAC = btn === 'AC'
        const isBackspace = btn === 'backspace'
        const isOperator = ['÷', '×', '−', '+'].includes(btn)
        const isFunction = ['%'].includes(btn)
        
        let btnClass = 'h-16 rounded-2xl font-bold text-2xl transition-colors flex items-center justify-center'
        
        if (isEquals) {
          btnClass += ' col-span-2 bg-primary text-white text-3xl shadow-lg shadow-primary/30 hover:bg-blue-600'
        } else if (isAC) {
          btnClass += ' bg-slate-100 dark:bg-surface-dark text-red-500 dark:text-red-400 text-xl hover:bg-slate-200 dark:hover:bg-surface-darker'
        } else if (isBackspace || isFunction) {
          btnClass += ' bg-slate-100 dark:bg-surface-dark text-primary text-xl hover:bg-slate-200 dark:hover:bg-surface-darker'
        } else if (isOperator) {
          btnClass += ' bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/20 dark:hover:bg-primary/30'
        } else {
          btnClass += ' bg-white dark:bg-[#1a2332] text-slate-900 dark:text-white font-semibold shadow-sm hover:bg-gray-50 dark:hover:bg-[#253045]'
        }
        
        const content = isBackspace 
          ? '<span class="material-symbols-outlined" style="font-size: 24px;">backspace</span>'
          : btn
        
        return `<button data-value="${btn}" class="${btnClass}">${content}</button>`
      }).join('')
    }).join('')
  }
  
  bindEvents() {
    this.container.addEventListener('click', (e) => {
      const button = e.target.closest('button')
      if (button) {
        const value = button.dataset.value
        if (value) {
          this.onButtonClick(value)
        }
      }
    })
  }
}

export default Keypad
```

### 5.3 Header 컴포넌트

```javascript
// src/components/Header.js
class Header {
  constructor(container, state, callbacks) {
    this.container = container
    this.state = state
    this.callbacks = callbacks
    this.render()
    this.bindEvents()
  }
  
  render() {
    const { angleMode } = this.state.state
    
    this.container.innerHTML = `
      <header class="flex items-center justify-between px-6 py-4 bg-transparent z-10">
        <button id="history-btn" class="text-slate-900 dark:text-white flex items-center justify-center p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <span class="material-symbols-outlined">history</span>
        </button>
        
        <div class="flex gap-1 bg-gray-200 dark:bg-surface-dark p-1 rounded-lg">
          <button id="deg-btn" class="px-3 py-1 rounded text-xs font-medium transition-colors ${angleMode === 'DEG' ? 'bg-white dark:bg-primary text-slate-900 dark:text-white font-bold shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
            DEG
          </button>
          <button id="rad-btn" class="px-3 py-1 rounded text-xs font-medium transition-colors ${angleMode === 'RAD' ? 'bg-white dark:bg-primary text-slate-900 dark:text-white font-bold shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
            RAD
          </button>
        </div>
        
        <button id="settings-btn" class="text-slate-900 dark:text-white flex items-center justify-center p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <span class="material-symbols-outlined">settings</span>
        </button>
      </header>
    `
  }
  
  bindEvents() {
    document.getElementById('history-btn').addEventListener('click', () => {
      this.callbacks.onHistoryClick()
    })
    
    document.getElementById('settings-btn').addEventListener('click', () => {
      this.callbacks.onSettingsClick()
    })
    
    document.getElementById('deg-btn').addEventListener('click', () => {
      this.callbacks.onAngleModeChange('DEG')
    })
    
    document.getElementById('rad-btn').addEventListener('click', () => {
      this.callbacks.onAngleModeChange('RAD')
    })
  }
  
  update(state) {
    this.state = state
    this.render()
    this.bindEvents()
  }
}

export default Header
```

---

## 6. 데이터 흐름

### 6.1 사용자 입력 처리

```
User Click Button
      ↓
Keypad Component (capture event)
      ↓
App.handleButtonClick()
      ↓
AppState.setState() (update expression)
      ↓
Notify all subscribers
      ↓
Display.update() (re-render)
```

### 6.2 계산 실행

```
User Click "="
      ↓
App.handleEquals()
      ↓
Parser.validate(expression)
      ↓
Calculator.evaluate(expression)
      ↓
AppState.setState() (update result, add to history)
      ↓
Storage.save() (persist history)
      ↓
Display.update() (show result)
```

---

## 7. 로컬 스토리지 스키마

### 7.1 저장 데이터 구조

```javascript
{
  "calculator-state": {
    "angleMode": "DEG",           // "DEG" | "RAD"
    "theme": "dark",              // "light" | "dark" | "system"
    "decimalPlaces": 10,          // 1-15
    "history": [
      {
        "id": "uuid-1",
        "expression": "sin(45) × 120",
        "result": 84.85,
        "timestamp": 1703318400000,
        "angleMode": "DEG"
      },
      // ... more entries
    ]
  }
}
```

### 7.2 Storage 유틸리티

```javascript
// src/utils/storage.js
const STORAGE_KEY = 'calculator-state'

export const Storage = {
  save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  },
  
  load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Failed to load from localStorage:', error)
      return null
    }
  },
  
  clear() {
    localStorage.removeItem(STORAGE_KEY)
  }
}
```

---

## 8. 테마 관리

### 8.1 다크 모드 구현

```javascript
// src/utils/theme.js
export class ThemeManager {
  constructor() {
    this.theme = this.getInitialTheme()
    this.apply()
  }
  
  getInitialTheme() {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    
    // System preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light'
  }
  
  setTheme(theme) {
    this.theme = theme
    this.apply()
    localStorage.setItem('theme', theme)
  }
  
  apply() {
    if (this.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
  
  toggle() {
    this.setTheme(this.theme === 'dark' ? 'light' : 'dark')
  }
}
```

---

## 9. 키보드 지원

### 9.1 키 매핑

```javascript
// src/utils/keyboard.js
export const KeyboardMap = {
  // Numbers
  '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
  '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
  
  // Operators
  '+': '+',
  '-': '−',
  '*': '×',
  '/': '÷',
  '%': '%',
  
  // Special
  '.': '.',
  '(': '(',
  ')': ')',
  'Enter': '=',
  'Escape': 'AC',
  'Backspace': 'backspace',
  'Delete': 'AC',
}

export function setupKeyboardListeners(onKeyPress) {
  document.addEventListener('keydown', (e) => {
    const key = KeyboardMap[e.key]
    if (key) {
      e.preventDefault()
      onKeyPress(key)
    }
  })
}
```

---

## 10. 성능 최적화

### 10.1 최적화 전략

#### 10.1.1 번들 크기 최적화
- Tailwind CSS PurgeCSS 활성화
- Tree-shaking (Vite 자동)
- 코드 스플리팅 (필요시)

#### 10.1.2 렌더링 최적화
- Virtual DOM 없이 직접 DOM 조작
- 변경된 부분만 업데이트
- 디바운싱/쓰로틀링 (필요시)

#### 10.1.3 로딩 최적화
```html
<!-- Preload critical resources -->
<link rel="preload" href="/src/main.js" as="script">
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Space+Grotesk..." as="style">

<!-- Async non-critical resources -->
<link rel="stylesheet" href="..." media="print" onload="this.media='all'">
```

### 10.2 성능 목표
- **First Contentful Paint (FCP)**: < 1.5s
- **Time to Interactive (TTI)**: < 2.5s
- **Total Bundle Size**: < 150KB (gzipped)
- **Lighthouse Score**: > 90

---

## 11. 오류 처리

### 11.1 오류 유형

```javascript
// src/utils/errors.js
export class CalculatorError extends Error {
  constructor(message, type) {
    super(message)
    this.type = type
    this.name = 'CalculatorError'
  }
}

export const ErrorTypes = {
  SYNTAX_ERROR: 'SYNTAX_ERROR',
  DIVISION_BY_ZERO: 'DIVISION_BY_ZERO',
  INVALID_INPUT: 'INVALID_INPUT',
  OVERFLOW: 'OVERFLOW',
  UNDEFINED: 'UNDEFINED',
}

export const ErrorMessages = {
  [ErrorTypes.SYNTAX_ERROR]: '수식이 올바르지 않습니다',
  [ErrorTypes.DIVISION_BY_ZERO]: '0으로 나눌 수 없습니다',
  [ErrorTypes.INVALID_INPUT]: '잘못된 입력입니다',
  [ErrorTypes.OVERFLOW]: '숫자가 너무 큽니다',
  [ErrorTypes.UNDEFINED]: '정의되지 않은 값입니다',
}
```

### 11.2 전역 오류 핸들러

```javascript
// src/main.js
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
  // 사용자에게 친화적인 메시지 표시
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
})
```

---

## 12. 빌드 및 배포

### 12.1 개발 환경

```bash
# 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프리뷰
npm run preview

# 린트
npm run lint

# 테스트
npm run test
```

### 12.2 프로덕션 빌드

```json
// package.json
{
  "name": "scientific-calculator",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .js",
    "format": "prettier --write \"src/**/*.{js,css}\"",
    "test": "vitest"
  },
  "dependencies": {
    "mathjs": "^12.0.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.55.0",
    "prettier": "^3.1.0",
    "vitest": "^1.0.0"
  }
}
```

### 12.3 GitHub Pages 배포

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 13. 테스팅 전략

### 13.1 단위 테스트

```javascript
// src/core/__tests__/Calculator.test.js
import { describe, it, expect } from 'vitest'
import Calculator from '../Calculator.js'

describe('Calculator', () => {
  const calc = new Calculator()
  
  it('should evaluate basic arithmetic', () => {
    expect(calc.evaluate('2 + 2')).toBe(4)
    expect(calc.evaluate('10 - 5')).toBe(5)
    expect(calc.evaluate('3 * 4')).toBe(12)
    expect(calc.evaluate('15 / 3')).toBe(5)
  })
  
  it('should handle trigonometric functions in DEG mode', () => {
    calc.setAngleMode('deg')
    expect(calc.evaluate('sin(90)')).toBeCloseTo(1, 5)
    expect(calc.evaluate('cos(0)')).toBeCloseTo(1, 5)
  })
  
  it('should throw error for division by zero', () => {
    expect(() => calc.evaluate('1 / 0')).toThrow()
  })
})
```

### 13.2 E2E 테스트 (선택적)

```javascript
// tests/e2e/calculator.spec.js
import { test, expect } from '@playwright/test'

test('basic calculation flow', async ({ page }) => {
  await page.goto('http://localhost:3000')
  
  // Click buttons
  await page.click('button[data-value="2"]')
  await page.click('button[data-value="+"]')
  await page.click('button[data-value="2"]')
  await page.click('button[data-value="="]')
  
  // Check result
  const result = await page.textContent('h1')
  expect(result).toBe('4')
})
```

---

## 14. 보안 고려사항

### 14.1 XSS 방지
- `innerHTML` 사용 시 사용자 입력 이스케이프
- math.js 사용으로 `eval()` 회피
- CSP (Content Security Policy) 헤더 설정

```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
               font-src 'self' https://fonts.gstatic.com;">
```

### 14.2 입력 검증
- 모든 사용자 입력 검증
- 수식 길이 제한 (최대 500자)
- 허용된 문자만 입력 가능

---

## 15. 향후 확장 계획

### 15.1 Phase 2 기능
- 역삼각함수 (asin, acos, atan)
- 쌍곡선 함수 (sinh, cosh, tanh)
- 행렬 계산 (기본)
- 단위 변환

### 15.2 Phase 3 기능
- PWA (Progressive Web App) 지원
- 오프라인 모드
- 그래프 그리기
- 수식 공유 기능

### 15.3 기술 부채 관리
- TypeScript 마이그레이션 고려
- 컴포넌트 테스트 커버리지 80% 이상
- 성능 모니터링 도구 통합

---

## 16. 참고 자료

### 16.1 라이브러리 문서
- [math.js](https://mathjs.org/docs/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/)

### 16.2 디자인 리소스
- [Material Symbols](https://fonts.google.com/icons)
- [Google Fonts](https://fonts.google.com/)

### 16.3 모범 사례
- [Web.dev Performance](https://web.dev/performance/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript Clean Code](https://github.com/ryanmcdermott/clean-code-javascript)

---

**문서 버전**: 1.0  
**작성일**: 2025-12-23  
**작성자**: Engineering Team  
**승인자**: -  
**다음 리뷰**: 구현 시작 전
