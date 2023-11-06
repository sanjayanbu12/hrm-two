import React from 'react';
import { IconButton, Grid, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import Feedbackicon from './Feedbackicon';

const PaperContainer = styled(Paper)`
  position: relative;
  height: 100%;
  perspective: 1000px;
  border-radius: 6px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  background-color: transparent; /* Override the background-color property */
  transition: transform 350ms ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      130deg,
      transparent 0% 33%,
      var(--g1) 66%,
      var(--g2) 83.5%,
      var(--g3) 100%
    );
    background-position: 0% 0%;
    background-size: 300% 300%;
    border-radius: 6px;
    opacity: 0;
    z-index: -1;
    transition: opacity 350ms ease, transform 350ms ease;
  }

  &:hover {
    transform: scale(1.08, 1.03);

    &::before {
      opacity: 1;
      transform: scale(1.08, 1.03);
    }
  }
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

const PopupCard = ({ onClose }) => {
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
            <PaperContainer >
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

export default PopupCard;
