exports.up = function(knex) {
    return knex.schema.createTable("user", (table) => {
        table.increments();
        table.string("username").notNullable().unique();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.text("description");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("user");
};