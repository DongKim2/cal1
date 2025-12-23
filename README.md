# 공학용 전자계산기 웹앱

현대적이고 직관적인 UI/UX를 갖춘 공학용 전자계산기 웹 애플리케이션입니다.

## 🚀 주요 기능

- ✅ 기본 산술 연산 (덧셈, 뺄셈, 곱셈, 나눗셈)
- ✅ 공학용 함수 (삼각함수, 로그, 제곱근, 거듭제곱 등)
- ✅ DEG/RAD 각도 모드 전환
- ✅ 다크 모드 지원
- ✅ 계산 히스토리
- ✅ 반응형 디자인
- ✅ 키보드 입력 지원

## 🛠️ 기술 스택

- **Frontend**: Vanilla JavaScript (ES6+)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Math Engine**: math.js
- **Testing**: Vitest
- **CI/CD**: GitHub Actions
- **Hosting**: GitHub Pages

## 📦 설치 및 실행

### 사전 요구사항

- Node.js >= 18.0.0
- npm >= 9.0.0

### 설치

```bash
# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
# 개발 모드로 실행 (http://localhost:3000)
npm run dev
```

### 프로덕션 빌드

```bash
# 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 🧪 테스트

```bash
# 테스트 실행
npm run test

# 테스트 UI
npm run test:ui

# 커버리지 확인
npm run test:coverage
```

## 📝 코드 품질

```bash
# ESLint 검사
npm run lint

# Prettier 포맷팅
npm run format
```

## 🌐 배포

이 프로젝트는 GitHub Actions를 통해 자동으로 빌드되고 GitHub Pages에 배포됩니다.

### 배포 프로세스

1. `main` 브랜치에 코드 푸시
2. GitHub Actions 워크플로우 자동 실행
3. 프로젝트 빌드
4. GitHub Pages에 자동 배포

### GitHub Pages 설정

1. GitHub 저장소 → Settings → Pages
2. Source: "GitHub Actions" 선택
3. 첫 배포 후 URL 확인: `https://[username].github.io/cal1/`

## 📁 프로젝트 구조

```
cal1/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 워크플로우
├── Docs/
│   ├── PRD.md                  # 제품 요구사항 문서
│   └── TECH_SPEC.md            # 기술 명세서
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── main.css        # 메인 스타일시트
│   ├── components/             # UI 컴포넌트
│   ├── core/                   # 계산 엔진
│   ├── state/                  # 상태 관리
│   ├── utils/                  # 유틸리티
│   ├── main.js                 # 앱 진입점
│   └── App.js                  # 메인 앱 클래스
├── index.html                  # HTML 진입점
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 📖 문서

- [PRD (제품 요구사항 문서)](./Docs/PRD.md)
- [Tech Spec (기술 명세서)](./Docs/TECH_SPEC.md)
- [배포 가이드](./Docs/DEPLOYMENT.md)

## 📐 개발 규칙

이 프로젝트는 다음 개발 원칙을 따릅니다:

### 🧪 TDD (Test-Driven Development)
코어 로직(`src/core/`, `src/state/`, `src/utils/`)은 TDD 방식으로 개발합니다.
- **Red-Green-Refactor** 사이클 준수
- 테스트 커버리지 목표: **90%+**
- 상세 가이드: [RULES_TDD.md](./Docs/RULES_TDD.md)

### 🏗️ SOLID 원칙
객체지향 설계의 5가지 핵심 원칙을 따릅니다:
- **S**ingle Responsibility Principle (단일 책임 원칙)
- **O**pen-Closed Principle (개방-폐쇄 원칙)
- **L**iskov Substitution Principle (리스코프 치환 원칙)
- **I**nterface Segregation Principle (인터페이스 분리 원칙)
- **D**ependency Inversion Principle (의존성 역전 원칙)
- 상세 가이드: [RULES_SOLID.md](./Docs/RULES_SOLID.md)

## 🎨 디자인

디자인은 `design/` 폴더의 참조 파일을 기반으로 합니다:
- `code.html`: UI 구조 및 스타일
- `screen.png`: 디자인 스크린샷

## 🤝 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

MIT License

## 👥 작성자

- Product Team
- Engineering Team

## 🙏 감사의 말

- [math.js](https://mathjs.org/) - 수식 평가 엔진
- [Tailwind CSS](https://tailwindcss.com/) - CSS 프레임워크
- [Vite](https://vitejs.dev/) - 빌드 도구
- [Material Symbols](https://fonts.google.com/icons) - 아이콘
- [Google Fonts](https://fonts.google.com/) - 폰트
