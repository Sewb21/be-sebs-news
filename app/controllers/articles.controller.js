const {
  selectArticleByID,
  updateArticleByID,
} = require("../models/articles.model");

exports.getArticleByID = (req, res, next) => {
  const { article_id } = req.params;

  selectArticleByID(article_id)
    .then((article) => {
      res.send(article);
    })
    .catch(next);
};

exports.patchArticleByID = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  updateArticleByID(article_id, inc_votes)
    .then((updatedArticle) => {
      res.send(updatedArticle);
    })
    .catch(next);
};
