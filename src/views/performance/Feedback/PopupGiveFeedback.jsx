import React, {  } from 'react';
// import axios from 'axios';
import {  IconButton, Grid, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import styled from 'styled-components';

import './PopupCard.css';
import Feedbackicon from './Feedbackicon';


const PopupGiveFeedback = ({ onClose, }) => {

  // const [rating, setRating] = useState(null);
  // const [comment, setComment] = useState('');



  // const handleSubmit = async () => {
  //   try {
  //     if ( rating && comment) {
  //       const response = await axios.post(`https://hrm-backend-square.onrender.com/feed/addcomment/64f01e76aecb5d1da5126707`, {
  //         employeeId: "64f01e76aecb5d1da5126707",
  //         comment: comment,
  //         star: rating,
  //       });
  //       console.log('Comment added:', response.data);

  //       setRating(null);
  //       setComment('');

  //       updateComments();
  //       onClose();
        

  //     } else {
  //       console.log('Please fill in all fields.');
  //     }
  //   } catch (error) {
  //     console.error('Error adding comment:', error);
  //   }
  // };



  // const empnames = [
  //   { label: 'Sridhar S' },
  //   { label: 'Ajay S' },
  //   { label: 'Ajay B' },
  //   { label: 'Naveena ' },
  //   { label: 'Varadharajan' },
  //   { label: 'Sanjay' },
  // ];

  const PaperContainer = styled(Paper)`
  height: 100%;
  perspective: 1000px;
  border-radius: 6px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  transition: background-position 350ms ease;
  `;

const StyledTypographyContent = styled.div`
  color: #4e4e4e;
  font-family: Roboto;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding-top: 10px;
  line-height: 1.5;
  text-align: center;
`;

const StyledTypographyDesignation = styled.div`
  color: #808080;
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
`;

  return (
    <div className="popup-container">
    <div className="popup-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2>What type of Feedback?</h2>
        <IconButton onClick={onClose} aria-label="Close">
          <CloseIcon />
        </IconButton>
      </div>
      <Grid container spacing={2} sx={{ height: 'fit-content', padding: '20px' }}>
        <Grid item xs={4} sx={{}}>
          <PaperContainer>
            <Grid container>
              <Grid item xs={12} style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                <Feedbackicon />
              </Grid>
              <Grid item xs={12} style={{ padding: '15px', display: 'flex', justifyContent: 'center' }}>
                <StyledTypographyContent>Give Feedback and Advice</StyledTypographyContent>
              </Grid>
              <Grid item xs={12} style={{ padding: '15px', paddingTop: '0px', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
                <StyledTypographyDesignation>Share your Feedback and advice with a colleague</StyledTypographyDesignation>
              </Grid>
            </Grid>
          </PaperContainer>
        </Grid>

        <Grid item xs={4} sx={{}}>
          <PaperContainer>
            <Grid container>
              <Grid item xs={12} style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                <Feedbackicon />
              </Grid>
              <Grid item xs={12} style={{ padding: '15px', display: 'flex', justifyContent: 'center' }}>
                <StyledTypographyContent>Ask for Feedback and Advice</StyledTypographyContent>
              </Grid>
              <Grid item xs={12} style={{ padding: '15px', paddingTop: '0px', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
                <StyledTypographyDesignation>Get valued advice from your peers</StyledTypographyDesignation>
              </Grid>
            </Grid>
          </PaperContainer>
        </Grid>

        <Grid item xs={4} sx={{}}>
          <PaperContainer>
            <Grid container>
              <Grid item xs={12} style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                <Feedbackicon />
              </Grid>
              <Grid item xs={12} style={{ padding: '15px', display: 'flex', justifyContent: 'center' }}>
                <StyledTypographyContent>Gather Feedback</StyledTypographyContent>
              </Grid>
              <Grid item xs={12} style={{ padding: '15px', paddingTop: '0px', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
                <StyledTypographyDesignation>Collect Feedback about one of your direct reports</StyledTypographyDesignation>
              </Grid>
            </Grid>
          </PaperContainer>
        </Grid>
      </Grid>
    </div>
  </div>
);
};




        {/* <Autocomplete
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
        </div>*/}


export default PopupGiveFeedback;
