import React, { useState } from 'react';
import MaterialTable from 'material-table';
import tableIcons from 'views/addemployeetable/MaterialTableIcons';
import { ThemeProvider, createMuiTheme } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';

const columns = [
  { title: 'Name', field: 'name',editable:false },
  { title: 'Jobrole', field: 'position',editable:false },
  { title: 'Email', field: 'email',editable:false },
  { title: 'MobileNo', field: 'phone',editable:false },
  { title: 'Interview Date', field: 'Interview' ,width:'auto'},
  {
    title: 'Status',
    field: 'status',
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

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData=async()=>{
    const res=await axios.get(`https://hrm-backend-square.onrender.com/ats/`)
    const Select= res.data.getData.filter(select=>select.Status==='Selected');
    setData (Select)
    console.log(setData);
  }

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
  return (
    <ThemeProvider theme={theme}>
    <MaterialTable
      title={<div style={{ fontSize: '20px', marginTop: '10px', marginBottom: '10px' }}>Interview Details</div>}
      columns={columns}
      data={data}
      icons={tableIcons}
      options={{
        actionsColumnIndex: -1,
        exportButton: true,
        grouping: true,
        columnsButton:true,
        selection:true,
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
