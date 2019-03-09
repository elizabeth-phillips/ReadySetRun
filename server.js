const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");

const index = require("./routes/index");
const admin = require("./routes/admin")
const user = require("./routes/user");
const race = require("./routes/race");
const raceHistory = require("./routes/race_history");
const runningGroup = require("./routes/running_group");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('hbs', exphbs({
  defaultLayout: '../main',
  partialsDir: __dirname + '/views/partials/',
  extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", index);
app.use("/admin", admin);
app.use("/user", user);
app.use("/race", race);
app.use("/race_history", raceHistory);
app.use("/running_group", runningGroup);
app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
