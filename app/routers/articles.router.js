const articlesByIDRouter = require("express").Router();
const {
  getArticleByID,
  patchArticleByID,
  postCommentsByArticleID,
} = require("../controllers/articles.controller");

articlesByIDRouter
  .route("/:article_id")
  .get(getArticleByID)
  .patch(patchArticleByID);

articlesByIDRouter.route("/:article_id/comments").post(postCommentsByArticleID);

module.exports = articlesByIDRouter;
