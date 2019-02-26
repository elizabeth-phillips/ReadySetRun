exports.up = function (knex, Promise) {
    return knex.schema.hasTable("user").then(exists => {
      if (!exists) {
        return knex.schema
          .createTable("user", table => {
            table.increments("id").primary();
            table.string("first_name");
            table.string("last_name");
            table.string("email");
            table.string("password");
            table.integer("age");
            table.string("desired_pace");
            table.string("city");
            table.string("state");
            table.integer("zipcode");
            table.integer("phone");
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
      knex.schema.dropTableIfExists("user");
      // );