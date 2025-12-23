## 📋 작업 배경

애플리케이션의 전역 상태를 관리하고 상태 변경 시 구독자에게 알림을 보내는 상태 관리 시스템이 필요합니다. Observer 패턴을 사용한 AppState 모듈을 TDD 방식으로 구현합니다.

## 🎯 작업 내용

### 테스트 작성 (Red)
- [ ] `src/state/__tests__/AppState.test.js` 파일 생성
- [ ] 상태 초기화 테스트
- [ ] 상태 업데이트 테스트 (전체, 부분)
- [ ] 구독 패턴 테스트
  - [ ] subscribe() 리스너 등록
  - [ ] 상태 변경 시 리스너 호출
  - [ ] unsubscribe 동작
- [ ] 로컬 스토리지 동기화 테스트

### 구현 (Green)
- [ ] `src/state/AppState.js` 파일 생성
- [ ] 초기 상태 정의
- [ ] `setState(updates)` 메서드 구현
- [ ] `subscribe(listener)` 메서드 구현
- [ ] `notifyListeners()` 메서드 구현
- [ ] `saveToStorage()` 메서드 구현
- [ ] `loadFromStorage()` 메서드 구현
- [ ] 싱글톤 패턴 적용

### 리팩토링 (Refactor)
- [ ] 상태 구조 최적화
- [ ] JSDoc 주석 추가

## ✅ 인수 조건

- [ ] 모든 테스트가 통과한다
- [ ] 테스트 커버리지가 90% 이상이다
- [ ] setState()가 상태를 올바르게 업데이트한다
- [ ] subscribe()가 리스너를 등록한다
- [ ] 상태 변경 시 모든 리스너가 호출된다
- [ ] unsubscribe가 올바르게 동작한다
- [ ] 로컬 스토리지 동기화가 동작한다
- [ ] 싱글톤 패턴이 적용되어 있다
- [ ] ESLint 에러가 없다

## 📚 참고 자료

- [TASKS.md - Phase 2.5](https://github.com/DongKim2/cal1/blob/main/Docs/TASKS.md#25-appstate-모듈-상태-관리)
- [TECH_SPEC.md - AppState](https://github.com/DongKim2/cal1/blob/main/Docs/TECH_SPEC.md#33-상태-관리)

---

**예상 소요 시간**: 3-4시간  
**우선순위**: High  
**난이도**: ⭐⭐⭐
