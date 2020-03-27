const crypto = require('crypto'); //consegue utilizar um método dele que permite gerar texto aleatório
const connection = require('../database/connection');
// Para a ONG rcebe id 
module.exports = {
    async index(request, response) { 
        const ongs = await connection('ongs').select('*'); // para retornar a resposta ao cliente com o id
    
        return response.json(ongs);
    },
    async create(request, response) {
        const {name, email, whatsapp, city, uf} = request.body; //entre chaves é a desestruturação para pegar cada elemento em uma variavel

        const id = crypto.randomBytes(4).toString('HEX'); // vai gerar 4 caracteres e transformar em hexadecimal
        //o await vai fazer a função esperar realizar o insert, e so depois irá liberr o return
        await connection('ongs').insert({//em que pasta voce vai inserir os dados
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
        return response.json({ id });

    }
};