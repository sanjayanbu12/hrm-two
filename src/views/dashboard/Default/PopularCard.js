import { CardContent, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Set up the localizer using moment.js
const localizer = momentLocalizer(moment);

// Custom styles for the calendar
const calendarStyle = {
  height: 300,
  borderRadius: '8px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

// Custom event style
const eventStyle = {
  color: '#fff',
  borderRadius: '4px',
  border: 'none',
};

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading }) => {
  // ...

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            {/* Existing code */}
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Calendar</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {/* Add the Calendar component */}
                <Calendar
                  localizer={localizer}
                  events={[]} // Provide your calendar events here
                  startAccessor="start"
                  endAccessor="end"
                  style={calendarStyle}
                  eventPropGetter={() => ({
                    style: {
                      ...eventStyle,
                      backgroundColor: '#FF4081',
                    },
                  })}
                />
              </Grid>
            </Grid>

          </CardContent>
        </MainCard>
      )}
    </>
  );
};

export default PopularCard;
