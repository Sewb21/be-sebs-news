const apiRouter = require("express").Router();

apiRouter.get("/", (req, res, next) => {
  res.status(200).send({ msg: "Welcome to NC NEWS!" });
});

module.exports = apiRouter;
