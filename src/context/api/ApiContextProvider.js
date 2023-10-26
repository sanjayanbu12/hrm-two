import React from 'react';
import ApiContext from './ApiContext';
import { useState } from 'react';
import ApiContainer from './ApiContainer';
const ApiContextProvider = ({ children }) => {
  const [employeeContextData, setEmployeeContextData] = useState([]);
  const [recruitmentContextData, setRecruitmentContextData] = useState([]);
  const value = {
    employeeContextData,
    setEmployeeContextData,
    recruitmentContextData
  };
  console.log(recruitmentContextData)
  return (
    <div>
      <ApiContainer
        setEmployeeContextData={setEmployeeContextData} 
        setRecruitmentContextData={setRecruitmentContextData}
        />
      <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
    </div>
  );
};

export default ApiContextProvider;
