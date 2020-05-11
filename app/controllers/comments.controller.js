const {
  updateVotesByCommentID,
  removeCommentbyID,
  addCommentsByArticleID,
  selectCommentsByArticleID,
} = require("../models/comments.model");

exports.postCommentsByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  const { username } = req.body;
  const { body } = req.body;

  addCommentsByArticleID(article_id, username, body)
    .then((postedComment) => {
      const newPostedComment = { comment: postedComment[0] };
      res.status(201).send(newPostedComment);
    })
    .catch(next);
};

exports.getCommentsByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;

  selectCommentsByArticleID(article_id, sort_by, order)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.patchCommentByID = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_vote } = req.body;

  updateVotesByCommentID(comment_id, inc_vote)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteCommentByID = (req, res, next) => {
  const { comment_id } = req.params;

  removeCommentbyID(comment_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
