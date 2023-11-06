import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Grid, Avatar, TextField } from '@mui/material/';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import styled from 'styled-components';
import Badge from '@mui/material/Badge';

const StyledTypographyHeading = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const StyledTypographyDesignation = styled.div`
  color: #808080;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StyledTypographyContent = styled.div`
  color: #4e4e4e;
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-top: 10px;
  line-height: 1.5;
`;

const StyledBadge = styled(Badge)`
  & .MuiBadge-badge {
    right: 11px;
    top: 7px;
  }
`;

const PaperFlipContainer = styled(Paper)`
  /* width: 300px; */
  perspective: 1000px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 6px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  transform: ${(props) => (props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
  /* height: ${(props) => (props.isFlipped ? 'auto' : '100%')}; */
  display: ${(props) => (props.isFlipped ? 'flex' : '')};
  flex-direction: column;
`;

const FrontFace = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 6px;
  background: #fff;
  /* display: flex; */
  font: 16px/1.5 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #47525d;
`;
const BackFace = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 6px;
  background: #fff;
  /* display: flex; */
  font: 16px/1.5 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #47525d;

  transform: ${(props) => (props.isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)')};
  display: ${(props) => (props.isFlipped ? 'none' : 'flex')};
`;

const FeedbackCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const [text, setText] = useState('');
  const maxWords = 36;

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const words = inputValue.split(/\s+/);
    if (words.length <= maxWords) {
      setText(inputValue);
    }
  };

  return (
    <PaperFlipContainer elevation={5} isFlipped={isFlipped}>
      {!isFlipped && (
        <FrontFace className="front">
          <Grid container sx={{ padding: '16px' }}>
            {/* Front side content */}
            <Grid item xs={3} sm={3}>
              <Avatar alt="Remy Sharp" sx={{ width: 45, height: 45 }} />
            </Grid>
            <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <StyledTypographyHeading>Sridhar S</StyledTypographyHeading>
                <StyledTypographyDesignation>Manager</StyledTypographyDesignation>
              </div>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
              <StyledBadge sx={{ cursor: 'pointer' }} variant="dot" color="info" onClick={handleCardClick}>
                <ChevronRightIcon />
              </StyledBadge>
            </Grid>
            <Grid item sm={12}>
              <StyledTypographyContent>
                {' '}
                The sun dipped below the horizon, painting the sky in hues of orange and pink. A gentle breeze swayed the trees, creating a
                soothing melody. They sat by the fire, savoring each moment.
              </StyledTypographyContent>
            </Grid>
          </Grid>
        </FrontFace>
      )}
      {isFlipped && (
        <BackFace className="back">
          {/* Back side content */}
          <Paper sx={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
            <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
              <Grid item xs={10}>
                <StyledTypographyHeading>Comments</StyledTypographyHeading>
              </Grid>
              <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                <StyledBadge sx={{ cursor: 'pointer', top: '12px', left: '8px' }} variant="dot" color="info" onClick={handleCardClick}>
                  <ChevronLeftIcon />
                </StyledBadge>
              </Grid>
              <Grid container sx={{ padding: '16px' }}>
                {/* Front side content */}
                <Grid item xs={2.2} sm={2.2}>
                  <Avatar alt="Remy Sharp" sx={{ width: 35, height: 35 }} />
                </Grid>
                <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    <StyledTypographyHeading>Sridhar S</StyledTypographyHeading>
                  </div>
                </Grid>

                <Grid item sm={12}>
                  <StyledTypographyContent> The sun dipped below the horizon,</StyledTypographyContent>
                </Grid>
              </Grid>

              <Grid item xs={1.5}>
                <Avatar alt="Remy Sharp" sx={{ width: 24, height: 24 }} />
              </Grid>
              <Grid item xs={10}>
                <StyledTypographyDesignation>Add Comment</StyledTypographyDesignation>
              </Grid>
              <TextField
                id="outlined-basic"
                variant="outlined"
                sx={{ marginLeft: '15px', paddingBottom: '10px', width: '100%', marginTop: '10px' }}
                multiline
                rowsMax={3}
                value={text}
                size="small"
                onChange={handleChange}
              />
            </Grid>
          </Paper>
        </BackFace>
      )}
    </PaperFlipContainer>
  );
};

export default FeedbackCard;
