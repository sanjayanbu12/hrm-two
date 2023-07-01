import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
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
  const [document, setDocument] = useState(null);
  const [errors, setErrors] = useState({});

  const handleLeaveType = (event) => {
    setLeaveType(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    validateNumberOfDays(startDate, event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    validateNumberOfDays(startDate, event.target.value);
  };

  const handleNumberOfDays = (event) => {
    const days = parseInt(event.target.value);
    setNumberOfDays(days);
  };

  const handleReason = (event) => {
    setReason(event.target.value);
  };

  const handleFileChange = (event) => {
    setDocument(event.target.files[0]);
  };

  const validateNumberOfDays = (start, end) => {
    if (start && end) {
      const startDateObj = new Date(start);
      const endDateObj = new Date(end);
      const timeDiff = endDateObj.getTime() - startDateObj.getTime();
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setNumberOfDays(diffDays);
    }
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

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
        leaveType,
        startDate,
        endDate,
        numberOfDays,
        reason,
        document,
      };

      try {
        await axios.post('https://hrm-backend-square.onrender.com/api/leave', formData);
        setLeaveType('');
        setStartDate('');
        setEndDate('');
        setNumberOfDays('');
        setReason('');
        setDocument('');
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
            <Grid item xs={12} sm={6}>
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
            <Grid  item xs={12} sm={6}>
              <input
                accept="application/pdf"
                id="document"
                type="file"
                onChange={handleFileChange}
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