## 📋 작업 배경

공학용 계산기에서 계산 결과를 사용자 친화적으로 표시하기 위해 숫자 포맷팅 기능이 필요합니다. 천 단위 구분 쉼표, 소수점 자릿수 제한, 특수 케이스(NaN, Infinity) 처리 등을 담당하는 Formatter 모듈을 TDD 방식으로 구현합니다.

## 🎯 작업 내용

### 테스트 작성 (Red)
- [ ] `src/core/__tests__/Formatter.test.js` 파일 생성
- [ ] 기본 숫자 포맷팅 테스트
  - [ ] 천 단위 구분 쉼표 테스트 (1000 → "1,000")
  - [ ] 소수점 자릿수 제한 테스트
  - [ ] 0 처리 테스트
- [ ] 특수 케이스 테스트
  - [ ] NaN 처리 테스트 (NaN → "Error")
  - [ ] Infinity 처리 테스트 (Infinity → "∞")
  - [ ] 매우 큰 수 테스트 (과학적 표기법)
  - [ ] 매우 작은 수 테스트 (과학적 표기법)
- [ ] 수식 포맷팅 테스트
  - [ ] 연산자 변환 테스트 (* → ×, / → ÷)
  - [ ] 상수 변환 테스트 (pi → π)

### 구현 (Green)
- [ ] `src/core/Formatter.js` 파일 생성
- [ ] `formatNumber(num, decimalPlaces)` 메서드 구현
- [ ] `formatExpression(expr)` 메서드 구현
- [ ] 모든 테스트 통과 확인

### 리팩토링 (Refactor)
- [ ] SOLID 원칙 적용 (SRP 확인)
- [ ] 코드 가독성 개선
- [ ] JSDoc 주석 추가

## ✅ 인수 조건

- [ ] 모든 테스트가 통과한다
- [ ] 테스트 커버리지가 100%이다
- [ ] formatNumber()가 천 단위 쉼표를 올바르게 추가한다
- [ ] formatNumber()가 NaN을 "Error"로 변환한다
- [ ] formatNumber()가 Infinity를 "∞"로 변환한다
- [ ] formatExpression()이 연산자를 올바르게 변환한다
- [ ] ESLint 에러가 없다
- [ ] 코드에 JSDoc 주석이 포함되어 있다

## 📚 참고 자료

- [TASKS.md - Phase 2.1](https://github.com/DongKim2/cal1/blob/main/Docs/TASKS.md#21-formatter-모듈-숫자-포맷팅)
- [TECH_SPEC.md - Formatter](https://github.com/DongKim2/cal1/blob/main/Docs/TECH_SPEC.md#43-숫자-포맷터-formatterjs)
- [RULES_TDD.md](https://github.com/DongKim2/cal1/blob/main/Docs/RULES_TDD.md)

---

**예상 소요 시간**: 2-3시간  
**우선순위**: High  
**난이도**: ⭐⭐
