import React from 'react';
import { SecondContainers } from '../Navbar/Styled';
import { Grid, Container, Typography, Button } from '@mui/material';

const LandingPageEight = () => {
  return (
    <>
      <SecondContainers style={{ backgroundColor: 'rgb(30, 31, 33)' }}>
        <Container style={{ paddingLeft: '0px', paddingRight: '0px' }}>
          <Grid className="Eight-page-spacing" container justifyContent={'center'} alignItems={'center'}>
            <Grid item display={'flex'} justifyContent={'center'} flexDirection={'column'} gap={2} lg={10} md={10}>
              <Typography color={'white'} variant="h3" textAlign={'center'} fontWeight={400}>
                Get started today. Get more done tomorrow.
              </Typography>
              <Typography color={'white'} variant="h6" textAlign={'center'} fontWeight={300}>
                See everything the team’s doing, and make it easier for them to get important work done, no matter where they are.
              </Typography>

              <Grid item display={'flex'} justifyContent={'center'}>
                <Button
                  variant="contained"
                  disableElevation
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  sx={{
                    color: 'black',
                    padding: '8px 25px',
                    width: '180px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    border: '1px solid white',
                    backgroundColor: 'white',
                    '&:hover': {
                      backgroundColor: '#F06A6A',
                      border: '1px solid #F06A6A',
                      color: 'black'
                    }
                  }}
                >
                  Get Started
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </SecondContainers>
      <style>
        {`
          @media (max-width: 1000px) {
            .Eight-page-spacing{
              display:flex;
              flex-direction:column;
              gap:20px;
              height:83vh;
              margin-top:50px;
            }
          }
        `}
      </style>
    </>
  );
};
export default LandingPageEight;
