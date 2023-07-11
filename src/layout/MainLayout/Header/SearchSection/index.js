import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import axios from 'axios';

const AttendanceTracker = () => {
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get('https://hrm-backend-square.onrender.com/attendance');
        const { checkInTime, checkOutTime } = response.data;

        if (checkInTime) {
          setCheckInTime(checkInTime);
        }

        if (checkOutTime) {
          setCheckOutTime(checkOutTime);
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
      const currentDate = new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
      const storedDate = localStorage.getItem('attendanceDate');

      if (storedDate === currentDate) {
        // Already checked in today
        return;
      }

      await axios.post('https://hrm-backend-square.onrender.com/attendance/checkin', {
        checkInTime: currentTime,
        checkInDate: currentDate
      });

      setCheckInTime(currentTime);
      localStorage.setItem('checkInTime', currentTime);
      localStorage.setItem('attendanceDate', currentDate);
      console.log(checkInTime);
    } catch (error) {
      console.error('Error performing check-in:', error);
      // Handle error
    }
  };

  const handleCheckOut = async () => {
    try {
      const currentTime = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
      const currentDate = new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
      const storedDate = localStorage.getItem('attendanceDate');

      if (storedDate !== currentDate) {
        // Haven't checked in today
        return;
      }

      await axios.post('https://hrm-backend-square.onrender.com/attendance/checkout', {
        checkOutTime: currentTime,
        checkOutDate: currentDate
      });

      setCheckOutTime(currentTime);
      localStorage.setItem('checkOutTime', currentTime);
      console.log(checkOutTime);
    } catch (error) {
      console.error('Error performing check-out:', error);
      // Handle error
    }
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item>
        <Button variant="contained" color="success" onClick={handleCheckIn}>
          Check In
        </Button>
      </Grid>

      <Grid item>
        <Button variant="contained" color="error" onClick={handleCheckOut}>
          Check Out
        </Button>
      </Grid>
    </Grid>
  );
};

export default AttendanceTracker;
