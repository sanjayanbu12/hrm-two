import * as React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';



const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,

  completed: PropTypes.bool,

  icon: PropTypes.node,
};




const SkillsetMatrix = () => {
  const steps = ['','','',''];
  return (
    <>
      <MainCard title="SkillSet Matrix" sx={{ height: '99%' }}>
        <div>
          <List
            sx={{
              display: 'flex',
              paddingRight: 0
            }}
          >
            <ListItem>
            <svg width="20px" height="20px">
            <rect y="25%" fill="#3d5599" width="20px" height="10"  />
            </svg>
              <Typography
                variant="h4"
                body1="span"
                sx={{
                  fontWeight: 500,
                  fontSize: 'small',
                  color: '#697586',
                  marginLeft: "15px"

                }}
              >
                  - Current Skill Level
              </Typography>
              </ListItem>
            <ListItem>
              <img src={Marker1} alt="marker1" />
              <Typography
                variant="h4"
                body1="span"
                sx={{
                  fontWeight: 500,
                  fontSize: 'small',
                  color: '#697586',
                  marginLeft: "5px"

                }}
              >
                  - Required Level of Skill
              </Typography>
            </ListItem>
            <ListItem>
              <img src={Marker2} alt="marker2" />
              <Typography
                variant="h4"
                body1="span"
                sx={{
                  fontWeight: 500,
                  fontSize: 'small',
                  color: '#697586',
                  marginLeft: "5px"
                }}
              >
                - Skill Goal
              </Typography>
            </ListItem>
          </List>
        </div>
        <div>
          <List
            sx={{
              display: 'flex',
              paddingRight: 0,
              marginLeft:"80px"
            }}
          >
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              Not Aware
            </ListItem>
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              Awareness
            </ListItem>
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              Novice
            </ListItem>
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              Competent
            </ListItem>
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              Expert
            </ListItem>
          </List>
        </div>

        <div>
          <HorizontalNonLinearStepper size={50} size1={50} size2={72} name="Communication" />
          <HorizontalNonLinearStepper size={27} size1={50} size2={50} name="Design Thinking" />
          <HorizontalNonLinearStepper size={80} size1={60} size2={20} name="Problem Solving"/>
          <HorizontalNonLinearStepper size={80} size1={60} size2={20} name="Remote Workspace" />
          <HorizontalNonLinearStepper size={80} size1={60} size2={20} name="Administrative Work" />
          <HorizontalNonLinearStepper size={80} size1={60} size2={20} name="Leadership" />
          <HorizontalNonLinearStepper size={80} size1={60} size2={20} name="C" />
          <HorizontalNonLinearStepper size={80} size1={60} size2={20} name="C++" />
          <HorizontalNonLinearStepper size={80} size1={60} size2={20} name="Java" />
          </div>
      </MainCard>
    </>
  );
};

export default SkillsetMatrix;
