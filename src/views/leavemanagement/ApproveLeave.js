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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ApproveLeave = () => {
  const [leaveList, setLeaveList] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/api/leave');
      setLeaveList(response.data);
    } catch (error) {
      console.log('Error retrieving leave data:', error);
    }
  };

  const handleActionChange = async (leaveId, action) => {
    try {
      if (action === 'pending') {
        const selectedLeave = leaveList.find((leave) => leave._id === leaveId);
        setSelectedLeave(selectedLeave);
        setOpenDialog(true);
      } else {
        await updateLeaveStatus(leaveId, action);
      }
    } catch (error) {
      console.log(`Error ${action === 'approve' ? 'approving' : 'rejecting'} leave:`, error);
    }
  };

  const updateLeaveStatus = async (leaveId, status) => {
    try {
      await axios.patch(`https://hrm-backend-square.onrender.com/api/leave/${leaveId}`, { status });
      fetchData();
    } catch (error) {
      console.log(`Error ${status === 'approve' ? 'approving' : 'rejecting'} leave:`, error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleApproveLeave = () => {
    updateLeaveStatus(selectedLeave._id, 'approve');
    setOpenDialog(false);
    navigate('/leavetrackerlist'); // Navigate to the LeaveTrackerList component after leave is approved
  };

  const handleRejectLeave = () => {
    updateLeaveStatus(selectedLeave._id, 'reject');
    setOpenDialog(false);
    navigate('/leavetrackerlist'); // Navigate to the LeaveTrackerList component after leave is rejected
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
                    <TableCell style={{ paddingLeft: '10px' }}>Status</TableCell> {/* Apply left padding */}
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
                              <MenuItem value="pending">Pending</MenuItem>
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

      {/* Leave Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Leave Details</DialogTitle>
        <DialogContent>
          {selectedLeave && (
            <div>
              <p>Leave ID: {formatId(selectedLeave._id)}</p>
              <p>Leave Type: {selectedLeave.leaveType}</p>
              <p>Start Date: {selectedLeave.startDate}</p>
              <p>End Date: {selectedLeave.endDate}</p>
              <p>Reason: {selectedLeave.reason}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApproveLeave} color="primary">
            Approve
          </Button>
          <Button onClick={handleRejectLeave} color="secondary">
            Reject
          </Button>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default ApproveLeave;
