

import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ApproveLeave = () => {
  const [leaveList, setLeaveList] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

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

  const handleActionChange = async (leaveId, status) => {
    try {
      await axios.put(`https://hrm-backend-square.onrender.com/api/leave/${leaveId}`, { status });
      fetchData();
      handleCloseDialog();
    } catch (error) {
      console.log('Error updating leave:', error);
    }
  };

  const handleViewDetails = (leave) => {
    setSelectedLeave(leave);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedLeave(null);
    setOpenDialog(false);
  };

  return (
    <MainCard title="Approve Leave">
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
            {leaveList.map((leave) => (
              <TableRow key={leave.id}>
                <TableCell>{leave.employeeId}</TableCell>
                <TableCell>{leave.employeeName}</TableCell>
                <TableCell>{leave.leaveType}</TableCell>
                <TableCell>{leave.startDate}</TableCell>
                <TableCell>{leave.endDate}</TableCell>
                <TableCell>{leave.numberOfDays}</TableCell>
                <TableCell>{leave.reason}</TableCell>
                <TableCell>
                  {leave.status === 'approved' ? (
                    <CheckIcon style={{ color: 'green' }} />
                  ) : leave.status === 'rejected' ? (
                    <CloseIcon style={{ color: 'red' }} />
                  ) : (
                    <HourglassEmptyIcon style={{ color: 'orange' }} />
                  )}
                </TableCell>
                <TableCell>
                  <VisibilityIcon onClick={() => handleViewDetails(leave)} style={{ cursor: 'pointer' }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Leave Details</DialogTitle>
        {selectedLeave && (
          <DialogContent>
            <Box>
              <strong>Employee ID:</strong> {selectedLeave.employeeId}
            </Box>
            <Box>
              <strong>Employee Name:</strong> {selectedLeave.employeeName}
            </Box>
            <Box>
              <strong>Leave Type:</strong> {selectedLeave.leaveType}
            </Box>
            <Box>
              <strong>Start Date:</strong> {selectedLeave.startDate}
            </Box>
            <Box>
              <strong>End Date:</strong> {selectedLeave.endDate}
            </Box>
            <Box>
              <strong>Number of Days:</strong> {selectedLeave.numberOfDays}
            </Box>
            <Box>
              <strong>Reason:</strong> {selectedLeave.reason}
            </Box>
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                color="primary"
                startIcon={<CheckIcon />}
                onClick={() => handleActionChange(selectedLeave.id, 'approved')}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<CloseIcon />}
                onClick={() => handleActionChange(selectedLeave.id, 'rejected')}
              >
                Reject
              </Button>
            </Box>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default ApproveLeave;
