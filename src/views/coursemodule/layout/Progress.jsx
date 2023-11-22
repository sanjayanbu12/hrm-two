import React, { useState } from 'react';
import { Knob } from 'primereact/knob';
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Progress = () => {
  const [overall, setOverall] = useState(0);
  const [individual, setIndividual] = useState(0);
  const [analytic, setanalytic] = useState(0);

  return (
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
    
  );
};

export default Progress;

