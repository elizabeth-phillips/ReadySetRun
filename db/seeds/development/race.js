let fs = require('fs');
let rawdata = fs.readFileSync(__dirname+'/data/race.json');  
let race = JSON.parse(rawdata); 
exports.seed = function (knex, Promise) {
  return knex("race")
    .del()
    .then(function () {
      return knex("race").insert(race);
    });
};
