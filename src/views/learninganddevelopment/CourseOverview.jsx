import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
} from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import CloseIcon from '@mui/icons-material/Close';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';

const MediaList = () => {
  const [mediaList, setMediaList] = useState([]);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);

  const fetchMediaList = async () => {
    try {
      const response = await axios.get('http://localhost:3001/media/getAll');
      setMediaList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMediaList();
  }, []);

  const openVideoDialog = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setIsVideoOpen(true);
  };

  const closeVideoDialog = () => {
    setCurrentVideo('');
    setIsVideoOpen(false);
  };

  const openMediaDialog = (media) => {
    setSelectedMedia(media);
  };

  const closeMediaDialog = () => {
    setSelectedMedia(null);
  };

  return (
    <MainCard title="Media List">
      <Dialog open={isVideoOpen} onClose={closeVideoDialog} maxWidth="lg" >
        <DialogContent>
          <div style={{ maxHeight: '70vh', overflow: 'auto' }}>
            <video controls autoPlay style={{ width: '100%' }}>
              <track kind="captions" />
              <source src={currentVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </DialogContent>
      </Dialog>

      <Grid container spacing={3}>
        {mediaList.map((media) => (
          <Grid item xs={12} sm={4} md={4} key={media._id}>
            <Paper elevation={2} sx={{ maxWidth: 300, borderRadius: '12px', height: 300 }}>
              <Card
                onClick={() => openMediaDialog(media)}
                style={{ cursor: 'pointer', height: '100%' }}
              >
                <CardMedia sx={{ height: 110 }} image={media.image} title={media.courseName} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {media.courseName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {media.courseDescription}
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {selectedMedia && (
        <Dialog open={selectedMedia !== null} onClose={closeMediaDialog} fullScreen>
          <DialogTitle>
            All Uploaded Videos
            <IconButton
              aria-label="close"
              onClick={closeMediaDialog}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Grid container spacing={0}>
              {selectedMedia.videos.map((videoUrl, index) => (
                <Grid item xs={12} key={index} style={{ marginBottom: '3px' }}>
                  <MovieIcon
                    onClick={() => openVideoDialog(videoUrl)}
                    style={{ cursor: 'pointer', fontSize: 40 }}
                  />
                  <Typography variant="body2" sx={{ marginTop: 1 }}>
                    Video {index + 1}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </MainCard>
  );
};

export default MediaList;