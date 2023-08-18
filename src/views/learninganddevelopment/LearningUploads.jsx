import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import MainCard from 'ui-component/cards/MainCard';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';

const LearningUploads = ({ onUpload }) => {
  const [formData, setFormData] = useState({
    image: null,
    courseName: '',
    courseDescription: '',
    videos: null,
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [name]: '',
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: file,
    }));

    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      image: '',
    }));
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      videos: file,
    }));

    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      videos: '',
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.image) {
      errors.image = 'Image is required';
    }
    if (!formData.courseName) {
      errors.courseName = 'Course Name is required';
    }
    if (!formData.courseDescription) {
      errors.courseDescription = 'Course Description is required';
    }
    if (!formData.videos) {
      errors.videos = 'Video is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Ask for confirmation
    const confirmationResult = await Swal.fire({
      title: 'Confirm Upload',
      text: 'Are you sure you want to upload this course?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, upload it!',
      cancelButtonText: 'Cancel',
    });

    if (!confirmationResult.isConfirmed) {
      return;
    }

    try {
      const data = new FormData();
      data.append('videos', formData.videos);
      data.append('courseName', formData.courseName);
      data.append('courseDescription', formData.courseDescription);
      data.append('image', formData.image);

      const response = await axios.post('http://localhost:3001/media/create', data);

      console.log('Data uploaded successfully', response);

      // Check if onUpload is a function before calling it
      if (typeof onUpload === 'function') {
        onUpload(formData);
      }
      setFormData({
        image: null,
        courseName: '',
        courseDescription: '',
        videos: null,
      });
  
      setFormErrors({});

      // Display success notification
      Swal.fire({
        icon: 'success',
        title: 'Course Uploaded',
        text: 'Your course has been successfully uploaded.',

        
      });
      
    } catch (error) {
      console.error('Error uploading data:', error);

      // Display error notification
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: error.message,
      });
    }
  };

  return (
    <MainCard title="Course Upload Form">
      <Paper elevation={3} style={{ padding: '16px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <label htmlFor="image-input">
                Image Upload:
                <input
                  id="image-input"
                  type="file"
                  accept="image/*"
                  name="image"
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                />
                <Button variant="outlined" component="span">
                  Choose Image
                </Button>
                {formData.image && (
                  <Typography variant="body2">
                    {formData.image.name}
                  </Typography>
                )}
                {formErrors.image && (
                  <Typography variant="caption" color="error">
                    {formErrors.image}
                  </Typography>
                )}
              </label>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="courseName"
                label="Course Name"
                onChange={handleInputChange}
                error={!!formErrors.courseName}
                helperText={formErrors.courseName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="courseDescription"
                label="Course Description"
                multiline
                rows={4}
                onChange={handleInputChange}
                error={!!formErrors.courseDescription}
                helperText={formErrors.courseDescription}
              />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="video-input">
                Video Upload:
                <input
                  id="video-input"
                  type="file"
                  accept="video/*"
                  name="videos"
                  style={{ display: 'none' }}
                  onChange={handleVideoUpload}
                />
                <Button variant="outlined" component="span">
                  Choose Video
                </Button>
                {formData.videos && (
                  <Typography variant="body2">
                    {formData.videos.name}
                  </Typography>
                )}
                {formErrors.videos && (
                  <Typography variant="caption" color="error">
                    {formErrors.videos}
                  </Typography>
                )}
              </label>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Upload Course
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </MainCard>
  );
};

export default LearningUploads;
