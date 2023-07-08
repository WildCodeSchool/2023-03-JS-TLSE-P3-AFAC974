const models = require("../models");

const browse = (req, res) => {
  models.artTrendArtist
    .findAll()
    .then(([rows]) => {
      res.send(rows).status(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addArtTrendArtist = (req, res) => {
  models.artTrendArtist
    .createArtTrendArtist(req.body)
    .then((rows) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroyJointureArtTrend = (req, res) => {
  const filters = {
    artist_id: req.query.artist_id,
    art_trend_id: req.query.art_trend_id,
  };
  models.artTrendArtist
    .deleteJointureArtTrend(filters)
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

module.exports = {
  browse,
  addArtTrendArtist,
  destroyJointureArtTrend,
};
