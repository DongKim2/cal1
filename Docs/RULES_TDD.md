# TDD (Test-Driven Development) 규칙

## 개요
이 프로젝트의 **코어 로직**은 TDD(Test-Driven Development) 방식으로 구현합니다.

## 적용 범위

### ✅ TDD 적용 대상 (자동화 테스트 필수)
- `src/core/` - 계산 엔진, 파서, 포맷터 등 비즈니스 로직
- `src/state/` - 상태 관리 로직
- `src/utils/` - 유틸리티 함수

### ❌ TDD 제외 대상 (수동 테스트만)
- `src/components/` - UI 컴포넌트 (자동화 테스트 하지 않음)
- `src/assets/` - 스타일 및 정적 파일

> **중요**: UI 컴포넌트는 자동화 테스트를 작성하지 않습니다. 대신 브라우저에서 수동으로 기능을 확인합니다. 코어 로직만 TDD로 개발하여 테스트 커버리지 90% 이상을 목표로 합니다.

## TDD 사이클 (Red-Green-Refactor)

### 1️⃣ Red: 실패하는 테스트 작성
```javascript
// src/core/__tests__/Calculator.test.js
import { describe, it, expect } from 'vitest'
import Calculator from '../Calculator.js'

describe('Calculator', () => {
  it('should add two numbers', () => {
    const calc = new Calculator()
    expect(calc.evaluate('2 + 2')).toBe(4)
  })
})
```

**실행**: `npm run test` → 테스트 실패 확인 (Red)

### 2️⃣ Green: 테스트를 통과하는 최소한의 코드 작성
```javascript
// src/core/Calculator.js
class Calculator {
  evaluate(expression) {
    // 최소한의 구현으로 테스트 통과
    return eval(expression)
  }
}

export default Calculator
```

**실행**: `npm run test` → 테스트 통과 확인 (Green)

### 3️⃣ Refactor: 코드 개선
```javascript
// src/core/Calculator.js
import { create, all } from 'mathjs'

class Calculator {
  constructor() {
    this.math = create(all)
  }
  
  evaluate(expression) {
    // 안전하고 확장 가능한 구현으로 리팩토링
    return this.math.evaluate(expression)
  }
}

export default Calculator
```

**실행**: `npm run test` → 테스트 여전히 통과 확인

## 필수 규칙

### 1. 테스트 먼저 작성
- ❌ **잘못된 순서**: 코드 작성 → 테스트 작성
- ✅ **올바른 순서**: 테스트 작성 → 코드 작성

### 2. 한 번에 하나의 기능만 테스트
```javascript
// ❌ 나쁜 예: 여러 기능을 한 테스트에
it('should handle all operations', () => {
  expect(calc.evaluate('2 + 2')).toBe(4)
  expect(calc.evaluate('5 - 3')).toBe(2)
  expect(calc.evaluate('3 * 4')).toBe(12)
})

// ✅ 좋은 예: 각 기능을 별도 테스트로
it('should add two numbers', () => {
  expect(calc.evaluate('2 + 2')).toBe(4)
})

it('should subtract two numbers', () => {
  expect(calc.evaluate('5 - 3')).toBe(2)
})

it('should multiply two numbers', () => {
  expect(calc.evaluate('3 * 4')).toBe(12)
})
```

### 3. 테스트는 독립적이어야 함
```javascript
// ❌ 나쁜 예: 테스트 간 의존성
let calc
beforeAll(() => {
  calc = new Calculator()
  calc.setMode('DEG')
})

// ✅ 좋은 예: 각 테스트마다 독립적인 설정
beforeEach(() => {
  calc = new Calculator()
})
```

### 4. 의미 있는 테스트 이름
```javascript
// ❌ 나쁜 예
it('test1', () => { ... })
it('works', () => { ... })

// ✅ 좋은 예
it('should return 0 when dividing by zero throws error', () => { ... })
it('should convert degrees to radians in RAD mode', () => { ... })
```

## 테스트 구조 (AAA 패턴)

