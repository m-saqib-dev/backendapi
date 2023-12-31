const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  
  title: String,
  description: String,
  location: String,
  price: Number,
  bedrooms: Number,
  bathrooms: Number,
  area: Number,
  images: [String],
  agent: {
    name: String,
    contact: String,
  },
  features: [String],
});

const Property = mongoose.model('properties', propertySchema);

module.exports = Property;