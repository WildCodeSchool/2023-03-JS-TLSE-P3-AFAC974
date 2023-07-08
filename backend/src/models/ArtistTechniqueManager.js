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

  deleteJointureTechnique(filters) {
    const initialSql = `delete from ${this.table}`;
    const where = [];

    if (filters.artist_id != null) {
      where.push({
        column: "artist_id",
        value: filters.artist_id,
        operator: "=",
      });
    }

    if (filters.technique_id != null) {
      where.push({
        column: "technique_id",
        value: filters.technique_id,
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
module.exports = ArtistTechnique;
