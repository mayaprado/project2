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

user.findHouses = function findHouses(id) {
    return db.any(
        'SELECT * FROM users JOIN fav_houses ON users.id = fav_houses.user_id JOIN houses ON fav_houses.house_id = houses.id WHERE users.id = $1;',
        [id]
    );
};

user.findHousesMiddleware = function findHousesMiddleware(req, res, next) {
    const id = req.user.id;
    user
        .findHouses(id)
        .then(data => {
            res.locals.favHouses = data;
            next();
        })
        .catch(err => console.log('ERROR:', err));
};

user.findByEmail = function findByEmail(email) {
    return db.one('SELECT * FROM users WHERE email = $1;', [email]);
};

user.findByEmailMiddleware = function findByEmailMiddleware(req, res, next) {
    const email = req.user.email;
    user
        .findByEmail(email)
        .then(result => {
            res.locals.userData = result;
            next();
        })
        .catch(err => console.log('ERROR:', err));
};

user.addHouse = function addHouse(user_id, house_id) {
    return db.one(
        'INSERT INTO fav_houses (user_id, house_id) VALUES ($1, $2) RETURNING *;',
        [user_id, house_id]
    );
};

user.addHouseMiddleware = function addHouseMiddleware(req, res, next) {
    const user_id = req.body.user_id;
    const house_id = req.body.house_id;
    user
        .addHouse(user_id, house_id)
        .then(userData => {
            res.locals.userData = userData;
            next();
        })
        .catch(err => console.log('ERROR:', err));
};

user.destroyHouse = function destroyHouse(user_id, house_id) {
    return db.one(
        'DELETE FROM fav_houses WHERE user_id = $1 AND house_id = $2 RETURNING id;',
        [user_id, house_id]
    );
};

user.destroyHouseMiddleware = function destroyHouseMiddleware(req, res, next) {
    const user_id = req.user.id;
    const house_id = req.body.house_id;
    user
        .destroyHouse(user_id, house_id)
        .then(userData => {
            res.locals.userData = userData;
            next();
        })
        .catch(err => console.log('ERROR:', err));
};

module.exports = user;
