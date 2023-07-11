const express = require("express");
const multer = require("multer");

const { storage } = require("./services/cloudinary");

const upload = multer({ storage });

const router = express.Router();

// authentication import

const {
  verifyEmail,
  hashPassword,
  verifyPassword,
  // verifyToken,
} = require("./auth");

// controllers import

const itemControllers = require("./controllers/itemControllers");
const artworkControllers = require("./controllers/artworkControllers");
const artistControllers = require("./controllers/artistControllers");
const userControllers = require("./controllers/userControllers");
const artTrendControllers = require("./controllers/artTrendControllers");
const techniqueControllers = require("./controllers/techniqueControllers");
const typeControllers = require("./controllers/typeControllers");
const artistTechniqueControllers = require("./controllers/artistTechniqueControllers");
const artTrendArtistControllers = require("./controllers/artTrendArtistControllers");
const uploadControllers = require("./controllers/uploadControllers");

// --- PUBLIC ROUTES --- //

// item routes (changes might occur here on the next pull request)

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// artwork routes

router.get("/artworks", artworkControllers.browse);
router.get("/artworks/:id", artworkControllers.read);

// artist routes

router.get("/artists", artistControllers.browse);
router.get("/artists/:id", artistControllers.read);
router.get("/artists-artworks-url/:id", artistControllers.readArtworkUrl);
router.get("/arttrend-artist/:id", artistControllers.readArtTrendName);
router.get("/artists-technique/:id", artistControllers.readTechniqueName);

// user routes

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);

// art_trend routes

router.get("/arttrend", artTrendControllers.browse);
router.get("/arttrend/:id", artTrendControllers.read);

// technique routes

router.get("/technique", techniqueControllers.browse);
router.get("/technique/:id", techniqueControllers.read);

// type routes

router.get("/type", typeControllers.browse);
router.get("/type/:id", typeControllers.read);

// artist_technique routes

router.get("/artists-technique", artistTechniqueControllers.browse);

// art_trend routes

router.get("/arttrend-artist", artTrendArtistControllers.browse);

// --- PASSWORD NEEDED ROUTE --- //

// user routes
router.post("/register", verifyEmail, hashPassword, userControllers.add);
router.post("/login", userControllers.login, verifyPassword);

// --- TOKEN NEEDED ROUTES --- //

// router.use(verifyToken);

// artwork routes

router.post("/artworks", artworkControllers.create);
router.put("/artworks/:id", artworkControllers.edit);
router.delete("/artworks/:id", artworkControllers.destroy);

// user routes

router.put("/users/:id", verifyEmail, userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

// technique routes

router.post("/technique", techniqueControllers.addTechnique);
router.delete("/technique/:id", techniqueControllers.destroy);

// art_trend routes

router.post("/arttrend", artTrendControllers.addArtTrend);
router.delete("/arttrend/:id", artTrendControllers.destroy);

// artist_technique routes

router.post(
  "/artists-technique",
  artistTechniqueControllers.addArtistTechnique
);
router.delete(
  "/artists-technique",
  artistTechniqueControllers.destroyJointureTechnique
);

// art_trend routes

router.post("/arttrend-artist", artTrendArtistControllers.addArtTrendArtist);
router.delete(
  "/arttrend-artist",
  artTrendArtistControllers.destroyJointureArtTrend
);

// artist routes

router.post("/artists", artistControllers.addArtist);
router.put("/artists/:id", artistControllers.edit);
router.delete("/artists/:id", artistControllers.destroy);

// art_trend routes

router.post("/type", typeControllers.addType);
router.delete("/type/:id", typeControllers.destroy);

router.post("/upload", upload.single("myfile"), uploadControllers.upload);
router.delete("/upload", uploadControllers.destroy);
router.delete("/upload/group", uploadControllers.destroyGroup);

module.exports = router;
