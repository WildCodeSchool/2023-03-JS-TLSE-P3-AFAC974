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
      imageUrlSmall,
      imageUrlMedium,
      imageUrlLarge,
      websiteUrl,
      facebookUrl,
      instagramUrl,
      twitterUrl,
    } = artist;

    return this.database.query(
      `INSERT INTO ${this.table} (lastname, firstname,nickname, description, image_url_small, image_url_medium, image_url_large, website_url, facebook_url, instagram_url, twitter_url) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,

      [
        lastname,
        firstname,
        nickname,
        description,
        imageUrlSmall,
        imageUrlMedium,
        imageUrlLarge,
        websiteUrl,
        facebookUrl,
        instagramUrl,
        twitterUrl,
      ]
    );
  }
}

module.exports = ArtistManager;
