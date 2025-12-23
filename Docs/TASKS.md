# 공학용 전자계산기 웹앱 - 작업 목록

> **프로젝트 상태**: 초기 설정 완료  
> **마지막 업데이트**: 2025-12-23  
> **개발 방식**: TDD + SOLID 원칙

---

## 📋 진행 상태 범례

- `[ ]` 미완료
- `[/]` 진행 중
- `[x]` 완료

---

## Phase 0: 프로젝트 초기화 ✅

### 0.1 문서화
- [x] PRD 작성
- [x] Tech Spec 작성
- [x] 배포 가이드 작성
- [x] 개발 규칙 문서화 (TDD, SOLID)
- [x] README 작성

### 0.2 프로젝트 설정
- [x] package.json 생성
- [x] Vite 설정
- [x] Tailwind CSS 설정
- [x] ESLint/Prettier 설정
- [x] Vitest 설정
- [x] GitHub Actions 워크플로우 설정
- [x] .gitignore 설정
- [x] 디자인 파일 정리

### 0.3 Git 초기화
- [x] Git 저장소 초기화
- [x] 초기 커밋 완료
- [x] GitHub 원격 저장소 연결
- [ ] GitHub Pages 설정

---

## Phase 1: 환경 구축 및 기본 구조

### 1.1 의존성 설치
- [ ] `npm install` 실행
- [ ] 설치 완료 확인 (node_modules 생성)
- [ ] mathjs 설치 확인 (`node_modules/mathjs` 존재)
- [ ] package-lock.json 생성 확인
- [ ] 개발 의존성 확인
  - [ ] vite 설치 확인
  - [ ] tailwindcss 설치 확인
  - [ ] vitest 설치 확인
  - [ ] eslint, prettier 설치 확인

### 1.2 프로젝트 디렉토리 구조 생성
- [ ] `src/` 디렉토리 생성
- [ ] `src/core/` 생성 (계산 엔진)
  - [ ] `src/core/__tests__/` 생성 (테스트)
  - [ ] `.gitkeep` 파일 추가 (빈 디렉토리 추적용)
- [ ] `src/state/` 생성 (상태 관리)
  - [ ] `src/state/__tests__/` 생성
  - [ ] `.gitkeep` 파일 추가
- [ ] `src/utils/` 생성 (유틸리티)
  - [ ] `src/utils/__tests__/` 생성
  - [ ] `.gitkeep` 파일 추가
- [ ] `src/components/` 생성 (UI 컴포넌트)
  - [ ] `.gitkeep` 파일 추가
- [ ] `src/assets/` 생성
  - [ ] `src/assets/styles/` 생성
  - [ ] `.gitkeep` 파일 추가
- [ ] `public/` 디렉토리 생성
  - [ ] `.gitkeep` 파일 추가
- [ ] 디렉토리 구조 검증
  - [ ] `tree` 명령으로 구조 확인 (또는 수동 확인)
  - [ ] 모든 필수 디렉토리 존재 확인

### 1.3 기본 파일 생성

#### 1.3.1 index.html 생성
- [ ] `index.html` 파일 생성
- [ ] 기본 HTML5 구조 작성
  - [ ] DOCTYPE 선언
  - [ ] html, head, body 태그
  - [ ] meta charset="utf-8"
  - [ ] viewport meta 태그
  - [ ] title 태그 ("Scientific Calculator")
- [ ] 폰트 preconnect 추가
  - [ ] Google Fonts preconnect
  - [ ] Google Fonts API preconnect
- [ ] 폰트 로딩 링크 추가
  - [ ] Space Grotesk 폰트
  - [ ] Noto Sans 폰트
  - [ ] Material Symbols Outlined
- [ ] 기본 구조 마크업
  - [ ] `<div id="app"></div>` 추가
  - [ ] `<script type="module" src="/src/main.js"></script>` 추가
- [ ] 다크 모드 기본 클래스 추가 (`<html class="dark">`)

#### 1.3.2 src/main.js 생성
- [ ] `src/main.js` 파일 생성
- [ ] CSS import 추가 (`import './assets/styles/main.css'`)
- [ ] 기본 콘솔 로그 추가 (테스트용)
- [ ] DOM 로딩 확인 코드 추가
- [ ] 임시 "Hello World" 렌더링 코드 추가

#### 1.3.3 src/App.js 생성
- [ ] `src/App.js` 파일 생성
- [ ] App 클래스 스켈레톤 작성
  - [ ] constructor 정의
  - [ ] init() 메서드 정의
  - [ ] render() 메서드 정의 (임시)
- [ ] export default 추가

#### 1.3.4 src/assets/styles/main.css 생성
- [ ] `src/assets/styles/main.css` 파일 생성
- [ ] Tailwind 디렉티브 추가
  - [ ] `@tailwind base;`
  - [ ] `@tailwind components;`
  - [ ] `@tailwind utilities;`
- [ ] 기본 body 스타일 추가 (임시)
- [ ] Material Icons 폰트 설정 추가
- [ ] 스크롤바 숨김 유틸리티 클래스 추가

### 1.4 개발 환경 테스트
- [ ] `npm run dev` 실행
- [ ] 브라우저 자동 오픈 확인 (localhost:3000)
- [ ] 콘솔 에러 없음 확인
- [ ] "Hello World" 또는 임시 콘텐츠 표시 확인
- [ ] Hot Module Replacement 테스트
  - [ ] main.css 수정 후 자동 반영 확인
  - [ ] main.js 수정 후 자동 반영 확인
- [ ] Tailwind CSS 적용 확인
  - [ ] 임시 Tailwind 클래스 추가 (예: `bg-blue-500`)
  - [ ] 스타일 적용 확인
