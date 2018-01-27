const db = require('../db/index.js');

const neighbors = {};

neighbors.allNeighbors = (req, res, next) => {
  db
    .manyOrNone('SELECT * FROM neighbors')
    .then(data => {
      res.locals.allNeighborsData = data;
      next();
    })
    .catch(error => {
      console.log('error encountered in neighbors.allNeighbors. Error:', error);
      next(error);
    });
};

neighbors.findById = (req, res, next) => {
  const id = req.params.id;
  db
    .one(
      'SELECT * FROM neighbors JOIN houses ON houses.id = neighbors.house_id WHERE neighbors.id = ${id}',
      { id: id }
    )
    .then(data => {
      res.locals.neighborData = data;
      next();
    })
    .catch(error => {
      console.log('error encountered in neighbors.findById. Error:', error);
      next(error);
    });
};

module.exports = neighbors;
