const models = require("../models");

const browseFavorites = (req, res) => {
  models.favorite
    .browseFavorites(req.params.userId)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(200).send([result]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addFavorite = (req, res) => {
  models.favorite
    .addFavorite(req.params.userId, req.params.artworkId)
    .then(([rows]) => {
      if (rows.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteFavorite = (req, res) => {
  models.favorite
    .deleteFavorite(req.params.userId, req.params.artworkId)
    .then(([rows]) => {
      if (rows.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browseFavorites,
  addFavorite,
  deleteFavorite,
};
