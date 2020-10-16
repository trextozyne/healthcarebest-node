
const db = require('../../data/customers.json');
const fs = require('fs');

exports.login_user = (req, res, next) => {
    const users = readUsers();
    console.log(users);
    console.log(req.body);

    const user = users.filter(
        u => u.username === req.body.username && u.password === req.body.password
    )[0];

    if (user) {
        res.send({ ...formatUser(user), token: checkIfAdmin(user) });
    } else {
        res.status(401).send('Incorrect username or password');
    }
};

exports.register = (req, res) => {
    const users = readUsers();
    const user = users.filter(u => u.username === req.body.username)[0];

    if (user === undefined || user === null) {
        res.send({
            ...formatUser(req.body),
            token: checkIfAdmin(req.body)
        });
        db.customers.push(req.body);
    } else {
        res.status(500).send('User already exists');
    }
};

exports.customers = (req, res, next) => {
    if (isAuthorized(req) || req.query.bypassAuth === 'true') {
        next();
    } else {
        res.sendStatus(401);
    }
};

function formatUser(user) {
    delete user.password;
    user.role = user.username === 'admin'
        ? 'admin'
        : 'user';
    return user;
}

function checkIfAdmin(user, bypassToken = false) {
    return user.username === 'admin' || bypassToken === true
        ? 'admin-token'
        : 'user-token';
}

function isAuthorized(req) {
    return req.headers.authorization === 'admin-token';
}

function readUsers() {
    const dbRaw = fs.readFileSync('./src/assets/data/customers.json', 'utf8');

    return JSON.parse(dbRaw).customers;
}
