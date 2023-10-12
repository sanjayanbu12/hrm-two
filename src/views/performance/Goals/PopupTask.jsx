import React, { useState } from 'react';
import { TextField, Button, IconButton, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import '../Feedback/PopupCard.css';
import { useParams } from 'react-router';

const PopupTask = ({ onClose, reloadTasks }) => {
  const [TaskTitle, setTaskTit] = useState('');
  const [TaskDescription, setTaskDes] = useState('');
  const id=useParams()
  const handleSubmit = async () => {
    try {
      if (TaskTitle && TaskDescription) {
        const response = await axios.post('http://localhost:3001/task/create', {

          title: TaskTitle,
          description: TaskDescription,
          goalid: id.id,
        });
        console.log('Task added:', response.data);

        setTaskTit('');
        setTaskDes('');


        // Reload skills in the parent component
        reloadTasks();

        onClose();
      } else {
        console.log('Please fill in all fields.');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2>Add New Task</h2>
          <IconButton onClick={onClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Task Title"
            variant="outlined"
            sx={{ width: '100%', marginTop: '10px' }}
            value={TaskTitle}
            onChange={(e) => setTaskTit(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Task Description"
            variant="outlined"
            sx={{ width: '100%', height:"", marginTop: '10px' }}

            multiline
            rowsMax={6}
            value={TaskDescription}
            onChange={(e) => setTaskDes(e.target.value)}
          />
        </div>

        <div style={{ marginTop: '10px', padding: '10px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PopupTask;
