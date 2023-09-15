import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Button, } from '@mui/material';

import Progressbar from './Progressbar';
import PopupGoal from './PopupGoal';

const GoalTab = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [goals, setGoals] = useState([]);
  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const fetchGoals = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/goal/getgoals');
      console.log(response.data);
      // setGoals(response.data.goa); // Update the state with the skill array
      const mappedGoals = response.data.goa.map((goal) => ({
        _id: goal._id,
        GoalTit1: goal.GoalT,
        GoalPer1: goal.GoalP
        // Add other properties as needed
      }));
      console.log(mappedGoals);
      setGoals(mappedGoals);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const reloadGoals = () => {
    fetchGoals();
  };

  return (
    <Paper style={{ padding: '20px', height: 'fit-content', maxWidth: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="secondary" onClick={openPopup}>
          ADD New Goal
        </Button>
        {isPopupOpen && <PopupGoal onClose={closePopup} reloadGoals={reloadGoals} />}
      </div>
      <div style={{ display:"flex", flexWrap:"wrap" }}>

        {goals.map((goal) => (
          
              
                <div style={{width:"50%"}} key={goal._id}>
                  <Progressbar goal={goal} />
                </div>
              
        
          ))}

          </div>
    </Paper>
  );
};

export default GoalTab;
