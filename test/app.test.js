process.env.NODE_ENV = "test";

const knex = require("../db/connection");
const request = require("supertest");
const app = require("../app/app");
beforeEach(() => {
  return knex.seed.run();
});
afterAll(() => {
  return knex.destroy();
});

describe("/api", () => {
  describe("GET", () => {
    test("responds with a status: 200 and a msg: Welcome to NC NEWS!", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.msg).toBe("Welcome to NC NEWS!");
        });
    });
    describe("/topics", () => {
      test("responds with a status: 200 and a topic object of whats been sent", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body }) => {
            body.topics.forEach((topic) => {
              expect(topic).toHaveProperty("slug");
              expect(topic).toHaveProperty("description");
            });
          });
      });
    });
    describe("users", () => {
      test("responds with a status: 200 and a specific user object", () => {
        return request(app)
          .get("/api/users/butter_bridge")
          .expect(200)
          .then(({ body }) => {
            body.user.forEach((user) => {
              expect(user).toHaveProperty("username");
              expect(user).toHaveProperty("avatar_url");
              expect(user).toHaveProperty("name");
            });
          });
      });
    });
  });
});
