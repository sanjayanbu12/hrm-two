// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormControl,
//   Grid,
//   MenuItem,
//   Paper,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from '@mui/material';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import MainCard from 'ui-component/cards/MainCard';

// const ApproveLeave = () => {
//   const [leaveList, setLeaveList] = useState([]);
//   const [selectedLeave, setSelectedLeave] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('https://hrm-backend-square.onrender.com/api/leave');
//       setLeaveList(response.data);
//     } catch (error) {
//       console.log('Error retrieving leave data:', error);
//     }
//   };

//   const handleActionChange = async (leaveId, action) => {
//     try {
//       if (action === 'pending') {
//         const selectedLeave = leaveList.find((leave) => leave._id === leaveId);
//         setSelectedLeave(selectedLeave);
//         setOpenDialog(true);
//       } else {
//         await updateLeaveStatus(leaveId, action);
//       }
//     } catch (error) {
//       console.log(`Error ${action === 'approve' ? 'approving' : 'rejecting'} leave:`, error);
//     }
//   };

//   const updateLeaveStatus = async (leaveId, status) => {
//     try {
//       await axios.patch(`https://hrm-backend-square.onrender.com/api/leave/${leaveId}`, { status });
//       fetchData();
//     } catch (error) {
//       console.log(`Error ${status === 'approve' ? 'approving' : 'rejecting'} leave:`, error);
//     }
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleApproveLeave = () => {
//     updateLeaveStatus(selectedLeave._id, 'approve');
//     setOpenDialog(false);
//     navigate('/leavetrackerlist'); // Navigate to the LeaveTrackerList component after leave is approved
//   };

//   const handleRejectLeave = () => {
//     updateLeaveStatus(selectedLeave._id, 'reject');
//     setOpenDialog(false);
//     navigate('/leavetrackerlist'); // Navigate to the LeaveTrackerList component after leave is rejected
//   };

//   const formatId = (id) => {
//     return id.toString().padStart(4, '0');
//   };

//   return (
//     <MainCard title="Approve Leave">
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           {leaveList.length > 0 ? (
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>ID</TableCell>
//                     <TableCell>Leave Type</TableCell>
//                     <TableCell>Start Date</TableCell>
//                     <TableCell>End Date</TableCell>
//                     <TableCell>Reason</TableCell>
//                     <TableCell>Status</TableCell>
//                     <TableCell>Action</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {leaveList.map((leave) => (
//                     <TableRow key={leave._id}>
//                       <TableCell>{formatId(leave._id)}</TableCell>
//                       <TableCell>{leave                      .leaveType}</TableCell>
//                       <TableCell>{leave.startDate}</TableCell>
//                       <TableCell>{leave.endDate}</TableCell>
//                       <TableCell>{leave.reason}</TableCell>
//                       <TableCell>{leave.status}</TableCell>
//                       <TableCell>
//                         <FormControl sx={{ minWidth: 120 }}>
//                           <Select
//                             value=""
//                             onChange={(event) => handleActionChange(leave._id, event.target.value)}
//                             displayEmpty
//                             inputProps={{ 'aria-label': 'Action' }}
//                           >
//                             <MenuItem value="" disabled>
//                               Select Action
//                             </MenuItem>
//                             <MenuItem value="pending">Pending</MenuItem>
//                             <MenuItem value="approve">Approve</MenuItem>
//                             <MenuItem value="reject">Reject</MenuItem>
//                           </Select>
//                         </FormControl>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           ) : (
//             <Box p={2} textAlign="center">
//               No leave requests found.
//             </Box>
//           )}
//         </Grid>
//       </Grid>

//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>Confirm Action</DialogTitle>
//         <DialogContent>
//           Are you sure you want to {selectedLeave ? `approve leave with ID ${selectedLeave._id}` : ''}?
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//           <Button onClick={handleApproveLeave} variant="contained" autoFocus>
//             Approve
//           </Button>
//           <Button onClick={handleRejectLeave} variant="contained" color="error">
//             Reject
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </MainCard>
//   );
// };

// export default ApproveLeave;


import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';

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

  const handleActionChange = async (leaveId, action) => {
    try {
      if (action === 'pending') {
        await axios.put(`https://hrm-backend-square.onrender.com/api/leave/${leaveId}`, { status: 'approved' });
        fetchData();
      } else if (action === 'rejected') {
        await axios.put(`https://hrm-backend-square.onrender.com/api/leave/${leaveId}`, { status: 'rejected' });
        fetchData();
      }
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
                  <Button variant="outlined" onClick={() => handleViewDetails(leave)}>
                    View Details
                  </Button>
                  <Button variant="contained" color="primary" onClick={() => handleActionChange(leave.id, 'pending')}>
                    Approve
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleActionChange(leave.id, 'rejected')}>
                    Reject
                  </Button>
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

