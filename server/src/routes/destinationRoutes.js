const express = require('express');
const router = express.Router();
const { getDestinations, getDestinationById } = require('../controllers/destinationController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getDestinations);
router.get('/:id', protect, getDestinationById);

module.exports = router;
