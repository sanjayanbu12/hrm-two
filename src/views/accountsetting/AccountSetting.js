import { Avatar, Box, Button, Typography } from '@mui/material';
import { React, useState, useContext } from 'react';
import { LOGGED_OUT, USER_OR_NOT } from 'store/actions';
import { TopBarSubText, Indicator, SelectIcon, CustomImageContainer, CustomImageStyle } from './accountSettingV2/AccountSettingStyled';
import Grid from '@mui/material/Unstable_Grid2';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ProfileBase from './accountSettingV2/ProfileBase';
import axios from 'axios';
import { useRef } from 'react';
import { useEffect } from 'react';
import ChangePassword from './accountSettingV2/ChangePassword';
import ApiContext from 'context/api/ApiContext';
import FormSubmittedContext from 'context/isformsubmited/FormSubmittedContext';
import { useSelector } from 'react-redux';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// import React from 'react';
// import styled from 'styled-components';
// import Avatar from '@mui/material/Avatar';
// import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import axios from 'axios';
// import { useState } from 'react';
// import { Grid } from '@mui/material';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { useContext } from 'react';
// import ApiContext from 'context/api/ApiContext';
// import FormSubmittedContext from 'context/isformsubmited/FormSubmittedContext';

// const Container = styled.div`
// display: flex;
//   align-items: center;
//   padding: 20px 0;
//   justify-content: left;
//   position: absolute;
//   /* margin: 0 50px; */
//   top: 80px;
//   gap: 10px;
// `;
// const TextContent = styled.div`
// display: flex;
// flex-direction: column;
// `
// const CardContainer = styled.div`
//   position: relative;

//   width: 100%;

//   padding-bottom: 20px;
//   margin: 0 auto;
//   border: 1px solid #e0e0e0;
//   border-radius: 5px;
//   box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
// `;
// const CoverImageUpload = styled.input`
//   display: none; /* Hide the input box */
// `;
// const CoverImageContainer = styled.label`
//   width: 100%;
//   height: 120px;
//   border: 2px solid #c0c0c0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
//   position: relative;
//   transition: opacity 0.25s ease-in-out 0s;

//   &::before {
//     content: 'Upload Cover Image';
//     width: 100%;
//     height: 120px;
//     position: absolute;
//     font-weight: bold;
//     display: none; /* Initially hide the upload text */
//   }

//   &:hover::before {
//     display: block;
//     background: var(--ds-background-accent-gray-bolder, rgba(9, 30, 66, 0.54));
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     color: #fff;
//   }
// `;
// const AvatarUpload = styled.label`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   cursor: pointer;
//   position: relative;
//   margin-left: 10px;
//   width: 100px;
//   display: flex;
//   top: -55px;
//   left: 0px;
// `;
// const Profile = styled(Avatar)`
//   &::before {
//     content: 'Upload Image';
//     width: 100px;
//     height: 100px;
//     position: absolute;
//     font-size: x-small;
//     display: none;
//   }

//   &:hover::before {
//     background: var(--ds-background-accent-gray-bolder, rgba(9, 30, 66, 0.54));
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     color: #fff;
//   }
// `;

