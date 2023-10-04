import React, { useState, useEffect } from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ReactPlayer from 'react-player/lazy';
import BaseLayout from './BaseLayout';

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
  const [currentlyPlayingModule, setCurrentlyPlayingModule] = useState(null);

  useEffect(() => {
    if (selectedMedia) {
      axios
        .get('https://hrm-backend-square.onrender.com/videos/getall')
        .then((response) => {
          const moduleVideoData = response.data.filter(
            (module) => module.courseName === selectedMedia.courseName
          );
          setModuleVideoData(moduleVideoData);
          console.log('Module Video Data:', moduleVideoData);
          console.log('Selected Media:', selectedMedia);
        })
        .catch((error) => {
          console.error('Error fetching module and video data:', error);
        });
    }
  }, [selectedMedia]);

  const handleVideoSelection = (videoUrl, module) => {
    setSelectedVideoUrl(videoUrl);
    setCurrentlyPlayingModule(module);
  };

  const generateMenuItems = () => {
    if (selectedMedia && selectedMedia._id) {
      const menuItems = moduleVideoData.map((module) => ({
        label: module.moduleName,
        icon: 'pi pi-fw pi-stop',
        expanded: currentlyPlayingModule === module, 
        items: module.videoUrls.map((videoUrl, index) => ({
          label: `Video ${index + 1}`,
          icon: 'pi pi-fw pi-youtube',
          command: () => handleVideoSelection(videoUrl, module),
        })),
      }));

      console.log('Generated Menu Items:', menuItems);
      return menuItems;
    }
    return [];
  };

  return (
    <div style={{ width: '100%' }}>
      {selectedMedia ? (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <Item>
                  {selectedMedia._id ? (
                    <>
                      <PanelMenu
                        model={[
                          {
                            label: selectedMedia.courseName || 'Course name',
                            icon: 'pi pi-fw pi-bars',
                            expanded: true,
                            items: generateMenuItems().filter((item) => item !== null),
                          },
                        ]}
                        className="w-full md:w-25rem"
                      />
                    </>
                  ) : (
                    <div>No course available</div>
                  )}
                </Item>
              </Grid>
              <Grid item xs={12} sm={7}>
                {selectedVideoUrl && <ReactPlayer url={selectedVideoUrl} controls={true} width="100%" />}
              </Grid>
            </Grid>
            {selectedMedia._id ? (
              <>
                <BaseLayout courseName={selectedMedia.courseName} courseDescription={selectedMedia.courseDescription} />
              </>
            ) : (
              <div>No Description available</div>
            )}
          </Box>
        </>
      ) : (
        <div>No course available</div>
      )}
    </div>
  );
};

export default CatalogLayout;
