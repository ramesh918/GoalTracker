import React, {useEffect,useState} from 'react';
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
  Tooltip

} from '@mui/material';
import { useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios"
import styles from "./DailyGoalList.module.css"

import UpdateDailyGoalsForm from "./UpdateDailyGoalsForm"
import SuccessModal from './SuccessModel';

const DailyGoalsList = ({ goals, getProductivityData }) => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.token);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [updateData, setUpdateData] = useState({})

  const [successModalOpen, setSuccessModalOpen] = useState(false);


  const getData = async () => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    endDate.setDate(endDate.getDate() + 2);
    const startDateString = startDate.toISOString().split("T")[0];
    const endDateString = endDate.toISOString().split("T")[0];
    await getProductivityData(startDateString, endDateString);
  };

  const openSuccessModal = () => {
    setSuccessModalOpen(true);
  };
  

  useEffect(() => {
    const fetchData = async () => {
      await getData();
      // setLoading(false);
    };
    fetchData();
  }, []);

  const handleEditClick = (item) => {
    setSelectedItemId(item._id);
    setIsEditFormOpen(true);
    setUpdateData(item)
  };

  const handleDeleteClick = (id) => {
    setSelectedItemId(id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      const response = await axios.delete(`http://localhost:3333/daily-goals/${selectedItemId}`, {
        headers: {
          Authorization: isAuthenticated,
        },
      });

      if (response.status === 200) {
        getData();
        openSuccessModal()
      } else {
        console.error("Error deleting record. Status code: " + response.status);
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }

    setDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setSelectedItemId(null);
    setDeleteConfirmationOpen(false);
  };

  return (
    <>
    <SuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        message={`Daily Goal Deleted Successfully!!!`}
      />
    <TableContainer component={Paper} style={{ maxHeight: '500px' }}>
      <Table>
        <TableHead className={styles.tableHeader}>
          <TableRow>
            <TableCell className={styles.tableHeader}>Day of Entry</TableCell>
            <TableCell className={styles.tableHeader}>To-Do List</TableCell>
            <TableCell className={styles.tableHeader}>Check To-Do List</TableCell>
            <TableCell className={styles.tableHeader}>Productivity</TableCell>
            <TableCell className={styles.tableHeader}>Actions</TableCell>
          </TableRow>
        </TableHead>

          <TableBody>
            {goals.map((goal) => (
              <TableRow key={goal._id}>
                <TableCell>{goal.dayOfEntry}</TableCell>
                <TableCell>
                  <ul>
                    {goal.todoList.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <ul>
                    {goal.checkTodoList.map((checked, index) => (
                      <li key={index}>{checked ? 'Done' : 'NotDone'}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>{(goal.productivity).toFixed(2)}%</TableCell>
                <TableCell>
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
                            onClick={() => handleDeleteClick(goal._id)}
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
        <UpdateDailyGoalsForm
          open={isEditFormOpen}
          onClose={() => setIsEditFormOpen(false)}
          getProductivityData={getProductivityData}
          goalData={updateData}
        />
      )}


    </>
  );
};

export default DailyGoalsList;
