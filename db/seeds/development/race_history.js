let fs = require('fs');
let rawdata = fs.readFileSync(__dirname+'/data/race_history.json');  
let race_history = JSON.parse(rawdata); 
exports.seed = function (knex, Promise) {
  return knex("race_history")
    .del()
    .then(function () {
      return knex("race_history").insert(race_history);
    });
};
