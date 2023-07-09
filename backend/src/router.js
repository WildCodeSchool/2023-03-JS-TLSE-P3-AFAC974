const express = require("express");
const multer = require("multer");

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

// --- PUBLIC ROUTES --- //

// item routes (changes might occur here on the next pull request)

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// artwork routes

const { storage } = require("./services/cloudinary");

// Créer l'instance de multer avec la configuration de stockage Cloudinary
const upload = multer({ storage });

router.get("/artworks", artworkControllers.browse);
router.get("/artworks/:id", artworkControllers.read);

// artist routes

router.get("/artists", artistControllers.browse);
router.get("/artists/:id", artistControllers.read);

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

router.get("/artisttechnique", artistTechniqueControllers.browse);

// art_trend routes

router.get("/arttrendartist", artTrendArtistControllers.browse);

// --- PASSWORD NEEDED ROUTE --- //

// user routes
router.post("/register", verifyEmail, hashPassword, userControllers.add);
router.post("/login", userControllers.login, verifyPassword);

// --- TOKEN NEEDED ROUTES --- //

// router.use(verifyToken);

// artwork routes

router.post("/artworks", upload.single("image"), artworkControllers.create);
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

router.post("/artisttechnique", artistTechniqueControllers.addArtistTechnique);
router.delete(
  "/artisttechnique",
  artistTechniqueControllers.destroyJointureTechnique
);

// art_trend routes

router.post("/arttrendartist", artTrendArtistControllers.addArtTrendArtist);
router.delete(
  "/arttrendartist",
  artTrendArtistControllers.destroyJointureArtTrend
);

// artist routes

router.post("/artists", upload.single("image"), artistControllers.addArtist);
router.delete("/artists/:id", artistControllers.destroy);

// art_trend routes

router.post("/type", typeControllers.addType);
router.delete("/type/:id", typeControllers.destroy);

module.exports = router;
