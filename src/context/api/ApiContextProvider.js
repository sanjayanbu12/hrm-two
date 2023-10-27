import React from 'react';
import ApiContext from './ApiContext';
import { useState } from 'react';
import ApiContainer from './ApiContainer';
const ApiContextProvider = ({ children }) => {
  const [employeeContextData, setEmployeeContextData] = useState([]);
  const [atsContextData, setatsContextData] = useState([]);
  const [recruitmentContextData, setrecruitmentContextData] = useState([]);
<<<<<<< Updated upstream
  const [leaveContextData, setleaveContextData] = useState([]);
  const [orgContextData, setorgContextData] = useState([]);
=======
  const [medialistContextData, setmedialistContextData] = useState([]);
>>>>>>> Stashed changes
  const value = {
    employeeContextData,
    setEmployeeContextData,
    atsContextData,
    recruitmentContextData,
<<<<<<< Updated upstream
    leaveContextData,
    orgContextData
  };
  console.log('orgContextData',orgContextData)
=======
    medialistContextData
  };
  console.log('medialistContextData', medialistContextData);
>>>>>>> Stashed changes
  return (
    <div>
      <ApiContainer
        setEmployeeContextData={setEmployeeContextData}
        setatsContextData={setatsContextData}
        setrecruitmentContextData={setrecruitmentContextData}
<<<<<<< Updated upstream
        setleaveContextData={setleaveContextData}
        setorgContextData={setorgContextData}
=======
        setmedialistContextData={setmedialistContextData}

>>>>>>> Stashed changes
      />
      <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
    </div>
  );
};

export default ApiContextProvider;
