const express = require("express");

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

// --- PUBLIC ROUTES --- //

// item routes (changes might occur here on the next pull request)

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// artwork routes

router.get("/artworks", artworkControllers.browse);

// artist routes

router.get("/artists", artistControllers.browse);

// user routes

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);

// --- PASSWORD NEEDED ROUTE --- //

// user routes
router.post("/register", verifyEmail, hashPassword, userControllers.add);
router.post("/login", userControllers.login, verifyPassword);

// --- TOKEN NEEDED ROUTES --- //

router.use(verifyToken);

// artwork routes

router.post("/artworks", artworkControllers.create);
router.put("/artworks/:id", artworkControllers.edit);

// user routes

router.put("/users/:id", verifyEmail, userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

module.exports = router;
