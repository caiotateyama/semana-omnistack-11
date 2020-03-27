const connection = require('../database/connection');
// Retorna apenas os casos de Certa ONG
module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;

        const products = await connection('products')
        .where('ong_id', ong_id)
        .select('*');

        return response.json(products)
    }
}