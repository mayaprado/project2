const db = require('../db/index.js');

const houses = {};

houses.allHouses = (req, res, next) => {
  db
    .manyOrNone('SELECT * FROM houses')
    .then(data => {
      res.locals.allHousesData = data;
      next();
    })
    .catch(error => {
      console.log('error encountered in houses.allHouses. Error:', error);
      next(error);
    });
};

houses.findById = (req, res, next) => {
  const id = req.params.id;
  db
    .manyOrNone(
      'SELECT * FROM houses JOIN neighbors ON neighbors.house_id = houses.id WHERE houses.id = ${id}',
      { id: id }
    )
    .then(data => {
      res.locals.houseData = data;
      next();
    })
    .catch(error => {
      console.log('error encountered in houses.findById. Error:', error);
      next(error);
    });
};

module.exports = houses;
