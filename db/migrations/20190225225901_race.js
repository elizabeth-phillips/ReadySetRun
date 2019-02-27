exports.up = function (knex, Promise) {
    return knex.schema.hasTable("race").then(exists => {
      if (!exists) {
        return knex.schema
          .createTable("race", table => {
            table.increments("id").primary();
            table.string("time");
            table.integer("ranking");
            table.datetime("date");
          })
          .then(//() =>
            // knex.schema.table("install", table => {
            //   table
            //     .integer("user_id")
            //     .unsigned()
            //     .index();
            //   table.foreign("user_id").references("user.id"); 
          // })
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
      knex.schema.dropTableIfExists("race");
      // );