import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';

const FeedbackInfo = ({ open, onClose, Name, selectedCandidate }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await axios.get(`https://pulsehr-express-server.onrender.com/ats/${selectedCandidate._id}`);
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getInfo();
  }, [selectedCandidate]);

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <b style={{ fontSize: '15px' }}>Overall Feedbacks for - {Name}</b>
        </DialogTitle>
        <DialogContent>
          <div>
            <p>Round 1</p>
            <TextField
              sx={{ marginTop: '10px', marginBottom: '10px', width: '400px' }}
              multiline
              rows={1}
              fullWidth
              variant="outlined"
              value={data.round1}
              disabled
            />
            <p>Round 2</p>
            <TextField
              sx={{ marginTop: '10px', marginBottom: '10px', width: '400px' }}
              multiline
              rows={1}
              fullWidth
              variant="outlined"
              value={data.round2}
              disabled
            />
            <p>Round 3</p>
            <TextField
              sx={{ marginTop: '10px', marginBottom: '10px', width: '400px' }}
              multiline
              rows={1}
              fullWidth
              variant="outlined"
              value={data.round3}
              disabled
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FeedbackInfo;
