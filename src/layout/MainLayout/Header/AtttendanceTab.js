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
      
    
      console.log("Attendance Table",employee)
    
      const columns = [
          { title: 'Name', field: 'name' }, 
          { title: 'Date', field: 'date' },
          { title: 'Checkin Time', field: 'checkInTime' },
          { title: 'Checkout Time', field: 'checkOutTime' },
          { title: 'Working Hours', field: 'workingHours' },
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
        const calculateWorkingHours = (checkInTime, checkOutTime, breakTime) => {
          if (!checkInTime || !checkOutTime) return ''; // Handle cases where timestamps are not available
        
          const checkIn = new Date(checkInTime);
          const checkOut = new Date(checkOutTime);
        
          const millisecondsDiff = checkOut - checkIn;
          const hours = Math.floor(millisecondsDiff / 3600000); // 3600000 ms = 1 hour
          const minutes = Math.floor((millisecondsDiff % 3600000) / 60000); // 60000 ms = 1 minute
        
          // Calculate total minutes
          const totalMinutes = hours * 60 + minutes;
        
          // Subtract break time
          const breakHours = Math.floor(breakTime / 60);
          const breakMinutes = breakTime % 60;
        
          const workingHours = totalMinutes - (breakHours * 60 + breakMinutes);
        
          return `${Math.floor(workingHours / 60)} hours ${workingHours % 60} minutes`;
        };
        const calculateBreakTime = (breaks) => {
          if (!breaks || breaks.length === 0) return 0; // Return 0 minutes if breaks are not available
        
          let totalBreakTimeMinutes = 0;
        
          breaks.forEach((breakData) => {
            if (breakData.breakin && breakData.breakout) {
              const breakInTime = new Date(breakData.breakin);
              const breakOutTime = new Date(breakData.breakout);
        
              const millisecondsDiff = breakOutTime - breakInTime;
              const minutes = Math.floor(millisecondsDiff / 60000); // 60000 ms = 1 minute
        
              totalBreakTimeMinutes += minutes;
            }
          });
        
          return totalBreakTimeMinutes;
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
                breakin:formatTime(clockData.break.map(data=>data.breakin)),
                breakout:formatTime(clockData.break.map(data=>data.breakout)),
                workingHours: calculateWorkingHours(clockData.checkInTime, clockData.checkOutTime, calculateBreakTime(clockData.break)),
              }));
            });
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
              date: item.date,
              checkInTime : item.checkInTime,
              checkOutTime: item.checkOutTime,
              workingHours: item.workingHours,
            
          }));
          const csvHeaders = csvColumns.map((column) => column);
          const csvRows = [csvHeaders, ...csvData.map((item) => Object.values(item).map((value) => `"${value}"`))];
          const csvContent = csvRows.map((row) => row.join(',')).join('\n');
          const blob = new Blob([csvContent], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Attendance List');
          link.click();
        };
        const exportPdf = (columns, data) => {
          const pdf = new jsPDF('landscape');
          pdf.text('Attendance List', 10, 10);
      

          const rows = data.map((item) => [
            item.name,
            item.date,
            item.checkInTime,
            item.checkOutTime,
            item.workingHours,
        
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
            'date',
            'checkInTime',
            'checkOutTime',
            'Working hours',
          
          
          ];
          pdf.autoTable({
            head: [pdfHeaders],
            body: rows,
            startY: 20,
            columnStyle: columnStyle,
            theme: 'grid'
          });
      
          pdf.save('Attendance List.pdf');
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