const Bookshelf = require("../../bookshelf");

const User = Bookshelf.Model.extend({
  tableName: "user",
  races: function() {
    return this.hasMany(race).through(raceHistory);
  }
});
module.exports = Bookshelf.model("User", User);
