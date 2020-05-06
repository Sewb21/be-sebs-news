const apiRouter = require("express").Router();
const topicsRouter = require("./topics.router");
const usersByIDRouter = require("./users.router");

apiRouter.get("/", (req, res, next) => {
  res.status(200).send({ msg: "Welcome to NC NEWS!" });
});

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersByIDRouter);

module.exports = apiRouter;