- [ ] 개발 서버 종료 (Ctrl+C)
- [ ] 재시작 테스트

### 1.5 초기 커밋
- [ ] 변경사항 스테이징 (`git add .`)
- [ ] 커밋 (`git commit -m "feat: setup project structure and dev environment"`)
- [ ] 커밋 로그 확인

---

## Phase 2: 코어 로직 구현 (TDD)

### 2.1 Formatter 모듈 (숫자 포맷팅)

#### 테스트 작성
- [ ] `Formatter.test.js` 생성
- [ ] 기본 숫자 포맷팅 테스트
  - [ ] 천 단위 구분 쉼표 테스트
  - [ ] 소수점 자릿수 제한 테스트
  - [ ] 0 처리 테스트
- [ ] 특수 케이스 테스트
  - [ ] NaN 처리 테스트
  - [ ] Infinity 처리 테스트
  - [ ] 매우 큰 수 (과학적 표기법) 테스트
  - [ ] 매우 작은 수 테스트
- [ ] 수식 포맷팅 테스트
  - [ ] 연산자 변환 테스트 (* → ×, / → ÷)
  - [ ] 상수 변환 테스트 (pi → π)

#### 구현
- [ ] `src/core/Formatter.js` 생성
- [ ] `formatNumber()` 메서드 구현
- [ ] `formatExpression()` 메서드 구현
- [ ] 모든 테스트 통과 확인
- [ ] 리팩토링 (SOLID 원칙 적용)

### 2.2 Parser 모듈 (수식 검증 및 파싱)

#### 테스트 작성
- [ ] `Parser.test.js` 생성
- [ ] 수식 검증 테스트
  - [ ] 빈 수식 검증 테스트
  - [ ] 괄호 균형 검증 테스트
  - [ ] 연속된 연산자 검증 테스트
  - [ ] 유효한 수식 검증 테스트
- [ ] 괄호 자동 완성 테스트
  - [ ] 여는 괄호만 있는 경우
  - [ ] 균형 잡힌 괄호
  - [ ] 닫는 괄호가 더 많은 경우

#### 구현
- [ ] `src/core/Parser.js` 생성
- [ ] `validate()` 메서드 구현
- [ ] `isBalancedParentheses()` 메서드 구현
- [ ] `autoCloseBrackets()` 메서드 구현
- [ ] 모든 테스트 통과 확인
- [ ] 리팩토링

### 2.3 Calculator 모듈 (계산 엔진)

#### 테스트 작성
- [ ] `Calculator.test.js` 생성
- [ ] 기본 산술 연산 테스트
  - [ ] 덧셈 테스트
  - [ ] 뺄셈 테스트
  - [ ] 곱셈 테스트
  - [ ] 나눗셈 테스트
  - [ ] 퍼센트 테스트
- [ ] 공학용 함수 테스트 (DEG 모드)
  - [ ] sin 함수 테스트
  - [ ] cos 함수 테스트
  - [ ] tan 함수 테스트
  - [ ] log 함수 테스트
  - [ ] ln 함수 테스트
- [ ] 공학용 함수 테스트 (RAD 모드)
  - [ ] sin 함수 테스트 (라디안)
  - [ ] cos 함수 테스트 (라디안)
  - [ ] tan 함수 테스트 (라디안)
- [ ] 기타 함수 테스트
  - [ ] 제곱근 테스트
  - [ ] 거듭제곱 테스트
  - [ ] 팩토리얼 테스트
  - [ ] π (파이) 테스트
- [ ] 복합 수식 테스트
  - [ ] 괄호 포함 수식
  - [ ] 연산자 우선순위 테스트
- [ ] 오류 처리 테스트
  - [ ] 0으로 나누기
  - [ ] 잘못된 문법
  - [ ] 정의되지 않은 함수

#### 구현
- [ ] `src/core/Calculator.js` 생성
- [ ] math.js 초기화
- [ ] `evaluate()` 메서드 구현
- [ ] `setAngleMode()` 메서드 구현
- [ ] `preprocessExpression()` 메서드 구현
- [ ] `formatResult()` 메서드 구현
- [ ] `getErrorMessage()` 메서드 구현
- [ ] 모든 테스트 통과 확인
- [ ] 리팩토링 (의존성 주입 적용)

### 2.4 Storage 유틸리티

#### 테스트 작성
- [ ] `storage.test.js` 생성
- [ ] 저장 기능 테스트
  - [ ] 데이터 저장 테스트
  - [ ] 저장 실패 처리 테스트
- [ ] 로드 기능 테스트
  - [ ] 데이터 로드 테스트
  - [ ] 데이터 없을 때 테스트
  - [ ] 로드 실패 처리 테스트
- [ ] 삭제 기능 테스트

#### 구현
- [ ] `src/utils/storage.js` 생성
- [ ] `save()` 함수 구현
- [ ] `load()` 함수 구현
- [ ] `clear()` 함수 구현
- [ ] 모든 테스트 통과 확인

### 2.5 AppState 모듈 (상태 관리)

#### 테스트 작성
- [ ] `AppState.test.js` 생성
- [ ] 상태 초기화 테스트
- [ ] 상태 업데이트 테스트
  - [ ] setState() 테스트
  - [ ] 부분 업데이트 테스트
- [ ] 구독 패턴 테스트
  - [ ] subscribe() 테스트
  - [ ] 리스너 호출 테스트
  - [ ] unsubscribe 테스트
- [ ] 로컬 스토리지 동기화 테스트
  - [ ] saveToStorage() 테스트
  - [ ] loadFromStorage() 테스트

