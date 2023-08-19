import MaterialTable from 'material-table';
// import tableIcons from './MaterialTableIcons';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import tableIcons from 'views/addemployeetable/MaterialTableIcons';
const columns = [
 
  { title: 'Job ID', field: 'uuid' },
  { title: 'Jobrole', field: 'Jobrole' },
  {title: 'No of Openings', field: 'Openings'},
  { title: 'Location', field: 'Location' },
  {title:'Worktype', field: 'Worktype'},
  { title: 'Deadline', field: 'Deadline' },
  
];
const csvColumns = ['Job ID','Jobrole', 'No.of.Openings', 'Company', 'Location',' Qualification','Year of Passing','Skills','Experience','Application Link','Deadline'];
const RecruitmentTable = () => {
  const [Adata, setAdata] = useState([]);
  
const navigate=useNavigate()
  const fetchEmployees = async () => {
    const res = await axios.get(`https://hrm-backend-square.onrender.com/rec/getRec`);
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

  return (
    <MaterialTable
      title={<div style={{fontSize:'20px',marginTop:'10px',marginBottom:'10px'}}>Recruitment Table</div>}
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
export default RecruitmentTable;