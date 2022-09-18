 exports.up = function(knex) {
   return knex.schema.createTable('posts', (table) => {
        table.increments('id').primary();
        table.integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        table.string('caption').notNullable();
        // table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamps(true, true);
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};
