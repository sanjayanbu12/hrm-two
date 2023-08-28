import React, { useState } from 'react';
import MaterialTable from 'material-table';
import tableIcons from 'views/addemployeetable/MaterialTableIcons';
import { ThemeProvider, Tooltip, createMuiTheme } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import { TextSnippet } from '@mui/icons-material';
import jsPDF from 'jspdf';
// import { useNavigate } from 'react-router';

const columns = [
  { title: 'Name', field: 'name',editable:false },
  { title: 'Jobrole', field: 'position',editable:false },
  { title: 'Email', field: 'email',editable:false },
  { title: 'MobileNo', field: 'phone',editable:false },
  { title:'Resume',field:'resume',editable:false},
  {
    title: 'Interview Date',
    field: 'interview',
    type: 'date',
    sorting: false,
    editComponent: (props) => {
      const currentDate = new Date().toISOString().split('T')[0]; 
      return (
        <input
          type="date"
          style={{ height: '50px', width: '150px' }}
          value={props.value}
          min={currentDate} 
          onChange={(e) => props.onChange(e.target.value)}
        />
      );
    },
  },
  {
    title: 'Status',
    field: 'approve',
    lookup: {
      'Scheduled': 'Scheduled',
      'Rejected': 'Rejected',
      'Hired': 'Hired',
      'Round 1 Selected': 'Round 1 Selected',
      'Round 2 Selected': 'Round 2 Selected',
      'Round 3 Selected': 'Round 3 Selected',
      'Round 4 Selected': 'Round 4 Selected',
      'Round 5 Selected': 'Round 5 Selected',
    },
  },
];

