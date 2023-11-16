import React from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import tableIcons from 'views/addemployeetable/MaterialTableIcons';

const ProcruitmentTable = () => {
  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Date', field: 'date' },
    { title: 'Checkin Time', field: 'checkInTime' },
    { title: 'Checkout Time', field: 'checkOutTime' },
    { title: 'Working Hours', field: 'workingHours' },
  ];

  const handleAddEmployee = () => {
    // Implement the logic to add an employee here
    console.log('Add employee logic');
  };

  return (
    <div>
      <MaterialTable
        columns={columns}
        components={{
            Toolbar: (props) => (
                <>
         
                <MTableToolbar {...props} />
                <div style={{ textAlign: 'right', paddingRight: '10px' }}>
                  <button onClick={handleAddEmployee} style={{ color: '#fff', background: '#3a59af', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
                    Add New Request
                  </button>
                </div>
                </>
            ),
          }}

        title={
          <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
            Procruitment
          </div>
        }
    
       
        icons={tableIcons}
        style={{ boxShadow: '0px 2px 4px rgba(1, 1, 1, 1)' }}
        options={{
          actionsColumnIndex: 6,
          exportButton: true,
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
    </div>
  );
};

export default ProcruitmentTable;