
import React, { useState } from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';

const LeaveTrackerForm = () => {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState({});

  const handleLeaveType = (event) => {
    setLeaveType(event.target.value);
  };

  const handleStartDateChange = (event) => {
    const selectedStartDate = event.target.value;

    // Check if selected start date is a previous date
    const currentDate = DateTime.now().toISODate();
    if (selectedStartDate < currentDate) {
      setErrors((prevErrors) => ({ ...prevErrors, startDate: 'Start date cannot be a previous date' }));
    } else {
      // Clear the error if the start date is valid
      setErrors((prevErrors) => ({ ...prevErrors, startDate: undefined }));
    }

    setStartDate(selectedStartDate);
    validateNumberOfDays(selectedStartDate, endDate);
  };

  const handleEndDateChange = (event) => {
    const selectedEndDate = event.target.value;

    // Check if selected end date is before the start date
    if (selectedEndDate < startDate) {
      setErrors((prevErrors) => ({ ...prevErrors, endDate: 'End date cannot be before the start date' }));
    } else {
      // Clear the error if the end date is valid
      setErrors((prevErrors) => ({ ...prevErrors, endDate: undefined }));
    }

    setEndDate(selectedEndDate);
    validateNumberOfDays(startDate, selectedEndDate);
  };

  const handleNumberOfDays = (event) => {
    const days = parseInt(event.target.value);
    setNumberOfDays(days);
  };

  const handleReason = (event) => {
    setReason(event.target.value);
  };

  const validateNumberOfDays = (start, end) => {
    if (start && end) {
      const startDateObj = DateTime.fromISO(start);
      const endDateObj = DateTime.fromISO(end);
      const diffDays = endDateObj.diff(startDateObj, 'days').days + 1;
      setNumberOfDays(diffDays);
    }
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Validate employee ID
    if (!employeeId) {
      formErrors.employeeId = 'Employee ID is required';
      isValid = false;
    }

    // Validate employee name
    if (!employeeName) {
      formErrors.employeeName = 'Employee name is required';
      isValid = false;
    }

    // Validate leave type
    if (!leaveType) {
      formErrors.leaveType = 'Leave type is required';
      isValid = false;
    }

    // Validate start date
    if (!startDate) {
      formErrors.startDate = 'Start date is required';
      isValid = false;
    }

    // Validate end date
    if (!endDate) {
      formErrors.endDate = 'End date is required';
      isValid = false;
    }

    // Validate number of days
    if (!numberOfDays) {
      formErrors.numberOfDays = 'Number of days is required';
      isValid = false;
    } else if (numberOfDays <= 0) {
      formErrors.numberOfDays = 'Number of days must be greater than 0';
      isValid = false;
    }

    // Validate reason
    if (!reason) {
      formErrors.reason = 'Reason is required';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form
    const isValid = validateForm();

    if (isValid) {
      // Create form data object
      const formData = {
        employeeId,
        employeeName,
        leaveType,
        startDate,
        endDate,
        numberOfDays,
        reason,
      };

      try {
        await axios.post('https://hrm-backend-square.onrender.com/api/leave/', formData);
        setEmployeeId('');
        setEmployeeName('');
        setLeaveType('');
        setStartDate('');
        setEndDate('');
        setNumberOfDays('');
        setReason('');
        setErrors({});
        navigate('/leavetrackerlist');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <MainCard title="LeaveTrackerForm">
      <form onSubmit={handleSubmit}>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="employee-id"
                label="Employee ID"
                value={employeeId}
                onChange={(event) => setEmployeeId(event.target.value)}
                error={errors.employeeId !== undefined}
                helperText={errors.employeeId}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="employee-name"
                label="Employee Name"
                value={employeeName}
                onChange={(event) => setEmployeeName(event.target.value)}
                error={errors.employeeName !== undefined}
                helperText={errors.employeeName}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={errors.leaveType !== undefined}>
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
                {errors.leaveType && (
                  <Box component="span" sx={{ color: 'red' }}>
                    {errors.leaveType}
                  </Box>
                )}
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
                error={errors.startDate !== undefined}
                helperText={errors.startDate}
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
                error={errors.endDate !== undefined}
                helperText={errors.endDate}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                id="number-of-days"
                label="Number of Days"
                type="number"
                value={numberOfDays}
                onChange={handleNumberOfDays}
                error={errors.numberOfDays !== undefined}
                helperText={errors.numberOfDays}
              />
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
                error={errors.reason !== undefined}
                helperText={errors.reason}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </MainCard>
  );
};

export default LeaveTrackerForm;