const InterviewDetails = () => {
  const [data, setData] = useState([]);
  // const navigate=useNavigate();
  useEffect(()=>{
    fetchData();
  },[])

  const fetchData=async()=>{
    const res=await axios.get(`https://hrm-backend-square.onrender.com/ats/`)
    const Select= res.data.getData.filter(select=>select.Status==='Selected');
    setData (Select)
    console.log(setData);
  };

const handleRowUpdate = async(newData,oldData)=>{
  try{
   const res= await axios.put(`https://hrm-backend-square.onrender.com/ats/updateAts/${oldData._id}`,{
   approve: newData.approve,
   interview: newData.interview
  })
   console.log(res)
    const updatedData = [...data];
    const index = updatedData.indexOf(oldData);
    updatedData[index] = newData;
    setData(updatedData);
    fetchData();
  } catch (error) {
    console.error('Error updating row:', error);
  }
};

  const handleResume = async (id, name) => {
    try {
      const response = await axios.get(`https://hrm-backend-square.onrender.com/ats/resume/${id}`, {
        responseType: 'arraybuffer',
      });
      const byteArray = new Uint8Array(response.data);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      saveAs(blob, `${name} resume.pdf`);
    } catch (error) {
      console.log('Error downloading resume:', error);
    }
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#757575',
      },
      secondary: {
        main: '#7e57c2',
      },
    },
  });

  const exportCsv = (columns, data) => {
    const csvData = data.map((item) => ({
      Name: item.name,
      JobRole: item.position,
      MobileNo: item.phone,
      Email: item.email,
      Qualification: item.department,
      College: item.college,
      YearOfPassing: item.graduationYear,
      InterviewDate: item.interview,
      Status: item.approve,
    }));
    const csvHeaders = ['Name', 'Jobrole', 'Mobile No', 'Email', 'Qualification', 'College', 'Year of Passing', 'Interview Date', 'Status'];
    const csvRows = [csvHeaders, ...csvData.map((item) => Object.values(item).map((value) => `"${value}"`))];
    const csvContent = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Selected Candidate_data.csv');
    link.click();
  };

  const exportPdf = (columns, data) => {
    const pdf = new jsPDF('landscape');
    pdf.text('Employee Application Tracker', 10, 10);

    const rows = data.map((item) => [
      item.name,
      item.position,
      item.phone,
      item.email,
      item.interview,
      item.approve,
    ]);
    const columnStyle={
      0:{columnWidth:20},
      1:{columnWidth:20},
      2:{columnWidth:35},
      3:{columnWidth:20},
      4:{columnWidth:20},
      5:{columnWidth:40},
      6:{columnWidth:30},
      7:{columnWidth:20},
      8:{columnWidth:20},
      9:{columnWidth:23},
      10:{columnWidth:30},
      11:{columnWidth:25},
      12:{columnWidth:20},
    }
    const pdfHeaders = ['Name', 'Jobrole', 'Mobile No', 'Email', 'Interview Date', 'Status'];
    pdf.autoTable({
      head: [pdfHeaders],
      body: rows,
      startY: 20,
      columnStyle:columnStyle,
      theme:'grid',
    });

    pdf.save('Selected Candidate_data.pdf');
  };

  // const handleView = async(e,data) =>{
  //   const id=data.map(x=>x._id)
  //   console.log(id[0])
  //   navigate(`/view/${id[0]}`);}
}

  const exportCsv = (columns, data) => {
    const csvData = data.map((item) => ({
      Name: item.name,
      JobRole: item.position,
      MobileNo: item.phone,
      Email: item.email,
      Qualification: item.department,
      College: item.college,
      YearOfPassing: item.graduationYear,
      InterviewDate: item.interview,
      Status: item.approve,
    }));
    const csvHeaders = ['Name', 'Jobrole', 'Mobile No', 'Email', 'Qualification', 'College', 'Year of Passing', 'Interview Date', 'Status'];
    const csvRows = [csvHeaders, ...csvData.map((item) => Object.values(item).map((value) => `"${value}"`))];
    const csvContent = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Selected Candidate_data.csv');
    link.click();
  };

  const exportPdf = (columns, data) => {
    const pdf = new jsPDF('landscape');
    pdf.text('Employee Application Tracker', 10, 10);

    const rows = data.map((item) => [
      item.name,
      item.position,
      item.phone,
      item.email,
      item.interview,
      item.approve,
    ]);
    const columnStyle={
      0:{columnWidth:20},
      1:{columnWidth:20},
      2:{columnWidth:35},
      3:{columnWidth:20},
      4:{columnWidth:20},
      5:{columnWidth:40},
      6:{columnWidth:30},
      7:{columnWidth:20},
      8:{columnWidth:20},
      9:{columnWidth:23},
      10:{columnWidth:30},
      11:{columnWidth:25},
      12:{columnWidth:20},
    }
    const pdfHeaders = ['Name', 'Jobrole', 'Mobile No', 'Email', 'Interview Date', 'Status'];
    pdf.autoTable({
      head: [pdfHeaders],
      body: rows,
      startY: 20,
      columnStyle:columnStyle,
      theme:'grid',
    });

    pdf.save('Selected Candidate_data.pdf');
  };

  // const handleView = async(e,data) =>{
  //   const id=data.map(x=>x._id)
  //   console.log(id[0])
  //   navigate(`/view/${id[0]}`);}

  return (
    <ThemeProvider theme={theme}>
    <MaterialTable
      title={<div style={{ fontSize: '20px', marginTop: '10px', marginBottom: '10px' }}>Shortlist Candidates</div>}
      columns={columns.map((column) => {
          if (column.field === 'resume') {
          return {
            ...column,
            render: (rowData) => (
              <a href="#" onClick={() => handleResume(rowData._id, rowData.name)}><Tooltip title='Download Resume'><TextSnippet style={{color:'#616161'}}></TextSnippet></Tooltip></a>
            ),
          };
          }
        
      })}
      data={data}
      icons={tableIcons}
      editable={{onRowUpdate:handleRowUpdate}}
      actions={[  {
            icon: tableIcons.Share,
            tooltip: 'Send Mail',
            // onClick: (event, rowData) => handleView(event,rowData),
         
          },
        ]}
      options={{
        actionsColumnIndex: -1,
        exportButton: true,
        grouping: true,
        columnsButton:true,
        selection:true,
        exportCsv:exportCsv,
        exportPdf:exportPdf,
        headerStyle:{
          backgroundColor:'#42a5f5',
          color:'black'
        }
      }}
    />
    </ThemeProvider>
  );
};

export default InterviewDetails;
