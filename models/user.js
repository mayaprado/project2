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
    return db.oneOrNone(
        'SELECT * FROM users JOIN fav_houses ON users.id = fav_houses.user_id JOIN houses ON fav_houses.house_id = houses.id WHERE email = $1;',
        [email]
    );
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

user.addHouse = function addHouse(user_id, house_id) {
    return db.one(
        'INSERT INTO fav_houses (user_id, house_id) VALUES ($1, $2) RETURNING *;',
        [user_id, house_id]
    );
};

user.addHouseMiddleware = function addHouseMiddleware(req, res, next) {
    const user_id = data.user_id;
    const house_id = data.house_id;
    user
        .addHouse(user_id, house_id)
        .then(userData => {
            res.locals.userData = userData;
            next();
        })
        .catch(err => console.log('ERROR:', err));
};

module.exports = user;
