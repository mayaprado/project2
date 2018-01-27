const router = require('express').Router();
const houses = require('../models/houses.js');

router.get('/', houses.allHouses, (req, res, next) => {
  res.render('houses', { housesData: res.locals.allHousesData });
});

router.get('/:id', houses.findById, (req, res, next) => {
  // res.json(res.locals.houseData);
  res.render('house', {
    houseData: res.locals.houseData[0],
    neighborData: res.locals.houseData,
  });
});

module.exports = router;
