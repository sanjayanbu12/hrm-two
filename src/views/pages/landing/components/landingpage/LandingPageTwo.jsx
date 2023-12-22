import { Container, Grid, List, Typography } from '@mui/material';
import React from 'react';
import { SecondContainers } from '../Navbar/Styled';
import { useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { CustomContextHook } from '../usecontext/CustomContextHook';

const LandingPageTwo = ({ redirect, onPlaylistItemClick, handleChange }) => {
  const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
    padding: '16px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.palette.divider}`
    },
    '&:before': {
      display: 'none'
    }
  }));

  const { videoSrc, posterSrc, videoIndex, expanded, setVideoIndex, memoizedPlaylistItems } = CustomContextHook();

  // const [Duration, setDuration] = useState(0);

  // const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  // const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  // const startTimeRef = useRef(0);
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (isVideoPlaying) {
  //       const currentTime = videoRef.current.currentTime - startTimeRef.current;
  //       const duration = Duration - startTimeRef.current;
  //       setProgress((currentTime / duration) * 100);
  //     }
  //   }, 100);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [isVideoPlaying, Duration]);

  // const handelVideoDuration = (event) => {
  //   setDuration(event.target.duration);
  // };

  const handleVideoEnded = () => {
    if (videoIndex < memoizedPlaylistItems.length - 1) {
      setVideoIndex((prevIndex) => prevIndex + 1);
      // setProgress(0);
    }
  };

  const handleIntersection = (entries) => {
    try {
      entries?.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      });
    } catch (error) {
      console.log('landingpage-video', error);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };
    const observer = new IntersectionObserver(handleIntersection, options);
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
  }, []);

  // const handlePlay = () => {
  //   setIsVideoPlaying(true);
  //   startTimeRef.current = videoRef.current.currentTime;
  // };

  return (
    <>
      <SecondContainers ref={redirect}>
        <Container style={{ paddingLeft: '0px', paddingRight: '0px' }}>
          <Grid container gap={11} className="Desktop-only">
            <Grid item lg={6} md={10}>
              <video
                ref={videoRef}
                id="videoarea"
                width={'100%'}
                height={'100%'}
                autoPlay
                preload="auto"
                tabIndex={-1}
                // onLoadedMetadata={handelVideoDuration}
                onEnded={handleVideoEnded}
                // onPlay={handlePlay}
                muted
                // controls
                poster={posterSrc}
                src={videoSrc}
              ></video>
            </Grid>

            <Grid item lg={5} md={10} display={'flex'} marginTop={'20px'} justifyContent={'flex-end'}>
              <List id="playlist" style={{ display: 'flex', flexDirection: 'column' }}>
                {/* <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ width: "100%" }}
            /> */}
                <Accordion
                  expanded={expanded === 'panel1'}
                  onChange={handleChange('panel1')}
                  onClick={(event) => onPlaylistItemClick(event, 0)}
                  key={0}
                >
                  <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
                    <Typography fontSize={'20px'} fontWeight={'500'}>
                      Recruitment
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                      eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === 'panel2'}
                  onChange={handleChange('panel2')}
                  onClick={(event) => onPlaylistItemClick(event, 1)}
                  key={1}
                >
                  <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" expandIcon={<ExpandMoreIcon />}>
                    <Typography fontSize={'20px'} fontWeight={'500'}>
                      Employment
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                      eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === 'panel3'}
                  onChange={handleChange('panel3')}
                  onClick={(event) => onPlaylistItemClick(event, 2)}
                  key={2}
                >
                  <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" expandIcon={<ExpandMoreIcon />}>
                    <Typography fontSize={'20px'} fontWeight={'500'}>
                      Learning & Development
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                      eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === 'panel4'}
                  onChange={handleChange('panel4')}
                  onClick={(event) => onPlaylistItemClick(event, 3)}
                  key={3}
                >
                  <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" expandIcon={<ExpandMoreIcon />}>
                    <Typography fontSize={'20px'} fontWeight={'500'}>
                      procurement
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                      eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === 'panel5'}
                  onChange={handleChange('panel5')}
                  onClick={(event) => onPlaylistItemClick(event, 4)}
                  key={4}
                >
                  <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" expandIcon={<ExpandMoreIcon />}>
                    <Typography fontSize={'20px'} fontWeight={'500'}>
                      Travel & Expense
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                      eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </List>
            </Grid>
          </Grid>
        </Container>
      </SecondContainers>
      <style>
        {`
          @media (max-width: 1000px) {
            .Desktop-only{
              display:flex;
              justify-content:center;
              margin-top:40px;
              gap:20px;
            }
          }
        `}
      </style>
    </>
  );
};
export default LandingPageTwo;