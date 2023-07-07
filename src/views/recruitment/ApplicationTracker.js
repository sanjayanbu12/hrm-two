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
      const newData = response.data.getData.map((item) => {
        const photoUrl = `data:image/jpeg;base64,${item.photo.data}`;
        console.log(photoUrl)
        const resumeUrl = `data:application/pdf;base64,${item.resume.data}`;
        return { ...item, photoUrl, resumeUrl };
      });
      setData(newData);
      console.log(newData, ' this is the new data');
    } catch (error) {
      console.log('Error retrieving user data:', error);
    }
  };

  const handleStatusChange =  (e, id) => {
    const updatedData = Data.map((item) => {
      if (item._id === id) {
        return { ...item, status: e.target.value };
      }
      return item;
    });
    setData(updatedData);
    // await axios.post(`https://hrm-backend-square.onrender.com/ats/${id}`)
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
                  {x.photoUrl && (
                    <img src={x.photoUrl} alt=" " style={{ width: '100px' }} />
                  )}
                </TableCell>
                <TableCell>
                  {x.resumeUrl && (
                    <a href={x.resumeUrl} download={`${x.name}-resume.pdf`}>
                      View Resume
                    </a>
                  )}
                </TableCell>
                <TableCell>{x.phone}</TableCell>
                <TableCell>{x.email}</TableCell>
                <TableCell>
                  <Select
                    sx={{ width: '80px', height: '30px', alignItems: 'center' }}
                    value={x.status || ''}
                    onChange={(e) => handleStatusChange(e, x._id)}
                  >
                    <MenuItem value="Select">
                      <DoneIcon color="success" />
                    </MenuItem>
                    <MenuItem value="Hold">
                      <PauseIcon color="primary" />
                    </MenuItem>
                    <MenuItem value="Reject">
                      <CloseIcon color="error" />
                    </MenuItem>
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
