import React from 'react'
import { useState,useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import {TextSnippet } from '@mui/icons-material';
import jsPDF from 'jspdf';
import MaterialTable from 'material-table';
import tableIcons from 'views/addemployeetable/MaterialTableIcons';
import _ from 'lodash';
import ApiContext from 'context/api/ApiContext';
import { useContext } from 'react';
// import DatePicker from '@mui/lab/DatePicker';
import nodata from '/Users/surya/Documents/GitHub/hrm-two/src/views/pages/authentication/authentication3/Lotties/NoDataTab'
// C:\Users\surya\Documents\GitHub\hrm-two\src\views\pages\authentication\authentication3\Lotties
import Lottie from 'react-lottie';

const lt1={
  animationData: nodata,
}
const AtttendanceTab = () => {
    // const authId = useSelector((state) => state.customization.authId);

    const [employee, setEmployee] = useState([]);
    const { employeeContextData } = useContext(ApiContext);
    const [selectedDate, setSelectedDate] = useState(new Date()); 
    

    // const containerStyle = {
    
    // };
    
    // const containerStyle = {
    //   position: 'relative',
    // };
  

  
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
          const res = employeeContextData
          
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
          const flattenedEmployeeData = _.flatten(allEmployeeData);
      
          setEmployee(flattenedEmployeeData);
        } catch (error) {
          console.log(error);
        }
      };
      const formatDate = (timestamp) => {
        if (!timestamp) return ''; // Handle ca ses where timestamp is not available
      
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
      
        return `${year}-${month}-${day}`;
      };

    useEffect(() => {
        fetchEmployee();
    }, [employeeContextData]);
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
    const groupedByDate = _.groupBy(employee, 'date');

    const getCurrentDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const renderTableForSelectedDate = () => {
      const formattedSelectedDate = formatDate(selectedDate);
      const dataForSelectedDate = groupedByDate[formattedSelectedDate];
    
      if (!dataForSelectedDate || dataForSelectedDate.length === 0) {
        return (
          <div>
           <input
             max={formatDate(new Date())}
  type='date'
  value={selectedDate}
  onChange={(event) => setSelectedDate(event.target.value)}
  
/>
<div style={{ marginTop: '100px' }}>
  <Lottie
    options={lt1}
    height="400px"
    width="400px"
  />
</div>
          </div>
        );
      }
  
      return (
       

     
        <div >
          <input
          type='date'
          value={selectedDate}
          onChange={(event) => setSelectedDate(event.target.value)}
          max={getCurrentDate()} 
        />
               {/* <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  renderInput={(params) => <TextField {...params} />}
                 
                /> */}
          <MaterialTable
            columns={columns}
            title={
              <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
                Attendance : {formattedSelectedDate}
           
              </div>
            }
            data={dataForSelectedDate}
            icons={tableIcons}
            style={{ boxShadow: '0px 2px 4px rgba(1, 1, 1, 1)' }}
            options={{
              actionsColumnIndex: 6,
              exportButton: true,
              exportCsv: exportCsv,
              exportPdf: exportPdf,
              grouping: true,
              headerStyle: {
                background: '#E754CA',
                color: '#fff',
              },
              headerCellStyle: {
                background: '#E754CA',
                color: 'white',
              },
            }}
          />
        </div>
      );
    };
  
    return (
      <div>
        {renderTableForSelectedDate()}
      </div>
    );
  };
  
  export default AtttendanceTab;