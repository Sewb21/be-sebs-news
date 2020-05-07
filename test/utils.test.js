const {
  formatDates,
  makeRefObj,
  formatComments,
} = require("../db/utils/utils");

describe("formatDates", () => {
  test("returns a new array", () => {
    const list = [];

    expect(formatDates(list)).toEqual([]);
    expect(formatDates(list)).not.toBe(list);
  });
  test("Converts a timestamp to a javascript data object", () => {
    const list = [
      {
        comment_id: 1,
        author: "Me",
        article_id: 1,
        created_at: 1542284514171,
      },
    ];
    const date = new Date(1542284514171);

    expect(formatDates(list)[0].created_at).toEqual(date);
  });
  test("Works for a list of multiple objects", () => {
    const date1 = new Date(1542284514171);
    const date2 = new Date(1289996514171);
    const date3 = new Date(1163852514171);
    const list = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171,
      },
      {
        title: "Student SUES Mitch!",
        topic: "mitch",
        author: "rogersop",
        body:
          "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
        created_at: 1163852514171,
      },
    ];

    expect(formatDates(list)[0].created_at).toEqual(date1);
    expect(formatDates(list)[1].created_at).toEqual(date2);
    expect(formatDates(list)[2].created_at).toEqual(date3);
  });
  test("Doesnt mutate the array", () => {
    const list = [
      {
        comment_id: 1,
        author: "Me",
        article_id: 1,
        created_at: 1542284514171,
      },
    ];

    expect(formatDates(list)).not.toBe(list) &&
      list.toEqual([
        {
          comment_id: 1,
          author: "Me",
          article_id: 1,
          created_at: 1542284514171,
        },
      ]);
  });
});

describe("makeRefObj", () => {
  test("returns an empty object if passed nothing or an empty array", () => {
    const list = {};
    const list2 = undefined;
    expect(makeRefObj(list)).toEqual({});
    expect(makeRefObj(list2)).toEqual({});
  });
  test("returns a succesful refObj when passed an array of one person", () => {
    const list = [
      {
        article_id: 1,
        title: "Student Sues Mitch!",
        topic: "mitch",
        author: "rogersop",
        body:
          "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
        created_at: 1163852514171,
      },
    ];
    const expected = { "Student Sues Mitch!": 1 };
    expect(makeRefObj(list)).toEqual(expected);
  });
  test("works for multiple articles in a list", () => {
    const list = [
      {
        article_id: 1,
        title: "Student Sues Mitch!",
        topic: "mitch",
        author: "rogersop",
        body:
          "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
        created_at: 1163852514171,
      },
      {
        article_id: 2,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
      {
        article_id: 3,
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171,
      },
    ];
    const expected = {
      "Student Sues Mitch!": 1,
      "Living in the shadow of a great man": 2,
      "Eight pug gifs that remind me of mitch": 3,
    };
    expect(makeRefObj(list)).toEqual(expected);
  });
  test("doesnt mutate the input", () => {
    const list = [
      {
        article_id: 1,
        title: "Student Sues Mitch!",
        topic: "mitch",
        author: "rogersop",
        body:
          "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
        created_at: 1163852514171,
      },
    ];
    const expected = { "Student Sues Mitch!": 1 };

    expect(makeRefObj(list)).not.toBe(list);
    expect(list).toEqual([
      {
        article_id: 1,
        title: "Student Sues Mitch!",
        topic: "mitch",
        author: "rogersop",
        body:
          "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
        created_at: 1163852514171,
      },
    ]);
  });
});

describe("formatComments", () => {
  test("returns an empty array when passed a empty obj or nothing", () => {
    const comments = undefined;
    const articleRef = undefined;
    const comments2 = [];

    expect(formatComments(comments, articleRef)).toEqual([]);
    expect(formatComments(comments2, articleRef)).toEqual([]);
  });
  test("When passed one comment obj and one article ref it formats relevent keys", () => {
    const comment = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389,
      },
    ];
    const articleRef = { "Living in the shadow of a great man": 1 };
    const expected = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        article_id: 1,
        author: "butter_bridge",
        votes: 14,
        created_at: new Date(1479818163389),
      },
    ];
    expect(formatComments(comment, articleRef)).toEqual(expected);
  });
  test("works for an array of multipl comments", () => {
    const comments = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389,
      },
      {
        body:
          "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 100,
        created_at: 1448282163389,
      },
      {
        body: " I carry a log — yes. Is it funny to you? It is not to me.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: -100,
        created_at: 1416746163389,
      },
    ];
    const articleRef = { "Living in the shadow of a great man": 1 };
    const expected = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        article_id: 1,
        author: "butter_bridge",
        votes: 14,
        created_at: new Date(1479818163389),
      },
      {
        body:
          "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
        article_id: 1,
        author: "icellusedkars",
        votes: 100,
        created_at: new Date(1448282163389),
      },
      {
        body: " I carry a log — yes. Is it funny to you? It is not to me.",
        article_id: 1,
        author: "icellusedkars",
        votes: -100,
        created_at: new Date(1416746163389),
      },
    ];
    expect(formatComments(comments, articleRef)).toEqual(expected);
  });
  test("doesnt mutate input", () => {
    const comments = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389,
      },
    ];
    const articleRef = { "Living in the shadow of a great man": 1 };
    const expected = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        article_id: 1,
        author: "butter_bridge",
        votes: 14,
        created_at: new Date(1479818163389),
      },
    ];
    expect(formatComments(comments, articleRef)).not.toBe(comments);
    expect(comments).toEqual([
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389,
      },
    ]);
  });
});
