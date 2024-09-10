const express = require("express");
const router = express.Router();
const carItemsController = require("../controllers/carItemsController.js");

router.post("/", carItemsController.create);
router.get("/", carItemsController.findAll);
router.get("/car/:car_id", carItemsController.findByCarId);
router.put("/:id", carItemsController.update);
router.delete("/:id", carItemsController.delete);

module.exports = router;
