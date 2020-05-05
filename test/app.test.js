process.env.NODE_ENV = "test";

const connection = require("../db/connection");
const request = require("supertest");
const app = require("../app/app");

describe("/api", () => {
  afterAll(() => {
    return connection.end();
  });
  describe("GET", () => {
    test("responds with a status: 200 and a msg: Welcome to NC NEWS!", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.msg).toBe("Welcome to NC NEWS!");
        });
    });
  });
});
