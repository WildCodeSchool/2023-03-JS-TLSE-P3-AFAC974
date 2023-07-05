const AbstractManager = require("./AbstractManager");

class TechniqueManager extends AbstractManager {
  constructor() {
    super({ table: "technique" });
  }

  createTechnique(techniqueArray) {
    const insertPromises = techniqueArray.map((technique) =>
      this.database.query(
        `INSERT INTO ${this.table} (name) VALUES (?)`,

        [technique.name]
      )
    );
    return Promise.all(insertPromises);
  }
}

module.exports = TechniqueManager;
