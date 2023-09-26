import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from 'axios'; // Import axios

const FeedbackPopup = ({ open, onClose, onSubmit, Name, Title, matchedResults }) => {
  const [feedback1, setFeedback1] = useState('');

  const handleFeedbackChange1 = (e) => {
    setFeedback1(e.target.value);
  };

  const handleSubmit = async () => {
    const feedback = {
      round1: feedback1,
    };
    const selectedCandidate = matchedResults.find((candidate) => candidate.Name === Name && candidate.Status === Title);
    if (selectedCandidate) {
      try {
        await axios.put(`https://hrm-backend-square.onrender.com/ats/updateats/${selectedCandidate._id}`, feedback);
        onSubmit(feedback1); 
        setFeedback1('');
        onClose();
      } catch (err) {
        console.error('Error submitting feedback:', err);
      }
    } else {
      console.error(`Candidate with Name ${Name} and Status ${Title} not found.`);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Provide Feedback For <b style={{ fontSize: '15px' }}>{Name}</b></DialogTitle>
      <DialogContent>
        <TextField sx={{ marginTop: '10px', marginBottom: '10px', width: '400px' }}
          label={`Feedback for ${Title}`}
          multiline
          rows={1}
          fullWidth
          variant="outlined"
          value={feedback1}
          onChange={handleFeedbackChange1}
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