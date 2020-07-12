const express = require('express');

const AppointmentController = require('../Controllers/AppointmentController');

const router = express.Router();

router.get('/', AppointmentController.getAppointment);
router.post('/', AppointmentController.createAppointment);
router.delete('/:id', AppointmentController.deleteAppointmentById);

module.exports = router;
