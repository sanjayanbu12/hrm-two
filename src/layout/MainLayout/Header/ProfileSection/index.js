import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography
} from '@mui/material';

import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
// import UpgradePlanCard from './UpgradePlanCard';
// import User1 from 'assets/images/users/user-round.svg';

// assets
import { IconLogout, IconSettings } from '@tabler/icons';
import { useDispatch } from 'react-redux';
import { LOGGED_OUT, USER_OR_NOT } from 'store/actions';
import axios from 'axios';
import ApiContext from 'context/api/ApiContext';
import { useContext } from 'react';
// import { userSchema } from 'validation/Validation';
// import { clearConfigCache } from 'prettier';
// ==============================|| PROFILE MENU ||============================== //
const ProfileSection = () => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rotationAngle, setRotationAngle] = useState(0);
  // const [sdm, setSdm] = useState(true);
  // const [notification, setNotification] = useState(false);

  const [open, setOpen] = useState(false);
  const [matched, setMatched] = useState('');
  console.log('', matched);
  const authId = useSelector((state) => state.customization.authId);

  const [profileimage, setProfileimage] = useState('');
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const { employeeContextData } = useContext(ApiContext);

  useEffect(() => {
    const newRotationAngle = open ? 180 : 0;
    setRotationAngle(newRotationAngle);
  }, [open]);

  const anchorRef = useRef(null);
  const handleLogout = async () => {
    try {
      dispatch({ type: LOGGED_OUT });
      dispatch({ type: USER_OR_NOT });
      localStorage.clear();
      // await axios.post('https://hrm-backend-square.onrender.com/auth/logout');
    } catch (error) {
      alert(error && error.message);
    }
    navigate('/pages/login/login3');
  };
  const now = new Date();
  const currentHour = now.getHours();

  let greeting;

  if (currentHour >= 4 && currentHour < 12) {
    greeting = 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 15) {
    greeting = 'Good Afternoon';
  } else if (currentHour >= 15 && currentHour < 19) {
    greeting = 'Good Evening';
  } 

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const WhoLog = async () => {
    try {
      const res = await axios.get('https://hrm-backend-square.onrender.com/auth/getalldata');
      const users = res.data.user;

      const matchedUser = users.find((user) => user.employeeId === authId);
      if (matchedUser) {
        setMatched(matchedUser);
      } else {
        console.log('No user found with the provided authId.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = employeeContextData;
      const allEmployeeData = response.data;
      console.log(allEmployeeData);
      const specificEmployee = allEmployeeData.find((emp) => emp.employeeid === authId);
      console.log(specificEmployee.profilepic?.url);
      setProfileimage(specificEmployee.profilepic?.url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [employeeContextData]);
  useEffect(() => {
    WhoLog();
  }, []);

  const handleAccount = () => {
    navigate('/Accountsetting');
  };
  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '4px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light
            }
          },
          '& .MuiChip-label': {
            lineHeight: 0
          }
        }}
        icon={
          <Avatar
            src={profileimage}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer'
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Box sx={{ p: 2 }}>
                    <Typography display="flex" justifyContent="center" variant="h4">
                      {greeting}
                      <WbSunnyTwoToneIcon
                        sx={{
                          ml: '7px',
                          color: 'red',
                          mb: '8px',
                          transform: `rotate(${rotationAngle}deg)`,
                          transition: 'transform 0.8s ease-in-out'
                        }}
                      />
                    </Typography>

                    <Stack sx={{ ml: '20px', mt: '10px' }} direction="row" spacing={2} alignItems="center">
                      <div>
                        <Avatar alt="Remy Sharp" src={profileimage} sx={{ width: 56, height: 56 }} />
                      </div>
                      <div>
                        <Typography component="span" variant="h4" sx={{ fontWeight: 700, paddingLeft: '0px' }}>
                          {matched.firstname}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 400, paddingLeft: '0px', mt: '3px' }}>
                          {matched.email}
                        </Typography>
                      </div>
                    </Stack>

                    {/* <Typography variant="subtitle2" sx={{marginTop:'3%',fontSize:'15px',fontWeight:'bold',marginBottom:'3%'}}>{matched.role}</Typography> */}

                    {/* <OutlinedInput
                      sx={{ width: '100%', pr: 1, pl: 2, my: 2 }}
                      id="input-search-profile"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Search profile options"
                      startAdornment={
                        <InputAdornment position="start">
                          <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                        </InputAdornment>
                      }
                      aria-describedby="search-helper-text"
                      inputProps={{
                        'aria-label': 'weight'
                      }}
                    /> */}
                    {/* <Divider /> */}
                  </Box>
                  <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                    <Box sx={{ p: 2 }}>
                      {/* <UpgradePlanCard /> */}
                      <Divider />
                      {/* <Card
                        sx={{
                          bgcolor: theme.palette.primary.light,
                          my: 2
                        }}
                      >
                        <CardContent>
                          <Grid container spacing={3} direction="column">
                            <Grid item>
                              <Grid item container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                  <Typography variant="subtitle1">Start DND Mode</Typography>
                                </Grid>
                                <Grid item>
                                  <Switch
                                    color="primary"
                                    checked={sdm}
                                    onChange={(e) => setSdm(e.target.checked)}
                                    name="sdm"
                                    size="small"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Grid item container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                  <Typography variant="subtitle1">Allow Notifications</Typography>
                                </Grid>
                                <Grid item>
                                  <Switch
                                    checked={notification}
                                    onChange={(e) => setNotification(e.target.checked)}
                                    name="sdm"
                                    size="small"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                      <Divider /> */}
                      <List
                        component="nav"
                        sx={{
                          width: '100%',
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: '10px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '100%'
                          },
                          '& .MuiListItemButton-root': {
                            mt: 0.5
                          }
                        }}
                      >
                        {/* <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          selected={selectedIndex === 1}
                          onClick={(event) => handleListItemClick(event, 1, '#')}
                        >
                          <ListItemIcon>
                            <IconUser stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Grid container spacing={1} justifyContent="space-between">
                                <Grid item>
                                  <Typography variant="body2">Social Profile</Typography>
                                </Grid>
                                <Grid item>
                                  <Chip
                                    label="02"
                                    size="small"
                                    sx={{
                                      bgcolor: theme.palette.warning.dark,
                                      color: theme.palette.background.default
                                    }}
                                    
                                  />
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton> */}
                        <ListItemButton sx={{ borderRadius: `${customization.borderRadius}px` }} onClick={handleAccount}>
                        <ListItemIcon>
                            <IconLogout color="black" stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Account Setting</Typography>} />
                        </ListItemButton>
                        <ListItemButton sx={{ borderRadius: `${customization.borderRadius}px` }} onClick={handleLogout}>
                          <ListItemIcon>
                            <IconLogout color="black" stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                        </ListItemButton>
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
