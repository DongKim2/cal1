# GitHub Issues for Scientific Calculator Project

이 문서는 프로젝트의 각 Phase를 GitHub Issues로 등록하기 위한 템플릿입니다.

---

## Issue #1: [Phase 2.1] Formatter 모듈 구현 (TDD)

### 📋 작업 배경

공학용 계산기에서 계산 결과를 사용자 친화적으로 표시하기 위해 숫자 포맷팅 기능이 필요합니다. 천 단위 구분 쉼표, 소수점 자릿수 제한, 특수 케이스(NaN, Infinity) 처리 등을 담당하는 Formatter 모듈을 TDD 방식으로 구현합니다.

### 🎯 작업 내용

#### 테스트 작성 (Red)
- [ ] `src/core/__tests__/Formatter.test.js` 파일 생성
- [ ] 기본 숫자 포맷팅 테스트
  - [ ] 천 단위 구분 쉼표 테스트 (1000 → "1,000")
  - [ ] 소수점 자릿수 제한 테스트 (3.14159265 → "3.14159265")
  - [ ] 0 처리 테스트 (0 → "0")
- [ ] 특수 케이스 테스트
  - [ ] NaN 처리 테스트 (NaN → "Error")
  - [ ] Infinity 처리 테스트 (Infinity → "∞")
  - [ ] 매우 큰 수 테스트 (1e16 → 과학적 표기법)
  - [ ] 매우 작은 수 테스트 (1e-7 → 과학적 표기법)
- [ ] 수식 포맷팅 테스트
  - [ ] 연산자 변환 테스트 (* → ×, / → ÷)
  - [ ] 상수 변환 테스트 (pi → π)

#### 구현 (Green)
- [ ] `src/core/Formatter.js` 파일 생성
- [ ] `formatNumber(num, decimalPlaces)` 메서드 구현
  - [ ] 기본 숫자 포맷팅 로직
  - [ ] NaN/Infinity 처리
  - [ ] 과학적 표기법 변환
- [ ] `formatExpression(expr)` 메서드 구현
  - [ ] 연산자 변환 로직
  - [ ] 상수 변환 로직
- [ ] 모든 테스트 통과 확인

#### 리팩토링 (Refactor)
- [ ] SOLID 원칙 적용 (SRP 확인)
- [ ] 코드 가독성 개선
- [ ] 중복 코드 제거
- [ ] JSDoc 주석 추가

### ✅ 인수 조건 (Acceptance Criteria)

- [ ] 모든 테스트가 통과한다 (`npm run test`)
- [ ] 테스트 커버리지가 100%이다
- [ ] formatNumber()가 천 단위 쉼표를 올바르게 추가한다
- [ ] formatNumber()가 NaN을 "Error"로 변환한다
- [ ] formatNumber()가 Infinity를 "∞"로 변환한다
- [ ] formatNumber()가 매우 큰/작은 수를 과학적 표기법으로 변환한다
- [ ] formatExpression()이 연산자를 올바르게 변환한다 (*, / → ×, ÷)
- [ ] formatExpression()이 상수를 올바르게 변환한다 (pi → π)
- [ ] ESLint 에러가 없다
- [ ] 코드에 JSDoc 주석이 포함되어 있다

### 📚 참고 자료

