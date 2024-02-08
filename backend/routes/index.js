const express = require('express');
const app = express();

// Import your route files
const user = require('./user');
const dailyGoalsRoutes = require('./dailyGoalsRoutes');
const monthlyGoalsRoutes = require("./monthlyGoalsRoute")
const updateMonthlyGoalsRoutes = require("./updateMonthlyGoals")
const weeksInYearRouter = require("./weeksInYearRoute")





// Use the imported routes
app.use('/user', user);
app.use('/daily-goals', dailyGoalsRoutes);
app.use('/monthly-goals', monthlyGoalsRoutes);
app.use('/update-monthly-goals', updateMonthlyGoalsRoutes);
app.use('/weeks', weeksInYearRouter);


module.exports = app;
