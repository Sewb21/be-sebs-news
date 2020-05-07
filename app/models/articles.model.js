const knex = require("../../db/connection");

exports.selectArticleByID = (article_id) => {
  return knex
    .select("articles.*")
    .from("articles")
    .where({ "articles.article_id": article_id })
    .count("comments.comment_id as comment_count")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id");
};

exports.updateArticleByID = (article_id, inc_votes) => {
  return knex
    .select("articles.*")
    .from("articles")
    .where({ "articles.article_id": article_id })
    .increment("votes", inc_votes)
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
      else if (topic) query.where({ "articles.topic": topic });
    })
    .returning("*");
};
