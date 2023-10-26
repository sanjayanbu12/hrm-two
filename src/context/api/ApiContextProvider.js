import React from 'react';
import ApiContext from './ApiContext';
import { useState } from 'react';
import ApiContainer from './ApiContainer';
const ApiContextProvider = ({ children }) => {
  const [employeeContextData, setEmployeeContextData] = useState([]);
  const value = {
    employeeContextData,
    setEmployeeContextData
  };
  return (
    <div>
      <ApiContainer employeeContextData={employeeContextData} setEmployeeContextData={setEmployeeContextData} />
      <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
    </div>
  );
};

export default ApiContextProvider;
