const AbstractManager = require("./AbstractManager");

class TrendManager extends AbstractManager {
  constructor() {
    super({ table: "art_trend" });
  }

  createArtTrend(artTrend) {
    const { name } = artTrend;

    return this.database.query(
      `INSERT INTO ${this.table} (name) VALUES (?)`,

      [name]
    );
  }
}

module.exports = TrendManager;
