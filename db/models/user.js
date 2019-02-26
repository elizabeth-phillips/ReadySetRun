const bookshelf = require("../bookshelf");

const User = bookshelf.Model.extend({
  tableName: "user"
  // ,
  // install: function() {
  //   return this.hasMany(Install);
  // }
});
module.exports = bookshelf.model("User", User);
