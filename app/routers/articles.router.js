const articlesByIDRouter = require("express").Router();
const {
  getArticleByID,
  patchArticleByID,
  postCommentsByArticleID,
  getCommentsByArticleID,
} = require("../controllers/articles.controller");

articlesByIDRouter
  .route("/:article_id")
  .get(getArticleByID)
  .patch(patchArticleByID);

articlesByIDRouter
  .route("/:article_id/comments")
  .post(postCommentsByArticleID)
  .get(getCommentsByArticleID);

module.exports = articlesByIDRouter;
