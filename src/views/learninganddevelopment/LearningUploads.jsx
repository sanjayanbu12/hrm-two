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
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
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
    const description = e.target.value;
    if (description.split(' ').length <= 20) {
      setCourseDescription(description);
      setErrors((prevErrors) => ({ ...prevErrors, courseDescription: '' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, courseDescription: 'Description must be 20 words or less.' }));
    }
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setSelectedImages([selectedImage]);
    setErrors((prevErrors) => ({ ...prevErrors, image: '' }));
    event.target.value = '';
  };

  const handleVideoChange = (event) => {
    const selectedVideos = Array.from(event.target.files);
    setVideos(selectedVideos);
    setSelectedVideos(selectedVideos);
    setErrors((prevErrors) => ({ ...prevErrors, videos: '' }));
    event.target.value = '';
  };

  const handleRemoveVideo = (index) => {
    const updatedVideos = [...videos];
    updatedVideos.splice(index, 1);
    setVideos(updatedVideos);
    setSelectedVideos(updatedVideos);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
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

      setContentReady(false);

      const response = await axios.post('http://localhost:3001/media/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);

      handleSuccess();

      setCourseName('');
      setCourseDescription('');
      setImage(null);
      setVideos([]);
      setSelectedImages([]);
      setSelectedVideos([]);
      setErrors({});
    } catch (error) {
      console.error(error);
      handleError();
    } finally {
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
                  {selectedImages.length > 0 && (
                    <div style={{ marginTop: '8px' }}>
                      <h3>Selected Images:</h3>
                      <ul>
                        {selectedImages.map((img, index) => (
                          <li key={index}>
                            <ImageIcon style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                            {img.name}
                            <IconButton
                              color="secondary"
                              onClick={() => handleRemoveImage(index)}
                              style={{ verticalAlign: 'middle', marginLeft: '30px' }}
                            >
                              <CancelIcon />
                            </IconButton>
                          </li>
                        ))}
                      </ul>
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
                {selectedVideos.length > 0 && (
                  <div style={{ marginTop: '8px' }}>
                    <h3>Selected Videos:</h3>
                    <ul>
                      {selectedVideos.map((video, index) => (
                        <li key={index}>
                          <MovieIcon style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                          {video.name}
                          <IconButton color="secondary" onClick={() => handleRemoveVideo(index)} style={{ verticalAlign: 'middle' }}>
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
