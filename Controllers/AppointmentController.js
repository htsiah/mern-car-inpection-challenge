const { v4: uuidv4 } = require('uuid');

const AppointmentModel = require('../Models/AppointmentModel');

const getAppointment = async (req, res, next) => {
  let appointments;
  try {
    appointments = await AppointmentModel.find({}).sort('nm');
  } catch {
    const error = new Error('Failed to get documents.');
    return next(error);
  }

  res.json(appointments.map((appointment) => appointment.toObject({ getters: true })));
};

const createAppointment = async (req, res, next) => {
  const { nm, em, mobno, carbd, dat, tm } = req.body;

  const newAppointment = new AppointmentModel({
    id: uuidv4(),
    nm: nm,
    em: em,
    mobno: mobno,
    carbd: carbd,
    dat: dat,
    tm: tm,
  });

  try {
    newAppointment.save();
  } catch (err) {
    const error = new Error(' Creating document failed.');
    return next(error);
  }

  res.status(201).json(newAppointment);
};

const deleteAppointmentById = async (req, res, next) => {
  const id = req.params.id;

  try {
    await AppointmentModel.findByIdAndDelete(id);
  } catch {
    const error = new Error('Updating document failed.');
    return next(error);
  }

  res.status(200).json({ status: 'success' });
};

exports.getAppointment = getAppointment;
exports.createAppointment = createAppointment;
exports.deleteAppointmentById = deleteAppointmentById;
