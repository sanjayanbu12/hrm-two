import { Box, Button, Typography } from '@mui/material';
import { React, useState, useContext } from 'react';
import { TopBarText, TopBarSubText, Indicator, SelectIcon, CustomImageContainer, CustomImageStyle } from './AccountSettingStyled';
import Grid from '@mui/material/Unstable_Grid2';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ProfileBase from './ProfileBase';
import axios from 'axios';
import { useRef } from 'react';
import { useEffect } from 'react';
import ChangePassword from './ChangePassword';
import ApiContext from 'context/api/ApiContext';
import FormSubmittedContext from 'context/isformsubmited/FormSubmittedContext';
import { useSelector } from 'react-redux';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const AccountSettingV2 = () => {
  const user = useSelector((state) => state.customization.authId);
  const [userdetails, setUserDetails] = useState({});
  const data = userdetails?.profilepic?.url;
  const [avatarImage, setAvatarImage] = useState(data);
  const [id, setId] = useState('');
  const { employeeContextData } = useContext(ApiContext);
  const { formStatus, setStatus } = useContext(FormSubmittedContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await employeeContextData;
        const allEmployeeData = response.data;

        const specificEmployee = allEmployeeData.find((emp) => emp.employeeid === user);

        setUserDetails(specificEmployee);
        setId(specificEmployee._id);
        setAvatarImage(specificEmployee.profilepic?.url);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchData();
  }, [employeeContextData]);

  const handleUploadavatar = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profile', file);
      try {
        const response = await axios.put('http://localhost:3001/api/profilepic/' + id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setStatus(!formStatus);
        setAvatarImage(response.data.employeeData.profilepic.url);
      } catch (error) {
        console.log('Error uploading image', error);
      }
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      await axios.delete('http://localhost:3001/api/profilepic/' + id);
      setStatus(!formStatus);
      setAvatarImage(null);
    } catch (error) {
      console.log('Error deleting image', error);
    }
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
        {value === index && (
          <Grid>
            <Typography>{children}</Typography>
          </Grid>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`
    };
  }

  const [value, setValue] = useState(0);
  const hide = useRef();
  const hideText = useRef();
  const hidePassText = useRef();
  const styleoverride = useRef();
  const hideButton = useRef();

  const handleChange = (event, newValue) => {
    if (newValue === 1 || newValue === 2) {
      hide.current.style.display = 'none';
      hideText.current.style.display = 'none';
    } else if (newValue === 0) {
      hide.current.style.display = 'block';
      hideText.current.style.display = 'block';
      styleoverride.current.style.justifyContent = 'space-between';
    }
    if (newValue === 1) {
      hidePassText.current.style.display = 'block';
      styleoverride.current.style.justifyContent = 'flex-start';
    }
    if (newValue === 2) {
      hidePassText.current.style.display = 'none';
    }
    setValue(newValue);
  };
  useEffect(() => {
    if (value === 0) {
      hidePassText.current.style.display = 'none';
    }
    if (avatarImage == null) {
      hideButton.current.style.display = 'none';
    }
    if (avatarImage != null) {
      hideButton.current.style.display = 'block';
    }
  }),
    [];

  return (
    <>
      <Box style={{ padding: '20px 40px' }}>
        <TopBarText> Account Settings </TopBarText>
        <Grid container wrap="nowrap">
          <Grid xs={5.1} lg={5.1}>
            <TopBarSubText>Account</TopBarSubText>
          </Grid>
          <Grid ref={hideText} xs={6.9} lg={6.9}>
            <TopBarSubText>Edit Your Profile</TopBarSubText>
          </Grid>
          <Grid ref={hidePassText} xs={6.9} lg={6.9}>
            <TopBarSubText>Change Pasword</TopBarSubText>
          </Grid>
        </Grid>
        <Box>
          <Grid container ref={styleoverride} justifyContent={'space-between'} flexWrap={'nowrap'}>
            <Grid>
              <Box sx={{ flexGrow: 1, display: 'flex' }}>
                <Indicator orientation="vertical" value={value} onChange={handleChange} aria-label="Vertical tabs example">
                  <Tab
                    disableRipple
                    sx={{ borderBottom: 1, borderColor: 'divider', minWidth: '100%', marginBottom: '10px' }}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '280px', justifyContent: 'space-between' }}>
                        <Box>
                          <AccountBoxIcon fontSize="large" style={{ verticalAlign: 'middle' }} htmlColor="rgb(128, 128, 128)" />
                          <Box component={'span'} style={{ marginLeft: '10px' }}>
                            Profile Base
                          </Box>
                        </Box>
                        <Box>
                          <ArrowForwardIosIcon fontSize="small" style={{ verticalAlign: 'middle' }} htmlColor="rgb(128, 128, 128)" />
                        </Box>
                      </Box>
                    }
                    {...a11yProps(0)}
                  />
                  <Tab
                    disableRipple
                    sx={{ borderBottom: 1, borderColor: 'divider', minWidth: '100%', marginBottom: '10px' }}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '280px', justifyContent: 'space-between' }}>
                        <Box>
                          <PasswordIcon fontSize="large" style={{ verticalAlign: 'middle' }} htmlColor="rgb(128, 128, 128)" />
                          <Box component={'span'} style={{ marginLeft: '10px' }}>
                            Password
                          </Box>
                        </Box>
                        <Box>
                          <ArrowForwardIosIcon fontSize="small" style={{ verticalAlign: 'middle' }} htmlColor="rgb(128, 128, 128)" />
                        </Box>
                      </Box>
                    }
                    {...a11yProps(1)}
                  />
                </Indicator>
              </Box>
              <Tab
                disableRipple
                sx={{ borderBottom: 1, borderColor: 'divider', minWidth: '100%', marginBottom: '10px' }}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '280px', justifyContent: 'space-between' }}>
                    <Box>
                      <LogoutIcon fontSize="large" style={{ verticalAlign: 'middle' }} htmlColor="red" />
                      <Box component={'span'} style={{ marginLeft: '10px', color: 'red' }}>
                        Log Out
                      </Box>
                    </Box>
                  </Box>
                }
              />
            </Grid>
            <Grid>
              <TabPanel value={value} index={0}>
                <Box>
                  <ProfileBase />
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Box>
                  <ChangePassword />
                </Box>
              </TabPanel>
            </Grid>
            <Grid xs={3} ref={hide}>
              <CustomImageContainer>
                <label htmlFor="avatarImageInput">
                  <SelectIcon>
                    <input
                      type="file"
                      accept=".jpg, .png, .img,.jpeg"
                      id="avatarImageInput"
                      onChange={handleUploadavatar}
                      style={{ display: 'none' }}
                    />
                    <AddAPhotoIcon />
                  </SelectIcon>
                </label>
                <CustomImageStyle src={avatarImage} alt="Profile Picture" />
              </CustomImageContainer>
              <Grid ref={hideButton} marginLeft={'30px'} marginTop={'10px'}>
                <Button onClick={handleDeleteAvatar} disableRipple color="error">
                  Delete Image
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default AccountSettingV2;
