const models = require("../models");

const browse = (req, res) => {
  models.artistTechnique
    .findAll()
    .then(([rows]) => {
      res.send(rows).status(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroyJointureTechnique = (req, res) => {
  const filters = {
    artist_id: req.query.artist_id,
    technique_id: req.query.technique_id,
  };
  models.artistTechnique
    .deleteJointureTechnique(filters)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addArtistTechnique = (req, res) => {
  models.artistTechnique
    .createArtistTechnique(req.body)
    .then((rows) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  addArtistTechnique,
  destroyJointureTechnique,
};
