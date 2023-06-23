const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "artwork-afac",
    format: async (req, file) => {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
      ) {
        // Formats de sortie autorisés : jpeg, jpg, png
        return file.mimetype.split("/")[1];
      }
      return undefined; // Ignorer le reste
    },
  },
});

module.exports = { cloudinary, storage };
