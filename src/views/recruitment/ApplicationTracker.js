import {Paper,Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react"


import MainCard from "ui-component/cards/MainCard";

const ApplicationTracker=()=>{
  const Array=[{Name:'Ajay',Jobrole:'HR',Mobile:9688025071,Email:'Ajay@gmail.com',Interview:'27-08-2023',status:'select'},
  {Name:'Prakash',Jobrole:'SA',Mobile:9688025073,Email:'Prakash@gmail.com',Interview:'26-07-2023',status:'Hold'},
  {Name:'Sanjay',Jobrole:'SA',Mobile:9688025075,Email:'sanjay@gmail.com',Interview:'29-08-2023',status:'Reject'}]
    return(
    <MainCard title="Application Tracker">
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
          <TableCell>Interview Date</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
     
      {Array.map(x=>( 
         <TableRow key={x.id}> 
         <TableCell>{x.Name}</TableCell>
          <TableCell>{x.Jobrole}</TableCell>
          <TableCell>-</TableCell>
          <TableCell>-</TableCell>
          <TableCell>{x.Mobile}</TableCell>
          <TableCell>{x.Email}</TableCell>
          <TableCell>{x.Interview}</TableCell>
          <TableCell>{x.status} </TableCell>
          </TableRow>
        ))}
      
      
      </TableBody>
        </Table>
        </TableContainer>
        </MainCard>
        );
};
export default ApplicationTracker;