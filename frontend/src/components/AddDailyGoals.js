import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"; // Import a suitable DateTimePicker component
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import SuccessModal from "./SuccessModel";

const AddDailyGoalsForm = ({
  open,
  onClose,
  onAddDailyGoals,
  getProductivityData,
}) => {
  const isAuthenticated = useSelector((state) => state.auth.token);

  const [dateOfEntry, setDateOfEntry] = useState(new Date());
  const [todoList, setTodoList] = useState([""]);
  const [checkTodoList, setCheckTodoList] = useState([false]);
  const [loading, setLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const handleAddTodo = () => {
    setTodoList([...todoList, ""]);
    setCheckTodoList([...checkTodoList, false]);
  };

  const handleRemoveTodo = (index) => {
    const updatedTodoList = [...todoList];
    const updatedCheckTodoList = [...checkTodoList];
    updatedTodoList.splice(index, 1);
    updatedCheckTodoList.splice(index, 1);
    setTodoList(updatedTodoList);
    setCheckTodoList(updatedCheckTodoList);
  };

  const openSuccessModal = () => {
    setSuccessModalOpen(true);
  };
  const handleSubmit = async () => {
    setLoading(true);

    // Validate data (you can add more validation logic as needed)

    if (todoList.some((todo) => todo.trim() === "")) {
      alert("Please fill in all fields.");
      setLoading(false);
      return;
    }

    // Construct the payload
    const payload = {
      dayOfEntry: dateOfEntry.toISOString(),
      todoList,
      checkTodoList,
    };

    // Make a network call to add daily goals data (replace with your actual API URL)
    try {
      const response = await axios.post(
        "http://localhost:3333/daily-goals",
        payload,
        {
          headers: {
            Authorization: isAuthenticated, // Replace with your actual authorization token
          },
        }
      );

      const endDate = new Date(); // Current date
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      endDate.setDate(endDate.getDate() + 2);
      // One week ago
      const startDateString = startDate.toISOString().split("T")[0];
      const endDateString = endDate.toISOString().split("T")[0];
      await getProductivityData(startDateString, endDateString);
      onAddDailyGoals(payload);
      setLoading(false);

      // Display a success message upon successful addition
      openSuccessModal()// Customize the alert as needed
    } catch (error) {
      console.error("Error adding daily goals data:", error);
      setLoading(false);
      // You can also display an error alert here if needed
    }
  };

  return (
    <>
    <SuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        message={`Daily Goals Created Successfully!!!`}
      />
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Daily Goals</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                label="Date and Time"
                value={dateOfEntry}
                onChange={(newDate) => setDateOfEntry(newDate)}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" fullWidth />
                )}
              />
            </DemoContainer>
          </LocalizationProvider>

          {todoList.map((todo, index) => (
            <Grid container spacing={2} alignItems="center" key={index}>
              <Grid item xs={5}>
                <TextField
                  label="To-Do"
                  fullWidth
                  variant="outlined"
                  value={todo}
                  onChange={(e) => {
                    const updatedTodoList = [...todoList];
                    updatedTodoList[index] = e.target.value;
                    setTodoList(updatedTodoList);
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <label>Complete?</label>
                <input
                  type="checkbox"
                  checked={checkTodoList[index]}
                  onChange={() => {
                    const updatedCheckTodoList = [...checkTodoList];
                    updatedCheckTodoList[index] = !checkTodoList[index];
                    setCheckTodoList(updatedCheckTodoList);
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  onClick={() => handleRemoveTodo(index)}
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button variant="outlined" onClick={handleAddTodo}>
            Add To-Do
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={loading}>
            {loading ? "Adding..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
      
    </>
  );
};

export default AddDailyGoalsForm;
