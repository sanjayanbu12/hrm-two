import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VideoIcon from '@mui/icons-material/VideoLibrary';

const LearningModule = () => {
  const [courses, setCourses] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openVideoPlayer, setOpenVideoPlayer] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/media/all')
      .then((response) => {
        setCourses(response.data);
        alert(response.data)
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const handleViewClick = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:3001/media/${courseId}`);
      setSelectedCourse(response.data);
      setOpenModel(true);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  const handleCloseClick = () => {
    setOpenModel(false);
    setSelectedCourse(null);
  };

  const handleVideoError = (event) => {
    console.log('Video error event:', event);
    console.error('Error loading video:', event.target.error);
  };

  const handleVideoIconClick = (videoUrl) => {
    setSelectedVideoUrl(videoUrl); // Use videoUrl instead of video
    setOpenVideoPlayer(true);
  };
  
  
  return (
    <>
      <MainCard title="Course Overview">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {courses.map((course) => (
            <Paper key={course._id} elevation={2} style={{ borderRadius: '12px' }}>
              <CardMedia sx={{ height: 110 }} image={`data:image/png;base64,${course.image}`} title="Course Thumbnail" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {course.courseName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.courseDescription}
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="secondary" onClick={() => handleViewClick(course._id)}>
                  View
                </Button>
              </CardActions>
            </Paper>
          ))}
        </div>
      </MainCard>

      {openModel && selectedCourse && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '500px',
            backgroundColor: 'white',
            zIndex: 999,
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
            padding: '20px',
            overflow: 'auto'
          }}
        >
          <CloseIcon
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              cursor: 'pointer'
            }}
            onClick={handleCloseClick}
          />
          <Typography variant="h5">Videos</Typography>
          {selectedCourse.videos.map((video, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', cursor: 'pointer' }}>
              <VideoIcon fontSize="small" style={{ marginRight: '10px' }} onClick={() => handleVideoIconClick(video)} />
              <Typography variant="body2" color="text.secondary">
                Video {index + 1}
              </Typography>
            </div>
          ))}
        </div>
      )}

     {openVideoPlayer && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '600px',
            backgroundColor: 'white',
            zIndex: 999,
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
            padding: '20px',
            overflow: 'auto'
          }}
        >
          <CloseIcon
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              cursor: 'pointer'
            }}
            onClick={() => {
              setOpenVideoPlayer(false);
              setSelectedVideoUrl('');
            }}
          />

<video
  id="videoPlayer"
  preload="auto"
  width="320"
  height="240"
  controls
  onErrorCapture={handleVideoError}
>
  <source src={`http://localhost:3001/videos${selectedVideoUrl}`} type="video/mp4" />
  <track kind="captions" src="path-to-captions.vtt" label="English" />
</video>



        </div>
      )}
    </>
  );
};

export default LearningModule;