#### 구현
- [ ] `src/state/AppState.js` 생성
- [ ] 초기 상태 정의
- [ ] `setState()` 메서드 구현
- [ ] `subscribe()` 메서드 구현
- [ ] `notifyListeners()` 메서드 구현
- [ ] `saveToStorage()` 메서드 구현
- [ ] `loadFromStorage()` 메서드 구현
- [ ] 모든 테스트 통과 확인
- [ ] 싱글톤 패턴 적용

### 2.6 테스트 커버리지 확인
- [ ] `npm run test:coverage` 실행
- [ ] 커버리지 90% 이상 확인
- [ ] 미달 시 추가 테스트 작성

---

## Phase 3: UI 컴포넌트 구현

> **참고**: UI 컴포넌트는 자동화 테스트를 작성하지 않습니다. 각 컴포넌트 구현 후 브라우저에서 수동으로 기능을 확인합니다.

### 3.1 기본 HTML 구조
- [ ] `index.html` 완성
  - [ ] 메타 태그 설정
  - [ ] 폰트 로딩
  - [ ] 아이콘 로딩
  - [ ] 기본 구조 마크업
- [ ] 브라우저 확인
  - [ ] 페이지 로딩 확인
  - [ ] 콘솔 에러 없음 확인

### 3.2 CSS 스타일 시스템
- [ ] `src/assets/styles/main.css` 작성
  - [ ] Tailwind 디렉티브 추가
  - [ ] 커스텀 스타일 추가
  - [ ] 스크롤바 숨김 스타일
  - [ ] Material Icons 스타일
- [ ] 스타일 적용 확인
  - [ ] 다크 모드 스타일 확인
  - [ ] 라이트 모드 스타일 확인

### 3.3 Display 컴포넌트
- [ ] `src/components/Display.js` 생성
- [ ] 입력 수식 표시 영역 구현
- [ ] 결과 표시 영역 구현
- [ ] 상태 업데이트 시 렌더링 구현
- [ ] 스타일 적용 (다크/라이트 모드)
- [ ] 수동 검증
  - [ ] 수식 표시 확인
  - [ ] 결과 표시 확인
  - [ ] 포맷팅 확인 (천 단위 쉼표)

### 3.4 Header 컴포넌트
- [ ] `src/components/Header.js` 생성
- [ ] 히스토리 버튼 구현
- [ ] DEG/RAD 토글 구현
- [ ] 설정 버튼 구현
- [ ] 이벤트 핸들러 연결
- [ ] 스타일 적용
- [ ] 수동 검증
  - [ ] 버튼 클릭 동작 확인
  - [ ] DEG/RAD 토글 시각적 피드백 확인

### 3.5 ScientificRow 컴포넌트
- [ ] `src/components/ScientificRow.js` 생성
- [ ] 공학용 함수 버튼 렌더링
- [ ] 가로 스크롤 구현
- [ ] 버튼 클릭 이벤트 처리
- [ ] 스타일 적용
- [ ] 수동 검증
  - [ ] 가로 스크롤 동작 확인
  - [ ] 모든 버튼 표시 확인
  - [ ] 버튼 클릭 반응 확인

### 3.6 Keypad 컴포넌트
- [ ] `src/components/Keypad.js` 생성
- [ ] 4×5 그리드 레이아웃 구현
- [ ] 숫자 버튼 렌더링
- [ ] 연산자 버튼 렌더링
- [ ] 특수 버튼 렌더링 (AC, 백스페이스, =)
- [ ] 버튼 클릭 이벤트 처리
- [ ] 스타일 적용 (버튼별 차별화)
- [ ] 수동 검증
  - [ ] 그리드 레이아웃 확인
  - [ ] 버튼 색상 및 크기 확인
  - [ ] 호버 효과 확인
  - [ ] 클릭 반응 확인

### 3.7 HistoryPanel 컴포넌트
- [ ] `src/components/HistoryPanel.js` 생성
- [ ] 히스토리 목록 렌더링
- [ ] 히스토리 항목 클릭 처리
- [ ] 히스토리 삭제 기능
- [ ] 패널 열기/닫기 애니메이션
- [ ] 스타일 적용
- [ ] 수동 검증
  - [ ] 패널 열기/닫기 애니메이션 확인
  - [ ] 히스토리 목록 표시 확인
  - [ ] 항목 클릭 동작 확인
  - [ ] 삭제 버튼 동작 확인

### 3.8 SettingsPanel 컴포넌트
- [ ] `src/components/SettingsPanel.js` 생성
- [ ] 테마 설정 UI
- [ ] 각도 모드 기본값 설정
- [ ] 소수점 자릿수 설정
- [ ] 히스토리 전체 삭제
- [ ] 패널 열기/닫기 애니메이션
- [ ] 스타일 적용
- [ ] 수동 검증
  - [ ] 패널 열기/닫기 애니메이션 확인
  - [ ] 모든 설정 옵션 표시 확인
  - [ ] 설정 변경 동작 확인

---

## Phase 4: 앱 통합 및 로직 연결

### 4.1 App 클래스 기본 구조
- [ ] `src/App.js` 업데이트
- [ ] 의존성 import
  - [ ] Calculator import
  - [ ] Formatter import
  - [ ] Parser import
  - [ ] AppState import
  - [ ] 모든 컴포넌트 import
- [ ] 클래스 속성 정의
  - [ ] state 속성
  - [ ] calculator 속성
  - [ ] formatter 속성
  - [ ] parser 속성
  - [ ] components 객체 속성
