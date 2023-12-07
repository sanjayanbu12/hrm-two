import React from 'react';
import MaterialTable from 'material-table';
import tableIcons from 'views/addemployeetable/MaterialTableIcons';
import { useState } from 'react';
import Precruitment from './Precruitment';
import { Modal } from '@material-ui/core';
import ApiContext from 'context/api/ApiContext';
import { useContext } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { ProgressSpinner } from 'primereact/progressspinner';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

const ProcruitmentTable = () => {
const[open,setOpen]=useState(false);

const { getProcruitment } = useContext(ApiContext);
console.log("getProcruitment",getProcruitment);

// const {procget,setProcget } = useContext(FormSubmittedContext);

const data = getProcruitment.map(item => ({
  name: item.employeeid.name,
  email: item.employeeid.email,
  productDescription: item.productDescription,   
  quantity: item.quantity,
  approximateBudget: item.approximateBudget,
  createdAt: new Date(item.createdAt).toLocaleDateString(),
  priority: item.priority,
  status: item.status,  
}));

const columns = [
  { title: 'Name', field: 'name' },
  { title: 'Email', field: 'email' },
  { title: 'Description', field: 'productDescription' },
  { title: 'Quantity', field: 'quantity' },
  {
    title: 'Approximate Budget',
    field: 'approximateBudget',
    render: rowData => <span>&#8377; {rowData.approximateBudget}</span>,
  },
  { title: 'Requested on', field:'createdAt'},
  {
    title: 'Priority',
    field: 'priority',
    render: rowData => {
      let backgroundColor;
      switch (rowData.priority) {
        case 'High':
          backgroundColor = 'red';
          break;
        case 'Medium':
          backgroundColor = 'yellow';
          break;
        case 'Low':
          backgroundColor = 'green';
          break;
        default:
          backgroundColor = 'white'; 
      }
      return (
        <Tooltip title={rowData.priority} arrow>
          <div style={{ backgroundColor, borderRadius: '50%', width: '20px', height: '20px' }}></div>
        </Tooltip>
      );
    },
  },
  {
    title: 'Status',
    field: 'status',
    render: rowData => {
      if (rowData.status === 'Pending') {
        return  <div >
        <ProgressSpinner style={{width: '30px', height: '30px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
    </div>;
      } else if (rowData.status === 'Accepted') {
        return <DoneOutlineIcon style={{ color: 'green' }} />;
      } else {
        // You can handle other status cases here
        return null;
      }
    },
  },
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
        data={data}
        icons={tableIcons}
        style={{ boxShadow: '0px 2px 4px rgba(1, 1, 1, 1)'}}
        options={{
          actionsColumnIndex: 8,
          exportButton: false,
          grouping: true,
          headerStyle: {  
            background: 'linear-gradient(180deg, rgba(64, 224, 208, 0.7), rgba(64, 224, 208, 1))'
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