import React from 'react';
import ApiContext from './ApiContext';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
const ApiContextProvider = ({ children }) => {
  const [employeeContextData, setEmployeeContextData] = useState([]);
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
  return (
    <div>
      <ApiContext.Provider value={{ employeeContextData }}>{children}</ApiContext.Provider>
    </div>
  );
};

export default ApiContextProvider;
