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


// [
//   {
//     'repeat(70)': {
//       user_id: '{{integer(0, 53)}}',
//       race_id: '{{integer(0, 7)}}',
//       pace: '{{integer(4,14)}}:{{integer(0,9)}}{{integer(0,9)}}',
//       ranking: '{{bool()}}',
//       date: '{{date(new Date(2000, 1, 1), new Date())}}',
//     }
//   }
// ]