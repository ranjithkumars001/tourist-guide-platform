const Trip = require('../models/Trip');

// @desc    Get all user trips
// @route   GET /api/trips
// @access  Private
const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id }).sort({ startDate: 1 });
    res.json({
      success: true,
      data: trips
    });
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while retrieving trips'
    });
  }
};

// @desc    Get a single trip by ID
// @route   GET /api/trips/:id
// @access  Private
const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user.id });
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }
    res.json({
      success: true,
      data: trip
    });
  } catch (error) {
    console.error('Error fetching trip details:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while retrieving trip details'
    });
  }
};

// @desc    Create a new trip
// @route   POST /api/trips
// @access  Private
const createTrip = async (req, res) => {
  const { name, destination, startDate, endDate } = req.body;

  if (!name || !destination || !startDate || !endDate) {
    return res.status(400).json({
      success: false,
      message: 'Please fill in all fields'
    });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).json({
      success: false,
      message: 'Please provide valid dates'
    });
  }

  if (end < start) {
    return res.status(400).json({
      success: false,
      message: 'End date cannot be before start date'
    });
  }

  try {
    const trip = await Trip.create({
      name,
      destination,
      startDate: start,
      endDate: end,
      user: req.user.id
    });

    res.status(201).json({
      success: true,
      data: trip
    });
  } catch (error) {
    console.error('Error creating trip:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during trip creation'
    });
  }
};

// @desc    Update a trip
// @route   PUT /api/trips/:id
// @access  Private
const updateTrip = async (req, res) => {
  const { name, destination, startDate, endDate } = req.body;

  if (!name || !destination || !startDate || !endDate) {
    return res.status(400).json({
      success: false,
      message: 'Please fill in all fields'
    });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).json({
      success: false,
      message: 'Please provide valid dates'
    });
  }

  if (end < start) {
    return res.status(400).json({
      success: false,
      message: 'End date cannot be before start date'
    });
  }

  try {
    let trip = await Trip.findOne({ _id: req.params.id, user: req.user.id });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    trip.name = name;
    trip.destination = destination;
    trip.startDate = start;
    trip.endDate = end;

    await trip.save();

    res.json({
      success: true,
      data: trip
    });
  } catch (error) {
    console.error('Error updating trip:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error during trip modification'
    });
  }
};

// @desc    Delete a trip
// @route   DELETE /api/trips/:id
// @access  Private
const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    res.json({
      success: true,
      message: 'Trip deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting trip:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error during trip deletion'
    });
  }
};

module.exports = {
  getTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip
};
