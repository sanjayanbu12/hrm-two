import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import Upcomingevents from './Upcomingevents';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import { gridSpacing } from 'store/constant';
import Card from '@mui/material/Card';

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Card raised={true}>
      <div style={{ overflow: 'hidden' }}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={3}>
              <TotalOrderLineChartCard isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TotalOrderLineChartCard isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TotalOrderLineChartCard isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TotalOrderLineChartCard isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={8}>
              <Upcomingevents isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={4}>
              <PopularCard isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={12}>
          <Upcomingevents isLoading={isLoading} />
        </Grid>
      </div>
    </Card>
  );
};

export default Dashboard;
