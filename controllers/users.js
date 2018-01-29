const user = require('../models/user.js');
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
        res.render('users/profile', { user: res.locals.userData });
    }
);

// router.get('/houses', auth.restrict, user.findHouses, (req, res) => {
//     res.render('houses', { beersData: res.locals.userData });
// });

router.post('/profile', user.addHouseMiddleware, (req, res) => {
    res.render('users/profile', { user: res.locals.userData });
});

module.exports = router;
