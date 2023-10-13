import React from 'react'
import { useState,useEffect } from 'react';
// import { useSelector } from 'react-redux';
import axios from 'axios';
// import {TextSnippet } from '@mui/icons-material';
import jsPDF from 'jspdf';
import MaterialTable from 'material-table';
import tableIcons from 'views/addemployeetable/MaterialTableIcons';



const AtttendanceTab = () => {
    // const authId = useSelector((state) => state.customization.authId);

    const [employee, setEmployee] = useState([]);
    
  
    console.log(employee)
   
    const columns = [
        { title: 'Name', field: 'name' }, 
        { title: 'Date', field: 'date' },
        { title: 'Checkin Time', field: 'checkInTime' },
        { title: 'Checkout Time', field: 'checkOutTime' },
        { title: 'Working Hours', field: 'workingHours' } 
      ];
      const formatTime = (timestamp) => {
        if (!timestamp) return ''; // Handle cases where timestamp is not available
      
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
      
        // Convert hours from 24-hour format to 12-hour format
        const formattedHours = hours % 12 || 12;
      
        // Ensure that minutes are displayed with leading zeros (e.g., 05)
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
      };
      const calculateWorkingHours = (checkInTime, checkOutTime) => {
        if (!checkInTime || !checkOutTime) return ''; // Handle cases where timestamps are not available
      
        const checkIn = new Date(checkInTime);
        const checkOut = new Date(checkOutTime);
      
        const millisecondsDiff = checkOut - checkIn;
        const hours = Math.floor(millisecondsDiff / 3600000); // 3600000 ms = 1 hour
        const minutes = Math.floor((millisecondsDiff % 3600000) / 60000); // 60000 ms = 1 minute
      
        return `${hours} hours ${minutes} minutes`;
      };
      const fetchEmployee = async () => {
        try {
          const res = await axios.get("https://hrm-backend-square.onrender.com/api/allemployee");
          
          const allEmployeeData = res.data.map(matchingEmployee => {
            const clockData = matchingEmployee.clockid || [];
            return clockData.map(clockData => ({
              name: matchingEmployee.name,
              date: formatDate(clockData.date),
              checkInTime: formatTime(clockData.checkInTime),
              checkOutTime: formatTime(clockData.checkOutTime),
              workingHours: calculateWorkingHours(clockData.checkInTime, clockData.checkOutTime),
            }));
          });
      
          // Flatten the array to get a single list of all clock data
          const flattenedEmployeeData = [].concat(...allEmployeeData);
      
          setEmployee(flattenedEmployeeData);
        } catch (error) {
          console.log(error);
        }
      };
      const formatDate = (timestamp) => {
        if (!timestamp) return ''; // Handle cases where timestamp is not available
      
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
      
        return `${year}-${month}-${day}`;
      };
 
    useEffect(() => {
        fetchEmployee();
    }, []);
    // const formatData = () => {
    //     const formattedData = [];
    //     // Add employee data to formattedData
    //     if (fullemp) {
    //       formattedData.push({
    //         name: fullemp.name,
    //         date: '', // You can add an empty string for non-employee rows
    //         checkInTime: '',
    //         checkOutTime: '',
    //         workingHours: '',
    //       });
    //     }
    
    //     // Add clock data to formattedData
    //     if (employee && employee.length > 0) {
    //       formattedData.push(...employee.map(clockData => ({
    //         name: clockData.name,
    //         date: clockData.date,
    //         checkInTime: clockData.checkInTime,
    //         checkOutTime: clockData.checkOutTime,
    //         workingHours: '', // You may need to calculate this value
    //       })));
    //     }
    
    //     return formattedData;
    //   };
    const exportCsv = (data) => {
        const csvData = data.map((item) => ({
            name: item.name,
            Date: item.Date,
           CheckinTime : item.CheckinTime,
            CheckoutTime: item.CheckoutTime,
            Workinghours: item.Workinghours,
           
        }));
        const csvHeaders = csvColumns.map((column) => column);
        const csvRows = [csvHeaders, ...csvData.map((item) => Object.values(item).map((value) => `"${value}"`))];
        const csvContent = csvRows.map((row) => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Selected Candidate');
        link.click();
      };
      const exportPdf = (columns, data) => {
        const pdf = new jsPDF('landscape');
        pdf.text('Selected Candidate', 10, 10);
    

        const rows = data.map((item) => [
          item.name,
          item.Date,
          item.CheckinTime,
          item.CheckoutTime,
          item.Workinghours,
      
        ]);
        const columnStyle = {
          0: { columnWidth: 50 },
          1: { columnWidth: 50 },
          2: { columnWidth: 50 },
          3: { columnWidth: 50 },
          4: { columnWidth: 50 },
        };
        const pdfHeaders = [
          'name',
          'Date',
          'CheckinTime',
          'CheckoutTime',
          'Working hours',
        
         
        ];
        pdf.autoTable({
          head: [pdfHeaders],
          body: rows,
          startY: 20,
          columnStyle: columnStyle,
          theme: 'grid'
        });
    
        pdf.save('Selected_candidate.pdf');
      };

    // const sample = employee?.map((e) => e.checkInTime);
    // console.log("individual", sample);

  return (
    <div>
    <MaterialTable
      raised={true}
      title={<div style={{ fontWeight: 'bold', fontSize: '20px' }}>Attendance</div>}
      columns={columns}
    //   data={formatData()} // Pass the 'employee' state as the data
    data={employee}
      icons={tableIcons}
      style={{ boxShadow: '0px 2px 4px rgba(1, 1, 1, 1)' }}
      options={{
        actionsColumnIndex: 6,
        exportButton: true,
        exportCsv: exportCsv,
        exportPdf: exportPdf,
        grouping: true,
        headerStyle: {
          background: 'linear-gradient(180deg,#3a59af,#352786)',
          color: '#fff'
        },
        headerCellStyle: {
          color: 'white'
        }
      }}
    />
  </div>
);
};

export default AtttendanceTab;