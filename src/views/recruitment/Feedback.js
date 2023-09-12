import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const FeedbackPopup = ({ open, onClose, onSubmit,Name }) => {
  const [feedback, setFeedback] = useState('');
  console.log({Name}+"Name")
  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(feedback);
    setFeedback('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Provide Feedback {Name}</DialogTitle>
      <DialogContent>
        <TextField sx={{marginTop:'10px',marginBottom:'10px'}}
          label="Round 1"
          multiline
          rows={1}
          fullWidth
          variant="outlined"
          value={feedback}
          onChange={handleFeedbackChange}
        />
         <TextField sx={{marginTop:'10px',marginBottom:'10px'}}
          label="Round 2"
          multiline
          rows={1}
          fullWidth
          variant="outlined"
          value={feedback}
          onChange={handleFeedbackChange}
        />
         <TextField sx={{marginTop:'10px',marginBottom:'10px'}}
          label="Round 3"
          multiline
          rows={1}
          fullWidth
          variant="outlined"
          value={feedback}
          onChange={handleFeedbackChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackPopup;
