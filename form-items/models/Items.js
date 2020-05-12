const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Item Schema
const ItemsSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  field: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model('items', ItemsSchema);
