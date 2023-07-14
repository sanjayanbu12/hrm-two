import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const AttendanceList = () => {
  const [attendance, setAttendance] = useState(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get('https://hrm-backend-square.onrender.com/attendance');
        setAttendance(response.data);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    };

    fetchAttendance();
  }, []);

  const calculateWorkingHours = (checkInTime, checkOutTime) => {
    if (checkInTime && checkOutTime) {
      const checkIn = parseTime(checkInTime);
      const checkOut = parseTime(checkOutTime);
      const workingHours = (checkOut - checkIn) / (1000 * 60 * 60); // Calculate working hours in milliseconds and convert to hours
      return workingHours.toFixed(2);
    }
    return 'N/A';
  };

  const parseTime = (timeString) => {
    const [time, period] = timeString.split(' ');
    let [hours, minutes, seconds] = time.split(':').map((value) => parseInt(value, 10));
    if (period.toLowerCase() === 'pm' && hours !== 12) {
      hours += 12;
    } else if (period.toLowerCase() === 'am' && hours === 12) {
      hours = 0;
    }
    return new Date(0, 0, 0, hours, minutes, seconds);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Check In</TableCell>
            <TableCell>Check Out</TableCell>
            <TableCell>Total Working Hours</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(attendance) && attendance.length > 0 ? (
            attendance.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.checkInDate || 'N/A'}</TableCell>
                <TableCell>{record.checkInTime || 'N/A'}</TableCell>
                <TableCell>{record.checkOutTime || 'N/A'}</TableCell>
                <TableCell>{calculateWorkingHours(record.checkInTime, record.checkOutTime)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>No attendance records found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttendanceList;
