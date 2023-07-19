import React, { useState, useEffect } from 'react';

function DarkLightMode() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`App ${theme}`}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <h1>Hello, world!</h1>
      <style>
        {`
          .dark {
            background-color: #333;
            color: #fff;
          }
          .light {
            background-color: #fff;
            color: #333;
          }
        `}
      </style>
    </div>
  );
}

export default DarkLightMode;
