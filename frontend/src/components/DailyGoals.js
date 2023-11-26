import React,{useState, useEffect} from 'react';
import DailyGoalsList from './DailyGoalsList'
import { useSelector } from "react-redux";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import axios from "axios"
import AddDailyGoalsForm from "./AddDailyGoals"
import ChartComponent from './ChartComponent';
const DailyGoalsPage = () => {
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


  const getProductivityData = async (startDate, endDate) => {
    const apiUrl = "http://localhost:3333/daily-goals/records";

    // Make a GET request to fetch data from the API with headers
    axios
      .get(apiUrl, {
        params: {
          startDate: startDate,
          endDate: endDate,
        },
        headers: {
          Authorization: isAuthenticated,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleOpenForm = () => {
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
  };
  const handleAddProductivity = (data) => {
    // Handle the added productivity data here (e.g., update the list)
    console.log("Added productivity data:", data);

    // Close the form modal
    setFormOpen(false);
  };

  
  return (
    <div>
      <h2>DailyGoalsPage</h2>
      <Button variant="outlined" onClick={handleOpenForm}>
        Add Productivity
      </Button>
      <Button variant="outlined" onClick={handleOpenChart} style={{ marginLeft: '10px' }}>
        Show Chart
      </Button>
      <div style={{ margin: '10px 0' }} />
      <DailyGoalsList goals={data} getProductivityData={getProductivityData}/>
      <AddDailyGoalsForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onAddDailyGoals={handleAddProductivity}
        getProductivityData={getProductivityData}
      />
          <Dialog open={isChartOpen} onClose={handleCloseChart} fullWidth maxWidth="md">
        <DialogTitle>Productivity Chart</DialogTitle>
        <DialogContent>
          <ChartComponent data={data} />
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

export default DailyGoalsPage;