import MaterialTable from 'material-table';
// import tableIcons from './MaterialTableIcons';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import tableIcons from 'views/addemployeetable/MaterialTableIcons';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import {  ThemeProvider, createMuiTheme } from '@mui/material';
import './Css/table.css';

const columns = [
 
  { title: 'Job ID', field: 'uuid' ,sorting:false},
  { title: 'Jobrole', field: 'Jobrole' },
  {title: 'No of Openings', field: 'Openings'},
  { title: 'Location', field: 'Location' },
  {title:'Worktype', field: 'Worktype'},
  { title: 'Deadline', field: 'Deadline' },
  
];
const csvColumns = ['Job ID','Jobrole', 'No.of.Openings', 'Company', 'Location',' Worktype',' Qualification','Year of Passing','Skills','Experience','Application Link','Deadline'];
const RecruitmentTable = () => {
  const [Adata, setAdata] = useState([]);
  const[Loader,setLoader]=useState(true)
const navigate=useNavigate()
  const fetchData = async () => {
    setLoader(true)
    const res = await axios.get(`https://hrm-backend-square.onrender.com/rec/getRec`);
    setAdata(res.data.getData.filter(data=>data.approvalstatus.manager===true && data.approvalstatus.hr===true ));
    setLoader(false)
    console.log(res.data.getData );
  };
  const handleView = async(e,data) =>{
    const id=data.map(x=>x._id)
    console.log(id[0])
    navigate(`/recruitmentview/${id[0]}`);
  }
  const handleEdit = async(e,data) =>{
    const id=data.map(x=>x._id)
    console.log(id[0])
    navigate(`/jobform/${id[0]}`);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const exportCsv = (columns, data) => {
    const csvData = data.map((item) => ({
     JobID: item.uuid,
     JobRole: item.Jobrole,
     JobOpenings: item.Openings,
     Company: item.Company,
     Location: item.Location,
     Worktype: item.Worktype,
     Qualification: item.Education,
     YearOfPassing: item.Year,
     Skills: item.Skills,
     Experience: item.ExperienceFrom +" to "+item.ExperienceTo+" Years",
     ApplicationLink: item.ApplicationLink,
     Deadline: item.Deadline,
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
   
  const exportPdf = (columns, data) => {
    const pdf = new jsPDF('landscape');
    pdf.text('Recruitment Table', 10, 10);
  
    const rows = data.map((item) => [
      item.uuid,
      item.Jobrole,
      item.Openings,
      item.Company,
      item.Location,
      item.Worktype,
      item.Education,
      item.Year,
      item.Skills,
      item.ExperienceFrom + " to " + item.ExperienceTo + " Years",
      item.ApplicationLink,
      item.Deadline,
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
    const pdfHeaders = ['Job ID', 'Jobrole', 'No.of.Openings', 'Company', 'Location', 'Worktype', 'Qualification', 'Year of Passing', 'Skills', 'Experience', 'Application Link', 'Deadline'];
    pdf.autoTable({
      head: [pdfHeaders],
      body: rows,
      startY: 20,
      columnStyles: columnStyle,
      theme: 'grid',
    });
  
    pdf.save('recruitment_table.pdf');
  };
  

  const handleDelete =(e,rowdata) => {
  const multidelete=rowdata.map(data=>data._id);
  const Text = `Confirming removal of this  <span style="color: red; text-transform: capitalize;">${rowdata.map(item=>item.Jobrole)}</span> opening from this list, permanently?`

    Swal.fire({
      icon: 'warning',
      html:Text,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://hrm-backend-square.onrender.com/rec/getRec/${multidelete[0]}`);
          await fetchData();
          Swal.fire({
            icon: 'success',
            text: 'Recruitment deleted successfully.'
          })
        } catch (error) {
          console.log('Error deleting recruitment:', error)
        }
      }
    })
  }
  const handleRowClick = (event, rowData) => {
    const id = rowData._id;
    navigate(`/recruitmentview/${id}`);
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#757575',
      },
      secondary: {
        main: '#7e57c2',
      },
    },

  });

  return (
    <ThemeProvider theme={theme}>
      {Loader? (<div className='spinner' style={{position:'absolute',bottom:'40%',right:'45%'}} /> ):(
    <MaterialTable
      title={<div style={{fontSize:'20px',marginTop:'10px',marginBottom:'10px'}}>Recruitment Table</div>}
      columns={columns}
      data={Adata}
      icons={tableIcons}
      onRowClick={handleRowClick}
      actions={[
        {
          icon: tableIcons.Add,
          tooltip: 'Add Job',
          isFreeAction: true,
          onClick: () => navigate('/jobform')
        },
        rowData => ({
          icon: tableIcons.View,
          tooltip: 'View Details',
          onClick: (event, rowData) => handleView(event,rowData),
          disabled: rowData.length != 1
        }),
       rowData=>( {
          icon: tableIcons.Edit,
          tooltip: 'Edit',
          onClick: (event, rowData) => handleEdit(event,rowData),
          disabled: rowData.length != 1
        }),
        {
          icon: tableIcons.Delete,
          tooltip: 'Delete User',
          onClick: (event, rowData) => handleDelete(event,rowData)
        }
      ]}
      options={{
        actionsColumnIndex: 6,
        exportButton: true,
        exportCsv: exportCsv,
        exportPdf:exportPdf,
        grouping: true,
        selection:true,
      }}
   />
   ) }
    </ThemeProvider>
  );
};
export default RecruitmentTable;