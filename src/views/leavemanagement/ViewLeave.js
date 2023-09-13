
import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { DialogActions } from '@mui/material';

import { Edit } from '@mui/icons-material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Tooltip,
} from '@mui/material';
import axios from 'axios';
import { Visibility, CheckCircleOutline, HourglassEmpty, CancelOutlined } from '@mui/icons-material'; // Import status icons
import { useNavigate } from 'react-router-dom';

const ViewLeave = () => {
  const navigate = useNavigate();
  const [leaveTrackerList, setLeaveTrackerList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);

  // Function to display attached files as a list
  const displayAttachments = (attachments) => {
    return (
      <ul>
        {attachments.map((attachment, index) => (
          <li key={index}>
            <a href={attachment.url} target="_blank" rel="noopener noreferrer">
              {attachment.name}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post('https://hrm-backend-square.onrender.com/api/leave');
      const updatedLeaveList = response.data.map((leave) => {
        return { ...leave };
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

  // Function to format date to a shorter format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <MainCard title="Applied Leave List">
      <Box sx={{ overflowX: 'auto' }}>
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
                <TableCell>Attachments</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaveTrackerList.map((leave) => (
                <TableRow
                  key={leave._id}
                  onClick={() => handleRowClick(leave)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell>{leave.employeeId}</TableCell>
                  <TableCell>{leave.employeeName}</TableCell>
                  <TableCell>{leave.leaveType}</TableCell>
                  <TableCell>{formatDate(leave.startDate)}</TableCell>
                  <TableCell>{formatDate(leave.endDate)}</TableCell>
                  <TableCell>{leave.numberOfDays}</TableCell>
                  <TableCell>
                    {leave.attachments && leave.attachments.length > 0 ? (
                      <Tooltip title="View Attachments">
                        <Button
                          onClick={() => handleRowClick(leave)}
                          color="primary"
                        >
                          <Visibility style={{ color: 'grey' }} />
                        </Button>
                      </Tooltip>
                    ) : (
                      'No Attachments'
                    )}
                  </TableCell>
                  <TableCell>{leave.reason}</TableCell>
                  <TableCell>
                    {leave.status === 'approved' ? (
                      <CheckCircleOutline style={{ color: 'green' }} />
                    ) : leave.status === 'rejected' ? (
                      <CancelOutlined style={{ color: 'red' }} />
                    ) : (
                      <HourglassEmpty style={{ color: 'orange' }} />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button onClick={handleRowClick} color="primary">
                      <Visibility style={{ color: 'grey' }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Leave Details</DialogTitle>
        <DialogContent>
          {selectedLeave && (
            <Box>
              <Typography variant="body1">Employee ID: {selectedLeave.employeeId}</Typography>
              <Typography variant="body1">Employee Name: {selectedLeave.employeeName}</Typography>
              <Typography variant="body1">Leave Type: {selectedLeave.leaveType}</Typography>
              <Typography variant="body1">Start Date: {formatDate(selectedLeave.startDate)}</Typography>
              <Typography variant="body1">End Date: {formatDate(selectedLeave.endDate)}</Typography>
              <Typography variant="body1">Number of Days: {selectedLeave.numberOfDays}</Typography>
              <Typography variant="body1">Attachments:</Typography>
              {selectedLeave.attachments && displayAttachments(selectedLeave.attachments)}
              <Typography variant="body1">Reason: {selectedLeave.reason}</Typography>
              <Typography variant="body1">Status: {selectedLeave.status}</Typography>
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

export default ViewLeave;