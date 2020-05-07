const knex = require("../../db/connection");

exports.updateVotesByCommentID = (comment_id, inc_vote) => {
  return knex("comments")
    .where({ "comments.comment_id": comment_id })
    .increment("votes", inc_vote)
    .returning("*");
};

exports.removeCommentbyID = (comment_id) => {
  return knex("comments")
    .where({ comment_id })
    .del()
    .then((delCount) => {
      if (delCount === 0) {
        return Promise.reject({ status: 404, msg: "comment not found" });
      }
    });
};
