const express = require('express');
const weeksController = require('../controllers/weeksController'); // Adjust the path as needed

const router = express.Router();

// Route to get weeks data for a specific year
router.get('/:year', weeksController.getWeeksData);

module.exports = router;
