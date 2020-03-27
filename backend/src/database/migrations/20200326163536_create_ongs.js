
exports.up = function(knex) { //método up é o que eu quero que seja feito
  return knex.schema.createTable('ongs', function(table){ 
      table.string('id').primary();
      table.string('name').notNullable(); //notNullable faz com que o campo não possa ser nulo
      table.string('email').notNullable();
      table.string('whatsapp').notNullable();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();//2° parametro mostra o tamnho do texto que será armazenado

  });
};

exports.down = function(knex) { // caso não ocorra o up o que deve ser feito
   return  knex.schema.dropTable('ongs');
  
};
