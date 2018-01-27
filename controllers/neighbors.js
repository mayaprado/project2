const router = require('express').Router();
const neighbors = require('../models/neighbors.js');

router.get('/', neighbors.allNeighbors, (req, res, next) => {
  res.render('neighbors', { neighborsData: res.locals.allNeighborsData });
});

router.get('/:id', neighbors.findById, (req, res, next) => {
  res.render('neighbor', { neighborData: res.locals.neighborData });
});

module.exports = router;
