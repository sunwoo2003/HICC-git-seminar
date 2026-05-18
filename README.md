# Git Seminar Board

Git/GitHub 세미나 실습용 로컬 게시판 예제입니다.

브라우저에서 바로 파일을 여는 방식이 아니라, Node.js 서버를 실행한 뒤 `http://localhost:8000`으로 접속하는 구조입니다.

## 주요 기능

- 게시글 목록 조회
- 게시글 상세 조회
- 게시글 작성
- 게시글 수정
- 게시글 삭제
- 게시글 검색
- JSON 파일 기반 데이터 저장

## 실행 방법

### 1. Node.js 설치 확인

```bash
node -v
npm -v
```

Node.js가 설치되어 있지 않다면 먼저 설치해야 합니다.

### 2. 패키지 설치

```bash
npm install
```

### 3. 서버 실행

```bash
npm start
```

### 4. 브라우저 접속

```text
http://localhost:8000
```

## 폴더 구조

```text
git-seminar-board/
├── data/
│   └── posts.json
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── api.js
│   │   ├── app.js
│   │   └── dom.js
│   └── index.html
├── src/
│   ├── controllers/
│   │   └── posts.controller.js
│   ├── middlewares/
│   │   ├── errorHandlers.js
│   │   ├── requestLogger.js
│   │   └── simpleRateLimit.js
│   ├── models/
│   │   └── posts.model.js
│   ├── routes/
│   │   └── posts.routes.js
│   └── utils/
│       ├── fileStore.js
│       └── validators.js
├── package.json
├── README.md
└── server.js
```


### 협업 미션

1. `feature/update-style` 브랜치 생성
2. CSS 수정
3. commit
4. push
5. Pull Request 생성
6. merge

## 권장 Git 흐름

```bash
git status
git add .
git commit -m "Update board style"
git push
```
## 제작자
홍익대학교 컴퓨터공학과 25학번 이혁진