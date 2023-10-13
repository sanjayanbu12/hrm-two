import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import Notes from './layout/Notes';
import Progress from './layout/Progress';
import Certificate from './layout/Certificate';
import Announcement from './layout/Announcement';
import Search from './layout/Search';
import Overview from './layout/Overview';
import TabQuiz from './layout/TabQuiz';

const BaseLayout = ({ courseName, courseDescription }) => {
  return (
    <>
      <TabView>
        <TabPanel leftIcon="pi pi-search mr-2">
          <Search />
        </TabPanel>
        <TabPanel header={<div style={{ marginLeft: 6 }}>Overview</div>} leftIcon="pi pi-wallet mr-2">
          <Overview name={courseName} description={courseDescription} />
        </TabPanel>
        <TabPanel header={<span style={{ marginLeft: 6 }}>Notes</span>} leftIcon="pi pi-pencil mr-2">
          <Notes />
        </TabPanel>
        <TabPanel header={<span style={{ marginLeft: 6 }}>Progress</span>} leftIcon="pi pi-chart-line mr-2">
          <Progress />
        </TabPanel>
        <TabPanel header={<span style={{ marginLeft: 6 }}>Certificate</span>} leftIcon="pi pi-book mr-2">
          <Certificate name={courseName} />
        </TabPanel>
        <TabPanel header={<span style={{ marginLeft: 6 }}>Announcement</span>} leftIcon="pi pi-megaphone mr-2">
          <Announcement />
        </TabPanel>
        <TabPanel header={<div style={{ marginLeft: 6 }}>Quiz</div>} leftIcon="pi pi-exclamation-circle mr-2">
          <TabQuiz/>
        </TabPanel>
      </TabView>
    </>
  );
};

export default BaseLayout;
