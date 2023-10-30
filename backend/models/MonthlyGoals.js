const mongoose = require('mongoose');

const monthlyGoalsSchema = new mongoose.Schema({
  goal: {
    type: String,
    required: true,
  },
  goalType: {
    type: String, // You can use an enum here, but I'll use String for simplicity.
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  targetDate: {
    type: Date,
    required: true,
  },
  completion: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model, assuming you have a User model.
    required: true,
  },
});

const MonthlyGoals = mongoose.model('MonthlyGoals', monthlyGoalsSchema);

module.exports = MonthlyGoals;
