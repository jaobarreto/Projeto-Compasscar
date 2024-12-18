const db = require("../config/db.js");

exports.create = (car, callback) => {
  const { brand, model, year } = car;
  db.query(
    "INSERT INTO cars (brand, model, year) VALUES (?, ?, ?)",
    [brand, model, year],
    callback
  );
};

exports.findByBrandModelYear = (brand, model, year, callback) => {
  db.query(
    "SELECT * FROM cars WHERE brand = ? AND model = ? AND year = ?",
    [brand, model, year],
    callback
  );
};

exports.countAll = (callback) => {
  db.query("SELECT COUNT(*) AS count FROM cars", (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0].count);
  });
};

exports.getAllPaginated = (limit, offset, callback) => {
  db.query(
    "SELECT * FROM cars LIMIT ? OFFSET ?",
    [limit, offset],
    (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    }
  );
};

exports.getAll = (callback) => {
  db.query("SELECT * FROM cars", callback);
};

exports.findById = (id, callback) => {
  db.query("SELECT * FROM cars WHERE id = ?", [id], callback);
};

exports.findByAttributes = (brand, model, year, callback) => {
  const query = "SELECT * FROM cars WHERE brand = ? AND model = ? AND year = ?";
  db.query(query, [brand, model, year], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]); 
  });
};

exports.update = (id, car, callback) => {
  const { brand, model, year } = car;
  db.query(
    "UPDATE cars SET brand = ?, model = ?, year = ? WHERE id = ?",
    [brand, model, year, id],
    callback
  );
};

exports.deleteItemsByCarId = (carId, callback) => {
  const query = 'DELETE FROM car_items WHERE car_id = ?';
  db.query(query, [carId], (err) => {
    if (err) return callback(err);
    callback(null);
  });
};

exports.delete = (id, callback) => {
  const query = "DELETE FROM cars WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};