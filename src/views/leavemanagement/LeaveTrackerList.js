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
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { GridDeleteIcon } from '@mui/x-data-grid';
import axios from 'axios';
import Swal from 'sweetalert2';
import AddIcon from '@mui/icons-material/Add';
import { Edit } from '@mui/icons-material';

const LeaveTrackerList = () => {
  const [leaveTrackerList, setLeaveTrackerList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('API_ENDPOINT_HERE'); // Replace 'API_ENDPOINT_HERE' with the actual API endpoint to fetch leave tracker data
      setLeaveTrackerList(response.data.getData);
    } catch (error) {
      console.log('Error retrieving leave tracker data:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLeave(null);
  };

  const handleDelete = (id) => {
    handleClose();
    Swal.fire({
      icon: 'warning',
      text: 'Are you sure you want to delete this leave entry?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`API_ENDPOINT_HERE/${id}`); // Replace 'API_ENDPOINT_HERE' with the actual API endpoint to delete a leave entry
          await fetchData();
          handleClose();
          navigate('/leavetrackerlist');
          Swal.fire({
            icon: 'success',
            text: 'Leave entry deleted successfully.'
          });
        } catch (error) {
          console.log('Error deleting leave entry:', error);
        }
      }
    });
  };

  const handleView = (id) => {
    const selectedLeave = leaveTrackerList.find((leave) => leave._id === id);
    setSelectedLeave(selectedLeave);
    setOpen(true);
  };

  return (
    <MainCard title="Leave Tracker Table">
      <div>
        <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: 'flex' }}>
          <Button
            onClick={() => {
              navigate('/leavetrackerform'); // Replace '/LeaveForm' with the actual path to the leave form
            }}
            sx={{
              padding: 0.6,
              background: '#673ab7',
              color: '#efebe9',
              '&:hover': {
                color: theme.palette.secondary.light,
                background: 'green'
              }
            }}
          >
            <AddIcon />
            Add New Leave
          </Button>
        </Box>
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
                      <TableCell>Number of Days</TableCell>
                      <TableCell>Reason</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>File</TableCell>
                      <TableCell>Requirements</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leaveTrackerList.map((leave) => (
                      <TableRow
                        key={leave._id}
                        onClick={() => {
                          handleView(leave._id);
                        }}
                      >
                        <TableCell>{leave._id}</TableCell>
                        <TableCell>{leave.leaveType}</TableCell>
                        <TableCell>{leave.startDate}</TableCell>
                        <TableCell>{leave.endDate}</TableCell>
                        <TableCell>{leave.numOfDays}</TableCell>
                        <TableCell>{leave.reason}</TableCell>
                        <TableCell>{leave.status}</TableCell>
                        <TableCell>
                          {leave.file ? (
                            <a href={leave.file} target="_blank" rel="noopener noreferrer">
                              View File
                            </a>
                          ) : (
                            'N/A'
                          )}
                        </TableCell>
                        <TableCell>{leave.requirements}</TableCell>
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
      </div>

      {/* Dialog Box */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        {selectedLeave && (
          <>
            <DialogTitle variant="h2">Leave Details</DialogTitle>
            <DialogContent>
              <Typography sx={{ lineHeight: '1' }} variant="h3" component="h4">
                Leave Type: {selectedLeave.leaveType}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="h5" component="h1">
                Start Date: {selectedLeave.startDate}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="h5" component="h3">
                End Date: {selectedLeave.endDate}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="h5" component="h3">
                Number of Days: {selectedLeave.numOfDays}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="h5" component="h3">
                Reason: {selectedLeave.reason}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="h5" component="h3">
                Status: {selectedLeave.status}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="h5" component="h3">
                File: {selectedLeave.file ? (
                  <a href={selectedLeave.file} target="_blank" rel="noopener noreferrer">
                    View File
                  </a>
                ) : (
                  'N/A'
                )}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="h5" component="h3">
                Requirements: {selectedLeave.requirements}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                <Button variant="outlined" endIcon={<Edit />}>
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(selectedLeave._id)}
                  startIcon={<GridDeleteIcon />}
                >
                  Delete
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
