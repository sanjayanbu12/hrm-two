import React, { useState } from 'react';
import { TextField, Button, Grid, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MovieIcon from '@mui/icons-material/Movie';
import ImageIcon from '@mui/icons-material/Image';
import CancelIcon from '@mui/icons-material/Cancel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import Lottie from 'react-lottie';
import upload from '../lottie/uploading.json';

const uploading = {
  loop: true,
  autoplay: true,
  animationData: upload,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const CourseUpload = () => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [image, setImage] = useState(null);
  const [videos, setVideos] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState({});
  const [durations, setDurations] = useState([]); // Added durations state
  const [errors, setErrors] = useState({});
  const [contentReady, setContentReady] = useState(true);

  const handleCourseNameChange = (e) => {
    setCourseName(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, courseName: '' }));
  };

  const handleCourseDescriptionChange = (e) => {
    const description = e.target.value;
    if (description.split(' ').length <= 17) {
      setCourseDescription(description);
      setErrors((prevErrors) => ({ ...prevErrors, courseDescription: '' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, courseDescription: 'Description must be 17 words or less.' }));
    }
  };

  const handleImageDrop = (acceptedFiles) => {
    const selectedImage = acceptedFiles[0];
    setImage(selectedImage);
    setSelectedImages([selectedImage]);
  };

  const getVideoDuration = async (videoFile) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';

      video.onloadedmetadata = () => {
        resolve(video.duration);
      };

      video.onerror = (error) => {
        reject(error);
      };

      video.src = URL.createObjectURL(videoFile);
    });
  };

  const handleVideoChange = async (event) => {
    const selectedVideos = Array.from(event.target.files);
    const videosWithDurations = [];

    // Iterate through selected videos and get their durations
    for (const video of selectedVideos) {
      try {
        const duration = await getVideoDuration(video);
        videosWithDurations.push({ file: video, duration });
      } catch (error) {
        console.error('Error getting video duration:', error);
        // Handle error if duration retrieval fails
      }
    }

    setVideos(videosWithDurations);
    setSelectedVideos(videosWithDurations);
    setDurations(videosWithDurations.map((video) => video.duration)); // Update durations state
    setErrors((prevErrors) => ({ ...prevErrors, videos: '' }));
    event.target.value = '';
  };

  const handleRemoveVideo = (index) => {
    const updatedVideos = [...videos];
    updatedVideos.splice(index, 1);
    setVideos(updatedVideos);
    setSelectedVideos(updatedVideos);
    setDurations((prevDurations) => {
      const updatedDurations = [...prevDurations];
      updatedDurations.splice(index, 1);
      return updatedDurations;
    });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleSuccess = () => {
    toast.success('Course uploaded successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    });
  };

  const handleError = () => {
    toast.error('Course upload failed. Please try again.', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
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

      // Append video files and their durations
      for (let i = 0; i < videos.length; i++) {
        formData.append('videos', videos[i].file);
        formData.append('durations', durations[i]); // Add durations to FormData
      }

      setContentReady(false);

      const response = await axios.post('https://hrm-backend-square.onrender.com/media/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);

      handleSuccess();

      setCourseName('');
      setCourseDescription('');
      setImage(null);
      setVideos([]);
      setSelectedImages([]);
      setSelectedVideos({});
      setDurations([]); // Reset durations state
      setErrors({});
    } catch (error) {
      console.error(error);
      handleError();
    } finally {
      setContentReady(true);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: handleImageDrop
  });

  return (
    <MainCard title="Course Upload Form">
      {!contentReady ? (
        <Lottie options={uploading} height={310} width="50%" />
      ) : (
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
              <div {...getRootProps()} style={{ cursor: 'pointer' }}>
                <input {...getInputProps()} />
                <Button variant="outlined" color="primary" startIcon={<CloudUploadIcon />} style={{ minWidth: 195 }}>
                  Upload Course Image
                </Button>
              </div>
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
                        {`${video.file.name} (${Math.round(video.duration)} seconds)`}
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
      )}
      <ToastContainer />
    </MainCard>
  );
};

export default CourseUpload;
