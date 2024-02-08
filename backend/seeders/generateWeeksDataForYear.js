// Function to check if a year is a leap year
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }
  
  // Function to generate data for all 53 weeks, considering leap years
  function generateWeeksData(year) {
    const weeksData = [];
    const isLeap = isLeapYear(year);
  
    let startDate = new Date(`${year}-01-01`);
  
    for (let weekNumber = 1; weekNumber <= 53; weekNumber++) {
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
  
      // If the end date goes beyond the year, adjust it to the last day of the year
      if (endDate.getFullYear() > year) {
        endDate.setFullYear(year, 11, 31);
      }
  
      weeksData.push({
        weekNumber,
        startDate: new Date(startDate),
        endDate,
      });
  
      startDate.setDate(endDate.getDate() + 1);
    }
  
    return weeksData;
  }
  
  module.exports = { generateWeeksData, isLeapYear };
  