const AccountSetting = () => {
  const user = useSelector((state) => state.customization.authId);
  const [userdetails, setUserDetails] = useState({});
  const data = userdetails?.profilepic?.url;
  const [avatarImage, setAvatarImage] = useState(data);
  const [id, setId] = useState('');
  const { employeeContextData } = useContext(ApiContext);
  const { formStatus, setStatus } = useContext(FormSubmittedContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  }, [employeeContextData, user]);

  const handleUploadavatar = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profile', file);
      try {
        const response = await axios.put('https://hrm-backend-square.onrender.com/api/profilepic/' + id, formData, {
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
      await axios.delete(`http://localhost:3001/api/deleteProfile/${id}`);
      
      setStatus(!formStatus);
    } catch (error) {
      console.log('Error deleting image', error);
    }
  };

  const handleLogout = async () => {
    try {
      dispatch({ type: LOGGED_OUT });
      dispatch({ type: USER_OR_NOT });
      localStorage.clear();
    } catch (error) {
      alert(error && error.message);
    }
    navigate('/pages/login/login3');
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

  //   const user = useSelector((state) => state.customization.authId);
  //   const [userdetails, setUserDetails] = useState({});
  //   const data = userdetails?.profilepic?.url;
  //   console.log("data of userdetails",data);
  //   const [name, setfirstName] = useState('');
  //   const [lastname, setLastName] = useState('');
  //   const [email, setEmail] = useState('');
  //   const [empId, setEmpId] = useState('');
  //   const [department, setDepartment] = useState('');
  //   const [mob, setPhone] = useState('');
  //   const [emergencyContact, setemergencyContact] = useState('');
  //   const [coverimage, setCoverImage] = useState(userdetails?.coverpic?.url);
  //   const [avatarImage, setAvatarImage] = useState(data);
  //   console.log("image",avatarImage);
  //   const [id, setId] = useState('');
  //   const { employeeContextData } = useContext(ApiContext);
  //   const { formStatus, setStatus } = useContext(FormSubmittedContext);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await employeeContextData;
  //         const allEmployeeData = response.data;

  //         const specificEmployee = allEmployeeData.find((emp) => emp.employeeid === user);

  //         setUserDetails(specificEmployee);
  //         setfirstName(specificEmployee.name);
  //         setLastName(specificEmployee.lastname);
  //         setEmail(specificEmployee.email);
  //         setEmpId(specificEmployee.employeeid);
  //         setDepartment(specificEmployee.dept);
  //         setPhone(specificEmployee.mob);
  //         setemergencyContact(specificEmployee.emergencyContact);
  //         setId(specificEmployee._id);
  //         setAvatarImage(specificEmployee.profilepic?.url);
  //         setCoverImage(specificEmployee?.coverpic?.url);
  //       } catch (error) {
  //         console.error('Error fetching employee details:', error);
  //       }
  //     };

  //     fetchData();
  //   }, [employeeContextData]);

  //   const handleUpdate = async () => {
  //     try {
  //       const Updatedata = {
  //         name,
  //         lastname,
  //         email,
  //         mob,
  //         emergencyContact
  //       };
  //       await axios.put('https://hrm-backend-square.onrender.com/api/updateemployee/' + id, Updatedata);
  //       setStatus(!formStatus);
  //     } catch (error) {
  //       console.log('Error Updating data', error);
  //     }
  //   };

  //   const handleUploadavatar = async (e) => {
  //     const file = e.target.files[0]; // Get the selected file
  //     if (file) {
  //       // Create a FormData object to send the file to the server
  //       const formData = new FormData();
  //       formData.append('profile', file);

  //       try {
  //         // Send the image to the server
  //         const response = await axios.put('https://hrm-backend-square.onrender.com/api/profilepic/' + id, formData, {
  //           headers: {
  //             'Content-Type': 'multipart/form-data'
  //           }
  //         });
  //         console.log(response);
  //         setStatus(!formStatus);
  //         // Update the avatarImage state with the new image URL
  //         setAvatarImage(response.data.employeeData.profilepic.url);
  //       } catch (error) {
  //         console.log('Error uploading image', error);
  //       }
  //     }
  //   };

  //   const handleCoverImageUpload = async (e) => {
  //     const file = e.target.files[0]; // Get the selected file
  //     if (file) {
  //       // Create a FormData object to send the file to the server
  //       const formData = new FormData();
  //       formData.append('cover', file);

  //       try {
  //         // Send the image to the server
  //         const response = await axios.put('https://hrm-backend-square.onrender.com/api/coverpic/' + id, formData, {
  //           headers: {
  //             'Content-Type': 'multipart/form-data'
  //           }
  //         });
  //         console.log(response);
  //         setStatus(!formStatus);

  //         // Update the avatarImage state with the new image URL
  //         setCoverImage(response.data.employeeData?.coverpic?.url);
  //       } catch (error) {
  //         console.log('Error uploading image', error);
  //       }
  //     }
  //   };
  return (
    <>
      <Box sx={{ overflowX: 'hidden' }}>
        {/* <TopBarText> Account Settings </TopBarText> */}
        <Grid container wrap="nowrap" marginTop={'30px'}>
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
                          <AccountBoxIcon style={{ verticalAlign: 'middle' }} htmlColor="black" />
                          <Box component={'span'} style={{ marginLeft: '10px' }} color={'black'}>
                            Profile Base
                          </Box>
                        </Box>
                        <Box>
                          <ArrowForwardIosIcon fontSize="small" style={{ verticalAlign: 'middle' }} htmlColor="black" />
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
                          <PasswordIcon style={{ verticalAlign: 'middle' }} htmlColor="black" />
                          <Box component={'span'} style={{ marginLeft: '10px' }} color={'black'}>
                            Password
                          </Box>
                        </Box>
                        <Box>
                          <ArrowForwardIosIcon fontSize="small" style={{ verticalAlign: 'middle' }} htmlColor="black" />
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
                      <LogoutIcon fontSize="medium" style={{ verticalAlign: 'middle' }} htmlColor="red" />
                      <Box onClick={handleLogout} component={'span'} style={{ marginLeft: '10px', color: 'red', cursor: 'pointer' }}>
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
            <Grid ref={hide}>
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
                <div style={{ width: '150px', height: '150px' }}>
                  {avatarImage === undefined ? <Avatar style={{ width: '150px', height: '150px' }} /> : <CustomImageStyle src={avatarImage} />}
                </div>
              </CustomImageContainer>
              <Grid ref={hideButton} marginLeft={'25px'} marginTop={'10px'}>
                <Button onClick={handleDeleteAvatar} disableRipple sx={{ color: 'red' }}>
                  Delete Image
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <CardContainer style={{ backgroundColor: '#f0f0f0' }}>
        <CoverImageContainer>
          <CoverImageUpload type="file" accept=".jpg, .png, .img, .jpeg" id="coverImageInput" onChange={handleCoverImageUpload} />
          {coverimage ? (
            <img src={coverimage} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(to left, #ffffff 0%)`,
                objectFit: 'cover'
              }}
            />
          )}
        </CoverImageContainer>
        <AvatarUpload htmlFor="avatarImageInput">
          <input
            type="file"
            accept=".jpg, .png, .img,.jpeg"
            id="avatarImageInput"
            onChange={handleUploadavatar}
            style={{ display: 'none' }}
          />
          <Profile
            src={avatarImage}
            sx={{ border: '3px solid white', width: 100, height: 100, fontSize: '40px', fontWeight: '800' }}
          ></Profile>
        </AvatarUpload>
        <Grid
          container
          spacing={2}
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            paddingInlineStart: '50px',
            margin: '0px',
            width: '100%'
          }}
        >
          <Grid
            item
            xs={6}
            md={5}
            style={{
              padding: '0px',
              display: 'flex',
              justifyContent: 'start',
              marginBottom: '40px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4D4C7D' }}>First Name</div>
              <InputText value={name} onChange={(e) => setfirstName(e.target.value)} />
            </div>
          </Grid>
          <Grid
            item
            xs={6}
            md={5}
            style={{
              padding: '0px',
              display: 'flex',
              justifyContent: 'start',
              marginBottom: '40px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4D4C7D' }}>Last Name</div>
              <InputText value={lastname} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </Grid>
          <Grid
            item
            xs={4}
            md={5}
            style={{
              padding: '0px',
              display: 'flex',
              // marginLeft: '47px',
              justifyContent: 'start',
              marginBottom: '40px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4D4C7D' }}>Email</div>
              <InputText value={email}  />
            </div>
          </Grid>
          <Grid
            item
            xs={6}
            md={5}
            style={{
              padding: '0px',
              display: 'flex',
              justifyContent: 'start',
              marginBottom: '40px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4D4C7D' }}>Employee ID</div>
              <InputText value={empId}  />
            </div>
          </Grid>

          <Grid
            item
            xs={6}
            md={5}
            style={{
              padding: '0px',
              display: 'flex',
              justifyContent: 'start',
              marginBottom: '40px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4D4C7D' }}>Department</div>
              <InputText value={department} />
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            md={5}
            style={{
              padding: '0px',
              display: 'flex',
              justifyContent: 'start',
              marginBottom: '40px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4D4C7D' }}>Phone No</div>
              <InputText
                value={mob}
                onChange={(e) => {
                  // Get the input value and remove non-digit characters
                  let inputText = e.target.value.replace(/\D/g, '');

                  // Limit the input to 10 characters
                  if (inputText.length <= 10) {
                    setPhone(inputText);
                  }
                }}
              />
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            md={5}
            style={{
              padding: '0px',
              display: 'flex',
              justifyContent: 'start',
              marginBottom: '40px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4D4C7D' }}>Emergency No</div>
              <InputText
                value={emergencyContact}
                onChange={(e) => {
                  // Get the input value and remove non-digit characters
                  let inputText = e.target.value.replace(/\D/g, '');

                  // Limit the input to 10 characters
                  if (inputText.length <= 10) {
                    setemergencyContact(inputText);
                  }
                }}
              />
            </div>
          </Grid>
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Button
            label="Save"
            style={{ width: '150px', borderRadius: '5px', backgroundColor: '#4D4C7D', borderColor: '#4D4C7D' }}
            onClick={handleUpdate}
          />
        </div>
      </CardContainer> */}
    </>
  );
};

export default AccountSetting;
