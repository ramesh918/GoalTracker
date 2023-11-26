import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
} from '@mui/material';
import { useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import axios from "axios"
import styles from "./MonthlyGoalList.module.css"


import UpdateOnMonthlyGoalForm from "./UpdateOnMonthlyGoalForm"
import ListOfUpdateOnMonthlyGoal from "./ListOfUpdateOnMonthlyGoal"

const MonthlyGoalsList = ({ goals, getMonthlyGoalsData }) => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.token);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isDetailedFormOpen, setIsDetailedFormOpen] = useState(false);
  const [updateData, setUpdateData] = useState({});

  // Add any additional state or logic specific to monthly goals here

  const handleEditClick = (item) => {
    setSelectedItemId(item._id);
    setSelectedItem(item)
    setIsEditFormOpen(true);
    setUpdateData(item);
  };

  const handleDetailsClick = (id)=>{
    setIsDetailedFormOpen(true)
    setSelectedItemId(id)
  }

  const handleDeleteClick = (id) => {
    setSelectedItemId(id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      const response = await axios.delete(`http://localhost:3333/monthly-goals/${selectedItemId}`, {
        headers: {
          Authorization: isAuthenticated,
        },
      });

      if (response.status === 200) {
        // Handle successful delete
        alert("Record deleted successfully");
        getMonthlyGoalsData()
      } else {
        console.error("Error deleting record. Status code: " + response.status);
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }

    setDeleteConfirmationOpen(false);
    // Add logic to refresh the list of monthly goals after deletion
  };

  const handleCancelDelete = () => {
    setSelectedItemId(null);
    setDeleteConfirmationOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper} style={{ maxHeight: '500px' }}>
        <Table>
          <TableHead className={styles.tableHeader}>
            <TableRow>
              <TableCell className={styles.tableHeader}>Goal</TableCell>
              <TableCell className={styles.tableHeader}>Goal Type</TableCell>
              <TableCell className={styles.tableHeader}>Start Date</TableCell>
              <TableCell className={styles.tableHeader}>Target Date</TableCell>
              <TableCell className={styles.tableHeader}>Completion</TableCell>
              <TableCell className={styles.tableHeader}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {goals.map((goal) => (
              <TableRow key={goal._id}>
                <TableCell>{goal.goal}</TableCell>
                <TableCell>{goal.goalType}</TableCell>
                <TableCell>{goal.startDate}</TableCell>
                <TableCell>{goal.targetDate}</TableCell>
                <TableCell>{goal.completion}%</TableCell>
                <TableCell>
                    


                    <Tooltip title="GoalDetails">
                    <IconButton
                      aria-label="GoalDetails"
                      onClick={() => handleDetailsClick(goal._id)}
                      color="GoalDetails"
                    >
                      <ArticleIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Edit">
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditClick(goal)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>


                  <Tooltip title="Delete">
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteClick(goal)}
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteConfirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmation} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {isEditFormOpen && (
        <UpdateOnMonthlyGoalForm
          open={isEditFormOpen}
          onClose={() => setIsEditFormOpen(false)}
          goal={selectedItem}
          getMonthlyGoalsData = {getMonthlyGoalsData}
        />
      )}
      {
        isDetailedFormOpen && (
          <ListOfUpdateOnMonthlyGoal
          open={isDetailedFormOpen}
          onClose={() => setIsDetailedFormOpen(false)}
          goal_id={selectedItemId}
          />
        )
      }
    </>
  );
};

export default MonthlyGoalsList;
