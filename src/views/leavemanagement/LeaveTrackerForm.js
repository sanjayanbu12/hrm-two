import React, { useState } from 'react';
import { Box, Button, Grid, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';

const LeaveTrackerForm = () => {
  const navigate = useNavigate();
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('');
  const [document, setDocument] = useState(null);

  const handleLeaveType = (event) => {
    setLeaveType(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleNumberOfDays = (event) => {
    setNumberOfDays(event.target.value);
  };

  const handleReason = (event) => {
    setReason(event.target.value);
  };

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleFileChange = (event) => {
    setDocument(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create form data object
    const formData = {
      leaveType,
      startDate,
      endDate,
      numberOfDays,
      reason,
      status,
      document,
    };

    try {
      await axios.post('https://hrm-backend-square.onrender.com/api/leave', formData);
      setLeaveType('');
      setStartDate('');
      setEndDate('');
      setNumberOfDays('');
      setReason('');
      setStatus('');
      setDocument('');
      navigate('/leavetrackerlist');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <MainCard title="LeaveTrackerForm">
      <form onSubmit={handleSubmit}>
        <Box p={2}>
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
                id="number-of-days"
                label="Number of Days"
                type="number"
                value={numberOfDays}
                onChange={handleNumberOfDays}
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
              <TextField
                fullWidth
                id="reason"
                label="Reason"
                multiline
                rows={4}
                value={reason}
                onChange={handleReason}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="application/pdf"
                id="document"
                type="file"
                onChange={handleFileChange}
              />
            </Grid>
          </Grid>
        </Box>
        <Box p={2} display="flex" justifyContent="flex-end">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </MainCard>
  );
};

export default LeaveTrackerForm;
