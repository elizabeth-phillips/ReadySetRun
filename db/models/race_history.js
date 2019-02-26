const bookshelf = require("../bookshelf");

const RaceHistory = bookshelf.Model.extend({
  tableName: "race_history"
  // ,
  // install: function() {
  //   return this.hasMany(Install);
  // }
});
module.exports = bookshelf.model("RaceHistory", RaceHistory);