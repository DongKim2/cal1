# SOLID 원칙 가이드

## 개요
이 프로젝트는 **SOLID 원칙**을 따라 구현합니다. SOLID는 객체지향 설계의 5가지 핵심 원칙으로, 유지보수 가능하고 확장 가능한 코드를 작성하는 데 도움을 줍니다.

## SOLID 원칙

### 1️⃣ SRP (Single Responsibility Principle) - 단일 책임 원칙

> 클래스는 단 하나의 책임만 가져야 하며, 변경의 이유도 단 하나여야 한다.

#### ❌ 나쁜 예: 여러 책임을 가진 클래스
```javascript
class Calculator {
  evaluate(expression) {
    // 계산 로직
    const result = this.math.evaluate(expression)
    
    // 포맷팅 로직 (다른 책임!)
    return result.toLocaleString('en-US')
  }
  
  saveToHistory(expression, result) {
    // 저장 로직 (또 다른 책임!)
    localStorage.setItem('history', JSON.stringify({ expression, result }))
  }
}
```

#### ✅ 좋은 예: 책임 분리
```javascript
// 계산만 담당
class Calculator {
  evaluate(expression) {
    return this.math.evaluate(expression)
  }
}

// 포맷팅만 담당
class Formatter {
  formatNumber(num) {
    return num.toLocaleString('en-US')
  }
}

// 저장만 담당
class HistoryStorage {
  save(entry) {
    localStorage.setItem('history', JSON.stringify(entry))
  }
}
```

### 2️⃣ OCP (Open-Closed Principle) - 개방-폐쇄 원칙

> 소프트웨어 엔티티는 확장에는 열려 있어야 하고, 수정에는 닫혀 있어야 한다.

#### ❌ 나쁜 예: 새로운 기능 추가 시 기존 코드 수정 필요
```javascript
class Calculator {
  evaluate(expression, mode) {
    if (mode === 'DEG') {
      this.math.config({ angleUnit: 'deg' })
    } else if (mode === 'RAD') {
      this.math.config({ angleUnit: 'rad' })
    } else if (mode === 'GRAD') {  // 새 모드 추가 시 수정 필요
      this.math.config({ angleUnit: 'grad' })
    }
    return this.math.evaluate(expression)
  }
}
```

#### ✅ 좋은 예: 전략 패턴으로 확장 가능
```javascript
// 각도 모드 전략 인터페이스
class AngleModeStrategy {
  configure(math) {
    throw new Error('Must implement configure()')
  }
}

class DegreeMode extends AngleModeStrategy {
  configure(math) {
    math.config({ angleUnit: 'deg' })
  }
}

class RadianMode extends AngleModeStrategy {
  configure(math) {
    math.config({ angleUnit: 'rad' })
  }
}

// 새 모드 추가 시 기존 코드 수정 없이 확장
class GradMode extends AngleModeStrategy {
  configure(math) {
    math.config({ angleUnit: 'grad' })
  }
}

class Calculator {
  constructor(angleModeStrategy) {
    this.angleModeStrategy = angleModeStrategy
    this.angleModeStrategy.configure(this.math)
  }
  
  evaluate(expression) {
    return this.math.evaluate(expression)
  }
}
```

### 3️⃣ LSP (Liskov Substitution Principle) - 리스코프 치환 원칙

> 서브타입은 언제나 기반 타입으로 교체할 수 있어야 한다.

#### ❌ 나쁜 예: 서브타입이 기반 타입의 계약을 위반
```javascript
class Calculator {
  evaluate(expression) {
    return this.math.evaluate(expression)  // 숫자 반환
  }
}

class ScientificCalculator extends Calculator {
  evaluate(expression) {
    // 계약 위반: 객체를 반환
    return {
      result: this.math.evaluate(expression),
      steps: ['step1', 'step2']
    }
  }
}
```

#### ✅ 좋은 예: 서브타입이 기반 타입의 계약 준수
```javascript
class Calculator {
  evaluate(expression) {
    return this.math.evaluate(expression)
  }
}

class ScientificCalculator extends Calculator {
  evaluate(expression) {
    // 동일한 계약 준수: 숫자 반환
    return this.math.evaluate(expression)
  }
  
  // 추가 기능은 별도 메서드로
  evaluateWithSteps(expression) {
    return {
      result: this.evaluate(expression),
      steps: this.calculateSteps(expression)
    }
  }
}
```

### 4️⃣ ISP (Interface Segregation Principle) - 인터페이스 분리 원칙

> 클라이언트는 자신이 사용하지 않는 메서드에 의존하지 않아야 한다.

#### ❌ 나쁜 예: 비대한 인터페이스
```javascript
class CalculatorInterface {
  evaluate(expression) {}
  formatResult(result) {}
  saveToHistory(entry) {}
  loadFromHistory() {}
  exportToCSV() {}
  importFromCSV() {}
  // 모든 기능이 하나의 인터페이스에...
}

// 기본 계산기는 대부분의 메서드를 사용하지 않음
class BasicCalculator extends CalculatorInterface {
  evaluate(expression) {
    return this.math.evaluate(expression)
  }
  
  // 사용하지 않는 메서드들을 억지로 구현
  formatResult(result) { throw new Error('Not supported') }
  saveToHistory(entry) { throw new Error('Not supported') }
  // ...
}
```

