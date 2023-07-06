const AbstractManager = require("./AbstractManager");

class ArtTrendManager extends AbstractManager {
  constructor() {
    super({ table: "art_trend_artist" });
  }

  createArtTrendArtist(artTrendArtist) {
    const { artistId, artTrendId } = artTrendArtist;

    return this.database.query(
      `INSERT INTO ${this.table} (artist_id, art_trend_id) VALUES (?,?)`,

      [artistId, artTrendId]
    );
  }
}

module.exports = ArtTrendManager;
