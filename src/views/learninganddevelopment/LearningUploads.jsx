import React, { useState } from 'react';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import { TextField, Button, Grid, Paper} from '@mui/material';

const LeraningUploads = ({ onUpload }) => {
  const [formData, setFormData] = useState({
    image: null,
    courseName: '',
    courseDescription: '',
    video: null
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      image: file
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      video: file
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('image', formData.image);
    data.append('courseName', formData.courseName);
    data.append('courseDescription', formData.courseDescription);
    data.append('video', formData.video);

    // Replace 'YOUR_BACKEND_URL/api/upload' with your actual upload endpoint
    axios.post('YOUR_BACKEND_URL/api/upload', data)
      .then(response => {
        console.log('Data uploaded successfully', response);
        onUpload(formData); // Notify parent component about the successful upload
      })
      .catch(error => {
        console.error('Error uploading data:', error);
      });
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
                onChange={handleFileUpload}
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

export default LeraningUploads;
