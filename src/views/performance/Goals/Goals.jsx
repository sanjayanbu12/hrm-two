import React, {useState}from 'react'
import {  Tabs, Tab} from '@mui/material'
import GoalTab from './GoalTab';
import YourGoalTab from './YourGoalTab';




const Goals = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (

    <div style={{}}>
      <Tabs value={selectedTab} onChange={handleTabChange} sx={{marginBottom:"10px"}}>
        <Tab label="Goal Setting" />
        <Tab label="Goal Tracking"/>
      </Tabs>


      {selectedTab === 0 && <GoalTab />}
      {selectedTab === 1 && <YourGoalTab />}
    </div>
  );
}






export default Goals