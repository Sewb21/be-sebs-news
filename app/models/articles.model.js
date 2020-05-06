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
