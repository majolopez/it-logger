const mongoose = require('mongoose');

const TechnitianSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Tech', TechnitianSchema);