const express = require('express');
const app = express();

// Import your route files
const user = require('./user');
const dailyGoalsRoutes = require('./dailyGoalsRoutes');





// Use the imported routes
app.use('/user', user);
app.use('/daily-goals', dailyGoalsRoutes);


module.exports = app;
