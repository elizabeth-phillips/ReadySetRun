let fs = require('fs');
let rawdata = fs.readFileSync(__dirname+'/data/running_group.json');  
let running_group = JSON.parse(rawdata); 
exports.seed = function (knex, Promise) {
  return knex("running_group")
    .del()
    .then(function () {
      return knex("running_group").insert(running_group);
    });
};
