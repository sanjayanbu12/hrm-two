import React, { useState, useEffect } from 'react';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ReactPlayer from 'react-player/lazy';
import { PanelMenu } from 'primereact/panelmenu';
import BaseLayout from './BaseLayout';
import { Progress } from 'antd';
import { red, orange, green } from '@ant-design/colors';
import { useSelector } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const twoColors = { '0%': '#108ee9', '100%': '#87d068' };

const CatalogLayout = ({ selectedMedia }) => {
  const [moduleVideoData, setModuleVideoData] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
  const [currentlyPlayingModule, setCurrentlyPlayingModule] = useState(null);
  const [videoCompletion, setVideoCompletion] = useState({});
  const [videoProgress, setVideoProgress] = useState(0);
  const [panelMenuModel, setPanelMenuModel] = useState([]);
  const [playerEvents, setPlayerEvents] = useState([]); // State to hold video player events
  const userId = useSelector((state) => state.customization.authId);
  
  console.log(userId);
  console.log(playerEvents);
  console.log(handlePlayerEvent)


  useEffect(() => {
    if (selectedMedia) {
      axios
        .get('https://hrm-backend-square.onrender.com/videos/getall')
        .then((response) => {
          const moduleVideoData = response.data.filter(
            (module) => module.courseName === selectedMedia.courseName
          );
          setModuleVideoData(moduleVideoData);
        })
        .catch((error) => {
          console.error('Error fetching module and video data:', error);
        });
    }
  }, [selectedMedia]);

  useEffect(() => {
    if (moduleVideoData.length > 0 && selectedMedia._id) {
      const menuItems = moduleVideoData.map((module) => ({
        label: module.moduleName,
        icon: 'pi pi-box',
        expanded: currentlyPlayingModule === module,
        items: module.videoUrls.map((videoUrl, index) => ({
          label: (
            <>
              <div style={{ marginRight: '8px' }}>{`Video ${index + 1}`}</div>
              <Progress
                style={{ maxWidth: '100%' }}
                percent={videoCompletion[videoUrl] ? 100 : 0}
                strokeColor={twoColors}
              />
            </>
          ),
          icon: 'pi pi-fw pi-youtube',
          style: {
            backgroundColor: selectedVideoUrl === videoUrl ? '#D8D8D8' : 'white',
            color: selectedVideoUrl === videoUrl ? '#FFFF00' : 'black',
          },
          command: () => handleVideoSelection(videoUrl, module),
        })),
      }));

      setPanelMenuModel([
        {
          label: selectedMedia.courseName || 'Course name',
          icon: 'pi pi-fw pi-bars',
          expanded: true,
          items: menuItems.filter((item) => item !== null),
        },
      ]);
    } else {
      setPanelMenuModel([]);
    }
  }, [moduleVideoData, selectedMedia, currentlyPlayingModule, videoCompletion, selectedVideoUrl]);

  useEffect(() => {
    if (selectedVideoUrl) {
      axios
        .get('https://hrm-backend-square.onrender.com/video-progress/get', {
          params: {
            userId: userId,
            videoUrl: selectedVideoUrl,
          },
        })
        .then((response) => {
          const progressData = response.data;
          if (progressData && progressData.progress) {
            setVideoProgress(progressData.progress);
          }
        })
        .catch((error) => {
          console.error('Error fetching video progress data:', error);
        });
    }
  }, [selectedVideoUrl]);

  const handleVideoSelection = (videoUrl, module) => {
    setSelectedVideoUrl(videoUrl);
    setCurrentlyPlayingModule(module);
  };

  const handleVideoEnd = (videoUrl) => {
    setVideoCompletion((prevCompletion) => ({
      ...prevCompletion,
      [videoUrl]: true,
    }));

    axios
      .post('https://hrm-backend-square.onrender.com/video-progress/save', {
        userId: userId,
        videoUrl: videoUrl,
        progress: 100,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('Error saving video progress:', error);
      });
  };

  const handleVideoProgress = (state) => {
    setVideoProgress(Math.floor(state.played * 100));
  };

  const handlePlayerEvent = (eventName, event) => {
    // Log all events from ReactPlayer
    console.log(`Player Event - ${eventName}:`, event);

    // Store the event in the state for reference
    setPlayerEvents((prevEvents) => [...prevEvents, { name: eventName, event }]);
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
                        model={panelMenuModel}
                        className="w-full md:w-25rem"
                      />
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
                      onProgress={(state) => handleVideoProgress(state)}
                    
                     
                    />
                    <Progress
                      percent={videoProgress}
                      steps={20}
                      strokeColor={[
                        red[5],
                        red[5],
                        red[5],
                        red[5],
                        red[5],
                        orange[5],
                        orange[5],
                        orange[5],
                        orange[5],
                        orange[5],
                        '#FEFFAC',
                        '#FEFFAC',
                        '#FEFFAC',
                        '#FEFFAC',
                        '#FEFFAC',
                        green[5],
                        green[5],
                        green[5],
                        green[5],
                        green[5],
                      ]}
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
