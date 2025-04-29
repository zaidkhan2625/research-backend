const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: String,
  industry: String,
  location: String,
  email: { type: String, unique: true },
  phone: String,
});

module.exports = mongoose.model('Company', companySchema);
