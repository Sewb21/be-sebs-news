const usersByUsernameRouter = require("express").Router();
const { getUserByUsername } = require("../controllers/users.controller.js");

usersByUsernameRouter.route("/:username").get(getUserByUsername);

module.exports = usersByUsernameRouter;
