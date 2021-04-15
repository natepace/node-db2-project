// DO YOUR MAGIC
exports.up = function (knex) {
    return knex.schema.createTable("cars", table => {
        table.increments();
        table.specificType('vin', 'CHAR(17)').unique().notNullable();
        table.string('make', 128).notNullable();
        table.string('model', 128).notNullable();
        table.integer('milage').notNullable();
        table.string('title', 128);
        table.string('transmission', 10);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('cars')
}