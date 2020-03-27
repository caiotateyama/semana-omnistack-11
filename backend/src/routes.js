const express = require('express');

const OngController = require('./controllers/OngController') //Receber id
const ProductController = require('./controllers/ProductController') // Listagem de produtos
const ProfileController = require('./controllers/ProfileController') //Listagem de produtos de uma ONG
const SessionController = require('./controllers/SessionController') //Login

const routes = express.Router();

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.index );
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index)


routes.get('/products', ProductController.index)
routes.post('/products', ProductController.create)
routes.delete('/products/:id', ProductController.delete)

module.exports = routes;