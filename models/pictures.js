const db = require('../db/index.js');

const pictureModel = {};

pictureModel.storeUrl = function(req, res, next) {
  console.log(req.body.image);
  db
    .none(
      'INSERT INTO pictures (user_id, url, favorite) VALUES ($1, $2, TRUE);',
      [req.user.id, req.body.image]
    )
    .catch(err => {
      console.log(
        'Error encounted in pictureModel.storeUrl pgpromise call, error:',
        err
      );
    });
};

pictureModel.read = function(req, res, next) {
  db
    .manyOrNone(
      'SELECT * FROM pictures WHERE user_id = $1 AND favorite = TRUE;',
      [req.user.id]
    )
    .then(data => {
      res.locals.pictures = data;
      next();
    })
    .catch(err => {
      console.log(
        'Error encounted in pictureModel.read pgpromise call, error:',
        err
      );
    });
};

pictureModel.update = function(req, res, next) {
  db
    .none(
      'UPDATE pictures SET favorite = FALSE WHERE user_id = $1 AND id = $2',
      [req.user.id, req.body.picId]
    )
    .then(data => {
      res.locals.pictures = data;
      next();
    })
    .catch(err => {
      console.log(
        'Error encounted in pictureModel.read pgpromise call, error:',
        err
      );
    });
};

module.exports = pictureModel;
