import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const AttendanceList = () => {
  const [attendance, setAttendance] = useState(null);
  const [totalWorkingHours, setTotalWorkingHours] = useState(0);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get('https://hrm-backend-square.onrender.com/attendance');
        setAttendance(response.data);
        calculateTotalWorkingHours(response.data); // Calculate total working hours
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    };

    fetchAttendance();
  }, []);

  const calculateTotalWorkingHours = (attendanceData) => {
    if (attendanceData?.checkInTime && attendanceData?.checkOutTime) {
      const checkInTime = new Date(attendanceData.checkInTime);
      const checkOutTime = new Date(attendanceData.checkOutTime);
      const workingHours = (checkOutTime - checkInTime) / (1000 * 60 * 60); // Calculate working hours in milliseconds and convert to hours
      setTotalWorkingHours(workingHours);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Check In</TableCell>
            <TableCell>Check Out</TableCell>
            <TableCell>Total Working Hours</TableCell> {/* Added column for total working hours */}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{attendance?.checkInDate || 'N/A'}</TableCell>
            <TableCell>{attendance?.checkInTime || 'N/A'}</TableCell>
            <TableCell>{attendance?.checkOutTime || 'N/A'}</TableCell>
            <TableCell>{totalWorkingHours || 'N/A'}</TableCell> {/* Display total working hours */}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttendanceList;
