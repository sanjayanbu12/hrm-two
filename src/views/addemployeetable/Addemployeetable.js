import MainCard from 'ui-component/cards/MainCard';
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import Swal from 'sweetalert2';
import axios from 'axios';
const Addemployeetable = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [edata, setedata] = useState([]);

  const Edit = (id) => {
    console.log(id);
    navigate('/editemployee/' + id);
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Confirmation!',
        text: 'You will not be able to recover this employee!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        reverseButtons: true
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3001/EmployeeForm/${id}`);
        fetchEmployees();
        Swal.fire('Deleted!', 'The employee has been deleted.', 'success');
      }
    } catch (error) {
      Swal.fire('Error', `Error deleting user: ${error}`, 'error');
    }
  };
  const fetchEmployees = () => {
    fetch('http://localhost:3001/EmployeeForm')
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setedata(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, [])
  
  return (
    <MainCard title="Employees List">
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
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {edata.map((x) => (
              <TableRow key={x.id}>
                <TableCell component="th" scope="row" align="center">
                  {x.id}
                </TableCell>
                <TableCell align="center">{x.name}</TableCell>
                <TableCell align="center">{x.dept}</TableCell>
                <TableCell align="center">{x.desi}</TableCell>
                <TableCell align="center">{x.type}</TableCell>
                <TableCell align="center">
                  <IconButton aria-label="edit" onClick={() => Edit(x.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      handleDelete(x.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};

export default Addemployeetable;
