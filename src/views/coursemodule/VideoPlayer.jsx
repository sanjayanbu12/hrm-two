import React from 'react';
import ReactPlayer from 'react-player';
import { Box } from '@mui/system';

const VideoPlayer = ({ videoUrl }) => {
  const urlToPlay = videoUrl || ''; // Ensure a default value for videoUrl if it's not defined
  
  console.log("Received Video URL:", urlToPlay);

  return (
    <Box sx={{ height: '400px', width: '100%', background: 'green' }}>
      <ReactPlayer
        url={urlToPlay}
        width="100%"
        height="100%"
        controls // Show video controls (play, pause, volume, etc.)
      />
    </Box>
  );
};

export default VideoPlayer;
