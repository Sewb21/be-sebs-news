const commentsRouter = require("express").Router();
const getCommentsByArticleIDRouter = require("express").Router();
const {
  patchCommentByID,
  deleteCommentByID,
  postCommentsByArticleID,
  getCommentsByArticleID,
} = require("../controllers/comments.controller");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentByID)
  .delete(deleteCommentByID);

getCommentsByArticleIDRouter
  .route("/:article_id/comments")
  .post(postCommentsByArticleID)
  .get(getCommentsByArticleID);

module.exports = { commentsRouter, getCommentsByArticleIDRouter };
