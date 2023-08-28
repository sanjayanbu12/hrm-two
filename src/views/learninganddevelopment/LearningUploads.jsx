import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Grid, IconButton, Skeleton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MovieIcon from '@mui/icons-material/Movie';
import ImageIcon from '@mui/icons-material/Image';
import CancelIcon from '@mui/icons-material/Cancel';
import Swal from 'sweetalert2';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';

const LearningUploads = () => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [image, setImage] = useState(null);
  const [videos, setVideos] = useState([]);
  const [errors, setErrors] = useState({});
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setContentReady(true);
    }, 1500);

    return () => clearTimeout(loadingTimer);
  }, []);

  const handleCourseNameChange = (e) => {
    setCourseName(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, courseName: '' }));
  };

  const handleCourseDescriptionChange = (e) => {
    setCourseDescription(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, courseDescription: '' }));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    setErrors((prevErrors) => ({ ...prevErrors, image: '' }));
    event.target.value =[''] ;
  
  };

  const handleVideoChange = (event) => {
    const selectedVideos = Array.from(event.target.files);
    setVideos(selectedVideos);
    setErrors((prevErrors) => ({ ...prevErrors, videos: '' }));
    event.target.value = '';
  };

  const handleRemoveVideo = (index) => {
    const updatedVideos = [...videos];
    updatedVideos.splice(index, 1);
    setVideos(updatedVideos);
  };

  const handleSuccess = () => {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Course uploaded successfully!',
    });
  };

  const handleError = () => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Course upload failed. Please try again.',
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Form validation
    const fieldErrors = {};
    if (!courseName) {
      fieldErrors.courseName = 'Course name is required.';
    }
    if (!courseDescription) {
      fieldErrors.courseDescription = 'Course description is required.';
    }
    if (!image) {
      fieldErrors.image = 'Image is required.';
    }
    if (videos.length === 0) {
      fieldErrors.videos = 'At least one video is required.';
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('courseName', courseName);
      formData.append('courseDescription', courseDescription);
      formData.append('image', image);
      for (let i = 0; i < videos.length; i++) {
        formData.append('videos', videos[i]);
      }

      // Set contentReady to false to show skeleton loader
      setContentReady(false);

      const response = await axios.post('http://localhost:3001/media/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);

      // Show success message
      handleSuccess();

      // Clear form fields and errors
      setCourseName('');
      setCourseDescription('');
      setImage(null);
      setVideos([]);
      
      setErrors({});
    } catch (error) {
      console.error(error);

      // Show error message
      handleError();
    } finally {
      // Reset contentReady to true after handling submission
      setContentReady(true);
    }
  };
  

  return (
    <MainCard title="Course Upload Form">
      <Paper elevation={3} style={{ padding: '16px' }}>
        {contentReady ? (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Course Name"
                  placeholder="Enter course name"
                  variant="outlined"
                  value={courseName}
                  onChange={handleCourseNameChange}
                  fullWidth
                  error={!!errors.courseName}
                  helperText={errors.courseName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Course Description"
                  placeholder="Enter course description"
                  variant="outlined"
                  value={courseDescription}
                  onChange={handleCourseDescriptionChange}
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.courseDescription}
                  helperText={errors.courseDescription}
                />
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="image-input">
                  <input type="file" id="image-input" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                  <Button variant="outlined" color="primary" component="span" startIcon={<CloudUploadIcon />} style={{ minWidth: 195 }}>
                    Upload Course Image
                  </Button>
                  {image && (
                    <div style={{ marginTop: '8px' }}>
                      <ImageIcon style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                      {image.name}
                      <IconButton color="secondary" onClick={() => setImage(null)} style={{ verticalAlign: 'middle' }}>
                        <CancelIcon />
                      </IconButton>
                    </div>
                  )}
                </label>
                {errors.image && <div style={{ color: 'red', marginTop: '8px' }}>{errors.image}</div>}
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="video-input">
                  <input type="file" id="video-input" accept="video/*" multiple onChange={handleVideoChange} style={{ display: 'none' }} />
                  <Button variant="outlined" color="primary" component="span" startIcon={<CloudUploadIcon />} style={{ minWidth: 195 }}>
                    Upload Course Videos
                  </Button>
                </label>
                {errors.videos && <div style={{ color: 'red', marginTop: '8px' }}>{errors.videos}</div>}
                {videos.length > 0 && (
                  <div style={{ marginTop: '8px' }}>
                    <h3>Uploaded Videos:</h3>
                    <ul>
                      {videos.map((video, index) => (
                        <li key={index}>
                          <MovieIcon style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                          {video.name}
                          <IconButton
                            color="secondary"
                            onClick={() => handleRemoveVideo(index)}
                            style={{ verticalAlign: 'middle' }}
                          >
                            <CancelIcon />
                          </IconButton>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Create Media Course
                </Button>
              </Grid>
            </Grid>
          </form>
        ) : (
          <div>
            <Skeleton animation="wave" height={50} style={{ marginBottom: 16 }} />
            <Skeleton animation="wave" height={50} style={{ marginBottom: 16 }} />
            <Skeleton animation="wave" height={50} style={{ marginBottom: 16 }} />
            <Skeleton animation="wave" height={50} style={{ marginBottom: 16 }} />
           
          </div>
        )}
      </Paper>
    </MainCard>
  );
};

export default LearningUploads;
