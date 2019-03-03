module.exports.up = function (knex, Promise) {
    return knex.schema.hasTable("running_group_member").then(exists => {
    if (!exists) {
      return knex.schema
        .createTable("running_group_member", table => {
          table.increments("id").primary();
          table.integer("user_id").references('id').inTable('user').notNull().onDelete('cascade');
          table.integer("running_group_id").references('id').inTable('running_group').notNull().onDelete('cascade');
      })
    }
  });
  };
  
  module.exports.down = knex => knex.schema.dropTableIfExists("running_group_member");