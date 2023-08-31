import React, { useState } from 'react';
import './EmployeeLogin.css';
import { Card } from '@mui/material';
import EmployeeForm from 'views/addemployeeform/EmployeeForm';
import LeaveTrackerForm from 'views/leavemanagement/LeaveTrackerForm';
import LearningModule from 'views/learninganddevelopment/LearningModule';

const EmployeeLogin = () => {
  const [activeSection, setActiveSection] = useState('goal');
  console.log(setActiveSection);

  return (
    <Card>
      <div style={{ justifyContent: 'space-between', marginTop: '0px' }}>
        <nav className="section-navigation">
          <button className={`section-buttons ${activeSection === 'goal' ? 'active' : ''}`} onClick={() => setActiveSection('goal')}>
            Leave Apply
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
          <button className={`section-buttons ${activeSection === 'form' ? 'active' : ''}`} onClick={() => setActiveSection('form')}>
            Leave Apply
          </button>
          <button
            className={`section-buttons ${activeSection === 'learning module' ? 'active' : ''}`}
            onClick={() => setActiveSection('learning module')}
          >
            Learning Module
          </button>
        </nav>
      </div>

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

      {activeSection === 'match' && <section></section>}
    </Card>
  );
};

export default EmployeeLogin;
