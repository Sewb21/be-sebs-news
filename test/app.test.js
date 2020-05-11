process.env.NODE_ENV = "test";

const knex = require("../db/connection");
const request = require("supertest");
const app = require("../app/app");
beforeEach(() => {
  return knex.seed.run();
});
const date = Date.now();
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
  test("returns a status: 405 for an invalid method", () => {
    return request(app)
      .post("/api/topics")
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).toBe("method not allowed");
      });
  });
  test("returns a status: 405 for an invalid method", () => {
    return request(app)
      .patch("/api/topics")
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).toBe("method not allowed");
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
          expect(body.user).toHaveProperty("username");
          expect(body.user).toHaveProperty("avatar_url");
          expect(body.user).toHaveProperty("name");
        });
    });
    test("returns a status: 405 for an invalid method", () => {
      return request(app)
        .post("/api/users/butter_bridge")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).toBe("method not allowed");
        });
    });
    test("returns a status: 405 for an invalid method", () => {
      return request(app)
        .patch("/api/users/butter_bridge")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).toBe("method not allowed");
        });
    });
    test("returns a status: 404 for a bad request e.g. invalid username", () => {
      return request(app)
        .get("/api/users/donkey_kong")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("user not found");
        });
    });
  });
});

describe("/articles/:article_id", () => {
  describe("GET", () => {
    test("returns a status: 200 and body to be an object", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(typeof body).toBe("object");
          expect(Array.isArray(body)).toBe(false);
        });
    });
    test("responds with a status: 200 and a article object which should have certain properties", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toHaveProperty("author");
          expect(body.article).toHaveProperty("title");
          expect(body.article).toHaveProperty("article_id");
          expect(body.article).toHaveProperty("body");
          expect(body.article).toHaveProperty("topic");
          expect(body.article).toHaveProperty("created_at");
          expect(body.article).toHaveProperty("votes");
          expect(body.article).toHaveProperty("comment_count");
          expect(body.article.comment_count).toBe("13");
        });
    });
    test("responds with a status: 200 and a article object which should have certain properties", () => {
      return request(app)
        .get("/api/articles/2")
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toHaveProperty("author");
          expect(body.article).toHaveProperty("title");
          expect(body.article).toHaveProperty("article_id");
          expect(body.article).toHaveProperty("body");
          expect(body.article).toHaveProperty("topic");
          expect(body.article).toHaveProperty("created_at");
          expect(body.article).toHaveProperty("votes");
          expect(body.article).toHaveProperty("comment_count");
          expect(body.article.comment_count).toBe("0");
        });
    });
    test("returns a status: 404 for an ivalid path", () => {
      return request(app)
        .get("/api/articles/1000")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("article not found");
        });
    });
    test("returns a status: 404 for an ivalid path", () => {
      return request(app)
        .get("/api/articles/22343534")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("article not found");
        });
    });
    test("returns a status: 404 for an ivalid path", () => {
      return request(app)
        .get("/api/articles/doggie")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
    test("returns a status: 404 for an ivalid path", () => {
      return request(app)
        .get("/api/articles/superBigDoggie")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
  });
  test("responds with a status: 405 for a invalid method", () => {
    return request(app)
      .del("/api/articles/1")
      .expect(405)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("method not allowed");
      });
  });
  test("responds with a status: 405 for a invalid method", () => {
    return request(app)
      .put("/api/articles/1")
      .expect(405)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("method not allowed");
      });
  });
  test("responds with a status: 405 for a invalid method", () => {
    return request(app)
      .post("/api/articles/1")
      .expect(405)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("method not allowed");
      });
  });
  describe("PATCH", () => {
    test("returns a status: 200 and an updated article by 1", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2018-11-15T12:21:54.171Z",
            votes: 101,
          });
        });
    });
    test("returns a status: 200 and an updated article by 25 votes", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 25 })
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2018-11-15T12:21:54.171Z",
            votes: 125,
          });
        });
    });
    test("returns a status: 200 however when sent no votes it defaults to 0 and sends back the article", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({})
        .expect(200)
        .then(({ body }) => {
          expect(body.article.votes).toBe(100);
        });
    });
  });
});

