const DailyGoals = require('../models/DailyGoals'); // Adjust the path as needed
const {dailyGoalsSchema} = require("../validations/dailyGoalsValidator")
const calculateProductivity = (checkTodoList)=>{

    const total = checkTodoList.length;
    const done = checkTodoList.filter((obj)=> obj === true)
    if(done.length === 0) return 0
    return (done.length/total) * 100
}
// Create a new Daily Goal
const createDailyGoal = async (req, res) => {
  try {

    const { error } = dailyGoalsSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { dayOfEntry, todoList, checkTodoList } = req.body;
    const userId = req.user._id
    const productivity = calculateProductivity(checkTodoList)
    const dailyGoal = new DailyGoals({
      dayOfEntry,
      todoList,
      checkTodoList,
      productivity,
      userId,
    });

    const savedGoal = await dailyGoal.save();
    res.status(201).json(savedGoal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all Daily Goals
const getAllDailyGoals = async (req, res) => {
  try {
    const dailyGoals = await DailyGoals.find();
    res.json(dailyGoals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific Daily Goal by ID
const getDailyGoalById = async (req, res) => {
  try {
    const dailyGoal = await DailyGoals.findById(req.params.id);
    if (!dailyGoal) {
      return res.status(404).json({ error: 'Daily Goal not found' });
    }
    res.json(dailyGoal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a Daily Goal by ID
const updateDailyGoal = async (req, res) => {
  try {
    const { error } = dailyGoalsSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { dayOfEntry, todoList, checkTodoList } = req.body;
    const productivity = calculateProductivity(checkTodoList)
    const updatedGoal = await DailyGoals.findByIdAndUpdate(
      req.params.id,
      {
        dayOfEntry,
        todoList,
        checkTodoList,
        productivity,
      },
      { new: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({ error: 'Daily Goal not found' });
    }
    res.json(updatedGoal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a Daily Goal by ID
const deleteDailyGoal = async (req, res) => {
  try {
    const deletedGoal = await DailyGoals.findByIdAndRemove(req.params.id);
    if (!deletedGoal) {
      return res.status(404).json({ error: 'Daily Goal not found' });
    }
    res.json({message: "Goals Deleted Successfully"});
  } catch (err) {
    res.status(500).json({ error: err.message });
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
  
      const records = await DailyGoals.find({
        userId: userId,
        dayOfEntry: { $gte: new Date(startDate), $lte: new Date(endDate) },
      }).sort({ dayOfEntry: -1 });
  
      return res.status(200).json(records);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error fetching records" });
    }
  };

module.exports = {
  createDailyGoal,
  getAllDailyGoals,
  getDailyGoalById,
  updateDailyGoal,
  deleteDailyGoal,
  getRecordsByDateRange
};
