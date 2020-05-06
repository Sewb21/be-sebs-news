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
  test("responds with a status: 200 and a msg: Welcome to NC NEWS!", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.msg).toBe("Welcome to NC NEWS!");
      });
  });
  describe("/topics", () => {
    describe("GET", () => {
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
  });
  describe("/users/:username", () => {
    describe("GET", () => {
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
  describe("/articles/:article_id", () => {
    describe("GET", () => {
      test("responds with a status: 200 and a article object which should have certain properties", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(({ body }) => {
            expect(body[0]).toHaveProperty("author");
            expect(body[0]).toHaveProperty("title");
            expect(body[0]).toHaveProperty("article_id");
            expect(body[0]).toHaveProperty("body");
            expect(body[0]).toHaveProperty("topic");
            expect(body[0]).toHaveProperty("created_at");
            expect(body[0]).toHaveProperty("votes");
            expect(body[0]).toHaveProperty("comment_count");
          });
      });
    });
    describe("ERRORS", () => {
      test("responds with a status: 400 for a bad request", () => {
        return request(app)
          .get("/api/articles/not-an-id")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("bad request");
          });
      });
      // test("responds with a status: 405 for a method not allowed", () => {
      //   return request(app)
      //     .post("/api/articles/1")
      //     .expect(405)
      //     .then(({ body: { msg } }) => {
      //       expect(msg).toBe("method not allowed");
      //     });
      // });
    });
    describe("PATCH", () => {});
  });
});
