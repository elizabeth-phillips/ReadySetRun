const Bookshelf = require("../bookshelf");
const fs = require("fs")


const User = Bookshelf.Model.extend({
  tableName: "user",
  races: function() {
    return this.belongsToMany(Race);
  }
});

const Race = Bookshelf.Model.extend({
    tableName: "race",
    users: function() {
      return this.belongsToMany(User);
    }
});
const RunningGroup = Bookshelf.Model.extend({
    tableName: "running_group",
    running_members: function() {
      return this.belongsToMany(RunningGroupMember);
    }
});
const RaceHistory = Bookshelf.Model.extend({
    tableName: "race_history"
});
const RunningGroupMember = Bookshelf.Model.extend({
    tableName: "running_group_member",
    running_groups: function() {
      return this.belongsToMany(RunningGroup);
    }
});
module.exports = {
    RunningGroupMember: Bookshelf.model("running_group_member", RunningGroupMember),
    RaceHistory: Bookshelf.model("race_history", RaceHistory),
    RunningGroup: Bookshelf.model("running_group", RunningGroup),
    User: Bookshelf.model("user", User),
    Race: Bookshelf.model("race", Race)
}
  