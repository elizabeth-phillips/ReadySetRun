exports.up = function (knex, Promise) {
    return knex.schema.hasTable("race").then(exists => {
      if (!exists) {
        return knex.schema
          .createTable("race", table => {
            table.increments("id").primary();
            table.string("name");
            table.datetime("date");
            table.float("distance");
            table.string("email");
            table.string("phone");
            table.string("city");
            table.string("state");
            table.integer("zipcode");
          })
          .then( );
      }
    });
  };
  
  exports.down = knex =>
    // knex.schema
    //   .table("install", table => {
    //     table.dropColumn("user_id");
    //   })
    //   .then(() => 
      knex.schema.dropTableIfExists("race");
      // );