### Arrange-Act-Assert
```javascript
it('should calculate sine in DEG mode', () => {
  // Arrange (준비)
  const calc = new Calculator()
  calc.setAngleMode('DEG')
  
  // Act (실행)
  const result = calc.evaluate('sin(90)')
  
  // Assert (검증)
  expect(result).toBeCloseTo(1, 5)
})
```

## 테스트 커버리지 목표

### 코어 로직
- **목표**: 90% 이상
- **필수**: 80% 이상

```bash
# 커버리지 확인
npm run test:coverage
```

### 커버리지 기준
- **Statements**: 90%+
- **Branches**: 85%+
- **Functions**: 90%+
- **Lines**: 90%+

## 테스트 케이스 작성 가이드

### 1. 정상 케이스 (Happy Path)
```javascript
it('should evaluate basic arithmetic correctly', () => {
  expect(calc.evaluate('2 + 2')).toBe(4)
})
```

### 2. 경계 케이스 (Edge Cases)
```javascript
it('should handle very large numbers', () => {
  expect(calc.evaluate('999999999 * 999999999')).toBeDefined()
})

it('should handle very small numbers', () => {
  expect(calc.evaluate('0.000001 / 1000000')).toBeDefined()
})
```

### 3. 오류 케이스 (Error Cases)
```javascript
it('should throw error when dividing by zero', () => {
  expect(() => calc.evaluate('1 / 0')).toThrow()
})

it('should throw error for invalid syntax', () => {
  expect(() => calc.evaluate('2 ++ 2')).toThrow()
})
```

### 4. 특수 케이스 (Special Cases)
```javascript
it('should handle empty expression', () => {
  expect(() => calc.evaluate('')).toThrow()
})

it('should handle whitespace', () => {
  expect(calc.evaluate('  2  +  2  ')).toBe(4)
})
```

## 모킹 (Mocking) 가이드

### 외부 의존성 모킹
```javascript
import { vi } from 'vitest'

it('should save to storage', () => {
  // Arrange
  const mockSave = vi.fn()
  const storage = { save: mockSave }
  const state = new AppState(storage)
  
  // Act
  state.setState({ value: 42 })
  
  // Assert
  expect(mockSave).toHaveBeenCalledWith({ value: 42 })
})
```

## 테스트 실행 명령어

```bash
# 모든 테스트 실행
npm run test

# Watch 모드 (개발 중)
npm run test -- --watch

# 특정 파일만 테스트
npm run test Calculator.test.js

# UI 모드
npm run test:ui

# 커버리지 확인
npm run test:coverage
```

## 테스트 파일 구조

```
src/
├── core/
│   ├── Calculator.js
│   ├── Parser.js
│   ├── Formatter.js
│   └── __tests__/
│       ├── Calculator.test.js
│       ├── Parser.test.js
│       └── Formatter.test.js
├── state/
│   ├── AppState.js
│   └── __tests__/
│       └── AppState.test.js
└── utils/
    ├── storage.js
    ├── helpers.js
    └── __tests__/
        ├── storage.test.js
        └── helpers.test.js
```

## 커밋 전 체크리스트

코어 로직 변경 시 반드시 확인:

- [ ] 새로운 기능에 대한 테스트 작성
- [ ] 모든 테스트 통과 (`npm run test`)
- [ ] 커버리지 기준 충족 (`npm run test:coverage`)
- [ ] 테스트 코드 리뷰
- [ ] 리팩토링 후 테스트 재실행

## 예외 사항

다음 경우에만 TDD를 건너뛸 수 있습니다:

1. **프로토타입/POC**: 빠른 검증이 필요한 경우
2. **레거시 코드 통합**: 기존 코드와의 통합 시
3. **긴급 핫픽스**: 프로덕션 긴급 수정 (단, 이후 테스트 추가 필수)

**주의**: 예외 사용 시 반드시 팀과 논의하고 문서화

## 참고 자료

- [Vitest Documentation](https://vitest.dev/)
- [Test-Driven Development by Example (Kent Beck)](https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530)
- [JavaScript Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

---

**규칙 버전**: 1.0  
**작성일**: 2025-12-23  
**적용 범위**: 코어 로직 (`src/core/`, `src/state/`, `src/utils/`)
