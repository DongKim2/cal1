# 공학용 전자계산기 웹앱 - 배포 가이드

## 📋 배포 준비 체크리스트

### 1. GitHub 저장소 설정

#### 1.1 저장소 생성 (이미 있다면 건너뛰기)
```bash
# GitHub에서 새 저장소 생성 후
git init
git add .
git commit -m "Initial commit: Project setup"
git branch -M main
git remote add origin https://github.com/[username]/cal1.git
git push -u origin main
```

#### 1.2 GitHub Pages 활성화
1. GitHub 저장소 페이지 접속
2. **Settings** 클릭
3. 왼쪽 메뉴에서 **Pages** 클릭
4. **Source** 섹션에서:
   - Source: **GitHub Actions** 선택
5. 저장

### 2. Vite 설정 확인

`vite.config.js` 파일에서 `base` 경로를 저장소 이름에 맞게 수정:

```javascript
// 저장소 이름이 'cal1'인 경우
base: process.env.NODE_ENV === 'production' ? '/cal1/' : '/',

// 사용자/조직 페이지 (username.github.io)인 경우
base: process.env.NODE_ENV === 'production' ? '/' : '/',
```

### 3. 로컬 테스트

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드 테스트
npm run build
npm run preview
```

### 4. 배포 실행

```bash
# 변경사항 커밋
git add .
git commit -m "Add deployment configuration"

# main 브랜치에 푸시
git push origin main
```

### 5. 배포 확인

1. GitHub 저장소 → **Actions** 탭
2. 워크플로우 실행 상태 확인
3. 성공 후 배포 URL 확인:
   - `https://[username].github.io/cal1/`

---

## 🔧 GitHub Actions 워크플로우 설명

### 워크플로우 파일: `.github/workflows/deploy.yml`

#### 트리거 조건
- `main` 브랜치에 푸시할 때
- Pull Request 생성 시 (빌드만 실행)
- 수동 실행 (`workflow_dispatch`)

#### 작업 단계

**Build Job**:
1. 저장소 체크아웃
2. Node.js 18 설정
3. 의존성 설치 (`npm ci`)
4. 프로젝트 빌드 (`npm run build`)
5. GitHub Pages 설정
6. 빌드 결과물 업로드

**Deploy Job**:
1. Build Job 완료 대기
2. GitHub Pages에 배포

---

## 🚨 문제 해결

### 배포가 실패하는 경우

#### 1. GitHub Pages 권한 오류
**증상**: `Error: Resource not accessible by integration`

**해결**:
1. Settings → Actions → General
2. **Workflow permissions** 섹션
3. **Read and write permissions** 선택
4. **Save** 클릭

#### 2. 404 에러 (페이지를 찾을 수 없음)
**증상**: 배포 후 페이지 접속 시 404 에러

**해결**:
- `vite.config.js`의 `base` 경로 확인
- 저장소 이름과 일치하는지 확인
- 예: 저장소가 `cal1`이면 `base: '/cal1/'`

#### 3. CSS/JS 파일 로딩 실패
**증상**: 페이지는 열리지만 스타일이나 기능이 작동하지 않음

**해결**:
- 브라우저 개발자 도구 → Network 탭 확인
- 파일 경로가 올바른지 확인
- `base` 경로 설정 재확인

#### 4. 빌드 실패
**증상**: GitHub Actions에서 빌드 단계 실패

**해결**:
```bash
# 로컬에서 빌드 테스트
npm run build

# 에러 메시지 확인 후 수정
```

---

## 📊 배포 후 확인사항

### 기능 테스트
- [ ] 페이지 로딩 확인
- [ ] 다크 모드 전환 작동
- [ ] 계산 기능 작동
- [ ] DEG/RAD 모드 전환
- [ ] 반응형 디자인 (모바일/데스크톱)
- [ ] 키보드 입력 작동

### 성능 확인
```bash
# Lighthouse 점수 확인
1. Chrome DevTools 열기 (F12)
2. Lighthouse 탭
3. "Generate report" 클릭
4. 목표: Performance > 90, Accessibility > 90
```

---

## 🔄 업데이트 배포

코드 수정 후 재배포:

```bash
# 변경사항 커밋
git add .
git commit -m "Update: [변경 내용]"

# 푸시 (자동 배포 트리거)
git push origin main
```

---

## 🌐 커스텀 도메인 설정 (선택사항)

### 1. 도메인 구매 후

1. GitHub 저장소 → Settings → Pages
2. **Custom domain** 입력
3. **Save** 클릭

### 2. DNS 설정

도메인 제공업체에서 다음 레코드 추가:

```
Type: A
Name: @
Value: 185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153

Type: CNAME
Name: www
Value: [username].github.io
```

### 3. HTTPS 활성화

1. DNS 전파 대기 (최대 24시간)
2. GitHub Pages 설정에서 **Enforce HTTPS** 체크

---

## 📝 배포 체크리스트

배포 전 최종 확인:

- [ ] `package.json` 의존성 확인
- [ ] `vite.config.js` base 경로 설정
- [ ] `.gitignore` 파일 확인
- [ ] GitHub Actions 워크플로우 파일 존재
- [ ] 로컬 빌드 테스트 성공
- [ ] GitHub Pages 설정 완료
- [ ] 저장소 권한 설정 확인

---

## 🎯 다음 단계

1. ✅ 설정 파일 생성 완료
2. ⏭️ 의존성 설치: `npm install`
3. ⏭️ 로컬 테스트: `npm run dev`
4. ⏭️ Git 커밋 및 푸시
5. ⏭️ GitHub Actions 배포 확인

---

**작성일**: 2025-12-23  
**버전**: 1.0
