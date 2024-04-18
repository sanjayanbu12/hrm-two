import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LeaveTrackerForm from 'views/leavemanagement/RequestLeave';
import CourseCatalog from 'views/coursemodule/CourseCatalog';
import Newevent from 'views/dashboard/Default/Newevent';

import EmployeeHandbook from 'views/employeehandbook/EmployeeHandbook';
const EmployeeLogin = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const renderTabContent = () => {
    if (value === 0) {
      return <LeaveTrackerForm />;
    } else if (value == 1) {
      return <CourseCatalog />;
    } else if (value === 2) {
      return <div ><Newevent /></div> 
    }else if(value === 4){
      return <div><EmployeeHandbook /></div>
    }

    return null;
  };

  return (
    <div style={{height:'40vh'}}>
      <Tabs sx={{marginBottom:2}} value={value} onChange={handleChange} aria-label="icon position tabs example" centered>
        <Tab  label="Request Leave" />
        <Tab label="Course Catalog" />
        <Tab label="Square  Calendar" />
        <Tab label="HandBook" />
        <Tab label="Organization Chart" />
      </Tabs>
      {renderTabContent()}
    </div>
  );
};

export default EmployeeLogin;
