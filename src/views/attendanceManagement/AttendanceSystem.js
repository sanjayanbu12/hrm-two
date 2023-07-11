import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import { Box } from '@mui/system';
import { Typography, Button, Grid, FormControl } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import AlarmIcon from '@mui/icons-material/Alarm';
import HomeIcon from '@mui/icons-material/Home';
import Select from '@mui/material/Select';

const AttendanceSystem = () => {
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    // Fetch employee names from the backend
    const fetchEmployeeNames = async () => {
      try {
        const response = await axios.get('https://hrm-backend-square.onrender.com/api/allemployee');
        setEmployeeList(response.data);
      } catch (error) {
        console.error('Error getting employee names:', error);
        // Handle error
      }
    };

    fetchEmployeeNames();
  }, []);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const storedCheckInTime = localStorage.getItem('checkInTime');
        const storedCheckOutTime = localStorage.getItem('checkOutTime');

        if (storedCheckInTime) {
          setCheckInTime(storedCheckInTime);
        }

        if (storedCheckOutTime) {
          setCheckOutTime(storedCheckOutTime);
        }
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    };

    fetchAttendance();
  }, []);

  const handleCheckIn = async () => {
    try {
      const currentTime = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
      await axios.post('https://hrm-backend-square.onrender.com/attendance/checkin', { checkInTime: currentTime });
      setCheckInTime(currentTime);
      employeeName, employeeId;

      localStorage.setItem('checkInTime', currentTime);
    } catch (error) {
      console.error('Error performing check-in:', error);
      // Handle error
    }
  };

  const handleCheckOut = async () => {
    try {
      const currentTime = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
      await axios.post('https://hrm-backend-square.onrender.com/attendance/checkout', { checkOutTime: currentTime });
      setCheckOutTime(currentTime);
      employeeName, employeeId;
      localStorage.setItem('checkOutTime', currentTime);
      // Perform any necessary actions after successful check-out
    } catch (error) {
      console.error('Error performing check-out:', error);
      // Handle error
    }
  };
  const handleEmployeeNameChange = (event) => {
    setEmployeeName(event.target.value);
  };

  const handleEmployeeIdChange = (event) => {
    setEmployeeId(event.target.value);
  };

  return (
    <MainCard title="Attendance Regulation">
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={4}>
          <FormControl sx={{ minWidth: '100%' }}>
            <Select value={employeeName} onChange={handleEmployeeNameChange}>
              {employeeList.map((employee) => (
                <MenuItem key={employee.id} value={employee.name}>
                  {employee.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl sx={{ minWidth: '100%' }}>
            <Select value={employeeId} onChange={handleEmployeeIdChange}>
              {employeeList.map((employee) => (
                <MenuItem key={employee.id} value={employee.employeeid}>
                  {employee.employeeid}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box>
        <Box>
          <Typography variant="h3" gutterBottom>
            Check-in Time: {checkInTime || 'Not Checked In'}
          </Typography>
        </Box>
        <Box spacing={3}>
          <Typography variant="h3" gutterBottom>
            Check-out Time: {checkOutTime || 'Not Checked Out'}
          </Typography>
        </Box>
      </Box>
      <Box>
        {!checkInTime && (
          <Button variant="contained" color="success" onClick={handleCheckIn} startIcon={<AlarmIcon />}>
            Check In
          </Button>
        )}
        {checkInTime && !checkOutTime && (
          <Button variant="contained" color="success" onClick={handleCheckOut} endIcon={<HomeIcon />}>
            Check Out
          </Button>
        )}
        {checkInTime && checkOutTime && <p>Attendance already checked</p>}
      </Box>
    </MainCard>
  );
};

export default AttendanceSystem;