- [TASKS.md - Phase 2.1](../Docs/TASKS.md#21-formatter-모듈-숫자-포맷팅)
- [TECH_SPEC.md - Formatter](../Docs/TECH_SPEC.md#43-숫자-포맷터-formatterjs)
- [RULES_TDD.md](../Docs/RULES_TDD.md)

---

**예상 소요 시간**: 2-3시간  
**우선순위**: High  
**난이도**: ⭐⭐

---

## Issue #2: [Phase 2.2] Parser 모듈 구현 (TDD)

### 📋 작업 배경

사용자가 입력한 수식의 유효성을 검증하고 파싱하는 기능이 필요합니다. 괄호 균형 확인, 연속된 연산자 검증, 자동 괄호 완성 등을 담당하는 Parser 모듈을 TDD 방식으로 구현합니다.

### 🎯 작업 내용

#### 테스트 작성 (Red)
- [ ] `src/core/__tests__/Parser.test.js` 파일 생성
- [ ] 수식 검증 테스트
  - [ ] 빈 수식 검증 테스트 ("" → invalid)
  - [ ] 괄호 균형 검증 테스트
    - [ ] 균형 잡힌 괄호 ("(2+3)" → valid)
    - [ ] 불균형 괄호 ("(2+3" → invalid)
    - [ ] 닫는 괄호가 먼저 ("2+3)" → invalid)
  - [ ] 연속된 연산자 검증 테스트 ("2++3" → invalid)
  - [ ] 유효한 수식 검증 테스트 ("2+3*4" → valid)
- [ ] 괄호 자동 완성 테스트
  - [ ] 여는 괄호만 있는 경우 ("(2+3" → "(2+3)")
  - [ ] 균형 잡힌 괄호 ("(2+3)" → "(2+3)")
  - [ ] 중첩 괄호 ("((2+3)" → "((2+3))")

#### 구현 (Green)
- [ ] `src/core/Parser.js` 파일 생성
- [ ] `validate(expression)` 정적 메서드 구현
  - [ ] 빈 수식 체크
  - [ ] 괄호 균형 체크
  - [ ] 연속 연산자 체크
  - [ ] 검증 결과 반환 ({ valid, error })
- [ ] `isBalancedParentheses(expr)` 정적 메서드 구현
- [ ] `autoCloseBrackets(expr)` 정적 메서드 구현
- [ ] 모든 테스트 통과 확인

#### 리팩토링 (Refactor)
- [ ] SOLID 원칙 적용
- [ ] 에러 메시지 상수화
- [ ] JSDoc 주석 추가

### ✅ 인수 조건 (Acceptance Criteria)

- [ ] 모든 테스트가 통과한다
- [ ] 테스트 커버리지가 100%이다
- [ ] validate()가 빈 수식을 올바르게 검증한다
- [ ] validate()가 괄호 균형을 올바르게 검증한다
- [ ] validate()가 연속된 연산자를 올바르게 검증한다
- [ ] isBalancedParentheses()가 괄호 균형을 정확히 판단한다
- [ ] autoCloseBrackets()가 누락된 닫는 괄호를 추가한다
- [ ] ESLint 에러가 없다
- [ ] 코드에 JSDoc 주석이 포함되어 있다

### 📚 참고 자료

- [TASKS.md - Phase 2.2](../Docs/TASKS.md#22-parser-모듈-수식-검증-및-파싱)
- [TECH_SPEC.md - Parser](../Docs/TECH_SPEC.md#42-수식-파서-parserjs)
- [RULES_TDD.md](../Docs/RULES_TDD.md)

---

**예상 소요 시간**: 2-3시간  
**우선순위**: High  
**난이도**: ⭐⭐⭐

---

## Issue #3: [Phase 2.3] Calculator 모듈 구현 (TDD)

### 📋 작업 배경

계산기의 핵심 기능인 수식 평가 엔진을 구현합니다. math.js를 사용하여 기본 산술 연산, 공학용 함수, 각도 모드 전환 등을 지원하는 Calculator 모듈을 TDD 방식으로 구현합니다.

### 🎯 작업 내용

#### 테스트 작성 (Red)
- [ ] `src/core/__tests__/Calculator.test.js` 파일 생성
- [ ] 기본 산술 연산 테스트
  - [ ] 덧셈 (2 + 2 = 4)
  - [ ] 뺄셈 (5 - 3 = 2)
  - [ ] 곱셈 (3 * 4 = 12)
  - [ ] 나눗셈 (15 / 3 = 5)
  - [ ] 퍼센트 (50% = 0.5)
- [ ] 공학용 함수 테스트 (DEG 모드)
  - [ ] sin(90) = 1
  - [ ] cos(0) = 1
  - [ ] tan(45) ≈ 1
  - [ ] log(100) = 2
  - [ ] ln(e) = 1
- [ ] 공학용 함수 테스트 (RAD 모드)
  - [ ] sin(π/2) = 1
  - [ ] cos(0) = 1
  - [ ] tan(π/4) ≈ 1
- [ ] 기타 함수 테스트
  - [ ] sqrt(16) = 4
  - [ ] 2^3 = 8
  - [ ] 5! = 120
  - [ ] π ≈ 3.14159
- [ ] 복합 수식 테스트
  - [ ] (2 + 3) * 4 = 20
  - [ ] 2 + 3 * 4 = 14 (우선순위)
- [ ] 오류 처리 테스트
  - [ ] 1 / 0 → Error
  - [ ] 잘못된 문법 → Error

#### 구현 (Green)
- [ ] `src/core/Calculator.js` 파일 생성
- [ ] math.js 초기화 (BigNumber, precision 설정)
- [ ] `evaluate(expression)` 메서드 구현
- [ ] `setAngleMode(mode)` 메서드 구현
- [ ] `preprocessExpression(expr)` 메서드 구현
  - [ ] × → *, ÷ → /, − → - 변환
  - [ ] π → pi 변환
- [ ] `formatResult(result)` 메서드 구현
- [ ] `getErrorMessage(error)` 메서드 구현
- [ ] 모든 테스트 통과 확인

#### 리팩토링 (Refactor)
- [ ] 의존성 주입 적용 (DIP)
- [ ] 에러 타입별 메시지 분리
- [ ] JSDoc 주석 추가

### ✅ 인수 조건 (Acceptance Criteria)

- [ ] 모든 테스트가 통과한다
- [ ] 테스트 커버리지가 90% 이상이다
- [ ] 기본 산술 연산이 정확하다
- [ ] DEG 모드에서 삼각함수가 정확하다
- [ ] RAD 모드에서 삼각함수가 정확하다
- [ ] 각도 모드 전환이 올바르게 동작한다
- [ ] 복합 수식의 연산자 우선순위가 올바르다
- [ ] 0으로 나누기 시 에러를 발생시킨다
- [ ] 잘못된 문법 시 에러를 발생시킨다
- [ ] ESLint 에러가 없다
- [ ] 코드에 JSDoc 주석이 포함되어 있다

### 📚 참고 자료

- [TASKS.md - Phase 2.3](../Docs/TASKS.md#23-calculator-모듈-계산-엔진)
- [TECH_SPEC.md - Calculator](../Docs/TECH_SPEC.md#41-계산-엔진-calculatorjs)
- [RULES_TDD.md](../Docs/RULES_TDD.md)

---

**예상 소요 시간**: 4-5시간  
**우선순위**: High  
**난이도**: ⭐⭐⭐⭐

---

## Issue #4: [Phase 2.4] Storage 유틸리티 구현 (TDD)

### 📋 작업 배경

히스토리 및 설정을 로컬 스토리지에 저장하고 불러오는 기능이 필요합니다. 브라우저의 localStorage API를 래핑하여 안전하게 사용할 수 있는 Storage 유틸리티를 TDD 방식으로 구현합니다.

### 🎯 작업 내용

#### 테스트 작성 (Red)
- [ ] `src/utils/__tests__/storage.test.js` 파일 생성
- [ ] localStorage 모킹 설정
- [ ] 저장 기능 테스트
  - [ ] 데이터 저장 성공 테스트
  - [ ] 저장 실패 처리 테스트 (quota exceeded)
- [ ] 로드 기능 테스트
  - [ ] 데이터 로드 성공 테스트
  - [ ] 데이터 없을 때 null 반환 테스트
  - [ ] 로드 실패 처리 테스트 (invalid JSON)
- [ ] 삭제 기능 테스트
  - [ ] 데이터 삭제 테스트

#### 구현 (Green)
- [ ] `src/utils/storage.js` 파일 생성
- [ ] `save(data)` 함수 구현
  - [ ] JSON.stringify
  - [ ] localStorage.setItem
  - [ ] try-catch 에러 처리
- [ ] `load()` 함수 구현
  - [ ] localStorage.getItem
  - [ ] JSON.parse
  - [ ] try-catch 에러 처리
- [ ] `clear()` 함수 구현
- [ ] 모든 테스트 통과 확인

#### 리팩토링 (Refactor)
- [ ] 상수 분리 (STORAGE_KEY)
- [ ] JSDoc 주석 추가

### ✅ 인수 조건 (Acceptance Criteria)

- [ ] 모든 테스트가 통과한다
- [ ] 테스트 커버리지가 100%이다
- [ ] save()가 데이터를 localStorage에 저장한다
- [ ] save()가 에러 발생 시 콘솔에 로그를 남긴다
- [ ] load()가 저장된 데이터를 반환한다
- [ ] load()가 데이터가 없을 때 null을 반환한다
- [ ] load()가 잘못된 JSON 시 null을 반환한다
- [ ] clear()가 데이터를 삭제한다
- [ ] ESLint 에러가 없다
- [ ] 코드에 JSDoc 주석이 포함되어 있다

### 📚 참고 자료

- [TASKS.md - Phase 2.4](../Docs/TASKS.md#24-storage-유틸리티)
- [TECH_SPEC.md - Storage](../Docs/TECH_SPEC.md#72-storage-유틸리티)

---

**예상 소요 시간**: 1-2시간  
**우선순위**: Medium  
**난이도**: ⭐⭐

---

## Issue #5: [Phase 2.5] AppState 모듈 구현 (TDD)

### 📋 작업 배경

애플리케이션의 전역 상태를 관리하고 상태 변경 시 구독자에게 알림을 보내는 상태 관리 시스템이 필요합니다. Observer 패턴을 사용한 AppState 모듈을 TDD 방식으로 구현합니다.

### 🎯 작업 내용

#### 테스트 작성 (Red)
- [ ] `src/state/__tests__/AppState.test.js` 파일 생성
- [ ] 상태 초기화 테스트
  - [ ] 초기 상태 값 확인
- [ ] 상태 업데이트 테스트
  - [ ] setState() 전체 업데이트
  - [ ] setState() 부분 업데이트
- [ ] 구독 패턴 테스트
  - [ ] subscribe() 리스너 등록
  - [ ] 상태 변경 시 리스너 호출
  - [ ] unsubscribe 동작
  - [ ] 여러 리스너 등록
- [ ] 로컬 스토리지 동기화 테스트
  - [ ] saveToStorage() 호출 시 저장
  - [ ] loadFromStorage() 호출 시 로드

#### 구현 (Green)
- [ ] `src/state/AppState.js` 파일 생성
- [ ] 초기 상태 정의
  - [ ] currentInput, expression, result
  - [ ] angleMode, theme
  - [ ] history, decimalPlaces
  - [ ] showHistory, showSettings
- [ ] `setState(updates)` 메서드 구현
- [ ] `subscribe(listener)` 메서드 구현
- [ ] `notifyListeners()` 메서드 구현
- [ ] `saveToStorage()` 메서드 구현
- [ ] `loadFromStorage()` 메서드 구현
- [ ] 싱글톤 패턴 적용
- [ ] 모든 테스트 통과 확인

#### 리팩토링 (Refactor)
- [ ] 상태 구조 최적화
- [ ] JSDoc 주석 추가

### ✅ 인수 조건 (Acceptance Criteria)

- [ ] 모든 테스트가 통과한다
- [ ] 테스트 커버리지가 90% 이상이다
- [ ] setState()가 상태를 올바르게 업데이트한다
- [ ] setState()가 부분 업데이트를 지원한다
- [ ] subscribe()가 리스너를 등록한다
- [ ] 상태 변경 시 모든 리스너가 호출된다
- [ ] unsubscribe가 올바르게 동작한다
- [ ] saveToStorage()가 로컬 스토리지에 저장한다
- [ ] loadFromStorage()가 저장된 상태를 로드한다
- [ ] 싱글톤 패턴이 적용되어 있다
- [ ] ESLint 에러가 없다
- [ ] 코드에 JSDoc 주석이 포함되어 있다

### 📚 참고 자료

- [TASKS.md - Phase 2.5](../Docs/TASKS.md#25-appstate-모듈-상태-관리)
- [TECH_SPEC.md - AppState](../Docs/TECH_SPEC.md#33-상태-관리)

---

**예상 소요 시간**: 3-4시간  
**우선순위**: High  
**난이도**: ⭐⭐⭐

---

## 이슈 생성 방법

1. GitHub 저장소 페이지로 이동
2. "Issues" 탭 클릭
3. "New issue" 버튼 클릭
4. 위 템플릿 내용을 복사하여 붙여넣기
5. 라벨 추가:
   - `enhancement` (기능 추가)
   - `tdd` (TDD 방식)
   - `phase-2` (Phase 2 작업)
   - `core-logic` (코어 로직)
6. Milestone 설정: "Phase 2: Core Logic"
7. "Submit new issue" 클릭

## 추가 이슈

Phase 3-8의 이슈도 동일한 형식으로 생성할 수 있습니다. 필요시 추가 이슈 템플릿을 제공하겠습니다.
