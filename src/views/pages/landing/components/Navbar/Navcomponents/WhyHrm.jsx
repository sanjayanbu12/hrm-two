import React from 'react';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Stack, Zoom, Typography } from '@mui/material';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import { NewButton, StyledTablist , StyledTab } from '../Styled';
import EastIcon from '@mui/icons-material/East';
import TabContext from '@mui/lab/TabContext';
import { CustomContextHook } from '../../usecontext/CustomContextHook';

const WhyHrm = () => {
  const { value, setValue, anchorEl, setAnchorEl, openPopper, setOpenPopper } = CustomContextHook();
  const handleClick = (event, popperName) => {
    if (openPopper === popperName) {
      setOpenPopper(null);
      document.body.style.overflow = 'unset';
      handleChange();
    } else {
      setAnchorEl(event.currentTarget);
      setOpenPopper(popperName);
      document.body.style.overflow = 'hidden';
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const canBeOpen = Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <>
      <Box className="WhrHrm-Hide">
        <TabContext value={value}>
          <StyledTablist sx={{marginRight:'20px' ,marginLeft: '20px'}} value="1" onChange={handleChange} aria-label="lab API tabs example">
            {/* <Button
              variant="contained"
              onClick={(e) => handleClick(e, 'WhyHrm')}
              // isButtonClicked ={openPopper}
              disableElevation
              disableFocusRipple
              disableRipple
              disableTouchRipple
              endIcon={<KeyboardArrowDownIcon className="Arrow-down" htmlColor="rgb(128, 128, 128)" />}
              sx={{
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                background: 'none',
                color: 'rgba(255, 255, 255, .8)',
                '&:hover': {
                  background: 'none',
                  color: 'rgba(255, 255, 255, 1)'
                }
              }}
            >
              Why Gestion?
            </Button> */}
            <StyledTab 
            disableRipple
              sx={{
                color: 'rgba(255, 255, 255, .8)',
                fontSize: '1rem',
                letterSpacing: '0.02857em',
                textTransform: 'none',
                paddingLeft: '0px',
                paddingRight: '0px',
                '&:hover': {
                  background: 'none',
                  color: 'rgba(255, 255, 255, 1)'
                },
                '&Mui-selected ':{  
                  color:' white !important',
                }
              }}
              onClick={(e) => handleClick(e, 'WhyHrm')}
              label={
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                  Why Gestion?
                  {/* <KeyboardArrowDownIcon style={{ verticalAlign: 'middle' }} htmlColor="rgb(128, 128, 128)" /> */}
                </Box>
              }
              value="1"
            />
          </StyledTablist>
        </TabContext>

        <Popper id={id} open={openPopper === 'WhyHrm'} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps}>
              <Box height={'100vh'} width={'100vw'} sx={{ position: 'relative', top: '6px', backgroundColor: 'rgba(0,0,0,0.9)' }}>
                <Box
                  sx={{
                    padding: '20px 64px',
                    display: 'flex'
                  }}
                >
                  <Zoom in={openPopper === 'WhyHrm'}>
                    <Box sx={{ display: 'flex', gap: '50px' }}>
                      <Box sx={{ width: '250px' }}>
                        <Typography
                          letterSpacing={'1px'}
                          paddingBottom={'18px'}
                          borderBottom={'1px solid #b7bfc6'}
                          fontSize={12}
                          fontWeight={500}
                          variant="h3"
                          color={'white'}
                          component={'h2'}
                        >
                          WHY GESTION
                        </Typography>
                        <Typography
                          letterSpacing={'0.5px'}
                          paddingTop={'18px'}
                          fontSize={'14px'}
                          fontWeight={500}
                          variant="h3"
                          color={'white'}
                          component={'h3'}
                        >
                          Overview
                        </Typography>
                        <Typography
                          letterSpacing={'0.5px'}
                          lineHeight={1.5}
                          paddingTop={'7px'}
                          marginBottom={'20px'}
                          fontSize={'12px'}
                          fontWeight={500}
                          variant="h3"
                          color={'gray'}
                          component={'h3'}
                        >
                          Build project plans, coordinate tasks, and hit deadlines
                        </Typography>
                        <Typography
                          letterSpacing={'1px'}
                          paddingTop={'18px'}
                          fontSize={12}
                          fontWeight={500}
                          variant="h3"
                          color={'white'}
                          component={'h2'}
                        >
                          For Marketing
                        </Typography>
                        <Typography
                          letterSpacing={'0.5px'}
                          lineHeight={1.5}
                          paddingTop={'7px'}
                          marginBottom={'20px'}
                          fontSize={'12px'}
                          fontWeight={500}
                          variant="h3"
                          color={'gray'}
                          component={'h3'}
                        >
                          Plan and track campaigns, launches, and more
                        </Typography>
                        <Typography
                          letterSpacing={'1px'}
                          paddingTop={'18px'}
                          fontSize={12}
                          fontWeight={500}
                          variant="h3"
                          color={'white'}
                          component={'h2'}
                        >
                          For Operations
                        </Typography>
                        <Typography
                          letterSpacing={'0.5px'}
                          lineHeight={1.5}
                          paddingTop={'7px'}
                          marginBottom={'20px'}
                          fontSize={'12px'}
                          fontWeight={500}
                          variant="h3"
                          color={'gray'}
                          component={'h3'}
                        >
                          Build, scale and streamline processes to improve efficiency
                        </Typography>
                        <Typography
                          letterSpacing={'1px'}
                          paddingTop={'18px'}
                          fontSize={12}
                          fontWeight={500}
                          variant="h3"
                          color={'white'}
                          component={'h2'}
                        >
                          For Leaders <NewButton>NEW</NewButton>
                        </Typography>
                        <Typography
                          letterSpacing={'0.5px'}
                          lineHeight={1.5}
                          paddingTop={'7px'}
                          marginBottom={'20px'}
                          fontSize={'12px'}
                          fontWeight={500}
                          variant="h3"
                          color={'gray'}
                          component={'h3'}
                        >
                          Improve clarity, focus, and personal growth
                        </Typography>
                        <Typography
                          letterSpacing={'1px'}
                          paddingTop={'18px'}
                          fontSize={12}
                          fontWeight={500}
                          variant="h3"
                          color={'white'}
                          component={'h2'}
                        >
                          For Product
                        </Typography>
                        <Typography
                          letterSpacing={'0.5px'}
                          lineHeight={1.5}
                          paddingTop={'7px'}
                          marginBottom={'20px'}
                          fontSize={'12px'}
                          fontWeight={500}
                          variant="h3"
                          color={'gray'}
                          component={'h3'}
                        >
                          Build roadmaps, plan sprints, manage shipping and launches
                        </Typography>
                      </Box>
                      <Box sx={{ width: '550px' }}>
                        <Typography
                          letterSpacing={'1px'}
                          paddingBottom={'18px'}
                          borderBottom={'1px solid #b7bfc6'}
                          fontSize={'12px'}
                          fontWeight={500}
                          variant="h3"
                          color={'white'}
                          component={'h2'}
                        >
                          FOR YOUR WORKFLOW
                        </Typography>
                        <Stack direction={'row'} gap={6}>
                          <Stack flexBasis={'250px'}>
                            <Typography
                              letterSpacing={'0.5px'}
                              paddingTop={'18px'}
                              fontSize={'14px'}
                              fontWeight={500}
                              variant="h3"
                              color={'white'}
                              component={'h3'}
                            >
                              Project Management
                            </Typography>
                            <Typography
                              letterSpacing={'0.5px'}
                              lineHeight={1.5}
                              paddingTop={'7px'}
                              marginBottom={'20px'}
                              fontSize={'12px'}
                              fontWeight={500}
                              variant="h3"
                              color={'gray'}
                              component={'h3'}
                            >
                              Build project plans, coordinate tasks, and hit deadlines
                            </Typography>
                            <Typography
                              letterSpacing={'1px'}
                              paddingTop={'18px'}
                              fontSize={12}
                              fontWeight={500}
                              variant="h3"
                              color={'white'}
                              component={'h2'}
                            >
                              Campagin Management
                            </Typography>
                            <Typography
                              letterSpacing={'0.5px'}
                              lineHeight={1.5}
                              paddingTop={'7px'}
                              marginBottom={'20px'}
                              fontSize={'12px'}
                              fontWeight={500}
                              variant="h3"
                              color={'gray'}
                              component={'h3'}
                            >
                              Plan and track campaigns, launches, and more
                            </Typography>
                            <Typography
                              letterSpacing={'1px'}
                              paddingTop={'18px'}
                              fontSize={12}
                              fontWeight={500}
                              variant="h3"
                              color={'white'}
                              component={'h2'}
                            >
                              Creative Production
                            </Typography>
                            <Typography
                              letterSpacing={'0.5px'}
                              lineHeight={1.5}
                              paddingTop={'7px'}
                              marginBottom={'20px'}
                              fontSize={'12px'}
                              fontWeight={500}
                              variant="h3"
                              color={'gray'}
                              component={'h3'}
                            >
                              Build, scale and streamline processes to improve efficiency
                            </Typography>
                            <Typography
                              letterSpacing={'1px'}
                              paddingTop={'18px'}
                              fontSize={12}
                              fontWeight={500}
                              variant="h3"
                              color={'white'}
                              component={'h2'}
                            >
                              Request Tracking <NewButton>NEW</NewButton>
                            </Typography>
                            <Typography
                              letterSpacing={'0.5px'}
                              lineHeight={1.5}
                              paddingTop={'7px'}
                              marginBottom={'20px'}
                              fontSize={'12px'}
                              fontWeight={500}
                              variant="h3"
                              color={'gray'}
                              component={'h3'}
                            >
                              Improve clarity, focus, and personal growth
                            </Typography>
                          </Stack>

                          <Stack flexBasis={'250px'}>
                            <Typography
                              letterSpacing={'0.5px'}
                              paddingTop={'18px'}
                              fontSize={'14px'}
                              fontWeight={500}
                              variant="h3"
                              color={'white'}
                              component={'h3'}
                            >
                              Remote Teams <NewButton>POPULAR</NewButton>
                            </Typography>
                            <Typography
                              letterSpacing={'0.5px'}
                              lineHeight={1.5}
                              paddingTop={'7px'}
                              marginBottom={'20px'}
                              fontSize={'12px'}
                              fontWeight={500}
                              variant="h3"
                              color={'gray'}
                              component={'h3'}
                            >
                              Build project plans, coordinate tasks, and hit deadlines
                            </Typography>
                            <Typography
                              letterSpacing={'1px'}
                              paddingTop={'18px'}
                              fontSize={12}
                              fontWeight={500}
                              variant="h3"
                              color={'white'}
                              component={'h2'}
                            >
                              Productivity
                            </Typography>
                            <Typography
                              letterSpacing={'0.5px'}
                              lineHeight={1.5}
                              paddingTop={'7px'}
                              marginBottom={'20px'}
                              fontSize={'12px'}
                              fontWeight={500}
                              variant="h3"
                              color={'gray'}
                              component={'h3'}
                            >
                              Plan and track campaigns, launches, and more
                            </Typography>
                            <Typography
                              letterSpacing={'1px'}
                              paddingTop={'18px'}
                              fontSize={12}
                              fontWeight={500}
                              variant="h3"
                              color={'white'}
                              component={'h2'}
                            >
                              Agile Management
                            </Typography>
                            <Typography
                              letterSpacing={'0.5px'}
                              lineHeight={1.5}
                              paddingTop={'7px'}
                              marginBottom={'20px'}
                              fontSize={'12px'}
                              fontWeight={500}
                              variant="h3"
                              color={'gray'}
                              component={'h3'}
                            >
                              Build, scale and streamline processes to improve efficiency
                            </Typography>
                            <Typography
                              sx={{ cursor: 'pointer' }}
                              letterSpacing={'1px'}
                              paddingTop={'18px'}
                              fontSize={12}
                              color={'white'}
                              fontWeight={500}
                              variant="h3"
                              component={'h2'}
                            >
                              See all workflows{' '}
                              <EastIcon sx={{ verticalAlign: 'middle', cursor: 'pointer' }} fontSize="small" htmlColor="gray" />
                            </Typography>
                          </Stack>
                        </Stack>
                      </Box>
                    </Box>
                  </Zoom>
                </Box>
              </Box>
            </Fade>
          )}
        </Popper>
      </Box>
      <style>
        {`
          @media (max-width: 1000px) {
            .WhrHrm-Hide{
              display:none;
            }
          }
          `}
      </style>
    </>
  );
};
export default WhyHrm;
