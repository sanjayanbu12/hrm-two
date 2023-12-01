import React, { useState, useEffect } from 'react';
import { Knob } from 'primereact/knob';
import { Paper, Typography, Box } from '@mui/material';

const Progress = ({ moduleVideoData, videoCompletion }) => {
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    // Calculate overall progress based on completed videos and total duration
    const calculateOverallProgress = () => {
      let totalDuration = 0;
      let completedDuration = 0;

      moduleVideoData.forEach((module) => {
        module.videoUrls.forEach((videoUrl) => {
          const durationIndex = module.videoUrls.indexOf(videoUrl);
          const duration = parseFloat(module.duration[durationIndex]);

          totalDuration += duration;

          if (videoCompletion[videoUrl]) {
            completedDuration += duration;
          }
        });
      });

      const progressPercentage = (completedDuration / totalDuration) * 100;
      const floorProgress = Math.floor(progressPercentage);
      setOverallProgress(floorProgress);
    };

    calculateOverallProgress();
  }, [moduleVideoData, videoCompletion]);

  return (
    <Paper sx={{ p: 3, display: 'flex', justifyContent: 'space-evenly' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Knob value={overallProgress} />
        <Typography variant="h4">Overall module progress</Typography>
      </Box>
    </Paper>
  );
};

export default Progress;
