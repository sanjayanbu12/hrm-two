import MaterialTable from 'material-table';
import tableIcons from '../addemployeetable/MaterialTableIcons';
import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { Tooltip } from '@mui/material';
import { TextSnippet } from '@mui/icons-material';
import { saveAs } from 'file-saver';
import axios from 'axios';
import ApiContext from 'context/api/ApiContext';
import { useContext } from 'react';

const columns = [
  { title: 'Name', field: 'name' },
  { title: 'Email', field: 'email' },
  { title: 'Phone', field: 'phone' },
  { title: 'Qualification', field: 'qualification' },
  {
    title: 'Status',
    field: 'Status',
    render: (rowData) => {
      if (rowData.Status === 'Selected') {
        return (
          <Tooltip title="Selected">
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'green', marginLeft: '5px' }} />
          </Tooltip>
        );
      }
      return null;
    }
  },
  { title: 'Resume', field: 'resume' }
];
const csvColumns = [
  'name',
  'email',
  'phone',
  'position',
  'qualification',
  'college',
  'graduationYear',
  'department',
  'cgpa',
  'hse',
  'sslc',
  'experience',
  'round1',
  'round2',
  'round3',
  'Status'
];

export const FeedSelectedTable = () => {
  const [edata, setedata] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log('xxxxx', edata);
  const { atsContextData } = useContext(ApiContext);

  const fetchEmployeesData = async () => {
    try {
      const response = atsContextData;
      const employees = response.data.getData.filter((item) => item.Status === 'Selected');
      setedata(employees);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading to false on error as well
    }
  };

  useEffect(() => {
    fetchEmployeesData();
  }, [atsContextData]);

  const handleResume = async (id, name) => {
    try {
      const response = await axios.get(`https://hrm-backend-square.onrender.com/ats/resume/${id}`, {
        responseType: 'arraybuffer'
      });
      const byteArray = new Uint8Array(response.data);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      saveAs(blob, `${name} resume.pdf`);
    } catch (error) {
      console.log('Error downloading resume:', error);
    }
  };

  const exportCsv = (columns, data) => {
    const csvData = data.map((item) => ({
      name: item.name,
      email: item.email,
      phone: item.phone,
      position: item.position,
      qualification: item.qualification,
      college: item.college,
      graduationYear: item.graduationYear,
      department: item.department,
      cgpa: item.cgpa,
      hse: item.hse,
      sslc: item.sslc,
      experience: item.experience,
      round1: item.round1,
      round2: item.round2,
      round3: item.round3,
      status: item.status
    }));

    const csvHeaders = csvColumns.map((column) => column);
    const csvRows = [csvHeaders, ...csvData.map((item) => Object.values(item).map((value) => `"${value}"`))];
    const csvContent = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Selected Candidate');
    link.click();
  };
  const exportPdf = (columns, data) => {
    const pdf = new jsPDF('landscape');
    pdf.text('Selected Candidate', 10, 10);

    const rows = data.map((item) => [
      item.name,
      item.email,
      item.phone,
      item.position,
      item.qualification,
      item.college,
      item.graduationYear,
      item.department,
      item.cgpa,
      item.hse,
      item.sslc,
      item.experience,
      item.round1,
      item.round2,
      item.round3,
      item.Status
    ]);
    const columnStyle = {
      0: { columnWidth: 50 },
      1: { columnWidth: 50 },
      2: { columnWidth: 50 },
      3: { columnWidth: 50 },
      4: { columnWidth: 50 },
      5: { columnWidth: 50 },
      6: { columnWidth: 50 },
      7: { columnWidth: 50 },
      8: { columnWidth: 50 },
      9: { columnWidth: 50 },
      10: { columnWidth: 50 },
      11: { columnWidth: 50 },
      12: { columnWidth: 50 },
      13: { columnWidth: 50 }
    };
    const pdfHeaders = [
      'name',
      'email',
      'phone',
      'position',
      'qualification',
      'college ',
      'graduationYear',
      'department',
      'cgpa',
      'hse',
      'sslc',
      'experience',
      'round1',
      'round2',
      'round3',
      'Status'
    ];
    pdf.autoTable({
      head: [pdfHeaders],
      body: rows,
      startY: 20,
      columnStyle: columnStyle,
      theme: 'grid'
    });

    pdf.save('Selected_candidate.pdf');
  };

  return (
    <>
      {/* <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: 'flex' }}>
        <Button
          onClick={() => navigate(`/newemployee`)}
          sx={{
            background: 'rgba(33, 150, 243, 0.04)',
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '0px',
            marginBottom: '0px'
          }}
        >
          <TableViewIcon />
          Form
        </Button>
      </Box> */}

      {loading ? (
        // Show loader while loading
        <div className="spinner" style={{ position: 'absolute', bottom: '40%', right: '45%' }} />
      ) : (
        <MaterialTable
          raised={true}
          title={<div style={{ fontWeight: 'bold', fontSize: '20px' }}>Selected Candidates</div>}
          columns={columns.map((column) => {
            if (column.field === 'resume') {
              return {
                ...column,
                render: (rowData) => (
                  <a href="#" onClick={() => handleResume(rowData._id, rowData.name)}>
                    <Tooltip title="Download Resume">
                      <TextSnippet style={{ color: 'red' }} />
                    </Tooltip>
                  </a>
                )
              };
            }
            return column;
          })}
          data={edata}
          icons={tableIcons}
          // style={{ boxShadow: '0px 2px 4px rgba(1, 1, 1, 1)' }}
          options={{
            actionsColumnIndex: 6,
            exportButton: true,
            exportCsv: exportCsv,
            exportPdf: exportPdf,
            grouping: true,
            headerStyle: {
              background: 'linear-gradient(180deg,#3a59af,#352786)',
              color: '#fff'
            },
            headerCellStyle: {
              color: 'white'
            }
          }}
        />
      )}
    </>
  );
};