- [ ] constructor 구현
  - [ ] 의존성 주입 (DIP 원칙)
  - [ ] 컴포넌트 인스턴스 생성
  - [ ] 초기 상태 로드

### 4.2 컴포넌트 초기화 및 렌더링
- [ ] `initComponents()` 메서드 구현
  - [ ] Header 컴포넌트 초기화
  - [ ] Display 컴포넌트 초기화
  - [ ] ScientificRow 컴포넌트 초기화
  - [ ] Keypad 컴포넌트 초기화
  - [ ] HistoryPanel 컴포넌트 초기화
  - [ ] SettingsPanel 컴포넌트 초기화
- [ ] `render()` 메서드 구현
  - [ ] 모든 컴포넌트 렌더링 호출
  - [ ] DOM 구조 검증
- [ ] 초기 렌더링 테스트

### 4.3 상태 구독 설정
- [ ] `setupStateSubscription()` 메서드 구현
- [ ] AppState 구독 등록
- [ ] 상태 변경 시 컴포넌트 업데이트 로직
  - [ ] Display 업데이트
  - [ ] Header 업데이트 (DEG/RAD 표시)
  - [ ] HistoryPanel 업데이트
  - [ ] SettingsPanel 업데이트
- [ ] 구독 해제 로직 (cleanup)

### 4.4 숫자 입력 처리
- [ ] `handleNumberInput(value)` 메서드 구현
  - [ ] 현재 입력값에 숫자 추가
  - [ ] 소수점 중복 방지 로직
  - [ ] 상태 업데이트
- [ ] 테스트: 연속 숫자 입력
- [ ] 테스트: 소수점 입력
- [ ] 테스트: 0으로 시작하는 입력

### 4.5 연산자 입력 처리
- [ ] `handleOperatorInput(operator)` 메서드 구현
  - [ ] 연산자 추가 로직
  - [ ] 연속 연산자 방지
  - [ ] 수식 끝 연산자 처리
  - [ ] 상태 업데이트
- [ ] 테스트: 기본 연산자 (+, -, ×, ÷)
- [ ] 테스트: 퍼센트 연산자
- [ ] 테스트: 연속 연산자 입력

### 4.6 함수 입력 처리
- [ ] `handleFunctionInput(func)` 메서드 구현
  - [ ] 함수 추가 로직 (sin, cos, tan 등)
  - [ ] 자동 괄호 열기
  - [ ] 상태 업데이트
- [ ] 테스트: 삼각함수 입력
- [ ] 테스트: 로그 함수 입력
- [ ] 테스트: 제곱근 입력

### 4.7 괄호 입력 처리
- [ ] `handleParenthesisInput(paren)` 메서드 구현
  - [ ] 여는 괄호 처리
  - [ ] 닫는 괄호 처리
  - [ ] 괄호 균형 확인
  - [ ] 상태 업데이트
- [ ] 테스트: 괄호 쌍 입력
- [ ] 테스트: 중첩 괄호

### 4.8 계산 실행 (= 버튼)
- [ ] `handleEquals()` 메서드 구현
  - [ ] Parser로 수식 검증
  - [ ] 검증 실패 시 에러 표시
  - [ ] Calculator로 계산 실행
  - [ ] 결과 포맷팅
  - [ ] 히스토리에 추가
  - [ ] 상태 업데이트 (결과 표시)
- [ ] 에러 처리
  - [ ] 계산 오류 메시지 표시
  - [ ] 오류 후 복구 로직
- [ ] 테스트: 정상 계산
- [ ] 테스트: 오류 케이스

### 4.9 AC (All Clear) 처리
- [ ] `handleAllClear()` 메서드 구현
  - [ ] 현재 입력 초기화
  - [ ] 수식 초기화
  - [ ] 결과 초기화
  - [ ] 상태 업데이트
- [ ] 테스트: AC 버튼 동작

### 4.10 백스페이스 처리
- [ ] `handleBackspace()` 메서드 구현
  - [ ] 마지막 문자 삭제
  - [ ] 빈 입력 처리
  - [ ] 함수 전체 삭제 로직 (예: "sin(" 전체 삭제)
  - [ ] 상태 업데이트
- [ ] 테스트: 단일 문자 삭제
- [ ] 테스트: 함수 삭제
- [ ] 테스트: 빈 입력에서 백스페이스

### 4.11 DEG/RAD 모드 전환
- [ ] `handleAngleModeChange(mode)` 메서드 구현
  - [ ] Calculator 각도 모드 변경
  - [ ] 상태 업데이트
  - [ ] 로컬 스토리지 저장
- [ ] 테스트: DEG → RAD 전환
- [ ] 테스트: RAD → DEG 전환
- [ ] 테스트: 모드 변경 후 계산

### 4.12 히스토리 관리
- [ ] `handleHistoryClick()` 메서드 구현
  - [ ] 히스토리 패널 열기/닫기
  - [ ] 상태 업데이트
- [ ] `handleHistoryItemClick(item)` 메서드 구현
  - [ ] 히스토리 항목 수식 불러오기
  - [ ] 현재 입력에 설정
  - [ ] 패널 닫기
- [ ] `handleHistoryClear()` 메서드 구현
  - [ ] 히스토리 전체 삭제
  - [ ] 로컬 스토리지 업데이트
- [ ] 테스트: 히스토리 저장
- [ ] 테스트: 히스토리 불러오기
- [ ] 테스트: 히스토리 삭제

### 4.13 설정 관리
- [ ] `handleSettingsClick()` 메서드 구현
  - [ ] 설정 패널 열기/닫기
  - [ ] 상태 업데이트
