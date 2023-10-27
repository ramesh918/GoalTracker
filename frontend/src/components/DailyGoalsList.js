import React from 'react';
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

} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DailyGoalsList = ({ goals }) => {
  return (
    <TableContainer component={Paper} style={{ maxHeight: '400px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Day of Entry</TableCell>
            <TableCell>To-Do List</TableCell>
            <TableCell>Check To-Do List</TableCell>
            <TableCell>Productivity</TableCell>
            <TableCell>Actions</TableCell>
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
                      <li key={index}>{checked ? 'Checked' : 'Unchecked'}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>{goal.productivity}%</TableCell>
                <TableCell>
                  <IconButton  color="primary" component="span"><EditIcon />
                  </IconButton>
                  <IconButton color="secondary" aria-label="Delete" component="span">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        
      </Table>
    </TableContainer>
  );
};

export default DailyGoalsList;
