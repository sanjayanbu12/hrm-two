import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Modal } from '@material-ui/core';
import Popup from './Popup';
import tableIcons from 'views/addemployeetable/MaterialTableIcons';
import jsPDF from 'jspdf';

const Travel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    { title: 'EmployeeId', field: 'employeeid' },
    { title: 'From', field: 'from' },
    { title: 'To', field: 'to' },
    { title: 'StartDate', field: 'startdate' },
    // { title: 'EndDate', field: 'enddate' },
    { title: 'Days', field: 'days' },
    { title: 'Budget', field: 'budget' },
    { title: 'Business', field: 'business' },
    { title: 'Claimtype', field: 'claimtype' },
    { title: 'Transport', field: 'transport' }
  ];

  const data = tableData.map((item) => ({
    employeeid: item.employeeid.employeeid,
    from: item.from,
    to: item.to,
    startdate: new Date(item.startdate).toLocaleDateString(),
    // enddate: new Date(item.enddate).toLocaleDateString(),
    days: item.days,
    budget: item.budget,
    business: item.business,
    claimtype: item.claimtype,
    transport: item.transport
  }));

  useEffect(() => {
    // Fetch data from the API
    fetch('https://hrm-backend-square.onrender.com/travel/getall')
      .then((response) => response.json())
      .then((data) => {
        // Once data is fetched, set it to tableData state
        setTableData(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  const handleAddExpense = () => {
    // Implement the logic to add an employee here
    console.log('Add employee logic');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // Close the modal when needed
    setIsModalOpen(false);
  };

  const exportCsv = () => {
    const csvData = data.map((item) => ({
      EmployeeID: item.employeeid,
      From: item.from,
      To: item.to,
      StartDate: item.startdate,
      // EndDate: item.enddate,
      Days: item.days,
      Budget: item.budget,
      Business: item.business,
      Claimtype: item.claimtype,
      Transport: item.transport
    }));
    const csvHeaders = ['EmployeeID', 'From', 'To', 'StartDate', 'EndDate', 'Days', 'Budget', 'Business', 'Claimtype', 'Transport'];
    const csvRows = [csvHeaders, ...csvData.map((item) => Object.values(item).map((value) => `"${value}"`))];
    const csvContent = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(blob, 'travel&expense.csv');
  };

  const exportPdf = () => {
    const pdf = new jsPDF('landscape');
    pdf.text('View Travel & Expense', 10, 10);

    const rows = data.map((item) => [
      item.employeeid,
      item.from,
      item.from,
      item.startdate,
      // item.enddate,
      item.days,
      item.budget,
      item.business,
      item.claimtype,
      item.transport
    ]);

    pdf.autoTable({
      head: [columns.map((column) => column.title)],
      body: rows,
      startY: 20
    });

    pdf.save('travel&expense.pdf');
  };

  return (
    <div>
      <MaterialTable
        columns={columns}
        data={data}
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
        isLoading={isLoading}
        style={{ boxShadow: '0px 2px 4px rgba(1, 1, 1, 1)' }}
        options={{
          actionsColumnIndex: -3,
          exportButton: true,
          exportCsv: exportCsv,
          exportPdf: exportPdf,
          grouping: true,
          // selection: true,
          columnsButton: true,
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