- [ ] `handleThemeChange(theme)` 메서드 구현
  - [ ] 테마 변경 (light/dark/system)
  - [ ] ThemeManager 호출
  - [ ] 로컬 스토리지 저장
- [ ] `handleDecimalPlacesChange(places)` 메서드 구현
  - [ ] 소수점 자릿수 설정 변경
  - [ ] 상태 업데이트
  - [ ] 로컬 스토리지 저장
- [ ] 테스트: 테마 변경
- [ ] 테스트: 설정 저장/로드

### 4.14 이벤트 바인딩
- [ ] `bindEvents()` 메서드 구현
  - [ ] Keypad 버튼 클릭 이벤트
  - [ ] Header 버튼 클릭 이벤트
  - [ ] ScientificRow 버튼 클릭 이벤트
  - [ ] HistoryPanel 이벤트
  - [ ] SettingsPanel 이벤트
- [ ] 이벤트 위임 패턴 적용
- [ ] 메모리 누수 방지 (이벤트 리스너 정리)

### 4.15 메인 진입점
- [ ] `src/main.js` 업데이트
- [ ] App import 추가
- [ ] DOMContentLoaded 이벤트 리스너
- [ ] App 인스턴스 생성
  - [ ] 의존성 주입 설정
  - [ ] Calculator, Formatter, Parser 인스턴스 생성
  - [ ] AppState 인스턴스 전달
- [ ] 초기 렌더링 호출
- [ ] 전역 오류 핸들러 설정
  - [ ] window.onerror
  - [ ] unhandledrejection 이벤트

### 4.16 테마 관리 시스템
- [ ] `src/utils/theme.js` 생성
- [ ] ThemeManager 클래스 구현
  - [ ] constructor (초기 테마 감지)
  - [ ] `getInitialTheme()` 메서드
  - [ ] `setTheme(theme)` 메서드
  - [ ] `apply()` 메서드 (DOM 클래스 조작)
  - [ ] `toggle()` 메서드
- [ ] 시스템 테마 감지
  - [ ] `prefers-color-scheme` 미디어 쿼리
  - [ ] 시스템 테마 변경 감지
- [ ] 로컬 스토리지 동기화
  - [ ] 테마 저장
  - [ ] 테마 로드
- [ ] 테스트: 테마 전환
- [ ] 테스트: 시스템 테마 감지

### 4.17 키보드 입력 지원
- [ ] `src/utils/keyboard.js` 생성
- [ ] 키 매핑 객체 정의
  - [ ] 숫자 키 (0-9)
  - [ ] 연산자 키 (+, -, *, /)
  - [ ] 특수 키 (Enter, Escape, Backspace, Delete)
  - [ ] 소수점 (.)
  - [ ] 괄호 (, )
- [ ] `setupKeyboardListeners(callback)` 함수 구현
  - [ ] keydown 이벤트 리스너
  - [ ] 키 매핑 확인
  - [ ] 콜백 호출
  - [ ] 기본 동작 방지 (preventDefault)
- [ ] App에 키보드 리스너 통합
  - [ ] `handleKeyboardInput(key)` 메서드
  - [ ] 키 타입별 분기 처리
- [ ] 테스트: 숫자 키 입력
- [ ] 테스트: 연산자 키 입력
- [ ] 테스트: Enter로 계산
- [ ] 테스트: Escape로 AC

### 4.18 통합 테스트
- [ ] 전체 플로우 테스트
  - [ ] 앱 시작 → 계산 → 결과 표시
  - [ ] 히스토리 저장 → 불러오기
  - [ ] 테마 변경 → 재시작 후 유지
- [ ] 에러 복구 테스트
  - [ ] 잘못된 수식 입력 → AC → 정상 계산
- [ ] 메모리 누수 확인
  - [ ] 개발자 도구 Memory 프로파일링
  - [ ] 이벤트 리스너 정리 확인

---

## Phase 5: 테스트 및 검증

> **참고**: 이 Phase는 코어 로직의 자동화 테스트와 전체 앱의 수동 테스트로 구성됩니다.

### 5.1 단위 테스트 (자동화)
- [ ] 모든 코어 로직 테스트 실행
  - [ ] `npm run test` 실행
  - [ ] 모든 테스트 통과 확인
- [ ] 커버리지 90% 이상 확인
  - [ ] `npm run test:coverage` 실행
  - [ ] Statements > 90%
  - [ ] Branches > 85%
  - [ ] Functions > 90%
  - [ ] Lines > 90%
- [ ] 실패하는 테스트 수정
  - [ ] 에러 메시지 분석
  - [ ] 코드 수정 또는 테스트 수정
  - [ ] 재실행 및 확인

### 5.2 통합 테스트 (수동)
- [ ] 계산 플로우 테스트
  - [ ] 기본 계산 시나리오 (2 + 2 = 4)
  - [ ] 공학용 계산 시나리오 (sin(45) × 100)
  - [ ] 복합 수식 시나리오 ((2 + 3) × 4 - 5)
  - [ ] 연산자 우선순위 확인
- [ ] 상태 관리 테스트
  - [ ] 히스토리 저장 확인 (계산 후 히스토리 패널 확인)
  - [ ] 히스토리 불러오기 (항목 클릭 후 수식 로드 확인)
  - [ ] 설정 저장 확인 (페이지 새로고침 후 설정 유지)
  - [ ] 테마 전환 확인 (다크/라이트 모드 전환)

### 5.3 기능 테스트 (수동)
- [ ] 모든 버튼 동작 확인
  - [ ] 숫자 버튼 (0-9)
  - [ ] 연산자 버튼 (+, -, ×, ÷, %)
  - [ ] 공학용 함수 버튼 (sin, cos, tan, log, ln, √, ^, !, π)
  - [ ] 괄호 버튼 (, )
  - [ ] AC 버튼
  - [ ] 백스페이스 버튼
  - [ ] = 버튼
