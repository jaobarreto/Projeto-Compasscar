const express = require('express');
const router = express.Router();
const carsController = require('../controllers/carsController');

router.get('/', carsController.getAll);
router.get('/:id', carsController.getOne);
router.post('/', carsController.create);
router.patch('/:id', carsController.update);
router.delete('/:id', carsController.delete);

module.exports = router;
