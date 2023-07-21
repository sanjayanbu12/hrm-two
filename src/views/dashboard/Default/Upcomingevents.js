import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { CardContent, Grid, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useTheme } from '@mui/material/styles';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Upcomingevents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [colorAnchorEl, setColorAnchorEl] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  useEffect(() => {
    setIsLoading(true);
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
    setIsLoading(false);
  }, []);

  const theme = useTheme();
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleColorMenuOpen = (event) => {
    setColorAnchorEl(event.currentTarget);
  };

  const handleColorMenuClose = () => {
    setColorAnchorEl(null);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    handleColorMenuClose();
  };

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

  // Sort the events in ascending order based on their start dates
  const sortedEvents = events.sort((a, b) => new Date(a.start) - new Date(b.start));

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
                    color: theme.palette.secondary.dark
                  },
                  top: '-30px',
                  right: '50px'
                }}
              >
                All Events
                <KeyboardDoubleArrowRightIcon />
              </Button>
            </Box>

            <Button
              onClick={handleMenuOpen}
              sx={{
                color: theme.palette.secondary.dark,
                '&:hover': {
                  color: theme.palette.secondary.dark
                },
                top: '-70px',
                left: '940px'
              }}
            >
              <MoreVertIcon />
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <MenuItem onClick={handleColorMenuOpen}>Solid-Color</MenuItem>
              <MenuItem onClick={handleMenuClose}>Background</MenuItem>
            </Menu>

            <Menu
              anchorEl={colorAnchorEl}
              open={Boolean(colorAnchorEl)}
              onClose={handleColorMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <MenuItem onClick={() => handleColorSelect('#ffffff')}>White</MenuItem>
              <MenuItem onClick={() => handleColorSelect('#ff0000')}>Red</MenuItem>
              <MenuItem onClick={() => handleColorSelect('#00ff00')}>Green</MenuItem>
              <MenuItem onClick={() => handleColorSelect('#0000ff')}>Blue</MenuItem>
              <MenuItem onClick={() => handleColorSelect('#e9967a')}>Rose</MenuItem>
            </Menu>

            <div style={{ overflow: 'hidden', backgroundColor: selectedColor }}>
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
                            backgroundColor: '#f0f0f0',
                            borderRadius: '15px',
                            padding: '15px',
                            height: '100%'
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
