const Bookshelf = require("../../bookshelf");

const Race = Bookshelf.model.extend({
  tableName: "race"
  // ,
  // install: function() {
  //   return this.hasMany(Install);
  // }
});
module.exports = Bookshelf.model("Race", Race);
