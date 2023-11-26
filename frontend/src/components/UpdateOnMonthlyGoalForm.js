import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const UpdateOnMonthlyGoalForm = ({ open, onClose, goal, getMonthlyGoalsData }) => {
  const isAuthenticated = useSelector((state) => state.auth.token);
  const [formData, setFormData] = useState({
    update: '',
    completion: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    // Validate data (you can add more validation logic as needed)
    if (formData.update.trim() === '') {
      alert('Please fill in all fields.');
      setLoading(false);
      return;
    }

    // Construct the payload
    const payload = {
      goalId: goal._id,
      update: formData.update,
      completion: parseInt(formData.completion),
    };

    try {
      const response = await axios.post('http://localhost:3333/update-monthly-goals', payload, {
        headers: {
          Authorization: isAuthenticated,
        },
      });

      setLoading(false);
      alert('Data updated successfully!');
      getMonthlyGoalsData()
      onClose();
    } catch (error) {
      console.error('Error updating data:', error);
      setLoading(false);
      // Display an error alert here if needed
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Goal: {goal.goal}</DialogTitle>
      <DialogContent>
        <TextField
          label="Update"
          name="update"
          value={formData.update}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Completion"
          name="completion"
          value={formData.completion}
          onChange={handleChange}
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateOnMonthlyGoalForm;

