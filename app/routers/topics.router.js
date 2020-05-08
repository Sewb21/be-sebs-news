const topicsRouter = require("express").Router();
const { getTopics } = require("../controllers/topics.controllers");

topicsRouter
  .route("/")
  .get(getTopics)
  .all((req, res) => {
    res.status(405).send({ msg: "method not allowed" });
  });

module.exports = topicsRouter;
