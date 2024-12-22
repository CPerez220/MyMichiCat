const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
  qrCode: { type: String, required: false },
});

module.exports = mongoose.model('Profile', profileSchema);