const API_BASE_URL = "/api/posts";

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "요청 처리 중 오류가 발생했습니다.");
  }

  return result.data;
}

async function fetchPosts() {
  return requestJson(API_BASE_URL);
}

async function fetchPostById(id) {
  return requestJson(`${API_BASE_URL}/${id}`);
}

async function createPost(postData) {
  return requestJson(API_BASE_URL, {
    method: "POST",
    body: JSON.stringify(postData),
  });
}

async function updatePost(id, postData) {
  return requestJson(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(postData),
  });
}

async function deletePost(id) {
  return requestJson(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
}
