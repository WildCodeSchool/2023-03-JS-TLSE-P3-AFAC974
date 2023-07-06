const AbstractManager = require("./AbstractManager");

class ArtistTechnique extends AbstractManager {
  constructor() {
    super({ table: "artist_technique" });
  }

  createArtistTechnique(artistTechnique) {
    const { artistId, techniqueId } = artistTechnique;

    return this.database.query(
      `INSERT INTO ${this.table} (artist_id, technique_id) VALUES (?,?)`,

      [artistId, techniqueId]
    );
  }
}

module.exports = ArtistTechnique;
