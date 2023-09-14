// import React, { useState, useEffect } from 'react';
// import MainCard from 'ui-component/cards/MainCard';
// import {
//   Grid,
//   TextField,
//   FormControl,
//   InputLabel,
//   FormHelperText,
//   Select,
//   InputAdornment,
//   Button,
//   Box,
//   MenuItem,
// } from '@mui/material';
// import * as yup from 'yup';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';

// // Validation schemas
// const validateSchema = yup.object().shape({
//   employeeId: yup.string().required('Employee ID is required'),
//   employeeName: yup.string().required('Employee Name is required'),
//   leaveType: yup.string().required('Leave Type is required'),
//   startDate: yup
//     .date()
//     .required('Start Date is required')
//     .nullable()
//     .min(new Date(), 'Start Date must be today or later'),
//   endDate: yup
//     .date()
//     .required('End Date is required')
//     .nullable()
//     .min(yup.ref('startDate'), 'End Date must be after or equal to Start Date'),
//   numberOfDays: yup
//     .number()
//     .required('Number of Days is required')
//     .positive('Number of Days must be positive')
//     .integer('Number of Days must be an integer')
//     .transform((value) => (isNaN(value) ? undefined : value)),
//   attachments: yup.array().of(yup.string()).nullable(),
//   reason: yup.string().required('Reason is required'),
// });

// const RequestLeave = () => {
//   const navigate = useNavigate();
//   const [employeeId, setEmployeeId] = useState('');
//   const [employeeName, setEmployeeName] = useState('');
//   const [leaveType, setLeaveType] = useState('');
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [numberOfDays, setNumberOfDays] = useState('');
//   const [attachments, setAttachments] = useState([]);
//   const [reason, setReason] = useState('');
//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState(false);

//   const leaveTypes = [
//     'Casual Leave (CL)',
//     'Sick Leave (SL)',
//     'Maternity Leave (ML)',
//     'Sabbatical Leave (CL)',
//     'Compensatory Off (Comp-off)',
//     'Marriage Leave',
//     'Paternity Leave',
//     'Medical Leave',
//     'One Day Leave',
//     'Half Day Leave',
//     'Annual Leave',
//     'Other Leave',
//   ];

//   // Function to calculate the number of days
//   useEffect(() => {
//     if (startDate && endDate) {
//       const startDateObj = new Date(startDate);
//       const endDateObj = new Date(endDate);
//       if (!isNaN(startDateObj) && !isNaN(endDateObj)) {
//         const daysDiff = Math.floor(
//           (endDateObj - startDateObj) / (1000 * 60 * 60 * 24)
//         );
//         setNumberOfDays(daysDiff.toString());
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           numberOfDays: '', // Clear the error when a value is calculated
//         }));
//       }
//     } else {
//       setNumberOfDays('');
//     }
//   }, [startDate, endDate]);

//   // Handle Leave Type change
//   const handleLeaveTypeChange = (e) => {
//     setLeaveType(e.target.value);
//   };

//   // Handle Start Date change
//   const handleStartDateChange = (e) => {
//     const newStartDate = e.target.value;
//     setStartDate(newStartDate);
//   };

//   // Handle End Date change
//   const handleEndDateChange = (e) => {
//     const newEndDate = e.target.value;
//     setEndDate(newEndDate);
//   };

