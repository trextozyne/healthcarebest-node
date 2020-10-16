'use strict';

let errorHandler;

if (process.env.NODE_ENV === 'production') {
    require('@google-cloud/trace-agent').start();
    const {ErrorReporting} = require('@google-cloud/error-reporting');
    errorHandler = new ErrorReporting();
}

if (process.env.GCLOUD_PROJECT) {
    require('@google-cloud/debug-agent').start();
}

// app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
let path = require('path');

// Imports routes for the products
const product = require('./routes/product.route');
const categories = require('./routes/category.route');
const orders = require('./routes/order.route');
const customers = require('./routes/customer.route');

let database;

/////////////////////
const app = express();
/////////////////////

const mongoose = require('mongoose');
const devDBUrl = 'mongodb://Trex_son:Salvat1on1987@ds147592.mlab.com:47592/healthcare';

let mongoDB = process.env.MONGODB_URI || devDBUrl;

mongoose.connect(mongoDB, (err, db) => {
    database = db;
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

// Create link to Angular build directory
const distDir = path.join(__dirname, 'public/dist/healthcarebest/browser/');
app.use(express.static(distDir));

app.use(session({secret: 'S@lv@t10n_G0d', resave: false, saveUninitialized: true, cookie:
        { maxAge: Date.now() + (30 * 86400 * 1000) }
})); // shouldnt be storing secret in a public repository, should be in an environment variable


app.get('/api/menu', async(req, res, next) => {
    const collection = database.collection('menu');
    collection.find().toArray(function (err, menus) {
        res.status(200).json(menus);
    });
});

app.get('/api/leftmenu', async(req, res, next) => {
    const collection = database.collection('leftmenu');
    collection.find().toArray(function (err, menus) {
        res.status(200).json(menus);
    });
});
app.use('/api/products', product);
app.use('/api/categories', categories);
app.use('/api/orders', orders);
app.use('/api/customers', customers);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dist/healthcarebest/browser/index.html'))
    // res.send('App Works !!!!');
});

app.get('/home/tools', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dist/healthcarebest/browser/index.html'))
    // res.send('App Works !!!!');
});

// Basic error logger/handler
app.use(async function (err, req, res, next) {
    res.status(500).send(err.message || 'Something broke!');
    next(err || new Error('Something broke!'));
});

if (process.env.NODE_ENV === 'production') {
    app.use(errorHandler.express);
}

if (module === require.main) {
    // Start the server
    const _port = process.env.PORT || 8080;
    const server = app.listen(_port, () => {
        const host = server.address().address;
        const port = server.address().port;

        console.log(`Server is up and running at http://${host}:${port}`);
    });
}

module.exports = app;
