import React, { useState } from 'react';
import './EmployeeLogin.css';
import { Card } from '@mui/material';
import EmployeeForm from 'views/addemployeeform/EmployeeForm';
import LeaveTrackerForm from 'views/leavemanagement/LeaveTrackerForm';
import LearningModule from 'views/learninganddevelopment/LearningModule';
import Newevent from 'views/dashboard/Employee/Newevent';
import Feedback from 'views/performance/Feedback'

const EmployeeLogin = () => {
  const [activeSection, setActiveSection] = useState('');
  return (
    <Card raised={true}> 
      
        <nav className="section-navigation">
      
          <button className={`section-buttons ${activeSection === 'goal' ? 'active' : ''}`} onClick={() => setActiveSection('goal')}>
            Leave Form
          </button>
          <button
            className={`section-buttons ${activeSection === 'employee' ? 'active' : ''}`}
            onClick={() => setActiveSection('employee')}
          >
            Employee Form
          </button>
          <button
            className={`section-buttons ${activeSection === 'learning' ? 'active' : ''}`}
            onClick={() => setActiveSection('learning')}
          >
            Learning Module
          </button>
          <button
            className={`section-buttons ${activeSection === 'org' ? 'active' : ''}`}
            onClick={() => setActiveSection('org')}
          >
            Feedback
          </button>
          <button className={`section-buttons ${activeSection === 'events' ? 'active' : ''}`} 
          onClick={() => setActiveSection('events')}>
            Events Calendar
          </button>       
        </nav>
      
      {activeSection === 'goal' && (
        <section>
          <LeaveTrackerForm />
        </section>
      )}

      {activeSection === 'employee' && (
        <section>
          <EmployeeForm />
        </section>
      )}

      {activeSection === 'learning' && (
        <section>
          <LearningModule />
        </section>
      )}

      {activeSection === 'org' && (
      <section>
<Feedback />
        </section>
        )}

        {activeSection === 'events' && (
      <section>
<Newevent />
        </section>
        )}
    </Card>
  );
};

export default EmployeeLogin;
