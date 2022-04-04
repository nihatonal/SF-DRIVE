const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carSchema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: String, required: true },
  plate_number: { type: String, required: true },
  vin_number: { type: String, required: true },
  color: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});


module.exports = mongoose.model('Car', carSchema);