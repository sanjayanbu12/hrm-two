import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  IconButton,
  Box,
  Button,
  TextField,
  Menu,
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import Swal from 'sweetalert2';
import RecyclingIcon from '@mui/icons-material/Recycling';
import Pagination from '@mui/material/Pagination';

const priorityOrder = {
  highest: 1,
  high: 2,
  medium: 3,
  low: 4,
  lowest: 5
};

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [tasksPerPage] = useState(3); // Number of tasks to display per page
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const navigate = useNavigate();
  const theme = useTheme();

  const Edit = (id) => {
    navigate('/edittask/' + id);
  };

  const Add = () => {
    navigate('/addtask');
  };

  const handleOpenDeleteModal = (task, index) => {
    Swal.fire({
      title: 'Confirm Task Deletion',
      text: 'Are you sure you want to delete this task?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(task.id, index);
      }
    });
  };

  const fetchTask = () => {
    axios
      .get('http://localhost:3001/task')
      .then((res) => {
        setTasks(res.data);
      })
      .catch((error) => {
        console.log('Error retrieving task data: ', error);
      });
  };


// const deleteTask = async (id) => {

//   try {
//     const response = await axios.get(`http://localhost:3001/task/${id}`);
//     const deletedTask = response.data;
//     const deletionTime = new Date().toISOString() 
//     console.log(deletionTime)
//     await axios.delete(`http://localhost:3001/task/${id}`);
//     fetchTask();
//     Swal.fire('Deleted!', 'Task has been deleted.', 'success');

//     // Store the deleted task in the recycle bin on the server
//     await axios.post('http://localhost:3001/recyclebin', {...deletedTask,deletionTime});
//   } catch (error) {
//     console.error('Error deleting task:', error);
//     Swal.fire('Error', 'Failed to delete the task.', 'error');
//   }
// };

  


  // return (
  //   <MainCard title="Tasks List"    >
  //     <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: 'flex' }}>
  //       <Button
  //         sx={{
  //           padding: 1.5,
  //           background: 'rgba(33, 150, 243, 0.04)',
  //           color: theme.palette.secondary.dark,
  //           '&:hover': {
  //             color: theme.palette.secondary.dark,
  //           },
  //         }}
  //         onClick={Add}
  //       >
  //         <AddIcon />
  //         Add New
  //       </Button>
        
  const deleteTask = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/task/${id}`);
    const deletedTask = response.data;
    const deletionTime = new Date().toISOString() 
    console.log(deletionTime)
      await axios.delete(`http://localhost:3001/task/${id}`);
      fetchTask();

      Swal.fire('Deleted!', 'Task has been deleted.', 'success');
      await axios.post('http://localhost:3001/recyclebin', {...deletedTask,deletionTime});
    } catch (error) {
      console.error('Error deleting task:', error);
      Swal.fire('Error', 'Failed to delete the task.', 'error');
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);
  const handleRecycleBinClick = () => {
    navigate('/recyclebin');
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1); // Reset to the first page when search text changes
  };

  const handleSortBy = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortOption = (option) => {
    setAnchorEl(null);

    let sortedTasks = [...tasks];
    if (option === 'summary') {
      sortedTasks.sort((a, b) => a.summary.localeCompare(b.summary));
    } else if (option === 'project') {
      sortedTasks.sort((a, b) => a.project.localeCompare(b.project));
    } else if (option === 'assignee') {
      sortedTasks.sort((a, b) => a.assignee.localeCompare(b.assignee));
    } else if (option === 'priority') {
      sortedTasks.sort((a, b) => {
        const priorityA = priorityOrder[a.priority.toLowerCase()];
        const priorityB = priorityOrder[b.priority.toLowerCase()];
        return priorityA - priorityB;
      });
    }

    setTasks(sortedTasks);
  };

  const handleCloseSortMenu = () => {
    setAnchorEl(null);
  };

  const filteredTasks = tasks.filter((task) => {
    const lowerSearchText = searchText.toLowerCase();
    return Object.values(task).some((value) => value && value.toString().toLowerCase().includes(lowerSearchText));
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const tasksForCurrentPage = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'highest':
        return '#ff1744'; // Red
      case 'high':
        return '#ff8f00'; // Orange
      case 'medium':
        return '#fbc02d'; // Yellow
      case 'low':
        return '#388e3c'; // Green
      case 'lowest':
        return '#7986cb'; // Purple
      default:
        return '#000000'; // Black (fallback)
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}
      >
        <Box sx={{ display: 'flex', flexGrow: 1, maxWidth: 400 }}>
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            label="Search Tasks"
            variant="outlined"
            value={searchText}
            onChange={handleSearch}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '1rem', minWidth: 100 }}>
            <Button
              sx={{
                padding: 1.5,
                background: 'rgba(33, 150, 243, 0.04)',
                color: theme.palette.secondary.dark,
                '&:hover': {
                  color: theme.palette.secondary.dark
                }
              }}
              startIcon={<SortIcon />}
              onClick={handleSortBy}
            >
              Sort By
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseSortMenu}>
              <MenuItem onClick={() => handleSortOption('summary')}>Task Summary</MenuItem>
              <MenuItem onClick={() => handleSortOption('project')}>Projects</MenuItem>
              <MenuItem onClick={() => handleSortOption('assignee')}>Assignee</MenuItem>
              <MenuItem onClick={() => handleSortOption('priority')}>Priority</MenuItem>
            </Menu>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}>
          <Button
            sx={{
              padding: 1.5,
              background: 'rgba(33, 150, 243, 0.04)',
              color: theme.palette.secondary.dark,
              '&:hover': {
                color: theme.palette.secondary.dark
              }
            }}
            onClick={Add}
          >
            <AddIcon />
            Add New
          </Button>
          <Button
          sx={{
            padding: 1.5,
            background: 'rgba(33, 150, 243, 0.04)',
            color: theme.palette.secondary.dark,
            '&:hover': {
              color: theme.palette.secondary.dark,
            },
          }}
          onClick={handleRecycleBinClick}
        >
          <RecyclingIcon   />
           Recyle bin
        </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Task Summary</TableCell>
              <TableCell>Projects</TableCell>
              <TableCell>Assignee</TableCell>
              <TableCell align="left">Priority</TableCell>
              <TableCell>Reporter</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasksForCurrentPage.map((task, index) => (
              <TableRow key={task.id}>
                <TableCell>{task.summary}</TableCell>
                <TableCell>{task.project}</TableCell>
                <TableCell>{task.assignee}</TableCell>
                <TableCell>
                  <span style={{ color: getPriorityColor(task.priority), fontWeight: 'bold' }}>{task.priority}</span>
                </TableCell>
                <TableCell>
                  {task.reporter}
                </TableCell>
                <TableCell align="center">
                  <IconButton aria-label="edit" size="small" color="secondary" onClick={() => Edit(task.id)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton aria-label="delete" color="error" size="small" onClick={() => handleOpenDeleteModal(task, index)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '1.5rem'
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => handlePageChange(page)}
          color="secondary"
          size="large"
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
};

export default TaskList;
