const AbstractManager = require("./AbstractManager");

class TechniqueManager extends AbstractManager {
  constructor() {
    super({ table: "technique" });
  }
}

module.exports = TechniqueManager;
