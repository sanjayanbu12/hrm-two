import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import RequestLeave from './RequestLeave';
import ViewLeave from './ViewLeave';
// import LeaveCalendar from './LeaveCalendar';
import AtttendanceTab from 'layout/MainLayout/Header/AtttendanceTab';
const LeaveTab = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const renderTabContent = () => {
    if (value === 0) {
      return <RequestLeave />; 
    } else if (value == 1) {
      return <ViewLeave />;
    // } else if (value === 2) {

    //   return <div ><LeaveCalendar /></div> 
    }else if(value === 2){
      return <div><AtttendanceTab /></div>
    }
    return null;
  };

  return (
    <div style={{height:'40vh'}}>
      <Tabs sx={{marginBottom:2}} value={value} onChange={handleChange} aria-label="icon position tabs example" centered>
        <Tab  label="Request Leave" />
        <Tab label="View Leave " />
        {/* <Tab label="Leave Calendar" /> */}
        <Tab label="Attendance Table" />
      
      </Tabs>
      {renderTabContent()}
    </div>
  );
};

export default LeaveTab;
