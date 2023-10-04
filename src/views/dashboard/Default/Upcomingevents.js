import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Typography,Button } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { useNavigate } from 'react-router-dom';

const Upcomingevents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
    setIsLoading(false);
  }, []);

  const locationNames = {
    location1: 'Coimbatore',
    location2: 'Bangalore',
    location3: 'Chennai'
  };
  const eventLinkStyle = {
    color: '#F94C10',
    textDecoration: '',
    fontWeight: 'bold'
  };
  const navigate=useNavigate();

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
          cursor: 'pointer'
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
          cursor: 'pointer'
        }}
      >
        <FiChevronRight size={32} color="#000" />
      </button>
    );


  return (
    <>
      {isLoading ? (
        <Card content={false}>
          <CardContent>Loading...</CardContent>
        </Card>
      ) : (
        <Card content={false} elevation={3}>
          <CardContent>
            <Typography variant="h4" style={{ marginBottom: '20px', marginTop: '0', fontSize: '20px' }}>
              <b>Upcoming Events</b>
            </Typography>

             <div style={{ display: 'flex', flexDirection:'row' ,justifyContent: 'flex-end', marginBottom: '30px'}}>
            <Button
              onClick={() => navigate('/newevent')}
              variant="contained"
              endIcon={<KeyboardDoubleArrowRightIcon />}
              sx={{
                backgroundColor:"#FF5C93",
                '&:hover': {
                  backgroundColor: "#FF5C93",
                }
              }}
            >
              All Events
            </Button>
          </div>

            <div style={{ overflow: 'hidden' }}>
              {events.length > 0 ? (
                <Carousel
                  showArrows={true}
                  showThumbs={false}
                  showStatus={false}
                  centerMode={true}
                  centerSlidePercentage={25.0}
                  renderArrowPrev={renderArrowPrev}
                  renderArrowNext={renderArrowNext}
                >
                  {sortedEvents.map((event, index) => {
                    const startDate = new Date(event.start);
                    const endDate = new Date(event.end);
                    const startMonth = startDate.toLocaleString('en-US', { month: 'long' });
                    const endMonth = endDate.toLocaleString('en-US', { month: 'long' });
                    const startTime = startDate.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
                    const endTime = endDate.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });

                    return (
                      <div key={index} style={{ width: '75.0%', padding: '10px', margin: '0 5px' }}>
                        <Grid
                          container
                          direction="column"
                          alignItems="center"
                          style={{
                            backgroundColor: '#12486B',
                            borderRadius: '15px',
                            padding: '15px',
                            height: '100%'
                          }}
                        >
                          <Grid item style={{ color: '#ffff' }}>
                            <EventAvailableIcon />
                          </Grid>
                          <Grid item>
                            <Typography variant="body1" style={{ fontWeight: 'bold', marginBottom: '5px', color: '#ffff' }}>
                              {event.title}
                            </Typography>
                          </Grid>
                          <Grid style={{ fontWeight: 'bold' }}>
                            <Grid item>
                              <Typography variant="body2" style={{ marginBottom: '5px', color: '#ffff' }}>
                                {locationNames[event.location]}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="body2" style={{ marginBottom: '7px', color: '#ffff' }}>
                                {startMonth} {startDate.getDate()} - {endMonth} {endDate.getDate()}, {endDate.getFullYear()}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="body2" style={{ marginBottom: '7px', color: '#ffff' }}>
                                {startTime} - {endTime}
                              </Typography>
                            </Grid>
                          </Grid>
                          {event.eventLink && (
                            <Grid item>
                              <a href={event.eventLink} target="_blank" rel="noopener noreferrer" style={eventLinkStyle}>
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
                <Typography variant="body1" style={{ textAlign: 'center', fontWeight: 'bolder', fontSize: '20px',margin:'20px'}}>
                  NO EVENTS AVAILABLE
                </Typography>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Upcomingevents;
