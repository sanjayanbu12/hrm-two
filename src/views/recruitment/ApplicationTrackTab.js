import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ApplicationTracker from './ApplicationTracker';
import Shortlist from './Shortlist';
import InterviewBoard from './InterviewBoard';
import { FeedSelectedTable } from './FeedSelectedTable';


const ApplicationTrackTab = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue)
  };
  const renderTabContent = () => {

    if (value === 0) {
      return <ApplicationTracker/>;
    } else if (value == 1) {
      return <Shortlist/> ;
    } else if (value === 2) {
      return <InterviewBoard/>;
    } else if (value === 3) {
        return <FeedSelectedTable/>
    }
    return null;
  };

  return (
    <div style={{height:'40vh'}}>
      <Tabs sx={{marginBottom:2}} value={value} onChange={handleChange} aria-label="icon position tabs example" centered>
        <Tab  label="Application Tracker" />
        <Tab label="Candidate Shortlisting" />
        <Tab label="Interview Board" />
        <Tab label="Selected Candidate" />
      </Tabs>
      {renderTabContent()}
    </div>
  );
};

export default ApplicationTrackTab;

