const models = require("../models");

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

module.exports = {
  addFavorite,
};
