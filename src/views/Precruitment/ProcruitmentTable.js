import React from 'react';
import MaterialTable from 'material-table';
import tableIcons from 'views/addemployeetable/MaterialTableIcons';
import { useState } from 'react';
import Precruitment from './Precruitment';
import { Modal } from '@material-ui/core'

const ProcruitmentTable = () => {
const[open,setOpen]=useState(false);

  const columns = [
    { title: 'Description', field: '' },
    { title: 'Qty', field: '' },
    { title: 'Approximate Budget', field: '' },
    { title: 'Requested on', field: '' },
    { title: 'Priority', field: 'workingHours' },
    { title: 'Status', field: '' },
  ];

  const handleAddEmployee = () => {
   
    console.log('Add employee logic');
    setOpen(true)
  };  

  const handleClose=()=>{
    setOpen(false)
  }
  return (
    <div>
      <MaterialTable
        columns={columns}
       
        title={
          <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
            Procruitment
          </div>
        }
        actions={[
          {
            icon: tableIcons.AddNewRequest, // Use your custom icon for Add
            tooltip: 'Add New Request',
            isFreeAction: true,
            onClick: handleAddEmployee,
          },
        ]}
        icons={tableIcons}
        style={{ boxShadow: '0px 2px 4px rgba(1, 1, 1, 1)'}}
        options={{
          actionsColumnIndex: 6,
          exportButton: false,
          grouping: true,
          headerStyle: {
            background: 'linear-gradient(180deg,#3a59af,#352786)',
            color: '#fff',
          },
          headerCellStyle: {
            background: 'linear-gradient(180deg,#3a59af,#352786)',
            color: 'white',
          },
        }}
       
      />
     <Modal
  open={open}
 
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <div
    style={{
      minWidth: '498px',
      minHeight: '502px',
      backgroundColor: 'white',
      padding: 10,
      boxShadow:
        '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      borderRadius: '10px',
      marginTop: '20px',
    }}
  >
    {/* Content of your modal */}
    <div>
      <Precruitment handleClose={handleClose} />
    </div>
  </div>
</Modal>
    </div>
  );
};

export default ProcruitmentTable;