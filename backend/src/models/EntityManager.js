const AbstractManager = require("./AbstractManager");

class EntityManager extends AbstractManager {
  constructor() {
    super({ table: "entity" });
  }
}

module.exports = EntityManager;
