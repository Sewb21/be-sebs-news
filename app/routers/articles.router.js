const articlesByIDRouter = require("express").Router();
const {
  getArticleByID,
  patchArticleByID,
} = require("../controllers/articles.controller");

articlesByIDRouter
  .route("/:article_id")
  .get(getArticleByID)
  .patch(patchArticleByID);

module.exports = articlesByIDRouter;