describe("/articles/:article_id/comments", () => {
  describe("POST", () => {
    test("Returns a status: 200 and the posted comment", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "butter_bridge", body: "What a great article" })
        .expect(201)
        .then(({ body }) => {
          expect(body.comment).toHaveProperty("comment_id");
          expect(body.comment).toHaveProperty("author");
          expect(body.comment).toHaveProperty("body");
          expect(body.comment).toHaveProperty("votes");
          expect(body.comment).toHaveProperty("created_at");
          expect(body.comment.votes).toBe(0);
          expect(typeof body.comment.created_at).toEqual("string");
        });
    });
    test("returns a status: 400 for a bad request", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .expect(400)
        .send({})
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
    test("returns a status: 404 when trying to post a comment to a valid article_id that doesnt exist", () => {
      return request(app)
        .post("/api/articles/10000/comments")
        .send({ username: "butter_bridge", body: "What a great article" })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
  });
  describe("GET", () => {
    test("returns a status: 200 and an array of comments", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          body.comments.forEach((comment) => {
            expect(comment).toHaveProperty("comment_id");
            expect(comment).toHaveProperty("votes");
            expect(comment).toHaveProperty("created_at");
            expect(comment).toHaveProperty("author");
            expect(comment).toHaveProperty("body");
          });
        });
    });
    test("returns a status: 200 and an array of comments", () => {
      return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(({ body }) => {
          body.comments.forEach((comment) => {
            expect(comment).toHaveProperty("comment_id");
            expect(comment).toHaveProperty("votes");
            expect(comment).toHaveProperty("created_at");
            expect(comment).toHaveProperty("author");
            expect(comment).toHaveProperty("body");
          });
        });
    });

    test("returns a status: 200 and a sorted comments array defaulted to created_at", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).toBeSortedBy("created_at", {
            descending: true,
          });
        });
    });
    test("returns a status: 404 when passed an invalid id", () => {
      return request(app)
        .get("/api/articles/1000/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("article not found");
        });
    });
    test("returns a status: 200 and a sucessfull sort by query by votes", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=votes")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).toBeSortedBy("votes", {
            descending: true,
            coerce: true,
          });
        });
    });
    test("returns a status: 200 and a sucessfull sort by query by author", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=author")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).toBeSortedBy("author", {
            descending: true,
          });
        });
    });
    test("returns a status: 200 and a sucessfull sort by query by comment_id", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=comment_id")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).toBeSortedBy("comment_id", {
            descending: true,
            coerce: true,
          });
        });
    });
    test("returns a status: 200 and the order of the order correctly switched to ascending", () => {
      return request(app)
        .get("/api/articles/1/comments?order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).toBeSortedBy("created_at", {
            ascending: true,
          });
        });
    });
    test("returns a status: 200 and the order of the votes sorted_by order", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=votes&&order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).toBeSortedBy("votes", {
            ascending: true,
            coerce: true,
          });
        });
    });
    test("returns a status: 400 when asked to sort by an invalid column", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=not-a-valid-column")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
  });
  describe("ERRORS", () => {
    test("returns a status: 405 when using an invalid method", () => {
      return request(app)
        .put("/api/articles/1/comments")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).toBe("method not allowed");
        });
    });
  });
});

describe("/articles", () => {
  describe("GET", () => {
    test("returns a status: 200 and an array of article objects", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          body.articles.forEach((article) => {
            expect(article).toHaveProperty("author");
            expect(article).toHaveProperty("title");
            expect(article).toHaveProperty("article_id");
            expect(article).toHaveProperty("topic");
            expect(article).toHaveProperty("created_at");
            expect(article).toHaveProperty("votes");
            expect(article).toHaveProperty("comment_count");
          });
        });
    });
    test("returns a status: 200 and is sorted by date (created_at)", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("created_at", {
            descending: true,
          });
        });
    });
    test("returns a status: 200 and has a vaid sort_by query thats sorted by votes", () => {
      return request(app)
        .get("/api/articles?sort_by=votes")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("votes", {
            descending: true,
            coerce: true,
          });
        });
    });
    test("returns a status: 200 and has a valid order query thats defaults to descending", () => {
      return request(app)
        .get("/api/articles?order=asc")
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("created_at", {
            ascending: true,
          });
        });
    });
    test("returns a status: and sorted by votes and ordered ascending", () => {
      return request(app)
        .get("/api/articles?order=asc&sort_by=votes")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("votes", {
            ascending: true,
          });
        });
    });
    test("returns a status: 200 and returns only the auther passed through the query", () => {
      return request(app)
        .get("/api/articles/?author=butter_bridge")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles.length).toBe(3);
        });
    });
    test("returns a status 200 and the return of multiple queries", () => {
      return request(app)
        .get("/api/articles?topic=mitch&author=butter_bridge")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles.length).toBe(3);
        });
    });
    test("returns a status: 200 and returns an empty article for a topic that does exist but has no articles is requested", () => {
      return request(app)
        .get("/api/articles?topic=paper")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toEqual([]);
        });
    });
    test("returns a status: 404 and a msg: topic not found", () => {
      return request(app)
        .get("/api/articles?topic=topic-doesnt-exist")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("topic not found");
        });
    });
    test("returns a status: 200 for a valid author with no articles and just an empty array", () => {
      return request(app)
        .get("/api/articles?author=lurker")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toEqual([]);
        });
    });
    test("returns a status: 404 and a msg: topic not found", () => {
      return request(app)
        .get("/api/articles?author=not-an-author")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("user not found");
        });
    });
    test("returns a status: 404 and a msg: topic not found", () => {
      return request(app)
        .get("/api/articles?author=not-an-author?topic=not-a-topic")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("user not found");
        });
    });
    test("returns a status: 400 for a bad request when trying to sort by an non existent column", () => {
      return request(app)
        .get("/api/articles?sort_by=not-a-column")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
    test("returns status: 200 and returns only the topic passed in as a query", () => {
      return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles.length).toBe(11);
        });
    });
  });
  describe("PATCH", () => {
    test("returns a status: 405 and a error message when using an invalid method", () => {
      return request(app)
        .patch("/api/articles")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).toBe("method not allowed");
        });
    });
  });
});

describe("/comments/:comment_id", () => {
  describe("PATCH", () => {
    test("returns a status: 200 and a sucessfully patched updated comment", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.comment.votes).toBe(17);
        });
    });

    test("returns a status: 200 and a successfully patched comment when passed a negative number", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: -1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.comment.votes).toBe(15);
        });
    });

    test("returns a status: 200 when passed a body with no inc_votes property", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({})
        .expect(200)
        .then(({ body }) => {
          expect(body.comment.votes).toBe(16);
        });
    });

    test("returns a 404 when passed a invalid comment id", () => {
      return request(app)
        .patch("/api/comments/1000")
        .send({ inc_vote: 1 })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("comment not found");
        });
    });

    test("retuns a status: 404 when passed an inc_votes that is invalid", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: "wow" })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
  });
  describe("DELETE", () => {
    test("returns a status: 204 and no content", () => {
      return request(app).del("/api/comments/1").expect(204);
    });
    test("returns a 404 when trying to delete a non existant house", () => {
      return request(app)
        .del("/api/comments/1000")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("comment not found");
        });
    });
  });
});
