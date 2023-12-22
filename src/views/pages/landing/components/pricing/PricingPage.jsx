import { React, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { SecondContainers } from '../Navbar/Styled';
import { Box, Card, Grid, Button, Typography } from '@mui/material';

const PricingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar />
      <SecondContainers >
        <Grid container justifyContent={'center'} flexDirection={'colum'}>
          <Grid item paddingTop={'25px'}>
            <Grid item display={'flex'} justifyContent={'center'}>
              <Typography fontSize={'14px'} color={'gray'} marginTop={'40px'} marginBottom={'20px'}>
                PRICING
              </Typography>
            </Grid>
            <Grid item display={'flex'} justifyContent={'center'}>
              <Typography variant="h3" marginBottom={'20px'}>
                Easily organize your work. Start free.
              </Typography>
            </Grid>
            <Grid item display={'flex'} justifyContent={'center'}>
              <Typography fontSize={'18px'} marginBottom={'20px'} color={'gray'}>
                Access Gestion’s features. No credit card required.
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent={'center'}>
            <Grid item display={'flex'} paddingTop={'20px'} gap={'30px'} justifyContent={'center'}>
              <Grid item display={'flex'} flexDirection={'column'} flexBasis={'350px'}>
                <Card variant="outlined" style={{ border: '1px solid #A5A4A3', borderRadius: '10px' }}>
                  <Box sx={{ backgroundColor: '#A5A4A3' }} height={8}></Box>
                  <Box sx={{ padding: '0px 20px' }}>
                    <Typography padding={'20px 0px'} variant="h3" marginBottom={'10px'}>
                      Personal
                    </Typography>
                    <Typography marginBottom={'40px'} >For individuals and small teams looking to manage their tasks.</Typography>
                    <Typography marginBottom={'20px'} variant="h4">
                      US$ 0
                    </Typography>
                    <Typography color={'gray'} marginBottom={'42px'} fontSize={'14px'}>
                      Free forever
                    </Typography>
                    <Button
                      variant="outlined"
                      disableElevation
                      disableFocusRipple
                      disableRipple
                      disableTouchRipple
                      sx={{
                        width: '100%',
                        color: 'black',
                        marginBottom: '40px',
                        padding: '8px 25px',
                        fontSize: '18px',
                        fontWeight: '500',
                        border: '2px solid #0D0E10',
                        '&:hover': {
                          backgroundColor: '#F06A6A',
                          border: '2px solid #F06A6A',
                          color: 'black'
                        }
                      }}
                    >
                      Get Started
                    </Button>

                    {/* <Typography  marginBottom={"20px"} fontSize={"17px"} variant='h6'>Manage tasks and personal to-dos:</Typography>
                    <Typography>Collaborate with up to 10 teammates</Typography>
                    <Typography>Collaborate with up to 10 teammates</Typography>
                    <Typography>Collaborate with up to 10 teammates</Typography>
                    <Typography>Collaborate with up to 10 teammates</Typography>
                    <Typography paddingBottom={"20px"}>Collaborate with up to 10 teammates</Typography> */}
                  </Box>
                </Card>
                <Box marginBottom={'20px'}></Box>
              </Grid>

              <Grid item display={'flex'} flexDirection={'column'} flexBasis={'350px'}>
                <Card variant="outlined" style={{ border: '1px solid #635AC7', borderRadius: '10px' }}>
                  <Box sx={{ backgroundColor: '#635AC7' }} height={8}></Box>
                  <Box sx={{ padding: '0px 20px' }}>
                    <Typography padding={'20px 0px'} variant="h3" marginBottom={'10px'}>
                      Starter
                    </Typography>
                    <Typography marginBottom={'40px'}>
                      For growing teams that need to track their projects progress and hit deadlines.
                    </Typography>
                    <Typography marginBottom={'20px'} variant="h4">
                      US$ 10.99
                    </Typography>
                    <Typography color={'gray'} fontSize={'14px'}>
                      Per user, per month billed annually
                    </Typography>
                    <Typography color={'gray'} marginBottom={'20px'} fontSize={'14px'}>
                      US$ 13.49 billed monthly
                    </Typography>
                    <Button
                      variant="contained"
                      disableElevation
                      disableFocusRipple
                      disableRipple
                      disableTouchRipple
                      sx={{
                        width: '100%',
                        color: 'white',
                        marginBottom: '40px',
                        padding: '8px 25px',
                        fontSize: '18px',
                        fontWeight: '500',
                        border: '2px solid #0D0E10',
                        backgroundColor: 'black',
                        '&:hover': {
                          backgroundColor: '#F06A6A',
                          border: '2px solid #F06A6A',
                          color: 'black'
                        }
                      }}
                    >
                      Get Started
                    </Button>
                  </Box>
                </Card>
              </Grid>

              <Grid item display={'flex'} flexDirection={'column'} flexBasis={'350px'}>
                <Card variant="outlined" style={{ border: '1px solid #5DA283', borderRadius: '10px' }}>
                  <Box sx={{ backgroundColor: '#5DA283' }} height={8}></Box>
                  <Box sx={{ padding: '0px 20px' }}>
                    <Typography padding={'20px 0px'} variant="h3" marginBottom={'10px'}>
                      Advanced
                    </Typography>
                    <Typography marginBottom={'40px'}>
                      For companies that need to manage a portfolio of work and goals across departments.
                    </Typography>
                    <Typography marginBottom={'20px'} variant="h4">
                      US$ 24.99
                    </Typography>
                    <Typography color={'gray'} fontSize={'14px'}>
                      Per user, per month billed annually
                    </Typography>
                    <Typography color={'gray'} marginBottom={'20px'} fontSize={'14px'}>
                      US$ 30.49 billed monthly
                    </Typography>
                    <Button
                      variant="outlined"
                      disableElevation
                      disableFocusRipple
                      disableRipple
                      disableTouchRipple
                      sx={{
                        width: '100%',
                        color: 'black',
                        marginBottom: '40px',
                        padding: '8px 25px',
                        fontSize: '18px',
                        fontWeight: '500',
                        border: '2px solid #0D0E10',
                        '&:hover': {
                          backgroundColor: '#F06A6A',
                          border: '2px solid #F06A6A',
                          color: 'black'
                        }
                      }}
                    >
                      Get Started
                    </Button>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SecondContainers>
    </>
  );
};
export default PricingPage;
