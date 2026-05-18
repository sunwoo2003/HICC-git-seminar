const { readJsonFile, writeJsonFile } = require("../utils/fileStore");

const POSTS_FILE_NAME = "posts.json";

/**
 * 모든 게시글 조회
 */
function findAllPosts() {
  return readJsonFile(POSTS_FILE_NAME);
}

/**
 * ID로 게시글 조회
 */
function findPostById(id) {
  const posts = findAllPosts();
  const postId = Number(id);

  if (!Number.isSafeInteger(postId)) {
    return null;
  }

  return posts.find((post) => post.id === postId) || null;
}

/**
 * 게시글 추가
 */
function insertPost({ title, author, content }) {
  const posts = findAllPosts();

  const newPost = {
    id: Date.now(),
    title,
    author,
    content,
    createdAt: getCurrentDateTime(),
    updatedAt: getCurrentDateTime(),
  };

  posts.unshift(newPost);
  writeJsonFile(POSTS_FILE_NAME, posts);

  return newPost;
}

/**
 * 게시글 수정
 */
function modifyPost(id, { title, author, content }) {
  const posts = findAllPosts();
  const postId = Number(id);

  if (!Number.isSafeInteger(postId)) {
    return null;
  }

  let updatedPost = null;

  const nextPosts = posts.map((post) => {
    if (post.id !== postId) {
      return post;
    }

    updatedPost = {
      ...post,
      title,
      author,
      content,
      updatedAt: getCurrentDateTime(),
    };

    return updatedPost;
  });

  if (!updatedPost) {
    return null;
  }

  writeJsonFile(POSTS_FILE_NAME, nextPosts);

  return updatedPost;
}

/**
 * 게시글 삭제
 */
function removePost(id) {
  const posts = findAllPosts();
  const postId = Number(id);

  if (!Number.isSafeInteger(postId)) {
    return null;
  }

  const deletedPost = posts.find((post) => post.id === postId) || null;

  if (!deletedPost) {
    return null;
  }

  const nextPosts = posts.filter((post) => post.id !== postId);
  writeJsonFile(POSTS_FILE_NAME, nextPosts);

  return deletedPost;
}

function getCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${date} ${hours}:${minutes}`;
}

module.exports = {
  findAllPosts,
  findPostById,
  insertPost,
  modifyPost,
  removePost,
};
