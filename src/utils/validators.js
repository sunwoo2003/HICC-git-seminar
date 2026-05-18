/**
 * 게시글 입력값 검증
 * - 서버는 클라이언트를 절대 믿지 않는다.
 * - 프론트엔드에서 검증했더라도 서버에서 한 번 더 검증해야 한다.
 */
function validatePostInput(input) {
  if (!input || typeof input !== "object") {
    return {
      isValid: false,
      message: "잘못된 요청입니다.",
    };
  }

  const title = normalizeText(input.title);
  const author = normalizeText(input.author);
  const content = normalizeText(input.content);

  if (!title || !author || !content) {
    return {
      isValid: false,
      message: "제목, 작성자, 내용을 모두 입력하세요.",
    };
  }

  if (title.length > 80) {
    return {
      isValid: false,
      message: "제목은 80자 이하로 입력하세요.",
    };
  }

  if (author.length > 30) {
    return {
      isValid: false,
      message: "작성자는 30자 이하로 입력하세요.",
    };
  }

  if (content.length > 2000) {
    return {
      isValid: false,
      message: "내용은 2000자 이하로 입력하세요.",
    };
  }

  return {
    isValid: true,
    value: {
      title,
      author,
      content,
    },
  };
}

/**
 * 입력값 정규화
 * - 문자열이 아닌 값은 빈 문자열로 처리한다.
 * - 앞뒤 공백을 제거한다.
 * - 연속 공백을 정리한다.
 *
 * 참고:
 * XSS 방어는 서버에서 특수문자를 무조건 바꾸는 방식보다,
 * 브라우저 출력 시 innerHTML 대신 textContent를 사용하는 방식이 더 명확하다.
 */
function normalizeText(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\r\n/g, "\n");
}

module.exports = {
  validatePostInput,
};
