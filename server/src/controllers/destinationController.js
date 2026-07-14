const Destination = require('../models/Destination');

// @desc    Get all destinations
// @route   GET /api/destinations
// @access  Private
const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find({});
    res.json({
      success: true,
      data: destinations
    });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while retrieving destinations'
    });
  }
};

// @desc    Get single destination details
// @route   GET /api/destinations/:id
// @access  Private
const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }
    res.json({
      success: true,
      data: destination
    });
  } catch (error) {
    console.error('Error fetching destination by id:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while retrieving destination details'
    });
  }
};

module.exports = {
  getDestinations,
  getDestinationById
};
