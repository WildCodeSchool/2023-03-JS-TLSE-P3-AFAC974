/* eslint-disable camelcase */
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

  updateArtwork(id, body) {
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

    let query = `update ${this.table} set `;
    const values = [];

    if (name) {
      query += `name = ?, `;
      values.push(name);
    }
    if (year) {
      query += `year = ?, `;
      values.push(year);
    }
    if (description) {
      query += `description = ?, `;
      values.push(description);
    }
    if (image_url_small) {
      query += `image_url_small = ?, `;
      values.push(image_url_small);
    }
    if (image_url_medium) {
      query += `image_url_medium = ?, `;
      values.push(image_url_medium);
    }
    if (image_url_large) {
      query += `image_url_large = ?, `;
      values.push(image_url_large);
    }
    if (art_trend_id) {
      query += `art_trend_id = ?, `;
      values.push(art_trend_id);
    }
    if (type_id) {
      query += `type_id = ?, `;
      values.push(type_id);
    }
    if (technique_id) {
      query += `technique_id = ?, `;
      values.push(technique_id);
    }
    if (artist_id) {
      query += `artist_id = ?, `;
      values.push(artist_id);
    }
    if (width_cm) {
      query += `width_cm = ?, `;
      values.push(width_cm);
    }
    if (height_cm) {
      query += `height_cm = ?, `;
      values.push(height_cm);
    }
    if (depth_cm) {
      query += `depth_cm = ?, `;
      values.push(depth_cm);
    }
    if (artwork_location) {
      query += `artwork_location = ?, `;
      values.push(artwork_location);
    }
    query = query.slice(0, -2);
    query += ` where id = ?`;
    values.push(id);
    return this.database.query(query, values);
  }
}

module.exports = ArtworkManager;
