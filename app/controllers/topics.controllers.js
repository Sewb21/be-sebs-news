const { selectTopics } = require("../models/topics.models.js");

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      res.send({ topics });
    })
    .catch(next);
};