- [ ] 키보드 입력 확인
  - [ ] 숫자 키 (0-9)
  - [ ] 연산자 키 (+, -, *, /)
  - [ ] Enter 키 (계산)
  - [ ] Escape 키 (AC)
  - [ ] Backspace 키
- [ ] DEG/RAD 모드 전환 확인
  - [ ] DEG 모드에서 sin(90) = 1
  - [ ] RAD 모드에서 sin(π/2) ≈ 1
  - [ ] 모드 표시 업데이트 확인
- [ ] 히스토리 기능 확인
  - [ ] 히스토리 패널 열기/닫기
  - [ ] 히스토리 항목 표시
  - [ ] 항목 클릭 시 수식 불러오기
  - [ ] 히스토리 삭제
- [ ] 설정 기능 확인
  - [ ] 설정 패널 열기/닫기
  - [ ] 테마 변경 (light/dark/system)
  - [ ] 소수점 자릿수 변경
  - [ ] 설정 저장 확인
- [ ] 다크/라이트 모드 전환 확인
  - [ ] 테마 전환 버튼 동작
  - [ ] 모든 UI 요소 색상 변경 확인
  - [ ] 로컬 스토리지 저장 확인

### 5.4 반응형 테스트
- [ ] 모바일 화면 (375px)
- [ ] 태블릿 화면 (768px)
- [ ] 데스크톱 화면 (1024px+)
- [ ] 가로/세로 모드 전환

### 5.5 브라우저 호환성 테스트
- [ ] Chrome 최신 버전
- [ ] Firefox 최신 버전
- [ ] Safari 최신 버전
- [ ] Edge 최신 버전
- [ ] 모바일 Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Phase 6: 성능 최적화

### 6.1 번들 크기 최적화
- [ ] 프로덕션 빌드 실행
  - [ ] `npm run build` 실행
  - [ ] dist 폴더 생성 확인
- [ ] 번들 크기 분석
  - [ ] `vite-bundle-visualizer` 설치 (선택적)
  - [ ] 각 청크 크기 확인
  - [ ] mathjs 번들 크기 확인
- [ ] 최적화 작업
  - [ ] 불필요한 의존성 제거
  - [ ] Tree-shaking 확인 (import 방식 검토)
  - [ ] 동적 import 적용 (필요시)
- [ ] 목표 달성 확인
  - [ ] 전체 번들 크기 < 150KB (gzipped)
  - [ ] 메인 청크 < 100KB
  - [ ] CSS < 20KB

### 6.2 로딩 성능 최적화
- [ ] 리소스 로딩 전략
  - [ ] 폰트 preload 설정 (index.html)
  - [ ] 중요 CSS 인라인 (선택적)
  - [ ] 이미지 최적화 (필요시)
- [ ] Lazy loading 검토
  - [ ] HistoryPanel 동적 로딩 검토
  - [ ] SettingsPanel 동적 로딩 검토
- [ ] 측정 및 검증
  - [ ] Chrome DevTools Network 탭 확인
  - [ ] First Contentful Paint < 1.5s
  - [ ] Time to Interactive < 2.5s

### 6.3 렌더링 최적화
- [ ] 리렌더링 최적화
  - [ ] 불필요한 DOM 조작 제거
  - [ ] 상태 변경 시 필요한 컴포넌트만 업데이트
  - [ ] 디바운싱 적용 (필요시)
    - [ ] 연속 입력 시 디바운싱
    - [ ] 검색 기능 디바운싱 (히스토리)
- [ ] 애니메이션 성능
  - [ ] CSS transform/opacity 사용 확인
  - [ ] will-change 속성 적용 (필요시)
  - [ ] 60fps 유지 확인
- [ ] 측정 도구
  - [ ] Chrome DevTools Performance 탭
  - [ ] FPS 미터 활성화
  - [ ] 프레임 드롭 확인

### 6.4 Lighthouse 점수 측정
- [ ] Lighthouse 실행
  - [ ] Chrome DevTools → Lighthouse 탭
  - [ ] Mobile 모드 테스트
  - [ ] Desktop 모드 테스트
- [ ] 점수 목표 달성
  - [ ] Performance > 90
  - [ ] Accessibility > 90
  - [ ] Best Practices > 90
  - [ ] SEO > 90
- [ ] 개선 항목 적용
  - [ ] Lighthouse 제안사항 검토
  - [ ] 우선순위 높은 항목부터 개선
  - [ ] 재측정 및 검증

---

## Phase 7: 접근성 개선

### 7.1 ARIA 속성 추가
- [ ] 버튼 접근성
  - [ ] 모든 버튼에 aria-label 추가
  - [ ] 아이콘 버튼에 설명 추가
  - [ ] 백스페이스 버튼 aria-label
- [ ] 랜드마크 역할 설정
  - [ ] header 역할 (상단 바)
  - [ ] main 역할 (디스플레이 + 키패드)
  - [ ] navigation 역할 (공학용 함수 행)
- [ ] 동적 콘텐츠 알림
  - [ ] 계산 결과 aria-live="polite"
  - [ ] 오류 메시지 aria-live="assertive"
  - [ ] 상태 변경 알림 (DEG/RAD)
- [ ] 검증
  - [ ] axe DevTools로 자동 검사
  - [ ] ARIA 속성 올바른 사용 확인

### 7.2 키보드 네비게이션
- [ ] Tab 순서 설정
  - [ ] tabindex 속성 추가 (필요시)
  - [ ] 논리적 순서 확인
  - [ ] 키패드 → 히스토리 → 설정 순서
