const db = require('../config/db.js');

exports.create = (car, callback) => {
  const { brand, model, year } = car;
  db.query('INSERT INTO cars (brand, model, year) VALUES (?, ?, ?)', [brand, model, year], callback);
};

exports.findByBrandModelYear = (brand, model, year, callback) => {
  db.query('SELECT * FROM cars WHERE brand = ? AND model = ? AND year = ?', [brand, model, year], callback);
};

exports.getAll = (callback) => {
  db.query('SELECT * FROM cars', callback);
};

exports.findById = (id, callback) => {
  db.query('SELECT * FROM cars WHERE id = ?', [id], callback);
};

exports.update = (id, car, callback) => {
  const { brand, model, year } = car;
  db.query('UPDATE cars SET brand = ?, model = ?, year = ? WHERE id = ?', [brand, model, year, id], callback);
};

exports.delete = (id, callback) => {
  db.query('DELETE FROM cars WHERE id = ?', [id], callback);
};
