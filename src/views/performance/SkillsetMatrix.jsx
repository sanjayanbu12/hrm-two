import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import { List, ListItem, Typography, Button } from '@mui/material';
import Marker1 from '../../assets/images/icons/progress_1.svg';
import Marker2 from '../../assets/images/icons/progress_2.svg';

import HorizontalNonLinearStepper from './HorizontalNonLinearStepper';
import PopupSkill from './PopupSkill';

const SkillsetMatrix = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [skills, setSkills] = useState([]);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const fetchSkills = async () => {
    try {
      const response = await axios.get('http://localhost:3001/skill/getskills');
      setSkills(response.data.skill); // Update the state with the skill array
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const reloadSkills = () => {
    fetchSkills();
  };

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
                <rect y="25%" fill="#3d5599" width="20px" height="10" />
              </svg>
              <Typography
                variant="h4"
                body1="span"
                sx={{
                  fontWeight: 500,
                  fontSize: 'small',
                  color: '#697586',
                  marginLeft: '15px'
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
                  width: '100px',
                  color: '#697586',
                  marginLeft: '5px'
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
                  marginLeft: '5px'
                }}
              >
                - Skill Goal
              </Typography>
            </ListItem>
            <ListItem sx={{ marginLeft: '20px' }}>
              <Button variant="contained" color="secondary" onClick={openPopup}>
                Add New Skill
              </Button>
              {isPopupOpen && <PopupSkill onClose={closePopup} reloadSkills={reloadSkills} />}
            </ListItem>
          </List>
        </div>
        <div>
          {skills.map((skill) => (
            <HorizontalNonLinearStepper
              key={skill._id}
              size={skill.current}
              size1={skill.requi}
              size2={skill.goal}
              name={skill.skillset}
            />
          ))}
        </div>
      </MainCard>
    </>
  );
};

export default SkillsetMatrix;
