const Bookshelf = require("../../bookshelf");

const RaceHistory = bookshelf.Model.extend({
  tableName: "race_history"
  // ,
  // install: function() {
  //   return this.hasMany(Install);
  // }
});
module.exports = Bookshelf.model("RaceHistory", RaceHistory);