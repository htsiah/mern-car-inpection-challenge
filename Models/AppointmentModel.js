const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  nm: { type: String },
  em: { type: String },
  mobno: { type: String },
  carbd: { type: String },
  dat: { type: Date },
  tm: { type: String },
});

module.exports = mongoose.model('appointment', appointmentSchema);
