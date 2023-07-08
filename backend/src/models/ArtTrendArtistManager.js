const AbstractManager = require("./AbstractManager");

class ArtTrendManager extends AbstractManager {
  constructor() {
    super({ table: "art_trend_artist" });
  }

  createArtTrendArtist(artTrendArtist) {
    const { artistId, artTrendId } = artTrendArtist;

    return this.database.query(
      `INSERT INTO ${this.table} (artist_id, art_trend_id) VALUES (?,?)`,

      [artistId, artTrendId]
    );
  }

  deleteJointureArtTrend(filters) {
    const initialSql = `delete from ${this.table}`;
    const where = [];

    if (filters.artist_id != null) {
      where.push({
        column: "artist_id",
        value: filters.artist_id,
        operator: "=",
      });
    }

    if (filters.art_trend_id != null) {
      where.push({
        column: "art_trend_id",
        value: filters.art_trend_id,
        operator: "=",
      });
    }
    const sqlRequest = where.reduce(
      (sql, { column, operator }, index) =>
        `${sql} ${index === 0 ? "WHERE" : "AND"} ${column} ${operator} ?`,
      initialSql
    );
    const sqlValues = where.map(({ value }) => value);
    return this.database.query(sqlRequest, sqlValues);
  }
}

module.exports = ArtTrendManager;
