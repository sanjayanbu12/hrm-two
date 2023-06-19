import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, ButtonGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
const Recyclebin = () => {
  const [recycleddata, setrecycleddata] = useState([]);
  useEffect(() => {
   const timer=setInterval(()=>{
    fetchdata()
   },1000)
   return ()=>clearInterval(timer)
  }, []);
  //to fetch data
  const fetchdata = async () => {
    try {
      const response = await axios.get(' http://localhost:3001/recyclebin');
      const resData = response.data;
      setrecycleddata(resData);
    } catch (error) {
      console.log(error);
    }
  };
  // To delete data from recyclebin table
  const deleteFromRecyclebin = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/recyclebin/${id}`);
      console.log(`data is deleted having id${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  //to restore the data
  const handleRestore = async (data) => {
    try {
      await axios.post(`http://localhost:3001/task`, data);
      await deleteFromRecyclebin(data.id);
    } catch (error) {
      console.log(error);
    }
  };
  //to delete the data from recyclebin table permenently
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/recyclebin/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  
  //extracting id and repeat the function for every 500 sec
  useEffect(() => {
    const timer = setTimeout(async () => {
      const idsToDelete = recycleddata
        .filter((item) => {
          const deletionTime = new Date(item.deletionTime).getTime();
          const currTime = new Date().getTime();
          const differenceInSeconds = Math.floor((currTime - deletionTime) / 1000);
          return differenceInSeconds >= 30;
        })
        .map((item) => item.id);
      console.log(`idsToDelete are ${idsToDelete}`);
      if (idsToDelete.length > 0) {
        await Promise.all(idsToDelete.map((item) => deleteFromRecyclebin(item)));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [recycleddata]);

  return (
    <div>
      <h1>Recycle bin</h1>
      {recycleddata.length > 0 ? (
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Summary</TableCell>
                <TableCell align="center">Project</TableCell>
                <TableCell align="center">Assignee</TableCell>
                <TableCell align="center">Priority</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recycleddata.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{item.summary}</TableCell>
                  <TableCell align="center">{item.project}</TableCell>
                  <TableCell align="center">{item.assignee}</TableCell>
                  <TableCell align="center">{item.priority}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup sx={{ gap: '10px' }}>
                      <Button variant="contained" color="success" onClick={() => handleRestore(item)}>
                        Restore
                      </Button>
                      <Button variant="outlined" color="error" onClick={() => handleDelete(item.id)}>
                        Delete
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h3>No data is found in bin</h3>
      )}
    </div>
  );
};
export default Recyclebin;
