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
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';

export default function TitlebarImageList() {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3001/media/getAll')
      .then((response) => {
        setCourseData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching course data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const openMediaDialog = (media) => {
    setSelectedMedia(media);
  };

  const closeMediaDialog = () => {
    setSelectedMedia(null);
  };

  return (
    <MainCard title="Course Overview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Grid container spacing={3}>
          {courseData.map((course) => (
            <Grid item xs={12} sm={4} md={4} key={course.courseName}>
              <Paper elevation={2} sx={{ maxWidth: 300, borderRadius: '12px', height: 300 }}>
                <Card onClick={() => openMediaDialog(course)} style={{ cursor: 'pointer', height: '100%' }}>
                  <CardMedia sx={{ height: 110 }} image={course.image} alt={course.courseName} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {course.courseName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.courseDescription}
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
      <Dialog open={selectedMedia !== null} onClose={closeMediaDialog} fullScreen>
        <DialogTitle>
          Course Details
          <IconButton aria-label="close" onClick={closeMediaDialog} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedMedia && (
            <>
              <Typography variant="h5" gutterBottom>
                {selectedMedia.courseName}
              </Typography>
              <Typography variant="body1">{selectedMedia.courseDescription}</Typography>
              {/* Add more course details as needed */}
            </>
          )}
        </DialogContent>
      </Dialog>
    </MainCard>
  );
}