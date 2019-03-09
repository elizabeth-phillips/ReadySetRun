const Bookshelf = require("../../bookshelf");
const Race = require("./race")
const RaceHistory = require("./race_history")

const User = Bookshelf.Model.extend({
  tableName: "user",
  races: function() {
    return this.hasMany(RaceHistory).through(Race);
  }
});
module.exports = Bookshelf.model("User", User);
