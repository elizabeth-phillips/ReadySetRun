const knex = require('knex')(require('./knexfile')[process.env.NODE_ENV]);
const Bookshelf = require('bookshelf')(knex);
Bookshelf.plugin('registry');


module.exports = Bookshelf
