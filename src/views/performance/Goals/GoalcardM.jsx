import React from 'react';
import { Paper, Typography, Avatar, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import User1 from 'assets/images/users/user-round.svg';
import Item from 'antd/es/list/Item';

const GoalcardM = () => {
  return (
    <Paper
      display="flex"
      sx={{
        marginTop: '',
        width: 290,
        padding: '15px',
        fontWeight: 800,
        paddingBottom: '20px',
        listStyle: 'none'
      }}
      title="Feedbacks given to you"
      elevation={9}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={3}>
            <Item>
              <Avatar
                sx={{
                  width: '40px',
                  height: '40px'
                }}
                src={User1}
              ></Avatar>
            </Item>
          </Grid>
          <Grid xs={8}>
            <Item>
              <Typography
                variant="h4"
                body1="span"
                sx={{
                  fontWeight: 800,
                  fontSize: 'medium'
                }}
              >
                Kannan S
              </Typography>
              <Typography variant="subtitle2">Project Admin</Typography>
            </Item>
          </Grid>
          <Grid xs={10}>
            <Item>
              <Typography
                variant="h4"
                body1="span"
                sx={{
                  fontWeight: 800,
                  fontSize: 'medium'
                }}
              >
                Yearly Goal
              </Typography>
            </Item>
          </Grid>
          <Grid xs={12}>
            <Item>
              <Typography variant="subtitle2">- Attain Professional Certification in Cybersecurity</Typography>
            </Item>
            <Item>
              <Typography variant="subtitle2">- Develop Proficiency in Data Analysis and Visualization</Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default GoalcardM;
