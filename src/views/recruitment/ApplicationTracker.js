import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { useNavigate } from 'react-router-dom';
import tableIcons from 'views/addemployeetable/MaterialTableIcons';
import jsPDF from 'jspdf';
import { Image, TextSnippet } from '@mui/icons-material';
import { Card, ThemeProvider, Tooltip, createMuiTheme } from '@mui/material';
import { useContext } from 'react';
import ApiContext from 'context/api/ApiContext';

const columns = [
  { title: 'Name', field: 'name', editable: false, Width: '50px' },
  { title: 'Jobrole', field: 'position', editable: false },
  { title: 'Mobile No', field: 'phone', sorting: false, editable: false },
  { title: 'Email', field: 'email', sorting: false, editable: false },
  { title: 'Resume', field: 'resume', sorting: false, editable: false },

  { title: 'Applying Date', field: 'appliedAt', type: 'date', sorting: false, editable: false }
];

const ApplicationTracker = () => {
  const [Adata, setAdata] = useState([]);
  const [Loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const { atsContextData } = useContext(ApiContext);
  const fetchAts = async () => {
    try {
      setLoader(true);
      const res = atsContextData;
      const filldata = res.data.getData;

      setAdata(filldata);
      setLoader(false);
      console.log('atsdata', res.data.getData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownloadResume = (resumeUrl,) => {
    window.open(resumeUrl, '_blank');
  };
  useEffect(() => {
    fetchAts();
  }, [atsContextData]);

  const exportCsv = (columns, data) => {
    const csvData = data.map((item) => ({
      Name: item.name,
      JobRole: item.position,
      MobileNo: item.phone,
      Email: item.email,
      Qualification: item.department,
      College: item.college,
      CGPA: item.cgpa,
      YearOfPassing: item.graduationYear,
      Experience: item.experience,
      SSLCPercentage: item.sslc,
      HSCPercentage: item.hsc
    }));
    const csvHeaders = [
      'Name',
      'Jobrole',
      'Mobile No',
      'Email',
      'Qualification',
      'College',
      'CGPA',
      'Year of Passing',
      'Experience',
      'SSLC Percentage',
      'HSC Percentage'
    ];
    const csvRows = [csvHeaders, ...csvData.map((item) => Object.values(item).map((value) => `"${value}"`))];
    const csvContent = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Applied_Candidates_list.csv');
    link.click();
  };

  const exportPdf = (columns, data) => {
    const pdf = new jsPDF('landscape');
    pdf.text('Application Tracker', 10, 10);

    const rows = data.map((item) => [
      item.name,
      item.position,
      item.phone,
      item.email,
      item.department,
      item.college,
      item.cgpa,
      item.graduationYear,
      item.experience,
      item.sslc,
      item.hsc
    ]);
    const columnStyle = {
      0: { columnWidth: 20 },
      1: { columnWidth: 20 },
      2: { columnWidth: 35 },
      3: { columnWidth: 20 },
      4: { columnWidth: 20 },
      5: { columnWidth: 40 },
      6: { columnWidth: 30 },
      7: { columnWidth: 20 },
      8: { columnWidth: 20 },
      9: { columnWidth: 23 },
      10: { columnWidth: 30 },
      11: { columnWidth: 25 },
      12: { columnWidth: 20 }
    };
    const pdfHeaders = [
      'Name',
      'Jobrole',
      'Mobile No',
      'Email',
      'Qualification',
      'College',
      'CGPA',
      'Year of Passing',
      'Experience',
      'SSLC Percentage',
      'HSC Percentage'
    ];
    pdf.autoTable({
      head: [pdfHeaders],
      body: rows,
      startY: 20,
      columnStyle: columnStyle,
      theme: 'grid'
    });

    pdf.save('Applied_Candidates_list.pdf');
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#757575'
      },
      secondary: {
        main: '#7e57c2'
      }
    }
  });

  const handleView = async (e, data) => {
    const id = data.map((x) => x._id);
    console.log(data);
    navigate(`/applicationview1/${id[0]}`);
  };

  return (
    <Card raised={true}>
      <ThemeProvider theme={theme}>
        {Loader ? (
          <div className="spinner" style={{ position: 'absolute', bottom: '40%', right: '45%' }} />
        ) : (
          <MaterialTable
            title={<div style={{ fontSize: '20px', marginTop: '10px', marginBottom: '10px' }}>Application Tracker</div>}
            columns={columns.map((column) => {
              if (column.field === 'resume') {
                return {
                  ...column,
                  render: (rowData) => (
                    <a href="#" onClick={() => handleDownloadResume(rowData.resume.url)}>
                      <Tooltip title="Download Resume">
                        <TextSnippet style={{ color: '#616161' }} />
                      </Tooltip>
                    </a>
                  )
                };
              } else if (column.field === 'photo') {
                return {
                  ...column,
                  render: (rowData) => (
                    <a href="#" onClick={() => handlePhotoDown(rowData._id, rowData.Name)}>
                      <Tooltip title="Download Photo">
                        <Image style={{ color: '#616161' }} />
                      </Tooltip>
                    </a>
                  )
                };
              }
              return column;
            })}
            data={Adata}
            icons={tableIcons}
            actions={[
              (rowData) => ({
                icon: tableIcons.View,
                tooltip: 'View Details',
                onClick: (event, rowData) => handleView(event, rowData),
                disabled: rowData.length !== 1
              })
            ]}
            options={{
              actionsColumnIndex: -1,
              exportButton: true,
              exportCsv: exportCsv,
              exportPdf: exportPdf,
              grouping: true,
              selection: true,
              columnsButton: true,
              // headerStyle: {
              //   backgroundColor: '#42a5f5',
              //   color: 'black',
              // },
              headerStyle: {
                background: 'linear-gradient(180deg,#3a59af,#352786)',
                color: '#fff' // Text color
              },
              headerCellStyle: {
                color: 'white' // Text color for header cells
              }
            }}
          />
        )}
      </ThemeProvider>
    </Card>
  );
};

export default ApplicationTracker;
