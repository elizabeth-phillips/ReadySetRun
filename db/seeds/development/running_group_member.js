let fs = require('fs');
let rawdata = fs.readFileSync(__dirname+'/data/running_group_member.json');  
let running_group_member = JSON.parse(rawdata); 
exports.seed = function (knex, Promise) {
  return knex("running_group_member")
    .del()
    .then(function () {
      return knex("running_group_member").insert(running_group_member);
    });
};
