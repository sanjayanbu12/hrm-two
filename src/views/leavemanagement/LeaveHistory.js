import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { DialogActions } from '@mui/material';
import { CheckCircleOutline, CancelOutlined, Visibility, HourglassEmpty, Edit } from '@mui/icons-material';
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
import { useNavigate } from 'react-router-dom';

const LeaveTrackerList = () => {
  const navigate = useNavigate();
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

  const handleEditLeave = () => {
    navigate('/leavetrackerform', { state: selectedLeave });
  };

  return (
    <MainCard title="Applied Leave List">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {leaveTrackerList.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee ID</TableCell>
                    <TableCell>Employee Name</TableCell>
                    <TableCell>Leave Type</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Number of Days</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaveTrackerList.map((leave) => (
                    <TableRow
                      key={leave.employeeId}
                      onClick={() => handleRowClick(leave)}
                      style={{ cursor: 'pointer' }}
                    >
                      <TableCell>{leave.employeeId}</TableCell>
                      <TableCell>{leave.employeeName}</TableCell>
                      <TableCell>{leave.leaveType}</TableCell>
                      <TableCell>{new Date(leave.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(leave.endDate).toLocaleDateString()}</TableCell>
                      <TableCell>{leave.numberOfDays}</TableCell>
                      <TableCell>{leave.reason}</TableCell>
                      <TableCell>
                        {leave.status === 'approved' ? (
                          <CheckCircleOutline style={{ color: 'green' }} />
                        ) : leave.status === 'pending' ? (
                          <HourglassEmpty style={{ color: 'orange' }} />
                        ) : (
                          <Visibility style={{ color: 'grey' }} />
                        )}
                      </TableCell>
                      <TableCell>
                        {leave.status === 'approved' ? (
                          <CheckCircleOutline style={{ color: 'green' }} />
                        ) : (
                          <>
                            <Button onClick={handleRowClick} color="primary">
                              <Visibility style={{ color: 'grey' }} />
                            </Button>
                          </>
                        )}
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
              <Typography variant="body1">Start Date: {new Date(selectedLeave.startDate).toLocaleDateString()}</Typography>
              <Typography variant="body1">End Date: {new Date(selectedLeave.endDate).toLocaleDateString()}</Typography>
              <Typography variant="body1">Reason: {selectedLeave.reason}</Typography>
              <Typography variant="body1">
                Status: {selectedLeave.status === 'pending' ? 'Pending' : selectedLeave.status === 'approved' ? 'Approved' : 'Rejected'}
                {selectedLeave.status === 'approved' && <CheckCircleOutline style={{ color: 'green', marginLeft: '8px' }} />}
                {selectedLeave.status === 'rejected' && <CancelOutlined style={{ color: 'red', marginLeft: '8px' }} />}
                {selectedLeave.status === 'pending' && <HourglassEmpty style={{ color: 'orange', marginLeft: '8px' }} />}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditLeave} color="primary">
            <Edit />
            Edit
          </Button>
          <Button onClick={handleClose} color="inherit">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default LeaveTrackerList;

