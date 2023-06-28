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
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography
} from '@mui/material';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { GridDeleteIcon } from '@mui/x-data-grid';
import { Edit } from '@mui/icons-material';
import Swal from 'sweetalert2';
// import { useParams } from 'react-router-dom';

const RecruitmentTable = () => {
  const [RecruitmentList, setRecruitmentList] = useState([]);
  const [Loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    await axios
      .get('https://hrm-backend-square.onrender.com/rec/getRec')
      .then((res) => {
        setRecruitmentList(res.data.getData);
        setLoader(false);
        console.log(res.data.getData + ` this is data `);
      })
      .catch((error) => {
        console.log('Error retrieving user data: ', error);
      });
  };
  const handleView = (id) => {
    const job = RecruitmentList.find((item) => item._id === id);
    setSelectedJob(job);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedJob(null);
  };

  const handleDelete = (id) => {
    handleClose()
    Swal.fire({
      icon: 'warning',
      text: 'Are you sure you want to delete this recruitment?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://hrm-backend-square.onrender.com/rec/getRec/${id}`);
          await fetchdata();
          handleClose();
          navigate('/Recruitmenttable');
          Swal.fire({
            icon: 'success',
            text: 'Recruitment deleted successfully.'
          });
        } catch (error) {
          console.log('Error deleting recruitment:', error);
        }
      }
    });
  };
  return (
    <MainCard title="Recruitment Table">
      {Loader ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
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
                            handleView(x._id);
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
                <h3>NO DATA</h3>
              )}
            </Grid>
          </Grid>
        </div>
      )}

      {/* Dialog Box */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        {selectedJob && (
          <>
            <DialogTitle variant="h2">Recruitment Details</DialogTitle>
            <DialogContent>
              <Typography sx={{ lineHeight: '1' }} variant="h3" component="h4">
                Job Role: {selectedJob.Jobrole}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="h5" component="h1">
                No. of Openings: {selectedJob.Openings}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="h5" component="h3">
                Company: {selectedJob.Company}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="h5" component="h3">
                Location: {selectedJob.Location}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="h5" component="h4">
                Worktype: {selectedJob.Worktype}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="h5" component="h4">
                Qualification: {selectedJob.Education}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="h5" component="h4">
                Experience: {selectedJob.Experience} Years
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="h5" component="h4">
                Requirements: {selectedJob.Requirements}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="h5" component="h4">
                Description: {selectedJob.Description}
              </Typography>
              <Typography sx={{ lineHeight: '4' }} variant="h5" component="h4">
                Last Date to Apply: {selectedJob.Deadline}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                <Button variant="outlined" endIcon={<Edit />}>
                  Edit
                </Button>
                <Button variant="contained" color="error" onClick={() => handleDelete(selectedJob._id)} startIcon={<GridDeleteIcon />}>
                  Delete
                </Button>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </MainCard>
  );
};

export default RecruitmentTable;
