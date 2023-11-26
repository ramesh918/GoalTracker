import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector} from "react-redux"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const ListOfUpdateOnMonthlyGoal = ({ goal_id, open, onClose }) => {
  const [updateList, setUpdateList] = useState([]);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3333/update-monthly-goals/${goal_id}`, {
          headers: {
            Authorization: isAuthenticated,
          },
        });
        setUpdateList(response.data); // Assuming the API response is an array of update records
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        // Display an error message or handle error state
      }
    };

    if (open) {
      fetchData();
    }
  }, [goal_id, open, isAuthenticated]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>List of Updates for Goal: {goal_id}</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table aria-label="list-of-updates">
            <TableHead>
              <TableRow>
                <TableCell>Update</TableCell>
                <TableCell align="right">Completion</TableCell>
                {/* Add more table header cells if needed */}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={2}>Loading...</TableCell>
                </TableRow>
              ) : updateList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2}>No updates available</TableCell>
                </TableRow>
              ) : (
                updateList.map((update, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {update.update}
                    </TableCell>
                    <TableCell align="right">{update.completion}</TableCell>
                    {/* Render additional cells for other data */}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ListOfUpdateOnMonthlyGoal;
