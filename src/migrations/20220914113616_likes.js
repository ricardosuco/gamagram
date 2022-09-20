exports.up = function (knex) {
    return knex.schema.createTable("likes", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("posts")
      table
        .integer("post_id")
        .unsigned()
        .references("id")
        .inTable("posts")
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("likes");
  };
  