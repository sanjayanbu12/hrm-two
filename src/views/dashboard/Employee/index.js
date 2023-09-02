import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Upcomingevents from './Upcomingevents';
import PopularCard from './PopularCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  // const [backgroundColor, setBackgroundColor] = useState('#f4f4f4'); // Default background color

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      toast.success('Logged in successfully!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
      });
    }, 5000);
  }, []);

  // // Handler for background color change
  // const handleBackgroundColorChange = (color) => {
  //   setBackgroundColor(color);
  // };

  // const predefinedColors = [
  //   '#f4f4f4',
  //   '#e0e0e0',
  //   '#b0bec5',
  //   '#90a4ae',
  //   '#78909c',
  //   '#607d8b'
  //   // Add more colors as needed
  // ];

  return (
    
    // <div style={{ backgroundColor }}>
    //   {/* Color picker or dropdown for background color selection */}
    //   <div>
    //     {/* Associate the label with the color picker input using htmlFor */}
    //     <label htmlFor="colorPicker">Select Background Color: </label>
    //     <input
    //       id="colorPicker" // Give the input an id
    //       type="color"
    //       value={backgroundColor}
    //       onChange={(e) => handleBackgroundColorChange(e.target.value)}
    //     />
    //     {/* Render predefined color options */}
    //      {/* Render predefined color options */}
    //      <div>
    //       {predefinedColors.map((color, index) => (
    //         <span
    //           key={index}
    //           role="button" // Add role attribute
    //           tabIndex={0} // Add tabIndex to make it focusable
    //           style={{
    //             display: 'inline-block',
    //             width: '24px',
    //             height: '24px',
    //             backgroundColor: color,
    //             margin: '4px',
    //             cursor: 'pointer'
    //           }}
    //           onClick={() => handleBackgroundColorChange(color)}
    //           onKeyPress={(e) => {
    //             if (e.key === 'Enter') {
    //               handleBackgroundColorChange(color);
    //             }
    //           }}
    //         />
    //       ))}
    //     </div>
    //   </div>

    <div style={{ overflow: 'hidden' }}>

<Grid container spacing={gridSpacing}>
        <Grid item xs={12} md={8}>
          <Upcomingevents isLoading={isLoading} />
        </Grid>
        <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
          
        </Grid>
      </Grid>

      <Grid container spacing={gridSpacing}>
        {/* <Grid item xs={12} md={3}>
          <ApexChart isLoading={isLoading} />
        </Grid> */}
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
