// import React, { useState, useEffect } from 'react';
// import MainCard from 'ui-component/cards/MainCard';
// import { DialogActions } from '@mui/material';
// import { CheckCircleOutline, CancelOutlined, Visibility, HourglassEmpty, Edit } from '@mui/icons-material';
// import {
//   Table,
//   TableCell,
//   TableRow,
//   TableBody,
//   Grid,
//   TableHead,
//   TableContainer,
//   Paper,
//   Box,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Typography,
//   Button,
// } from '@mui/material';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const LeaveTrackerList = () => {
//   const navigate = useNavigate();
//   const [leaveTrackerList, setLeaveTrackerList] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [selectedLeave, setSelectedLeave] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('https://hrm-backend-square.onrender.com/api/leave');
//       const updatedLeaveList = response.data.map((leave) => {
//         const status = leave._id % 2 === 0 ? 'approved' : 'pending';
//         return { ...leave, status };
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

//   return (
//     <MainCard title="Applied Leave List">
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           {leaveTrackerList.length > 0 ? (
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Employee ID</TableCell>
//                     <TableCell>Employee Name</TableCell>
//                     <TableCell>Leave Type</TableCell>
//                     <TableCell>Start Date</TableCell>
//                     <TableCell>End Date</TableCell>
//                     <TableCell>Number of Days</TableCell>
//                     <TableCell>Reason</TableCell>
//                     <TableCell>Status</TableCell>
//                     <TableCell>Action</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {leaveTrackerList.map((leave) => (
//                     <TableRow
//                       key={leave.employeeId}
//                       onClick={() => handleRowClick(leave)}
//                       style={{ cursor: 'pointer' }}
//                     >
//                       <TableCell>{leave.employeeId}</TableCell>
//                       <TableCell>{leave.employeeName}</TableCell>
//                       <TableCell>{leave.leaveType}</TableCell>
//                       <TableCell>{new Date(leave.startDate).toLocaleDateString()}</TableCell>
//                       <TableCell>{new Date(leave.endDate).toLocaleDateString()}</TableCell>
//                       <TableCell>{leave.numberOfDays}</TableCell>
//                       <TableCell>{leave.reason}</TableCell>
//                       <TableCell>
//                         {leave.status === 'approved' ? (
//                           <CheckCircleOutline style={{ color: 'green' }} />
//                         ) : leave.status === 'pending' ? (
//                           <HourglassEmpty style={{ color: 'orange' }} />
//                         ) : (
//                           <Visibility style={{ color: 'grey' }} />
//                         )}
//                       </TableCell>
//                       <TableCell>
//                         {leave.status === 'approved' ? (
//                           <CheckCircleOutline style={{ color: 'green' }} />
//                         ) : (
//                           <>
//                             <Button onClick={handleRowClick} color="primary">
//                               <Visibility style={{ color: 'grey' }} />
//                             </Button>
//                           </>
//                         )}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           ) : (
//             <Typography variant="h5" align="center" color="textSecondary">
//               No leave requests found
//             </Typography>
//           )}
//         </Grid>
//       </Grid>

//       {/* Leave Details Dialog */}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Leave Details</DialogTitle>
//         <DialogContent>
//           {selectedLeave && (
//             <Box>
//               <Typography variant="body1">Employee ID: {selectedLeave.employeeId}</Typography>
//               <Typography variant="body1">Employee Name: {selectedLeave.employeeName}</Typography>
//               <Typography variant="body1">Leave Type: {selectedLeave.leaveType}</Typography>
//               <Typography variant="body1">Start Date: {new Date(selectedLeave.startDate).toLocaleDateString()}</Typography>
//               <Typography variant="body1">End Date: {new Date(selectedLeave.endDate).toLocaleDateString()}</Typography>
//               <Typography variant="body1">Reason: {selectedLeave.reason}</Typography>
//               <Typography variant="body1">
//                 Status: {selectedLeave.status === 'pending' ? 'Pending' : selectedLeave.status === 'approved' ? 'Approved' : 'Rejected'}
//                 {selectedLeave.status === 'approved' && <CheckCircleOutline style={{ color: 'green', marginLeft: '8px' }} />}
//                 {selectedLeave.status === 'rejected' && <CancelOutlined style={{ color: 'red', marginLeft: '8px' }} />}
//                 {selectedLeave.status === 'pending' && <HourglassEmpty style={{ color: 'orange', marginLeft: '8px' }} />}
//               </Typography>
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

// export default LeaveTrackerList;


import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const LeaveCalendar = () => {
  const totalEmployees = 50;
  const [presentDropdownVisible, setPresentDropdownVisible] = useState(false);
  const [absentDropdownVisible, setAbsentDropdownVisible] = useState(false);

  const presentEmployees = [
    { id: 1, name: 'Sanjay', role: 'Full Stack Developer' },
    { id: 2, name: 'Ajay', role: 'Software Developer' },
    { id: 2, name: 'Sundar', role: 'Front eb Developer' },
    // Add more employees here
  ];

  const absentEmployees = [
    { id: 3, name: 'Kishore', role: 'Buisness Developmet' },
    { id: 4, name: 'Sundar', role: 'Human Resources Management ' },
    // Add more employees here
  ];

  const toggleDropdown = (type) => {
    if (type === 'present') {
      setPresentDropdownVisible(!presentDropdownVisible);
    } else if (type === 'absent') {
      setAbsentDropdownVisible(!absentDropdownVisible);
    }
  };

  const renderEmployeeDropdown = (employees) => {
    return (
      <div
        style={{
          backgroundColor: '#f9f9f9',
          borderRadius: '4px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          padding: '10px',
        }}
      >
        {employees.map((employee) => (
          <div key={employee.id} className="employee">
            {employee.name} - {employee.role}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          width: '400px',
          transition: 'box-shadow 0.3s, transform 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
          e.currentTarget.style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.1)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <h1
          style={{
            marginTop: 0,
            color: '#333333',
          }}
        >
          Attendance Card
        </h1>
        <div
          style={{
            marginBottom: '10px',
            color: '#555555',
          }}
        >
          Total Employees: {totalEmployees}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '15px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#27ae60',
                cursor: 'pointer',
                backgroundColor: 'transparent',
                border: 'none',
                transition: 'color 0.3s',
                fontWeight: 'bold',
              }}
              onClick={() => toggleDropdown('present')}
            >
              <FaCheckCircle size={18} style={{ marginRight: '4px' }} /> <span style={{ textDecoration: 'underline', textDecorationColor: '#27ae60' }}>Present</span> ({presentEmployees.length})
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#c0392b',
                cursor: 'pointer',
                backgroundColor: 'transparent',
                border: 'none',
                transition: 'color 0.3s',
                fontWeight: 'bold',
              }}
              onClick={() => toggleDropdown('absent')}
            >
              <FaTimesCircle size={18} style={{ marginRight: '4px' }} /> <span style={{ textDecoration: 'underline', textDecorationColor: '#c0392b' }}>Absent</span> ({absentEmployees.length})
            </button>
          </div>
        </div>
        <div>
          {presentDropdownVisible && (
            <div
              className="present-dropdown visible"
              style={{
                backgroundColor: '#f9f9f9',
                borderRadius: '4px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                padding: '10px',
              }}
            >
              {renderEmployeeDropdown(presentEmployees)}
            </div>
          )}
          {absentDropdownVisible && (
            <div
              className="absent-dropdown visible"
              style={{
                backgroundColor: '#f9f9f9',
                borderRadius: '4px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                padding: '10px',
              }}
            >
              {renderEmployeeDropdown(absentEmployees)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveCalendar;
