import React from 'react';
import { useState } from 'react';
import FormSubmittedContext from './FormSubmittedContext';

const FromSubmittedProvider = ({ children }) => {
  const [formStatus, setStatus] = useState(false);
  const [recStatus, setrecStatus] = useState(false);
  const value = {
    formStatus,
    setStatus,
    recStatus,
    setrecStatus
  };
  return (
    <div>
      <FormSubmittedContext.Provider value={value}>{children}</FormSubmittedContext.Provider>
    </div>
  );
};

export default FromSubmittedProvider;
