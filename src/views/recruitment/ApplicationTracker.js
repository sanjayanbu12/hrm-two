import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import DoneIcon from '@mui/icons-material/Done';
import PauseIcon from '@mui/icons-material/Pause';
import CloseIcon from '@mui/icons-material/Close';

const ApplicationTracker = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/ats/');
      const newData = response.data.getData;
      setData(newData);
      console.log(newData, ' this is the new data');
    } catch (error) {
      console.log('Error retrieving user data:', error);
    }
  };

  const handleStatusChange = (event, id) => {
    const updatedData = Data.map((item) => {
      if (item._id === id) {
        return { ...item, status: event.target.value };
      }
      return item;
    });
    setData(updatedData);
  };

  return (
    <MainCard title='Application Tracker'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Jobrole</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>Resume</TableCell>
              <TableCell>Mobile No</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Data.map((x) => (
              <TableRow key={x._id}>
                <TableCell>{x.name}</TableCell>
                <TableCell>{x.position}</TableCell>
                <TableCell>
                  {x.photo && <img src={x.photo} alt=".jpeg" style={{ width: '100px' }} />}
                </TableCell>
                <TableCell>
                  {x.resume && (
                    <a href={x.resume} target="_blank" rel="noopener noreferrer">
                      View Resume
                    </a>
                  )}
                </TableCell>
                <TableCell>{x.phone}</TableCell>
                <TableCell>{x.email}</TableCell>
                <TableCell>
                  <Select 
                 sx={{width:"80px",height:'30px',alignItems:'center'}}value={x.status || ''} onChange={(event) => handleStatusChange(event, x._id)}>
                    <MenuItem value="Select"><DoneIcon color='success'/> </MenuItem>
                    <MenuItem value="Hold">< PauseIcon color='primary'/></MenuItem>
                    <MenuItem value="Reject"><CloseIcon color='error'/></MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};

export default ApplicationTracker;
