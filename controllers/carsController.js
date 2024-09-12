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
    return res.status(400).send({
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
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 5;

  if (page < 1) page = 1;
  if (limit < 1) limit = 5;

  const offset = (page - 1) * limit;

  Car.countAll((err, count) => {
    if (err) return res.status(500).send(err);

    if (count === 0) return res.status(204).send();

    Car.getAllPaginated(limit, offset, (err, cars) => {
      if (err) return res.status(500).send(err);

      const pages = Math.ceil(count / limit);

      res.status(200).json({
        count: count,
        pages: pages,
        data: cars,
      });
    });
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
  const { brand, model, year, items } = req.body;

  if (!brand || !model || !year) {
    return res.status(400).send({ message: "All fields are required." });
  }

  const currentYear = new Date().getFullYear();
  if (year < currentYear - 10 || year > currentYear) {
    return res.status(400).send({ message: "Car must be within the last 10 years." });
  }

  const uniqueItems = Array.from(new Set(items || []));
  if (items && uniqueItems.length !== items.length) {
    return res.status(400).send({ message: "Items must be unique." });
  }

  const updateFields = { brand, model, year };
  if (items && items.length > 0) {
    updateFields.items = uniqueItems;
  }

  Car.findByAttributes(brand, model, year, (err, existingCar) => {
    if (err) return res.status(500).send(err);
    if (existingCar) {
      return res.status(409).send({ message: "There is already a car with this data" });
    }

    Car.update(id, updateFields, (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Car not found" });
      }
      res.status(204).send(); 
    });
  });
};

exports.delete = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).send({ message: "Invalid ID" });
  }

  Car.deleteItemsByCarId(id, (err) => {
    if (err) return res.status(500).send(err);

    Car.delete(id, (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Car not found" });
      }
      res.status(204).send();
    });
  });
};
