const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(require('./data-collection/db.js')());
const customer = require('../server/controllers/customer.controller');
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 3000;
const ip = process.env.IP || 'localhost';

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', customer.login_user);

server.post('/register', customer.register);

server.use('/users', customer.customers);


// server.use(customerRouter);
server.use(router);
server.listen(port, ip);
