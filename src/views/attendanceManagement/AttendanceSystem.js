import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import { Box } from '@mui/system';
import { Typography, Button, Select, MenuItem } from '@mui/material';
import AlarmIcon from '@mui/icons-material/Alarm';
import HomeIcon from '@mui/icons-material/Home';

const AttendanceSystem = () => {
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [breakStartTime, setBreakStartTime] = useState(null);
  const [breakEndTime, setBreakEndTime] = useState(null);
  const [totalBreakDuration, setTotalBreakDuration] = useState(0);
  const [isLate, setIsLate] = useState(false);
  const [isOvertime, setIsOvertime] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState('Not Checked In');
  const [employeeName, setEmployeeName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [attendanceHistory, setAttendanceHistory] = useState([]);
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

  const handleCheckIn = async () => {
    try {
      const currentTime = new Date().toLocaleTimeString();
      await axios.post('https://hrm-backend-square.onrender.com/api/attendance/checkin', {
        checkInTime: currentTime,
        employeeName,
        employeeId
      });
      setCheckInTime(currentTime);
      setAttendanceStatus('Checked In');
      // Perform any necessary actions after successful check-in
    } catch (error) {
      console.error('Error performing check-in:', error);
      // Handle error
    }
  };

  const handleCheckOut = async () => {
    try {
      const currentTime = new Date().toLocaleTimeString();
      await axios.post('https://hrm-backend-square.onrender.com/api/attendance/checkout', {
        checkOutTime: currentTime,
        employeeName,
        employeeId
      });
      setCheckOutTime(currentTime);
      setAttendanceStatus('Checked Out');
      console.log('Check-out successful');
      // Perform any necessary actions after successful check-out
    } catch (error) {
      console.error('Error performing check-out:', error);
      // Handle error
    }
  };

  const handleStartBreak = () => {
    const breakStartTime = new Date().toLocaleTimeString();
    setBreakStartTime(breakStartTime);
    setIsOnBreak(true);
  };

  const handleEndBreak = () => {
    const breakEndTime = new Date().toLocaleTimeString();
    setBreakEndTime(breakEndTime);
    calculateTotalBreakDuration();
    setIsOnBreak(false);
  };

  const calculateTotalBreakDuration = () => {
    if (breakStartTime && breakEndTime) {
      const startTime = new Date('1970-01-01 ' + breakStartTime);
      const endTime = new Date('1970-01-01 ' + breakEndTime);
      const breakDuration = endTime - startTime;
      setTotalBreakDuration(breakDuration);
    }
  };

  const handleEmployeeNameChange = (event) => {
    setEmployeeName(event.target.value);
  };

  const handleEmployeeIdChange = (event) => {
    setEmployeeId(event.target.value);
  };

  const handleLateCheckIn = () => {
    setIsLate(true);
  };

  const handleOvertime = () => {
    setIsOvertime(true);
  };

  const handleGetAttendanceHistory = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/api/attendance/', {
        params: {
          employeeid
        }
      });
      setAttendanceHistory(response.data);
    } catch (error) {
      console.error('Error getting attendance history:', error);
      // Handle error
    }
  };

  return (
    <MainCard title="Attendance Regulation">
      <Box mt={2}>
        <Typography variant="h5" gutterBottom>
          Employee Name:
        </Typography>
        <Select value={employeeName} onChange={handleEmployeeNameChange}>
          {employeeList.map((employee) => (
            <MenuItem key={employee.id} value={employee.name}>
              {employee.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box>
        <Typography variant="h5" gutterBottom>
          Employee ID:
        </Typography>
        <Select value={employeeId} onChange={handleEmployeeIdChange}>
          {employeeList.map((employee) => (
            <MenuItem key={employee.id} value={employee.employeeid}>
              {employee.employeeid}
            </MenuItem>
          ))}
        </Select>
        <Box>
          <Typography variant="h3" gutterBottom>
            Check-in Time: {checkInTime || 'Not Checked In'}
          </Typography>
          <Typography variant="h3" gutterBottom>
            Check-out Time: {checkOutTime || 'Not Checked Out'}
          </Typography>
          <Typography variant="h3" gutterBottom>
            Attendance Status: {attendanceStatus}
          </Typography>
        </Box>
        <Box>
          {!checkInTime && (
            <Button variant="contained" color="success" onClick={handleCheckIn} startIcon={<AlarmIcon />}>
              Check In
            </Button>
          )}
          {checkInTime && !checkOutTime && !breakStartTime && (
            <Button variant="contained" color="success" onClick={handleStartBreak} startIcon={<AlarmIcon />}>
              Start Break
            </Button>
          )}
          {breakStartTime && !breakEndTime && (
            <Button variant="contained" color="success" onClick={handleEndBreak} endIcon={<HomeIcon />}>
              End Break
            </Button>
          )}
          {checkInTime && !checkOutTime && breakStartTime && breakEndTime && (
            <Button variant="contained" color="success" onClick={handleCheckOut} endIcon={<HomeIcon />}>
              Check Out
            </Button>
          )}
          {checkInTime && checkOutTime && (
            <Typography variant="h5" gutterBottom>
              Attendance already checked
            </Typography>
          )}
          {isLate && (
            <Typography variant="h5" gutterBottom>
              You are late
            </Typography>
          )}
          {isOvertime && (
            <Typography variant="h5" gutterBottom>
              You are working overtime
            </Typography>
          )}
          {isOnBreak && (
            <Typography variant="h5" gutterBottom>
              You are currently on a break
            </Typography>
          )}
        </Box>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleLateCheckIn}>
            Late Check-in
          </Button>
          <Button variant="contained" color="primary" onClick={handleOvertime}>
            Overtime
          </Button>

          <Button variant="contained" color="primary" onClick={handleGetAttendanceHistory}>
            Get Attendance History
          </Button>
        </Box>
      </Box>
      {breakStartTime && breakEndTime && (
        <Box>
          <Typography variant="h4" gutterBottom>
            Break Duration: {totalBreakDuration} milliseconds
          </Typography>
          <Typography variant="h4" gutterBottom>
            Break Start Time: {breakStartTime}
          </Typography>
          <Typography variant="h4" gutterBottom>
            Break End Time: {breakEndTime}
          </Typography>
        </Box>
      )}
      {attendanceHistory.length > 0 && (
        <Box mt={2}>
          <Typography variant="h4" gutterBottom>
            Attendance History:
          </Typography>
          <ul>
            {attendanceHistory.map((attendance, index) => (
              <li key={index}>
                Date: {attendance.date}, Check-in Time: {attendance.checkInTime}, Check-out Time: {attendance.checkOutTime}
              </li>
            ))}
          </ul>
        </Box>
      )}
    </MainCard>
  );
};

export default AttendanceSystem;
