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

  deleteJointuretechnique(body) {
    return this.database.query(
      `delete from ${this.table} where artist_id = ? AND technique_id = ? `,
      [body]
    );
  }
}

module.exports = ArtistTechnique;
