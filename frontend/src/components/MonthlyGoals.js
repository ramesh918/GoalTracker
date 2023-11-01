import React, { useState, useEffect } from 'react';
import MonthlyGoalsList from './MonthlyGoalsList'; // You'll need to create this component
import { useSelector } from 'react-redux';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import AddMonthlyGoalsForm from './AddMonthlyGoals'; // You'll need to create this form component
import ChartComponentMonthGoals from './ChartComponentMonthGoals';

const MonthlyGoalsPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.token);
  const [data, setData] = useState([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isChartOpen, setChartOpen] = useState(false);

  const handleOpenChart = () => {
    setChartOpen(true);
  };

  const handleCloseChart = () => {
    setChartOpen(false);
  };

  const getMonthlyGoalsData = async () => {
    const apiUrl = 'http://localhost:3333/monthly-goals'; // Replace with your API endpoint for monthly goals

    // Make a GET request to fetch data from the API with headers
    axios
      .get(apiUrl, {
        headers: {
          Authorization: isAuthenticated,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleOpenForm = () => {
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
  };

  const handleAddMonthlyGoals = (data) => {
    // Handle the added monthly goals data here (e.g., update the list)
    console.log('Added monthly goals data:', data);

    // Close the form modal
    setFormOpen(false);
  };

  useEffect(() => {
    getMonthlyGoalsData();
  }, [isFormOpen]); // You might want to refresh data when a new goal is added

  return (
    <div>
      <h2>Monthly Goals Page</h2>
      <Button variant="outlined" onClick={handleOpenForm}>
        Add Monthly Goal
      </Button>
      <Button variant="outlined" onClick={handleOpenChart}>
        Show Chart
      </Button>
      <MonthlyGoalsList goals={data} getMonthlyGoalsData={getMonthlyGoalsData}/>, {/* You'll need to create this component */}
      <AddMonthlyGoalsForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onAddMonthlyGoals={handleAddMonthlyGoals}
      /> {/* You'll need to create this form component */}
      <Dialog open={isChartOpen} onClose={handleCloseChart} fullWidth maxWidth="md">
        <DialogTitle>Monthly Goals Chart</DialogTitle>
        <DialogContent>
          <ChartComponentMonthGoals data={data} /> {/* You'll need to create this chart component */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChart} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MonthlyGoalsPage;
