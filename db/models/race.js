const bookshelf = require("../bookshelf");

const Race = bookshelf.Model.extend({
  tableName: "race"
  // ,
  // install: function() {
  //   return this.hasMany(Install);
  // }
});
module.exports = bookshelf.model("Race", Race);
