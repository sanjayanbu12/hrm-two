import React, { useState } from 'react';
import MaterialTable from 'material-table';
import tableIcons from 'views/addemployeetable/MaterialTableIcons';
import { ThemeProvider, createMuiTheme } from '@mui/material';

const columns = [
  { title: 'ID', field: 'id', sorting: false ,editable:false},
  { title: 'Name', field: 'candidateName',editable:false },
  { title: 'Mobile No', field: 'mobileNo',editable:false },
  { title: 'Email', field: 'email',editable:false },
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
  const [data, setData] = useState([
    {
      id: 1,
      candidateName: 'John Doe',
      mobileNo: '9688025072',
      email: 'john@example.com',
      Interview: '2021-01-01',
      status: 'Scheduled',
    },
    // Add more data as needed
  ]);

  const handleEdit = (newData, oldData) => {
    const updatedData = [...data];
    const index = updatedData.indexOf(oldData);
    updatedData[index] = newData;
    setData(updatedData);
  };

  const handleBulkUpdate = (changes) => {
    const updatedData = data.map((row) => {
      const changedRow = changes[row.id];
      if (changedRow) {
        return { ...row, ...changedRow };
      }
      return row;
    });
    handleSave(updatedData);
  };

  const handleSave = (updatedData) => {
   
    console.log('Updated data:', updatedData);
    setData(updatedData);
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
  return (
    <ThemeProvider theme={theme}>
    <MaterialTable
      title={<div style={{ fontSize: '20px', marginTop: '10px', marginBottom: '10px' }}>Interview Details</div>}
      columns={columns}
      data={data}
      editable={{
        onRowUpdate: (newData, oldData) => handleEdit(newData, oldData),
        onBulkUpdate: (changes) => handleBulkUpdate(changes),
      }}
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
