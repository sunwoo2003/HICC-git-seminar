const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "../../data");

/**
 * 파일 이름을 안전하게 제한한다.
 * - 외부 입력값으로 파일 경로를 직접 만들면 path traversal 취약점이 생길 수 있다.
 * - 이 프로젝트에서는 허용된 파일 이름만 사용하도록 제한한다.
 */
const ALLOWED_FILES = new Set(["posts.json"]);

function getSafeFilePath(fileName) {
  if (!ALLOWED_FILES.has(fileName)) {
    throw new Error("허용되지 않은 파일 접근입니다.");
  }

  return path.join(DATA_DIR, fileName);
}

function readJsonFile(fileName) {
  const filePath = getSafeFilePath(fileName);

  if (!fs.existsSync(filePath)) {
    writeJsonFile(fileName, []);
  }

  const rawData = fs.readFileSync(filePath, "utf-8");

  if (!rawData.trim()) {
    return [];
  }

  return JSON.parse(rawData);
}

function writeJsonFile(fileName, data) {
  const filePath = getSafeFilePath(fileName);
  const tempFilePath = `${filePath}.tmp`;

  /**
   * 임시 파일에 먼저 쓰고 rename한다.
   * - 저장 중 오류가 발생했을 때 원본 파일이 망가질 가능성을 줄인다.
   */
  fs.writeFileSync(tempFilePath, JSON.stringify(data, null, 2), "utf-8");
  fs.renameSync(tempFilePath, filePath);
}

module.exports = {
  readJsonFile,
  writeJsonFile,
};
