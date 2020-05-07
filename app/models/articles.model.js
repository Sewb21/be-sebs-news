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

exports.addCommentsByArticleID = (article_id, username, body) => {
  return knex("comments")
    .insert({ author: username, article_id: article_id, body: body })
    .returning(["article_id", "author", "body", "comment_id", "votes"])
    .where({ "comments.body": body });
};

exports.selectCommentsByArticleID = ({ article_id, sort_by, order }) => {
  return knex
    .select("comments.*")
    .from("comments")
    .orderBy(sort_by || "created_at", order || "desc")
    .where("article_id", "=", article_id);
};
