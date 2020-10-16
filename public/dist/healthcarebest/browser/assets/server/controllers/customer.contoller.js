var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var db = require('../../data/customers.json');
var fs = require('fs');
exports.login_user = function (req, res, next) {
    var users = readUsers();
    console.log(users);
    console.log(req.body);
    var user = users.filter(function (u) { return u.username === req.body.username && u.password === req.body.password; })[0];
    if (user) {
        res.send(__assign({}, formatUser(user), { token: checkIfAdmin(user) }));
    }
    else {
        res.status(401).send('Incorrect username or password');
    }
};
exports.register = function (req, res) {
    var users = readUsers();
    var user = users.filter(function (u) { return u.username === req.body.username; })[0];
    if (user === undefined || user === null) {
        res.send(__assign({}, formatUser(req.body), { token: checkIfAdmin(req.body) }));
        db.customers.push(req.body);
    }
    else {
        res.status(500).send('User already exists');
    }
};
exports.customers = function (req, res, next) {
    if (isAuthorized(req) || req.query.bypassAuth === 'true') {
        next();
    }
    else {
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
function checkIfAdmin(user, bypassToken) {
    if (bypassToken === void 0) { bypassToken = false; }
    return user.username === 'admin' || bypassToken === true
        ? 'admin-token'
        : 'user-token';
}
function isAuthorized(req) {
    return req.headers.authorization === 'admin-token';
}
function readUsers() {
    var dbRaw = fs.readFileSync('./src/assets/data/customers.json', 'utf8');
    return JSON.parse(dbRaw).customers;
}
