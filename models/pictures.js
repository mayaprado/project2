const db = require('../db/index.js');

const pictureModel = {};

pictureModel.storeUrl = function(req, res, next) {
  console.log(req.body.image);
  db
    .none('INSERT INTO pictures (url) VALUES ($1);', [req.body.image])
    .catch(err => {
      console.log(
        'Error encounted in pictureDateSeedStep pgpromise call, error:',
        err
      );
    });
};

module.exports = pictureModel;
