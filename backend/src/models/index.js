require("dotenv").config();

const mysql = require("mysql2/promise");

// create a connection pool to the database

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// try a connection

pool.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  );
});

// declare and fill models: that's where you should register your own managers

const models = {};

const ItemManager = require("./ItemManager");

models.item = new ItemManager();
models.item.setDatabase(pool);

const ArtworkManager = require("./ArtworkManager");

models.artwork = new ArtworkManager();
models.artwork.setDatabase(pool);

const ArtistManager = require("./ArtistManager");

models.artist = new ArtistManager();
models.artist.setDatabase(pool);

const UserManager = require("./UserManager");

models.user = new UserManager();
models.user.setDatabase(pool);

const TypeManager = require("./TypeManager");

models.type = new TypeManager();
models.type.setDatabase(pool);

const TechniqueManager = require("./TechniqueManager");

models.technique = new TechniqueManager();
models.technique.setDatabase(pool);

const ArtistTechniqueManager = require("./ArtistTechniqueManager");

models.artistTechnique = new ArtistTechniqueManager();
models.artistTechnique.setDatabase(pool);

const ArtTrendArtistManager = require("./ArtTrendArtistManager");

models.artTrendArtist = new ArtTrendArtistManager();
models.artTrendArtist.setDatabase(pool);

const TrendManager = require("./TrendManager");

models.artTrend = new TrendManager();
models.artTrend.setDatabase(pool);

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    );
  },
};

module.exports = new Proxy(models, handler);
