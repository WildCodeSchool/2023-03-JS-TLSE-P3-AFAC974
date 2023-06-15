const AbstractManager = require("./AbstractManager");

class ArtworkManager extends AbstractManager {
  constructor() {
    super({ table: "artwork" });
  }

  createArtwork(artwork) {
    return this.database.query(
      `insert into ${this.table} (name, year, description, image_url_small, image_url_medium, image_url_large, art_trend_id, type_id, technique_id, artist_id, width_cm, height_cm, depth_cm, artwork_location) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        artwork.name,
        artwork.year,
        artwork.description,
        artwork.image_url_small,
        artwork.image_url_medium,
        artwork.image_url_large,
        artwork.art_trend_id,
        artwork.type_id,
        artwork.technique_id,
        artwork.artist_id,
        artwork.width_cm,
        artwork.height_cm,
        artwork.depth_cm,
        artwork.artwork_location,
      ]
    );
  }
}

module.exports = ArtworkManager;
