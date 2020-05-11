exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handlePSQLErrors = (err, req, res, next) => {
  const codes = {
    "22P02": { status: 400, msg: "Bad Request" },
    42703: { status: 400, msg: "Bad Request" },
    "42P01": { status: 400, msg: "Bad Request" },
    23502: { status: 400, msg: "Bad Request" },
    23503: { status: 404, msg: "Bad Request" },
  };

  if (err.code in codes) {
    const { status, msg } = codes[err.code];
    res.status(status).send({ msg });
  } else next(err);
};

exports.handleInternalErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};
