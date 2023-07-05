const models = require("../models");

const browse = (req, res) => {
  models.artTrend
    .findAll()
    .then(([rows]) => {
      res.send(rows).status(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addArtTrend = (req, res) => {
  models.artTrend
    .createArtTrend(req.body)
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
  addArtTrend,
};