- [ ] Focus 스타일
  - [ ] :focus-visible 스타일 추가
  - [ ] 명확한 포커스 인디케이터
  - [ ] 다크/라이트 모드 모두 적용
- [ ] 키보드 단축키
  - [ ] Escape로 패널 닫기
  - [ ] Tab으로 패널 내 이동
  - [ ] Enter로 항목 선택
- [ ] 테스트
  - [ ] 마우스 없이 전체 기능 사용
  - [ ] 모든 버튼 키보드로 접근 가능

### 7.3 스크린 리더 테스트
- [ ] Windows (NVDA)
  - [ ] NVDA 설치 및 실행
  - [ ] 계산기 사용 시나리오 테스트
  - [ ] 버튼 레이블 읽기 확인
  - [ ] 결과 알림 확인
- [ ] macOS/iOS (VoiceOver)
  - [ ] VoiceOver 활성화
  - [ ] Safari에서 테스트
  - [ ] 모바일 Safari 테스트
- [ ] Android (TalkBack)
  - [ ] TalkBack 활성화
  - [ ] Chrome Mobile 테스트
- [ ] 개선사항 적용
  - [ ] 불명확한 레이블 수정
  - [ ] 읽기 순서 조정

### 7.4 색상 대비
- [ ] 대비 비율 측정
  - [ ] Chrome DevTools Color Picker 사용
  - [ ] WebAIM Contrast Checker 사용
- [ ] WCAG 2.1 AA 기준 확인
  - [ ] 일반 텍스트: 4.5:1 이상
  - [ ] 큰 텍스트: 3:1 이상
  - [ ] UI 컴포넌트: 3:1 이상
- [ ] 다크 모드 대비 확인
  - [ ] 모든 텍스트 대비 확인
  - [ ] 버튼 대비 확인
- [ ] 색맹 모드 테스트
  - [ ] Chrome DevTools Vision Deficiencies
  - [ ] Protanopia (적색맹) 시뮬레이션
  - [ ] Deuteranopia (녹색맹) 시뮬레이션
  - [ ] 색상만으로 정보 전달하지 않는지 확인

---

## Phase 8: 문서화 및 배포

### 8.1 코드 문서화
- [ ] JSDoc 주석 추가
  - [ ] 모든 public 메서드에 JSDoc
  - [ ] 파라미터 타입 및 설명
  - [ ] 반환값 설명
  - [ ] 예제 코드 (필요시)
- [ ] 복잡한 로직 설명
  - [ ] 알고리즘 설명 주석
  - [ ] 비즈니스 로직 설명
  - [ ] 주의사항 명시
- [ ] README 업데이트
  - [ ] 최종 기능 목록 업데이트
  - [ ] 스크린샷 추가
  - [ ] 배포 URL 추가
  - [ ] 라이선스 정보 확인

### 8.2 사용자 가이드
- [ ] 기능 설명 문서 작성
  - [ ] 기본 계산 방법
  - [ ] 공학용 함수 사용법
  - [ ] DEG/RAD 모드 설명
  - [ ] 히스토리 사용법
  - [ ] 설정 옵션 설명
- [ ] 스크린샷 추가
  - [ ] 메인 화면 (다크 모드)
  - [ ] 메인 화면 (라이트 모드)
  - [ ] 히스토리 패널
  - [ ] 설정 패널
  - [ ] 모바일 화면
- [ ] 사용 예시
  - [ ] 기본 계산 예시
  - [ ] 복잡한 수식 예시
  - [ ] 삼각함수 계산 예시

### 8.3 GitHub 저장소 설정
- [ ] 원격 저장소 연결
  - [ ] GitHub에서 저장소 생성
  - [ ] `git remote add origin [URL]`
  - [ ] 연결 확인
- [ ] 첫 푸시 실행
  - [ ] `git push -u origin main`
  - [ ] 푸시 성공 확인
  - [ ] GitHub에서 코드 확인
- [ ] GitHub Pages 활성화
  - [ ] Settings → Pages
  - [ ] Source: "GitHub Actions" 선택
  - [ ] 저장
- [ ] Workflow 권한 설정
  - [ ] Settings → Actions → General
  - [ ] Workflow permissions: "Read and write permissions"
  - [ ] 저장

### 8.4 배포 확인
- [ ] GitHub Actions 워크플로우 실행
  - [ ] Actions 탭에서 워크플로우 확인
  - [ ] 빌드 단계 성공 확인
  - [ ] 배포 단계 성공 확인
- [ ] 빌드 로그 확인
  - [ ] 에러 없음 확인
  - [ ] 경고 메시지 검토
- [ ] 배포 URL 접속
  - [ ] `https://[username].github.io/cal1/` 접속
  - [ ] 페이지 로딩 확인
  - [ ] 404 에러 없음 확인
- [ ] 프로덕션 환경 테스트
  - [ ] 모든 기능 동작 확인
  - [ ] 리소스 로딩 확인 (Network 탭)
  - [ ] 콘솔 에러 없음 확인
  - [ ] 모바일 기기에서 테스트

### 8.5 최종 검토
- [ ] 기능 체크리스트
  - [ ] 모든 버튼 동작 확인
  - [ ] 계산 정확도 확인
  - [ ] DEG/RAD 모드 전환
  - [ ] 히스토리 저장/불러오기
  - [ ] 설정 저장/불러오기
  - [ ] 테마 전환
  - [ ] 키보드 입력
