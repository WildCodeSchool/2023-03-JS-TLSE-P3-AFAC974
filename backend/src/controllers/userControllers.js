const cloudinary = require("cloudinary").v2;
const models = require("../models");

const browse = (req, res) => {
  models.user
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
  const { id } = req.params;
  models.user
    .find(id)
    .then(([rows]) => {
      if (rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.send(rows).status(200);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  let data = {};
  if (req.body.user_picture) {
    const path = req.body.image_file;

    let imageUrl;
    cloudinary.uploader.upload(path, (error, result) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
      } else {
        imageUrl = result.secure_url;
        data = {
          ...req.body,
          image: imageUrl,
        };
        models.user
          .insert(data)
          .then(([response]) => {
            res.location(`/users/${response.insertId}`).sendStatus(201);
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
      }
    });
  } else {
    data = {
      ...req.body,
    };
    models.user
      .insert(data)
      .then(([result]) => {
        res.location(`/users/${result.insertId}`).sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};

const edit = (req, res) => {
  const { id } = req.params;
  models.user
    .update(id, req.body)
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

const login = (req, res, next) => {
  const { email } = req.body;
  models.user
    .login(email)
    .then(([users]) => {
      if (users[0] != null) {
        // eslint-disable-next-line prefer-destructuring
        req.user = users[0];
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const destroy = (req, res) => {
  const { id } = req.params;
  models.user
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

module.exports = {
  browse,
  read,
  add,
  edit,
  login,
  destroy,
};
