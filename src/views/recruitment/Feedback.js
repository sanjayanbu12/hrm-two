import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const FeedbackPopup = ({ open, onClose, onSubmit,Name}) => {
  const [feedback1, setFeedback1] = useState('');
  const [feedback2, setFeedback2] = useState('');
  const [feedback3, setFeedback3] = useState('');
 

  const handleFeedbackChange1 = (e) => {
    setFeedback1(e.target.value);
  };

  const handleFeedbackChange2 = (e) => {
    setFeedback2(e.target.value);
  };

  const handleFeedbackChange3 = (e) => {
    setFeedback3(e.target.value);
  };

  const handleSubmit = () => {
    const feedback={
      feedback1,
      feedback2,
      feedback3
    }
    onSubmit(feedback);
    setFeedback1('');
    setFeedback2('');
    setFeedback3('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Provide Feedback For <b style={{fontSize:'15px'}}>{Name}</b></DialogTitle>
      <DialogContent>
        <TextField sx={{marginTop:'10px',marginBottom:'10px'}}
          label="Round 1"
          multiline
          rows={1}
          fullWidth
          variant="outlined"
          value={feedback1}
          onChange={handleFeedbackChange1}
        />
         <TextField sx={{marginTop:'10px',marginBottom:'10px'}}
          label="Round 2"
          multiline
          rows={1}
          fullWidth
          variant="outlined"
          value={feedback2}
          onChange={handleFeedbackChange2}
        />
         <TextField sx={{marginTop:'10px',marginBottom:'10px'}}
          label="Round 3"
          multiline
          rows={1}
          fullWidth
          variant="outlined"
          value={feedback3}
          onChange={handleFeedbackChange3}
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
