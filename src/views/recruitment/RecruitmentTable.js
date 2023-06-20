import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Table, TableCell, TableRow, TableBody, Grid, TableHead, TableContainer, Paper, Button } from '@mui/material';

// Mock data for demonstration purposes
const candidates = [
  { id: 1, JobRole: 'Software Associate', No: 10, Dead: 'July 17', status: 'In Progress', Success: '70%', Select: 8 },
  { id: 2, JobRole: 'Data Analyst', No: 12, Dead: 'July 22', status: 'Interview Scheduled', Success: '80%', Select: 5 },
  { id: 3, JobRole: 'HR Generlist', No: 15, Dead: 'July 05', status: 'Hired', Success: '87%', Select: 12 },
  { id: 4, JobRole: 'Software Tester', No: 13, Dead: 'Aug 17', status: 'Rejected', Success: '78%', Select: 11 }
];

const RecruitmentTable = () => {
  const [candidateList, setCandidateList] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    setCandidateList(candidates);
  }, []);

  return (
    <MainCard title="Recruitment">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell>ID</TableCell> */}
                  <TableCell>Job Role</TableCell>
                  <TableCell>No of Openings</TableCell>
                  <TableCell>Deadline</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Selected</TableCell>
                  <TableCell>Success</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {candidateList.map((candidate) => (
                  <TableRow key={candidate.id}>
                    {/* <TableCell>{candidate.id}</TableCell> */}
                    <TableCell>{candidate.JobRole}</TableCell>
                    <TableCell>{candidate.No}</TableCell>
                    <TableCell>{candidate.Dead}</TableCell>
                    <TableCell>{candidate.status}</TableCell>
                    <TableCell>{candidate.Select}</TableCell>
                    <TableCell>{candidate.Success}</TableCell>
                    <TableCell>
                      <Button variant="contained">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default RecruitmentTable;
