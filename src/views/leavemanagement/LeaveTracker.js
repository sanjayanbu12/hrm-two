import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

const LeaveTracker = () => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaves, setLeaves] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleAddLeave = () => {
    const newLeave = {
      name,
      startDate,
      endDate
    };

    setLeaves((prevLeaves) => [...prevLeaves, newLeave]);
    setName('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label=""
            variant="outlined"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label=""
            variant="outlined"
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleAddLeave}>
            Add Leave
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaves.map((leave, index) => (
              <TableRow key={index}>
                <TableCell>{leave.name}</TableCell>
                <TableCell>{leave.startDate}</TableCell>
                <TableCell>{leave.endDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LeaveTracker;
