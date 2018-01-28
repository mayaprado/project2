const bcrypt = require('bcryptjs');

const db = require('../db/index.js');

const user = {};

user.create = function create(user) {
    const passwordDigest = bcrypt.hashSync(user.password, 10);
    return db.oneOrNone(
        'INSERT INTO users (email, password_digest) VALUES ($1, $2) RETURNING *;',
        [user.email, passwordDigest]
    );
};

user.findByEmail = function findByEmail(email) {
    return db.oneOrNone('SELECT * FROM users WHERE email = $1;', [email]);
};

user.findByEmailMiddleware = function findByEmailMiddleware(req, res, next) {
    const email = req.user.email;
    user
        .findByEmail(email)
        .then(userData => {
            res.locals.userData = userData;
            next();
        })
        .catch(err => console.log('ERROR:', err));
};

user.findHouses = function findHouse(id) {
    return db.oneOrNone(
        'SELECT * FROM users JOIN fav_houses ON users.id = fav_houses.user_id JOIN houses ON fav_houses.house_id = houses.id WHERE users.id = $1;',
        [id]
    );
};

user.findHouseMiddleware = function findHouseMiddleware(req, res, next) {
    const id = req.user.id;
    user
        .findHouse(id)
        .then(userData => {
            res.locals.userData = userData;
            next();
        })
        .catch(err => console.log('ERROR:', err));
};

module.exports = user;
