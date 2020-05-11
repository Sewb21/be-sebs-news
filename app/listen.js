const app = require("./app");
const port = 9090;

app.listen(port, (err) => {
  if (err) throw err;
  else console.log(`listening at port: ${port}`);
});
