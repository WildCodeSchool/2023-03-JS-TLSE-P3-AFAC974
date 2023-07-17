const AbstractManager = require("./AbstractManager");

class FavoriteManager extends AbstractManager {
  constructor() {
    super({ table: "artwork_favorite" });
  }

  addFavorite(userId, artworkId) {
    return this.database.query(
      `INSERT INTO ${this.table} (user_id, artwork_id) VALUES (?,?)`,
      [userId, artworkId]
    );
  }
}

module.exports = FavoriteManager;
