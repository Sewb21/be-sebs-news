const apiRouter = require("express").Router();
const topicsRouter = require("./topics.router");
const usersByUsernameRouter = require("./users.router");
const articlesByIDRouter = require("./articles.router");

apiRouter.get("/", (req, res, next) => {
  res.status(200).send({ msg: "Welcome to NC NEWS!" });
});

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersByUsernameRouter);
apiRouter.use("/articles", articlesByIDRouter);

module.exports = apiRouter;
