import axios from 'axios';
import { useEffect } from 'react';

const ApiContainer = ({ setEmployeeContextData }) => {
  const fetchEmployee = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/api/allemployee');
      setEmployeeContextData(response);
      console.log('responsecontext', response);
    } catch (error) {
      console.log(error);
    } 
  };
  useEffect(() => {
    fetchEmployee();
  }, []);
  return null;
};

export default ApiContainer;
