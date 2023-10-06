import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Button } from '@mui/material';

import Progressbar from './Progressbar';
import PopupGoal from './PopupGoal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const GoalTab = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [goals, setGoals] = useState([]);
  const authId = useSelector((state) => state.customization.authId);
  console.log(authId);
  const navigate = useNavigate()
  const openPopup = () => {
    setPopupOpen(true);
  };
  const closePopup = () => {
    setPopupOpen(false);
  };

  const fetchGoals = async () => {
    try {
      // const response = await axios.get(`https://hrm-backend-square.onrender.com/goal/getgoal/${authId}`);
      const response = await axios.get('https://hrm-backend-square.onrender.com/goal/getgoals');
   
      // setGoals(response.data.goa); // Update the state with the skill array
       
      
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
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {goals.map((goal) => (
          <div style={{ width: '50%' }} key={goal._id}>
            <Progressbar goal={goal}  onClick={()=>navigate(`/board/${goal._id}`)} />
          </div>
        ))}
      </div>
    </Paper>
  );
};

export default GoalTab;
