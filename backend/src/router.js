const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// artwork routes

const artworkControllers = require("./controllers/artworkControllers");

router.get("/artworks", artworkControllers.browse);
router.post("/artworks", artworkControllers.create);
router.put("/artworks/:id", artworkControllers.edit);

// artist routes

const artistControllers = require("./controllers/artistControllers");

router.get("/artists", artistControllers.browse);

module.exports = router;
