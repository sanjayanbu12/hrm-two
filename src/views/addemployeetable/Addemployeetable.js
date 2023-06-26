import MainCard from 'ui-component/cards/MainCard';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import TotalOrderLineChartCard from 'views/dashboard/Default/TotalOrderLineChartCard';
import EarningCard from 'views/dashboard/Default/EarningCard';
// import PopularCard from 'views/dashboard/Default/PopularCard';
// import TotalIncomeDarkCard from 'views/dashboard/Default/TotalIncomeDarkCard';
// import TotalGrowthBarChart from 'views/dashboard/Default/TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, InputAdornment } from '@mui/material';



const Addemployeetable = () => 
  {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
      setLoading(false);
    }, []);

  const theme = useTheme();
  const navigate = useNavigate();
  const [edata, setedata] = useState([]);
  const [searchText, setSearchText] = useState('');
  // const[curentPage,setCurrentPage]=useState(1)

  const fetchEmployees = async() => {
    const res=await axios.get(`https://hrm-backend-square.onrender.com/api/allempoyee`)
    console.log(`this is res `+res)
    setedata(res.data.getData)
  };

  useEffect(() => {
    fetchEmployees();
  }, [])

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    // setCurrentPage(1);
  };

  const filteredEmployees = edata.filter((employee) =>{
    const lowersearchText=searchText.toLowerCase();
    return Object.values(employee).some((value) => value&& value.toString().toLowerCase().includes(lowersearchText));
  });
  

  return (
<>
<MainCard title="Employee Information Management">

<Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing} sx={{
          gap:'50px',
          margin:' 0px 10px',
        }}>
          
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid>
          {/* <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item lg={80} md={64} sm={44} xs={32}>
                <TotalIncomeDarkCard isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>
      </Grid>

    
      <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: 'flex' }}>
        <Button
          onClick={() => {
            navigate('/newemployee');
          }}
          sx={{
            padding: 1.5,
            background: 'rgba(33, 150, 243, 0.04)',
            color: theme.palette.secondary.dark,
            '&:hover': {
              color: theme.palette.secondary.dark
            }
          }}
        >
          <AddIcon />
          Add New Employee
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center', mb: 2,display: 'flex' }}>
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
          />
        </Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Employee ID</TableCell>
              <TableCell align="center">Employee Name</TableCell>
              <TableCell align="center">Department Name</TableCell>
              <TableCell align="center">Designation</TableCell>
              <TableCell align="center">Work Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
        {
           edata.length > 0 && filteredEmployees.length > 0  ? 
            edata.map && filteredEmployees.map ((x) => (
            // edata.length>0?
            // edata.map((x) => (
              <TableRow key={x.id}>
                <TableCell component="th" scope="row" align="center">
                  {x.employeeid}
                </TableCell>
                <TableCell align="center">{x.name}</TableCell>
                <TableCell align="center">{x.dept}</TableCell>
                <TableCell align="center">{x.desi}</TableCell>
                <TableCell align="center">{x.type}</TableCell>
                <TableCell align="center">
                </TableCell>
              </TableRow>
          ))
           : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No data found
              </TableCell>
            </TableRow>
          )}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
    </>
  );
};

export default Addemployeetable;
