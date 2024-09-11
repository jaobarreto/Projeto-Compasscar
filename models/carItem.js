const db = require("../config/db.js");

const CarItem = {
  create: (data, callback) => {
    const query = "INSERT INTO car_items (name, car_id) VALUES (?, ?)";
    db.query(query, [data.name, data.car_id], callback);
  },
  findByCarId: (car_id, callback) => {
    const query = "SELECT * FROM car_items WHERE car_id = ?";
    db.query(query, [car_id], callback);
  },
  update: (id, data, callback) => {
    const query = "UPDATE car_items SET name = ? WHERE id = ?";
    db.query(query, [data.name, id], callback);
  },
  deleteByCarId: (car_id, callback) => {
    const query = "DELETE FROM car_items WHERE car_id = ?";
    db.query(query, [car_id], callback);
  },
};

module.exports = CarItem;
