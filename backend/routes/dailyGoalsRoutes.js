const express = require('express');
const router = express.Router();
const dailyGoalsController = require('../controllers/dailyGoalsController');
const authenticate = require("../middleware/authMiddleware")


// Create a new Daily Goal
router.post('/', authenticate, dailyGoalsController.createDailyGoal);

router.get('/records', authenticate, dailyGoalsController.getRecordsByDateRange);
// Get all Daily Goals
router.get('/', authenticate, dailyGoalsController.getAllDailyGoals);

// Get a specific Daily Goal by ID
router.get('/:id', authenticate, dailyGoalsController.getDailyGoalById);

// Update a Daily Goal by ID
router.put('/:id', authenticate,  dailyGoalsController.updateDailyGoal);

// Delete a Daily Goal by ID
router.delete('/:id',authenticate,  dailyGoalsController.deleteDailyGoal);



module.exports = router;
