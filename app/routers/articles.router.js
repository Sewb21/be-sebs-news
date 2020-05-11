const articlesRouter = require("express").Router();

const {
  getAllArticles,
  getArticleByID,
  patchArticleByID,
} = require("../controllers/articles.controller");

articlesRouter
  .route("/")
  .get(getAllArticles)
  .all((req, res) => {
    res.status(405).send({ msg: "method not allowed" });
  });

articlesRouter
  .route("/:article_id")
  .get(getArticleByID)
  .patch(patchArticleByID)
  .all((req, res) => {
    res.status(405).send({ msg: "method not allowed" });
  });

module.exports = articlesRouter;
