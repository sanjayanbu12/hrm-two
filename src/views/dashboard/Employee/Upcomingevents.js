import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import MainCard from 'ui-component/cards/MainCard';
import { Card,CardContent, Grid, Typography, Button } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const Upcomingevents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [anchorEl, setAnchorEl] = useState(null);
  // const [colorAnchorEl, setColorAnchorEl] = useState(null);
  // const [selectedColor, setSelectedColor] = useState('#ffffff');  

  useEffect(() => {
    setIsLoading(true);
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
    setIsLoading(false);
  }, []);

  // const theme = useTheme();
  const navigate = useNavigate();

  // const handleMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };

  // const handleColorMenuOpen = (event) => {
  //   setColorAnchorEl(event.currentTarget);
  // };

  // const handleColorMenuClose = () => {
  //   setColorAnchorEl(null);
  // };

  // const handleColorSelect = (color) => {
  //   setSelectedColor(color);
  //   handleColorMenuClose();
  // };

  // const colorOptions = [
  //   { color: '#ff0000' },
  //   { color: '#00ff00' },
  //   { color: '#0000ff' },
  //   { color: '#e9967a' },
  //   { color: '#0000ff' },
  //   { color: '#ff0000' },
  //   { color: '#e9967a' },
  //   { color: '#00ff00' },
 
  // ];
  const locationNames = {
    location1: 'Coimbatore',
    location2: 'Bangalore',
    location3: 'Chennai'
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

  const sortedEvents = events.sort((a, b) => new Date(a.start) - new Date(b.start));

  return (
    <>
      {isLoading ? (
        <Card  content={false} >
          
          <CardContent>Loading...</CardContent>
        </Card>
      ) : (
        <Card content={false} raised={true}>
        <CardContent>
          <Typography variant="h4" style={{ marginBottom: '20px' }}>
            <b>Upcoming Events</b>
          </Typography>
          <div style={{ display: 'flex', flexDirection:'row' ,justifyContent: 'flex-end', marginBottom: '30px'}}>

          <div>
            <Button
              onClick={() => navigate('/newevent')}
              variant="contained"
              color="secondary"
              endIcon={<KeyboardDoubleArrowRightIcon />}
            >
              All Events
            </Button>
          </div>
  
          {/* <div>
            <Button
              onClick={handleMenuOpen}
              variant="text"
              color="secondary"
            >
              <MoreVertIcon />
            </Button>
          </div> */}
          </div>
            {/* <Menu
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
            </Menu> */}
{/* 
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
            > */}

              {/* <Grid container>
    {colorOptions.slice(0, 4).map((option, index) => (
      <Grid item key={index} style={{ marginRight: '10px' }} onClick={() => handleColorSelect(option.color)}>
        <div style={{ width: '20px', height: '20px', backgroundColor: option.color }}></div>
      </Grid>  
    ))}
 </Grid>

<Grid container>
      {colorOptions.slice(4, 8).map((option, index) => (
      <Grid item key={index} style={{ marginRight: '10px', marginTop: '10px' }} onClick={() => handleColorSelect(option.color)}>
        <div style={{ width: '20px', height: '20px', backgroundColor: option.color }}></div>
      </Grid>
    ))}
  </Grid>
</Menu> */}

            <div style={{ overflow: 'hidden'}}>
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
                            <Typography variant="body1" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                              {event.title}
                            </Typography>
                            </Grid>
   
        <Grid item>
          <Typography variant="body2" style={{ marginBottom: '5px' }}>
            {locationNames[event.location]}
          </Typography>
        </Grid>
                          <Grid item>
                            <Typography variant="body2" style={{ marginBottom: '7px' }}>
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
                <Typography variant="body1" style={{ textAlign: 'center',fontWeight:'bolder',fontSize:'20px' }}>
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
