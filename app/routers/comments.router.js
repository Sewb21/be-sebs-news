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
  .delete(deleteCommentByID)
  .all((req, res) => {
    res.status(405).send({ msg: "method not allowed" });
  });

getCommentsByArticleIDRouter
  .route("/:article_id/comments")
  .post(postCommentsByArticleID)
  .get(getCommentsByArticleID)
  .all((req, res) => {
    res.status(405).send({ msg: "method not allowed" });
  });

module.exports = { commentsRouter, getCommentsByArticleIDRouter };
