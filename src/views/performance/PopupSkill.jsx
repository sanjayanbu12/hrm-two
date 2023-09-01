import React, { useState } from 'react';
import axios from 'axios';
import { Autocomplete, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './PopupCard.css';
import { level } from './consts';

const PopupSkill = ({ onClose, reloadSkills }) => {
  const [skill, setSkill] = useState('');
  const [currentSkillLevel, setCurrentSkillLevel] = useState('');
  const [requiredSkillLevel, setRequiredSkillLevel] = useState('');
  const [skillGoal, setSkillGoal] = useState('');

  const handleSubmit = async () => {
    try {
      if (skill && currentSkillLevel && requiredSkillLevel && skillGoal) {
        const response = await axios.post('http://localhost:3001/skill/addskill/64f01e76aecb5d1da5126707', {
          employeeId: "64f01e76aecb5d1da5126707",
          skillset: skill,
          current: currentSkillLevel,
          requi: requiredSkillLevel,
          goal: skillGoal,
        });
        console.log('Skill added:', response.data);

        setSkill('');
        setCurrentSkillLevel('');
        setRequiredSkillLevel('');
        setSkillGoal('');

        // Reload skills in the parent component
        reloadSkills();

        onClose();
      } else {
        console.log('Please fill in all fields.');
      }
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2>Give Feedbacks</h2>
          <IconButton onClick={onClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Skill"
            variant="outlined"
            sx={{ width: '100%', marginTop: '10px' }}
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />
        </div>
        <div>
          <Autocomplete
            disablePortal
            id="combo-box-current-level"
            options={level}
            sx={{ width: 300, marginTop: '15px' }}
            renderInput={(params) => <TextField {...params} label="Current Skill Level" />}
            value={currentSkillLevel}
            onChange={(e, newValue) => setCurrentSkillLevel(newValue)}
          />
        </div>
        <div>
          <Autocomplete
            disablePortal
            id="combo-box-required-level"
            options={level}
            sx={{ width: 300, marginTop: '15px' }}
            renderInput={(params) => <TextField {...params} label="Required Skill Level" />}
            value={requiredSkillLevel}
            onChange={(e, newValue) => setRequiredSkillLevel(newValue)}
          />
        </div>
        <div>
          <Autocomplete
            disablePortal
            id="combo-box-skill-goal"
            options={level}
            sx={{ width: 300, marginTop: '15px' }}
            renderInput={(params) => <TextField {...params} label="Skill Goal" />}
            value={skillGoal}
            onChange={(e, newValue) => setSkillGoal(newValue)}
          />
        </div>

        <div style={{ marginTop: '10px', padding: '10px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PopupSkill;
