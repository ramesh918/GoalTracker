const express = require('express');
const router = express.Router();
const monthlyGoalsController = require('../controllers/monthlyGoalsController');
const authenticate = require("../middleware/authMiddleware")

// Create a new monthly goal
router.post('/',authenticate, monthlyGoalsController.createMonthlyGoal);

// Get all monthly goals
router.get('/', authenticate, monthlyGoalsController.getAllMonthlyGoals);
router.get('/records', authenticate, monthlyGoalsController.getRecordsByDateRange);



// Get a specific monthly goal by ID
router.get('/:id', authenticate, monthlyGoalsController.getMonthlyGoalById);

// Update a monthly goal by ID
router.put('/:id',authenticate, monthlyGoalsController.updateMonthlyGoalById);

// Delete a monthly goal by ID
router.delete('/:id', authenticate, monthlyGoalsController.deleteMonthlyGoalById);

module.exports = router;
