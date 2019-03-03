const Bookshelf = require("../../bookshelf");

const RunningGroup = Bookshelf.Model.extend({
  tableName: "running_group",
  running_members: function() {
    return this.belongsToMany(RunningGroupMember);
  }
});
module.exports = Bookshelf.model("running_group", RunningGroup);
