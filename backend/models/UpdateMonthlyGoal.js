const mongoose = require('mongoose');
// Define the UpdateMonthlyGoal schema
const updateMonthlyGoalSchema = new mongoose.Schema({
  goalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MonthlyGoals', // This should match the model name of MonthlyGoals
    required: true
  },
  update: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date, // Assuming you want to store the date of entry
    required: true
  },
  completion: {
    type: Number,
    required: true
  }
});

const UpdateMonthlyGoal = mongoose.model('UpdateMonthlyGoal', updateMonthlyGoalSchema);

module.exports = UpdateMonthlyGoal;
