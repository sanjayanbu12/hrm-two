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
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LeaveTrackerList = () => {
  const [leaveTrackerList, setLeaveTrackerList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/api/leave'); // Update the API endpoint to the deployed backend's URL
      setLeaveTrackerList(response.data);
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

  const handleEditLeave = (leave) => {
    navigate('/leavetrackerform', { state: { leave } });
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <h3>NO DATA</h3>
          )}
        </Grid>
      </Grid>

      {/* Dialog Box */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        {selectedLeave && (
          <>
            <DialogTitle variant="h2">Leave Details</DialogTitle>
            <DialogContent>
              <Typography variant="h5" component="div">
                <strong>ID:</strong> {selectedLeave._id}
              </Typography>
              <Typography variant="h5" component="div">
                <strong>Leave Type:</strong> {selectedLeave.leaveType}
              </Typography>
              <Typography variant="h5" component="div">
                <strong>Start Date:</strong> {selectedLeave.startDate}
              </Typography>
              <Typography variant="h5" component="div">
                <strong>End Date:</strong> {selectedLeave.endDate}
              </Typography>
              <Typography variant="h5" component="div">
                <strong>Number of Days:</strong> {selectedLeave.numberOfDays}
              </Typography>
              <Typography variant="h5" component="div">
                <strong>Reason:</strong> {selectedLeave.reason}
              </Typography>

              <Box mt={3} display="flex" justifyContent="center">
                <Button variant="outlined" endIcon={<Edit />} onClick={() => handleEditLeave(selectedLeave)}>
                  Edit
                </Button>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </MainCard>
  );
};

export default LeaveTrackerList;