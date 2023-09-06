import React, { useState } from 'react';
import axios from 'axios';
import { Autocomplete, Rating, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './PopupCard.css';


const PopupCard = ({ onClose, updateComments }) => {

  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');



  const handleSubmit = async () => {
    try {
      if ( rating && comment) {
        const response = await axios.post(`http://localhost:3001/feed/addcomment/64f01e76aecb5d1da5126707`, {
          employeeId: "64f01e76aecb5d1da5126707",
          comment: comment,
          star: rating,
        });
        console.log('Comment added:', response.data);

        setRating(null);
        setComment('');

        updateComments();
        onClose();
        

      } else {
        console.log('Please fill in all fields.');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');



  const handleSubmit = async () => {
    try {
      if ( rating && comment) {
        const response = await axios.post(`http://localhost:3001/feed/addcomment/64f01e76aecb5d1da5126707`, {
          employeeId: "64f01e76aecb5d1da5126707",
          comment: comment,
          star: rating,
        });
        console.log('Comment added:', response.data);

        setRating(null);
        setComment('');

        updateComments();
        onClose();
        

      } else {
        console.log('Please fill in all fields.');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const empnames = [
    { label: 'Sridhar S' },
    { label: 'Ajay S' },
    { label: 'Ajay B' },
    { label: 'Naveena ' },
    { label: 'Varadharajan' },
    { label: 'Sanjay' },
  ];

  return (
    <div className="popup-container">
      <div className="popup-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2>Give Feedbacks</h2>
          <IconButton onClick={onClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </div>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={empnames}
          // value={selectedEmployee}
          // onChange={handleEmployeeChange}
          sx={{ width: '100%', marginTop: '10px' }}
          renderInput={(params) => <TextField {...params} label="Employees" />}
        />
        <div style={{ marginLeft: '10px', marginTop: '10px', alignItems: 'left' }}>
          <Rating
            name="controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Comment"
            variant="outlined"
            sx={{ width: '100%', marginTop: '10px' }}
            value={comment}
            multiline
            rowsMax={6}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '10px', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PopupCard;
