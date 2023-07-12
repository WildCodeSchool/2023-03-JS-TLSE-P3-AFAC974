const AbstractManager = require("./AbstractManager");

class TypeManager extends AbstractManager {
  constructor() {
    super({ table: "type" });
  }

  createType(type) {
    const { name } = type;

    return this.database.query(
      `INSERT INTO ${this.table} (name) VALUES (?)`,

      [name]
    );
  }
}

module.exports = TypeManager;
