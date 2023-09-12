
// import MaterialTable from 'material-table';
// import tableIcons from './MaterialTableIcons';
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router';
// import axios from 'axios';

// const columns = [
//   { title: 'Employee ID', field: 'employeeId' },
//   { title: 'Employee Name', field: 'employeeName' },
//   { title: 'Leave Type', field: 'leaveType' },
//   { title: 'Start Date', field: 'startDate' },
//   { title: 'End Date', field: 'endDate' },
//   { title: 'Number of Days', field: 'numberOfDays' },
//   { title: 'Attachments', field: 'attachments' },
//   { title: 'Reason', field: 'reason' },
//   { title: 'Status', field: 'status' },
// ];

// export const LeaveTable = () => {
//   const [leaveData, setLeaveData] = useState([]);
//   const navigate = useNavigate();

//   const fetchLeaveData = async () => {
//     try {
//       const response = await axios.get('YOUR_LEAVE_API_ENDPOINT_HERE');
//       const leaveRecords = response.data.reverse(); // Reverse the data if needed
//       setLeaveData(leaveRecords);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleView = async (e, data) => {
//     const id = data.map((x) => x._id);
//     console.log(id[0]);
//     // You can navigate to the details page for the selected leave record here
//     // Example: navigate(`/leave/details/${id[0]}`);
//   };

//   useEffect(() => {
//     fetchLeaveData();
//   }, []);

//   return (
//     <MaterialTable
//       title={<div style={{ fontWeight: 'bold', fontSize: '20px' }}>Leave Table</div>}
//       columns={columns}
//       data={leaveData}
//       icons={tableIcons}
//       actions={[
//         {
//           icon: tableIcons.Edit,
//           tooltip: 'View Details',
//           onClick: (event, rowData) => handleView(event, rowData),
//         },
//         // Add more actions as needed
//       ]}
//       options={{
//         actionsColumnIndex: columns.length, // Adjust based on your actions
//         exportButton: true,
//         grouping: true,
//         selection: true,
//       }}
//     />
//   );
// };

import MaterialTable from 'material-table';
import tableIcons from './MaterialTableIcons';
import { useState, useEffect } from 'react';
import axios from 'axios';

const columns = [
  { title: 'Employee ID', field: 'employeeId' },
  { title: 'Employee Name', field: 'employeeName' },
  { title: 'Leave Type', field: 'leaveType' },
  { title: 'Start Date', field: 'startDate' },
  { title: 'End Date', field: 'endDate' },
  { title: 'Number of Days', field: 'numberOfDays' },
  { title: 'Attachments', field: 'attachments' },
  { title: 'Reason', field: 'reason' },
  { title: 'Status', field: 'status' },
];

export const LeaveTable = () => {
  const [leaveData, setLeaveData] = useState([]);

  const fetchLeaveData = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/api/leave/');
      const leaveRecords = response.data.reverse(); // Reverse the data if needed
      setLeaveData(leaveRecords);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const createLeaveRecord = async (newData) => {
    try {
      // Perform a POST request to create a new leave record
      const response = await axios.post('https://hrm-backend-square.onrender.com/api/leave/', newData);
      const createdRecord = response.data;

      // Update the state to include the newly created record
      setLeaveData((prevState) => [createdRecord, ...prevState]);

      // You can handle success messages or navigation here
    } catch (error) {
      console.log(error);
      // Handle errors, e.g., display an error message
    }
  };

  return (
    <MaterialTable
      title={<div style={{ fontWeight: 'bold', fontSize: '20px' }}>Leave Table</div>}
      columns={columns}
      data={leaveData}
      icons={tableIcons}
      options={{
        actionsColumnIndex: columns.length, // Adjust based on your actions
        exportButton: true,
        grouping: true,
        selection: true,
      }}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            createLeaveRecord(newData);
            resolve();
          }),
        // Add more editable actions as needed (update and delete)
      }}
    />
  );
};
