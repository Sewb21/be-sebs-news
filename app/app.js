const express = require("express");
const app = express();
const cors = require("cors");
const {
  handleInternalErrors,
  handlePSQLErrors,
  handleCustomErrors,
} = require("./controllers/error_handling.controller");
const apiRouter = require("./routers/api.router");

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleInternalErrors);

module.exports = app;
