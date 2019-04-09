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

// [
//   {
//     'repeat(100)': {
//       name: '{{company()}}',
//       distance: '{{floating(1,100)}}',
//       email: '{{lorem()}}@{{company}}.com',
//       phone: '{{phone()}}',
//       city: '{{city()}}',
//       state: '{{state()}}',
//       zipcode: '{{integer(10000, 99999)}}'
//     }
//   }
// ]
