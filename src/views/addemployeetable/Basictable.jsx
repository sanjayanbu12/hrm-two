import MaterialTable from 'material-table';
import tableIcons from './MaterialTableIcons';
import axios from 'axios';
import { useState, useEffect } from 'react';
const columns = [
  { title: 'EmployeeId', field: 'employeeid' },
  { title: 'Name', field: 'name' },
  { title: 'Designation', field: 'desi' },
  { title: 'Gender', field: 'gender' },
  { title: 'Email', field: 'email' },
  { title: 'Type', field: 'type' }
];
const csvColumns = ['EmployeeId', 'Name', 'Designation', 'Gender', 'Email', 'Type','AlternateMob','Reporting To','teamAddress','BloodGroup','Department','JoiningDate','LastName','MobileNumber','PermenentAddress'];
export const BasicTable = () => {
  const [edata, setedata] = useState([]);
  const fetchEmployees = async () => {
    const res = await axios.get(`https://hrm-backend-square.onrender.com/api/allemployee`);
    setedata(res.data.reverse());
  };
  useEffect(() => {
    fetchEmployees();
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

  return (
    <MaterialTable
      title="Employee Table"
      columns={columns}
      data={edata}
      icons={tableIcons}
      actions={[
        {
          icon: tableIcons.Edit,
          tooltip: 'Save User',
          onClick: (event, rowData) => alert("You saved " + rowData.name)
        },
        {
          icon: tableIcons.Delete,
          tooltip: 'Delete User',
          onClick: (event, rowData) => confirm("You want to delete " + rowData.name)
        }
      ]}
      options={{
        actionsColumnIndex: 6,
        exportButton: true,
        exportCsv: exportCsv,
        grouping: true,
        // rowStyle: {
        //   backgroundColor: '#EEE',
        // },
        // headerStyle: {
        //   backgroundColor: '#01579b',
        //   color: '#FFF'
        // }
        
      }}
    />
  );
};