#### ✅ 좋은 예: 작고 구체적인 인터페이스
```javascript
// 계산 인터페이스
class Evaluator {
  evaluate(expression) {
    throw new Error('Must implement evaluate()')
  }
}

// 포맷팅 인터페이스
class ResultFormatter {
  format(result) {
    throw new Error('Must implement format()')
  }
}

// 저장 인터페이스
class HistoryManager {
  save(entry) {
    throw new Error('Must implement save()')
  }
  load() {
    throw new Error('Must implement load()')
  }
}

// 필요한 인터페이스만 구현
class BasicCalculator extends Evaluator {
  evaluate(expression) {
    return this.math.evaluate(expression)
  }
}

class AdvancedCalculator extends Evaluator {
  constructor(formatter, historyManager) {
    super()
    this.formatter = formatter
    this.historyManager = historyManager
  }
  
  evaluate(expression) {
    const result = this.math.evaluate(expression)
    this.historyManager.save({ expression, result })
    return this.formatter.format(result)
  }
}
```

### 5️⃣ DIP (Dependency Inversion Principle) - 의존성 역전 원칙

> 고수준 모듈은 저수준 모듈에 의존해서는 안 되며, 둘 다 추상화에 의존해야 한다.

#### ❌ 나쁜 예: 고수준 모듈이 저수준 모듈에 직접 의존
```javascript
class Calculator {
  constructor() {
    // 구체적인 구현에 직접 의존
    this.storage = new LocalStorage()
  }
  
  saveResult(result) {
    this.storage.save(result)
  }
}

class LocalStorage {
  save(data) {
    localStorage.setItem('data', JSON.stringify(data))
  }
}
```

#### ✅ 좋은 예: 추상화에 의존
```javascript
// 추상화 (인터페이스)
class Storage {
  save(data) {
    throw new Error('Must implement save()')
  }
  load() {
    throw new Error('Must implement load()')
  }
}

// 구체적인 구현들
class LocalStorage extends Storage {
  save(data) {
    localStorage.setItem('data', JSON.stringify(data))
  }
  
  load() {
    return JSON.parse(localStorage.getItem('data'))
  }
}

class SessionStorage extends Storage {
  save(data) {
    sessionStorage.setItem('data', JSON.stringify(data))
  }
  
  load() {
    return JSON.parse(sessionStorage.getItem('data'))
  }
}

// 고수준 모듈은 추상화에 의존
class Calculator {
  constructor(storage) {  // 의존성 주입
    this.storage = storage
  }
  
  saveResult(result) {
    this.storage.save(result)
  }
}

// 사용
const calc1 = new Calculator(new LocalStorage())
const calc2 = new Calculator(new SessionStorage())
```

## 프로젝트 적용 예시

### 계산기 아키텍처 (SOLID 적용)

```javascript
// 1. SRP: 각 클래스는 단일 책임
class Calculator {
  constructor(evaluator, formatter) {
    this.evaluator = evaluator
    this.formatter = formatter
  }
  
  calculate(expression) {
    const result = this.evaluator.evaluate(expression)
    return this.formatter.format(result)
  }
}

// 2. OCP: 확장 가능한 평가기
class MathEvaluator {
  evaluate(expression) {
    return this.math.evaluate(expression)
  }
}

// 3. LSP: 서브타입이 기반 타입 대체 가능
class ScientificEvaluator extends MathEvaluator {
  evaluate(expression) {
    // 전처리 추가하지만 반환 타입은 동일
    const processed = this.preprocess(expression)
    return super.evaluate(processed)
  }
}

// 4. ISP: 작은 인터페이스
class NumberFormatter {
  format(num) {
    return num.toLocaleString('en-US')
  }
}

// 5. DIP: 의존성 주입
const calculator = new Calculator(
  new ScientificEvaluator(),
  new NumberFormatter()
)
```

## 실전 가이드라인

### 클래스 설계 체크리스트

설계 시 다음 질문을 자문:

1. **SRP**: 이 클래스가 변경되어야 하는 이유가 하나뿐인가?
2. **OCP**: 새 기능 추가 시 기존 코드를 수정하지 않아도 되는가?
3. **LSP**: 서브타입이 기반 타입을 완전히 대체할 수 있는가?
4. **ISP**: 클라이언트가 사용하지 않는 메서드를 강제하지 않는가?
5. **DIP**: 구체적인 구현이 아닌 추상화에 의존하는가?

### 코드 리뷰 체크리스트

- [ ] 각 클래스/함수가 단일 책임을 가지는가?
- [ ] 새 기능 추가 시 기존 코드 수정이 최소화되는가?
- [ ] 상속 관계가 올바른가? (LSP 준수)
- [ ] 인터페이스가 너무 크지 않은가?
- [ ] 의존성 주입을 사용하는가?

### 리팩토링 신호

다음 징후가 보이면 SOLID 원칙 위반 가능성:

- 🚨 클래스가 100줄 이상
- 🚨 메서드가 20줄 이상
- 🚨 if-else 체인이 3단계 이상
- 🚨 클래스 이름에 "And", "Manager", "Handler" 등
- 🚨 테스트 작성이 어려움
- 🚨 모킹이 과도하게 필요함

## 예외 사항

다음 경우 SOLID 원칙을 엄격히 적용하지 않을 수 있습니다:

1. **유틸리티 함수**: 순수 함수 모음
2. **상수/설정**: 단순 데이터 객체
3. **프로토타입**: 빠른 검증이 우선

**주의**: 프로덕션 코드는 반드시 SOLID 원칙 준수

## 참고 자료

- [Clean Code (Robert C. Martin)](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [SOLID Principles in JavaScript](https://blog.bitsrc.io/solid-principles-every-developer-should-know-b3bfa96bb688)
- [Design Patterns (Gang of Four)](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612)

---

**규칙 버전**: 1.0  
**작성일**: 2025-12-23  
**적용 범위**: 전체 프로젝트 (특히 `src/core/`, `src/state/`)
