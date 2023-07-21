

// import React, { useState, useEffect } from 'react';

// const DarkLightMode = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const darkLightModeStyles = `
//     body {
//       background-color: ${isDarkMode ? '#222222' : '#ffffff'};
//       color: ${isDarkMode ? '#ffffff' : '#000000'};
//       transition: background-color 0.3s ease;
//     }

//     .app {
//       /* Styles for your module */
//     }

//     .toggle-button {
//       background-color: ${isDarkMode ? '#000000' : '#ffffff'};
//       color: ${isDarkMode ? '#ffffff' : '#000000'};
//       padding: 4px;
//       border: none;
//       border-radius: 2px;
//       cursor: pointer;
//     }
//   `;

//   // Call applyDarkLightMode on initial render and whenever isDarkMode changes
//   useEffect(() => {
//     applyDarkLightMode();
//   }, [isDarkMode]);

//   const applyDarkLightMode = () => {
//     const body = document.getElementsByTagName('body')[0];
//     body.classList.toggle('dark', isDarkMode);
//     body.classList.toggle('light', !isDarkMode);
//   };

//   return (
//     <div className="app">
//       <style>{darkLightModeStyles}</style>
//       <button className="toggle-button" onClick={toggleTheme}>
//         {isDarkMode ? 'Light Mode' : 'Dark Mode'}
//       </button>
      
//     </div>
//   );
// };

// export default DarkLightMode;


import React, { useState, useEffect } from 'react';

const DarkLightMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const storedTheme = localStorage.getItem('theme');
  const prefersDark =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  useEffect(() => {
    setIsDarkMode(storedTheme === 'dark' || (storedTheme === null && prefersDark));
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      setDark();
    } else {
      setLight();
    }
  }, [isDarkMode]);

  const setDark = () => {
    localStorage.setItem('theme', 'dark');
    applyDarkTheme();
  };

  const setLight = () => {
    localStorage.setItem('theme', 'light');
    applyLightTheme();
  };

  const applyDarkTheme = () => {
    // Apply your dark theme styles to the dashboard module elements
    // For example, you can change the background color and font color of the module
    const dashboardModule = document.getElementById('dashboard-module');
    dashboardModule.style.backgroundColor = '#333';
    dashboardModule.style.color = '#eee';
    // Add more styles as needed

    // You can also apply dark theme to other elements in the dashboard module
    // For example, if you have tables, charts, or other components, apply appropriate styles here
  };

  const applyLightTheme = () => {
    // Apply your light theme styles to the dashboard module elements
    // For example, you can change the background color and font color of the module
    const dashboardModule = document.getElementById('dashboard-module');
    dashboardModule.style.backgroundColor = '#ffffff';
    dashboardModule.style.color = '#000000';
    // Add more styles as needed

    // You can also apply light theme to other elements in the dashboard module
    // For example, if you have tables, charts, or other components, apply appropriate styles here
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
      {/* Replace 'dashboard-module' with the actual ID or className of your dashboard module */}
      <div id="dashboard-module">
        {/* Your dashboard module content goes here */}
      </div>
    </div>
  );
};

export default DarkLightMode;
