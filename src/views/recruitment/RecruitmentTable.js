import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  Grid,
  TableHead,
  TableContainer,
  Paper,
  Button,
  Box,
  CircularProgress
} from '@mui/material';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';

const RecruitmentTable = () => {
  const [RecruitmentList, setRecruitmentList] = useState([]);
  const [Loader, setLoader] = useState(true);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://hrm-backend-square.onrender.com/rec/getRec')
      .then((res) => {
        setRecruitmentList(res.data.getData);
        setLoader(false);
        console.log(res.data.getData + ` this is data `);
      })
      .catch((error) => {
        console.log('Error retrieving user data: ', error);
      });
  }, []);
  const View = (id) => {
    navigate(`/View/${id}`);
  };

  return (
    <MainCard title="Recruitment Table">
      {Loader ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh" // Set the height of the container
        >
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: 'flex' }}>
            <Button
              onClick={() => {
                navigate('/RecruitmentForm');
              }}
              sx={{
                padding: 0.6,
                background: '#673ab7',
                color: '#efebe9',
                '&:hover': {
                  color: theme.palette.secondary.light,
                  background: 'green'
                }
              }}
            >
              <AddIcon />
              Add New Job
            </Button>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {RecruitmentList.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Job Role</TableCell>
                        <TableCell>No of Openings</TableCell>
                        <TableCell>Worktype</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Deadline</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {RecruitmentList.map((x) => (
                        <TableRow
                          key={x._id}
                          onClick={() => {
                            View(x._id);
                          }}
                        >
                          <TableCell>{x._id}</TableCell>
                          <TableCell>{x.Jobrole}</TableCell>
                          <TableCell>{x.Openings}</TableCell>
                          <TableCell>{x.Worktype}</TableCell>
                          <TableCell>{x.Location}</TableCell>
                          <TableCell>{x.Deadline}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <h3>NO DATA </h3>
              )}
            </Grid>
          </Grid>
        </div>
      )}
    </MainCard>
  );
};

export default RecruitmentTable;
