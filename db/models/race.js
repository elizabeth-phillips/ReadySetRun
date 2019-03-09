const Bookshelf = require("../../bookshelf");
// console.log(Object.keys(Bookshelf.Model));
const User = require("./user");
const RaceHistory = require("./race_history");
const Race = Bookshelf.Model.extend({
  tableName: "race",
  users: function() {
    return this.hasMany(User).through(RaceHistory);
  }
});
module.exports = Bookshelf.model("Race", Race);
