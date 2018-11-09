const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  name: {
    type: String,
    unique: false,
    required: true
  },
  hotelName: {
    type: String,
    unique: false,
    required: true
  },
  arrivalDate: {
    type: String,
    unique: false,
    required: true
  },
  departureDate: {
    type: String,
    unique: false,
    required: true
  }
});

module.exports = mongoose.model("Reservation", reservationSchema);