import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ManageAdmins from './ManageAdmins';
import YetTo from './YetTo';

const AdminConsole = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue)
  };
  const renderTabContent = () => {

    if (value === 0) {
      return <ManageAdmins/>;
    } else if (value === 1) {
      return <YetTo/>;
    } 
    return null;
  };

  return (
    <div style={{height:'40vh'}}>
      <Tabs sx={{marginBottom:2}} value={value} onChange={handleChange} aria-label="icon position tabs example" centered>
        <Tab  label="Manage Admins" />
        <Tab label="Yet To" />
      </Tabs>
      {renderTabContent()}
    </div>
  );
};

export default AdminConsole;

