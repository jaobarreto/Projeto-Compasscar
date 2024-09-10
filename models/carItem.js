const db = require("../config/db.js");

const CarItem = {
  create: (data, callback) => {
    const query = "INSERT INTO car_items (name, car_id) VALUES (?, ?)";
    db.query(query, [data.name, data.car_id], callback);
  },
  findAll: (callback) => {
    const query = "SELECT * FROM car_items";
    db.query(query, callback);
  },
  findByCarId: (car_id, callback) => {
    const query = "SELECT * from car_items WHERE car_id = ?";
    db.query(query, [car_id], callback);
  },
  update: (id, data, callback) => {
    const query = "UPDATE car_items SET name = ?, car_id = ? WHERE id = ?";
    db.query(query, [data.name, data.car_id, id], callback);
  },
  delete: (id, callback) => {
    const query = "DELETE FROM car_items WHERE id = ?";
    db.query(query, [id], callback);
  },
};

module.exports = CarItem;