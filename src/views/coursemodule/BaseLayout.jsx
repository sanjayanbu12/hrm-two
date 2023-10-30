import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import Notes from './layout/Notes';
import Progress from './layout/Progress';
import Certificate from './layout/Certificate';
import Announcement from './layout/Announcement';
import Overview from './layout/Overview';
import TabQuiz from './layout/TabQuiz';
import NotesIcon from '@mui/icons-material/Notes'; // Import Material-UI icons
import ProgressIcon from '@mui/icons-material/ShowChart';
import CertificateIcon from '@mui/icons-material/LibraryBooks';
import OverviewIcon from '@mui/icons-material/Description';
import QuizIcon from '@mui/icons-material/HelpOutline';
import CampaignIcon from '@mui/icons-material/Campaign';

const BaseLayout = ({ courseName, courseDescription, courseid }) => {
  return (
    <div className="base-layout-container">
      <TabView>
        <TabPanel header={<div className="tab-panel-header"><OverviewIcon /> Overview</div>}>
          <Overview name={courseName} description={courseDescription} />
        </TabPanel>
        <TabPanel header={<div className="tab-panel-header"><NotesIcon /> Notes</div>}>
          <Notes courseid={courseid}/>
        </TabPanel>
        <TabPanel header={<div className="tab-panel-header"><QuizIcon /> Quiz</div>}>
          <TabQuiz courseid={courseid} />
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
      </TabView>
    </div>
  );
};

export default BaseLayout;
