import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import MainCard from 'ui-component/cards/MainCard';
import { CardContent, Grid, Typography, Button, Box } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
// import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
                onClick={() => navigate(`/newevent`)}
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

            <Carousel showArrows={true} showThumbs={false}>
              {events.map((event, index) => {
                const startDate = new Date(event.start);
                const endDate = new Date(event.end);
                const startMonth = startDate.toLocaleString('en-US', { month: 'long' });
                const endMonth = endDate.toLocaleString('en-US', { month: 'long' });
                const startTime = startDate.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
                const endTime = endDate.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
                return (
                  <div key={index}>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={2}
                      lg={2}
                      style={{
                        backgroundColor: '#f0f0f0',
                        borderRadius: '15px',
                        padding: '15px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}
                    >
                      <EventAvailableIcon />
                      <Typography variant="body1" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                        {event.title}
                      </Typography>
                      <Typography variant="body2" style={{ marginBottom: '10px' }}>
                        {startMonth} {startDate.getDate()} - {endMonth} {endDate.getDate()}, {endDate.getFullYear()}
                      </Typography>
                      <Typography variant="body2" style={{ color: '#666' }}>
                        {startTime} - {endTime}
                      </Typography>
                      {event.eventLink && (
                        <a href={event.eventLink} target="_blank" rel="noopener noreferrer">
                          Event Link
                        </a>
                      )}
                    </Grid>
                  </div>
                );
              })}
            </Carousel>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

export default Upcomingevents;
