import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Paper, Dialog, DialogContent, Grid, IconButton } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';

const LearningModule = () => {
  const [courses, setCourses] = useState([]);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const openVideoDialog = (course) => {
    setIsVideoOpen(true);
    setCurrentCourse(course);
    setCurrentVideoIndex(0); // Reset the video index when opening a new video dialog
  };

  const closeVideoDialog = () => {
    setIsVideoOpen(false);
    setCurrentCourse(null);
    setCurrentVideoIndex(0);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3001/media/getAll');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const playVideo = (index) => {
    setCurrentVideoIndex(index);
  };

  return (
    <MainCard title="Course Overview">
      <Grid container spacing={2}>
        {courses.map((course) => (
          <Grid key={course._id} item xs={12} sm={6} md={4}>
            <Paper
              elevation={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 250,
                borderRadius: '12px',
              }}
            >
              <CardMedia sx={{ height: 90 }} image={course.image} title={course.courseName} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {course.courseName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.courseDescription}
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="secondary" onClick={() => openVideoDialog(course)}>
                  View
                </Button>
              </CardActions>
            </Paper>
          </Grid>
        ))}
        <Dialog open={isVideoOpen} onClose={closeVideoDialog} maxWidth="lg">
          <DialogContent>
            {currentCourse && (
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {currentCourse.videos.map((videoUrl, index) => (
                    <IconButton key={index} onClick={() => playVideo(index)}>
                      <MovieIcon />
                    </IconButton>
                  ))}
                </Grid>
                <Grid item xs={6}>
                  {currentVideoIndex !== null && (
                    <video controls width="100%" height="auto">
                      <track kind="captions" srcLang="en" label="English captions" />
                      <source src={currentCourse.videos[currentVideoIndex]} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </Grid>
              </Grid>
            )}
          </DialogContent>
        </Dialog>
      </Grid>
    </MainCard>
  );
};

export default LearningModule;
