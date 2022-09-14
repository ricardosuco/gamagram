 exports.up = function(knex) {
   return knex.schema.createTable('posts', (table) => {
        table.increments('id').primary();
        table.integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        table.string('image').notNullable();
        table.string('caption').notNullable();
        table.timestamps(true);
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};
