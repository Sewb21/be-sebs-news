const info = require("../../endpoints.json");

exports.getApiInformation = (req, res, next) => {
  res.status(200).send(info);
};
