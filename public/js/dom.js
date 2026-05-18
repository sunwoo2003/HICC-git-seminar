const elements = {
  postForm: document.querySelector("#post-form"),
  postId: document.querySelector("#post-id"),
  title: document.querySelector("#title"),
  author: document.querySelector("#author"),
  content: document.querySelector("#content"),
  formTitle: document.querySelector("#form-title"),
  submitButton: document.querySelector("#submit-button"),
  cancelEditButton: document.querySelector("#cancel-edit-button"),

  search: document.querySelector("#search"),
  resetSearchButton: document.querySelector("#reset-search-button"),
  postList: document.querySelector("#post-list"),
  postCount: document.querySelector("#post-count"),

  detailSection: document.querySelector("#detail-section"),
  detailTitle: document.querySelector("#detail-title"),
  detailMeta: document.querySelector("#detail-meta"),
  detailContent: document.querySelector("#detail-content"),
  editButton: document.querySelector("#edit-button"),
  deleteButton: document.querySelector("#delete-button"),
  closeDetailButton: document.querySelector("#close-detail-button"),
};

/**
 * XSS 방어 포인트
 * - 게시글 제목/작성자/내용을 innerHTML로 넣지 않는다.
 * - textContent 또는 createTextNode를 사용하면 HTML 태그가 코드로 실행되지 않고 텍스트로 출력된다.
 */
function createTextCell(label, text) {
  const td = document.createElement("td");
  td.dataset.label = label;
  td.textContent = text;
  return td;
}

function renderPostList(posts, onTitleClick) {
  elements.postCount.textContent = `${posts.length}개`;

  if (posts.length === 0) {
    elements.postList.innerHTML = "";
    const emptyMessage = document.createElement("div");
    emptyMessage.className = "empty-message";
    emptyMessage.textContent = "게시글이 없습니다.";
    elements.postList.appendChild(emptyMessage);
    return;
  }

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  thead.innerHTML = `
    <tr>
      <th style="width: 80px;">번호</th>
      <th>제목</th>
      <th style="width: 140px;">작성자</th>
      <th style="width: 180px;">작성일</th>
    </tr>
  `;

  posts.forEach((post, index) => {
    const tr = document.createElement("tr");

    tr.appendChild(createTextCell("번호", String(posts.length - index)));

    const titleCell = document.createElement("td");
    titleCell.dataset.label = "제목";

    const titleButton = document.createElement("button");
    titleButton.type = "button";
    titleButton.className = "title-button";
    titleButton.textContent = post.title;
    titleButton.addEventListener("click", () => onTitleClick(post.id));

    titleCell.appendChild(titleButton);
    tr.appendChild(titleCell);

    tr.appendChild(createTextCell("작성자", post.author));
    tr.appendChild(createTextCell("작성일", post.createdAt));

    tbody.appendChild(tr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);

  elements.postList.innerHTML = "";
  elements.postList.appendChild(table);
}

function renderPostDetail(post) {
  elements.detailTitle.textContent = post.title;
  elements.detailMeta.textContent = `작성자: ${post.author} | 작성일: ${post.createdAt} | 수정일: ${post.updatedAt}`;
  elements.detailContent.textContent = post.content;
  elements.detailSection.classList.remove("hidden");
  elements.detailSection.scrollIntoView({ behavior: "smooth" });
}

function setEditMode(post) {
  elements.postId.value = post.id;
  elements.title.value = post.title;
  elements.author.value = post.author;
  elements.content.value = post.content;

  elements.formTitle.textContent = "게시글 수정";
  elements.submitButton.textContent = "수정 완료";
  elements.cancelEditButton.classList.remove("hidden");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetForm() {
  elements.postForm.reset();
  elements.postId.value = "";

  elements.formTitle.textContent = "게시글 작성";
  elements.submitButton.textContent = "등록하기";
  elements.cancelEditButton.classList.add("hidden");
}

function closeDetail() {
  elements.detailSection.classList.add("hidden");
}
