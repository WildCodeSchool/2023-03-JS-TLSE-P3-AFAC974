const AbstractManager = require("./AbstractManager");

class ArtTrendManager extends AbstractManager {
  constructor() {
    super({ table: "art_trend" });
  }
}

module.exports = ArtTrendManager;
