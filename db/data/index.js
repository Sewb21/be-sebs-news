const ENV = process.env.NODE_ENV || "development";

console.log(ENV);

const data = {
  development: require("./development-data"),
  test: require("./test-data"),
};

module.exports = data[ENV];
