import React, {  useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import MainCard from 'ui-component/cards/MainCard';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const UserList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

const FetchUsers=()=>{

    axios
      .get('http://localhost:3001/Users')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log('Error retrieving user data:', error);
      });
}
  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/Users/${id}`);
FetchUsers();
      
      Swal.fire('Deleted!', 'The data has been deleted.', 'success');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: 'CONFIRMATION',
      text: 'Are you sure you want to delete this data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteData(id);
      }
    });
  };

  useEffect(() => {
    FetchUsers();
  }, [])
  
   

  return (
    <MainCard title="Users List">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">S.No</TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((x) => (
              <TableRow key={x.id}>
                <TableCell component="th" scope="row" align="center">
                  {x.id}
                </TableCell>
                <TableCell align="center">{x.firstname}</TableCell>
                <TableCell align="center">{x.lastname}</TableCell>
                <TableCell align="center">{x.email}</TableCell>
                <TableCell align="center">{x.role}</TableCell>
                <TableCell align="center">
                  <DeleteIcon
                    sx={{ mr: '10px' }}
                    onClick={() => handleDeleteClick(x.id)}
                  />
                  <EditIcon
                    onClick={() => {
                      navigate('/userform/' + x.id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};

export default UserList;
