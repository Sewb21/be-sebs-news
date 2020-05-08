const usersByUsernameRouter = require("express").Router();
const { getUserByUsername } = require("../controllers/users.controller.js");

usersByUsernameRouter
  .route("/:username")
  .get(getUserByUsername)
  .all((req, res) => {
    res.status(405).send({ msg: "method not allowed" });
  });

module.exports = usersByUsernameRouter;
