const apiRouter = require("express").Router();
const topicsRouter = require("./topics.router");
const usersByUsernameRouter = require("./users.router");
const articlesRouter = require("./articles.router");
const {
  commentsRouter,
  getCommentsByArticleIDRouter,
} = require("./comments.router");

apiRouter
  .get("/", (req, res, next) => {
    res.status(200).send({ msg: "Welcome to NC NEWS!" });
  })
  .all((req, res) => {
    res.status(405).send({ msg: "method not allowed" });
  });

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersByUsernameRouter);
apiRouter.use("/articles", articlesRouter, getCommentsByArticleIDRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
