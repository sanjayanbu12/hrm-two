import React, { useState } from 'react';
import { TextField, Button, Paper, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';

const LearningUploads = () => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [image, setImage] = useState(null);
  const [videos, setVideos] = useState([]);
  const [errors, setErrors] = useState({});

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleVideoChange = (event) => {
    setVideos(event.target.files);
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
      return; // Exit the function if validation fails
    }

    try {
      const formData = new FormData();
      formData.append('courseName', courseName);
      formData.append('courseDescription', courseDescription);
      formData.append('image', image);
      for (const video of videos) {
        formData.append('videos', video);
      }
      const response = await axios.post(
        'http://localhost:3001/media/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response.data);

      // Clear form fields after successful submission
      setCourseName('');
      setCourseDescription('');
      setImage(null);
      setVideos([]);

      // Reset file input fields to clear selection
      document.getElementById('image-input').value = '';
      document.getElementById('video-input').value = '';

      // Clear any previous errors
      setErrors({});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainCard title="Course Upload Form">
      <Paper elevation={3} style={{ padding: '16px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Course Name"
                variant="outlined"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                fullWidth
                error={!!errors.courseName}
                helperText={errors.courseName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Course Description"
                variant="outlined"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                fullWidth
                multiline
                rows={3}
                error={!!errors.courseDescription}
                helperText={errors.courseDescription}
              />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="image-input">
                <input
                  type="file"
                  id="image-input"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  style={{ minWidth: 195 }}
                >
                  Upload Course Image
                </Button>
              </label>
              {errors.image && (
                <div style={{ color: 'red', marginTop: '8px' }}>{errors.image}</div>
              )}
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="video-input">
                <input
                  type="file"
                  id="video-input"
                  accept="video/*"
                  multiple
                  onChange={handleVideoChange}
                  style={{ display: 'none' }}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  style={{ minWidth: 195 }}
                >
                  Upload Course Videos
                </Button>
              </label>
              {errors.videos && (
                <div style={{ color: 'red', marginTop: '8px' }}>{errors.videos}</div>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Create Media Course
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </MainCard>
  );
};

export default LearningUploads;
