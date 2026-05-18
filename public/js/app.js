let posts = [];
let selectedPost = null;

document.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
  bindEvents();
  await loadAndRenderPosts();
}

function bindEvents() {
  elements.postForm.addEventListener("submit", handleSubmit);
  elements.search.addEventListener("input", handleSearch);
  elements.resetSearchButton.addEventListener("click", handleResetSearch);
  elements.cancelEditButton.addEventListener("click", resetForm);
  elements.closeDetailButton.addEventListener("click", handleCloseDetail);
  elements.editButton.addEventListener("click", handleEdit);
  elements.deleteButton.addEventListener("click", handleDelete);
}

async function loadAndRenderPosts() {
  try {
    posts = await fetchPosts();
    renderFilteredPosts();
  } catch (error) {
    alert(error.message);
  }
}

function renderFilteredPosts() {
  const keyword = elements.search.value.trim().toLowerCase();

  const filteredPosts = posts.filter((post) => {
    return (
      post.title.toLowerCase().includes(keyword) ||
      post.author.toLowerCase().includes(keyword) ||
      post.content.toLowerCase().includes(keyword)
    );
  });

  renderPostList(filteredPosts, handleShowDetail);
}

async function handleShowDetail(postId) {
  try {
    selectedPost = await fetchPostById(postId);
    renderPostDetail(selectedPost);
  } catch (error) {
    alert(error.message);
  }
}

async function handleSubmit(event) {
  event.preventDefault();

  const postData = {
    title: elements.title.value,
    author: elements.author.value,
    content: elements.content.value,
  };

  const editingId = elements.postId.value;

  try {
    if (editingId) {
      await updatePost(editingId, postData);
    } else {
      await createPost(postData);
    }

    resetForm();
    closeDetail();
    selectedPost = null;
    await loadAndRenderPosts();
  } catch (error) {
    alert(error.message);
  }
}

function handleSearch() {
  renderFilteredPosts();
}

function handleResetSearch() {
  elements.search.value = "";
  renderFilteredPosts();
}

function handleEdit() {
  if (!selectedPost) {
    alert("수정할 게시글을 먼저 선택하세요.");
    return;
  }

  setEditMode(selectedPost);
}

async function handleDelete() {
  if (!selectedPost) {
    alert("삭제할 게시글을 먼저 선택하세요.");
    return;
  }

  const confirmed = confirm("정말 이 게시글을 삭제하시겠습니까?");

  if (!confirmed) {
    return;
  }

  try {
    await deletePost(selectedPost.id);

    selectedPost = null;
    closeDetail();
    resetForm();
    await loadAndRenderPosts();
  } catch (error) {
    alert(error.message);
  }
}

function handleCloseDetail() {
  selectedPost = null;
  closeDetail();
}
