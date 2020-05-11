const knex = require("../../db/connection");

exports.selectArticleByID = (article_id) => {
  return knex
    .select("articles.*")
    .from("articles")
    .where({ "articles.article_id": article_id })
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .count("comments.comment_id as comment_count")
    .groupBy("articles.article_id")
    .then((articles) => {
      if (articles.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "article not found",
        });
      } else return articles;
    });
};

exports.updateArticleByID = (article_id, inc_votes) => {
  return knex("articles")
    .where({ "articles.article_id": article_id })
    .increment("votes", inc_votes || 0)
    .returning("*");
};

exports.selectAllArticles = ({ sort_by, order, author, topic }) => {
  return knex("articles")
    .select("articles.*")
    .count("comments.comment_id as comment_count")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .orderBy(sort_by || "created_at", order || "desc")
    .groupBy("articles.article_id")
    .modify((query) => {
      if (author) query.where({ "articles.author": author });
      if (topic) query.where({ "articles.topic": topic });
    });
};
