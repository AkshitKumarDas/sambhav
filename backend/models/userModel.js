const db = require("../config/db");

/*
  CREATE USER
*/
const createUser = (name, email, passwordHash) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO users (name, email, password_hash, role)
      VALUES (?, ?, ?, 'user')
    `;

    db.run(query, [name, email, passwordHash], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          id: this.lastID,
          name,
          email,
        });
      }
    });
  });
};

/*
  FIND USER BY EMAIL
*/
const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM users WHERE email = ?
    `;

    db.get(query, [email], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

/*
  FIND USER BY ID
*/
const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id, name, email, role
      FROM users
      WHERE id = ?
    `;

    db.get(query, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
