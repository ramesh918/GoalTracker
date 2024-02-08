const WeeksInYear = require('../models/WeeksInYear'); // Adjust the path as needed

// Controller function to get weeks data for a specific year
exports.getWeeksData = async (req, res) => {
  const { year } = req.params;

  try {
    const weeksData = await WeeksInYear.findOne({ year }).lean();

    if (!weeksData) {
      return res.status(404).json({ error: 'No data found for the specified year.' });
    }

    return res.json(weeksData);
  } catch (error) {
    console.error('Error fetching weeks data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
