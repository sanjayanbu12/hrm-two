import MaterialTable from 'material-table';
import tableIcons from './MaterialTableIcons';
import axios from 'axios';
import { useState, useEffect } from 'react';
const columns = [
  { title: 'EmployeeId', field: 'employeeid', sorting:false},
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
    console.log(edata[3]);
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
      title="Basic Table"
      columns={columns}
      data={edata}
      icons={tableIcons}
      actions={[
        {
          icon: 'save',
          tooltip: 'Save User',
          isFreeAction: true,
          onClick: (event, rowData) => alert('You saved ' + rowData.name)
        },
        (rowData) => ({
          icon: 'delete',
          tooltip: 'Delete User',
          isFreeAction: true,
          onClick: (event, rowData) => confirm('You want to delete ' + rowData.name),
          disabled: rowData.birthYear < 2000
        })
      ]}
      options={{
        actionsColumnIndex: 6,
        exportButton: true,
        exportCsv: exportCsv,
        grouping: true,
        selection: true,
        sorting:true,
        headerStyle: {
          backgroundColor: '#01579b',
          color: '#FFF',
          fontWeight:'100px'
        }
      }}
    />
  );
};
