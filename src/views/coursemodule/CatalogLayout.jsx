import React, { useState, useEffect } from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import axios from 'axios';
import { Typography } from '@mui/material';
import VideoPlayer from './VideoPlayer';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const CatalogLayout = ({ selectedMedia }) => {
  const [moduleVideoData, setModuleVideoData] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');

  useEffect(() => {
    if (selectedMedia) {
      axios
        .get('http://localhost:3001/videos/getall')
        .then((response) => {
          const moduleVideoData = response.data.filter((module) => module.courseName === selectedMedia.courseName);
          setModuleVideoData(moduleVideoData);
  
          // Debug log: Log the moduleVideoData and selectedMedia here
          console.log('Module Video Data:', moduleVideoData);
          console.log('Selected Media:', selectedMedia);
        })
        .catch((error) => {
          console.error('Error fetching module and video data:', error);
        });
    }
  }, [selectedMedia]);
  

  // Function to generate the menu items based on fetched module and video data
  const generateMenuItems = () => {
    if (selectedMedia && selectedMedia._id) {
      const filteredModules = moduleVideoData.filter((module) => module.moduleId === selectedMedia._id);
      const menuItems = filteredModules.map((module) => ({
        label: module.moduleName,
        icon: 'pi pi-fw pi-folder-open',
        items: module.videoUrls.map((videoUrl, index) => ({
          label: `Video ${index + 1}`,
          icon: 'pi pi-fw pi-youtube',
          url: videoUrl, // Make sure the videoUrl is correctly associated here
        })),
      }));
  
      console.log('Generated Menu Items:', menuItems); // Add this log
      return menuItems;
    }
    return [];
  };
  
  
  
 const handleVideoItemClick = (url) => {
  setSelectedVideoUrl(url); // Set the selected video URL
  console.log('Received Video URL:', url);
};

  
  
  return (
    <div style={{ width: '100%' }}>
      {selectedMedia ? (
        <>
          <Typography variant="h5" gutterBottom>
            {selectedMedia.courseName}
          </Typography>
          <Typography sx={{ marginBottom: '20px' }} variant="body1">
            {selectedMedia.courseDescription}
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <Item>
                  {selectedMedia._id ? (
                    <PanelMenu
                    model={[
                      {
                        label: selectedMedia.courseName || 'Course name',
                        icon: 'pi pi-fw pi-server',
                        items: generateMenuItems().filter((item) => item !== null), // Filter out null items
                        command: (event) => {
                          if (event.item.url) {
                            console.log('Selected Video URL:', event.item.url); // Add this log
                            handleVideoItemClick(event.item.url);
                          }
                        },
                      },
                    ]}
                    className="w-full md:w-25rem"
                  />
                  
                  ) : (
                    <div>No course available</div>
                  )}
                </Item>
              </Grid>
              <Grid item xs={7}>
                <Item>
                <VideoPlayer url={selectedVideoUrl} />

                </Item>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <div>No course available</div>
      )}
    </div>
  );
};

export default CatalogLayout;
