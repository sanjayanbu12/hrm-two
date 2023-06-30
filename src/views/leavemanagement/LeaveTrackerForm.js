import React, { useState } from 'react';
import { Box, Button, Grid, FormControl, InputLabel, MenuItem, Select, TextField, Card } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const LeaveTrackerForm = () => {
  const navigate = useNavigate();
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numOfDays, setNumOfDays] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('');
  const [file, setFile] = useState(null);

  const handleLeaveType = (event) => {
    setLeaveType(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleNumOfDays = (event) => {
    setNumOfDays(event.target.value);
  };

  const handleReason = (event) => {
    setReason(event.target.value);
  };

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Submit the form data to the LeaveTrackerList module or perform any other desired action
    const formData = {
      leaveType,
      startDate,
      endDate,
      numOfDays,
      reason,
      status,
      file,
    };

    console.log(formData);

    // Navigate to the LeaveTrackerList component
    navigate('/leavetrackerlist');
  };

  return (
    <Card>
      <Box p={2}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="leave-type-label">Leave Type</InputLabel>
                <Select
                  labelId="leave-type-label"
                  id="leave-type-select"
                  value={leaveType}
                  onChange={handleLeaveType}
                  label="Leave Type"
                >
                  <MenuItem value="Casual">Casual</MenuItem>
                  <MenuItem value="Annual">Annual</MenuItem>
                  <MenuItem value="Sick">Sick</MenuItem>
                  <MenuItem value="Maternity">Maternity</MenuItem>
                  <MenuItem value="Paternity">Paternity</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="start-date"
                label="Start Date"
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="end-date"
                label="End Date"
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="num-of-days"
                label="Number of Days"
                type="number"
                value={numOfDays}
                onChange={handleNumOfDays}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="reason"
                label="Reason"
                value={reason}
                onChange={handleReason}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status-select"
                  value={status}
                  onChange={handleStatus}
                  label="Status"
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <input type="file" onChange={handleFileChange} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit">Submit</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Card>
  );
};

export default LeaveTrackerForm;
