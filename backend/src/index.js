const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors()); // caso saia do desenvolvimento, colocar cors({origin:''}), pois mostra qual endereço vai poder acessar nossa aplicação
app.use(express.json()); // informa ao app que estaremos usando json para as requisições //converte o json em objeto de JavaScript
app.use(routes);


app.listen(3333);
 