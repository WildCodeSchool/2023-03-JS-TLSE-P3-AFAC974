const AbstractManager = require("./AbstractManager");

class ArtworkManager extends AbstractManager {
  constructor() {
    super({ table: "artwork" });
  }

  browseArtworks() {
    return this.database.query("select * from artwork");
  }
}

module.exports = ArtworkManager;
