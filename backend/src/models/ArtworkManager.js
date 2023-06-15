const AbstractManager = require("./AbstractManager");

class ArtworkManager extends AbstractManager {
  constructor() {
    super({ table: "artwork" });
  }
}

module.exports = ArtworkManager;
