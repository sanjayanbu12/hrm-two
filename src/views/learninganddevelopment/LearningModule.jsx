import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Paper, Dialog, DialogContent } from '@mui/material';
import python from "./python.jpg";
import video from "./video.mp4"

const LearningModule = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideoDialog = () => {
    setIsVideoOpen(true);
  };

  const closeVideoDialog = () => {
    setIsVideoOpen(false);
  };

  return (
    <>
      <MainCard title="Course Overview">
        <Paper elevation={2} sx={{ maxWidth: 300, borderRadius: '12px' }}>
          {/* image */}
          <CardMedia
            sx={{ height: 110 }}
            image={python}
            title="Python"
          />
          <CardContent>
            {/* course Name */}
            <Typography gutterBottom variant="h5" component="div">
              Python
            </Typography>
            {/* Course description */}
            <Typography variant="body2" color="text.secondary">
              Python is a high-level, general-purpose programming language.
              Its design philosophy emphasizes code readability with the use
              of significant indentation
            </Typography>
          </CardContent>
          <CardActions>
            <Button color="secondary" onClick={openVideoDialog}>Play</Button>
          </CardActions>
        </Paper>
      </MainCard>
      
      <Dialog open={isVideoOpen} onClose={closeVideoDialog}>
        <DialogContent>
          {/* video */}
          <iframe
            width="560"
            height="315"
            src={video}
            title="Video"
            allowFullScreen
          ></iframe>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LearningModule;
