exports.up = function (knex) {
  return knex.schema.createTable("photos", (table) => {
    table.increments("id").primary();
    table
      .integer("post_id")
      .unsigned()
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.string("image").notNullable();
    table.timestamps(true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("photos");
};
