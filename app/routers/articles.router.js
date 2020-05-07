const articlesRouter = require("express").Router();

const {
  getAllArticles,
  getArticleByID,
  patchArticleByID,
  postCommentsByArticleID,
  getCommentsByArticleID,
} = require("../controllers/articles.controller");

articlesRouter.route("/").get(getAllArticles);

articlesRouter
  .route("/:article_id")
  .get(getArticleByID)
  .patch(patchArticleByID);

articlesRouter
  .route("/:article_id/comments")
  .post(postCommentsByArticleID)
  .get(getCommentsByArticleID);

module.exports = articlesRouter;
