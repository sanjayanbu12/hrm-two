import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from 'axios';

const FeedbackPopup = ({ open, onClose, onSubmit, Name, Title, matchedResults }) => {
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

  const handleSubmit = async () => {
    const feedbackToUpdate = {};

    if (feedback1) {
      feedbackToUpdate.round1 = feedback1;
    }

    if (feedback2) {
      feedbackToUpdate.round2 = feedback2;
    }

    if (feedback3) {
      feedbackToUpdate.round3 = feedback3;
    }

    if (Object.keys(feedbackToUpdate).length === 0) {
      onClose();
      return;
    }

    const selectedCandidate = matchedResults.find((candidate) => candidate.Name === Name && candidate.Status === Title);

    if (selectedCandidate) {
      try {
        await axios.put(`https://pulsehr-express-server.onrender.com/ats/updateats/${selectedCandidate._id}`, feedbackToUpdate);

        if (feedbackToUpdate.round1) {
          setFeedback1('');
        }
        if (feedbackToUpdate.round2) {
          setFeedback2('');
        }
        if (feedbackToUpdate.round3) {
          setFeedback3('');
        }

        onSubmit(feedbackToUpdate);
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
      <DialogTitle>
        Provide Feedback For <b style={{ fontSize: '15px' }}>{Name}</b>
      </DialogTitle>
      <DialogContent>
        {Title === 'Round 1' && (
          <TextField
            sx={{ marginTop: '10px', marginBottom: '10px', width: '400px' }}
            label={`Feedback for Round 1`}
            multiline
            rows={1}
            fullWidth
            variant="outlined"
            value={feedback1}
            onChange={handleFeedbackChange1}
          />
        )}
        {Title === 'Round 2' && (
          <TextField
            sx={{ marginTop: '10px', marginBottom: '10px', width: '400px' }}
            label={`Feedback for Round 2`}
            multiline
            rows={1}
            fullWidth
            variant="outlined"
            value={feedback2}
            onChange={handleFeedbackChange2}
          />
        )}
        {Title === 'Round 3' && (
          <TextField
            sx={{ marginTop: '10px', marginBottom: '10px', width: '400px' }}
            label={`Feedback for Round 3`}
            multiline
            rows={1}
            fullWidth
            variant="outlined"
            value={feedback3}
            onChange={handleFeedbackChange3}
          />
        )}
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
