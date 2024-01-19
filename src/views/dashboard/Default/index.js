import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
// import Upcomingevents from './Upcomingevents';
import PopularCard from './PopularCard';
import Card1 from './Card1';
import Card2 from './Card2';
import Card3 from './Card3';
import AnnualCard from './AnnualCard';
// import { gridSpacing } from 'store/constant';
import Card from '@mui/material/Card';
import Apexchart from './ApexChart';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import Calendar from './Calendar';

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Card elevation={0} raised={true} sx={{p:2}}>
      <div style={{ overflow: 'hidden' }}>
        <div style={{ fontWeight: 'bold', fontSize: '25px', marginTop: '10px', marginLeft: '10px', marginBottom: '10px' }}>Welcome Admin!</div>
        <div style={{ fontWeight: 'bold', fontSize: '15px', marginLeft: '10px', marginBottom: '10px' }}>
          <p>Dashboard</p>
        </div>
        <Grid container spacing={2} style={{display:"flex", justifyContent:"space-around"}}>
          <Grid item xs={12} md={6} lg={3}>
            <Card1 isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card2 isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card3 isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <AnnualCard isLoading={isLoading} />
          </Grid>

          <Grid item xs={12} md={8} sm={12}>
            <Apexchart isLoading={isLoading} />
          </Grid>
          <Grid item  xs={12} md={4} sm={6} lg={4}>
            <PopularCard isLoading={isLoading} />
          </Grid>
          <Grid item  xs={12} md={5} sm={6} lg={5}>
            <Calendar isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={7} lg={7}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
 

          {/* <Grid item xs={12} md={12}>
          <Upcomingevents isLoading={isLoading} />
        </Grid> */}

          {/* <Grid item xs={12} md={12}>
          <Newevent isLoading={isLoading} />
        </Grid> */}
        </Grid>
      </div>
    </Card>
  );
};

export default Dashboard;
