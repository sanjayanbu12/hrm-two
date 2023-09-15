import React, { useState } from 'react';
import { Autocomplete, TextField, Button, IconButton, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import '../Feedback/PopupCard.css';

export const level = ['Yearly', 'Monthly', 'Weekly'];
export const level1 = ['Skill Goal', 'Career Goal', 'Team Goal'];
export const approval = ['Jothi Mani', 'Jothi Sekaran'];

const PopupGoal = ({ onClose, reloadGoals }) => {
  const [GoalTit, setGoalTit] = useState('');
  const [GoalPer, setGoalPer] = useState('');
  const [GoalType, setGoalType] = useState('');
  const [GoalWhy, setGoalWhy] = useState('');
  const [GoalDes, setGoalDes] = useState('');

  const handleSubmit = async () => {
    try {
      if (GoalTit && GoalPer && GoalType && GoalWhy && GoalDes) {
        const response = await axios.post('https://hrm-backend-square.onrender.com/goal/addgoal/64f01e76aecb5d1da5126707', {
          employeeId: '64f01e76aecb5d1da5126707',
          GoalT: GoalTit,
          GoalP: GoalPer,
          GoalTyp: GoalType,
          GoalW: GoalWhy,
          GoalD: GoalDes
        });
        console.log('Goal added:', response.data);

        setGoalTit('');
        setGoalPer('');
        setGoalType('');
        setGoalDes('');
        setGoalWhy('');

        // Reload skills in the parent component
        reloadGoals();

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
          <h2>Add New Goal</h2>
          <IconButton onClick={onClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Goal Title"
            variant="outlined"
            sx={{ width: '100%', marginTop: '10px' }}
            value={GoalTit}
            onChange={(e) => setGoalTit(e.target.value)}
          />
        </div>
        <Grid container spacing={2} sx={{ listStyle: 'none', display: 'flex', flexDirection: 'row' }}>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'left' }}>
            <div>
              <Autocomplete
                disablePortal
                id="combo-box-goal-period"
                options={level}
                sx={{ width: 150, marginTop: '15px' }}
                renderInput={(params) => <TextField {...params} label="Goal Period" />}
                value={GoalPer}
                onChange={(e, newValue) => setGoalPer(newValue)}
              />
            </div>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'left' }}>
            <div>
              <Autocomplete
                disablePortal
                id="combo-box-goal-type"
                options={level1}
                sx={{ width: 150, marginTop: '15px' }}
                renderInput={(params) => <TextField {...params} label="Goal Type" />}
                value={GoalType}
                onChange={(e, newValue) => setGoalType(newValue)}
              />
            </div>
          </Grid>
        </Grid>
        <div style={{}}>
          <Autocomplete
            disablePortal
            id="combo-box-goal-approval"
            options={approval}
            sx={{ width: '100%', marginTop: '15px' }}
            renderInput={(params) => <TextField {...params} label="Goal Approval" />}
            // value={currentSkillLevel}
            // onChange={(e, newValue) => setGoal(newValue)}
          />
        </div>

        <div>
          <TextField
            id="outlined-basic"
            label="Why you Choose this Goal?"
            variant="outlined"
            sx={{ width: '100%', marginTop: '10px' }}
            value={GoalWhy}
            onChange={(e) => setGoalWhy(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Goal Description"
            variant="outlined"
            sx={{ width: '100%', marginTop: '10px' }}
            value={GoalDes}
            onChange={(e) => setGoalDes(e.target.value)}
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

export default PopupGoal;
