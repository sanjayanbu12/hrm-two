import MaterialTable from 'material-table';
import tableIcons from './MaterialIcon';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const columns = [
  { title: 'EmployeeId', field: 'employeeid' },
  { title: 'Employee Name', field: 'name' },
  { title: 'Leave Type', field: 'leaveType' },
  { title: 'Start Date', field: 'startDate' },
  { title: 'End Date', field: 'endDate' },
  { title: 'Number of Days', field: 'numberOfDays' },
  { title: 'Attachments', field: 'attachments' },
  { title: 'Reason', field: 'reason' },
  { title: 'Status', field: 'status' },
  {
    title: 'Action',
    field: 'action',
    render: (rowData) => (
      <button onClick={() => handleView(rowData.employeeid)}>View Leave Details</button>
    ),
  },
];

export const LeaveTable = () => {
  const [ldata, setLdata] = useState([]);
  const navigate = useNavigate();

  const fetchLeaveData = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/api/leave');
      const leaves = response.data.reverse(); // Reverse the data if needed
      setLdata(leaves);
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = (employeeId) => {
    navigate(`/viewleavedetails/${employeeId}`);
  };

  const exportCsv = (columns, data) => {
    const csvData = data.map((item) => ({
      EmployeeId: item.employeeid,
      'Employee Name': item.name,
      'Leave Type': item.leaveType,
      'Start Date': item.startDate,
      'End Date': item.endDate,
      'Number of Days': item.numberOfDays,
      Attachments: item.attachments,
      Reason: item.reason,
      Status: item.status,
    }));
    const csvHeaders = Object.keys(csvData[0]);
    const csvRows = [csvHeaders, ...csvData.map((item) => Object.values(item).map((value) => `"${value}"`))];
    const csvContent = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'leave_data.csv');
    link.click();
  };

  useEffect(() => {
    fetchLeaveData();
  }, []);

  return (
    <MaterialTable
      raised={true}
      title={<div style={{ fontWeight: 'bold', fontSize: '20px' }}>Leave Table</div>}
      columns={columns}
      data={ldata}
      icons={tableIcons}
      actions={[
        {
          icon: tableIcons.Edit,
          tooltip: 'View Leave Details',
          onClick: (event, rowData) => handleView(rowData.employeeid),
        },
        {
          icon: tableIcons.CsvExport,
          tooltip: 'Export CSV',
          isFreeAction: true,
          onClick: () => exportCsv(columns, ldata),
        },
      ]}
      options={{
        actionsColumnIndex: 9,
        exportButton: true,
        grouping: true,
        selection: true,
        headerStyle: {
          background: 'linear-gradient(180deg,#3a59af,#352786)',
          color: '#fff',
        },
        headerCellStyle: {
          color: 'white',
        },
      }}
    />
  );
};
