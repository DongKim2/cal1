## 📋 작업 배경

계산기의 핵심 기능인 수식 평가 엔진을 구현합니다. math.js를 사용하여 기본 산술 연산, 공학용 함수, 각도 모드 전환 등을 지원하는 Calculator 모듈을 TDD 방식으로 구현합니다.

## 🎯 작업 내용

### 테스트 작성 (Red)
- [ ] `src/core/__tests__/Calculator.test.js` 파일 생성
- [ ] 기본 산술 연산 테스트 (덧셈, 뺄셈, 곱셈, 나눗셈, 퍼센트)
- [ ] 공학용 함수 테스트 (DEG 모드)
  - [ ] sin, cos, tan, log, ln
- [ ] 공학용 함수 테스트 (RAD 모드)
- [ ] 기타 함수 테스트 (sqrt, ^, !, π)
- [ ] 복합 수식 테스트 (괄호, 우선순위)
- [ ] 오류 처리 테스트 (0으로 나누기, 잘못된 문법)

### 구현 (Green)
- [ ] `src/core/Calculator.js` 파일 생성
- [ ] math.js 초기화 (BigNumber, precision)
- [ ] `evaluate(expression)` 메서드 구현
- [ ] `setAngleMode(mode)` 메서드 구현
- [ ] `preprocessExpression(expr)` 메서드 구현
- [ ] `formatResult(result)` 메서드 구현
- [ ] `getErrorMessage(error)` 메서드 구현

### 리팩토링 (Refactor)
- [ ] 의존성 주입 적용 (DIP)
- [ ] 에러 타입별 메시지 분리
- [ ] JSDoc 주석 추가

## ✅ 인수 조건

- [ ] 모든 테스트가 통과한다
- [ ] 테스트 커버리지가 90% 이상이다
- [ ] 기본 산술 연산이 정확하다
- [ ] DEG/RAD 모드에서 삼각함수가 정확하다
- [ ] 각도 모드 전환이 올바르게 동작한다
- [ ] 복합 수식의 연산자 우선순위가 올바르다
- [ ] 0으로 나누기 시 에러를 발생시킨다
- [ ] ESLint 에러가 없다

## 📚 참고 자료

- [TASKS.md - Phase 2.3](https://github.com/DongKim2/cal1/blob/main/Docs/TASKS.md#23-calculator-모듈-계산-엔진)
- [TECH_SPEC.md - Calculator](https://github.com/DongKim2/cal1/blob/main/Docs/TECH_SPEC.md#41-계산-엔진-calculatorjs)

---

**예상 소요 시간**: 4-5시간  
**우선순위**: High  
**난이도**: ⭐⭐⭐⭐
