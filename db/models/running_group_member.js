const Bookshelf = require("../../bookshelf");

const RunningGroupMember = Bookshelf.Model.extend({
  tableName: "running_group_member",
  running_groups: function() {
    return this.belongsToMany(RunningGroup);
  }
});
module.exports = Bookshelf.model("running_group_member", RunningGroupMember);
