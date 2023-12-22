import { React } from 'react';
import Navbar from '../Navbar/Navbar';
import { FirstContainers } from '../Navbar/Styled';
import { Box, Grid, Button, Container, Typography } from '@mui/material';
import ProductPageTwo from './ProductPageTwo';

const ProductPage = () => {
  return (
    <>
      <Navbar />
      <FirstContainers>
        <Container className="container" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
          <Grid container gap={4.5} className="Parent_grid">
            <Grid item className="First_item" lg={4.8} xs={12} sm={8} md={10}>
              <Grid className="First_grid" container gap={5.3} display={'flex'}>
                <Grid item xs={12}>
                  <Typography fontWeight={500} className="First_item" textAlign="start" variant="h2" fontSize={'44px'} lineHeight={1.4}>
                    Teams don’t lose track of work with Gestion
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    fontWeight={300}
                    className="First_item"
                    textAlign="start"
                    fontSize={'24px'}
                    variant="h5"
                    component={'p'}
                    lineHeight={1.5}
                  >
                    See plans, check progress, and discuss work in one place. With Asana as your work manager, you’ll stay on top of
                    everything the team’s doing.
                  </Typography>
                </Grid>
                <Grid container>
                  <Grid item display={'flex'} justifyContent={'flex-end'} lg={5} md={5.5} sm={5.5} xs={6.7}>
                    <Button
                      variant="contained"
                      disableElevation
                      disableFocusRipple
                      disableRipple
                      disableTouchRipple
                      sx={{
                        color: 'white',
                        padding: '8px 25px',
                        width: '180px',
                        fontSize: '1rem',
                        fontWeight: '500',
                        border: '1px solid black',
                        backgroundColor: 'black',
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
                  <Grid item lg={5.5} md={3.5} sm={5.5} gap={2} display={'flex'} justifyContent={'flex-end'}>
                    <Button
                      variant="outlined"
                      disableElevation
                      disableFocusRipple
                      disableRipple
                      disableTouchRipple
                      sx={{
                        color: 'black',
                        padding: '8px 25px',
                        fontSize: '1rem',
                        fontWeight: '500',
                        border: '1px solid #0D0E10',
                        '&:hover': {
                          backgroundColor: '#F06A6A',
                          border: '1px solid #F06A6A',
                          color: 'black'
                        }
                      }}
                    >
                      See how it works
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={6.8} sm={8} md={10} display={'flex'} justifyContent={'flex-end'}>
              <Box className="video_container" style={{ position: 'relative' }}>
                <video
                  id="Video"
                  width={'100%'}
                  height={'100%'}
                  preload="auto"
                  tabIndex={-1}
                  muted
                  autoPlay
                  controls
                  loop
                  //   poster="https://imgs.search.brave.com/iaJfqTOEvF2VKCcCWVs6_5IEJ_GzngyMaD0mrPzSBlM/rs:fit:500:0:0/g:ce/aHR0cDovL3d3dy50/cmF2ZWxjaGFyYWN0/ZXIuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE4LzExL2dv/Ymxpbi1mb3Jlc3Qt/MS5qcGc"
                >
                  <source src="https://assets.codepen.io/6093409/river.mp4" type="video/mp4" />
                </video>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </FirstContainers>
      <ProductPageTwo />
    </>
  );
};
export default ProductPage;
