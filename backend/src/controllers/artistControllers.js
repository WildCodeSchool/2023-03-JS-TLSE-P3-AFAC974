const models = require("../models");

const browse = (req, res) => {
  models.artist
    .findAll()
    .then(([rows]) => {
      res.send(rows).status(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.artist
    .find(req.params.id)
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

const readArtTrendName = (req, res) => {
  models.artist
    .jointureNameArtTrend(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows.map((row) => row.name));
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readTechniqueName = (req, res) => {
  models.artist
    .jointureNameTechnique(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows.map((row) => row.name));
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addArtist = (req, res) => {
  models.artist
    .createArtist(req.body)
    .then((rows) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const { id } = req.params;
  models.artist
    .updateArtist(id, req.body)
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

const destroy = (req, res) => {
  const { id } = req.params;
  models.artist
    .delete(id)
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

const readArtworkUrl = (req, res) => {
  models.artist
    .selectedUrlByArtistId(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows.map((row) => row.image_url_medium));
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  addArtist,
  destroy,
  read,
  readArtTrendName,
  readTechniqueName,
  edit,
  readArtworkUrl,
};
