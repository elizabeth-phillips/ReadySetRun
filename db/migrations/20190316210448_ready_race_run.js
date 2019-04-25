
exports.up = function(knex, Promise) {
    return knex.schema.createTable("user", table => {
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
        table.boolean("admin").defaultTo(false);
      }).createTable("race", table => {
        table.increments("id").primary();
        table.string("name");
        table.string("distance");
        table.string("url");
        table.string("phone");
        table.string("city");
        table.string("state");
        table.integer("zipcode");
      }).createTable("running_group", table => {
        table.increments("id").primary();
        table.string("name");
        table.string("pace");
        table.string("city");
        table.string("state");
        table.integer("zipcode");
        table.integer("phone");
      }).createTable("race_history", table => {
        table.increments("id").primary();
        table.string("pace");
        table.integer("ranking");
        table.datetime("date");
        table.boolean("future");
        table.integer("user_id").references("user.id").onUpdate("CASCADE"); 
        table.integer("race_id").references("race.id").onUpdate("CASCADE"); 
      }).createTable("running_group_member", table => {
        table.increments("id").primary();
        table.integer("user_id").references('user.id').notNull().onDelete('cascade');
        table.integer("running_group_id").references('running_group.id').notNull().onDelete('cascade');
    }).createTable("future_races", table => {
      table.increments("id").primary();
      table.integer("user_id").references('user.id').notNull().onDelete('cascade');
      table.integer("race_name").notNull().onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists("future_races")
    .dropTableIfExists("running_group_member")
    .dropTableIfExists("race_history")
    .dropTableIfExists("running_group")
    .dropTableIfExists("race")
    .dropTableIfExists("user");
};
