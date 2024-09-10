const express = require("express");
const router = express.Router();
const carsController = require("../controllers/carsController.js");

router.post("/", carsController.create);
router.get("/", carsController.findAll);
router.get("/:id", carsController.findById);
router.put("/:id", carsController.update);
router.delete("/:id", carsController.delete);

module.exports = router;
