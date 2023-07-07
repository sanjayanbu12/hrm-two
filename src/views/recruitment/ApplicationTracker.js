import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';

const ApplicationTracker = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/ats/');
      const newData = response.data.getData.map((item) => {
        // const photoUrl = `data:image/jpeg;base64,${item.photo.data}`;
        // console.log(photoUrl)
        const resumeUrl = `data:application/pdf;base64,${item.resume.data}`;
        return { ...item, resumeUrl };
      });
      setData(newData);
      console.log(newData, ' this is the new data');
    } catch (error) {
      console.log('Error retrieving user data:', error);
    }
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
            </TableRow>
          </TableHead>
          <TableBody>
            {Data.map((x) => (
              <TableRow key={x._id}>
                <TableCell>{x.name}</TableCell>
                <TableCell>{x.position}</TableCell>
                <TableCell>
                  {x.photo && (
                    <img
                    src={`data:image/jpeg;base64,${x.photo.data.data}`}
                    alt=" "
                    style={{ width: '100px' }}
                  />
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};

export default ApplicationTracker;
