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
  Snackbar,
  SnackbarContent
} from '@mui/material';
import './CourseReview.css';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import ArticleIcon from '@mui/icons-material/Article';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import MovieIcon from '@mui/icons-material/Movie';
import CloseIcon from '@mui/icons-material/Close';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import ReactPlayer from 'react-player/lazy';
import Select from 'react-select';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Lottie from 'react-lottie'; 
import nodata from '../lottie/nodata.json';
import { useContext } from 'react';
import ApiContext from 'context/api/ApiContext';

const nodataavalible = {
  loop: true,
  autoplay: true,
  animationData: nodata,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const CourseReview = () => {
  const [mediaList, setMediaList] = useState([]);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formText, setFormText] = useState('');
  const [selectedVideoIndexes, setSelectedVideoIndexes] = useState([]);
  const [formErrors, setFormErrors] = useState({
    moduleName: '',
    selectedVideos: ''
  });
  const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = useState(false);
  const [isErrorSnackbarOpen, setIsErrorSnackbarOpen] = useState(false);
const {medialistContextData}=useContext(ApiContext)
  const fetchMediaList = async () => {
    try {
      const response = await medialistContextData
      console.log(response)
      setMediaList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMediaList();
  }, [medialistContextData]);

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

  const openFormDialog = () => {
    setIsFormOpen(true);
  };

  const closeFormDialog = () => {
    setIsFormOpen(false);
    setFormText('');
    setSelectedVideoIndexes([]);
    setFormErrors({
      moduleName: '',
      selectedVideos: ''
    });
  };

  const handleFormTextChange = (e) => {
    // Clear the module name error when the user starts typing
    setFormErrors({ ...formErrors, moduleName: '' });
    setFormText(e.target.value);
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      moduleName: '',
      selectedVideos: ''
    };

    if (formText.trim() === '') {
      errors.moduleName = 'Module name is required';
      isValid = false;
    }

    if (selectedVideoIndexes.length === 0) {
      errors.selectedVideos = 'Please select at least one video';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      // Continue with form submission if all validations pass
      if (selectedVideoIndexes.length > 0 && selectedMedia && selectedMedia.videos) {
        const selectedVideoUrls = selectedVideoIndexes.map((index) => selectedMedia.videos[index]);
        console.log('Selected Video URLs:', selectedVideoUrls);

        // Send a POST request to your backend to create a new video
        const response = await axios.post('https://hrm-backend-square.onrender.com/videos/create', {
          moduleId: selectedMedia._id,
          moduleName: formText,
          videoUrls: selectedVideoUrls,
          courseName: selectedMedia.courseName
        });

        console.log('Video data saved:', response.data);

        // Show success snackbar
        setIsSuccessSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error saving video data:', error);

      // Show error snackbar
      setIsErrorSnackbarOpen(true);
    } finally {
      closeFormDialog();
    }
  };

  return (
    <MainCard title="Media List" >
      <Dialog open={isVideoOpen} onClose={closeVideoDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Video Player
          <IconButton aria-label="close" onClick={closeVideoDialog} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <ReactPlayer
            controls={true}
            url={currentVideo}
            width="100%"
            height="100%"
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload'
                }
              }
            }}
          />
        </DialogContent>
      </Dialog>
      <Grid container spacing={3}>
        {mediaList.length === 0 ? (
           <Lottie
           options={nodataavalible}
           height='100%' // Set the desired fixed height
           width="100%"
         />
        ) : (
          mediaList.map((media) => (
            <Grid item xs={12} sm={4} md={4} key={media._id}>
              <Paper elevation={2} sx={{ maxWidth: 300, borderRadius: '12px', height: 300 }}>
                <Card onClick={() => openMediaDialog(media)} style={{ cursor: 'pointer', height: '100%' }}>
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
          ))
        )}
      </Grid>

      {selectedMedia && (
        <Dialog open={selectedMedia !== null} onClose={closeMediaDialog} fullScreen>
          <DialogTitle sx={{background:'black',color:'white'}}>
            All Uploaded Videos
            <IconButton aria-label="close" onClick={closeMediaDialog} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon sx={{background:'white'}} />
            </IconButton>
          </DialogTitle>
          <DialogContent style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Grid container spacing={0}>
              {selectedMedia.videos ? (
                selectedMedia.videos.map((videoUrl, index) => (
                  <Grid item xs={12} key={index} style={{ marginBottom: '3px' }}>
                    <MovieIcon onClick={() => openVideoDialog(videoUrl)} style={{ cursor: 'pointer', fontSize: 40 }} />
                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      Video {index + 1}
                    </Typography>
                  </Grid>
                ))
              ) : (
                <Typography variant="body2">No videos available.</Typography>
              )}
            </Grid>
          </DialogContent>
          <SpeedDial
            ariaLabel="Speed Dial"
            icon={<SpeedDialIcon />}
            onClose={() => setIsSpeedDialOpen(false)}
            onOpen={() => setIsSpeedDialOpen(true)}
            open={isSpeedDialOpen}
            direction="up"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
          >
            <SpeedDialAction key="Form" icon={<ArticleIcon />} tooltipTitle="Form" onClick={openFormDialog} />
            <SpeedDialAction
              key="Add Video"
              icon={<VideoCallIcon />}
              tooltipTitle="Add Video"
              onClick={() => {
                // Handle adding a video action here
                // You can implement your logic for adding videos here
              }}
            />
          </SpeedDial>
        </Dialog>
      )}

      <Dialog open={isFormOpen} onClose={closeFormDialog}>
        <DialogTitle>Add Video Form</DialogTitle>
        <DialogContent sx={{ height: '500px', width: '500px' }}>
          <form onSubmit={handleFormSubmit}>
            <div className="custom-id-display">Video ID</div>

            <TextField
              label="Module name"
              fullWidth
              variant="outlined"
              margin="normal"
              value={formText}
              onChange={handleFormTextChange}
              error={!!formErrors.moduleName}
              helperText={formErrors.moduleName}
              sx={{ marginBottom: '16px' }}
            />

            <Select
              isMulti
              placeholder="Select Videos"
              options={
                selectedMedia && selectedMedia.videos
                  ? selectedMedia.videos.map((videoUrl, index) => ({
                      value: index,
                      label: (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <SmartDisplayIcon style={{ marginRight: '8px' }} /> {`Video ${index + 1}`}
                        </div>
                      )
                    }))
                  : []
              }
              value={selectedVideoIndexes.map((index) => ({ value: index, label: `Video ${index + 1}` }))}
              onChange={(selectedOptions) => {
                const selectedIndexes = selectedOptions.map((option) => option.value);
                setSelectedVideoIndexes(selectedIndexes);

                // Clear the selected videos error when the user makes a selection
                setFormErrors({ ...formErrors, selectedVideos: '' });
              }}
              error={!!formErrors.selectedVideos}
            />

            <Typography variant="body2" color="error">
              {formErrors.selectedVideos}
            </Typography>

            <IconButton aria-label="close" onClick={closeFormDialog} sx={{ position: 'absolute', top: 8, right: 8 }}>
              <CloseIcon />
            </IconButton>
            <Button variant="contained" color="primary" type="submit" style={{ marginTop: '16px' }}>
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={isSuccessSnackbarOpen}
        autoHideDuration={1000} // Adjust the duration as needed
        onClose={() => setIsSuccessSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <SnackbarContent
          sx={{ backgroundColor: '#43a047', alignItems: 'center', display: 'flex' }} // Align items and use flex display
          message={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleIcon sx={{ marginRight: 1, alignSelf: 'center' }} />
              <span> course video Sucessfully added </span>
            </div>
          }
        />
      </Snackbar>

      {/* Snackbar for error message */}
      <Snackbar
        open={isErrorSnackbarOpen}
        autoHideDuration={1000} // Adjust the duration as needed
        onClose={() => setIsErrorSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <SnackbarContent
          sx={{ backgroundColor: '#d32f2f', alignItems: 'center', display: 'flex' }} // Align items and use flex display
          message={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CancelIcon sx={{ marginRight: 1, alignSelf: 'center' }} /> {/* X icon with self-alignment */}
              <span>Error submitting the form</span>
            </div>
          }
        />
      </Snackbar>
    </MainCard>
  );
};

export default CourseReview;
