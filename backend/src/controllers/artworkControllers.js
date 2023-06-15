const models = require("../models");

const browse = (req, res) => {
  models.artwork
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const create = (req, res) => {
  models.artwork
    .createArtwork(req.body)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const { id } = req.params;
  models.artwork.updateArtwork(id, req.body).then(([rows]) => {
    if (rows.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  });
};

module.exports = {
  browse,
  create,
  edit,
};
