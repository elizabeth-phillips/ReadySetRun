const Bookshelf = require("../../bookshelf");
// console.log(Object.keys(Bookshelf.Model));
require("./user");
const Race = Bookshelf.Model.extend({
  tableName: "race",
  users: function() {
    return this.hasMany(User);
  }
});
module.exports = Bookshelf.model("Race", Race);