//   // Handle File Change
//   const handleFileChange = (selectedFiles) => {
//     setAttachments(Array.from(selectedFiles));
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     try {
//       const data = {
//         employeeId,
//         employeeName,
//         leaveType,
//         startDate,
//         endDate,
//         numberOfDays,
//         attachments,
//         reason,
//       };

//       await validateSchema.validate(data, { abortEarly: false });

//       const response = await axios.post(
//         'https://hrm-backend-square.onrender.com/api/leave',
//         data
//       );

//       if (response.status === 200) {
//         // Request was successful
//         Swal.fire({
//           icon: 'success',
//           title: 'Leave request submitted successfully!',
//           timer: 2000,
//           showConfirmButton: false,
//         });
//         setSuccess(true);
//         setErrors({});
//         navigate('/viewleave');
//       } else {
//         // Request failed, handle the error
//         console.error('Error:', response); // Log the response for debugging
//         Swal.fire({
//           icon: 'error',
//           title: 'Leave request failed!',
//           text: 'An error occurred while submitting the request. Please try again later.',
//         });
//       }
//     } catch (error) {
//       if (error instanceof yup.ValidationError) {
//         const validationErrors = {};
//         error.inner.forEach((err) => {
//           validationErrors[err.path] = err.message;
//         });
//         setErrors(validationErrors);
//       }
//     }
//   };

//   // Handle field change and clear errors
//   const handleFieldChange = (e) => {
//     const { name } = e.target;
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: '',
//     }));
//   };

//   return (
//     <MainCard title="Leave Tracker">
//       <form>
//         <Grid container spacing={3}>
//           {/* Employee ID */}
//           <Grid item xs={6}>
//             <TextField
//               fullWidth
//               id="employeeId"
//               name="employeeId"
//               label="Employee ID"
//               variant="outlined"
//               value={employeeId}
//               onChange={(e) => {
//                 handleFieldChange(e);
//                 setEmployeeId(e.target.value);
//               }}
//               error={Boolean(errors.employeeId)}
//               helperText={errors.employeeId}
//             />
//           </Grid>
          
//           {/* Employee Name */}
//           <Grid item xs={6}>
//             <TextField
//               fullWidth
//               id="employeeName"
//               name="employeeName"
//               label="Employee Name"
//               variant="outlined"
//               value={employeeName}
//               onChange={(e) => {
//                 handleFieldChange(e);
//                 setEmployeeName(e.target.value);
//               }}
//               error={Boolean(errors.employeeName)}
//               helperText={errors.employeeName}
//             />
//           </Grid>
          
//           {/* Leave Type */}
//           <Grid item xs={6}>
//             <FormControl
//               fullWidth
//               variant="outlined"
//               error={Boolean(errors.leaveType)}
//             >
//               <InputLabel id="leaveType-label">Leave Type</InputLabel>
//               <Select
//                 labelId="leaveType-label"
//                 id="leaveType"
//                 name="leaveType"
//                 value={leaveType}
//                 onChange={(e) => {
//                   handleFieldChange(e);
//                   handleLeaveTypeChange(e);
//                 }}
//                 label="Leave Type"
//               >
//                 {leaveTypes.map((type) => (
//                   <MenuItem key={type} value={type}>
//                     {type}
//                   </MenuItem>
//                 ))}
//               </Select>
//               <FormHelperText>{errors.leaveType}</FormHelperText>
//             </FormControl>
//           </Grid>
          
//           {/* Start Date */}
//           <Grid item xs={6}>
//             <TextField
//               fullWidth
//               id="startDate"
//               name="startDate"
//               label="Start Date"
//               variant="outlined"
//               type="date"
//               value={startDate || ''}
//               onChange={(e) => {
//                 handleFieldChange(e);
//                 handleStartDateChange(e);
//               }}
//               error={Boolean(errors.startDate)}
//               helperText={errors.startDate}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>
          
//           {/* End Date */}
//           <Grid item xs={6}>
//             <TextField
//               fullWidth
//               id="endDate"
//               name="endDate"
//               label="End Date"
//               variant="outlined"
//               type="date"
//               value={endDate || ''}
//               onChange={(e) => {
//                 handleFieldChange(e);
//                 handleEndDateChange(e);
//               }}
//               error={Boolean(errors.endDate)}
//               helperText={errors.endDate}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>
          
//           {/* Number of Days */}
//           <Grid item xs={6}>
//             <TextField
//               fullWidth
//               id="numberOfDays"
//               name="numberOfDays"
//               label="Number of Days"
//               variant="outlined"
//               value={numberOfDays}
//               onChange={(e) => {
//                 handleFieldChange(e);
//                 setNumberOfDays(e.target.value);
//               }}
//               error={Boolean(errors.numberOfDays)}
//               helperText={errors.numberOfDays || '\u00A0'} 
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start"></InputAdornment>
//                 ),
//                 shrink: true,
//               }}
//             />
//           </Grid>
          
//           {/* Attachments */}
//           <Grid item xs={6}>
//             <TextField
//               fullWidth
//               type="file"
//               accept=".pdf,.jpg,.jpeg,.png"
//               multiple
//               onChange={(e) => {
//                 handleFieldChange(e);
//                 handleFileChange(e.target.files);
//               }}
//             />
//           </Grid>
          
//           {/* Reason */}
//           <Grid item xs={6}>
//             <TextField
//               fullWidth
//               id="reason"
//               name="reason"
//               label="Reason"
//               variant="outlined"
//               multiline
//               rows={1}
//               value={reason}
//               onChange={(e) => {
//                 handleFieldChange(e);
//                 setReason(e.target.value);
//               }}
//               error={Boolean(errors.reason)}
//               helperText={errors.reason}
//             />
//           </Grid>
          
//           {/* Submit Button */}
//           <Grid item xs={12}>
//             <Button variant="contained" color="primary" onClick={handleSubmit}>
//               Submit
//             </Button>
//           </Grid>
          
//           {/* Success Message */}
//           {success && (
//             <Grid item xs={12}>
//               <Box bgcolor="success.main" color="white" p={2} borderRadius={4}>
//                 Leave request submitted successfully!
//               </Box>
//             </Grid>
//           )}
//         </Grid>
//       </form>
//     </MainCard>
//   );
// };

// export default RequestLeave 

import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  InputAdornment,
  Button,
  Box,
  MenuItem,
} from '@mui/material';
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const validateSchema = yup.object().shape({
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
    .transform((value) => (isNaN(value) ? undefined : value)),
  attachments: yup.array().of(yup.string()).nullable(),
  reason: yup.string().required('Reason is required'),
});

