import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    cursor: 'pointer', // Add cursor pointer to indicate clickability
  },
  cardMedia: {
    width: 150,
  },
  cardContent: {
    flex: 1,
  },
}));

const MediaCard = ({ courseName, courseDescription, imageUrl, videos }) => {
  const classes = useStyles();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  return (
    <Card className={classes.card} onClick={handleVideoPlay}>
      <CardMedia className={classes.cardMedia} image={imageUrl} title={courseName} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h6">{courseName}</Typography>
        <Typography variant="body2">{courseDescription}</Typography>
        <Typography variant="caption">Number of videos: {videos.length}</Typography>
        {isVideoPlaying && videos.length > 0 && (
        <video controls width="100%">
        <track kind="captions" /> {/* Add an empty track element for accessibility */}
        <source src={videos[0]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
        )}
      </CardContent>
    </Card>
  );
};

export default MediaCard;
