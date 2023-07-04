// import { CardContent, Grid, Typography } from '@mui/material';
// import MainCard from 'ui-component/cards/MainCard';
// import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
// import { gridSpacing } from 'store/constant';
// import React, { useState } from 'react';
// import ReactCalendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// // ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //
// const PopularCard = ({ isLoading }) => {
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   return (
//     <>
//       {isLoading ? (
//         <SkeletonPopularCard />
//       ) : (
//         <MainCard content={false}>
//           <CardContent>
//             <Grid container spacing={gridSpacing}>
//               <Grid item xs={12}>
//                 <Grid container alignContent="center" justifyContent="space-between">
//                   <Grid item>
//                     <Typography variant="h4">Calendar</Typography>
//                   </Grid>
//                 </Grid>
//               </Grid>
//               <Grid item xs={12.5}>
//                 {/* Add the Calendar component */}
//                 <ReactCalendar
//                   onChange={handleDateChange}
//                   value={selectedDate}
//                   calendarType="US" // Specify the calendar type (e.g., 'US', 'ISO 8601')
//                   className="custom-calendar"
//                 />
//               </Grid>
//             </Grid>
//           </CardContent>
//         </MainCard>
//       )}
//     </>
//   );
// };

// export default PopularCard;

import { CardContent, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Card, CardWrapper } from 'react-swipeable-cards';

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

  const cardStyle = {
    width: '280px',
    height: '180px',
    background: '#F8F8F8',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    cursor: 'grab',
    marginBottom: '20px',
    marginTop: '-10px', // Adjust the marginTop value as per your requirement
  };

  const cardContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const leaveSymbolStyle = {
    fontSize: '40px',
    marginTop: '10px',
    color: 'rgba(103, 58, 183, 0.85)', // Set the tick color here
  };

  const cardTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '8px',
  };

  const cardNameStyle = {
    fontSize: '22px',
  };

  const cardPositionStyle = {
    fontSize: '16px',
    color: '#888888',
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
              <Grid item xs={12}>
                <h3>Leave Today</h3>
              </Grid>
              {leaveData.length === 0 ? (
                <Grid item xs={12}>
                  <p>No employees on leave today.</p>
                </Grid>
              ) : (
                <>
                  <CardWrapper>
                    {leaveData.map((employee) => (
                      <Card
                        key={employee.id}
                        style={cardStyle}
                        onSwipeLeft={() => handleSwipe(employee.id, 'left')}
                        onSwipeRight={() => handleSwipe(employee.id, 'right')}
                      >
                        <div style={cardContentStyle}>
                          <span style={leaveSymbolStyle}>&#10004;</span>
                          <h3 style={cardTitleStyle}>On Leave Today</h3>
                          <h2 style={cardNameStyle}>{employee.name}</h2>
                          <p style={cardPositionStyle}>{employee.position}</p>
                        </div>
                      </Card>
                    ))}
                  </CardWrapper>
                </>
              )}
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

export default PopularCard;
