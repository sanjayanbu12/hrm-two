import MaterialTable from 'material-table';
import tableIcons from './MaterialTableIcons';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { ORG_MEM } from 'store/actions';
import { useSelector } from 'react-redux';
const columns = [
  { title: 'EmployeeId', field: 'employeeid' },
  { title: 'Name', field: 'name' },
  { title: 'Designation', field: 'desi' },
  { title: 'Gender', field: 'gender' },
  { title: 'Email', field: 'email' },
  { title: 'Type', field: 'type' },
];
const csvColumns = ['EmployeeId', 'Name', 'Designation', 'Gender', 'Email', 'Type','AlternateMob','Reporting To','teamAddress','BloodGroup','Department','JoiningDate','LastName','MobileNumber','PermenentAddress'];
export const BasicTable = () => {
  const [edata, setedata] = useState([]);
  const members=useSelector(state=>state.customization.members)
  const dispatch = useDispatch()
const navigate=useNavigate()
  const fetchEmployees = async () => {
    const res = await axios.get(`https://hrm-backend-square.onrender.com/api/allemployee`);
    setedata(res.data.reverse());
    dispatch({type:ORG_MEM,payload:res.data});
    console.log(members)
  };
  const handleView = async(e,data) =>{
    const id=data.map(x=>x._id)
    console.log(id[0])
    navigate(`/viewdetails/${id[0]}`);
  }
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
          tooltip: 'View Details',
          onClick: (event, rowData) => handleView(event,rowData)
        },
        {
          icon: tableIcons.Clear,
          tooltip: 'Edit',
          onClick: (event, rowData) => alert(rowData.map(x=>x.name))
        },
        {
          icon: tableIcons.Delete,
          tooltip: 'Delete User',
          onClick: (event, rowData) => confirm("You want to delete " + rowData.map(x=>x._id))
        }
      ]}
      options={{
        actionsColumnIndex: 6,
        exportButton: true,
        exportCsv: exportCsv,
        grouping: true,
        selection:true
        
      }}
    />
  );
};
