function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: "요청한 경로를 찾을 수 없습니다.",
  });
}

function errorHandler(error, req, res, next) {
  console.error(error);

  res.status(500).json({
    success: false,
    message: "서버 내부 오류가 발생했습니다.",
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
