const AbstractManager = require("./AbstractManager");

class ArttrendManager extends AbstractManager {
  constructor() {
    super({ table: "art_trend" });
  }
}

module.exports = ArttrendManager;
