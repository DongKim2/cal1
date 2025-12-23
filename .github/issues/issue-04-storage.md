## 📋 작업 배경

히스토리 및 설정을 로컬 스토리지에 저장하고 불러오는 기능이 필요합니다. 브라우저의 localStorage API를 래핑하여 안전하게 사용할 수 있는 Storage 유틸리티를 TDD 방식으로 구현합니다.

## 🎯 작업 내용

### 테스트 작성 (Red)
- [ ] `src/utils/__tests__/storage.test.js` 파일 생성
- [ ] localStorage 모킹 설정
- [ ] 저장 기능 테스트 (성공, 실패)
- [ ] 로드 기능 테스트 (성공, 데이터 없음, 실패)
- [ ] 삭제 기능 테스트

### 구현 (Green)
- [ ] `src/utils/storage.js` 파일 생성
- [ ] `save(data)` 함수 구현
- [ ] `load()` 함수 구현
- [ ] `clear()` 함수 구현
- [ ] 에러 처리 (try-catch)

### 리팩토링 (Refactor)
- [ ] 상수 분리 (STORAGE_KEY)
- [ ] JSDoc 주석 추가

## ✅ 인수 조건

- [ ] 모든 테스트가 통과한다
- [ ] 테스트 커버리지가 100%이다
- [ ] save()가 데이터를 localStorage에 저장한다
- [ ] save()가 에러 발생 시 콘솔에 로그를 남긴다
- [ ] load()가 저장된 데이터를 반환한다
- [ ] load()가 데이터가 없을 때 null을 반환한다
- [ ] clear()가 데이터를 삭제한다
- [ ] ESLint 에러가 없다

## 📚 참고 자료

- [TASKS.md - Phase 2.4](https://github.com/DongKim2/cal1/blob/main/Docs/TASKS.md#24-storage-유틸리티)
- [TECH_SPEC.md - Storage](https://github.com/DongKim2/cal1/blob/main/Docs/TECH_SPEC.md#72-storage-유틸리티)

---

**예상 소요 시간**: 1-2시간  
**우선순위**: Medium  
**난이도**: ⭐⭐
