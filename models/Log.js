const mongoose = require('mongoose');

const Logschema = mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  attention: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  tech:{
    type: mongoose.Schema.Types.ObjectId
  },
});

module.exports = mongoose.model('log', Logschema);