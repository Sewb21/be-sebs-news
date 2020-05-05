const apiRouter = require("express").Router();
const topicsRouter = require("./topics.router");

apiRouter.get("/", (req, res, next) => {
  res.status(200).send({ msg: "Welcome to NC NEWS!" });
});

apiRouter.use("/topics", topicsRouter);

module.exports = apiRouter;
