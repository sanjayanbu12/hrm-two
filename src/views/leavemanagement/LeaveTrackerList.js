import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { DialogActions } from '@mui/material';
import { CheckCircleOutline, CancelOutlined } from '@mui/icons-material';
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
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  
} from '@mui/material';
import axios from 'axios';

const LeaveTrackerList = () => {
  const [leaveTrackerList, setLeaveTrackerList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/api/leave');
      const updatedLeaveList = response.data.map((leave) => {
        const status = leave._id % 2 === 0 ? 'approved' : 'pending';
        return { ...leave, status };
      });
      setLeaveTrackerList(updatedLeaveList);
    } catch (error) {
      console.log('Error retrieving leave tracker data:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLeave(null);
  };

  const handleRowClick = (leave) => {
    setSelectedLeave(leave);
    setOpen(true);
  };

  const handleApproveLeave = () => {
    // Perform API call to update the leave status as approved
    // You can use the selectedLeave._id or any other identifier to identify the leave entry

    // Assuming the API call is successful, update the status in the local state
    setLeaveTrackerList((prevList) =>
      prevList.map((leave) => {
        if (leave._id === selectedLeave._id) {
          return { ...leave, status: 'approved' };
        }
        return leave;
      })
    );

    handleClose();
  };

  const handleRejectLeave = () => {
    // Perform API call to update the leave status as rejected
    // You can use the selectedLeave._id or any other identifier to identify the leave entry

    // Assuming the API call is successful, update the status in the local state
    setLeaveTrackerList((prevList) =>
      prevList.map((leave) => {
        if (leave._id === selectedLeave._id) {
          return { ...leave, status: 'rejected' };
        }
        return leave;
      })
    );

    handleClose();
  };

  return (
    <MainCard title="Leave Tracker Table">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {leaveTrackerList.length > 0 ? (
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
                  {leaveTrackerList.map((leave) => (
                    <TableRow
                      key={leave._id}
                      onClick={() => handleRowClick(leave)}
                      style={{ cursor: 'pointer' }}
                    >
                      <TableCell>{leave._id}</TableCell>
                      <TableCell>{leave.leaveType}</TableCell>
                      <TableCell>{leave.startDate}</TableCell>
                      <TableCell>{leave.endDate}</TableCell>
                      <TableCell>{leave.reason}</TableCell>
                  <TableCell>
                    {leave.status === 'pending' && <CheckCircleOutline style={{ color: 'orange' }} />}
                    {leave.status === 'approved' && <CheckCircleOutline style={{ color: 'green' }} />}
                    {leave.status === 'rejected' && <CancelOutlined style={{ color: 'red' }} />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h5" align="center" color="textSecondary">
          No leave requests found
        </Typography>
      )}
    </Grid>
  </Grid>

  {/* Leave Details Dialog */}
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Leave Details</DialogTitle>
    <DialogContent>
      {selectedLeave && (
        <Box>
          <Typography variant="body1">Employee ID: {selectedLeave.employeeId}</Typography>
          <Typography variant="body1">Employee Name: {selectedLeave.employeeName}</Typography>
          <Typography variant="body1">Leave Type: {selectedLeave.leaveType}</Typography>
          <Typography variant="body1">Start Date: {selectedLeave.startDate}</Typography>
          <Typography variant="body1">End Date: {selectedLeave.endDate}</Typography>
          <Typography variant="body1">Reason: {selectedLeave.reason}</Typography>
        </Box>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="inherit">
        Close
      </Button>
      {selectedLeave && selectedLeave.status === 'pending' && (
        <>
          <Button onClick={handleApproveLeave} color="success">
            Approve
          </Button>
          <Button onClick={handleRejectLeave} color="error">
            Reject
          </Button>
        </>
      )}
    </DialogActions>
  </Dialog>
</MainCard>
);
};

export default LeaveTrackerList;