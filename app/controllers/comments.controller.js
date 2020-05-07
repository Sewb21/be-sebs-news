const {
  updateVotesByCommentID,
  removeCommentbyID,
} = require("../models/comments.model");

exports.patchCommentByID = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_vote } = req.body;

  updateVotesByCommentID(comment_id, inc_vote).then((comment) => {
    res.status(200).send({ comment });
  });
};

exports.deleteCommentByID = (req, res, next) => {
  const { comment_id } = req.params;

  removeCommentbyID(comment_id).then(() => {
    res.sendStatus(204);
  });
};
