import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ReactPlayer from 'react-player/lazy';
import BaseLayout from './BaseLayout';
import { PanelMenu } from 'primereact/panelmenu';
// import { useSelector } from 'react-redux';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DehazeIcon from '@mui/icons-material/Dehaze';
import Search from './Search';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));
const CatalogLayout = ({ selectedMedia }) => {
  const [moduleVideoData, setModuleVideoData] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
  const [currentlyPlayingModule, setCurrentlyPlayingModule] = useState(null);
  const [videoCompletion, setVideoCompletion] = useState({});
  const [panelMenuModel, setPanelMenuModel] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // const userId = useSelector((state) => state.customization.authId);


  useEffect(() => {
    if (selectedMedia) {
      axios
        .get('https://hrm-backend-square.onrender.com/videos/getall')
        .then((response) => {
          const moduleVideoData = response.data.filter((module) => module.courseName === selectedMedia.courseName);
          setModuleVideoData(moduleVideoData);
        })
        .catch((error) => {
          console.error('Error fetching module and video data:', error);
        });
    }
  }, [selectedMedia]);

  useEffect(() => {
    const filteredModuleVideoData = moduleVideoData.filter((module) => module.moduleName.toLowerCase().includes(searchQuery.toLowerCase()));

    const menuItems = filteredModuleVideoData.map((module) => {
      return {
        label: module.moduleName,
        icon: <CheckBoxOutlineBlankIcon />,
        expanded: currentlyPlayingModule === module,
        items: module.videoUrls.map((videoUrl, index) => {
          return {
            label: (
              <>
                <div style={{ marginRight: '8px' }}>{`Video ${index + 1}`}</div>
              </>
            ),
            icon: <YouTubeIcon />,
            style: {
              backgroundColor: selectedVideoUrl === videoUrl ? '#D8D8D8' : 'white',
              color: selectedVideoUrl === videoUrl ? '#FFFF00' : 'black'
            },
            command: () => handleVideoSelection(videoUrl, module)
          };
        })
      };
    });

    setPanelMenuModel([
      {
        label: selectedMedia.courseName || 'Course name',
        icon: <DehazeIcon />,
        expanded: true,
        items: menuItems.filter((item) => item !== null)
      }
    ]);
  }, [moduleVideoData, selectedMedia, currentlyPlayingModule, videoCompletion, selectedVideoUrl, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleVideoSelection = (videoUrl, module) => {
    setSelectedVideoUrl(videoUrl);
    setCurrentlyPlayingModule(module);
  };

  const handleVideoEnd = (videoUrl) => {
    setVideoCompletion((prevCompletion) => ({
      ...prevCompletion,
      [videoUrl]: true
    }));
  };

  

  return (
    <div style={{ width: '100%' }}>
      {selectedMedia ? (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <Search onSearch={handleSearch} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <Item>
                  {selectedMedia._id ? (
                    <>
                      <PanelMenu model={panelMenuModel} className="w-full md:w-25rem" />
                    </>
                  ) : (
                    <div>No course available</div>
                  )}
                </Item>
              </Grid>
              <Grid item xs={12} sm={7}>
                {selectedVideoUrl && (
                  <>
                    <ReactPlayer
                      url={selectedVideoUrl}
                      controls={true}
                      width="100%"
                      onEnded={() => handleVideoEnd(selectedVideoUrl)}
                     
                    />
                  </>
                )}
              </Grid>
            </Grid>
            {selectedMedia._id ? (
              <>
                <BaseLayout
                  courseName={selectedMedia.courseName}
                  courseDescription={selectedMedia.courseDescription}
                  courseid={selectedMedia._id}
                />
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
