 exports.up = function(knex) {
   return knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.string('image');
      table.string('site');
      table.string('bio');
      table.string('gender');
      table.string('phone');
    })
  };
  
  exports.down = function(knex) {
   return knex.schema.dropTable('users');
  };
  