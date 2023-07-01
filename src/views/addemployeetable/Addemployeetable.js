import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, InputAdornment } from '@mui/material';
import { Pagination } from '@mui/lab';

const Addemployeetable = () => {
//   const [isLoading, setLoading] = useState(true);
// useEffect(() => {
//   setLoading(false);
// }, []);


  const theme = useTheme();
  const navigate = useNavigate();
  const [edata, setedata] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  const fetchEmployees = async () => {
    const res = await axios.get(`https://hrm-backend-square.onrender.com/api/allemployee`);
    console.log(res.data);
    setedata(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };

  const filteredEmployees = edata.filter((employee) => {
    const lowerSearchText = searchText.toLowerCase();
    return Object.values(employee).some((value) => value && value.toString().toLowerCase().includes(lowerSearchText));
  });

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const idclick = (employeeid) => {
    console.log(employeeid + 'sjs');
    const selectedId = edata.find((data) => data.employeeid === employeeid);
    navigate(`/viewdetails/${employeeid}`, { state: { data: selectedId } });
  };

  const indexOfLastEmployee = currentPage * rowsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  return (
    <>
      <MainCard title="Employee Information Management">
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing} sx={{ gap: '50px', margin: ' 0px 10px' }}>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                {/* EarningCard component */}
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>

                {/* TotalOrderLineChartCard component */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
<div>
  <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: 'flex' }}>
    <Button
      onClick={() => navigate(`/newemployee`)}
      sx={{
        padding: 1.5,
        background: 'rgba(33, 150, 243, 0.04)',
        color: theme.palette.secondary.dark,
        '&:hover': {
          color: theme.palette.secondary.dark,
        },
        // Add custom CSS properties
        top:'-10px'
      }}
      
    >
      <AddIcon />
      Add New Employee
    </Button>
  </Box>
  <Box sx={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center', mb: 2, display: 'flex' }}>
    <TextField
      label="Search"
      variant="outlined"
      value={searchText}
      onChange={handleSearch}
      size="small"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      // Add custom CSS properties
      sx={{
        top:'-60px',
      }}
    />
  </Box>
</div>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Employee ID</TableCell>
                <TableCell align="center">Employee Name</TableCell>
                <TableCell align="center">Department Name</TableCell>
                <TableCell align="center">Designation</TableCell>
                <TableCell align="center">Work Type</TableCell>
                {/* <TableCell align="center"></TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentEmployees.length > 0 ? (
                currentEmployees.map((x) => (
                  <TableRow key={x.id}>
                    <TableCell component="th" scope="row" align="center" onClick={() => idclick(x._id)}>
                      {x.employeeid}
                    </TableCell>
                    <TableCell align="center" onClick={() => idclick(x._id)}>
                      {x.name}
                    </TableCell>
                    <TableCell align="center">{x.dept}</TableCell>
                    <TableCell align="center">{x.desi}</TableCell>
                    <TableCell align="center">{x.type}</TableCell>
                    {/* <TableCell align="center">
                      Edit button
                    </TableCell> */}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2,
        padding: 1.5,
        background: 'rgba(33, 150, 243, 0.04)',
        color: theme.palette.secondary.dark,
        '&:hover': {
          color: theme.palette.secondary.dark,
        },
      }}>
          <Pagination
            count={Math.ceil(filteredEmployees.length / rowsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </MainCard>
    </>
  );
};

export default Addemployeetable;