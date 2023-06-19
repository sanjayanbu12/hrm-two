import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, IconButton, Typography, Card, CardContent, Modal } from '@mui/material';
import { useNavigate } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import styled from 'styled-components';

const ProjectList = () => {
  const [edata, setedata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(2);
  const [viewData, setviewData] = useState('');
  const [viewstatus, setviewstatus] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const Edit = (id) => {
    navigate('/editproject/' + id);
  };

  const ModelContent = styled(Box)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
    padding: '24px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  });

  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/projects/` + id);
      Swal.fire('Deleted!', 'The data has been deleted.', 'success');
      fetchProject();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: 'CONFIRMATION',
      text: 'Are you sure you want to delete this data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteData(id);
      }
    });
  };

  const fetchProject = () => {
    axios
      .get('http://localhost:3001/projects')
      .then((response) => {
        setedata(response.data);
      })
      .catch((error) => {
        console.log('Error retrieving user data:', error);
      });
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = edata.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(edata.length / tasksPerPage);

  const handleViewDetailsOpen = (task) => {
    setviewData(task);
    setviewstatus(true);
  };

  const handleViewDetailsClose = () => {
    setviewstatus(false);
  };

  return (
    <MainCard title="Projects List">
      <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: 'flex' }}>
        <Button
          sx={{
            padding: 1.5,
            background: 'rgba(33, 150, 243, 0.04)',
            color: theme.palette.secondary.dark,
            '&:hover': {
              color: theme.palette.secondary.dark
            }
          }}
          onClick={() => navigate('/newproject')}
        >
          <AddIcon />
          Add New
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"> PROJECT ID</TableCell>
              <TableCell align="center">Project Name</TableCell>
              <TableCell align="center">Project Owner</TableCell>
              <TableCell align="center">Scrum Master</TableCell>
              <TableCell align="center">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentTasks.map((x) => (
              <TableRow key={x.id}>
                <TableCell align="center">{x.id}</TableCell>
                <TableCell align="center">{x.name}</TableCell>
                <TableCell align="center">{x.powner}</TableCell>
                <TableCell align="center">{x.scrum}</TableCell>
                <TableCell align="center">
                  <span>
                    <IconButton aria-label="Edit" onClick={() => Edit(x.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="Delete" onClick={() => handleDeleteClick(x.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="View" onClick={() => handleViewDetailsOpen(x)}>
                      <VisibilityIcon />
                    </IconButton>
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={viewstatus}
        onClose={handleViewDetailsClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModelContent>
          <Typography variant="h3">Details of the Project</Typography>
          {viewData && (
            <Card>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  <strong>ID:</strong> {viewData.id}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <strong>Name:</strong> {viewData.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <strong>Lead:</strong> {viewData.lead}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <strong>Scrum:</strong> {viewData.scrum}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <strong>Status:</strong> {viewData.status}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <strong>Powner:</strong> {viewData.powner}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <strong>{viewData.description ? "Description" : "No Description is given"}</strong> {viewData.description ? viewData.description : null}
                </Typography>
              </CardContent>
            </Card>
          )}
        </ModelContent>
      </Modal>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '1.5rem'
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
          size="large"
          showFirstButton
          showLastButton
        />
      </Box>
    </MainCard>
  );
};

export default ProjectList;
