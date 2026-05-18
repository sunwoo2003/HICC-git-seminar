const express = require("express");
const helmet = require("helmet");
const path = require("path");

const postsRouter = require("./src/routes/posts.routes");
const { requestLogger } = require("./src/middlewares/requestLogger");
const { simpleRateLimit } = require("./src/middlewares/simpleRateLimit");
const { notFoundHandler, errorHandler } = require("./src/middlewares/errorHandlers");

const app = express();
const PORT = 8000;

/**
 * 보안 헤더 설정
 * - Content Security Policy로 외부 스크립트 실행을 제한한다.
 * - 현재 프로젝트는 외부 CDN을 사용하지 않으므로 default-src 'self'가 적합하다.
 */
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
      },
    },
  })
);

/**
 * 요청 본문 크기 제한
 * - 사용자가 너무 큰 데이터를 보내 서버 자원을 과도하게 쓰는 것을 방지한다.
 */
app.use(express.json({ limit: "20kb" }));

app.use(requestLogger);
app.use(simpleRateLimit);

/**
 * 정적 파일 제공
 * - public 폴더 안의 HTML/CSS/JS만 브라우저에 공개한다.
 * - src, data 폴더는 직접 접근할 수 없다.
 */
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/posts", postsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
