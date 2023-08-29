import MaterialTable from 'material-table';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import tableIcons from 'views/addemployeetable/MaterialTableIcons';
import jsPDF from 'jspdf';
import {  Image,  TextSnippet } from '@mui/icons-material';
// import { Clear,  Done,Pause } from '@mui/icons-material';
import { ThemeProvider, Tooltip, createMuiTheme } from '@mui/material';
// import { Skill } from './Consts';
// const statusIcons={
//   Hold:<Pause  sx={{color:'#1e88e5'}}></Pause>,
//   Selected:<Done sx={{color:'#00c853'}}/>,
//   Rejected:<Clear sx={{color:'#b71c1c'}}/>
// };

const columns = [

  { title: 'Name', field: 'name' ,editable:false},
  { title: 'Jobrole', field: 'position',editable:false },
  {title:'Mobile  No', field: 'phone',sorting:false,editable:false},
  { title: 'Email', field: 'email',sorting:false,editable:false },
  { title: 'Resume', field: 'resume',sorting:false,editable:false},
  {title: 'photo', field: 'photo',sorting:false ,editable:false},
  {title: 'Applied Date', field:'appliedAt',type:'date',sorting:false,editable:false },
  {title:'Status', field: 'Status',sorting:false, lookup:{'Hold':'Hold','Selected':'Selected','Rejected':'Rejected'},
  // render: rowData=>statusIcons[rowData.Status]
}
];

const ApplicationTracker = () => {
  const [Adata, setAdata] = useState([]);
  const [Loader, setLoader] = useState(true);
  const Sa='Software Associate';
  const [fil,setfil] = useState('');
const navigate=useNavigate()
  const fetchEmployees = async () => {
    try{
    setLoader(true);
    const res = await axios.get(`https://hrm-backend-square.onrender.com/ats/`);
    const filldata=res.data.getData;
    setAdata(filldata)
    setLoader(false)
    console.log(res.data.getData);}
    catch(err){
      console.log(err)
    }
  };

    const handleView = async(e,data) =>{
    const id=data.map(x=>x._id)
    console.log(id[0])
    navigate(`/view/${id[0]}`);
  }
  const handleResume = async (id, name) => {
    try {
      const response = await axios.get(`https://hrm-backend-square.onrender.com/ats/resume/${id}`, {
        responseType: 'arraybuffer',
      });
      const byteArray = new Uint8Array(response.data);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      saveAs(blob, `${name} resume.pdf`);
    } catch (error) {
      console.log('Error downloading resume:', error);
    }
  };

  const handlePhotoDown = async (id, name) => {
    try {
      const response = await axios.get(`https://hrm-backend-square.onrender.com/ats/photo/${id}`, {
        responseType: 'arraybuffer',
      });
      const contentType = response.headers['Content-Type'];
      const extension = contentType === 'image/jpeg' ? 'jpeg' : 'png';
      const byteArray = new Uint8Array(response.data);
      const blob = new Blob([byteArray], { type: contentType });
      saveAs(blob, `${name}.${extension}`);
    } catch (error) {
      console.log('Error downloading photo:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    fetchRec();
  },[]);
  const fetchRec = async () => {
    const res = await axios.get(`https://hrm-backend-square.onrender.com/rec/getRec`);
    const data=res.data.getData;
    setfil(data)
  };
  console.log(fil)
  let job=''
  let sk=''
   if(fil){
   job=fil.filter((job) =>job.Jobrole===Sa)
   sk=job.map((sk) =>sk.Skills)
  }
   console.log(job)
   console.log(sk)

   const B=Adata.filter(x=>x.position==Sa)
   const y=B.map(data=>data.skills)
   console.log(y.map(data=>data))
   const C =B.filter(x => x.skills.some(skills => sk.includes(skills)));
   console.log(C)




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
    const pdf = new jsPDF('landscape');
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
      2:{columnWidth:35},
      3:{columnWidth:20},
      4:{columnWidth:20},
      5:{columnWidth:40},
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

  const handleRowUpdate = async (newData, oldData) => {
    try {
      console.log(newData.Status)
      await axios.put(`https://hrm-backend-square.onrender.com/ats/updateAts/${oldData._id}`,{Status:newData.Status});
      const updatedData = [...Adata];
      const index = updatedData.indexOf(oldData);
      updatedData[index] = newData;
      setAdata(updatedData);
  
    } catch (error) {
      console.error('Error updating row:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {Loader? (<div className="spinner" style={{position:'absolute',bottom:'40%',right:'45%'}}/>):(
    <MaterialTable
      title={<div style={{fontSize:'20px',marginTop:'10px',marginBottom:'10px'}}>Application Tracker</div>}
      columns={columns.map((column) => {
        if (column.field === 'resume') {
          return {
            ...column,
            render: (rowData) => (
              <a href="#" onClick={() => handleResume(rowData._id, rowData.name)}><Tooltip title='Download Resume'><TextSnippet style={{color:'#616161'}}></TextSnippet></Tooltip></a>
            ),
          };
        } else if (column.field === 'photo') {
          return {
            ...column,
            render: (rowData) => (
              <a href="#" onClick={() => handlePhotoDown(rowData._id, rowData.name)}><Tooltip title="Download Photo"><Image style={{color:'#616161'}}></Image></Tooltip></a>
            ),
          };
        }
        return column;
      })}
      data={B}
      icons={tableIcons}
      editable={{onRowUpdate:handleRowUpdate}}
      actions={[
      rowData=>(  {
          icon: tableIcons.View,
          tooltip: 'View Details',
          onClick: (event, rowData) => handleView(event,rowData),
          disabled: rowData.length !=1
        }),
      ]}
      options={{
        actionsColumnIndex: -1,
        exportButton: true,
        exportCsv: exportCsv,
        exportPdf: exportPdf,
        grouping: true,
        selection:true,
        columnsButton:true,
        headerStyle:{
          backgroundColor:'#42a5f5',
          color:'black'
        }
        
      }}
    />
)}
    </ThemeProvider>
  
  );
};
export default ApplicationTracker;
