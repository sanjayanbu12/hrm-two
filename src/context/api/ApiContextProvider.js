import React from 'react';
import ApiContext from './ApiContext';
import { useState } from 'react';
import ApiContainer from './ApiContainer';
const ApiContextProvider = ({ children }) => {
  const [employeeContextData, setEmployeeContextData] = useState([]);
  const [atsContextData, setatsContextData] = useState([]);
  const [recruitmentContextData, setrecruitmentContextData] = useState([]);
  const [leaveContextData, setleaveContextData] = useState([]);
  const [orgContextData, setorgContextData] = useState([]);
  const [medialistContextData, setmedialistContextData] = useState([]);
  const value = {
    employeeContextData,
    setEmployeeContextData,
    atsContextData,
    recruitmentContextData,
    leaveContextData,
    orgContextData
  };

  return (
    <div>
      <ApiContainer
        setEmployeeContextData={setEmployeeContextData}
        setatsContextData={setatsContextData}
        setrecruitmentContextData={setrecruitmentContextData}
        setleaveContextData={setleaveContextData}
        setorgContextData={setorgContextData}
        setmedialistContextData={setmedialistContextData}

      />
      <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
    </div>
  );
};

export default ApiContextProvider;
