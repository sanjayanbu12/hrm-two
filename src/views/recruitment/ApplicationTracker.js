import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { saveAs } from 'file-saver';
const ApplicationTracker = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/ats/');
      const newData = response.data.getData
      setData(newData);
      console.log(response.data.getData, ' this is the new data');
    } catch (error) {
      console.log('Error retrieving user data:', error);
    }
  };
  const handleResume = async (id) => {
    try {
      const response = await axios.get(`https://hrm-backend-square.onrender.com/ats/resume/${id}`, {
        responseType: 'arraybuffer' });
      const byteArray = new Uint8Array(response.data);
      const blob = new Blob([byteArray], { type: 'application/pdf' });

      saveAs(blob,'resume.pdf');
    } catch (error) {
      console.log('Error downloading resume:', error);
    }
  };
  const handlePhotoDown = async (id) => {
    console.log(`id  = ${id}`)
    try {
      const response = await axios.get(`https://hrm-backend-square.onrender.com/ats/photo/${id}`, {
        responseType: 'arraybuffer'
      })
      const contentType = response.headers['Content-Type']
      const extension = contentType === 'image/jpeg' ? 'jpeg' : 'png';
      console.log(`type  = ${extension}`)
      const byteArray = new Uint8Array(response.data)
      console.log(`byteArray  = ${byteArray}`)
      const blob = new Blob([byteArray], { type: contentType })
      console.log(`blob  = ${blob}`)
      saveAs(blob, `photo.${extension}`)
    } catch (error) {
      console.log(error)
    }
  }

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
                <TableCell onClick={() => handlePhotoDown(x._id)} >
                  {x.photo && (
                    <img
                      src={x.photo}
                      alt=" "
                      style={{ width: '100px' }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {x.resume && (
                    <a href="#" onClick={() => handleResume(x._id)}>
                      Download
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
