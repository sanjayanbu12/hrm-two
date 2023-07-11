import { CardContent, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //
const PopularCard = ({ isLoading }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Calendar</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12.5}>
              
                <ReactCalendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  calendarType="US" // Specify the calendar type (e.g., 'US', 'ISO 8601')
                  className="custom-calendar"
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
