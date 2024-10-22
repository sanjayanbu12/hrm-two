import React from 'react';
import { useState } from 'react';
import FormSubmittedContext from './FormSubmittedContext';

const FromSubmittedProvider = ({ children }) => {
  const [formStatus, setStatus] = useState(false);
  const [recStatus, setrecStatus] = useState(false);
  const [atsStatus, setatsStatus] = useState(false);
  const [leaveStatus, setleaveStatus] = useState(false);
  const [orgStatus, setorgStatus] = useState(false);
  const [eventStatus, seteventStatus] = useState(false);
  const [travelget, settravelget] = useState(false);
  const[procget,setProcget]=useState(false)

  const value = {
    formStatus,
    setStatus,
    recStatus,
    setrecStatus,
    atsStatus,
    setatsStatus,
    leaveStatus,
    setleaveStatus,
    orgStatus,
    setorgStatus,
    eventStatus,
    seteventStatus,
    travelget,
    settravelget,
    procget,
    setProcget
  };
  return (
    <div>
      <FormSubmittedContext.Provider value={value}>{children}</FormSubmittedContext.Provider>
    </div>
  );
};

export default FromSubmittedProvider;
