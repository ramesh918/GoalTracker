const mongoose = require('mongoose');

const dailyGoalsSchema = new mongoose.Schema({
  dayOfEntry: {
    type: Date, // Assuming you want to store the date of entry
    required: true
  },
  todoList: {
    type: [String], // Assuming it's an array of strings
    default: []
  },
  checkTodoList: {
    type: [Boolean], // Assuming it's an array of booleans to represent checked or unchecked items
    default: []
  },
  productivity: {
    type: Number, // You can choose the appropriate data type for productivity
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming you want to link it to a user
    ref: 'User', // Replace 'User' with the actual model name for users
    required: true
  }
});

const DailyGoals = mongoose.model('DailyGoals', dailyGoalsSchema);

module.exports = DailyGoals;
