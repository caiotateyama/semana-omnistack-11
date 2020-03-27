
exports.up = function(knex) {
    return knex.schema.createTable('products', function(table){ 
        table.increments();

        table.string('title').notNullable(); //notNullable faz com que o campo não possa ser nulo
        table.string('description').notNullable();
        table.decimal('value').notNullable(); // para armazenar dados em número usar decimal
       
        table.string('ong_id').notNullable();// coluna que informa qual ong que criou o produto

        table.foreign('ong_id').references('id').inTable('ongs');//chave estrangeira-> toda vez que o ong_id estiver preenchido ele deve estar cadastrado no banco SQL
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('products');
};
