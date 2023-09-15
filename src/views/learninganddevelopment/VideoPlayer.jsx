import React from 'react';
import ReactPlayer from 'react-player';
import { Box } from '@mui/system';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <Box sx={{ height: '400px', width: '100%', background: 'green' }}>
      <ReactPlayer
        url={videoUrl}
        width="100%"
        height="100%"
        controls // Show video controls (play, pause, volume, etc.)
      />
    </Box>
  );
};

export default VideoPlayer;