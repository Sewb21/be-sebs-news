exports.handlePSQLErrors = (err, req, res, next) => {
  const codes = { "22P02": { status: 400, msg: "bad request" } };

  if (err.code in codes) {
    const { status, msg } = codes[err.code];
    res.status(status).send({ msg });
  } else next(err);
};

exports.handleInternalErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};
