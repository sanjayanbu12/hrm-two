import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { saveAs } from 'file-saver';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { Box } from '@mui/system';
const ApplicationTracker = () => {
  const [Data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);
const downloadStyles={
  cursor: 'pointer',
  transform: 'scale(1.1)',
  transition: 'transform 0.3s ease',
  // Additional styles for hover
  '&:hover': {
    backgroundColor: 'blue', // Change the background color on hover
    color: 'white', // Change the text color on hover
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)', // Add a shadow on hover
  },
}
  const fetchData = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/ats/');
      const newData = response.data.getData
      setData(newData);
      setLoader(false)
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
        {loader ? (<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>)
      :  
 
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
                <TableCell  >
                  {x.photo && (
                    // <img
                    //   src={x.photo}
                    //   alt=" "
                    //   style={{ width: '100px' }}
                    // />
                  <InsertPhotoIcon style={downloadStyles} onClick={() => handlePhotoDown(x._id)}/>
                  )}
                </TableCell>
                <TableCell>
                  {x.resume && (
                    <TextSnippetIcon style={downloadStyles} onClick={() => handleResume(x._id)}  />
                  )}
                </TableCell>
                <TableCell>{x.phone}</TableCell>
                <TableCell>{x.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
}
      </TableContainer>
    </MainCard>
  );
};

export default ApplicationTracker;
