

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FavoriteSchema extends Schema {

  up() {
    this.create('favorites', (table) => {
      table.increments();
      table.timestamps();
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.string('name', 120).notNullable();
      table.string('favorite_id', 254).unsigned().notNullable();
    });
  }

  down() {
    this.drop('favorites');
  }

}

module.exports = FavoriteSchema;
