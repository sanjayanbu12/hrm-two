import MainCard from 'ui-component/cards/MainCard';
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Box, Button } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

const Addemployeetable = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [edata, setedata] = useState([]);
  const fetchEmployees = async() => {
    const res=await axios.get(`https://hrm-backend-square.onrender.com/api/getEmployee`)
    setedata(res.data.getData)
  };

  useEffect(() => {
    fetchEmployees();
  }, [])
  
  return (
    <MainCard title="Employee Information Management">
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
          Add New
        </Button>
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
            {edata.length>0?edata.map((x) => (
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
            )):<h3>no data is found</h3>}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};

export default Addemployeetable;