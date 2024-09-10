const Car = require("../models/car.js");

exports.create = (req, res) => {
  Car.create(req.body, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ id: result.insertId, ...req.body });
  });
};

exports.findAll = (req, res) => {
  Car.findAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(results);
  });
};

exports.findById = (req, res) => {
  Car.findById(req.params.id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (!result.length)
      return res.status(404).send({ message: "Car not found" });
  });
};

exports.update = (req, res) => {
  Car.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.status(204).send();
  });
};

exports.delete = (req, res) => {
  Car.delete(req.params.id, (err) => {
    if (err) return res.status(500).send(err);
    res.status(204).send();
  });
};
