const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 100;

const clients = new Map();

/**
 * 간단한 요청 횟수 제한
 * - 같은 IP에서 1분에 100번 넘게 요청하면 차단한다.
 * - 실제 서비스에서는 express-rate-limit 같은 검증된 패키지를 권장한다.
 */
function simpleRateLimit(req, res, next) {
  const now = Date.now();
  const clientKey = req.ip;

  const current = clients.get(clientKey) || {
    count: 0,
    startTime: now,
  };

  if (now - current.startTime > WINDOW_MS) {
    current.count = 0;
    current.startTime = now;
  }

  current.count += 1;
  clients.set(clientKey, current);

  if (current.count > MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      message: "요청이 너무 많습니다. 잠시 후 다시 시도하세요.",
    });
  }

  next();
}

module.exports = {
  simpleRateLimit,
};
