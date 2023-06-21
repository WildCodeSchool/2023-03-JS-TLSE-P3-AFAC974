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
    
    const { id } = req.params;
    
    let keys = Object.keys(req.body);
    const values = Object.values(req.body);
    const valueQuery = keys.map((key) => `${key} = ?`).join(', ');

    db.query(`update ${this.table} set ${valueQuery}`, [...values, id]).then(
    ([result]) => {
      if (result.affectedRows > 0) {
        res.status(204).json(result);
      } else {
        res.status(404).send('Cannot update artwork');
      }
    }
  );
  }
}
   
module.exports = ArtworkManager;