- [ ] 성능 지표 최종 확인
  - [ ] Lighthouse 점수 > 90
  - [ ] 번들 크기 < 150KB
  - [ ] 로딩 시간 < 2.5s
- [ ] 접근성 최종 확인
  - [ ] WCAG 2.1 AA 준수
  - [ ] 스크린 리더 테스트 통과
  - [ ] 키보드 네비게이션 완벽
- [ ] 문서 최신화 확인
  - [ ] README 최신 정보
  - [ ] TASKS.md 진행률 업데이트
  - [ ] 배포 URL 문서에 추가
- [ ] 릴리스 노트 작성
  - [ ] v1.0.0 릴리스 생성
  - [ ] 주요 기능 목록
  - [ ] 알려진 이슈 (있다면)

---

## Phase 9: 향후 개선 사항 (선택적)

### 9.1 추가 기능
- [ ] 역삼각함수 (asin, acos, atan)
- [ ] 쌍곡선 함수 (sinh, cosh, tanh)
- [ ] 수식 히스토리 검색
- [ ] 수식 공유 기능
- [ ] 단위 변환 기능

### 9.2 PWA 지원
- [ ] Service Worker 추가
- [ ] 오프라인 모드 지원
- [ ] 앱 설치 기능
- [ ] 푸시 알림 (선택적)

### 9.3 고급 기능
- [ ] 그래프 그리기
- [ ] 행렬 계산
- [ ] 통계 함수
- [ ] 프로그래밍 모드 (진법 변환)

### 9.4 국제화
- [ ] 다국어 지원 (영어, 한국어)
- [ ] 숫자 포맷 로케일 대응
- [ ] 날짜/시간 로케일 대응

---

## 📊 진행률 추적

### 전체 진행률
- **Phase 0**: ✅ 100% (20/20) - 완료
- **Phase 1**: ⏳ 0% (0/60) - 환경 구축 및 기본 구조
- **Phase 2**: ⏳ 0% (0/80) - 코어 로직 구현 (TDD)
- **Phase 3**: ⏳ 0% (0/35) - UI 컴포넌트 구현
- **Phase 4**: ⏳ 0% (0/110) - 앱 통합 및 로직 연결
- **Phase 5**: ⏳ 0% (0/25) - 테스트 및 검증
- **Phase 6**: ⏳ 0% (0/30) - 성능 최적화
- **Phase 7**: ⏳ 0% (0/35) - 접근성 개선
- **Phase 8**: ⏳ 0% (0/60) - 문서화 및 배포
- **Phase 9**: ⏳ 0% (선택적) - 향후 개선 사항

**총 작업 수**: 455개 (Phase 0-8)

### 예상 소요 시간 (1인 개발 기준)

| Phase | 작업 수 | 예상 시간 | 난이도 |
|-------|---------|-----------|--------|
| Phase 0 | 20 | ✅ 완료 | ⭐ |
| Phase 1 | 60 | 4-6시간 | ⭐⭐ |
| Phase 2 | 80 | 20-25시간 | ⭐⭐⭐⭐ |
| Phase 3 | 35 | 12-15시간 | ⭐⭐⭐ |
| Phase 4 | 110 | 15-20시간 | ⭐⭐⭐⭐ |
| Phase 5 | 25 | 8-10시간 | ⭐⭐⭐ |
| Phase 6 | 30 | 6-8시간 | ⭐⭐⭐ |
| Phase 7 | 35 | 8-10시간 | ⭐⭐⭐ |
| Phase 8 | 60 | 6-8시간 | ⭐⭐ |
| **합계** | **455** | **79-102시간** | **약 2-3주** |

### 다음 작업 (우선순위 순)
1. ✅ ~~GitHub 원격 저장소 연결~~ (Phase 0.3)
2. ✅ ~~TASKS.md 작성 및 커밋~~ (Phase 0.3)
3. ⏭️ 의존성 설치 (`npm install`) (Phase 1.1)
4. ⏭️ 프로젝트 디렉토리 구조 생성 (Phase 1.2)
5. ⏭️ 기본 파일 생성 (Phase 1.3)
6. ⏭️ 개발 환경 테스트 (Phase 1.4)
7. ⏭️ TDD로 Formatter 모듈 구현 시작 (Phase 2.1)

### 마일스톤

#### 🎯 Milestone 1: 개발 환경 완성 (Phase 1)
- **목표**: 로컬 개발 환경 구축 완료
- **완료 조건**: `npm run dev` 실행 시 정상 작동
- **예상 완료**: Phase 1 완료 후

#### 🎯 Milestone 2: 코어 로직 완성 (Phase 2)
- **목표**: TDD로 모든 비즈니스 로직 구현
- **완료 조건**: 테스트 커버리지 90% 이상
- **예상 완료**: Phase 2 완료 후

#### 🎯 Milestone 3: UI 완성 (Phase 3-4)
- **목표**: 모든 UI 컴포넌트 및 통합 완료
- **완료 조건**: 전체 기능 동작 확인
- **예상 완료**: Phase 4 완료 후

#### 🎯 Milestone 4: 프로덕션 준비 (Phase 5-8)
- **목표**: 테스트, 최적화, 배포 완료
- **완료 조건**: GitHub Pages 배포 성공
- **예상 완료**: Phase 8 완료 후

### 진행 상황 업데이트 규칙
- 각 작업 완료 시 `[x]`로 체크
- 진행 중인 작업은 `[/]`로 표시
- Phase 완료 시 진행률 퍼센트 업데이트
- 주요 마일스톤 달성 시 README 업데이트

---

**마지막 업데이트**: 2025-12-23  
**담당자**: Development Team  
**예상 완료일**: Phase 8까지 약 2-3주 예상
