exports.up = function (knex, Promise) {
  return knex.schema.hasTable("running_group").then(exists => {
    if (!exists) {
      return knex.schema
        .createTable("running_group", table => {
          table.increments("id").primary();
          table.string("name");
          table.string("pace");
          table.string("city");
          table.string("state");
          table.integer("zipcode");
          table.integer("phone");
        })
    }
  });
};

exports.down = knex => knex.schema.dropTableIfExists("running_group");