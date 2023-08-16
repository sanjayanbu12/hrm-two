import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { DateTime } from 'luxon';
import { useNavigate, useLocation } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';

const LeaveTrackerForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');
  const [reason, setReason] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state) {
      const {
        employeeId,
        employeeName,
        leaveType,
        startDate,
        endDate,
        numberOfDays,
        reason,
      } = location.state;
      setEmployeeId(employeeId);
      setEmployeeName(employeeName);
      setLeaveType(leaveType);
      setStartDate(startDate);
      setEndDate(endDate);
      setNumberOfDays(numberOfDays);
      setReason(reason);
    }
  }, [location.state]);

  const validateNumberDays = () => {
    if (!numberOfDays || numberOfDays <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        numberOfDays: 'Number of days must be greater than 0',
      }));
      return false;
    }
    return true;
  };

  const validateForm = () => {
    const formErrors = {};
    let isValid = true;

    if (!employeeId) {
      formErrors.employeeId = 'Employee ID is required';
      isValid = false;
    }

    if (!employeeName) {
      formErrors.employeeName = 'Employee name is required';
      isValid = false;
    }

    if (!leaveType) {
      formErrors.leaveType = 'Leave type is required';
      isValid = false;
    }

    if (!startDate) {
      formErrors.startDate = 'Start date is required';
      isValid = false;
    }

    if (!endDate) {
      formErrors.endDate = 'End date is required';
      isValid = false;
    }

    if (!validateNumberDays()) {
      isValid = false;
    }

    if (!reason) {
      formErrors.reason = 'Reason is required';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      for (const file of attachments) {
        formData.append('attachments', file);
      }

      try {
        
        const responseAttachments = await axios.post(
          'https://hrm-backend-square.onrender.com/api/upload',
          formData
        );
        console.log('Attachments uploaded:', responseAttachments.data);

        
        const leaveData = {
          employeeId,
          employeeName,
          leaveType,
          startDate,
          endDate,
          numberOfDays,
          reason,
          attachments: responseAttachments.data,
        };

        await axios.post(
          'https://hrm-backend-square.onrender.com/api/leave/',
          leaveData
        );

        
        setEmployeeId('');
        setEmployeeName('');
        setLeaveType('');
        setStartDate('');
        setEndDate('');
        setNumberOfDays('');
        setReason('');
        setAttachments([]);
        setErrors({});
        navigate('/leavetrackerlist');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleLeaveType = (event) => {
    setLeaveType(event.target.value);
  };

  const handleStartDateChange = (event) => {
    const selectedStartDate = event.target.value;

    const currentDate = DateTime.now().toISODate();
    if (selectedStartDate < currentDate) {
      setErrors((prevErrors) => ({ ...prevErrors, startDate: 'Start date cannot be a previous date' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, startDate: undefined }));
    }

    setStartDate(selectedStartDate);
    validateNumberOfDays(selectedStartDate, endDate);
  };

  const handleEndDateChange = (event) => {
    const selectedEndDate = event.target.value;

    if (selectedEndDate < startDate) {
      setErrors((prevErrors) => ({ ...prevErrors, endDate: 'End date cannot be before the start date' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, endDate: undefined }));
    }

    setEndDate(selectedEndDate);
    validateNumberOfDays(startDate, selectedEndDate);
  };

  const handleNumberOfDays = (event) => {
    const days = parseInt(event.target.value);

    if (days <= 0) {
      setErrors((prevErrors) => ({ ...prevErrors, numberOfDays: 'Number of days must be greater than 0' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, numberOfDays: undefined }));
      setNumberOfDays(days);
    }
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

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    setAttachments(selectedFiles);
  };

  return (
    <MainCard title="Leave Request Form">
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
                  <FormHelperText error>{errors.leaveType}</FormHelperText>
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
            <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
                type="file"
                multiple
                accept=".pdf, .doc, .docx"
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