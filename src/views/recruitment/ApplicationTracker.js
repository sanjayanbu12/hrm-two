import { Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import MainCard from "ui-component/cards/MainCard";

const ApplicationTracker=()=>{
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
        </Table>
        </TableContainer>
        </MainCard>
        );
};
export default ApplicationTracker;