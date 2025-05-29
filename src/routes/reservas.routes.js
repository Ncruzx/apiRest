const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservas.controller');

router.get('/', controller.getReservas);
router.get('/:codigo', controller.getReservaById);
router.post('/', controller.createReserva);
router.put('/:codigo', controller.updateReserva);
router.delete('/:codigo', controller.deleteReserva);

module.exports = router;
