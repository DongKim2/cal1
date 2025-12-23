## 📋 작업 배경

사용자가 입력한 수식의 유효성을 검증하고 파싱하는 기능이 필요합니다. 괄호 균형 확인, 연속된 연산자 검증, 자동 괄호 완성 등을 담당하는 Parser 모듈을 TDD 방식으로 구현합니다.

## 🎯 작업 내용

### 테스트 작성 (Red)
- [ ] `src/core/__tests__/Parser.test.js` 파일 생성
- [ ] 수식 검증 테스트
  - [ ] 빈 수식 검증 테스트
  - [ ] 괄호 균형 검증 테스트
  - [ ] 연속된 연산자 검증 테스트
  - [ ] 유효한 수식 검증 테스트
- [ ] 괄호 자동 완성 테스트
  - [ ] 여는 괄호만 있는 경우
  - [ ] 균형 잡힌 괄호
  - [ ] 중첩 괄호

### 구현 (Green)
- [ ] `src/core/Parser.js` 파일 생성
- [ ] `validate(expression)` 정적 메서드 구현
- [ ] `isBalancedParentheses(expr)` 정적 메서드 구현
- [ ] `autoCloseBrackets(expr)` 정적 메서드 구현
- [ ] 모든 테스트 통과 확인

### 리팩토링 (Refactor)
- [ ] SOLID 원칙 적용
- [ ] 에러 메시지 상수화
- [ ] JSDoc 주석 추가

## ✅ 인수 조건

- [ ] 모든 테스트가 통과한다
- [ ] 테스트 커버리지가 100%이다
- [ ] validate()가 빈 수식을 올바르게 검증한다
- [ ] validate()가 괄호 균형을 올바르게 검증한다
- [ ] validate()가 연속된 연산자를 올바르게 검증한다
- [ ] isBalancedParentheses()가 괄호 균형을 정확히 판단한다
- [ ] autoCloseBrackets()가 누락된 닫는 괄호를 추가한다
- [ ] ESLint 에러가 없다

## 📚 참고 자료

- [TASKS.md - Phase 2.2](https://github.com/DongKim2/cal1/blob/main/Docs/TASKS.md#22-parser-모듈-수식-검증-및-파싱)
- [TECH_SPEC.md - Parser](https://github.com/DongKim2/cal1/blob/main/Docs/TECH_SPEC.md#42-수식-파서-parserjs)

---

**예상 소요 시간**: 2-3시간  
**우선순위**: High  
**난이도**: ⭐⭐⭐
