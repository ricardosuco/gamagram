exports.up = function (knex) {
    return knex.schema.createTable("likes", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("posts")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("image").notNullable();
      table
        .integer("post_id")
        .unsigned()
        .references("id")
        .inTable("posts")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("likes");
  };
  