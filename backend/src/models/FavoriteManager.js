const AbstractManager = require("./AbstractManager");

class FavoriteManager extends AbstractManager {
  constructor() {
    super({ table: "artwork_favorite" });
  }

  browseFavorites(userId) {
    return this.database.query(
      `SELECT artwork_id FROM ${this.table} WHERE user_id = ?`,
      [userId]
    );
  }

  addFavorite(userId, artworkId) {
    return this.database.query(
      `INSERT INTO ${this.table} (user_id, artwork_id) VALUES (?,?)`,
      [userId, artworkId]
    );
  }

  isFavorite(userId, artworkId) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE user_id = ? AND artwork_id = ?`,
      [userId, artworkId]
    );
  }

  deleteFavorite(userId, artworkId) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE user_id = ? AND artwork_id = ?`,
      [userId, artworkId]
    );
  }
}

module.exports = FavoriteManager;
