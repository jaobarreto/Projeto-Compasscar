const db = require("../config/db.js");

const Car = {
  create: (data, callback) => {
    const query = "INSERT INTO cars (brand, model, year) VALUES (?, ?, ?)";
    db.query(query, [data.brand, data.model, data.model, data.year], callback);
  },
  findAll: (callback) => {
    const query = "SELECT * FROM cars";
    db.query(query, callback);
  },
  findByID: (id, callback) => {
    const query = "SELECT * FROM cars WHERE id = ?";
    db.query(query, [id], callback);
  },
  update: (id, data, callback) => {
    const query = "UPDATE cars SET brand = ?, model =?, year = ?m WHERE id = ?";
    db.query(query, [data.brand, data.model, data.year, id], callback);
  },
  delete: (id, callback) => {
    const query = "DELETE FROM cars WHERE id = ?";
    db.query(query, [id], callback);
  },
};

module.exports = Car;
