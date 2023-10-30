const express = require('express');
const UpdateMonthlyGoal = require('../models/UpdateMonthlyGoal'); // Replace with the actual path to your model
const updateMonthlyGoalValidation = require('../validations/updateMonthlyGoalValidator'); // Import your Joi validation schema
const monthlyGoals = require("../models/MonthlyGoals")

// Create a new UpdateMonthlyGoal
const create = async (req, res) => {
  try {
    // Validate the request body using Joi
    const { error, value } = updateMonthlyGoalValidation.validate(req.body, { abortEarly: false });
    if (error) {
      // If there are validation errors, send a 400 Bad Request response with the error messages
      return res.status(400).json({ errors: error.details.map((err) => err.message) });
    }
//    let  value = req.body
    value.createdAt = new Date()
    // If the request is valid, create a new UpdateMonthlyGoal
    const newUpdateMonthlyGoal = new UpdateMonthlyGoal(value);
    await newUpdateMonthlyGoal.save();
    const goal = await monthlyGoals.findById(value.goalId);
    goal.completion = value.completion;
    await goal.save();
    res.status(201).json(newUpdateMonthlyGoal);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error });
  }
}

const get = async (req, res) => {
    try {
        const goalId = req.params.goalId;
    
        // Find all updatedMonthlyGoals with the specified goalId, sorted by createdAt in descending order
        const updatedMonthlyGoals = await UpdateMonthlyGoal.find({ goalId: goalId })
          .sort({ createdAt: -1 }) // Sort by createdAt in descending order
          .exec();
    
        res.status(200).json(updatedMonthlyGoals);
      } catch (error) {
        res.status(500).json({ error: 'Server Error' });
      }
  }

// Add more routes and controllers as needed (e.g., updating, deleting, getting data)

const deleteUpdateMonthlyGoal = async (req, res) => {
    try {
      const monthlyGoal = await UpdateMonthlyGoal.findByIdAndRemove(req.params.id);
      if (!monthlyGoal) {
        return res.status(404).json({ error: 'Monthly goal not found' });
      }
      res.json(monthlyGoal);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports = {
    create,
    get,
    deleteUpdateMonthlyGoal
};
