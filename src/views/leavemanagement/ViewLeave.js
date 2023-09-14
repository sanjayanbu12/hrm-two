// import React, { useState, useEffect } from 'react';
// import MainCard from 'ui-component/cards/MainCard';
// import { DialogActions } from '@mui/material';

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Box,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Typography,
//   Button,
//   Tooltip,
//   TextField, // Add TextField for search
//   InputAdornment,
// } from '@mui/material';
// import axios from 'axios';
// import { Visibility, CheckCircleOutline, HourglassEmpty, CancelOutlined } from '@mui/icons-material'; // Import status icons
// import { useNavigate } from 'react-router-dom';
// import { CSVLink } from "react-csv"; // Import CSVLink

// const ViewLeave = () => {
//   const navigate = useNavigate();
//   const [leaveTrackerList, setLeaveTrackerList] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [selectedLeave, setSelectedLeave] = useState(null);
//   const [searchText, setSearchText] = useState(''); // Add search text state

//   // Function to display attached files as a list
//   const displayAttachments = (attachments) => {
//     return (
//       <ul>
//         {attachments.map((attachment, index) => (
//           <li key={index}>
//             <a href={attachment.url} target="_blank" rel="noopener noreferrer">
//               {attachment.name}
//             </a>
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   // Function to format date to a shorter format
//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.post('https://hrm-backend-square.onrender.com/api/leave');
//       const updatedLeaveList = response.data.map((leave) => {
//         return { ...leave };
//       });
//       setLeaveTrackerList(updatedLeaveList);
//     } catch (error) {
//       console.log('Error retrieving leave tracker data:', error);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedLeave(null);
//   };

//   const handleRowClick = (leave) => {
//     setSelectedLeave(leave);
//     setOpen(true);
//   };

//   const handleEditLeave = () => {
//     navigate('/leavetrackerform', { state: selectedLeave });
//   };

//   const handleSearch = (event) => {
//     setSearchText(event.target.value);
//   };

//   // Filter the leaveTrackerList based on searchText
//   const filteredLeaveList = leaveTrackerList.filter((leave) => {
//     const lowerSearchText = searchText.toLowerCase();
//     return (
//       leave.employeeId.toLowerCase().includes(lowerSearchText) ||
//       leave.employeeName.toLowerCase().includes(lowerSearchText) ||
//       leave.leaveType.toLowerCase().includes(lowerSearchText) ||
//       leave.reason.toLowerCase().includes(lowerSearchText) ||
//       leave.status.toLowerCase().includes(lowerSearchText)
//     );
//   });

//   return (
//     <MainCard title="Applied Leave List">
//       <Box sx={{ overflowX: 'auto' }}>
//         {/* Search input */}
//         <TextField
//           label="Search"
//           variant="outlined"
//           value={searchText}
//           onChange={handleSearch}
//           size="small"
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//         {/* CSV export link */}
//         <CSVLink data={filteredLeaveList} filename={"leave_tracker.csv"}>Export CSV</CSVLink>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Employee ID</TableCell>
//                 <TableCell>Employee Name</TableCell>
//                 <TableCell>Leave Type</TableCell>
//                 <TableCell>Start Date</TableCell>
//                 <TableCell>End Date</TableCell>
//                 <TableCell>Number of Days</TableCell>
//                 <TableCell>Attachments</TableCell>
//                 <TableCell>Reason</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredLeaveList.map((leave) => (
//                 <TableRow
//                   key={leave._id}
//                   onClick={() => handleRowClick(leave)}
//                   style={{ cursor: 'pointer' }}
//                 >
//                   <TableCell>{leave.employeeId}</TableCell>
//                   <TableCell>{leave.employeeName}</TableCell>
//                   <TableCell>{leave.leaveType}</TableCell>
//                   <TableCell>{formatDate(leave.startDate)}</TableCell>
//                   <TableCell>{formatDate(leave.endDate)}</TableCell>
//                   <TableCell>{leave.numberOfDays}</TableCell>
//                   <TableCell>
//                     {leave.attachments && leave.attachments.length > 0 ? (
//                       <Tooltip title="View Attachments">
//                         <Button
//                           onClick={() => handleRowClick(leave)}
//                           color="primary"
//                         >
//                           <Visibility style={{ color: 'grey' }} />
//                         </Button>
//                       </Tooltip>
//                     ) : (
//                       'No Attachments'
//                     )}
//                   </TableCell>
//                   <TableCell>{leave.reason}</TableCell>
//                   <TableCell>
//                     {leave.status === 'approved' ? (
//                       <CheckCircleOutline style={{ color: 'green' }} />
//                     ) : leave.status === 'rejected' ? (
//                       <CancelOutlined style={{ color: 'red' }} />
//                     ) : (
//                       <HourglassEmpty style={{ color: 'orange' }} />
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     <Button onClick={handleRowClick} color="primary">
//                       <Visibility style={{ color: 'grey' }} />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Leave Details</DialogTitle>
//         <DialogContent>
//           {selectedLeave && (
//             <Box>
//               <Typography variant="body1">Employee ID: {selectedLeave.employeeId}</Typography>
//               <Typography variant="body1">Employee Name: {selectedLeave.employeeName}</Typography>
//               <Typography variant="body1">Leave Type: {selectedLeave.leaveType}</Typography>
//               <Typography variant="body1">Start Date: {formatDate(selectedLeave.startDate)}</Typography>
//               <Typography variant="body1">End Date: {formatDate(selectedLeave.endDate)}</Typography>
//               <Typography variant="body1">Number of Days: {selectedLeave.numberOfDays}</Typography>
//               <Typography variant="body1">Attachments:</Typography>
//               {selectedLeave.attachments && displayAttachments(selectedLeave.attachments)}
//               <Typography variant="body1">Reason: {selectedLeave.reason}</Typography>
//               <Typography variant="body1">Status: {selectedLeave.status}</Typography>
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleEditLeave} color="primary">
//             <Edit />
//             Edit
//           </Button>
//           <Button onClick={handleClose} color="inherit">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </MainCard>
//   );
// };

