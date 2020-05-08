const express = require("express");
const app = express();
const {
  handleInternalErrors,
  handlePSQLErrors,
  handleCustomErrors,
} = require("./controllers/error_handling.controller");
const apiRouter = require("./routers/api.router");

app.use(express.json());
app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleInternalErrors);

module.exports = app;
