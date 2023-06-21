const express = require("express");

const router = express.Router();

// authentication import

const {
  verifyEmail,
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./auth");

// item routes

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// artwork routes

const artworkControllers = require("./controllers/artworkControllers");

router.get("/artworks", artworkControllers.browse);
router.post("/artworks", verifyToken, artworkControllers.create);
router.put("/artworks/:id", verifyToken, artworkControllers.edit);

// artist routes

const artistControllers = require("./controllers/artistControllers");

router.get("/artists", artistControllers.browse);

// user routes

const userControllers = require("./controllers/userControllers");

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.post("/register", verifyEmail, hashPassword, userControllers.add);
router.post("/login", userControllers.login, verifyPassword);
router.put("/users/:id", userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

module.exports = router;
