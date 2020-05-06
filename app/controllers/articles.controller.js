const {
  selectArticleByID,
  updateArticleByID,
  addCommentsByArticleID,
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

exports.postCommentsByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  const { username } = req.body;
  const { body } = req.body;

  addCommentsByArticleID(article_id, username, body)
    .then((postedComment) => {
      res.send(postedComment);
    })
    .catch(next);
};
