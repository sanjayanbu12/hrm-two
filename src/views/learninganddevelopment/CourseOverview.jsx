import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, Paper, Grid, IconButton, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
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
      const response = await axios.get('http://localhost:3001/media/all');
      const updatedMediaList = response.data.map((media) => ({
        ...media,
        videos: media.videos.map(() => `http://localhost:3001/media/${media._id}/video`),
      }));
      setMediaList(updatedMediaList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMediaList();
  }, []);

  const openVideoDialog = async (videoUrl, contentType) => {
    try {
      const response = await axios.get(videoUrl, { responseType: 'arraybuffer' });
      const videoBlob = new Blob([response.data], { type: contentType });
      const videoBlobUrl = URL.createObjectURL(videoBlob);
      setCurrentVideo(videoBlobUrl);
      setIsVideoOpen(true);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
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
    <MainCard title="Course Upload Form">
      {selectedMedia && (
        <Dialog open={selectedMedia !== null} onClose={closeMediaDialog} fullWidth maxWidth="md">
          <DialogTitle>
            All Uploaded Videos
            <IconButton aria-label="close" onClick={closeMediaDialog} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent style={{ maxHeight: 600, overflowY: 'auto' }}>
            <Grid container spacing={0}>
              {selectedMedia.videos.map((videoUrl, index) => (
                <Grid item xs={12} key={index} style={{ marginBottom: '3px' }}>
                  <MovieIcon onClick={() => openVideoDialog(videoUrl)} style={{ cursor: 'pointer', fontSize: 40 }} />
                  <Typography variant="body2" sx={{ marginTop: 1 }}>
                    Video {index + 1}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isVideoOpen} onClose={closeVideoDialog}>
        <DialogContent>
          <video controls autoPlay style={{ maxWidth: '100%' }}>
            <track kind="captions" />
            <source src={currentVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </DialogContent>
      </Dialog>

      <Grid container spacing={3}>
        {mediaList.map((media) => (
          <Grid item xs={12} sm={4} md={4} key={media._id}>
            <Paper elevation={2} sx={{ maxWidth: 300, borderRadius: '12px', height: 350 }}>
              <Card>
                <CardMedia
                  sx={{ height: 110 }}
                  image={media.thumbnailUrl}
                  title={media.courseName}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {media.courseName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {media.courseDescription}
                  </Typography>
                </CardContent>
                <Button
                  color="primary"
                  onClick={() => openMediaDialog(media)}
                  sx={{ display: 'block', margin: 'auto' }}
                >
                  View
                </Button>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </MainCard>
  );
};

export default MediaList;
