import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  Grid,
  TableHead,
  TableContainer,
  Paper,
  Box,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';

const ApproveLeave = () => {
  const [leaveList, setLeaveList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/api/leave'); // Update the API endpoint to the deployed backend's URL
      setLeaveList(response.data);
    } catch (error) {
      console.log('Error retrieving leave data:', error);
    }
  };

  // ...

const handleActionChange = async (leaveId, action) => {
  try {
    const selectedAction = action; // Store the selected action in a constant variable
    await axios.patch(`https://hrm-backend-square.onrender.com/api/leave/${leaveId}`, { status: selectedAction });
    fetchData();
  } catch (error) {
    console.log(`Error ${action === 'approve' ? 'approving' : 'rejecting'} leave:`, error);
  }
};



  const formatId = (id) => {
    return id.toString().padStart(4, '0');
  };

  return (
    <MainCard title="Approve Leave">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {leaveList.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Leave Type</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaveList.map((leave) => (
                    <TableRow key={leave._id}>
                      <TableCell>{formatId(leave._id)}</TableCell>
                      <TableCell>{leave.leaveType}</TableCell>
                      <TableCell>{leave.startDate}</TableCell>
                      <TableCell>{leave.endDate}</TableCell>
                      <TableCell>{leave.reason}</TableCell>
                      <TableCell>
                        <Box display="flex" justifyContent="space-around">
                          <FormControl>
                            <Select
                              value=""
                              onChange={(event) => handleActionChange(leave._id, event.target.value)}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Action' }}
                            >
                              <MenuItem value="" disabled>
                                Select Action
                              </MenuItem>
                              <MenuItem value="approve">Approve</MenuItem>
                              <MenuItem value="reject">Reject</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <h3>No leave requests to approve</h3>
          )}
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ApproveLeave;
