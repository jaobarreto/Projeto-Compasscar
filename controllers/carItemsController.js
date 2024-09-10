const CarItem = require("../models/carItem.js");

exports.create = (req, res) => {
  CarItem.create(req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ id: result.insertId, ...req.body });
  });
};

exports.findAll = (req, res) => {
  CarItem.findAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(results);
  });
};

exports.findByCarId = (req, res) => {
  CarItem.findByCarId(req.params.car_id, (err, results) => {
    if (err) return res.stauts(500).send(err);
    res.status(200).send(results);
  });
};

exports.update = (req, res) => {
  CarItem.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.status(204).send();
  });
};

exports.delete = (req, res) => {
  CarItem.delete(req.params.id, (err) => {
    if (err) return res.status(500).send(err);
    res.status(204).send;
  });
};
