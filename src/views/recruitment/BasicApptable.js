import MaterialTable from 'material-table';
// import tableIcons from './MaterialTableIcons';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import tableIcons from 'views/addemployeetable/MaterialTableIcons';
const columns = [
 
  { title: 'Name', field: 'name' },
  { title: 'Jobrole', field: 'position' },
  {title:'Mobile  No', field: 'phone'},
  { title: 'Email', field: 'email' },
  { title: 'Qualification', field: 'department' },
  {title: 'Year of passing', field: 'graduationYear' },
  { title: 'Experience', field: 'experience' },
  {title: 'Applied Date', field:'appliedAt' },
  
 
 
];
const csvColumns = ['Name', 'Jobrole', 'Mobile No', 'Email', 'Qualification','College','Year of Passing','SSLC Percentage','HSC Percentage','CGPA','Experience','Skills','Applied Date'];
const BasicApptable = () => {
  const [Adata, setAdata] = useState([]);
const navigate=useNavigate()
  const fetchEmployees = async () => {
    const res = await axios.get(`https://hrm-backend-square.onrender.com/ats/`);
    setAdata(res.data.getData);
    console.log(res.data.getData );
  };
  const handleView = async(e,data) =>{
    const id=data.map(x=>x._id)
    console.log(id[0])
    navigate(`/view/${id[0]}`);
  }
  useEffect(() => {
    fetchEmployees();
  }, []);
  const exportCsv = (columns, data) => {
    const csvData = data.map((item) => ({
     Name: item.name,
     JobRole: item.position,
     MobileNo: item.phone,
     Email: item.email,
     Qualification: item.department,
     College: item.college,
     YearOfPassing: item.graduationYear,
     SSLCPercentage: item.sslc,
     HSCPercentage: item.hsc,
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
      title="Application Tracker"
      columns={columns}
      data={Adata}
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
export default BasicApptable;