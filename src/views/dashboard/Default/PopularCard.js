import { CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const leaveData = [
  { id: 1, name: 'Ajay', position: 'Developer' },
  { id: 2, name: 'Sanjay', position: 'Manager' },
  { id: 3, name: 'Kishore', position: 'Designer' },
];

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
                {/* Add the Calendar component */}
                <ReactCalendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  calendarType="US" // Specify the calendar type (e.g., 'US', 'ISO 8601')
                  className="custom-calendar"
                />
              </Grid>
              <Grid item xs={12}>
                <h3>Leave Today</h3>
              </Grid>
              {leaveData.length === 0 ? (
                <Grid item xs={12}>
                  <p>No employees on leave today.</p>
                </Grid>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Position</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {leaveData.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell>{employee.name}</TableCell>
                          <TableCell>{employee.position}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

export default PopularCard;