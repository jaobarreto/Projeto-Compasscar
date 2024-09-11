const Car = require("../models/car");
const CarItem = require("../models/carItem");

exports.create = (req, res) => {
  const { brand, model, year, items } = req.body;

  if (
    !brand ||
    !model ||
    !year ||
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return res.status(400).send({ message: "All fields are required." });
  }

  const currentYear = new Date().getFullYear();
  if (year < currentYear - 10 || year > currentYear) {
    return res
      .status(400)
      .send({
        message: `Only cars from ${
          currentYear - 10
        } to ${currentYear} are allowed.`,
      });
  }

  Car.findByBrandModelYear(brand, model, year, (err, existingCars) => {
    if (err) return res.status(500).send(err);
    if (existingCars.length) {
      return res.status(400).send({ message: "Car already exists." });
    }

    Car.create({ brand, model, year }, (err, result) => {
      if (err) return res.status(500).send(err);

      const carId = result.insertId;

      const uniqueItems = [...new Set(items)];
      const itemQueries = uniqueItems.map((item) => {
        return new Promise((resolve, reject) => {
          CarItem.create({ name: item, car_id: carId }, (err, result) => {
            if (err) return reject(err);
            resolve(result);
          });
        });
      });

      Promise.all(itemQueries)
        .then(() => res.status(201).send({ id: carId }))
        .catch((err) => res.status(500).send(err));
    });
  });
};

exports.getAll = (req, res) => {
  Car.getAll((err, cars) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(cars);
  });
};

exports.getOne = (req, res) => {
  const id = req.params.id;
  Car.findById(id, (err, car) => {
    if (err) return res.status(500).send(err);
    if (!car) return res.status(404).send({ message: "Car not found" });
    res.status(200).send(car);
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { brand, model, year } = req.body;

  if (!brand || !model || !year) {
    return res.status(400).send({ message: "All fields are required." });
  }

  Car.update(id, { brand, model, year }, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0)
      return res.status(404).send({ message: "Car not found" });
    res.status(200).send({ message: "Car updated successfully" });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Car.delete(id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0)
      return res.status(404).send({ message: "Car not found" });
    res.status(200).send({ message: "Car deleted successfully" });
  });
};
