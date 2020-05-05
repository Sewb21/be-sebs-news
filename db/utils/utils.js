exports.formatDates = (list) => {
  if (list && list.length > 0) {
    // const copiedList = [...list];
    const arrCopy = list.map((obj) => ({ ...obj }));

    arrCopy.forEach((obj) => {
      const date = new Date(obj.created_at);
      obj.created_at = date;
    });
    return arrCopy;
  }
  return [];
};

exports.makeRefObj = (list) => {
  if (list && list.length > 0) {
    const lookup = {};

    list.forEach((article) => {
      lookup[article.title] = article.article_id;
    });
    return lookup;
  }
  return [];
};

exports.formatComments = (comments, articleRef) => {
  const newCommentArr = [];

  if (comments) {
    comments.forEach((comment) => {
      const newCommentObj = {};
      const date = new Date(comment.created_at);
      newCommentObj.body = comment.body;
      newCommentObj.article_id = articleRef[comment.belongs_to];
      newCommentObj.author = comment.created_by;
      newCommentObj.votes = comment.votes;
      newCommentObj.created_at = date;

      newCommentArr.push(newCommentObj);
    });
  }

  return newCommentArr;
};