const RequestLeave = () => {
  const navigate = useNavigate();
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
    'Other Leave',
  ];

  useEffect(() => {
    if (startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      if (!isNaN(startDateObj) && !isNaN(endDateObj)) {
        const daysDiff = Math.floor(
          (endDateObj - startDateObj) / (1000 * 60 * 60 * 24)
        );
        setNumberOfDays(daysDiff.toString());
        setErrors((prevErrors) => ({
          ...prevErrors,
          numberOfDays: '',
        }));
      }
    } else {
      setNumberOfDays('');
    }
  }, [startDate, endDate]);

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
    setAttachments(Array.from(selectedFiles));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
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

      const response = await axios.post('https://hrm-backend-square.onrender.com/api/leave/', data);

      if (response.status === 200) {
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

        Swal.fire({
          icon: 'success',
          text: 'Leave request submitted successfully!',
        }).then(() => {
          navigate('/viewleave');
        });
      } else {
        console.error('Error:', response);
        Swal.fire({
          icon: 'error',
          title: 'Leave request failed!',
          text:
            'An error occurred while submitting the request. Please try again later.',
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
        console.log(error);
      }
    }
  };

  const handleFieldChange = (e) => {
    const { name } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
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
              onChange={(e) => {
                handleFieldChange(e);
                setEmployeeId(e.target.value);
              }}
              error={Boolean(errors.employeeId)}
              helperText={errors.employeeId}
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
              onChange={(e) => {
                handleFieldChange(e);
                setEmployeeName(e.target.value);
              }}
              error={Boolean(errors.employeeName)}
              helperText={errors.employeeName}
            />
          </Grid>
          
          {/* Leave Type */}
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
                shrink: true,
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
                shrink: true,
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
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
                shrink: true,
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
