import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import Notes from './layout/Notes';
import Progress from './layout/Progress';
import Certificate from './layout/Certificate';
import Announcement from './layout/Announcement';
import Search from './layout/Search';
import Overview from './layout/Overview';
import TabQuiz from './layout/TabQuiz';
import NotesIcon from '@mui/icons-material/Notes'; // Import Material-UI icons
import ProgressIcon from '@mui/icons-material/ShowChart';
import CertificateIcon from '@mui/icons-material/LibraryBooks';
import OverviewIcon from '@mui/icons-material/Description';
import QuizIcon from '@mui/icons-material/HelpOutline';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import CampaignIcon from '@mui/icons-material/Campaign';

const BaseLayout = ({ courseName, courseDescription, courseid, onSearch }) => {
  return (
    <div className="base-layout-container">
      <TabView>
        <TabPanel header={<div className="tab-panel-header"><ManageSearchIcon /> Search</div>}>
          <Search onSearch={onSearch} />
        </TabPanel>
        <TabPanel header={<div className="tab-panel-header"><OverviewIcon /> Overview</div>}>
          <Overview name={courseName} description={courseDescription} />
        </TabPanel>
        <TabPanel header={<div className="tab-panel-header"><NotesIcon /> Notes</div>}>
          <Notes />
        </TabPanel>
        <TabPanel header={<div className="tab-panel-header"><ProgressIcon /> Progress</div>}>
          <Progress />
        </TabPanel>
        <TabPanel header={<div className="tab-panel-header"><CertificateIcon /> Certificate</div>}>
          <Certificate name={courseName} />
        </TabPanel>
        <TabPanel header={<div className="tab-panel-header"><CampaignIcon /> Announcement</div>}>
          <Announcement />
        </TabPanel>
        <TabPanel header={<div className="tab-panel-header"><QuizIcon /> Quiz</div>}>
          <TabQuiz courseid={courseid} />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default BaseLayout;
