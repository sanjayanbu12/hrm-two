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

const AttendanceTracker = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [attendance, setAttendance] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleAddAttendance = () => {
    const newAttendance = {
      name,
      date
    };

    setAttendance((prevAttendance) => [...prevAttendance, newAttendance]);
    setName('');
    setDate('');
  };

  return (
    <div>
      <h1>Attendance Tracker</h1>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label=""
            variant="outlined"
            type="date"
            value={date}
            onChange={handleDateChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleAddAttendance}>
            Add Attendance
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.name}</TableCell>
                <TableCell>{entry.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AttendanceTracker;
