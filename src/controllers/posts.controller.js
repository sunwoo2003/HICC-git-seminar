const {
  findAllPosts,
  findPostById,
  insertPost,
  modifyPost,
  removePost,
} = require("../models/posts.model");
const { validatePostInput } = require("../utils/validators");

/**
 * 게시글 목록 조회
 */
function getPosts(req, res, next) {
  try {
    const posts = findAllPosts();

    res.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 게시글 상세 조회
 */
function getPostById(req, res, next) {
  try {
    const post = findPostById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "게시글을 찾을 수 없습니다.",
      });
    }

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 게시글 생성
 */
function createPost(req, res, next) {
  try {
    const validation = validatePostInput(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.message,
      });
    }

    const newPost = insertPost(validation.value);

    res.status(201).json({
      success: true,
      data: newPost,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 게시글 수정
 */
function updatePost(req, res, next) {
  try {
    const validation = validatePostInput(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.message,
      });
    }

    const updatedPost = modifyPost(req.params.id, validation.value);

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "수정할 게시글을 찾을 수 없습니다.",
      });
    }

    res.json({
      success: true,
      data: updatedPost,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 게시글 삭제
 */
function deletePost(req, res, next) {
  try {
    const deletedPost = removePost(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "삭제할 게시글을 찾을 수 없습니다.",
      });
    }

    res.json({
      success: true,
      data: deletedPost,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
