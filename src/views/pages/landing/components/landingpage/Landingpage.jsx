import { Box, Button, Container, Typography } from '@mui/material';
import React, { useRef, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { FirstContainers } from '../Navbar/Styled';
import LandingPageTwo from './LandingPageTwo';
import LandingPageThree from './LandingPageThree';
import LandingPageFour from './LandingPageFour';
import LandingPageFive from './LandingPageFive';
// import LandingPageSix from './LandingPageSix';
// import LandingPageSeven from './LandingPageSeven';
// import LandingPageEight from "./LandingPageEight";
import FooterPage from '../footer/FooterPage';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import { CustomContextHook } from '../usecontext/CustomContextHook';

const Landingpage = () => {
  const { setVideoSrc, setPosterSrc, isPlaying, setIsPlaying, expanded, setExpanded, videoIndex, memoizedPlaylistItems } =
    CustomContextHook();

  const redirect = useRef();
  const video = useRef();
  const onPlaylistItemClick = (event, index) => {
    const selectedVideo = memoizedPlaylistItems[index];
    setVideoSrc(selectedVideo?.movieUrl);
    setPosterSrc(selectedVideo?.moviePoster || '');
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const scrollToSection = (event, ref, index) => {
    try {
      const selectedVideo = memoizedPlaylistItems[index];
      setVideoSrc(selectedVideo?.movieUrl);
      setPosterSrc(selectedVideo?.moviePoster || '');
      ref.current.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.log('Footer', error);
    }
  };
  useEffect(() => {
    setVideoSrc(memoizedPlaylistItems[videoIndex].movieUrl);
    setPosterSrc(memoizedPlaylistItems[videoIndex].moviePoster);
    // setDuration(0);
    setExpanded(`panel${videoIndex + 1}`);
  }, [videoIndex, memoizedPlaylistItems]);

  const togglePlay = () => {
    // const video = document.getElementById('Video');

    if (video.current) {
      if (isPlaying) {
        video.current.pause();
      } else {
        video.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoClick = () => {
    if (video.current) {
      if (video.current.paused) {
        video.current.play();
        setIsPlaying(true);
      } else {
        video.current.pause();
        setIsPlaying(false);
      }
    }
  };

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
                    See plans, check progress, and discuss work in one place. With Gestion as your work manager, you’ll stay on top of
                    everything the team’s doing.
                  </Typography>
                </Grid>
                <Grid container>
                  <Grid item display={'flex'} justifyContent={'flex-end'} lg={4.5} md={5.5} sm={5.5} xs={6.7}>
                    <Link to="/pages/register/register3">
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
                    </Link>
                  </Grid>
                  {/* <Grid item lg={4} md={3.5} sm={5.5} gap={2} display={'flex'} justifyContent={'flex-end'}>
                    <Link to="/pages/login/login3">
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
                        Log in
                      </Button>
                    </Link>
                  </Grid> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={6.8} sm={8} md={10} display={'flex'} justifyContent={'flex-end'}>
              <Box className="video_container" style={{ position: 'relative' }}>
                <video
                  ref={video}
                  id="Video"
                  width={'100%'}
                  height={'100%'}
                  preload="auto"
                  tabIndex={-1}
                  muted
                  src="https://assets.codepen.io/6093409/river.mp4"
                  poster="https://assets.asana.biz/transform/6699f91d-5b61-41fd-9898-be5c43c8e01a/Its-Time-for-Asana-video-still?io=transform:fill,width:1680&format=webp"
                  onClick={handleVideoClick}
                ></video>
                {!isPlaying && (
                  <Box
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      cursor: 'pointer'
                    }}
                    onClick={togglePlay}
                  >
                    <Box
                      sx={{
                        backgroundColor: '#000000',
                        borderRadius: '50%',
                        width: '100px',
                        height: '100px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="white" stroke="#ffffff">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </Box>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </FirstContainers>
      <style>
        {`
          @media (max-width: 1000px) {
            .video_container{
              display:flex;
              align-items:center;
              justify-content:center;
              height:100vh;
              
            }
            .First_item{
              text-align:center; 
            }
            .Parent_grid {
              display:flex;
              flex-direction: column-reverse;
              justify-content: center;
              align-items: center;
              text-align:center;
              margin-top:60px;
            }
          }
        `}
      </style>
      <LandingPageTwo
        scrollToSection={scrollToSection}
        redirect={redirect}
        onPlaylistItemClick={onPlaylistItemClick}
        handleChange={handleChange}
      />
      <LandingPageThree />
      <LandingPageFour />
      <LandingPageFive />
      {/* <LandingPageSix /> */}
      {/* <LandingPageSeven /> */}
      {/* <LandingPageEight /> */}
      <FooterPage scrollToSection={scrollToSection} redirect={redirect} expanded={expanded} handleChange={handleChange} />
    </>
  );
};
export default Landingpage;
