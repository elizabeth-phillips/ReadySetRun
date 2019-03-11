exports.up = function (knex, Promise) {
    return knex.schema.hasTable("user").then(exists => {
      if (!exists) {
        return knex.schema
          .createTable("user", table => {
            table.increments("id").primary();
            table.string("first_name").notNullable();
            table.string("last_name").notNullable();
            table.string("email").unique().notNullable();
            table.string("password").notNullable();
            table.integer("age").notNullable();
            table.string("desired_pace").notNullable();
            table.string("city").notNullable();
            table.string("state").notNullable();
            table.integer("zipcode").notNullable();
            table.string("phone");
          });
      }
    });
  };
  
  exports.down = knex => knex.schema.dropTableIfExists("user");