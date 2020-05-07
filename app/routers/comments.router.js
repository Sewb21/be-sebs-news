const commentsRouter = require("express").Router();
const {
  patchCommentByID,
  deleteCommentByID,
} = require("../controllers/comments.controller");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentByID)
  .delete(deleteCommentByID);

module.exports = commentsRouter;
