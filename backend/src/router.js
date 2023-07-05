const express = require("express");
const multer = require("multer");

const router = express.Router();

// authentication import

const {
  verifyEmail,
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./auth");

// controllers import

const itemControllers = require("./controllers/itemControllers");
const artworkControllers = require("./controllers/artworkControllers");
const artistControllers = require("./controllers/artistControllers");
const userControllers = require("./controllers/userControllers");
const artTrendControllers = require("./controllers/artTrendControllers");
const techniqueControllers = require("./controllers/techniqueControllers");
const typeControllers = require("./controllers/typeControllers");

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

// artist routes

router.get("/artists", artistControllers.browse);

// user routes

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);

// art_trend routes

router.get("/arttrend", artTrendControllers.browse);

// technique routes

router.get("/technique", techniqueControllers.browse);

// type routes

router.get("/type", typeControllers.browse);

// technique routes

router.post("/technique", techniqueControllers.addTechnique);

// art_trend routes

router.post("/arttrend", artTrendControllers.addArtTrend);

// --- PASSWORD NEEDED ROUTE --- //

// user routes
router.post("/register", verifyEmail, hashPassword, userControllers.add);
router.post("/login", userControllers.login, verifyPassword);

// --- TOKEN NEEDED ROUTES --- //

router.use(verifyToken);

// artwork routes

router.post("/artworks", upload.single("image"), artworkControllers.create);
router.put("/artworks/:id", artworkControllers.edit);

// user routes

router.put("/users/:id", verifyEmail, userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

module.exports = router;
