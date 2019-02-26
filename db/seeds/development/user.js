let fs = require('fs');
let rawdata = fs.readFileSync(__dirname+'/data/user.json');  
let users = JSON.parse(rawdata); 
exports.seed = function (knex, Promise) {
  return knex("user")
    .del()
    .then(function () {
      return knex("user").insert(users);
    });
};
