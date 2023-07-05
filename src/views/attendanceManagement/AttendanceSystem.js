import React, { useState } from 'react';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import { Box } from '@mui/system';
import { Typography, Button } from '@mui/material';
import AlarmIcon from '@mui/icons-material/Alarm';
import HomeIcon from '@mui/icons-material/Home';

const AttendanceSystem = () => {
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  const handleCheckIn = async () => {
    try {
      await axios.post('https://hrm-backend-square.onrender.com/api/attendance/checkin', { checkInTime });
      const currentTime = new Date().toLocaleTimeString();
      setCheckInTime(currentTime);
      console.log(currentTime);
      // Perform any necessary actions after successful check-in
    } catch (error) {
      console.error('Error performing check-in:', error);
      // Handle error
    }
  };

  const handleCheckOut = async () => {
    try {
      await axios.post('https://hrm-backend-square.onrender.com/api/attendance/checkout', checkOutTime);
      const currentTime = new Date().toLocaleTimeString();
      setCheckOutTime(currentTime);
      console.log('Check-out successful');
      // Perform any necessary actions after successful check-out
    } catch (error) {
      console.error('Error performing check-out:', error);
      // Handle error
    }
  };

  return (
    <MainCard title="Attendance Regulation">
      <Box>
        <Typography variant="h3" gutterBottom>
          Check-in Time: {checkInTime || 'Not Checked In'}
        </Typography>
        <Typography variant="h3" gutterBottom>
          Check-out Time: {checkOutTime || 'Not Checked Out'}
        </Typography>
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
