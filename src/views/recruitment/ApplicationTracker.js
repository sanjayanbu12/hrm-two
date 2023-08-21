import MaterialTable from 'material-table';
// import tableIcons from './MaterialTableIcons';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import tableIcons from 'views/addemployeetable/MaterialTableIcons';
import jsPDF from 'jspdf';
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

const ApplicationTracker = () => {
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
    const csvHeaders = ['Name', 'Jobrole', 'Mobile No', 'Email', 'Qualification', 'College', 'Year of Passing', 'SSLC Percentage', 'HSC Percentage'];
    const csvRows = [csvHeaders, ...csvData.map((item) => Object.values(item).map((value) => `"${value}"`))];
    const csvContent = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'employee_data.csv');
    link.click();
  };

  const exportPdf = (columns, data) => {
    const pdf = new jsPDF();
    pdf.text('Employee Application Tracker', 10, 10);

    const rows = data.map((item) => [
      item.name,
      item.position,
      item.phone,
      item.email,
      item.department,
      item.college,
      item.graduationYear,
      item.sslc,
      item.hsc,
    ]);
    const columnStyle={
      0:{columnWidth:20},
      1:{columnWidth:20},
      2:{columnWidth:30},
      3:{columnWidth:20},
      4:{columnWidth:20},
      5:{columnWidth:20},
      6:{columnWidth:30},
      7:{columnWidth:20},
      8:{columnWidth:20},
      9:{columnWidth:23},
      10:{columnWidth:30},
      11:{columnWidth:25},
      12:{columnWidth:20},
    }
    const pdfHeaders = ['Name', 'Jobrole', 'Mobile No', 'Email', 'Qualification', 'College', 'Year of Passing', 'SSLC Percentage', 'HSC Percentage'];
    pdf.autoTable({
      head: [pdfHeaders],
      body: rows,
      startY: 20,
      columnStyle:columnStyle,
      theme:'grid',
    });

    pdf.save('employee_data.pdf');
  };

 

  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const [day, month, year] = new Date(date).toLocaleDateString('en-GB', options).split('/');
    return `${day}-${month}-${year}`;
  };
  
  return (
    <MaterialTable
      title={<div style={{fontSize:'20px',marginTop:'10px',marginBottom:'10px'}}>Application Tracker</div>}
      columns={columns.map((column) => {
        if (column.field === 'appliedAt') {
          return {
            ...column,
            render: (rowData) => formatDate(rowData.appliedAt),
          };
        }
        return column;
      })}
      data={Adata}
      icons={tableIcons}
      actions={[
      rowData=>(  {
          icon: tableIcons.View,
          tooltip: 'View Details',
          onClick: (event, rowData) => handleView(event,rowData),
          disabled: rowData.length !=1
        }),
        // {
        //   icon: tableIcons.Edit,
        //   tooltip: 'Edit',
        //   onClick: (event, rowData) => alert(rowData.map(x=>x.name))
        // },
        // {
        //   icon: tableIcons.Delete,
        //   tooltip: 'Delete User',
        //   onClick: (event, rowData) => confirm("You want to delete " + rowData.map(x=>x._id))
        // }
      ]}
      options={{
        actionsColumnIndex: 6,
        exportButton: true,
        exportCsv: exportCsv,
        exportPdf: exportPdf,
        grouping: true,
        selection:true
       
        
      }}
    />
  );
};
export default ApplicationTracker;