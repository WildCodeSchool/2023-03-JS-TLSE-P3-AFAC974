/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class ArtworkManager extends AbstractManager {
  constructor() {
    super({ table: "artwork" });
  }

  createArtwork(body) {
    const {
      name,
      year,
      description,
      image_url_small,
      image_url_medium,
      image_url_large,
      art_trend_id,
      type_id,
      technique_id,
      artist_id,
      width_cm,
      height_cm,
      depth_cm,
      artwork_location,
    } = body;
    return this.database.query(
      `insert into ${this.table} (name, year, description, image_url_small, image_url_medium, image_url_large, art_trend_id, type_id, technique_id, artist_id, width_cm, height_cm, depth_cm, artwork_location) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        name,
        year,
        description,
        image_url_small,
        image_url_medium,
        image_url_large,
        art_trend_id,
        type_id,
        technique_id,
        artist_id,
        width_cm,
        height_cm,
        depth_cm,
        artwork_location,
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
