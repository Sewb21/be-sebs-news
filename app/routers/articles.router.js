const articlesRouter = require("express").Router();

const {
  getAllArticles,
  getArticleByID,
  patchArticleByID,
} = require("../controllers/articles.controller");

articlesRouter.route("/").get(getAllArticles);

articlesRouter
  .route("/:article_id")
  .get(getArticleByID)
  .patch(patchArticleByID);

module.exports = articlesRouter;
