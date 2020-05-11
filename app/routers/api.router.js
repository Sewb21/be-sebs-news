const apiRouter = require("express").Router();
const topicsRouter = require("./topics.router");
const usersByUsernameRouter = require("./users.router");
const articlesRouter = require("./articles.router");
const {
  commentsRouter,
  getCommentsByArticleIDRouter,
} = require("./comments.router");
const { getApiInformation } = require("../controllers/api.controller");

apiRouter
  .route("/")
  .get(getApiInformation)
  .all((req, res) => {
    res.status(405).send({ msg: "method not allowed" });
  });

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersByUsernameRouter);
apiRouter.use("/articles", articlesRouter, getCommentsByArticleIDRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
