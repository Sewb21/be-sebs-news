const {
  selectArticleByID,
  updateArticleByID,
  selectAllArticles,
} = require("../models/articles.model");
const { selectUserByUsername } = require("../models/users.models");
const { selectTopics } = require("../models/topics.models");

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
      const newArticle = { article: article[0] };
      res.status(200).send(newArticle);
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;
  const queries = [selectAllArticles({ sort_by, order, author, topic })];

  if (topic) queries.push(selectTopics(topic));
  if (author) queries.push(selectUserByUsername(author));

  Promise.all(queries)
    .then((results) => {
      const articles = results[0];
      res.status(200).send({ articles });
    })
    .catch(next);
};
