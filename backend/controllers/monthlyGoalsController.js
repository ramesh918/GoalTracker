const MonthlyGoals = require('../models/MonthlyGoals');
const Joi = require('joi');
const monthlyGoalsValidationSchema = require("../validations/monthlyGoalsValidator")
// Validation schema

// Create a new monthly goal
const createMonthlyGoal = async (req, res) => {
  try {
    const { error } = monthlyGoalsValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    req.body.userId = req.user._id
    const monthlyGoal = new MonthlyGoals(req.body);
    await monthlyGoal.save();
    res.json(monthlyGoal);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all monthly goals
const getAllMonthlyGoals = async (req, res) => {
  try {
    const monthlyGoals = await MonthlyGoals.find();
    res.json(monthlyGoals);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a specific monthly goal by ID
const getMonthlyGoalById = async (req, res) => {
  try {
    const monthlyGoal = await MonthlyGoals.findById(req.params.id);
    if (!monthlyGoal) {
      return res.status(404).json({ error: 'Monthly goal not found' });
    }
    res.json(monthlyGoal);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a monthly goal by ID
const updateMonthlyGoalById = async (req, res) => {
  try {
    const { error } = monthlyGoalsValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const monthlyGoal = await MonthlyGoals.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!monthlyGoal) {
      return res.status(404).json({ error: 'Monthly goal not found' });
    }
    res.json(monthlyGoal);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a monthly goal by ID
const deleteMonthlyGoalById = async (req, res) => {
  try {
    const monthlyGoal = await MonthlyGoals.findByIdAndRemove(req.params.id);
    if (!monthlyGoal) {
      return res.status(404).json({ error: 'Monthly goal not found' });
    }
    res.json(monthlyGoal);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getRecordsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const userId = req.user.id;
    console.log(userId, startDate, endDate);
    // Validate input (you may want to add more validation)
    if (!userId || !startDate || !endDate) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
    

    // You can add code to validate the user and date range here

    const records = await MonthlyGoals.find({
      userId: userId,
      startDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }).sort({ startDate: -1 });

    return res.status(200).json(records);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching records" });
  }
};

module.exports = {
  createMonthlyGoal,
  getAllMonthlyGoals,
  getMonthlyGoalById,
  updateMonthlyGoalById,
  deleteMonthlyGoalById,
  getRecordsByDateRange
};
