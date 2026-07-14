const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a destination name'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
    trim: true
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL']
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  description: {
    type: String,
    required: [true, 'Please provide a short description'],
    trim: true
  },
  detailedDescription: {
    type: String,
    trim: true
  },
  highlights: {
    type: [String]
  },
  bestTimeToVisit: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Destination', destinationSchema);
