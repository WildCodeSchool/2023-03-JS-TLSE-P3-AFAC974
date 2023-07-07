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

const destroyJointureTechnique = (req, res) => {
  const { body } = req.body;
  models.artistTechnique
    .deleteJointuretechnique(body)
    .then(([result]) => {
      if (result.affectedRows === 0) {
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
  browse,
  addArtistTechnique,
  destroyJointureTechnique,
};
