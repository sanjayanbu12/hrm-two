import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
  InputAdornment,
  Button,
  Box,
} from '@mui/material';
import * as yup from 'yup';

export const validateSchema = yup.object().shape({
  employeeId: yup.string().required('Employee ID is required'),
  employeeName: yup.string().required('Employee Name is required'),
  leaveType: yup.string().required('Leave Type is required'),
  startDate: yup
    .date()
    .required('Start Date is required')
    .nullable()
    .min(new Date(), 'Start Date must be today or later'),
  endDate: yup
    .date()
    .required('End Date is required')
    .nullable()
    .min(yup.ref('startDate'), 'End Date must be after or equal to Start Date'),
  numberOfDays: yup
    .number()
    .required('Number of Days is required')
    .positive('Number of Days must be positive')
    .integer('Number of Days must be an integer')
    .transform((value) => (isNaN(value) ? undefined : value)), // Transform NaN to undefined
  attachments: yup.array().of(yup.string()).nullable(),
  reason: yup.string().required('Reason is required'),
});

export const updateValidateSchema = yup.object().shape({
  employeeId: yup.string().notRequired(),
  employeeName: yup.string().notRequired(),
  leaveType: yup.string().notRequired(),
  startDate: yup.date().notRequired(),
  endDate: yup.date().notRequired().when('startDate', (startDate, schema) => {
    return startDate
      ? schema.min(startDate, 'End Date must be after or equal to Start Date')
      : schema;
  }),
  numberOfDays: yup.number().notRequired().positive('Number of Days must be positive'),
  attachments: yup.array().of(yup.string()).notRequired(),
  reason: yup.string().notRequired(),
});

const LeaveTrackerForm = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numberOfDays, setNumberOfDays] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleLeaveTypeChange = (e) => {
    setLeaveType(e.target.value);
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    calculateNumberOfDays(newStartDate, endDate);
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    calculateNumberOfDays(startDate, newEndDate);
  };

  const calculateNumberOfDays = (start, end) => {
    if (start && end) {
      const startDateObj = new Date(start);
      const endDateObj = new Date(end);
      if (!isNaN(startDateObj) && !isNaN(endDateObj)) {
        const daysDiff = Math.floor(
          (endDateObj - startDateObj) / (1000 * 60 * 60 * 24)
        );
        setNumberOfDays(daysDiff.toString());
      } else {
        setNumberOfDays('');
      }
    } else {
      setNumberOfDays('');
    }
  };

  const handleFileChange = (selectedFiles) => {
    setAttachments(Array.from(selectedFiles));
  };

  const handleSubmit = async () => {
    try {
      const data = {
        employeeId,
        employeeName,
        leaveType,
        startDate,
        endDate,
        numberOfDays,
        attachments,
        reason,
      };

      await validateSchema.validate(data, { abortEarly: false });

      setSuccess(true);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <MainCard title="Leave Tracker">
      <form>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="employeeId"
              label="Employee ID"
              variant="outlined"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              error={Boolean(errors.employeeId)}
              helperText={errors.employeeId}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="employeeName"
              label="Employee Name"
              variant="outlined"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              error={Boolean(errors.employeeName)}
              helperText={errors.employeeName}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl
              fullWidth
              variant="outlined"
              error={Boolean(errors.leaveType)}
            >
              <InputLabel id="leaveType-label">Leave Type</InputLabel>
              <Select
                labelId="leaveType-label"
                id="leaveType"
                value={leaveType}
                onChange={handleLeaveTypeChange}
                label="Leave Type"
              >
                <MenuItem value="Casual Leave">Casual Leave (CL)</MenuItem>
                <MenuItem value="Sick Leave">Sick Leave (SL)</MenuItem>
                <MenuItem value="Maternity Leave">Maternity Leave (ML)</MenuItem>
                <MenuItem value="Sabbatical Leave">Sabbatical Leave (CL)</MenuItem>
                <MenuItem value="Comp-off">Compensatory Off (Comp-off)</MenuItem>
                <MenuItem value="Marriage Leave">Marriage Leave</MenuItem>
                <MenuItem value="Paternity Leave">Paternity Leave</MenuItem>
                <MenuItem value="Medical Leave">Medical Leave</MenuItem>
                <MenuItem value="One Day Leave">One Day Leave</MenuItem>
                <MenuItem value="Half Day Leave">Half Day Leave</MenuItem>
                <MenuItem value="Annual Leave">Annual Leave</MenuItem>
                <MenuItem value="Other Leave">Other Leave</MenuItem>
              </Select>
              <FormHelperText>{errors.leaveType}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="startDate"
              label="Start Date"
              variant="outlined"
              type="date"
              value={startDate || ''}
              onChange={handleStartDateChange}
              error={Boolean(errors.startDate)}
              helperText={errors.startDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="endDate"
              label="End Date"
              variant="outlined"
              type="date"
              value={endDate || ''}
              onChange={handleEndDateChange}
              error={Boolean(errors.endDate)}
              helperText={errors.endDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="numberOfDays"
              label="Number of Days"
              variant="outlined"
              value={numberOfDays || ''}
              error={Boolean(errors.numberOfDays)}
              helperText={errors.numberOfDays}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              onChange={(e) => handleFileChange(e.target.files)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="reason"
              label="Reason"
              variant="outlined"
              multiline
              rows={1}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              error={Boolean(errors.reason)}
              helperText={errors.reason}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
          {success && (
            <Grid item xs={12}>
              <Box bgcolor="success.main" color="white" p={2} borderRadius={4}>
                Leave request submitted successfully!
              </Box>
            </Grid>
          )}
        </Grid>
      </form>
    </MainCard>
  );
};

export default LeaveTrackerForm;


