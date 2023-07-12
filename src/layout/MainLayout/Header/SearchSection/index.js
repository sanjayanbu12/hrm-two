import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AttendanceTracker = () => {
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [checkInDate, setCheckInDate] = useState('');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get('https://hrm-backend-square.onrender.com/attendance');
        const { checkInTime, checkOutTime, checkInDate } = response.data;

        if (checkInTime) {
          setCheckInTime(checkInTime);
        }

        if (checkOutTime) {
          setCheckOutTime(checkOutTime);
        }

        if (checkInDate) {
          setCheckInDate(checkInDate);
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

      const response = await axios.post('https://hrm-backend-square.onrender.com/attendance/checkin', {
      checkInTime: currentTime,
      checkInDate: currentDate
        
      });

      if (response.data.success) {
        setCheckInTime(currentTime);
        setCheckInDate(currentDate);
        toast.success('Check-in successful');
        console.log(checkInDate);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error performing check-in:', error);
      toast.error('Error performing check-in');
    }
  };

  const handleCheckOut = async () => {
    try {
      const currentTime = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
      const currentDate = new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });

      const response = await axios.post('https://hrm-backend-square.onrender.com/attendance/checkout', {
        checkOutTime: currentTime,
        checkOutDate: currentDate
      });

      if (response.data.success) {
        setCheckOutTime(response.data.checkOutTime);
        toast.success('Check-out successful');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error performing check-out:', error);
      toast.error('Error performing check-out');
    }
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item>
        <Button variant="contained" color="success" onClick={handleCheckIn} disabled={checkInTime !== ''}>
          Check In
        </Button>
      </Grid>

      <Grid item>
        <Button variant="contained" color="error" onClick={handleCheckOut} disabled={checkInTime === '' || checkOutTime !== ''}>
          Check Out
        </Button>
      </Grid>

      <ToastContainer />
    </Grid>
  );
};

export default AttendanceTracker;
