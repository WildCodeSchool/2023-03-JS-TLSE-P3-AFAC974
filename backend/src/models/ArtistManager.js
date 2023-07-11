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

  jointureNameArtTrend(id) {
    return this.database.query(
      `select art_trend.name from ${this.table} JOIN art_trend_artist ON artist.id = art_trend_artist.artist_id JOIN art_trend ON art_trend_artist.art_trend_id = art_trend.id  where artist.id = ?`,
      [id]
    );
  }

  jointureNameTechnique(id) {
    return this.database.query(
      `select technique.name from ${this.table} JOIN artist_technique ON artist.id = artist_technique.artist_id JOIN technique ON artist_technique.technique_id = technique.id  where artist.id = ?`,
      [id]
    );
  }

  updateArtist(id, artist) {
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
      `update ${this.table} set lastname = ?, firstname = ?, nickname = ?, description = ?, image_url_small = ?, image_url_medium = ?, image_url_large = ?, website_url = ?, facebook_url = ?, instagram_url = ?, twitter_url = ? where id = ?`,
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
        id,
      ]
    );
  }

  selectedUrlByArtistId(id) {
    return this.database.query(
      `select artwork.image_url_medium from ${this.table} Join artwork on artwork.artist_id = artist.id where artist.id = ?`,
      [id]
    );
  }
}

module.exports = ArtistManager;
