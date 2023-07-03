const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findByEmail(email) {
    return this.database.query(`select * from ${this.table} where email = ?`, [
      email,
    ]);
  }

  insert(body) {
    const {
      lastname,
      firstname,
      pseudo,
      email,
      image,
      hashedPassword,
      role,
      entityId,
    } = body;
    return this.database.query(
      `INSERT INTO ${this.table}(lastname, firstname, pseudo, email, image, hashedPassword, role, entity_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        lastname,
        firstname,
        pseudo,
        email,
        image,
        hashedPassword,
        role,
        entityId,
      ]
    );
  }

  login(email) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE email = ?`, [
      email,
    ]);
  }

  update(id, body) {
    const keys = Object.keys(body);
    const values = Object.values(body);
    const valueQuery = keys.map((key) => `${key} = ?`).join(", ");
    return this.database.query(
      `update ${this.table} set ${valueQuery} where id = ?`,
      [...values, id]
    );
  }
}

module.exports = UserManager;
