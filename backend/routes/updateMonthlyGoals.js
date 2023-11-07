const express = require('express');
const router = express.Router();
const updateMonthlyGoalController = require('../controllers/updateMonthlyGoalController');
const authenticate = require("../middleware/authMiddleware")

// Create a new monthly goal
router.post('/',authenticate, updateMonthlyGoalController.create);

// // Get all monthly goals
router.get('/:goalId', authenticate, updateMonthlyGoalController.get);
// router.get('/records', authenticate, monthlyGoalsController.getRecordsByDateRange);



// // Get a specific monthly goal by ID
// router.get('/:id', authenticate, monthlyGoalsController.getMonthlyGoalById);

// // Update a monthly goal by ID
// router.put('/:id',authenticate, monthlyGoalsController.updateMonthlyGoalById);

// // Delete a monthly goal by ID
router.delete('/:id', authenticate, updateMonthlyGoalController.deleteUpdateMonthlyGoal);

module.exports = router;
