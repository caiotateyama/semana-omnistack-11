const connection = require('../database/connection');
// Listagem de produtos
module.exports = {
    async index(request, response) {
         const { page = 1} = request.query;//  PAGINAÇÃO- limita a quantidade de produtos por página // para pegar os produtos de certa ong

        const [count] = await connection('products').count(); // quantidade de produtos totais

        const products = await connection('products')
        .join('ongs', 'ongs.id', '=' , 'products.ong_id' )//Serve para relacionar dados de duas tabelas
        .limit(5)
        .offset((page - 1)*5) //pega os 5 primeiros produtos e depois os outros 5 e assim por diante
        .select([
            'products.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp', 
            'ongs.city',
            'ongs.uf']);

        response.header('X-Total-Count', count['count(*)'])
        
        return response.json(products)
    },
    
    async create(request, response) {
        const {title, description, value } = request.body;
        const ong_id = request.headers.authorization; //autenticação vem através do cabeçalho da requisição
        
        const [id] = await connection('products').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id })
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const product = await connection('products')
            .where('id', id)
            .select('ong_id')
            .first();

        if (product.ong_id != ong_id)    {
            return response.status(401).json({ error: 'Operation not permited'})
        }
    
        await connection('products').where('id', id).delete();

        return response.status(204).send();
    }
};