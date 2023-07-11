import React from 'react';
import { useNavigate } from 'react-router';
import MainCard from 'ui-component/cards/MainCard';
import { CardContent, Grid, Typography, Button, Box } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

const Upcomingevents = () => {
  const upcomingEvents = [
    {
      title: 'Meeting',
      startDate: '2023-07-10',
      endDate: '2023-07-10',
      Time: '10.00 AM',
      icon: <EventIcon />,
    },
    {
      title: 'Zoom Meeting',
      startDate: '2023-07-15',
      endDate: '2023-07-15',
      Time: '11.00 AM',
      icon: <EventIcon color="secondary" />,
    },
    {
      title: 'Meet',
      startDate: '2023-07-20',
      endDate: '2023-07-20',
      Time: '4.00 PM',
      icon: <EventIcon color="action" />,
    },
    {
      title: 'Meeting',
      startDate: '2023-07-10',
      endDate: '2023-07-10',
      Time: '10.00 AM',
      icon: <EventIcon color="primary" />,
    },
  ];
  const isLoading = false;

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
              Upcoming Events
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
                <AddIcon />
                New Event
              </Button>
            </Box>

            <Grid container spacing={2} style={{ gap: '30px' }}>
              {upcomingEvents.map((event, index) => {
                const startDate = new Date(event.startDate);
                const endDate = new Date(event.endDate);
                const startMonth = startDate.toLocaleString('en-US', { month: 'long' });
                const endMonth = endDate.toLocaleString('en-US', { month: 'long' });
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={2}
                    lg={2}
                    key={index}
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
                    {event.icon}
                    <Typography variant="body1" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" style={{ marginBottom: '10px' }}>
                      {startMonth} {startDate.getDate()} - {endMonth} {endDate.getDate()}, {endDate.getFullYear()}
                    </Typography>
                    <Typography variant="body2" style={{ color: '#666' }}>
                      {event.Time}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

export default Upcomingevents;
