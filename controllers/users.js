const user = require('../models/user.js');
const pictureModel = require('../models/pictures.js');
const router = require('express').Router();
const passport = require('passport');

const auth = require('../services/auth');

router.get('/', (req, res, next) => {
    res.redirect('/users/profile');
});

router.post(
    '/',
    passport.authenticate('local-signup', {
        failureRedirect: '/users/new',
        successRedirect: '/users/profile',
    })
);

router.get('/new', (req, res) => {
    res.render('users/new');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post(
    '/login',
    passport.authenticate('local-login', {
        failureRedirect: '/users/login',
        successRedirect: '/users/profile',
    })
);

router.get(
    '/profile',
    auth.restrict,
    user.findByEmailMiddleware,
    (req, res) => {
        // res.json(res.locals.userData);
        res.render('users/profile', { user: res.locals.userData });
    }
);

router.get(
    '/favorites',
    auth.restrict,
    user.findHousesMiddleware,
    (req, res) => {
        // res.json(res.locals.favHouses);
        res.render('users/favorites', { favHouses: res.locals.favHouses });
    }
);

router.delete(
    '/favorites',
    auth.restrict,
    user.destroyHouseMiddleware,
    (req, res) => {
        // res.json(res.locals.favHouses);
        res.render('users/favorites', { favHouses: res.locals.favHouses });
    }
);

// router.get('/houses', auth.restrict, user.findHouses, (req, res) => {
//     res.render('houses', { beersData: res.locals.userData });
// });

router.post('/profile', user.addHouseMiddleware, (req, res) => {
    res.render('users/profile', { user: res.locals.userData });
});

router.post('/pictures', pictureModel.storeUrl, (req, res) => {
    res.json({});
});

router.get('/pictures', pictureModel.read, (req, res) => {
    res.render('users/pictures', { pictures: res.locals.pictures });
});

router.put('/pictures', pictureModel.update, (req, res) => {
    res.render('users/pictures', { pictures: res.locals.pictures });
});

module.exports = router;
