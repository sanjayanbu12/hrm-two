import React from 'react';

import { Paper,  Button, Grid,  } from '@mui/material';
import Item from 'antd/es/list/Item';
import Progressbar from './Progressbar';


const GoalTab = () => {
  return (

    <Paper style={{ padding: '20px', height:"fit-content", maxWidth:"100%" }}>

      <div style={{display:"flex" ,justifyContent:'flex-end'}}><Button variant="contained" color="secondary" >
            Set your Goal
          </Button>
          </div>
          <Grid container spacing={1} sx={{listStyle:"none"}}>
  <Grid item xs={6}>
    <Item><Progressbar/></Item>
  </Grid>
  <Grid item xs={6}>
    <Item><Progressbar/></Item>
  </Grid>
  <Grid item xs={6}>
    <Item><Progressbar/></Item>
  </Grid>
  <Grid item xs={6}>
    <Item><Progressbar/></Item>
  </Grid>
  <Grid item xs={6}>
    <Item><Progressbar/></Item>
  </Grid>
  <Grid item xs={6}>
    <Item><Progressbar/></Item>
  </Grid>

  </Grid>
          

            


    </Paper>
  );
};

export default GoalTab;
