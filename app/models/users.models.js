const knex = require("../../db/connection");

exports.selectUserByUsername = (username) => {
  return knex("users").where("username", username);
};
