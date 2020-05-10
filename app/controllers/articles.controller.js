const {
  selectArticleByID,
  updateArticleByID,
  selectAllArticles,
} = require("../models/articles.model");

exports.getArticleByID = (req, res, next) => {
  const { article_id } = req.params;

  selectArticleByID(article_id)
    .then((article) => {
      const newArticle = { article: article[0] };
      res.status(200).send(newArticle);
    })
    .catch(next);
};

exports.patchArticleByID = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  updateArticleByID(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;

  selectAllArticles({ sort_by, order, author, topic })
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
