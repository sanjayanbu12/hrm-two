import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { CardContent, Grid, Typography, Button, Box } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Upcomingevents = () => {
  const [events, setEvents] = useState([]);
  const isLoading = false;

  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  const theme = useTheme();
  const navigate = useNavigate();

  const renderArrowPrev = (clickHandler, hasPrev, label) =>
    hasPrev && (
      <button
        type="button"
        onClick={clickHandler}
        title={label}
        style={{
          position: 'absolute',
          zIndex: 2,
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
        }}
      >
        <FiChevronLeft size={32} color="#000" />
      </button>
    );

  const renderArrowNext = (clickHandler, hasNext, label) =>
    hasNext && (
      <button
        type="button"
        onClick={clickHandler}
        title={label}
        style={{
          position: 'absolute',
          zIndex: 2,
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
        }}
      >
        <FiChevronRight size={32} color="#000" />
      </button>
    );

  return (
    <>
      {isLoading ? (
        <MainCard content={false}>
          <CardContent>Loading...</CardContent>
        </MainCard>
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Typography variant="h4" style={{ marginBottom: '20px' }}>
              <b>Upcoming Events</b>
            </Typography>
            <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: 'flex' }}>
              <Button
                onClick={() => navigate('/newevent')}
                sx={{
                  padding: 1.5,
                  background: 'rgba(33, 150, 243, 0.04)',
                  color: theme.palette.secondary.dark,
                  '&:hover': {
                    color: theme.palette.secondary.dark,
                  },
                  top: '-30px',
                  right: '10px',
                }}
              >
                All Events
                <ArrowForwardIcon />
              </Button>
            </Box>

            <div style={{ overflow: 'hidden' }}>
              {events.length > 0 ? (
                <Carousel
                  showArrows={true}
                  showThumbs={false}
                  showStatus={false}
                  centerMode={true}
                  centerSlidePercentage={25.00}
                  renderArrowPrev={renderArrowPrev}
                  renderArrowNext={renderArrowNext}
                >
                  {events.map((event, index) => {
                    const startDate = new Date(event.start);
                    const endDate = new Date(event.end);
                    const startMonth = startDate.toLocaleString('en-US', { month: 'long' });
                    const endMonth = endDate.toLocaleString('en-US', { month: 'long' });
                    const startTime = startDate.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
                    const endTime = endDate.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });

                    return (
                      <div key={index} style={{ width: '75.00%', padding: '10px', margin: '0 5px' }}>
                        <Grid
                          container
                          direction="column"
                          alignItems="center"
                          style={{
                            backgroundColor: '#f0f0f0',
                            borderRadius: '15px',
                            padding: '15px',
                            height: '100%',
                          }}
                        >
                          <Grid item>
                            <EventAvailableIcon />
                          </Grid>
                          <Grid item>
                            <Typography variant="body1" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                              {event.title}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" style={{ marginBottom: '10px' }}>
                              {startMonth} {startDate.getDate()} - {endMonth} {endDate.getDate()}, {endDate.getFullYear()}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" style={{ color: '#666' }}>
                              {startTime} - {endTime}
                            </Typography>
                          </Grid>
                          {event.eventLink && (
                            <Grid item>
                              <a href={event.eventLink} target="_blank" rel="noopener noreferrer">
                                Event Link
                              </a>
                            </Grid>
                          )}
                        </Grid>
                      </div>
                    );
                  })}
                </Carousel>
              ) : (
                <Typography variant="body1" style={{ textAlign: 'center' }}>
                  <b>NO EVENTS AVAILABLE</b>
                </Typography>
              )}
            </div>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

export default Upcomingevents;
