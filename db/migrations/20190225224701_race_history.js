exports.up = function (knex, Promise) {
    return knex.schema.hasTable("race_history").then(exists => {
    if (!exists) {
      return knex.schema
        .createTable("race_history", table => {
          table.increments("id").primary();
          table.integer("user_id");
          table.integer("race_id");
          table.string("pace");
          table.integer("ranking");
          table.datetime("date");
        })
        .then(() =>
          knex.schema.table("race_history", table => {
            table
              .integer("user_id")
              .unsigned()
              .index();
            table.foreign("user_id").references("user.id"); 
        })
        );
    }
  });
};

exports.down = knex =>
  // knex.schema
  //   .table("install", table => {
  //     table.dropColumn("user_id");
  //   })
  //   .then(() => 
    knex.schema.dropTableIfExists("race_history");
    // );