/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class ArtworkManager extends AbstractManager {
  constructor() {
    super({ table: "artwork" });
  }

  createArtwork(artwork) {
    const {
      name,
      year,
      description,
      imageUrlSmall,
      imageUrlMedium,
      imageUrlLarge,
      artTrendId,
      typeId,
      techniqueId,
      artistId,
      widthCm,
      heightCm,
      depthCm,
      artworkLocation,
    } = artwork;

    return this.database.query(
      `INSERT INTO ${this.table} (name, year, description, image_url_small, image_url_medium, image_url_large, art_trend_id, type_id, technique_id, artist_id, width_cm, height_cm, depth_cm, artwork_location) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,

      [
        name,
        year,
        description,
        imageUrlSmall,
        imageUrlMedium,
        imageUrlLarge,
        artTrendId,
        typeId,
        techniqueId,
        artistId,
        widthCm,
        heightCm,
        depthCm,
        artworkLocation,
      ]
    );
  }

  updateArtwork(id, body) {
    const keys = Object.keys(body);
    const values = Object.values(body);
    const valueQuery = keys.map((key) => `${key} = ?`).join(", ");
    return this.database.query(
      `update ${this.table} set ${valueQuery} where id = ?`,
      [...values, id]
    );
  }
}

module.exports = ArtworkManager;
