const express = require('express');
const router = express.Router();
const controller = require('../controllers/habitaciones.controller');

router.get('/', controller.getHabitaciones);
router.get('/:codigo', controller.getHabitacionById);
router.post('/', controller.createHabitacion);
router.put('/:codigo', controller.updateHabitacion);
router.delete('/:codigo', controller.deleteHabitacion);

module.exports = router;
