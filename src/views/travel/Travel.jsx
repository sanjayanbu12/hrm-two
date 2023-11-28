import React from 'react';
import MaterialTable from 'material-table';
import { useState } from 'react';
import tableIcons from 'views/addemployeetable/MaterialTableIcons';
import { Modal } from '@material-ui/core';
import Popup from './Popup';

const Travel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = [
    { title: 'From', field: 'name' },
    { title: 'To', field: 'date' },
    { title: 'Arrival', field: 'checkInTime' },
    { title: 'Depature', field: 'checkOutTime' },
    { title: 'No.of.Days', field: 'workingHours' },
    { title: 'Expences', field: 'name' },
    { title: 'Requested on', field: 'Status' },
    { title: 'Status', field: 'Status' }
  ];

  const handleAddExpense = () => {
    // Implement the logic to add an employee here
    console.log('Add employee logic');
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    // Close the modal when needed
    setIsModalOpen(false);
  };
  return (
    <div>
      <MaterialTable
        columns={columns}
        title={<div style={{ fontWeight: 'bold', fontSize: '20px' }}>Travel & Expenses</div>}
        actions={[
          {
            icon: tableIcons.AddNewRequest,
            tooltip: 'Add New Request',
            isFreeAction: true,
            onClick: handleAddExpense
          }
        ]}
        icons={tableIcons}
        style={{ boxShadow: '0px 2px 4px rgba(1, 1, 1, 1)' }}
        options={{
          actionsColumnIndex: 1,
          grouping: true,
          headerStyle: {
            background: 'linear-gradient(180deg, rgba(64, 224, 208, 0.7), rgba(64, 224, 208, 1))'
          },
          headerCellStyle: {
            background: 'linear-gradient(180deg, rgba(64, 224, 208, 0.7), rgba(64, 224, 208, 1))',
            color: '#fff'
          }
        }}
      />
      {/* Modal component */}
      <Modal open={isModalOpen} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ minWidth: '498px', minHeight: '530px', backgroundColor: '#fff', padding: 10, borderRadius: '15px' }}>
          {/* Content of your modal */}
          <div>
            <Popup handleClose={handleCloseModal} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Travel;
