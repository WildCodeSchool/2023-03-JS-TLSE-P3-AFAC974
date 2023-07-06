// const cloudinary = require("cloudinary").v2;
const models = require("../models");

const browse = (req, res) => {
  models.artwork
    .findAll()
    .then(([rows]) => {
      res.send(rows).status(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const create = (req, res) => {
  // const {
  //   name,
  //   year,
  //   description,
  //   artTrendId,
  //   typeId,
  //   techniqueId,
  //   artistId,
  //   widthCm,
  //   heightCm,
  //   depthCm,
  //   artworkLocation,
  // } = req.body;

  // const { path } = req.file;

  // cloudinary.uploader.upload(path, (error, result) => {
  //   if (error) {
  //     console.error(error);
  //     res.sendStatus(500);
  //   } else {
  //     const { secure_url: imageUrl, width, height } = result;

  //     let imageUrlSmall;
  //     let imageUrlMedium;
  //     let imageUrlLarge;

  //     if (width <= 100 && height <= 100) {
  //       imageUrlSmall = imageUrl;
  //     } else if (width <= 500 && height <= 500) {
  //       imageUrlMedium = imageUrl;
  //     } else {
  //       imageUrlLarge = imageUrl;
  //     }

  // const artwork = {
  //   name,
  //   year,
  //   description,
  //   imageUrlSmall,
  //   imageUrlMedium,
  //   imageUrlLarge,
  //   artTrendId,
  //   typeId,
  //   techniqueId,
  //   artistId,
  //   widthCm,
  //   heightCm,
  //   depthCm,
  //   artworkLocation,
  // };

  models.artwork
    .createArtwork(req.body)
    .then((rows) => {
      res.send(rows).status(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
//   });
// };

const edit = (req, res) => {
  const { id } = req.params;
  models.artwork
    .updateArtwork(id, req.body)
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
  models.artwork
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
  create,
  edit,
  destroy,
};