// export default ViewLeave;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { Grid } from '@mui/material';
import { TextField, InputAdornment } from '@mui/material';
import { Pagination } from '@mui/lab';
import { CSVLink } from 'react-csv';
import SearchIcon from '@mui/icons-material/Search';

const ViewLeave = () => {
  const [isLoading, setLoading] = useState(true);
  console.log(isLoading);

  useEffect(() => {
    setLoading(false);
  }, []);

  const theme = useTheme();
  const navigate = useNavigate();
  const [ldata, setLdata] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const fetchLeaveData = async () => {
    const res = await axios.get(`https://hrm-backend-square.onrender.com/api/leave`);
    console.log(res.data);
    setLdata(res.data.reverse());
  };

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };

  const filteredLeaveData = ldata.filter((leave) => {
    const lowerSearchText = searchText.toLowerCase();
    return Object.values(leave).some(
      (value) => value && value.toString().toLowerCase().includes(lowerSearchText)
    );
  });

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const idclick = (leaveId) => {
    console.log(leaveId + 'sjs');
    const selectedLeave = ldata.find((data) => data.leaveId === leaveId);
    navigate(`/viewleavedetails/${leaveId}`, { state: { data: selectedLeave } });
  };

  const indexOfLastLeave = currentPage * rowsPerPage;
  const indexOfFirstLeave = indexOfLastLeave - rowsPerPage;
  const currentLeaveData = filteredLeaveData.slice(indexOfFirstLeave, indexOfLastLeave);

  return (
    <>
      <MainCard title="Leave Details">
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid
              container
              spacing={gridSpacing}
              sx={{
                gap: '50px',
                margin: ' 0px 10px',
              }}
            ></Grid>
          </Grid>
        </Grid>

        <div>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              onClick={() => navigate(`/requestleave`)}
              sx={{
                padding: 1.5,
                background: 'rgba(33, 150, 243, 0.04)',
                color: theme.palette.secondary.dark,
                '&:hover': {
                  color: theme.palette.secondary.dark,
                },
                top: '40px',
              }}
            >
              Request Leave
            </Button>
            <CSVLink data={ldata}>Export</CSVLink>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              mb: 2,
              display: 'flex',
            }}
          >
            <TextField
              label="Search"
              variant="outlined"
              value={searchText}
              onChange={handleSearch}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                top: '-20px',
              }}
            />
          </Box>
        </div>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Leave ID</TableCell>
                <TableCell align="center">Employee Name</TableCell>
                <TableCell align="center">Leave Type</TableCell>
                <TableCell align="center">Start Date</TableCell>
                <TableCell align="center">End Date</TableCell>
                <TableCell align="center">Number of Days</TableCell>
                <TableCell align="center">Attachments</TableCell>
                <TableCell align="center">Reason</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentLeaveData.length > 0 ? (
                currentLeaveData.map((leave) => (
                  <TableRow key={leave.leaveId}>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      onClick={() => idclick(leave.leaveId)}
                      sx={{ '&:hover': { cursor: 'pointer' } }}
                    >
                      {leave.leaveId}
                    </TableCell>
                    <TableCell
                      align="center"
                      onClick={() => idclick(leave.leaveId)}
                      sx={{ '&:hover': { cursor: 'pointer' } }}
                    >
                      {leave.employeeName}
                    </TableCell>
                    <TableCell align="center">{leave.leaveType}</TableCell>
                    <TableCell align="center">{leave.startDate}</TableCell>
                    <TableCell align="center">{leave.endDate}</TableCell>
                    <TableCell align="center">{leave.numberOfDays}</TableCell>
                    <TableCell align="center">{leave.attachments}</TableCell>
                    <TableCell align="center">{leave.reason}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            mt: 2,
            padding: 1.5,
            background: 'rgba(33, 150, 243, 0.04)',
            color: theme.palette.secondary.dark,
            '&:hover': {
              color: theme.palette.secondary.dark,
            },
          }}
        >
          <Pagination
            count={Math.ceil(filteredLeaveData.length / rowsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </MainCard>
    </>
  );
};

export default ViewLeave;
