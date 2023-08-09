

import React, { useState, useEffect } from 'react';

const DarkLightMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const darkLightModeStyles = `
    body {
      background-color: ${isDarkMode ? '#222222' : '#ffffff'};
      color: ${isDarkMode ? '#ffffff' : '#000000'};
      transition: background-color 0.3s ease;
    }

    .app {
      /* Styles for your module */
    }

    .toggle-button {
      background-color: ${isDarkMode ? '#000000' : '#ffffff'};
      color: ${isDarkMode ? '#ffffff' : '#000000'};
      padding: 4px;
      border: none;
      border-radius: 2px;
      cursor: pointer;
    }
  `;

  // Call applyDarkLightMode on initial render and whenever isDarkMode changes
  useEffect(() => {
    applyDarkLightMode();
  }, [isDarkMode]);

  const applyDarkLightMode = () => {
    const body = document.getElementsByTagName('body')[0];
    body.classList.toggle('dark', isDarkMode);
    body.classList.toggle('light', !isDarkMode);
  };

  return (
    <div className="app">
      <style>{darkLightModeStyles}</style>
      <button className="toggle-button" onClick={toggleTheme}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      
    </div>
  );
};

export default DarkLightMode;


