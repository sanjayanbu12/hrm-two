import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AttendanceTracker = () => {
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [isCheckInDone, setIsCheckInDone] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  console.log(checkInDate);
  console.log(checkInTime);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get('https://pulsehr-express-server.onrender.com/attendance');
        const { attendance, isCheckInDone } = response.data;

        if (attendance && attendance.checkInTime) {
          setCheckInTime(attendance.checkInTime);
          setCheckInDate(attendance.checkInDate);
          setIsCheckInDone(isCheckInDone);
        }

        if (attendance && attendance.checkOutTime) {
          setCheckOutTime(attendance.checkOutTime);
        }
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    };

    fetchAttendance();
  }, [refreshKey]);

  const handleCheckIn = async () => {
    try {
      const currentTime = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
      const currentDate = new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });

      const response = await axios.post('https://pulsehr-express-server.onrender.com/attendance/checkin', {
        checkInTime: currentTime,
        checkInDate: currentDate
      });

      if (response.data.success) {
        setCheckInTime(currentTime);
        setCheckInDate(currentDate);
        setIsCheckInDone(true);
        toast.success('Check-in successful');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error performing check-in:', error);
      toast.error("you're already checkin today");
    }
  };

  const handleCheckOut = async () => {
    try {
      const currentTime = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
      const currentDate = new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });

      const response = await axios.post('https://pulsehr-express-server.onrender.com/attendance/checkout', {
        checkOutTime: currentTime,
        checkOutDate: currentDate
      });

      if (response.data.success) {
        setCheckOutTime(response.data.checkOutTime);
        setIsCheckInDone(false);
        toast.success('Check-out successful');
        setRefreshKey((prevKey) => prevKey + 1);
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
        <Button variant="contained" color="success" onClick={handleCheckIn} disabled={isCheckInDone}>
          Check In
        </Button>
      </Grid>

      <Grid item>
        <Button variant="contained" color="error" onClick={handleCheckOut} disabled={!isCheckInDone || checkOutTime !== ''}>
          Check Out
        </Button>
      </Grid>

      <ToastContainer />
    </Grid>
  );
};

export default AttendanceTracker;
