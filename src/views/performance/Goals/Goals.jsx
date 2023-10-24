import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Button } from '@mui/material';

import Progressbar from './Progressbar';
import PopupGoal from './PopupGoal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Goals = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [goals, setGoals] = useState([]);
  const [empId, setEmpId] = useState([]);
  const authId = useSelector((state) => state.customization.authId);

  useEffect(() => {
    fetchEmployee();
  }, []); // Run this effect only once when the component is mounted

  useEffect(() => {
    fetchGoals();
  }, [empId]); // Run this effect whenever empId changes

  const fetchEmployee = async () => {
    try {
      const response = await axios.get('https://pulsehr-express-server.onrender.com/api/allemployee');
      const employees = response.data.filter((data) => data.employeeid === authId);
      setEmpId(employees.map((data) => data._id));
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const fetchGoals = async () => {
    try {
      const response = await axios.get(`https://pulsehr-express-server.onrender.com/goal/getgoal/${empId[0]}`);

      console.log('this is for testing', response);
      console.log('summa', response.data.result);
      setGoals(response.data.result);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const reloadGoals = () => {
    fetchGoals();
  };

  return (
    <Paper style={{ padding: '20px', height: 'fit-content', maxWidth: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="secondary" onClick={openPopup}>
          Add New Goal
        </Button>
        {isPopupOpen && <PopupGoal onClose={closePopup} reloadGoals={reloadGoals} usrId={empId[0]} />}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {goals.map((goal) => (
          <div style={{ width: '50%' }} key={goal._id}>
            <Progressbar goal={goal} onClick={() => navigate(`/board/${goal._id}`)} />
          </div>
        ))}
      </div>
    </Paper>
  );
};

export default Goals;
