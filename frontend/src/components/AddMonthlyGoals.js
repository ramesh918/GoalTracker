import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import {  useSelector } from "react-redux";

const AddMonthlyGoalsForm = ({ open, onClose, onAddMonthlyGoals }) => {
  const [formData, setFormData] = useState({
    goal: '',
    goalType: '',
    startDate: '',
    targetDate: '',
    completion: '',
  });
  const isAuthenticated = useSelector((state) => state.auth.token);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3333/monthly-goals', formData, {
        headers: {
          Authorization: isAuthenticated, // Replace with actual authentication token
        },
      });

      if (response.status === 200) {
        onAddMonthlyGoals(formData); // Notify parent component about the added goal
        onClose();
        alert('Monthly goal added successfully');
      } else {
        console.error('Error adding monthly goal. Status code: ' + response.status);
      }
    } catch (error) {
      console.error('Error adding monthly goal:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Monthly Goal</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            label="Goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            fullWidth
            required
          />
          <FormControl fullWidth>
            <InputLabel>Goal Type</InputLabel>
            <Select
              name="goalType"
              value={formData.goalType}
              onChange={handleChange}
              fullWidth
              required
            >
              <MenuItem value="Learning">Learning</MenuItem>
              <MenuItem value="Fitness">Fitness</MenuItem>
              {/* Add more options as needed */}
            </Select>
          </FormControl>
          <TextField
            type="date"
            label="Start Date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            type="date"
            label="Target Date"
            name="targetDate"
            value={formData.targetDate}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Completion (%)"
            name="completion"
            value={formData.completion}
            onChange={handleChange}
            fullWidth
            required
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMonthlyGoalsForm;

