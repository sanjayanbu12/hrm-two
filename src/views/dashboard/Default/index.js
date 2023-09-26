import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import Upcomingevents from './Upcomingevents';
import PopularCard from './PopularCard';
import Card1 from './Card1';
import Card2 from './Card2';
import Card3 from './Card3';
import Card4 from './Card4';
import { gridSpacing } from 'store/constant';
import Card from '@mui/material/Card';
import TotalGrowthBarChart from './TotalGrowthBarChart';
// import Newevent from './Newevent';

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Card>
      <div style={{ overflow: 'hidden' }}>
        <div style={{ fontWeight: 'bolder', fontSize: '25px', marginTop: '10px', marginLeft: '10px' }}>Welcome Admin!</div>
        <div style={{ fontWeight: 'bold', fontSize: '15px', marginLeft: '10px', marginBottom: '10px' }}>
          <p>Dashboard</p>
        </div>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={3}>
              <Card1 isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={3}>
              <Card2 isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={3}>
              <Card3 isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={3}>
              <Card4 isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={8}>
              <TotalGrowthBarChart isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={4}>
              <PopularCard isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={12}>
          <Upcomingevents isLoading={isLoading} />
        </Grid>

        {/* <Grid item xs={12} md={12}>
          <Newevent isLoading={isLoading} />
        </Grid> */}
      </div>
    </Card>
  );
};

export default Dashboard;
