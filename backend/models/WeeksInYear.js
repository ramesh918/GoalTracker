const mongoose = require('mongoose');

// Define the schema
const weeksInYearSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  weeks: {
    type: [{
      weekNumber: {
        type: Number,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
    }],
    required: true,
  },
});

// Create the model
const WeeksInYear = mongoose.model('WeeksInYear', weeksInYearSchema);

// Export the model
module.exports = WeeksInYear;
