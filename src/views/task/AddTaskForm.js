import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import { Grid, Box, Button, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';


const AddTaskForm = () => {
  const theme = useTheme();
  const [project, setProject] = useState('');
  const [issueType, setIssueType] = useState('');
  const [summary, setSummary] = useState('');
  const [reporter, setReporter] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch("http://localhost:3001/task/" + id).then((res) => {
      return res.json();
    }).then((resp) => {
      console.log("resp", resp)
      setProject(resp.project);
      setIssueType(resp.issueType);
      setSummary(resp.summary);
      setReporter(resp.reporter);
      setAssignee(resp.assignee);
      setPriority(resp.priority);
      setDescription(resp.description);
    }).catch((err) => {
      console.log(err.message)
  
    })
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit")
    
    if (!project || !issueType || !summary || !reporter || !assignee || !priority) {
      return;
    }

    const task = {
      id: uuidv4(),
      project,
      issueType,
      summary,
      reporter,
      assignee,
      priority,
      description
    };

    const updatedTask = {
      project,
      issueType,
      summary,
      reporter,
      assignee,
      priority,
      description
    }

    if(id){
      console.log("Id", id)
      try {
        await axios.put('http://localhost:3001/task/'+id, updatedTask);
        setProject('');
        setIssueType('');
        setSummary('');
        setReporter('');
        setAssignee('');
        setPriority('');
        setDescription('');
        Swal.fire({
          icon:'success',
          text:"Task Updated Successfully.",
        }).then(()=>{
          navigate('/tasklist');
        })
      } catch (error) {
        Swal.fire({
        icon:"error",
        text:"Error Updating Task"
      })
      }
    }else{
      try {
        await axios.post('http://localhost:3001/task', task);
        setProject('');
        setIssueType('');
        setSummary('');
        setReporter('');
        setAssignee('');
        setPriority('');
        setDescription('');
        Swal.fire({
          icon:'success',
          text:"Task Created Successfully",
        }).then(()=>{
          navigate('/tasklist');
        })
      } catch (error) {
        Swal.fire({
        icon:"error",
        text:"Error Creating Task"
      })
      }
    }

   
  };


  return (
    <MainCard title="Task Form">
      <ValidatorForm  onSubmit={(e)=>{handleSubmit(e)}} >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <SelectValidator
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                value={project}
                label="Project"
                onChange={(e) => setProject(e.target.value)}
                validators={['required']}
                errorMessages={['Project is required']}
                variant="outlined"
              >
                <MenuItem value="Project 1">Project 1</MenuItem>
                <MenuItem value="Project 2">Project 2</MenuItem>
              </SelectValidator>
            </Grid>
            <Grid item xs={4}>
              <SelectValidator
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                value={issueType}
                label="Issue Type"
                onChange={(e) => setIssueType(e.target.value)}
                validators={['required']}
                errorMessages={['Issue Type is required']}
                variant="outlined"
              >
                <MenuItem value="Story">Story</MenuItem>
                <MenuItem value="QA Task">QA Task</MenuItem>
                <MenuItem value="Bug">Bug</MenuItem>
                <MenuItem value="Research">Research</MenuItem>
                <MenuItem value="Documentation">Documentation</MenuItem>
              </SelectValidator>
            </Grid>
            <Grid item xs={4}>
              <SelectValidator
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                value={reporter}
                label="Reporter"
                onChange={(e) => setReporter(e.target.value)}
                validators={['required']}
                errorMessages={['Reporter is required']}
                variant="outlined"
              >
                <MenuItem value="Prem">Prem</MenuItem>
                <MenuItem value="Priya">Priya</MenuItem>
                <MenuItem value="Gayathri">Gayathri</MenuItem>
                <MenuItem value="Harish">Harish</MenuItem>
              </SelectValidator>
            </Grid>
            <Grid item xs={4}>
              <SelectValidator
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                value={assignee}
                label="Assignee"
                onChange={(e) => setAssignee(e.target.value)}
                validators={['required']}
                errorMessages={['Assignee is required']}
                variant="outlined"
              >
                <MenuItem value="Prem">Prem</MenuItem>
                <MenuItem value="Priya">Priya</MenuItem>
                <MenuItem value="Gayathri">Gayathri</MenuItem>
                <MenuItem value="Harish">Harish</MenuItem>
              </SelectValidator>
            </Grid>
            <Grid item xs={4}>
              <SelectValidator
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                value={priority}
                label="Priority"
                onChange={(e) => setPriority(e.target.value)}
                validators={['required']}
                errorMessages={['Priority is required']}
                variant="outlined"
              >
                <MenuItem value="Highest">Highest</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Lowest">Lowest</MenuItem>
              </SelectValidator>
            </Grid>
            <Grid item xs={8}>
              <TextValidator
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                value={summary}
                label="Summary"
                onChange={(e) => setSummary(e.target.value)}
                validators={['required']}
                errorMessages={['Summary is required']}
                multiline
                rows={2}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={8}>
              <TextValidator
                sx={{ minWidth: '100%' }}
                id="outlined-basic"
                value={description}
                label="Description"
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={3}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1, marginTop: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    boxShadow: 'none',
                    minWidth: '100%',
                    borderRadius: 2,
                    padding: 1.5,
                    background: theme.palette.secondary.dark,
                    color: theme.palette.secondary.light,
                    '&:hover': {
                      background: theme.palette.secondary.dark,
                      color: theme.palette.secondary.light
                    }
                    
                  }}
                >
                  {id ? 'Update' : 'Save'}
                </Button>
            </Grid>
          </Grid>
        </Box>
      </ValidatorForm>
    </MainCard>
  );
};

export default AddTaskForm;