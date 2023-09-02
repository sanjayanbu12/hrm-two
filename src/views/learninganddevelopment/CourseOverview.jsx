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
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import MovieIcon from '@mui/icons-material/Movie';
import CloseIcon from '@mui/icons-material/Close';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import ReactPlayer from 'react-player/lazy';
import { useDropzone } from 'react-dropzone';

const MediaList = () => {
  const [mediaList, setMediaList] = useState([]);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [uploadedVideo, setUploadedVideo] = useState(null);

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

  const handleDrop = (acceptedFiles) => {
    // Handle the dropped video file
    if (acceptedFiles.length > 0) {
      setUploadedVideo(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: 'video/*', // Allow only video files
  });

  // Speed Dial actions
  const speedDialActions = [
    {
      icon: <ArticleIcon />,
      name: 'Form',
      onClick: () => {
        setIsFormOpen(true);
      },
    },
    {
      icon: <VideoCallIcon />,
      name: 'Add Video',
      onClick: () => {
        // Handle adding a video action here
        // You can implement your logic for adding videos here
      },
    },
  ];

  const handleFormSubmit = () => {
    // Handle form submission here, e.g., send courseName and uploadedVideo to your server
    console.log('Course Name:', courseName);
    console.log('Uploaded Video:', uploadedVideo);
    // Reset form fields
    setCourseName('');
    setUploadedVideo(null);
    setIsFormOpen(false);
  };

  return (
    <MainCard title="Media List">
      {/* Dialog for displaying videos */}
      <Dialog open={isVideoOpen} onClose={closeVideoDialog}>
        <DialogContent>
          <ReactPlayer
            controls={true}
            url={currentVideo}
            width="100%"
            height="100%"
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload', // Remove the download button
                },
              },
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Grid of media items */}
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

      {/* Dialog for displaying selected media */}
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
            {/* Speed Dial component */}
      <SpeedDial
        ariaLabel="Speed Dial"
        icon={<SpeedDialIcon />}
        onClose={() => setIsSpeedDialOpen(false)}
        onOpen={() => setIsSpeedDialOpen(true)}
        open={isSpeedDialOpen}
        direction="up"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {speedDialActions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
        </Dialog>
      )}

    

      {/* Form for adding video and course name */}
      <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <DialogTitle>Add Video and Course Name</DialogTitle>
        <DialogContent>
          <div {...getRootProps()} style={{ border: '2px dashed #cccccc', padding: '20px', textAlign: 'center', cursor: 'pointer', marginBottom: '20px' }}>
            <input {...getInputProps()} />
            <p>Drag and drop a video file here, or click to select one</p>
          </div>
          <TextField
            label="Course Name"
            variant="outlined"
            fullWidth
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            sx={{ marginBottom: '20px' }}
          />
          <Button variant="contained" color="primary" onClick={handleFormSubmit}>
            Add
          </Button>
          <Divider sx={{ my: '20px' }} />
         
        </DialogContent>
      </Dialog>
    </MainCard>
  );
};

export default MediaList;
