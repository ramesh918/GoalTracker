const mongoose = require('mongoose');
const WeeksInYear = require('../models/WeeksInYear');
const mongoConnection = require("../db")
// Sample data for the year 2024 with all 53 weeks
const {generateWeeksData} = require("./generateWeeksDataForYear")

// Function to seed data into MongoDB
async function seedData() {
  try {
    await mongoConnection()
    // Remove existing data for the year 2024
    await WeeksInYear.deleteMany({ year: 2024 });

    const dataFor2024 = {
        year: 2024,
        weeks: generateWeeksData(2024),
      };
    // Insert the new data
    await WeeksInYear.create(dataFor2024);

    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
}

// Run the seeder
seedData();
