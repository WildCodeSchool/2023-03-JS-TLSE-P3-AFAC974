const AbstractManager = require("./AbstractManager");

class ArtTrendManager extends AbstractManager {
  constructor() {
    super({ table: "art_trend" });
  }

  createArtTrend(artTrendArray) {
    const insertPromises = artTrendArray.map((artTrend) =>
      this.database.query(
        `INSERT INTO ${this.table} (name) VALUES (?)`,

        [artTrend.name]
      )
    );
    return Promise.all(insertPromises);
  }
}

module.exports = ArtTrendManager;
