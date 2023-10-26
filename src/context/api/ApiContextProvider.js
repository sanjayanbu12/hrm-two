import React from 'react';
import ApiContext from './ApiContext';
import { useState } from 'react';
import ApiContainer from './ApiContainer';
const ApiContextProvider = ({ children }) => {
  const [employeeContextData, setEmployeeContextData] = useState([]);
  const [atsContextData, setatsContextData] = useState([]);
  const [recruitmentContextData, setrecruitmentContextData] = useState([]);
  const value = {
    employeeContextData,
    setEmployeeContextData,
    atsContextData,
    recruitmentContextData
  };
  console.log('recruitmentContextData', recruitmentContextData);
  return (
    <div>
      <ApiContainer
        setEmployeeContextData={setEmployeeContextData}
        setatsContextData={setatsContextData}
        setrecruitmentContextData={setrecruitmentContextData}
      />
      <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
    </div>
  );
};

export default ApiContextProvider;
