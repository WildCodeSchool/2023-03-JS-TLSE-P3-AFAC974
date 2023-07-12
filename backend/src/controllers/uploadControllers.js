const cloudinary = require("cloudinary").v2;

class uploadControllers {
  static upload = (req, res) => {
    cloudinary.uploader.upload(req.file.path, (error, result) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Erreur lors de l'upload de l'image" });
      }

      return res.status(200).json({ imageUrl: result.secure_url });
    });
  };

  static destroy = (req, res) => {
    cloudinary.uploader
      .destroy(req.body.namePicture)
      .then((result) => {
        if (result.result === "Delete is ok") {
          res.sendStatus(204);
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static destroyGroup = (req, res) => {
    cloudinary.api
      .delete_ressources(req.body)
      .then((result) => {
        if (result.result === "Delete is ok") {
          res.sendStatus(204);
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = uploadControllers;
