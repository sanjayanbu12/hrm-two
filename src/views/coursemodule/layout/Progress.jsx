import React, { useState } from 'react';
import { Knob } from 'primereact/knob';
import { Paper, Typography } from '@mui/material';
import Chart from 'react-apexcharts';
import { Box } from '@mui/system';

const Progress = () => {
  const [overall, setOverall] = useState(0);
  const [individual, setIndividual] = useState(0);
  const [analytic, setanalytic] = useState(0);
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: 'basic-bar'
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      }
    },
    series: [
      {
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      },
      {
        name: 'series-2',
        data: [60, 30, 55, 56, 40, 80, 75, 91]
      }
    ]
  });
  console.log(setChartData);
  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Paper sx={{ p: 3, display: 'flex', justifyContent: 'space-evenly' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Knob value={overall} onChange={(e) => setOverall(e.value)} />
          <Typography variant="h4">Individual module progress</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Knob value={individual} onChange={(e) => setIndividual(e.value)} />
          <Typography variant="h4">Overall module progress</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Knob value={analytic} onChange={(e) => setanalytic(e.value)} />
          <Typography variant="h4">Average time spent</Typography>
        </Box>
      </Paper>
      <Paper sx={{ m: 4, display: 'flex', justifyContent: 'space-evenly' }}>
        <Chart options={chartData.options} series={chartData.series} type="bar" />
        <Chart options={chartData.options} series={chartData.series} type="line" />
      </Paper>
      <Paper sx={{ m: 4, display: 'flex', justifyContent: 'space-evenly' }}>
        <Chart options={chartData.options} series={chartData.series} type="area" />
        <Chart options={chartData.options} series={chartData.series} type="radar" />
      </Paper>
      <Paper sx={{ m: 4, display: 'flex', justifyContent: 'space-evenly' }}>
        <Chart options={chartData.options} series={chartData.series} type="scatter" />
        <Chart options={chartData.options} series={chartData.series} type="heatmap" />
      </Paper>
    </Paper>
  );
};

export default Progress;
