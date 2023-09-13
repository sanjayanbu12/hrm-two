import MaterialTable from 'material-table';
import tableIcons from './MaterialTableIcons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {  Box, Button} from '@mui/material';
import TableViewIcon from '@mui/icons-material/TableView';
import jsPDF from 'jspdf';

import axios from 'axios';
const columns = [
  { title: 'EmployeeId', field: 'employeeid' },
  { title: 'Name', field: 'name' },
  { title: 'Designation', field: 'desi' },
  { title: 'Gender', field: 'gender' },
  { title: 'Email', field: 'email' },
  { title: 'Type', field: 'type' },
];
const csvColumns = ['EmployeeId', 'Name', 'Designation', 'Gender', 'Email', 'Type','AlternateMob','Reporting To','teamAddress','BloodGroup','Department','JoiningDate','LastName','MobileNumber','PermenentAddress'];
export const BasicTable = () => {
  const [edata, setedata] = useState([]);
const navigate=useNavigate()
  const fetchEmployeesData = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/api/allemployee');
      const employees = response.data.reverse(); // Reverse the data if needed
      setedata(employees)
    } catch (error) {
      console.log(error)
    }
  };
  const handleView = async(e,data) =>{
    const id=data.map(x=>x._id)
    console.log(id[0])
    navigate(`/viewdetails/${id[0]}`);
  }
  useEffect(() => {
    fetchEmployeesData();
  }, []);
  const exportCsv = (columns, data) => {
    const csvData = data.map((item) => ({
      EmployeeId: item.employeeid,
      Name: item.name,
      Designation: item.desi,
      Gender: item.gender,
      Email: item.email,
      Type: item.type,
      AlternateMob: item.altmob,
      Reporter: item.report,
      teamAddress: item.temaddress,
      BloodGroup: item.bloodgroup,
      Department: item.dept,
      JoiningDate: item.join,
      LastName: item.lastname,
      MobileNumber: item.mob,
      PermenentAddress: item.peraddress,
    }));
    const csvHeaders = csvColumns.map((column) => column);
    const csvRows = [csvHeaders, ...csvData.map((item) => Object.values(item).map((value) => `"${value}"`))];
    const csvContent = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'employee_data.csv');
    link.click();
  };
  const exportPdf = (columns, data) => {
    const pdf = new jsPDF('landscape');
    pdf.text('Employee List', 10, 10);

    const rows = data.map((item) => [
      item.employeeid,
      item.name,
      item.desi,
      item.gender,
      item.email,
      item.type,
      // item.cgpa,
      // item.graduationYear,
      // item.experience,
      // item.sslc,
      // item.hsc,
    ]);
    const columnStyle={
      0:{columnWidth:20},
      1:{columnWidth:20},
      2:{columnWidth:35},
      3:{columnWidth:20},
      4:{columnWidth:20},
      5:{columnWidth:40},
      // 6:{columnWidth:30},
      // 7:{columnWidth:20},
      // 8:{columnWidth:20},
      // 9:{columnWidth:23},
      // 10:{columnWidth:30},
      // 11:{columnWidth:25},
      // 12:{columnWidth:20},
    }
    const pdfHeaders = ['EmployeeId', 'Name', 'Designation ', 'Gender', 'Email', 'Type'];
    pdf.autoTable({
      head: [pdfHeaders],
      body: rows,
      startY: 20,
      columnStyle:columnStyle,
      theme:'grid',
    });

    pdf.save('Employee_List.pdf');
  };


  return (
   <>
    <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: 'flex' }}>
    <Button
      onClick={() => navigate(`/newemployee`)}
      sx={{
        background: 'rgba(33, 150, 243, 0.04)',
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '0px',
        marginBottom: '0px'
      }}
    >
      <TableViewIcon />
      Form 
    </Button>
  </Box>

    <MaterialTable
    raised={true}
    title={<div style={{ fontWeight: 'bold' ,fontSize:'20px'}}>Employee Table</div>}
      columns={columns}
      data={edata}
      icons={tableIcons}
      actions={[
        {
          icon: tableIcons.Edit,
          tooltip: 'View Details',
          onClick: (event, rowData) => handleView(event,rowData)
        },
        
        // {
        //   icon: tableIcons.Clear,
        //   tooltip: 'Edit',
        //   onClick: (event, rowData) => alert(rowData.map(x=>x.name))
        // },
        // {
        //   icon: tableIcons.Delete,
        //   tooltip: 'Delete User',
        //   onClick: (event, rowData) => confirm("You want to delete " + rowData.map(x=>x._id))
        // }
      ]}
      style={{ boxShadow: '0px 2px 4px rgba(1, 1, 1, 1)' }}
      options={{
        actionsColumnIndex: 6,
        exportButton: true,
        exportCsv: exportCsv,
        exportPdf: exportPdf,
        grouping: true,
        selection:true,
        // rowStyle: {
        //   backgroundColor: '#EEE',
        // },
        headerStyle: {
          background: 'linear-gradient(180deg,#3a59af,#352786)',
          color: '#fff', // Text color
        },
        headerCellStyle: {
          color: 'white', // Text color for header cells
        },
      }}
    />
    </>
  );
};
