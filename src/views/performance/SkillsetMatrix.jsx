import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { List, ListItem, Typography } from '@mui/material';
import Marker1 from '../../assets/images/icons/progress_1.svg';
import Marker2 from '../../assets/images/icons/progress_2.svg';

import HorizontalNonLinearStepper from './HorizontalNonLinearStepper';

const SkillsetMatrix = () => {
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
