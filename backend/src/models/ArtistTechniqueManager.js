const AbstractManager = require("./AbstractManager");

class ArtistTechnique extends AbstractManager {
  constructor() {
    super({ table: "artist_technique" });
  }
}

module.exports = ArtistTechnique;
