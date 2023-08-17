import React, { useState } from 'react';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import { TextField, Button, Grid, Paper } from '@mui/material';

const LearningUploads = ({ onUpload }) => {
  const [formData, setFormData] = useState({
    image: null,
    courseName: '',
    courseDescription: '',
    video: null
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: file
    }));
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      video: file
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = new FormData();
      data.append('image', formData.image);
      data.append('courseName', formData.courseName);
      data.append('courseDescription', formData.courseDescription);
      data.append('video', formData.video);

      // Replace 'YOUR_BACKEND_URL/api/upload' with your actual upload endpoint
      const response = await axios.post('http://localhost:3001/learn/upload', data);

      console.log('Data uploaded successfully', response);
      onUpload(formData); // Notify parent component about the successful upload
    } catch (error) {
      console.error('Error uploading data:', error);
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
              </label>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="courseName"
                label="Course Name"
                onChange={handleInputChange}
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
              />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="video-input">
                Video Upload:
                <input
                  id="video-input"
                  type="file"
                  accept="video/*"
                  name="video"
                  style={{ display: 'none' }}
                  onChange={handleVideoUpload}
                />
                <Button variant="outlined" component="span">
                  Choose Video
                </Button>
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
