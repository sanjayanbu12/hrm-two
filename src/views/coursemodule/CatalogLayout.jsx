import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ReactPlayer from 'react-player/lazy';
import BaseLayout from './BaseLayout';
import { PanelMenu } from 'primereact/panelmenu';
import { red, green } from '@ant-design/colors';
import { Progress } from 'antd';
import { useSelector } from 'react-redux';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DehazeIcon from '@mui/icons-material/Dehaze';
import Search from './Search';
import PropTypes from 'prop-types';

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
  const [videoCompletion, setVideoCompletion] = useState({});
  const [panelMenuModel, setPanelMenuModel] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
 const userId = useSelector((state) => state.customization.authId);

  useEffect(() => {
    if (selectedMedia) {
      setLoading(true);
      axios
        .get(`https://hrm-backend-square.onrender.com/progress/get/${userId}`)
        .then((response) => {
          setVideoCompletion(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching progress data:', error);
          setLoading(false);
        });
    }
  }, [selectedMedia, userId]);

  useEffect(() => {
    if (selectedMedia) {
      setLoading(true);
      axios
        .get('https://hrm-backend-square.onrender.com/videos/getall')
        .then((response) => {
          const moduleVideoData = response.data.filter((module) => module.courseName === selectedMedia.courseName);
          setModuleVideoData(moduleVideoData);
          console.log("tesla",moduleVideoData)
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching module and video data:', error);
          setLoading(false);
        });
    }
  }, [selectedMedia]);

  useEffect(() => {
    const filteredModuleVideoData = moduleVideoData.filter((module) =>
      module.moduleName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const menuItems = filteredModuleVideoData.map((module) => {
      return {
        label: module.moduleName,
        icon: <CheckBoxOutlineBlankIcon />,
        expanded: currentlyPlayingModule === module,
        items: module.videoUrls.map((videoUrl, index) => {
          return {
            label: (
              <>
                <div style={{ display: 'flex', marginBottom: '10px' }}>
                  <div style={{ marginRight: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <YouTubeIcon />
                    {`Video ${index + 1}`}
                  </div>
                </div>
                <div>
                  <Progress percent={videoCompletion[videoUrl] ? 100 : 0} steps={1} strokeColor={[green[7], green[8]]} />
                </div>
              </>
            ),
            style: {
              backgroundColor: selectedVideoUrl === videoUrl ? '#F0F0F0' : 'white',
              color: selectedVideoUrl === videoUrl ? '#333' : 'black',
            },
            command: () => handleVideoSelection(videoUrl, module),
            key: `${module.moduleName}_${index}`, // Add a unique key
          };
        }),
      };
    });

    setPanelMenuModel([
      {
        label: selectedMedia.courseName || 'Course name',
        icon: <DehazeIcon />,
        expanded: true,
        items: menuItems.filter((item) => item !== null),
      },
    ]);
  }, [moduleVideoData, selectedMedia, currentlyPlayingModule, videoCompletion, selectedVideoUrl, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleVideoSelection = (videoUrl, module) => {
    setSelectedVideoUrl(videoUrl);
    console.log("1",videoUrl);
    setCurrentlyPlayingModule(module);
  };

  const handleVideoEnd = (videoUrl) => {
    setVideoCompletion((prevCompletion) => ({
      ...prevCompletion,
      [videoUrl]: true,
    }));

    axios
      .post('https://hrm-backend-square.onrender.com/progress/store', {
        videoUrl: videoUrl,
        userId: userId,
        completed: true,
      })
      .then((response) => {
        console.log('Progress stored successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error storing progress:', error);
      });
  };

  return (
    <div style={{ width: '100%' }}>
      {selectedMedia ? (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <Search onSearch={handleSearch} />
            {loading ? (
              <div>Loading...</div>
            ) : (
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
                      <ReactPlayer url={selectedVideoUrl} controls={true} width="100%" onEnded={() => handleVideoEnd(selectedVideoUrl)} />
                      <Progress
                        percent={videoCompletion[selectedVideoUrl] ? 100 : 0}
                        steps={10}
                        strokeColor={[red[5], red[4], red[2], green[2], green[3], green[4], green[5], green[6], green[7], green[8]]}
                      />
                    </>
                  )}
                </Grid>
              </Grid>
            )}
            {selectedMedia._id ? (
              <>
                <BaseLayout courseName={selectedMedia.courseName} courseDescription={selectedMedia.courseDescription} courseid={selectedMedia._id} />
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

CatalogLayout.propTypes = {
  selectedMedia: PropTypes.object,
};

export default CatalogLayout;
