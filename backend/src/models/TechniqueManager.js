const AbstractManager = require("./AbstractManager");

class TechniqueManager extends AbstractManager {
  constructor() {
    super({ table: "technique" });
  }

  createTechnique(technique) {
    const { name } = technique;

    return this.database.query(
      `INSERT INTO ${this.table} (name) VALUES (?)`,

      [name]
    );
  }
}

module.exports = TechniqueManager;
