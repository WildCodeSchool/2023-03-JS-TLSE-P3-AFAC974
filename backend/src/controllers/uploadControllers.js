const fs = require("fs");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

class uploadControllers {
  static uploadartworks = (req, res) => {
    cloudinary.uploader.upload(
      req.file.path,
      { folder: "artwork-afac" },
      (error, result) => {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .json({ message: "Erreur lors de l'upload de l'image" });
        }

        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error(
              "Erreur lors de la suppression du fichier temporaire:",
              err
            );
          }
        });

        return res.status(200).json({ imageUrl: result.secure_url });
      }
    );
  };

  static uploadartists = (req, res) => {
    cloudinary.uploader.upload(
      req.file.path,
      { folder: "artist-afac" },
      (error, result) => {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .json({ message: "Erreur lors de l'upload de l'image" });
        }

        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error(
              "Erreur lors de la suppression du fichier temporaire:",
              err
            );
          }
        });

        return res.status(200).json({ imageUrl: result.secure_url });
      }
    );
  };

  static uploadusers = (req, res) => {
    cloudinary.uploader.upload(
      req.file.path,
      { folder: "user-afac" },
      (error, result) => {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .json({ message: "Erreur lors de l'upload de l'image" });
        }

        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error(
              "Erreur lors de la suppression du fichier temporaire:",
              err
            );
          }
        });

        return res.status(200).json({ imageUrl: result.secure_url });
      }
    );
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
