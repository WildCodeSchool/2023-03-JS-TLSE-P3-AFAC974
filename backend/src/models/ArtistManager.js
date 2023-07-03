/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class ArtistManager extends AbstractManager {
  constructor() {
    super({ table: "artist" });
  }

  createArtist(artist) {
    const {
      lastname,
      firstname,
      nickname,
      description,
      image_url_small,
      image_url_medium,
      image_url_large,
      website_url,
      facebook_url,
      instagram_url,
      twitter_url,
    } = artist;

    return this.database.query(
      `INSERT INTO ${this.table} (lastname, firstname, nickname, description, image_url_small, image_url_medium, image_url_large, website_url, facebook_url, instagram_url, twitter_url) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        lastname,
        firstname,
        nickname,
        description,
        image_url_small,
        image_url_medium,
        image_url_large,
        website_url,
        facebook_url,
        instagram_url,
        twitter_url,
      ]
    );
  }

  updateArtist(id, body) {
    const keys = Object.keys(body);
    const values = Object.values(body);
    const valueQuery = keys.map((key) => `${key} = ?`).join(", ");
    return this.database.query(
      `update ${this.table} set ${valueQuery} where id = ?`,
      [...values, id]
    );
  }

  deleteArtist(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = ArtistManager;
