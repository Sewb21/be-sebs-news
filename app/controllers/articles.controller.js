const {
  selectArticleByID,
  updateArticleByID,
  addCommentsByArticleID,
  selectCommentsByArticleID,
  selectAllArticles,
} = require("../models/articles.model");

exports.getArticleByID = (req, res, next) => {
  const { article_id } = req.params;

  selectArticleByID(article_id)
    .then((article) => {
      res.send({ article });
    })
    .catch(next);
};

exports.patchArticleByID = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  updateArticleByID(article_id, inc_votes)
    .then((updatedArticle) => {
      res.send({ updatedArticle });
    })
    .catch(next);
};

exports.postCommentsByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  const { username } = req.body;
  const { body } = req.body;

  addCommentsByArticleID(article_id, username, body)
    .then((postedComment) => {
      res.status(200).send({ postedComment });
    })
    .catch(next);
};

exports.getCommentsByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;

  selectCommentsByArticleID({ article_id, sort_by, order })
    .then((comments) => {
      res.send({ comments });
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;

  selectAllArticles({ sort_by, order, author, topic })
    .then((articles) => {
      res.send({ articles });
    })
    .catch(next);
};
