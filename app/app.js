const express = require("express");
const app = express();
const {
  handleInternalErrors,
} = require("./controllers/error_handling.controller");
const apiRouter = require("./routers/api.router");

app.use(express.json());
app.use("/api", apiRouter);

app.use(handleInternalErrors);

module.exports = app;
