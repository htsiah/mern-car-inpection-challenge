const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const appointmentRouters = require('./Routes/AppointmentRoutes');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use(express.static(path.join('public')));

app.use('/api/appointment', appointmentRouters);

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

mongoose
  .connect(`mongodb://localhost:27017/mern-car-inpection-challenge`, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Db (mern-car-inpection-challenge) connection established.');
    app.listen(80);
    console.log('Listening port 80.');
  })
  .catch((err) => {
    console.log(err);
  });