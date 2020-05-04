const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};

const customConfig = {
  development: {
    connection: {
      database: "nc_news",
      user: sewb,
      password: password21,
    },
  },
  test: {
    connection: {
      database: "nc_news_test",
      user: sewb,
      password: password21,
    },
  },
};

module.exports = { ...customConfig[ENV], ...baseConfig };
