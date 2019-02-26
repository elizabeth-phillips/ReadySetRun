const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");

const index = require("./routes");
const user = require("./routes/user");

const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", index);
app.use("/user", user);
app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
