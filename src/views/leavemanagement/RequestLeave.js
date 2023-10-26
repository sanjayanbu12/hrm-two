import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Grid, TextField, FormControl, InputLabel, FormHelperText, Select, InputAdornment, Button, Box, MenuItem } from '@mui/material';
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
import FormData from 'form-data';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import ApiContext from 'context/api/ApiContext';
import FormSubmittedContext from 'context/isformsubmited/FormSubmittedContext';

const validationSchema = yup.object().shape({
  employeeId: yup.string().required('Employee ID is required'),
  employeeName: yup.string().required('Employee Name is required'),
  leaveType: yup.string().required('Leave Type is required'),
  startDate: yup
    .date()
    .required('Start Date is required')
    .nullable()
    .min(new Date(), 'Start Date must be today or later')
    .test('startDate', 'Start Date must be earlier than End Date', function (startDate) {
      const { endDate } = this.parent;
      if (!startDate || !endDate) {
        return true; // Skip validation if either date is not set
      }
      return new Date(startDate) < new Date(endDate);
    }),
  endDate: yup
    .date()
    .required('End Date is required')
    .nullable()
    .min(yup.ref('startDate'), 'End Date must be after or equal to Start Date'),
  numberOfDays: yup
    .number()
    .typeError('Number of Days must be a number')
    .required('Number of Days is required')
    .positive('Number of Days must be positive')
    .integer('Number of Days must be an integer')
    .test('numberOfDays', 'Number of Days must match the selected dates', function (numberOfDays) {
      const { startDate, endDate } = this.parent;
      if (!startDate || !endDate) {
        return true; // Skip validation if either date is not set
      }
      const daysDiff = Math.floor((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
      return numberOfDays === daysDiff;
    }),
  attachments: yup.array().of(yup.string()),
  reason: yup.string().required('Reason is required')
});

const RequestLeave = () => {
  // const navigate = useNavigate();
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
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [edata, setedata] = useState([]);
  const [report, setReport] = useState([]);
  const employee = useSelector((state) => state.customization.authId);
  console.log(employee);
  console.log(employeeName);
  const {employeeContextData}=useContext(ApiContext)
  const {leaveStatus, setleaveStatus}=useContext(FormSubmittedContext)
  const leaveTypes = [
    'Casual Leave (CL)',
    'Sick Leave (SL)',
    'Maternity Leave (ML)',
    'Sabbatical Leave (CL)',
    'Compensatory Off (Comp-off)',
    'Marriage Leave',
    'Paternity Leave',
    'Medical Leave',
    'One Day Leave',
    'Half Day Leave',
    'Annual Leave',
    'Other Leave'
  ];

  useEffect(() => {
    if (startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      if (!isNaN(startDateObj) && !isNaN(endDateObj)) {
        const daysDiff = Math.floor((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));
        setNumberOfDays(daysDiff.toString());
        setErrors((prevErrors) => ({
          ...prevErrors,
          numberOfDays: ''
        }));
      }
    } else {
      setNumberOfDays('');
    }
  }, [startDate, endDate]);
  useEffect(() => {
    fetchEmployeesData();
  }, [employeeContextData]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = employeeContextData
        const allEmployeeData = response.data;
        const specificEmployee = allEmployeeData.find((emp) => emp.employeeid === employee);
        setEmployeeDetails(specificEmployee);
        console.log(specificEmployee);
        console.log(employeeDetails);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchData();
  }, [employeeContextData]);
  useEffect(() => {
    setEmployeeId(employeeDetails.employeeid);
    setEmployeeName(employeeDetails.name);
  });

  const handleLeaveTypeChange = (e) => {
    setLeaveType(e.target.value);
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
  };

  const handleFileChange = (selectedFiles) => {
    const filesArray = Array.from(selectedFiles);
    setAttachments(filesArray);
  };
  const fetchEmployeesData = async () => {
    try {
      const response =employeeContextData;
      const employees = response.data;
      setedata(employees);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    console.log(report);
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      await validationSchema.validate(
        {
          employeeId,
          employeeName,
          leaveType,
          startDate,
          endDate,
          numberOfDays,
          reason,
          attachments
        },
        { abortEarly: false }
      );

      const data = new FormData();
      data.append('employeeId', employeeId);
      data.append('employeeName', employeeName);
      data.append('leaveType', leaveType);
      data.append('startDate', startDate);
      data.append('endDate', endDate);
      data.append('numberOfDays', numberOfDays);
      data.append('reason', reason);
      data.append('attachments', attachments[0]);
      data.append('reportingto', report.id);

      const response = await axios.post('https://hrm-backend-square.onrender.com/api/leave/', data, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data
        }
      });

      if (response.status === 201) {
        setEmployeeId('');
        setEmployeeName('');
        setLeaveType('');
        setStartDate(null);
        setEndDate(null);
        setNumberOfDays('');
        setAttachments([]);
        setReason('');
        setErrors({});
        setSuccess(true);
        setleaveStatus(!leaveStatus)
        Swal.fire({
          icon: 'success',
          text: 'Leave request submitted successfully!'
        });
        // }).then(() => {
        //   navigate('/viewleave');
        // });
      } else {
        console.error('Error:', response);
        Swal.fire({
          icon: 'error',
          title: 'Leave request failed!',
          text: 'An error occurred while submitting the request. Please try again later.'
        });
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        alert(error.message);
        console.log(error);
      }
    }
  };

  const handleFieldChange = (e) => {
    const { name } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
  };
  const handleReport = (e) => {
    const selectedValue = e.target.value;
    const [reportId, reportName] = selectedValue.split(',');
    setReport({ id: reportId, name: reportName });
    setErrors((prev) => ({
      ...prev,
      report: ''
    }));
  };
  return (
    <MainCard title="Leave Tracker">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Employee ID */}

          <Grid item xs={6}>
            <TextField
              fullWidth
              id="employeeId"
              name="employeeId"
              label="Employee ID"
              variant="outlined"
              value={employeeId}
              // error={Boolean(errors.employeeId)}
              // helperText={errors.employeeId}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
                shrink: true
              }}
            />
          </Grid>
          {/* Employee Name */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="employeeName"
              name="employeeName"
              label="Employee Name"
              variant="outlined"
              value={employeeName}
              // error={Boolean(errors.employeeName)}
              // helperText={errors.employeeName}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
                shrink: true
              }}
            />
          </Grid>
          {/* Leave Type */}
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined" error={Boolean(errors.leaveType)}>
              <InputLabel id="leaveType-label">Leave Type</InputLabel>
              <Select
                labelId="leaveType-label"
                id="leaveType"
                name="leaveType"
                value={leaveType}
                onChange={(e) => {
                  handleFieldChange(e);
                  handleLeaveTypeChange(e);
                }}
                label="Leave Type"
              >
                {leaveTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.leaveType}</FormHelperText>
            </FormControl>
          </Grid>
          {/* Start Date */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="startDate"
              name="startDate"
              label="Start Date"
              variant="outlined"
              type="date"
              value={startDate || ''}
              onChange={(e) => {
                handleFieldChange(e);
                handleStartDateChange(e);
              }}
              error={Boolean(errors.startDate)}
              helperText={errors.startDate}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          {/* End Date */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="endDate"
              name="endDate"
              label="End Date"
              variant="outlined"
              type="date"
              value={endDate || ''}
              onChange={(e) => {
                handleFieldChange(e);
                handleEndDateChange(e);
              }}
              error={Boolean(errors.endDate)}
              helperText={errors.endDate}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          {/* Number of Days */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="numberOfDays"
              name="numberOfDays"
              label="Number of Days"
              variant="outlined"
              value={numberOfDays}
              onChange={(e) => {
                handleFieldChange(e);
                setNumberOfDays(e.target.value);
              }}
              error={Boolean(errors.numberOfDays)}
              helperText={errors.numberOfDays || '\u00A0'}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
                shrink: true
              }}
            />
          </Grid>
          {/* Attachments */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              onChange={(e) => {
                handleFieldChange(e);
                handleFileChange(e.target.files);
              }}
            />
          </Grid>
          {/* Reason */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="reason"
              name="reason"
              label="Reason"
              variant="outlined"
              multiline
              rows={1}
              value={reason}
              onChange={(e) => {
                handleFieldChange(e);
                setReason(e.target.value);
              }}
              error={Boolean(errors.reason)}
              helperText={errors.reason}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl sx={{ minWidth: '100%' }}>
              <InputLabel id="demo-simple-select-label">Reporting to</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Reporting To"
                value={report.id ? `${report.id},${report.name}` : ''}
                // error={errors && errors.report}
                // helperText={errors && errors.report}
                onChange={(e) => handleReport(e)}
              >
                {edata.map((item) => (
                  <MenuItem key={item._id} value={`${item._id},${item.name}`}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText>{errors && errors.report}</FormHelperText>
            </FormControl>
          </Grid>
          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
          {/* Success Message */}
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

export default RequestLeave;
